import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '住民税計算器 | 所得割＋均等割を自動計算',
  description: '年収・年齢・扶養親族を入力して住民税を自動計算。所得割10%＋均等割5,000円、非課税判定にも対応。',
  keywords: ['住民税', '住民税計算', '所得割', '均等割', '非課税', '扶養控除', '日本 税金'],
  openGraph: {
    title: '住民税計算器 — 所得割＋均等割を自動計算',
    description: '年収・年齢・扶養親族から住民税を自動計算。非課税判定にも対応。',
    type: 'website',
  },
}

export default function ResidenceTaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
