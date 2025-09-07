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
    component: ComponentCreator('/docs', 'da1'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'f8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
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
