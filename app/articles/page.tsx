'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'
import { getArticles } from '@/lib/articles'

const slugs = ['japan-cost-of-living', 'japan-home-buying-guide', 'japan-salary-guide', 'japan-visa-guide']

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
          const slug = article.slug
          const trans = articleDict[slug as keyof typeof articleDict]
          const title = trans?.title || article.title
          const desc = trans?.desc || article.desc
          const tag = trans?.tag || article.tag

          return (
            <Link
              key={slug}
              href={`/articles/${slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="tool-card-inner" style={{ padding: 24 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <span className="tag">{tag}</span>
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
