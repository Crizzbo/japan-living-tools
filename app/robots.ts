import type { MetadataRoute } from 'next'

// Sitemap is generated dynamically; robots.txt lists it for search engines
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
