import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'GitHub Actions Generate',
  description: 'GitHub Actions good configuration .yml file.',
  base: '/github-actions-generate/',
  lastUpdated: true,

  themeConfig: {
    repo: 'snapre/github-actions-generate',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
  }
})
