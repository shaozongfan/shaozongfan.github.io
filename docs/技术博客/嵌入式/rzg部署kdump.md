busybox支持kdump

一、内核选项支持

```
CONFIG_KEXEC=y
CONFIG_KEXEC_CORE=y
CONFIG_SYSFS=y
CONFIG_DEBUG_INFO=Y
CONFIG_CRASH_DUMP=y
CONFIG_PROC_VMCORE=y
CONFIG_PROC_KCORE=y
CONFIG_PROC_VMCORE=y
```


# CONFIG_CMA is not set  //必选
然后编译成新的内核和设备树。

二、应用程序移植kdump和kexec
需要将kexec、vmcore-dmesg、makedumpfile三个工具和依赖库移植到开发板卡上

```
ldd /usr/bin/kexec
    linux-vdso.so.1 (0x0000007f87fd3000)
    libz.so.1 => /lib/aarch64-linux-gnu/libz.so.1 (0x0000007f87f1e000)
    libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000007f87dab000)
    /lib/ld-linux-aarch64.so.1 (0x0000007f87fa3000)

ldd /usr/sbin/vmcore-dmesg 
    linux-vdso.so.1 (0x0000007f92820000)
    libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000007f9264b000)
    /lib/ld-linux-aarch64.so.1 (0x0000007f927f0000)
    
    
ldd /usr/bin/makedumpfile
    linux-vdso.so.1 (0x0000007f8f8a4000)
    libpthread.so.0 => /lib/aarch64-linux-gnu/libpthread.so.0 (0x0000007f8f7bd000)
    liblzo2.so.2 => /lib/aarch64-linux-gnu/liblzo2.so.2 (0x0000007f8f78f000)
    libdw.so.1 => /lib/aarch64-linux-gnu/libdw.so.1 (0x0000007f8f72b000)
    libdl.so.2 => /lib/aarch64-linux-gnu/libdl.so.2 (0x0000007f8f717000)
    libelf.so.1 => /lib/aarch64-linux-gnu/libelf.so.1 (0x0000007f8f6ea000)
    libz.so.1 => /lib/aarch64-linux-gnu/libz.so.1 (0x0000007f8f6c0000)
    libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000007f8f54d000)
    /lib/ld-linux-aarch64.so.1 (0x0000007f8f874000)
    liblzma.so.5 => /lib/aarch64-linux-gnu/liblzma.so.5 (0x0000007f8f519000)
    libbz2.so.1.0 => /lib/aarch64-linux-gnu/libbz2.so.1.0 (0x0000007f8f4f8000)
```

三、制作启动第二内核的文件系统
使用将kexec、vmcore-dmesg、makedumpfile三个工具和依赖库移植完成的文件系统比如

```
cd ram
ls

ata2  dev  firmware  home  lib      mnt  proc     root  sbin  ssd   sys  usr
bin   etc  flashDev  init  linuxrc  opt  ramDisk  run   srv   stop  tmp  var
```

在文件系统所在的目录执行如下命令

```
sudo find . | cpio -o -H newc > ../test.cpio
sudo gzip -9 < ../test.cpio > ../test.cpio.gz
```

四、编写脚本
编写kexec.sh脚本，配置完成后可以触发启动第二内核。该脚本在正常的文件系统中部署

```
#!/bin/bash
kexec -p /root/Image-smarc-rzg2l.bin --initrd=test.cpio.gz --append="root=/dev/mmcblk1p1 debug"
cat /sys/kernel/kexec_crash_size
cat /sys/kernel/kexec_crash_loaded
```

其中Image-smarc-rzg2l.bin是步骤一内核选型支持编译出来的内核和设备树。

```
kexec -p /root/Image-smarc-rzg2l.bin --initrd=test.cpio.gz --append="root=/dev/mmcblk1p1 debug"
```

-p​​：指定加载的内核用于崩溃转储（与 -l不同，-p专为 kdump 场景设计）/root/Image-smarc-rzg2l.bin​​：目标内核镜像文件（需与当前运行内核架构匹配，如 ARM64）。
​--initrd=test.cpio.gz​​：指定初始 RAM 磁盘（initrd），通常包含捕获内核所需的驱动和工具（如 makedumpfile）
​--append​​：传递内核启动参数，例如：root=/dev/mmcblk1p1：指定根文件系统设备。debug：启用内核调试输出

编写vmcore.sh脚本，该脚本用于生成vmcore文件。该脚本在第二内核启动后的文件系统中使用。

```
#!/bin/bash

/etc/init.d/haveged restart
/etc/init.d/ssh restart

vmcore-dmesg /proc/vmcore > vdmesg-test.txt

makedumpfile -l --message-level 1 -d 31 /proc/vmcore vmcore-test



scp vmcore-test kylin@172.30.192.248:/home/kylin/test/kdump
scp vdmesg-test.txt kylin@172.30.192.248:/home/kylin/test/kdump
​
```

vmcore-dmesg /proc/vmcore > vdmesg-test.txt
vmcore-dmesg：用于从内核崩溃转储文件（/proc/vmcore）中提取内核日志（dmesg）的工具。
/proc/vmcore：是内核崩溃时生成的转储文件，包含崩溃时的内存状态和内核日志。

> vdmesg-test.txt：将提取的日志重定向到vdmesg-test.txt文件中。
​
makedumpfile -l --message-level 1 -d 31 /proc/vmcore vmcore-test
-l：使用LZO压缩算法压缩转储数据（需编译时启用USELZO=on）。
--message-level 1：限制输出消息级别为1（仅显示关键错误信息）。
-d 31：指定转储级别为31，排除以下页面类型：
        1（填零页面）
        2（非私有缓存页面）
        4（所有缓存页面）
        8（用户进程数据页面）
        16（空闲页面）
/proc/vmcore：输入文件，即崩溃内核的内存映像。
vmcore-test：输出文件，生成压缩后的转储文件。

五、测试
1、重启设置uboot的bootargs参数，加入crashkernel=512M

```
root=/dev/mmcblk1p1  rootwait rw isolcpus=1 nohz_full=1 crashkernel=512M
```

2、替换第一步编译的编译成新的内核和设备树，作为默认内核和设备树启动，然后启动文件系统
3、将第三步制作启动第二内核的文件系统制作的test.cpio.gz和第四部编写的kexec.sh脚本拷贝到，文件系统内

```
ls kdump
Image-smarc-rzg2l.bin              kexec.sh          Image-r9a07g044l2-smarc.dtb         test.cpio.gz
```

执行kexec.sh

```
./kexec.sh

./kexec.sh 
536870912
1
```

4、触发kdump，执行如下命令

```
echo c > /proc/sysrq-trigger
```

触发启动第二内核日志如下

```
echo c > /proc/sysrq-trigger                                     
[   39.750075] sysrq: SysRq : Trigger a crash                                                
[   39.754270] Unable to handle kernel NULL pointer dereference at virtual address 0000000000
[   39.763050] Mem abort info:                                                               
[   39.765839]   ESR = 0x96000046                                                            
[   39.768889]   Exception class = DABT (current EL), IL = 32 bits                           
[   39.774803]   SET = 0, FnV = 0                                                            
[   39.777852]   EA = 0, S1PTW = 0                                                           
[   39.780986] Data abort info:                                                              
[   39.783860]   ISV = 0, ISS = 0x00000046                                                   
[   39.787689]   CM = 0, WnR = 1                                                             
[   39.790647] user pgtable: 4k pages, 48-bit VAs, pgdp = 0000000004c0b539                   
[   39.797254] [0000000000000000] pgd=00000021744ac003, pud=0000002175db3003, pmd=00000000000
[   39.805952] Internal error: Oops: 96000046 [#1] PREEMPT SMP                               
[   39.811514] Modules linked in:                                                            
[   39.814559] CPU: 3 PID: 2183 Comm: sh Kdump: loaded Not tainted 4.19.90-g79148c6d4-dirty 2
[   39.822986] Hardware name: FT-2000/4-D4-DSK Development Board (DT)                        
[   39.829155] pstate: 60000005 (nZCv daif -PAN -UAO)                                        
[   39.833938] pc : sysrq_handle_crash+0x28/0x38                                             
[   39.838283] lr : sysrq_handle_crash+0x14/0x38                                             
[   39.842628] sp : ffff00000f983c50                                                         
[   39.845931] x29: ffff00000f983c50 x28: ffff8020f1fe5280                                   
[   39.851234] x27: 0000000000000000 x26: 0000000000000000                                   
[   39.856536] x25: 0000000056000000 x24: ffff00000a0af000                                   
[   39.861837] x23: 0000000000000000 x22: 0000000000000007                                   
[   39.867139] x21: ffff00000a0afa38 x20: 0000000000000063                                   
[   39.872441] x19: ffff000009f4f000 x18: ffffffffffffffff                                   
[   39.877742] x17: 0000000000000000 x16: 0000000000000000                                   
[   39.883044] x15: ffff000009f2a788 x14: ffff00008a1a753f                                   
[   39.888345] x13: ffff00000a1a754d x12: ffff000009f4f000                                   
[   39.893647] x11: 0000000005f5e0ff x10: ffff000009f2a9e8                                   
[   39.898949] x9 : ffff000008931bc0 x8 : 6120726567676972                                   
[   39.904250] x7 : 54203a2071527379 x6 : 0000000000000397                                   
[   39.909552] x5 : 0000000000000000 x4 : ffff8020f1fe5280                                   
[   39.914854] x3 : ffff000009f2b000 x2 : 38d1cde1282e1e00                                   
[   39.920155] x1 : 0000000000000001 x0 : 0000000000000000                                   
[   39.925457] Process sh (pid: 2183, stack limit = 0x0000000097ef60d4)                      
[   39.931799] Call trace:                                                                   
[   39.934235]  sysrq_handle_crash+0x28/0x38                                                 
[   39.938233]  __handle_sysrq+0xb0/0x1a8                                                    
[   39.941971]  write_sysrq_trigger+0x70/0x88                                                
[   39.946058]  proc_reg_write+0x80/0xd8                                                     
[   39.949710]  __vfs_write+0x60/0x180                                                       
[   39.953187]  vfs_write+0xac/0x1c0                                                         
[   39.956491]  ksys_write+0x6c/0xd8                                                         
[   39.959794]  __arm64_sys_write+0x24/0x30                                                  
[   39.963707]  el0_svc_common+0x7c/0x118                                                    
[   39.967444]  el0_svc_handler+0x38/0x78                                                    
[   39.971182]  el0_svc+0x8/0xc                                                              
[   39.974052] Code: 52800021 b903c001 d5033e9f d2800000 (39000001)                          
[   39.980139] SMP: stopping secondary CPUs                                                  
NNNOOOTTTIIICCCEEE:::      SSSttta[daddSSrri1c   atl:0088000a022u                            
 kIrE: .ft2                                                                                  
           04_pwr_domain_off                                                                 
NOTICE:  [CLUST_PSOCFG_REG]= 50                                                              
NOTICE:  ft2004_pwr_domr_dooff                                                               
pwrICE: _[CLUSNOTSOE:G_REG]= fi_e                                                            
                                 NOTI E:  ft2004_pwr_domain_off                              
NOTICE:  [CLUST_PSOCFG_REG]= 53                                                              
NOTICE:  power off cluster, CLUST_PSOCFG_REG = 0x53.                                         
NOTICE:  ft2004_psci_pwr_domain_pwr_down_wfi                                                 
NOTICE:  scpi_wfi_enalbe                                                                     
[   40.018025] Bye! 
```

5、第二内核启动后生成vmcore
进入第二内核启动的系统后，执行如下命令

```
./vmcore.sh
```

将生成如下文件

```
vdmesg-test.txt  vmcore-test
```

将这两个文件导出即可，最好通过网络传输出来
六、常见问题
6.1 问题：vmcore-dmesg /proc/vmcore 报错No program header covering vaddr 0xffff800010ee29f0found kexec bug?
解决方法：建议将kexec-tools升级到最新版本

6.2 问题：使用crash工具报错
gdb called without error_hook: Dwarf Error: wrong version in compilation unit header (is 0, should be 2, 3, or 4) [in module /home/rlk/szf/rzg/kernel-source/vmlinux]
Dwarf Error: wrong version in compilation unit header (is 0, should be 2, 3, or 4) [in module /home/rlk/szf/rzg/kernel-source/vmlinux]

crash: kernel-source/vmlinux: no debugging data available
解决方法：gcc版本要10以下