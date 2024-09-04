import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/electron-react/',
  lang: 'zh-CN',
  title: "electron-react脚手架",
  description: "electron-react 文档",
  head: [
    ['link', { rel: 'icon', href: 'https://vitepress.dev/vitepress-logo-large.webp' }],
    ["meta", {name:"referrer", content:"no-referrer"}],
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],
    sidebar: [
      {text: '简介', link: '/docs/introduction/index'},
      { text: '快速开始', link: '/docs/getting-started/index'},
      { text: '开发',collapsed:false, link: '/docs/getting-started/index',
        items: [
          { text: '项目结构', link: '/docs/development/project-structure' },
          { text: '渲染进程', link: '/docs/development/rendering-process' },
          { text: '主进程', link: '/docs/development/main-process' },
          { text: 'create-react-app配置', link: '/docs/development/cra-setting' },
        ]
      },
      { text: '部署',collapsed:false, link: '/docs/getting-started/index',
        items: [
          { text: '生产编译', link: '/docs/development/project-structure' },
          { text: '桌面应用更新', link: '/docs/development/rendering-process' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
