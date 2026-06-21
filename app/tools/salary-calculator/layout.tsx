import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '税後工資計算器 | 年収から手取り額を自動計算',
  description: '年収を入力するだけで、所得税・住民税・社会保険料を自動計算。日本の給与所得控除・7段階所得税・復興特別所得税・基礎控除に対応した正確な手取り計算ツール。',
  keywords: ['税後工資', '手取り計算', '所得税計算', '住民税', '社会保険料', '給与所得控除', '日本 税金'],
  openGraph: {
    title: '税後工資計算器 — 年収から手取り額を自動計算',
    description: '年収を入力すれば所得税・住民税・社会保険料込みの手取り額を瞬時に計算。日本の最新税率に対応。',
    type: 'website',
  },
}

export default function SalaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
