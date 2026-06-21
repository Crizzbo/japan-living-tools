'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy'] as const
const articleKeys = ['residenceTax', 'costOfLiving', 'homeBuying', 'salary', 'visa'] as const
const toolHrefs: Record<string, string> = {
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
}
const articleHrefs: Record<string, string> = {
  residenceTax: '/articles/japan-residence-tax-guide',
  costOfLiving: '/articles/japan-cost-of-living',
  homeBuying: '/articles/japan-home-buying-guide',
  salary: '/articles/japan-salary-guide',
  visa: '/articles/japan-visa-guide',
}

export default function Footer() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* 关于 */}
          <div className="footer-col">
            <h4>{t.footer.about.title}</h4>
            <p>{t.footer.about.desc}</p>
          </div>

          {/* 工具 */}
          <div className="footer-col">
            <h4>{t.footer.tools.title}</h4>
            {toolKeys.map(key => (
              <Link key={key} href={toolHrefs[key]}>{t.footer.tools.nav[key]}</Link>
            ))}
          </div>

          {/* 文章 */}
          <div className="footer-col">
            <h4>{t.footer.articles.title}</h4>
            {articleKeys.map(key => (
              <Link key={key} href={articleHrefs[key]}>{t.footer.articles.nav[key]}</Link>
            ))}
          </div>

          {/* 免责 */}
          <div className="footer-col">
            <h4>{t.footer.disclaimer.title}</h4>
            <p>{t.footer.disclaimer.desc}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.bottom.replace('{year}', String(year))}</p>
        </div>
      </div>
    </footer>
  )
}
