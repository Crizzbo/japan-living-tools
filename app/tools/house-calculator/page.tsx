import type { Metadata } from 'next'
import LoanCalculator from '@/app/components/LoanCalculator'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import type { Lang } from '@/locales/types'

const locale = {
  ja: { breadcrumbTools: 'ツール一覧', toolTitle: '住宅購入費用計算' },
  zh: { breadcrumbTools: '工具列表', toolTitle: '购房费用计算器' },
  en: { breadcrumbTools: 'Tools', toolTitle: 'Home Purchase Cost Calculator' },
}

export const metadata: Metadata = {
  title: '日本购房费用计算器',
  description: '日本购房一次性费用 · 每年持有成本 · 贷款还贷模拟。支持永住/技术签证利率切换，日英双语标签。',
  keywords: ['日本购房', '购房计算器', '房屋贷款', '买房费用', '日本买房'],
  openGraph: {
    title: '日本购房费用计算器',
    description: '购房一次性费用 · 每年持有成本 · 贷款还贷模拟',
  },
}

export default async function HouseCalculatorPage() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const langCookie = cookieStore.get('lang')?.value
  const lang: Lang = (langCookie && ['ja', 'zh', 'en'].includes(langCookie)) ? langCookie as Lang : 'ja'
  const l = locale[lang]

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '日本购房费用计算器',
        'description': '日本购房一次性费用·每年持有成本·贷款还贷模拟',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
        'browserRequirements': 'Requires JavaScript',
      }} />
      <Breadcrumbs items={[{ label: l.breadcrumbTools, href: '/tools' }, { label: l.toolTitle }]} />
      <LoanCalculator />
    </>
  )
}
