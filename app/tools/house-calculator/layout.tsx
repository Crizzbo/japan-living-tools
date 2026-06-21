import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '購房費用計算器 | 購入時費用・年間持有コスト・ローン返済シミュレーション',
  description: '物件価格・ローン条件を入力して、購入時一時費用（印紙税・仲介手数料・不動産取得税・登記費用）・年間持有コスト・返済負担率を自動計算。',
  keywords: ['購房費用', '住宅ローン', '不動産取得税', '固定資産税', '返済負担率', '日本 買房'],
  openGraph: {
    title: '購房費用計算器 — 購入時費用・年間持有コスト・ローン返済',
    description: '物件価格・ローン条件から購入時費用・年間持有コスト・返済負担率を自動計算。',
    type: 'website',
  },
}

export default function HouseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
