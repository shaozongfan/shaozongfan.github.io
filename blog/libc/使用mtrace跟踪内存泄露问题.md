## 前言
研究动态链接的原理中，无意间发现了 **mtrace** 这个东东。它是一个 libc 库提供的函数，**通过向 malloc、calloc、free 等函数注册 hook 函数来实现内存申请与释放的跟踪**，可以用来**定位内存泄露问题**。

在本文中，我将描述一个具体的使用实例，及使用过程中遇到的一些问题。
## mtrace 示例 demo
**man 3 mtrace** 查看 manual 信息，发现 manual 中已经提供了一个非常简单的示例 demo，其源码如下：

```c
#include <mcheck.h>
#include <stdlib.h>
#include <stdio.h>

int
main(int argc, char *argv[])
{
    int j;

    mtrace();

    for (j = 0; j < 2; j++)
        malloc(100);            /* Never freed--a memory leak */

    calloc(16, 16);             /* Never freed--a memory leak */
    exit(EXIT_SUCCESS);
}
```
将上述代码保存为 t_mtrace.c 源文件，执行如下命令进行编译：

```bash
gcc -g t_mtrace.c -o t_mtrace
```
在运行之前，我们需要设定 **MALLOC_TRACE** 环境变量，这个环境变量指向 mtrace 输出记录文件的路径。

MALLOC_TRACE 设定示例如下：

```bash
 export MALLOC_TRACE=/tmp/t
```
设定了这个变量之后就可以运行 **t_mtrace** 程序，运行完成后 /tmp/t 文件中将会保存输出的记录，示例如下：

```bash
[longyu@debian-10:19:25:40] program-problem $ cat /tmp/t
= Start
@ ./t_mtrace:[0x55555555518c] + 0x5555555596a0 0x64
@ ./t_mtrace:[0x55555555518c] + 0x555555559710 0x64
@ ./t_mtrace:[0x5555555551a5] + 0x555555559780 0x100
```
**/tmp/t** 的输出并不直观，libc 库提供了一个同样名为 mtrace 的 perl 脚本来解析这个记录，mtrace 脚本需要提供两个参数，第一个参数为**可执行程序的路径名**，第二个参数为 **mtrace 函数输出的记录文件**。

执行示例如下：

```bash
[longyu@debian-10:19:29:08] program-problem $ mtrace ./t_mtrace $MALLOC_TRACE

Memory not freed:
-----------------
           Address     Size     Caller
0x00005555555596a0     0x64  at 0x55555555518c
0x0000555555559710     0x64  at 0x55555555518c
0x0000555555559780    0x100  at 0x5555555551a5
```
这里我得到的输出信息与 manual 中的信息不同，**没有显示出调用者所在源码中的行号。**

manual 中的输出信息如下：
```bash
           $ mtrace ./t_mtrace $MALLOC_TRACE
           Memory not freed:
           -----------------
              Address     Size     Caller
           0x084c9378     0x64  at /home/cecilia/t_mtrace.c:12
           0x084c93e0     0x64  at /home/cecilia/t_mtrace.c:12
           0x084c9448    0x100  at /home/cecilia/t_mtrace.c:16
```
重新 **check** 我的运行过程，我确定与 manual 中描述的一致，看来一定是哪里出了问题了。

## 对 mtrace 脚本解析不到行号问题的解决过程
对这个问题，我最开始进行了如下尝试：

1. -O0 -g 编译后测试发现仍旧没有打印
2. 修改文件名为绝对路径后也没有打印
3. 对比加了-g、没有加 -g  /tmp/t 文件的区别，发现内容完全相同
4. 网上搜索发现有相关的描述，不过网页中同 manual 中一样能够显示源代码行号

在上面的尝试都失败后，我开始使用 strace 大法。用了 strace 后看到了一堆系统调用，其中**有执行 addr2line 的过程**，看来这个 mtrace 脚本实际是运行 addr2line 命令获取到的行号，那**问题是否出在 addr2line 中呢？**

我单独使用 addr2line 获取 /tmp/t 中函数调用地址对应的行号，发现根本获取不到任何信息，输出内容为 ??。

搞到这里我还是没有发现根本问题，只能硬着头皮用 perl -d 来运行这个 mtrace 脚本，调试了下也没有发现关键的点。

### 进一步的分析
在一系列的尝试后，我暂时没有找到一个解决方案，不过我觉得 **addr2line 是个非常重要的怀疑对象**。为了验证我的猜测，我将代码进行了如下修改：

```c
#include <mcheck.h>
#include <stdlib.h>
#include <stdio.h>

int
main(int argc, char *argv[])
{
    int j;

    mtrace();
				
    printf("%p\n", mtrace);
    for (j = 0; j < 2; j++)
        malloc(100);            /* Never freed--a memory leak */

    calloc(16, 16);             /* Never freed--a memory leak */
    pause();
    exit(EXIT_SUCCESS);
}
```

我这里打印出了 **mtrace 函数的地址**，编译并执行后会得到 mtrace 函数的地址，然后我使用 addr2line 命令，指定这个地址来获取源码行号，发现仍旧打印的是 ??，这让我觉的很大概率是 **addr2line 命令的问题**。

在这个基础上，我执行 **objdump -d 反汇编可执行文件**，然后使用 main 函数的**相对地址为参数**继续调用 addr2line 命令来解析，这一次**能够解析到了。**

测试过程记录如下：

```bash
[longyu@debian-10:19:50:39] program-problem $ objdump -d t_mtrace | grep main
    109d:	48 8d 3d c1 00 00 00 	lea    0xc1(%rip),%rdi        # 1165 <main>
    10a4:	ff 15 2e 2f 00 00    	callq  *0x2f2e(%rip)        # 3fd8 <__libc_start_main@GLIBC_2.2.5>
0000000000001165 <main>:
    119b:	eb 0e                	jmp    11ab <main+0x46>
    11af:	7e ec                	jle    119d <main+0x38>
[longyu@debian-10:19:50:44] program-problem $ addr2line -e ./t_mtrace 1165
/home/longyu/problem_and_solution/program-problem/./t_mtrace.c:7
```
可以看到在最后一行，addr2line 打印出了行号！

然后使用 gdb 运行，start 后在 main 函数处停下来后，反汇编 main 函数，发现 **main 函数的地址与 objdump -d 的输出完全不同**，看来应该是**基地址被修改了。**

测试记录如下：
```bash
(gdb) start
Temporary breakpoint 1 at 0x1174: file ./mtrace.c, line 10.
Starting program: /home/longyu/problem_and_solution/program-problem/t_mtrace 

Temporary breakpoint 1, main (argc=1, argv=0x7fffffffdae8) at ./mtrace.c:10
10	               mtrace();
(gdb) disass main
Dump of assembler code for function main:
   0x0000555555555165 <+0>:	push   %rbp
```
可以看到这里 main 函数的地址变为了 **0x0000555555555165**，这就造成 addr2line 命令不能解析到源码行号。

### 关闭 ASLR
**再次执行此程序**，我发现每次打印的 mtrace 函数的地址都不一样，这点让我想起了 ASLR 这个功能，首先查看 /proc/sys/kernel/randomize_va_space 文件的内容，发现值为 2 表示**这个功能确实是打开的。**

使用 root 权限向 /proc/sys/kernel/randomize_va_space 文件写入 0 关闭这个功能后，重新执行上面的测试，发现**仍旧不能获取到行号信息**。

看来还是得从 addr2line 命令上着手！

### 以 addr2line cannot work 为关键词搜索互联网
使用 addr2line cannot work 搜索后，我在 [addr2line cannot decode addresses that gdb does](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=860394) 这篇链接中看到了如下关键信息：

```
There are 2 things going on. First, by default gcc is now building
executables as position independent (-pie). This can be explicitly
disabled with the -no-pie linking option. Disabling PIE should result in
things working as they did before.

The second thing going on is Address Space Layout Randomization
(ASLR). This is now active by default and will cause all PIE executables
to be loaded to random addresses. This can be disabled globally with
sysctl:

    $ sudo sysctl -w kernel.randomize_va_space=0

Or with a boot argument:

    norandmaps

Or (preferrably) locally for the process you are interested:

    $ setarch `uname -m` -R /some/program

Often it is convenient to use the above command with /bin/bash so as to
quickly create a non-randomized environment for yourself.

However, be aware that even when ASLR is disabled, if it is a PIE
exectuable, it will always load to the same address, but that is not the
address within the executable. That means that for PIE executables, many
binutils (such as addr2line) will require you to recalculate the offset.
```
我**已经关闭了 ASLR 功能**，对应上述描述的第二点，第一点描述说与 pie 有关，通过指定 **-no-pie** 参数重新编译上述程序，直接在 gdb 中运行，再次反汇编 main 函数，这次得到了如下输出信息：

```bash
(gdb) start
Temporary breakpoint 1 at 0x401171: file ./mtrace.c, line 10.
Starting program: /home/longyu/problem_and_solution/program-problem/t_mtrace 

Temporary breakpoint 1, main (argc=1, argv=0x7fffffffdae8) at ./mtrace.c:10
10	               mtrace();
(gdb) disass main
Dump of assembler code for function main:
   0x0000000000401162 <+0>:	push   %rbp
```
可以看到这次，main 函数地址变为了 **0x401162**，objdump -d 输出的 main 函数地址如下：

```bash
0000000000401162 <main>:
  401162:	55                   	push   %rbp
```
可以看到，**这次 objdump 得到的函数地址与运行时的地址一致了**，看来应该没有问题了。

运行程序后，继续查看 /tmp/t 的内容，这次得到了如下信息：

```bash
[longyu@debian-10:20:09:00] program-problem $ cat /tmp/t
= Start
@ /lib/x86_64-linux-gnu/libc.so.6:(_IO_file_doallocate+0x8c)[0x7ffff7e5971c] + 0x4056a0 0x400
@ ./t_mtrace:[0x4011a4] + 0x405ab0 0x64
@ ./t_mtrace:[0x4011a4] + 0x405b20 0x64
@ ./t_mtrace:[0x4011bd] + 0x405b90 0x100
@ /lib/x86_64-linux-gnu/libc.so.6:[0x7ffff7f52ad4] - 0x4056a0
```
这个输出看上去非常正常，看来问题应该能够得到解决了！再次执行 mtrace 脚本，这次确实能够获取到源码行号了，操作记录如下：

```bash
[longyu@debian-10:20:10:06] program-problem $ mtrace ./t_mtrace /tmp/t

Memory not freed:
-----------------
           Address     Size     Caller
0x0000000000405ab0     0x64  at /home/longyu/problem_and_solution/program-problem/./t_mtrace.c:13 (discriminator 3)
0x0000000000405b20     0x64  at /home/longyu/problem_and_solution/program-problem/./t_mtrace.c:13 (discriminator 3)
0x0000000000405b90    0x100  at /home/longyu/problem_and_solution/program-problem/./t_mtrace.c:17
```
如果你对这里的行号足够敏感，你会发现这里的行号并不准确，其实在 manual 中已经说明了这个问题。

上述 demo 中调用了 malloc 与 calloc 函数并且都没有调用 free 来释放，**模拟内存泄露的情况**，根据 mtrace 的输出，我们就能够马上定位到内存泄露的位置。

同时需要注意的是，当 **MALLOC_TRACE** 指向了一个合法的可以写的文件路径时，mtrace 能够运行，但是可能会带来**性能上的损耗！**
## mtrace 是咋样实现的？
解决了 addr2line 不能显示源码行号的问题，mtrace 算正式上手了，下一个问题是 mtrace 是如何实现的呢？

mtrace 函数的源码位于 glibc 源码中的 **malloc/mtrace.c** 中，核心逻辑是设定 malloc、calloc、realloc、free 等几个申请、释放内存空间函数使用的内部 hook 函数。相关代码如下：

```c
308           tr_old_free_hook = __free_hook;
309           __free_hook = tr_freehook;
310           tr_old_malloc_hook = __malloc_hook;
311           __malloc_hook = tr_mallochook;
312           tr_old_realloc_hook = __realloc_hook;
313           __realloc_hook = tr_reallochook;                                                                                                                               
314           tr_old_memalign_hook = __memalign_hook;
315           __memalign_hook = tr_memalignhook;
```
那这些 hook 函数是在哪里被调用的呢？这里我以 malloc 函数中的调用代码为例来描述，旨在抛出**如何获取返回地址**这一问题。

相关代码如下：

```c
3018 void * 
3019 __libc_malloc (size_t bytes)
3020 { 
3021   mstate ar_ptr;
3022   void *victim;
3023   
3024   void *(*hook) (size_t, const void *)
3025     = atomic_forced_read (__malloc_hook);
3026   if (__builtin_expect (hook != NULL, 0))
3027     return (*hook)(bytes, RETURN_ADDRESS (0));
```
注意当 **__malloc_hook** 不为 NULL 的时候（调用了 mtrace 函数会设定 __malloc_hook 函数指针），该 hook 函数会被被调用，调用 hook 函数传递的第二个参数 **RETURN_ADDRESS (0)** 值得研究。

这个 RETURN_ADDRESS(0) 是一个宏，其定义如下：

```c
/* Determine the return address.  */
#define RETURN_ADDRESS(nr) \
  __builtin_extract_return_addr (__builtin_return_address (nr))
```
这里使用了 gcc 的扩展功能来获取函数的返回地址，这里的 nr 对应的是栈帧的层级，0 表示当前函数的返回地址，放在这就是 **malloc 函数执行完成后继续执行的下一条指令地址。**

## __builtin_return_address 是如何实现的？
写到这里与 mtrace 相关的内容告一段落，开始跳到 __builtin_return_address 的实现上。

关于这个函数的实现，根据之前学习 《CSAPP》的印象，其实关键在于获取到栈中不同栈帧的 EBP 与 EIP 的值，**EBP 表示栈底，而 EIP 则是返回地址。**

函数调用时，**参数首先压栈，按照从右向左的顺序**，然后**返回地址入栈**，然后**调用者的 EBP （旧的EBP ）压栈**。x86 中栈是向下增长的，我们只需要获取到当前 EBP 寄存器的值向上拨动一个数据单元（32-bit 4 字节，64-bit 8 字节），访问这个地址就能够得到返回地址。同时上一级函数栈帧的 EBP 又可以通过当前函数的 EBP 获取到（**访问当前函数 EBP 寄存器值指向的地址**）。

由于函数调用存在嵌套性，可能存在多个函数栈帧，我们需要**递归执行**上述过程。

更具体的信息请访问：

[系统程序员成长计划－像机器一样思考(二)](https://blog.csdn.net/absurd/article/details/4207357?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160423542319724836730112%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160423542319724836730112&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-6-4207357.pc_v1_rank_blog_v1&utm_term=%E8%B0%83%E7%94%A8&spm=1018.2118.3001.4450)
[](https://blog.csdn.net/absurd/article/details/4207357?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160423542319724836730112%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160423542319724836730112&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-6-4207357.pc_v1_rank_blog_v1&utm_term=%E8%B0%83%E7%94%A8&spm=1018.2118.3001.4450)

上述链接中的示例代码直接编译运行在我的系统上会报段错误，我修改了部分内容，新的 demo 如下：

```c
#include <stdio.h> 

#define NEW_GCC
#define MAX_LEVEL 4
#ifdef NEW_GCC
#define OFFSET 4
#else
#define OFFSET 0
#endif/*NEW_GCC*/ 

int backtrace(void** buffer, int size)
{
	long n = 0xfefefefe;
	long* p = &n;
	int	 i = 0; 

	long ebp = p[1 + OFFSET];
	long eip = p[2 + OFFSET]; 

	for(i = 0; i < size; i++)
	{
		buffer[i] = (void*)eip;
		p = (long*)ebp;
		ebp = p[0];
		eip = p[1];
	} 

	return size;
} 

static void test2()
{
	int i = 0;
	void* buffer[MAX_LEVEL] = {0}; 

	backtrace(buffer, MAX_LEVEL); 

	for(i = 0; i < MAX_LEVEL; i++)
	{
		printf("called by %p\n",	buffer[i]);
	} 

	return;
} 

static void test1()
{
	int a=0x11111111;
	int b=0x11111112; 

	test2();
	a = b; 

	return;
} 

static void test()
{
	int a=0x10000000;
	int b=0x10000002; 

	test1();
	a = b; 

	return;
} 

int main(int argc, char* argv[])
{
	test(); 

	return 0;
}
```
将上述代码保存为 backtrace.c，编译运行能够正常，记录如下：
```c
[longyu@debian-10:21:04:29] program-problem $ gcc ./backtrace.c -o backtrace
[longyu@debian-10:21:04:31] program-problem $ ./backtrace
called by 0x555555555204
called by 0x555555555258
called by 0x555555555281
called by 0x5555555552a3
```
[系统程序员成长计划－像机器一样思考(二)](https://blog.csdn.net/absurd/article/details/4207357?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160423542319724836730112%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160423542319724836730112&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-6-4207357.pc_v1_rank_blog_v1&utm_term=%E8%B0%83%E7%94%A8&spm=1018.2118.3001.4450)
[](https://blog.csdn.net/absurd/article/details/4207357?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160423542319724836730112%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160423542319724836730112&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-6-4207357.pc_v1_rank_blog_v1&utm_term=%E8%B0%83%E7%94%A8&spm=1018.2118.3001.4450)这篇李先静大神的博客中，从根本上解释了我之前描述的 addr2line 命令不能获取到行号的问题。

相关的内容摘录如下：

>对于共享库，addr2line无法根据这个地址找到对应的源代码位置了。原因是：addr2line只能通过地址偏移量来查找，而打印出的地址是绝对地址。由于共享库加载到内存的位置是不确定的，为了计算地址偏移量，我们还需要进程maps文件的帮助

## 进程 maps 文件的使用
每一个进程都有自己的虚拟内存空间，其虚拟内存空间映射可以通过查看 /proc/[pid]/maps 文件来确定。

上文中已经描述了运行 backtrace 程序得到的如下输出信息：

```c
[longyu@debian-10:21:04:31] program-problem $ ./backtrace
called by 0x555555555204
called by 0x555555555258
called by 0x555555555281
called by 0x5555555552a3
```
### 用 gdb 来验证
gdb 挂起程序，反汇编调用到的不同函数，调用指令与返回地址指令列举如下：

```asm
   0x000055555555529e <+20>:	callq  0x555555555261 <test>
   **0x00005555555552a3 <+25>:	mov    $0x0,%eax**
   0x000055555555527c <+27>:	callq  0x555555555238 <test1>
   **0x0000555555555281 <+32>:	mov    -0x8(%rbp),%eax**
   0x0000555555555253 <+27>:	callq  0x5555555551c4 <test2>
   **0x0000555555555258 <+32>:	mov    -0x8(%rbp),%eax**
   0x00005555555551ff <+59>:	callq  0x555555555135 <backtrace>
   **0x0000555555555204 <+64>:	movl   $0x0,-0x4(%rbp)**
```

这里加粗的表示返回地址，可以看到与上面的输出是对应的，不过由于 backtrace 是向后回溯的，与这里的**顺序刚好相反**。

### 使用 maps 文件来验证
上面 backtrace 程序运行的输出信息中 0x555555555204 这些地址是**程序被映射到虚拟内存空间的虚拟地址**，我通过执行如下步骤来获取到程序虚拟内存空间布局：

1. 使用 gdb 运行 backtrace 程序并在 main 函数处停下来
2. 使用 pmap 查看 backtrace 程序的虚拟内存空间映射

虚拟内存空间映射表如下：

```bash
[longyu@debian-10:21:17:56] glibc-2.28 $ pmap -p 5201
5201:   /home/longyu/problem_and_solution/program-problem/backtrace
0000555555554000      4K r---- /home/longyu/problem_and_solution/program-problem/backtrace
0000555555555000      4K r-x-- /home/longyu/problem_and_solution/program-problem/backtrace
0000555555556000      4K r---- /home/longyu/problem_and_solution/program-problem/backtrace
0000555555557000      4K r---- /home/longyu/problem_and_solution/program-problem/backtrace
0000555555558000      4K rw--- /home/longyu/problem_and_solution/program-problem/backtrace
00007ffff7dea000    136K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7e0c000   1312K r-x-- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7f54000    304K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7fa0000      4K ----- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7fa1000     16K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7fa5000      8K rw--- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007ffff7fa7000     24K rw---   [ anon ]
00007ffff7fd0000     12K r----   [ anon ]
00007ffff7fd3000      8K r-x--   [ anon ]
00007ffff7fd5000      4K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007ffff7fd6000    120K r-x-- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007ffff7ff4000     32K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007ffff7ffc000      4K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007ffff7ffd000      4K rw--- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007ffff7ffe000      4K rw---   [ anon ]
00007ffffffdd000    136K rw---   [ stack ]
 total             2148K
```
这里我们需要关注 backtrace 程序在虚拟内存空间中的布局，可以看到有几个项目，起始地址为 0000555555554000，对应的项目如下：

```bash
0000555555554000      4K r---- /home/longyu/problem_and_solution/program-problem/backtrace
```
0000555555554000  即为 backtrace 程序映射的起始地址，我们用 backtrace 程序的输出地址减掉这个起始地址，将会得到下面几个地址：

0x1204
0x1258
0x1281
0x12a3

将这几个地址写入一个名为 test 的文件中，使用 xargs 读取这个文件制作参数调用 addr2line 命令，得到了如下信息：

```bash
[longyu@debian-10:21:37:35] program-problem $ xargs -a ./test  addr2line -e ./backtrace 
/home/longyu/problem_and_solution/program-problem/./backtrace.c:38
/home/longyu/problem_and_solution/program-problem/./backtrace.c:52
/home/longyu/problem_and_solution/program-problem/./backtrace.c:63
/home/longyu/problem_and_solution/program-problem/./backtrace.c:72
```
可以看到 addr2line 成功解析出了指令在代码中的位置。对于动态库中的函数地址，有类似的过程！

## 总结
一个简单的知识背后可能蕴藏了很多的问题，这些问题环环相扣，当你处在分析问题的过程中时，常常会感到头痛，但将整个过程串联起来后，却又会有非常大的成就感。

从一个问题跳跃到另外一个问题，绕来绕去最终又回到最初的问题，不过此时知识面得到了扩充，输入增加了，有了这个增加的输入信息，最初的问题已经不算是问题了！

本文的问题脉络大致有如下几点：

1. 如何使用 mtrace？
2. mtrace 脚本为什么不能打印源码行号？
3. addr2line 为什么不能打印源码行号？
4. mtrace 函数是如何工作的？
5. RETURN_ADDRESS 宏的定义是什么？
6. gcc 内建的 __builtin_return_address 是如何实现的？
7. 从 backtrace 程序再次回到第三个问题

注意在第 7 个关键点的时候，又回到了 3 这个点，不过这时候我有了 maps 文件这个输入，这个输入让 addr2line 不能打印行号的问题迎刃而解！

列出这些关键点只想抛出一个问题：**你觉得自己会在哪个点结束呢？**
