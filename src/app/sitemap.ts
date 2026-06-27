import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumen-studio-3b3.pages.dev'
  const lastModified = new Date()

  // 单路由 SPA，主要 URL 是首页（含锚点）
  // 搜索引擎会通过爬取首页发现锚点对应区块
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'zh-CN': `${baseUrl}/`,
          en: `${baseUrl}/`,
        },
      },
    },
  ]

  return routes
}
