'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'
import { getArticles } from '@/lib/articles'

// Mapping from article slug to locale key
const slugToLocaleKey: Record<string, string> = {
  'japan-residence-tax-guide': 'residenceTax',
  'japan-cost-of-living': 'costOfLiving',
  'japan-home-buying-guide': 'homeBuying',
  'japan-salary-guide': 'salary',
  'japan-visa-guide': 'visa',
  'japan-furusato-nozei-guide': 'furusatoNozei',
  'japan-city-cost-comparison': 'cityCostComparison',
}

const tagClasses: Record<string, string> = {
  '生活ガイド': 'tag tag-green', '生活指南': 'tag tag-green', 'Living': 'tag tag-green',
  '不動産': 'tag tag-orange', '房产': 'tag tag-orange', 'Real Estate': 'tag tag-orange',
  'キャリア': 'tag tag-purple', '职场': 'tag tag-purple', 'Career': 'tag tag-purple',
  'ビザ': 'tag tag-red', '签证': 'tag tag-red', 'Visa': 'tag tag-red',
  '税務': 'tag tag-blue', '税务': 'tag tag-blue', 'Tax': 'tag tag-blue',
}

export default function ArticlesPage() {
  const { t } = useT()
  const articles = getArticles()
  const articleDict = t.home.articles.items

  return (
    <div>
      <h2 style={{
        fontSize: '1.6em',
        fontWeight: 700,
        color: '#1a1a2e',
        marginBottom: 4,
      }}>
        {t.articles.title}
      </h2>
      <p style={{ color: '#5f6368', marginBottom: 28 }}>
        {t.articles.desc}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {articles.map(article => {
          const localeKey = slugToLocaleKey[article.slug]
          const trans = localeKey ? articleDict[localeKey as keyof typeof articleDict] : undefined
          const title = trans?.title || article.title
          const desc = trans?.desc || article.desc
          const tag = trans?.tag || article.tag
          const tagClass = tagClasses[tag] || 'tag'

          return (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="article-card-inner" style={{ padding: 24 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <span className={tagClass}>{tag}</span>
                  <span style={{ fontSize: '0.8em', color: '#9aa0a6' }}>
                    {article.date}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.15em',
                  color: '#1a1a2e',
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: '0.88em',
                  color: '#5f6368',
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}>
                  {desc}
                </p>
                <span style={{
                  color: '#1a73e8',
                  fontWeight: 600,
                  fontSize: '0.9em',
                }}>
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
