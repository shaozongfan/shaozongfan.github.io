在Linux内核中，信号处理是一个复杂的过程，涉及用户态和内核态的交互。以下是信号处理的详细流程，结合代码和注释进行说明。

# 一、信号处理的整体流程

信号处理的流程可以分为以下几个步骤：

1. 信号产生：内核或用户程序发送信号。

2. 信号传递：内核将信号添加到目标进程的信号队列中。

3. 信号检查：在进程从内核态返回到用户态时，内核检查是否有未处理的信号。

4. 信号处理：

   ​	如果进程注册了信号处理函数，内核会调用该函数。

   ​	如果没有注册处理函数，内核会执行默认行为（如终止进程、忽略信号等）。

5. 信号处理完成：进程返回到被信号打断的代码位置继续执行。

# 二、信号处理的代码实现

以下是Linux内核中信号处理的核心代码片段，结合注释进行说明。

## 2.1 信号传递

当内核需要向进程发送信号时，会调用`send_signal()`函数

```
</kernel/signal.c>
/**
 * send_signal - 向指定任务发送信号
 * @sig: 要发送的信号编号
 * @info: 指向kernel_siginfo结构的指针，包含信号信息
 * @t: 指向目标任务结构的指针
 * @type: 进程ID类型
 *
 * 此函数负责向指定的任务发送信号。根据信号的不同来源和类型，
 * 可能需要强制发送信号（即使目标进程通常会忽略该信号）。
 * 函数处理了不同命名空间之间的信号发送，并适当调整信号发送者的
 * 用户ID和进程ID信息。
 *
 * 返回值：成功发送信号返回0，失败返回相应的错误码
 */
static int send_signal(int sig, struct kernel_siginfo *info, struct task_struct *t,
			enum pid_type type)
{
	/* Should SIGKILL or SIGSTOP be received by a pid namespace init? */ //  检查SIGKILL或SIGSTOP信号是否应该被pid namespace的init进程接收
	bool force = false;

	if (info == SEND_SIG_NOINFO) {
		/* Force if sent from an ancestor pid namespace */
		force = !task_pid_nr_ns(current, task_active_pid_ns(t)); //  根据当前进程和目标进程的命名空间关系决定是否强制发送信号
	} else if (info == SEND_SIG_PRIV) { //  判断是否为特权信号发送
		/* Don't ignore kernel generated signals */ //  不要忽略内核生成的信号
		force = true;
	} else if (has_si_pid_and_uid(info)) { //  检查是否具有特殊信号ID和用户ID
		/* SIGKILL and SIGSTOP is special or has ids */ //  SIGKILL和SIGSTOP是特殊信号或者具有ID
		struct user_namespace *t_user_ns; //  定义用户命名空间指针

		rcu_read_lock(); //  读锁，确保RCU读临界区安全
		t_user_ns = task_cred_xxx(t, user_ns); //  获取目标任务的用户命名空间
		if (current_user_ns() != t_user_ns) { //  如果当前用户命名空间与目标不同
			kuid_t uid = make_kuid(current_user_ns(), info->si_uid); //  创建当前命名空间的UID
			info->si_uid = from_kuid_munged(t_user_ns, uid); //  转换为目标命名空间的UID
		}
		rcu_read_unlock(); //  释放读锁

		/* A kernel generated signal? */ //  是否为内核生成的信号
		force = (info->si_code == SI_KERNEL); //  设置force标志

		/* From an ancestor pid namespace? */ //  是否来自祖先PID命名空间
		if (!task_pid_nr_ns(current, task_active_pid_ns(t))) { //  如果当前进程不在目标的PID命名空间中
			info->si_pid = 0; //  重置发送者PID为0
			force = true; //  设置强制发送标志
		}
	}
	return __send_signal(sig, info, t, type, force); //  调用底层信号发送函数
}
```

- **`send_signal()`**：将信号添加到目标进程的信号队列中。
- **`signal_wake_up()`**：如果进程处于可中断睡眠状态，唤醒进程。

## 2.2  信号检查

在进程从内核态返回到用户态时，内核会调用`do_signal()`函数检查是否有未处理的信号。

```
<arch/arm64/kernel/signal.c>

/**
 * do_signal - 处理当前进程的待处理信号
 * @regs: 指向CPU寄存器状态的指针，包含当前进程的上下文信息
 * 
 * 该函数负责处理当前进程的待处理信号。主要功能包括：
 * 1. 检查是否在系统调用中，如果是则处理系统调用重启相关逻辑
 * 2. 获取需要传递的信号，并根据信号设置决定是否重启系统调用
 * 3. 如果没有需要处理的信号，则处理系统调用重启的特殊情况
 * 4. 恢复保存的信号掩码
 * 
 * 注意：该函数在返回用户空间之前被调用，此时调试器可能改变所有寄存器的值
 */
static void do_signal(struct pt_regs *regs)
{
	unsigned long continue_addr = 0, restart_addr = 0;
	int retval = 0;
	struct ksignal ksig;
	bool syscall = in_syscall(regs);

	/*
	 * 如果来自系统调用，检查是否需要重启系统调用...
	 */
	if (syscall) {
		continue_addr = regs->pc;
		restart_addr = continue_addr - (compat_thumb_mode(regs) ? 2 : 4);
		retval = regs->regs[0];

		/*
		 * 避免通过ret_to_user进行额外的系统调用重启
		 */
		forget_syscall(regs);

		/*
		 * 准备系统调用重启。我们在这里做这个操作，这样调试器就能看到已经改变的PC。
		 */
		switch (retval) {
		case -ERESTARTNOHAND:
		case -ERESTARTSYS:
		case -ERESTARTNOINTR:
		case -ERESTART_RESTARTBLOCK:
			regs->regs[0] = regs->orig_x0;
			regs->pc = restart_addr;
			break;
		}
	}

	/*
	 * 获取需要传递的信号。在ptrace下运行时，此时调试器可能会改变我们的所有寄存器。
	 */
	if (get_signal(&ksig)) {
		/*
		 * 根据信号设置，我们可能需要撤销重启系统调用的决定，
		 * 但如果调试器选择在不同的PC处重启，则跳过此步骤。
		 */
		if (regs->pc == restart_addr &&
		    (retval == -ERESTARTNOHAND ||
		     retval == -ERESTART_RESTARTBLOCK ||
		     (retval == -ERESTARTSYS &&
		      !(ksig.ka.sa.sa_flags & SA_RESTART)))) {
			syscall_set_return_value(current, regs, -EINTR, 0);
			regs->pc = continue_addr;
		}

		handle_signal(&ksig, regs);
		return;
	}

	/*
	 * 处理重启不同的系统调用。如上所述，如果调试器选择在不同的PC处重启，则忽略重启。
	 */
	if (syscall && regs->pc == restart_addr) {
		if (retval == -ERESTART_RESTARTBLOCK)
			setup_restart_syscall(regs);
		user_rewind_single_step(current);
	}

	restore_saved_sigmask();
}
```

- **`get_signal()`**：从信号队列中获取一个未处理的信号。
- **`handle_signal()`**：调用用户注册的信号处理函数。

## 2.3信号处理

如果进程注册了信号处理函数，内核会调用`handle_signal()`函数。

```
<arch/arm64/kernel/signal.c>
/**
 * handle_signal - 处理信号传递和设置信号处理栈帧
 * @ksig: 包含信号信息的结构体指针
 * @regs: 指向处理器寄存器状态的指针
 * 
 * 该函数负责处理信号的传递，包括设置信号处理程序的栈帧，
 * 并确保寄存器状态的有效性。根据任务是否为兼容模式（compat mode），
 * 选择不同的栈帧设置方式。最后，检查寄存器状态是否有效，
 * 并完成信号处理的设置。
 * 
 * 注意：该函数在内核信号处理路径中被调用。
 */
static void handle_signal(struct ksignal *ksig, struct pt_regs *regs)
{
	sigset_t *oldset = sigmask_to_save(); //  保存当前信号掩码
	int usig = ksig->sig; //  获取信号编号
	int ret; //  返回值，用于标记操作是否成功

	rseq_signal_deliver(ksig, regs); //  执行线程相关的信号处理

	/*
	 * Set up the stack frame
	 */
	if (is_compat_task()) { //  检查当前任务是否为兼容模式
		if (ksig->ka.sa.sa_flags & SA_SIGINFO) //  如果是兼容模式且设置了SA_SIGINFO标志，则设置兼容版本的实时信号处理帧
			ret = compat_setup_rt_frame(usig, ksig, oldset, regs);
		else //  否则设置兼容版本的普通信号处理帧
			ret = compat_setup_frame(usig, ksig, oldset, regs);
	} else {
		ret = setup_rt_frame(usig, ksig, oldset, regs); //  非兼容模式下，设置实时信号处理帧
	}

	/*
	 * Check that the resulting registers are actually sane.
	 */
	ret |= !valid_user_regs(&regs->user_regs, current); //  将valid_user_regs函数的返回值与ret进行按位或操作，并更新ret的值 valid_user_regs用于验证用户寄存器的有效性，参数为用户寄存器结构和当前进程 如果寄存器无效，则!valid_user_regs返回1，否则返回0

	/* Step into the signal handler if we are stepping */
	signal_setup_done(ret, ksig, test_thread_flag(TIF_SINGLESTEP)); //  如果当前线程设置了单步执行标志(TIF_SINGLESTEP)，则进入信号处理程序 signal_setup_done函数完成信号处理的设置工作 参数ret表示之前的处理状态，ksig表示信号结构，test_thread_flag用于检查线程标志
}
```

## 2.4 信号处理完成

信号处理函数执行完毕后，进程会返回到被信号打断的代码位置继续执行

```
<arch/arm64/kernel/signal.c>
/**
 * rt_sigreturn - 系统调用，用于从信号处理程序返回并恢复进程上下文
 * 
 * 该函数实现了rt_sigreturn系统调用，其主要功能是：
 * 1. 确保任何待重启的系统调用返回-EINTR
 * 2. 检查栈指针是否对齐（128位边界）
 * 3. 验证用户空间信号帧的内存可访问性
 * 4. 恢复信号帧中的寄存器状态
 * 5. 恢复备选栈信息
 * 6. 返回原始系统调用的返回值
 * 
 * 返回值：
 * 成功时返回原始系统调用的返回值（regs->regs[0]）
 * 失败时发送段错误信号并返回0
 */
SYSCALL_DEFINE0(rt_sigreturn)
{
	struct pt_regs *regs = current_pt_regs(); //  获取当前进程的寄存器状态
	struct rt_sigframe __user *frame; //  定义一个指向用户空间信号帧结构的指针

	/* Always make any pending restarted system calls return -EINTR */
	current->restart_block.fn = do_no_restart_syscall; //  设置当前进程的重启块函数为do_no_restart_syscall，表示不重启系统调用

	/*
	 * Since we stacked the signal on a 128-bit boundary, then 'sp' should
	 * be word aligned here.
	 */
	if (regs->sp & 15)
		goto badframe;

	frame = (struct rt_sigframe __user *)regs->sp;

	if (!access_ok(frame, sizeof (*frame))) /* * 检查传入的frame指针是否有效 * 如果访问不安全，则跳转到badframe标签处 */
		goto badframe;

	if (restore_sigframe(regs, frame)) /*	 * 尝试恢复信号帧	 * 如果恢复失败，则跳转到badframe标签处	 */
		goto badframe;

	if (restore_altstack(&frame->uc.uc_stack)) /*	 * 恢替备用栈	 * 如果恢复失败，则跳转到badframe标签处	 */
		goto badframe;

	return regs->regs[0]; //  返回寄存器0中的值

badframe:
	arm64_notify_segfault(regs->sp); //  发生段错误通知，并返回0
	return 0;
}

```

# 三、信号处理的场景和影响

（1）场景1：进程正在运行
场景：进程正在执行用户态代码，突然收到信号（如SIGINT）。

流程：

- 内核将信号添加到进程的信号队列中。

- 进程从内核态返回到用户态时，检查到未处理的信号。

- 内核调用用户注册的信号处理函数。

- 信号处理函数执行完毕后，进程返回到被信号打断的代码位置继续执行。


影响：进程的执行被信号打断，但会继续执行。

（2）场景2：进程处于可中断睡眠
场景：进程正在等待I/O操作（如read()），突然收到信号（如SIGTERM）。

流程：

- 内核将信号添加到进程的信号队列中。

- 内核唤醒进程，并将其状态设置为TASK_RUNNING。

- 进程从内核态返回到用户态时，检查到未处理的信号。

- 内核调用用户注册的信号处理函数。

- 信号处理函数执行完毕后，进程返回到被信号打断的代码位置继续执行。


影响：进程被信号唤醒，I/O操作可能被中断。

（3）场景3：进程处于不可中断睡眠
场景：进程正在等待硬件I/O操作（如磁盘读写），突然收到信号（如SIGKILL）。

流程：

- 内核将信号添加到进程的信号队列中。

- 由于进程处于不可中断睡眠状态，信号不会唤醒进程。

- 进程继续等待硬件I/O操作完成。

- 硬件I/O操作完成后，进程被唤醒并处理信号。


影响：信号不会立即生效，进程必须等待硬件操作完成。
