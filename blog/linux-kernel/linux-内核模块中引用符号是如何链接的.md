## 前言
linux 内核模块的加载流程去年大致琢磨了一遍，简单的写了个草稿后就在草稿箱里积压着。按照以往的风格，应当以一篇长文呈现，今天想想却觉得不太可取。为什么不从关键的问题着手，使用较短的篇幅来逐个击破呢？

最终选择了从问题出发的描述方式，在这种方式下，我首先得提出关键问题，这需要一定的训练，本文便是这样的一次实践。

## 我的问题

### 1. **linux 内核模块是如何链接的？**

暂时无法回答。

### 2. 为什么要提这个问题？

常规的 c 程序要经过编译链接来生成可执行文件，链接的过程会按照链接脚本的配置来完成可执行文件的 layout 同时也会对所有的可重定位项目进行重定位，以确定访问地址偏移。

linux 内核模块也有类似的过程，可编译生成的内核模块只是一个【可重定位目标文件】，**那它的链接过程是在哪里执行的呢？**

## 经验之谈

内核模块一般通过 insmod、modprobe 命令加载运行，既然要运行，肯定需要确定模块内调用的外部符号的偏移地址，这一过程可能在如下流程中进行：

1. insmod、modprobe 命令中
2. 内核代码中模块加载流程中

曾经 strace 跟踪过 insmod 加载内核模块的过程，核心逻辑是调用 finit_module、init_module 系统调用，没有看到其它操作，于是判断内核模块的链接应当是在内核代码中做的。

下面我以一个简单的 hello world 内核模块为例，探讨内核中执行模块链接的过程。

## 一个简单的内核模块源码

```c
#include <linux/module.h>
#include <linux/init.h>

static int __init my_init(void)
{
  printk(KERN_INFO "Hello from Hello Module\\n");
  return 0;
}

static void __exit my_exit(void)
{
  printk(KERN_INFO "Bye from Hello Module\\n");
}

module_init(my_init);
module_exit(my_exit);

MODULE_DESCRIPTION("Sample Hello World Module");
MODULE_LICENSE("GPL");

```

将上述内容保存为 mymodule.c 使用如下 Makefile 内容编译：

```makefile
MODULE_FILENAME=mymodule

PWD := $(shell pwd)
obj-m += ${MODULE_FILENAME}.o
KO_FILE=${MODULE_FILENAME}.ko

export KROOT=/lib/modules/$(shell uname -r)/build
modules:
	@${MAKE} -C ${KROOT} M=${PWD}

modules_install:
	@${MAKE} -C ${KROOT} M=${PWD} modules_install

clean:
	@${MAKE} -C ${KROOT} M=${PWD} clean
	rm -rf Modules.symvers modules.order

insert: modules
	sudo insmod ${KO_FILE}

remove:
	sudo rmmod ${MODULE_FILENAME}

printlog:
	sudo dmesg -c
	sudo insmod ${KO_FILE}
	dmesg
```

## objdump -d mymodule.ko

```bash
Disassembly of section .init.text:

0000000000000000 <init_module>:
   0:	e8 00 00 00 00       	callq  5 <init_module+0x5>
   5:	48 c7 c7 00 00 00 00 	mov    $0x0,%rdi
   c:	e8 00 00 00 00       	callq  11 <init_module+0x11>
  11:	31 c0                	xor    %eax,%eax
  13:	c3                   	retq

Disassembly of section .exit.text:

0000000000000000 <cleanup_module>:
   0:	48 c7 c7 00 00 00 00 	mov    $0x0,%rdi
   7:	e9 00 00 00 00       	jmpq   c <__UNIQUE_ID_description18>

```

init_module 为模块的初始化函数，在其中调用到的两个 **callq** 指令用于子函数调用。**callq** 指令的字节码为 **0xe8**，其后四个字节为函数跳转偏移，这里两个 **callq** 指令的函数跳转偏移值都为 0，这符合可重定位目标文件的特征，这里就是两处需要链接过程完成的重定位对象。

第二个 callq 可以明确是 printk，第一个 callq 根据 readelf -r 的输出判断是 ```__fentry__ ```。

## readelf -r mymodule.ko

```bash
Relocation section '.rela.init.text' at offset 0x1cb30 contains 3 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000001  002600000004 R_X86_64_PLT32    0000000000000000 __fentry__ - 4
000000000008  00060000000b R_X86_64_32S      0000000000000000 .rodata.str1.1 + 0
00000000000d  002800000004 R_X86_64_PLT32    0000000000000000 printk - 4

Relocation section '.rela.exit.text' at offset 0x1cb78 contains 2 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000003  00060000000b R_X86_64_32S      0000000000000000 .rodata.str1.1 + 1b
000000000008  002800000004 R_X86_64_PLT32    0000000000000000 printk - 4
```

readelf -r 参数获取可执行目标文件的可重定位 section 表项。上述输出中有如下两个可重定位 section:

1. .rela.init.text
2. .rela.exit.text

每个 section 中都列举出了【需要重定位的项目】，一个项目有五个方面的内容，其中 **Offset 为可重定位目标地址相对文件起始地址的偏移量**，**Type 为重定位的类型**，用于计算偏移地址，**Sym. Name + Addend 字段为符号名称以及计算地址偏移量时的修正值。**

**.rela.init_text section** 中有两种重定位类型，**R_X86_64_PLT32**  用于函数偏移计算，**R_X86_64_32S** 用于数据偏移计算。str1.1 实际指向 init_module 函数中 printk 函数打印的字符串。

函数偏移的计算可以参考如下内容来学习：

>So despite the fact that the type of the relocation entry is R_X86_64_PLT32 the linker will still use the R_X86_64_PC32 computation (S + A - P) for the relocation target being modified, where:
>
>    S is the value of the symbol (st_value of Elf64_Sym)
    A is the addend (-4 in your case)
    P is the address of the memory location being relocated (the start of the address of the call to Other)

上述英文摘自 [How does the address of R_X86_64_PLT32 computed?](https://stackoverflow.com/questions/64424692/how-does-the-address-of-r-x86-64-plt32-computed) 更多的信息可以阅读《深入理解计算机系统》第三版 7.7 节。

在下文中我会用一个实例来说明函数偏移地址的计算过程。

## 在内核源码中找到模块链接相关代码

使用 R_X86_64_PLT32 关键字进行如下搜索：

1. 搜索 kernel 目录
2. 搜索 arch/x86 目录
确定模块链接流程在 arch/x86/kernel/module.c 中实现。

阅读 module.c 的代码，发现有一个调试信息，于是修改内核代码，开启调试信息。

## 内核代码修改 patch

```c
diff --git a/arch/x86/kernel/module.c b/arch/x86/kernel/module.c
index b052e883dd8c..11e39304c55f 100644
--- a/arch/x86/kernel/module.c
+++ b/arch/x86/kernel/module.c
@@ -37,7 +37,7 @@
 #include <asm/setup.h>
 #include <asm/unwind.h>

-#if 0
+#if 1
 #define DEBUGP(fmt, ...)                               \\
        printk(KERN_DEBUG fmt, ##__VA_ARGS__)
 #else
@@ -196,6 +196,7 @@ int apply_relocate_add(Elf64_Shdr *sechdrs,
                                goto invalid_relocation;
                        val -= (u64)loc;
                        *(u32 *)loc = val;
+
 #if 0
                        if ((s64)val != *(s32 *)loc)
                                goto overflow;
@@ -212,6 +213,7 @@ int apply_relocate_add(Elf64_Shdr *sechdrs,
                               me->name, ELF64_R_TYPE(rel[i].r_info));
                        return -ENOEXEC;
                }
+               DEBUGP("val is 0x%llx\\n", val);
        }
        return 0;

```

## 重新编译并更新内核后加载 mymodule.ko 后 dmesg 部分打印信息

```bash
[  109.974417] type 4 st_value ffffffffbda016d0 r_addend fffffffffffffffc loc ffffffffc0106001
[  109.974418] val is 0xfffffffffd8fb6cb
.........
```

由于打印信息很多，我只截取了其中的一条项目。在上述项目中关键的信息解析如下：

1. type 4 表示重定位类型为 R_X86_64_PLT32 
2. st_value ffffffffbda016d0 表示 ```__fentry__```符号地址
    
    通过访问 /proc/kallsyms 文件确定，相关信息摘录如下；
    

	```bash
	[root@debian-10:17:55:34] helloworld_module # grep __fentry__ /proc/kallsyms
	ffffffffbda016d0 T __fentry__
	```

1. r_addend fffffffffffffffc  为上文中 readelf -r 输出中 ```__fentry__```函数的 Addend 值—— -4
2. loc ffffffffc0106001 表示上文中 readelf -r 输出中```__fentry__```被重定位区域在内核的实际地址
3. val is 0xfffffffffd8fb6cb，val 为最终计算出的访问 ```__fentry__```函数的偏移量，会被填充到 loc 指向的地址中
    
    val 计算公式为 S + A - P: ffffffffbda016d0 + fffffffffffffffc  - ffffffffc0106001 = **0xfffffffffd8fb6cb**
    

## 核心内核代码

内核代码中相关函数调用关系如下：
```c
init_module/finit_module
	load_module
       apply_relocations
           apply_relocate_add
  ```
apply_relocate_add 函数中完成重定向任务，核心代码摘录如下：

```c
        for (i = 0; i < sechdrs[relsec].sh_size / sizeof(*rel); i++) {
                /* This is where to make the change */
                loc = (void *)sechdrs[sechdrs[relsec].sh_info].sh_addr
                        + rel[i].r_offset;

                /* This is the symbol it is referring to.  Note that all
                   undefined symbols have been resolved.  */
                sym = (Elf64_Sym *)sechdrs[symindex].sh_addr
                        + ELF64_R_SYM(rel[i].r_info);

                DEBUGP("type %d st_value %Lx r_addend %Lx loc %Lx\\n",
                       (int)ELF64_R_TYPE(rel[i].r_info),
                       sym->st_value, rel[i].r_addend, (u64)loc);

                val = sym->st_value + rel[i].r_addend;
                switch (ELF64_R_TYPE(rel[i].r_info)) {
                case R_X86_64_NONE:
                        break;
                case R_X86_64_64:
                        if (*(u64 *)loc != 0)
                                goto invalid_relocation;
                        *(u64 *)loc = val;
                        break;
                case R_X86_64_32:
                        if (*(u32 *)loc != 0)
                                goto invalid_relocation;
                        *(u32 *)loc = val;
                        if (val != *(u32 *)loc)
                                goto overflow;
                        break;
                case R_X86_64_32S:
                        if (*(s32 *)loc != 0)
                                goto invalid_relocation;
                        *(s32 *)loc = val;
                        if ((s64)val != *(s32 *)loc)
                                goto overflow;
                        break;
                case R_X86_64_PC32:
                case R_X86_64_PLT32:
                        if (*(u32 *)loc != 0)
                                goto invalid_relocation;
                        val -= (u64)loc;
                        *(u32 *)loc = val;
..........

```

上述代码遍历每个可重定位 section 项目，loc 指向模块加载到内核后存储每个可重定位项目被重定位区域的内存地址，代表 **R_X86_64_PLT32**  中的标号 **P**。

sym 中保存已经 resolve 的未定义符号，sym->value 表示符号加载地址，代表 **R_X86_64_PLT32**  中的标号 **S**。

rel[i].r_addend 保存可重定位项目的 **Addend** 值，代表 **R_X86_64_PLT32**  中的标号 **A**。

在确定了这些信息后，switch 语句通过可重定位项目的 Type 字段进行逻辑分发，计算并填充重定位后的地址。对于 R_X86_64_PLT32  这种类型来说，计算公式就是 **S + A - P**。

## 总结

善于提问是一种很好的能力。主动发现并提出问题然后积极的寻找答案，最后给出合理的答案，收获成就感并推动自己继续提出新的问题，这是一个正反馈。从自己能够回答的小问题开始，不断的循环往复，雪球会越滚越大，时间正站在你这边。
