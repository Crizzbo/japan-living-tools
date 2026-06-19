'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy'] as const
const toolIcons: Record<string, string> = {
  houseCalculator: '🏠',
  hsPointCalculator: '📊',
  salaryCalculator: '💰',
  rentVsBuy: '⚖️',
}
const toolHrefs: Record<string, string> = {
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
}

export default function Home() {
  const { t } = useT()

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-content">
          <span style={{ fontSize: '0.9em', background: 'rgba(255,255,255,0.15)', padding: '4px 16px', borderRadius: 20, marginBottom: 12, display: 'inline-block' }}>
            {t.home.hero.badge}
          </span>
          <h2>{t.home.hero.title}</h2>
          <p>{t.home.hero.desc}</p>
          <div className="hero-cta">
            <Link href="/tools/house-calculator" className="btn-primary">
              🏠 {t.home.hero.cta1}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 核心工具区 (4 Cards) ── */}
      <h2 className="section-title">{t.home.tools.title}</h2>
      {t.home.tools.desc && (
        <p style={{ textAlign: 'center', color: '#5f6368', marginBottom: 20, marginTop: -12 }}>
          {t.home.tools.desc}
        </p>
      )}
      <div className="tool-grid">
        {toolKeys.map(key => {
          const card = t.home.tools.cards[key]
          return (
            <Link key={key} href={toolHrefs[key]} className="tool-card">
              <div className="tool-card-inner">
                <div className="tool-card-icon">{toolIcons[key]}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span style={{ color: '#1a73e8', fontWeight: 600, fontSize: '0.9em', marginTop: 8, display: 'inline-block' }}>
                  {card.cta}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
