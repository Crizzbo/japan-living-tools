'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy'] as const
const articleKeys = ['costOfLiving', 'homeBuying', 'salary', 'visa'] as const
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
const articleHrefs: Record<string, string> = {
  costOfLiving: '/articles/japan-cost-of-living',
  homeBuying: '/articles/japan-home-buying-guide',
  salary: '/articles/japan-salary-guide',
  visa: '/articles/japan-visa-guide',
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
            <Link href="/articles" className="btn-outline">
              {t.home.hero.cta2}
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

      {/* ── 最新文章 ── */}
      <h2 className="section-title" style={{ marginTop: 24 }}>{t.home.articles.title}</h2>
      {t.home.articles.desc && (
        <p style={{ textAlign: 'center', color: '#5f6368', marginBottom: 20, marginTop: -12 }}>
          {t.home.articles.desc}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
        marginBottom: 40,
      }}>
        {articleKeys.map(key => {
          const a = t.home.articles.items[key]
          return (
            <Link key={key} href={articleHrefs[key]} style={{ textDecoration: 'none' }}>
              <div className="tool-card-inner" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="tag">{a.tag}</span>
                  <span style={{ fontSize: '0.78em', color: '#9aa0a6' }}>{a.date}</span>
                </div>
                <h3 style={{ fontSize: '1.05em', color: '#1a1a2e', marginBottom: 6 }}>{a.title}</h3>
                <p style={{ fontSize: '0.85em', color: '#5f6368', lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</p>
                <span style={{ color: '#1a73e8', fontWeight: 600, fontSize: '0.88em' }}>
                  {t.home.articles.readMore}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
