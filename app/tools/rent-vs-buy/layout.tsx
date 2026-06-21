import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '買房vs租房対比 | 5〜35年の累積コストを比較',
  description: '物件価格・金利・ローン年数・家賃・上昇率を入力して、買う場合と借りる場合の累積支出をグラフで比較。データで決める住まいの選択。',
  keywords: ['買房vs租房', '住宅ローン', '賃貸比較', '累積コスト', '日本 住まい', '持ち家 賃貸'],
  openGraph: {
    title: '買房vs租房対比 — 5〜35年の累積コストを比較',
    description: '物件価格・金利・家賃・上昇率から買う/借りるの累積支出を自動計算。データで決める住まいの選択。',
    type: 'website',
  },
}

export default function RentVsBuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
