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
  // 静态导出 → Cloudflare Pages
  output: 'export',

  // 允许 MDX 文件作为页面
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // 静态资源路径（Cloudflare Pages 默认 /）
  basePath: '',
  assetPrefix: '/',

  // 图片优化（静态导出需关闭默认优化器，或使用 unoptimized）
  images: {
    unoptimized: true,
  },

  // 尾随斜杠保持整洁
  trailingSlash: false,
}

export default withMDX(nextConfig)
