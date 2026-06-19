/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

const nextConfig = {
  // Vercel 原生部署，使用默认 SSR/SSG（不强制 static export）

  // 允许 MDX 文件作为页面
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // 图片优化
  images: {
    unoptimized: true,
  },

  // 尾随斜杠保持整洁
  trailingSlash: false,
}

export default withMDX(nextConfig)
