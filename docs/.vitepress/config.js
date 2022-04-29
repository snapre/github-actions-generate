import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'GitHub Actions Practice',
  description: 'GitHub Actions good configuration .yml file.',
  lastUpdated: true,

  themeConfig: {
    repo: 'snapre/github-actions-practice',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
  }
})
