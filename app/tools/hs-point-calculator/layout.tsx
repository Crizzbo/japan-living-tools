import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '高度人材積分計算器 | 70点・80点判定シミュレーター',
  description: '学歴・年収・職歴・年齢・日本語能力を入力して高度専門職ビザのポイントを計算。70点で3年、80点で1年の永住申請 shorten パスを確認。',
  keywords: ['高度人材', '高度専門職', 'ポイント計算', '永住申請', '70点', '80点', '日本 ビザ'],
  openGraph: {
    title: '高度人材積分計算器 — 70点・80点判定シミュレーター',
    description: '学歴・年収・職歴・年齢・日本語能力から高度専門職ポイントを自動計算。永住申請の shorten パスを確認。',
    type: 'website',
  },
}

export default function HsPointLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
