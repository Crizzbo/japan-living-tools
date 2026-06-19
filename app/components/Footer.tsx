'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy'] as const
const articleKeys = ['costOfLiving', 'homeBuying', 'salary', 'visa'] as const
const toolHrefs: Record<string, string> = {
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
}
const articleHrefs: Record<string, string> = {
  costOfLiving: '/articles/japan-cost-of-living',
  homeBuying: '/articles/japan-home-buying-guide',
  salary: '/articles/japan-salary-guide',
  visa: '/articles/japan-visa-guide',
}

export default function Footer() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #dadce0',
      marginTop: '40px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div className="footer-grid">
          {/* 关于 */}
          <div className="footer-col">
            <h4>{t.footer.about.title}</h4>
            <p style={{ fontSize: '0.85em', color: '#5f6368', lineHeight: 1.7 }}>
              {t.footer.about.desc}
            </p>
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
            <p style={{ fontSize: '0.85em', color: '#5f6368', lineHeight: 1.7 }}>
              {t.footer.disclaimer.desc}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.bottom.replace('{year}', String(year))}</p>
        </div>
      </div>
    </footer>
  )
}
