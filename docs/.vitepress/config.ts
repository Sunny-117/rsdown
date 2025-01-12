import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  base: '/rsdown/',
  title: 'rsdown',
  description: 'A high-performance JavaScript/TypeScript code transformer powered by Rust and SWC',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '架构设计', link: '/guide/architecture' },
          { text: 'GitHub', link: 'https://github.com/sunny-117/rsdown' },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Architecture', link: '/en/guide/architecture' },
          { text: 'GitHub', link: 'https://github.com/sunny-117/rsdown' },
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/en/' },
              { text: 'Installation', link: '/en/#installation' },
              { text: 'Usage', link: '/en/#usage' },
              { text: 'Architecture', link: '/en/guide/architecture' },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunny-117/rsdown' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/' },
          { text: '安装', link: '/#安装' },
          { text: '使用', link: '/#用法' },
          { text: '架构设计', link: '/guide/architecture' },
        ],
      },
    ],
  },

  mermaid: {
    // Mermaid options
    theme: 'default',
    darkMode: true,
    sequence: {
      useMaxWidth: false,
    },
    flowchart: {
      useMaxWidth: false,
    },
  },
}))
