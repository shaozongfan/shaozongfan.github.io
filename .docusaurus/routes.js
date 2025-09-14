import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '27a'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'd74'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '78f'),
    exact: true
  },
  {
    path: '/blog/libc/使用mtrace跟踪内存泄露问题',
    component: ComponentCreator('/blog/libc/使用mtrace跟踪内存泄露问题', '684'),
    exact: true
  },
  {
    path: '/blog/linux-kernel/linux-内核模块中引用符号是如何链接的',
    component: ComponentCreator('/blog/linux-kernel/linux-内核模块中引用符号是如何链接的', 'c7c'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '083'),
    exact: true
  },
  {
    path: '/blog/shaozongfan-blog-post',
    component: ComponentCreator('/blog/shaozongfan-blog-post', '8c3'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '71a'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '97f'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'be9'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', 'e7c'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '211'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '228'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'c09'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ac1'),
    routes: [
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人博客/docusaurus2.4',
        component: ComponentCreator('/docs/个人博客/docusaurus2.4', 'dbc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人博客/docusaurus3.7',
        component: ComponentCreator('/docs/个人博客/docusaurus3.7', '1b0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人生活/2025国家生育政策8大补贴汇总',
        component: ComponentCreator('/docs/个人生活/2025国家生育政策8大补贴汇总', 'ee1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人生活/孕早期',
        component: ComponentCreator('/docs/个人生活/孕早期', '907'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人生活/怀孕注意',
        component: ComponentCreator('/docs/个人生活/怀孕注意', '4bd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人生活/自建房',
        component: ComponentCreator('/docs/个人生活/自建房', '047'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/个人生活/顺产',
        component: ComponentCreator('/docs/个人生活/顺产', '0ae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/人生哲学/人生的底层逻辑',
        component: ComponentCreator('/docs/人生哲学/人生的底层逻辑', 'c84'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/AI相关/AI核心技能',
        component: ComponentCreator('/docs/技术博客/AI相关/AI核心技能', '548'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/1.1　设备驱动的作用',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/1.1　设备驱动的作用', 'a0a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/1.2　无操作系统时的设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/1.2　无操作系统时的设备驱动', 'cd1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/1.3　有操作系统时的设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/1.3　有操作系统时的设备驱动', 'b85'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/1.4　Linux设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/1.4　Linux设备驱动', '753'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/1.6　设备驱动Hello World：LED驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/1.6　设备驱动Hello World：LED驱动', '7b4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.1　中断与定时器',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.1　中断与定时器', 'cc7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.2　Linux中断处理程序架构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.2　Linux中断处理程序架构', '0ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.3　Linux中断编程',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.3　Linux中断编程', '335'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.4　中断共享',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.4　中断共享', '620'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.5　内核定时器',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.5　内核定时器', 'd7a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.6　内核延时',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.6　内核延时', '372'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/10.7　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/10.7　总结', '1e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.1　CPU与内存、IO',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.1　CPU与内存、IO', 'c44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.2　Linux内存管理',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.2　Linux内存管理', 'd16'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.3　内存存取',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.3　内存存取', 'c85'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.4　设备IO端口和IO内存的访问',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.4　设备IO端口和IO内存的访问', 'dd6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.5　IO内存静态映射',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.5　IO内存静态映射', '64a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.6　DMA',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.6　DMA', 'db2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/11.7　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/11.7　总结', '325'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/12.1　Linux驱动的软件架构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/12.1　Linux驱动的软件架构', '932'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/12.2　platform设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/12.2　platform设备驱动', 'f19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/12.3　设备驱动的分层思想',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/12.3　设备驱动的分层思想', '2ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/12.4　主机驱动与外设驱动分离的设计思想',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/12.4　主机驱动与外设驱动分离的设计思想', '926'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.1　块设备的IO操作特点',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.1　块设备的IO操作特点', 'c3e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.2　Linux块设备驱动结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.2　Linux块设备驱动结构', '8bc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.3　Linux块设备驱动的初始化',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.3　Linux块设备驱动的初始化', '65e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.4　块设备的打开与释放',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.4　块设备的打开与释放', '7b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.5　块设备驱动的ioctl函数',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.5　块设备驱动的ioctl函数', '165'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.6　块设备驱动的IO请求处理',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.6　块设备驱动的IO请求处理', '763'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.7　实例：vmem_disk驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.7　实例：vmem_disk驱动', '3a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.8　Linux MMC子系统',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.8　Linux MMC子系统', '88a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/13.9　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/13.9　总结', 'cb7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.1　Linux网络设备驱动的结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.1　Linux网络设备驱动的结构', 'baf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.10　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.10　总结', '092'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.2　网络设备驱动的注册与注销',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.2　网络设备驱动的注册与注销', 'cd2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.3　网络设备的初始化',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.3　网络设备的初始化', '1f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.4　网络设备的打开与释放',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.4　网络设备的打开与释放', 'b51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.5　数据发送流程',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.5　数据发送流程', '042'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.6　数据接收流程',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.6　数据接收流程', 'f3c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.7　网络连接状态',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.7　网络连接状态', '147'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.8　参数设置和统计数据',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.8　参数设置和统计数据', '301'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/14.9　DM9000网卡设备驱动实例',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/14.9　DM9000网卡设备驱动实例', 'ef2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.1　Linux I2 C体系结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.1　Linux I2 C体系结构', '8c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.2　Linux I2 C核心',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.2　Linux I2 C核心', 'fab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.3　Linux I2 C适配器驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.3　Linux I2 C适配器驱动', '949'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.4　Linux I2 C设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.4　Linux I2 C设备驱动', '8be'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.5　Tegra I2 C总线驱动实例',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.5　Tegra I2 C总线驱动实例', '5cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.6　AT24xx EEPROM的I2 C设备驱动实例',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.6　AT24xx EEPROM的I2 C设备驱动实例', '32d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/15.7　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/15.7　总结', '429'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.1　Linux USB驱动层次',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.1　Linux USB驱动层次', '616'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.2　USB主机控制器驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.2　USB主机控制器驱动', '0e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.3　USB设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.3　USB设备驱动', 'f83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.4　USB UDC与Gadget驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.4　USB UDC与Gadget驱动', 'e14'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.5　USB OTG驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.5　USB OTG驱动', 'a93'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/16.6　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/16.6　总结', '257'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/17.1　I2 C、SPI、USB驱动架构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/17.1　I2 C、SPI、USB驱动架构', '0e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/17.2　I2 C主机和外设眼里的Linux世界',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/17.2　I2 C主机和外设眼里的Linux世界', '62b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/18.1　ARM设备树起源',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/18.1　ARM设备树起源', '1cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/18.2　设备树的组成和结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/18.2　设备树的组成和结构', 'df7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/18.3　由设备树引发的BSP和驱动变更',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/18.3　由设备树引发的BSP和驱动变更', '3ee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/18.4　常用的OF API',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/18.4　常用的OF API', 'f40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/18.5　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/18.5　总结', '937'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.1　Linux电源管理的全局架构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.1　Linux电源管理的全局架构', 'ce4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.10　运行时的PM',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.10　运行时的PM', '2eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.11　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.11　总结', 'd51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.2　CPUFreq驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.2　CPUFreq驱动', '887'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.3　CPUIdle驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.3　CPUIdle驱动', 'd60'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.4　PowerTop',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.4　PowerTop', 'c7d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.5　Regulator驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.5　Regulator驱动', 'cb8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.6　OPP',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.6　OPP', '7a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.7　PM QoS',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.7　PM QoS', '10e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.8　CPU热插拔',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.8　CPU热插拔', '6e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/19.9　挂起到RAM',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/19.9　挂起到RAM', 'f33'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.1　处理器',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.1　处理器', '3a3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.2　存储器',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.2　存储器', 'ca6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.3　接口与总线',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.3　接口与总线', 'af7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.4　CPLD和FPGA',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.4　CPLD和FPGA', '713'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.5　原理图分析',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.5　原理图分析', '54a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.6　硬件时序分析',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.6　硬件时序分析', 'ebf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.7　芯片数据手册阅读方法',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.7　芯片数据手册阅读方法', '1d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/2.8　仪器仪表使用',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/2.8　仪器仪表使用', '398'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.1　ARM Linux底层驱动的组成和现状',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.1　ARM Linux底层驱动的组成和现状', 'c79'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.10　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.10　总结', 'c34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.2　内核节拍驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.2　内核节拍驱动', '604'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.3　中断控制器驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.3　中断控制器驱动', '1b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.4　SMP多核启动以及CPU热插拔驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.4　SMP多核启动以及CPU热插拔驱动', 'e3e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.5　DEBUG_LL和EARLY_PRINTK的设置',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.5　DEBUG_LL和EARLY_PRINTK的设置', 'e48'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.6　GPIO驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.6　GPIO驱动', 'a57'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.7　pinctrl驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.7　pinctrl驱动', 'c24'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.8　时钟驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.8　时钟驱动', 'c2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/20.9　dmaengine驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/20.9　dmaengine驱动', '4eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.1　GDB调试器的用法',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.1　GDB调试器的用法', 'c82'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.10　使用仿真器调试内核',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.10　使用仿真器调试内核', '09c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.11　应用程序调试',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.11　应用程序调试', 'b09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.12　Linux性能监控与调优工具',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.12　Linux性能监控与调优工具', '499'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.13　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.13　总结', '9fe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.2　Linux内核调试',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.2　Linux内核调试', 'd39'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.3　内核打印信息—printk（​）',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.3　内核打印信息—printk（​）', '5cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.4　DEBUG_LL和EARLY_PRINTK',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.4　DEBUG_LL和EARLY_PRINTK', '75a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.5　使用“proc”',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.5　使用“proc”', 'f24'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.6　Oops',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.6　Oops', '57b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.7　BUG_ON（​）和WARN_ON（​）',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.7　BUG_ON（​）和WARN_ON（​）', 'e0f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.8　strace',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.8　strace', 'bef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/21.9　KGDB',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/21.9　KGDB', '3c5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.1　Linux内核的发展与演变',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.1　Linux内核的发展与演变', 'ee9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.2　Linux 2.6后的内核特点',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.2　Linux 2.6后的内核特点', '441'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.3　Linux内核的组成',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.3　Linux内核的组成', 'c10'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.4　Linux内核的的编译及加载',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.4　Linux内核的的编译及加载', 'cd0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.5　Linux下的C编程特点',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.5　Linux下的C编程特点', 'e98'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/3.6　工具链',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/3.6　工具链', '4f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.1　Linux内核模块简介',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.1　Linux内核模块简介', 'a51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.10　使用模块“绕开”GPL',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.10　使用模块“绕开”GPL', '5bc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.2　Linux内核模块程序结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.2　Linux内核模块程序结构', 'ae8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.3　模块加载函数',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.3　模块加载函数', '3b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.4　模块卸载函数',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.4　模块卸载函数', '803'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.5　模块参数',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.5　模块参数', '08b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.6　导出符号',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.6　导出符号', 'aef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.7　模块声明与描述',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.7　模块声明与描述', 'f26'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.8　模块的使用计数',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.8　模块的使用计数', '815'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/4.9　模块的编译',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/4.9　模块的编译', '0eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/5.1　Linux文件操作',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/5.1　Linux文件操作', 'b42'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/5.2　Linux文件系统',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/5.2　Linux文件系统', '490'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/5.3　devfs',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/5.3　devfs', 'd27'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/5.4　udev用户空间设备管理',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/5.4　udev用户空间设备管理', 'a02'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/6.1　Linux字符设备驱动结构',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/6.1　Linux字符设备驱动结构', 'fa6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/6.2　globalmem虚拟设备实例描述',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/6.2　globalmem虚拟设备实例描述', 'b0a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/6.3　globalmem设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/6.3　globalmem设备驱动', '169'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.1　并发与竞态',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.1　并发与竞态', '449'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.10　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.10　总结', 'e61'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.2　编译乱序和执行乱序',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.2　编译乱序和执行乱序', '5b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.3　中断屏蔽',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.3　中断屏蔽', '471'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.4　原子操作',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.4　原子操作', '82b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.5　自旋锁',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.5　自旋锁', '371'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.6　信号量',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.6　信号量', 'e12'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.7　互斥体',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.7　互斥体', '1ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.8　完成量',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.8　完成量', '2f3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/7.9　增加并发控制后的globalmem的设备驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/7.9　增加并发控制后的globalmem的设备驱动', 'da7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/8.1　阻塞与非阻塞IO',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/8.1　阻塞与非阻塞IO', '59a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/8.2　轮询操作',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/8.2　轮询操作', 'b1a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/8.3　支持轮询操作的globalfifo驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/8.3　支持轮询操作的globalfifo驱动', 'c7c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/8.4　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/8.4　总结', '540'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/9.1　异步通知的概念与作用',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/9.1　异步通知的概念与作用', '28f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/9.2　Linux异步通知编程',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/9.2　Linux异步通知编程', 'cbc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/9.3　支持异步通知的globalfifo驱动',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/9.3　支持异步通知的globalfifo驱动', '417'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/9.4　Linux异步IO',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/9.4　Linux异步IO', 'f7b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/linux设备驱动开发详解/9.5　总结',
        component: ComponentCreator('/docs/技术博客/嵌入式/linux设备驱动开发详解/9.5　总结', 'bd3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/嵌入式/rzg部署kdump',
        component: ComponentCreator('/docs/技术博客/嵌入式/rzg部署kdump', 'ebf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/网络/网络问题',
        component: ComponentCreator('/docs/技术博客/网络/网络问题', 'd2f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/调试/linux信号机制',
        component: ComponentCreator('/docs/技术博客/调试/linux信号机制', 'f16'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/调试/Linux内核追踪神器：perf实现原理剖析',
        component: ComponentCreator('/docs/技术博客/调试/Linux内核追踪神器：perf实现原理剖析', '68b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/调试/Linux性能分析神器ftrace：从原理到实战',
        component: ComponentCreator('/docs/技术博客/调试/Linux性能分析神器ftrace：从原理到实战', '0d1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/调试/Linux性能工具(三)ftrace框架',
        component: ComponentCreator('/docs/技术博客/调试/Linux性能工具(三)ftrace框架', '339'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/技术博客/调试/信号机制学习记录',
        component: ComponentCreator('/docs/技术博客/调试/信号机制学习记录', '33b'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '40a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
