'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy', 'residenceTaxCalculator', 'furusatoCalculator', 'cityCostCalculator'] as const
const articleKeys = ['residenceTax', 'costOfLiving', 'homeBuying', 'salary', 'visa'] as const
const toolIcons: Record<string, string> = {
  houseCalculator: '\u{1F3E0}',
  hsPointCalculator: '\u{1F4CA}',
  salaryCalculator: '\u{1F4B0}',
  rentVsBuy: '\u2696\uFE0F',
  residenceTaxCalculator: '\u{1F3DB}\uFE0F',
  furusatoCalculator: '\u{1F381}',
  cityCostCalculator: '\u{1F3D9}\uFE0F',
}
const toolHrefs: Record<string, string> = {
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
  residenceTaxCalculator: '/tools/residence-tax-calculator',
  furusatoCalculator: '/tools/furusato-calculator',
  cityCostCalculator: '/tools/city-cost-calculator',
}
const articleHrefs: Record<string, string> = {
  residenceTax: '/articles/japan-residence-tax-guide',
  costOfLiving: '/articles/japan-cost-of-living',
  homeBuying: '/articles/japan-home-buying-guide',
  salary: '/articles/japan-salary-guide',
  visa: '/articles/japan-visa-guide',
}

const tagClasses: Record<string, string> = {
  // ja
  '\u751F\u6D3B\u30AC\u30A4\u30C9': 'tag tag-green',
  '\u4E0D\u52D5\u7523': 'tag tag-orange',
  '\u30AD\u30E3\u30EA\u30A2': 'tag tag-purple',
  '\u30D3\u30B6': 'tag tag-red',
  '\u7A0E\u52D9': 'tag tag-blue',
  // en
  'Living': 'tag tag-green',
  'Real Estate': 'tag tag-orange',
  'Career': 'tag tag-purple',
  'Visa': 'tag tag-red',
  'Tax': 'tag tag-blue',
  // zh
  '\u751F\u6D3B\u6307\u5357': 'tag tag-green',
  '\u623F\u4EA7': 'tag tag-orange',
  '\u804C\u573A': 'tag tag-purple',
  '\u7B7E\u8BC1': 'tag tag-red',
  '\u7A0E\u52A1': 'tag tag-blue',
}

export default function Home() {
  const { t } = useT()

  return (
    <div>
      {/* Hero */}
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
              {'\u{1F3E0}'} {t.home.hero.cta1}
            </Link>
            <Link href="/articles" className="btn-outline">
              {t.home.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Core Tools (4 Cards) */}
      <h2 className="section-title">{t.home.tools.title}</h2>
      {t.home.tools.desc && (
        <p style={{ color: '#5f6368', marginBottom: 24, marginTop: -8, fontSize: '0.95em', fontWeight: 500 }}>
          {t.home.tools.desc}
        </p>
      )}
      <div className="tool-grid">
        {toolKeys.slice(0, 4).map((key, i) => {
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

      {/* More Tools */}
      <h2 className="section-title" style={{ marginTop: 8 }}>{t.common.toolsTitle}</h2>
      <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {toolKeys.slice(4).map((key, i) => {
          const card = t.home.tools.cards[key]
          if (!card) return null
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

      {/* Latest Articles */}
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
