import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '都市別生活費計算器 | 日本8都市の月額生活費を自動計算',
  description: '東京・大阪・名古屋・福岡など8都市の月額生活費を自動計算。家賃・食費・光熱費などを物価指数で調整。',
  keywords: ['生活費', '都市別', '日本 生活費', '家賃 相場', '物価指数', '東京 大阪 福岡'],
  openGraph: {
    title: '都市別生活費計算器 — 日本8都市の月額生活費を自動計算',
    description: '8都市の月額生活費を物価指数で調整し自動計算。都市間比較も。',
    type: 'website',
  },
}

export default function CityCostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
