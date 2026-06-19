import type { MetadataRoute } from 'next'

// Static export 需要此声明
export const dynamic = 'force-static'

// ⚠️ 部署前替换为你的实际域名
const BASE_URL = 'https://japan-living-tools.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
