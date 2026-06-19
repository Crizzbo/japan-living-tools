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

const tagClasses: Record<string, string> = {
  '生活ガイド': 'tag tag-green',
  '生活指南': 'tag tag-green',
  'Living': 'tag tag-green',
  '不動産': 'tag tag-orange',
  '房产': 'tag tag-orange',
  'Real Estate': 'tag tag-orange',
  'キャリア': 'tag tag-purple',
  '职场': 'tag tag-purple',
  'Career': 'tag tag-purple',
  'ビザ': 'tag',
  '签证': 'tag',
  'Visa': 'tag',
}

export default function Home() {
  const { t } = useT()

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-content">
          <span style={{
            fontSize: '0.85em',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            padding: '6px 18px',
            borderRadius: 24,
            marginBottom: 16,
            display: 'inline-block',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>
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
        <p style={{ color: '#5f6368', marginBottom: 24, marginTop: -8, fontSize: '0.95em', fontWeight: 500 }}>
          {t.home.tools.desc}
        </p>
      )}
      <div className="tool-grid">
        {toolKeys.map((key, i) => {
          const card = t.home.tools.cards[key]
          return (
            <Link key={key} href={toolHrefs[key]} className={`tool-card animate-in-${i + 1}`}>
              <div className="tool-card-inner">
                <div className="tool-card-icon">{toolIcons[key]}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span style={{ color: '#1a73e8', fontWeight: 700, fontSize: '0.88em', marginTop: 10, display: 'inline-block' }}>
                  {card.cta}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── 最新文章 ── */}
      <h2 className="section-title" style={{ marginTop: 8 }}>{t.home.articles.title}</h2>
      {t.home.articles.desc && (
        <p style={{ color: '#5f6368', marginBottom: 24, marginTop: -8, fontSize: '0.95em', fontWeight: 500 }}>
          {t.home.articles.desc}
        </p>
      )}
      <div className="article-grid">
        {articleKeys.map(key => {
          const a = t.home.articles.items[key]
          const tagClass = tagClasses[a.tag] || 'tag'
          return (
            <Link key={key} href={articleHrefs[key]} className="article-card">
              <div className="article-card-inner">
                <div className="article-card-meta">
                  <span className={tagClass}>{a.tag}</span>
                  <span className="article-card-date">{a.date}</span>
                </div>
                <h3 className="article-card-title">{a.title}</h3>
                <p className="article-card-desc">{a.desc}</p>
                <span className="article-card-cta">
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
