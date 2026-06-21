import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ふるさと納税シミュレーター | 控除限度額・節税効果を自動計算',
  description: '年収からふるさと納税の控除限度額を自動計算。寄附額に対する所得税・住民税の控除効果をシミュレーション。',
  keywords: ['ふるさと納税', '控除限度額', '節税', '寄附金控除', '返礼品', '日本 税金'],
  openGraph: {
    title: 'ふるさと納税シミュレーター — 控除限度額・節税効果を自動計算',
    description: '年収からふるさと納税の控除限度額を自動計算。節税効果をシミュレーション。',
    type: 'website',
  },
}

export default function FurusatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
