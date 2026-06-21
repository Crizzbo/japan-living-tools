import type { Metadata } from 'next'
import LoanCalculator from '@/app/components/LoanCalculator'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export const metadata: Metadata = {
  title: '日本购房费用计算器',
  description: '日本购房一次性费用 · 每年持有成本 · 贷款还贷模拟。支持永住/技术签证利率切换，日英双语标签。',
  keywords: ['日本购房', '购房计算器', '房屋贷款', '买房费用', '日本买房'],
  openGraph: {
    title: '日本购房费用计算器',
    description: '购房一次性费用 · 每年持有成本 · 贷款还贷模拟',
  },
}

export default function HouseCalculatorPage() {
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
      <Breadcrumbs items={[{ label: 'ツール', href: '/tools' }, { label: '日本购房费用計算器' }]} />
      <LoanCalculator />
    </>
  )
}
