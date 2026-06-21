import Link from 'next/link'
import { getAllSlugs, getArticle, getArticles } from '@/lib/articles'
import type { Metadata } from 'next'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import type { Lang, ArticleLocale } from '@/locales/types'

// ── Static paths & metadata ──
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  const url = `https://japan-living-tools.vercel.app/articles/${slug}`
  return {
    title: article.title,
    description: article.desc,
    keywords: [article.tag, '日本生活', '日本ガイド'],
    openGraph: {
      title: article.title,
      description: article.desc,
      type: 'article',
      url,
      publishedTime: article.date,
      siteName: 'Japan Living Tools',
    },
    alternates: { canonical: url },
  }
}

// ── Related articles (by tag proximity) ──
const relatedMap: Record<string, string[]> = {
  'japan-residence-tax-guide': ['japan-salary-guide', 'japan-furusato-nozei-guide'],
  'japan-cost-of-living': ['japan-salary-guide', 'japan-home-buying-guide', 'japan-city-cost-comparison'],
  'japan-home-buying-guide': ['japan-cost-of-living', 'japan-residence-tax-guide'],
  'japan-salary-guide': ['japan-residence-tax-guide', 'japan-cost-of-living'],
  'japan-visa-guide': ['japan-salary-guide', 'japan-cost-of-living'],
  'japan-furusato-nozei-guide': ['japan-residence-tax-guide', 'japan-salary-guide'],
  'japan-city-cost-comparison': ['japan-cost-of-living', 'japan-salary-guide'],
}

// ── Lang → locale block ──
const locale = {
  ja: {
    back: '← 記事一覧に戻る',
    notFound: '記事が見つかりません',
    related: '関連記事',
    breadcrumbArticles: '記事一覧',
  },
  zh: {
    back: '← 返回文章列表',
    notFound: '文章未找到',
    related: '相关文章',
    breadcrumbArticles: '文章列表',
  },
  en: {
    back: '← Back to Articles',
    notFound: 'Article Not Found',
    related: 'Related Articles',
    breadcrumbArticles: 'Articles',
  },
}

// ── Server Component that reads cookies for lang ──
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const langCookie = cookieStore.get('lang')?.value
  const lang: Lang = (langCookie && ['ja', 'zh', 'en'].includes(langCookie)) ? langCookie as Lang : 'ja'
  const l = locale[lang]

  // Load locale-specific article content
  let localeArticle: ArticleLocale | undefined
  if (lang === 'zh') {
    const m = await import('@/lib/articles-zh')
    localeArticle = m.default[slug]
  } else if (lang === 'en') {
    const m = await import('@/lib/articles-en')
    localeArticle = m.default[slug]
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2 style={{ fontSize: '1.5em', color: '#1a1a2e', marginBottom: 12 }}>
          {l.notFound}
        </h2>
        <Link
          href="/articles"
          style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 600 }}
        >
          {l.back}
        </Link>
      </div>
    )
  }

  const displayTitle = localeArticle?.title ?? article.title
  const displayContent = localeArticle?.content ?? article.content

  // Related articles
  const relatedSlugs = relatedMap[slug] || []
  const allArticles = getArticles()
  const relatedArticles = relatedSlugs
    .map(s => allArticles.find(a => a.slug === s))
    .filter(Boolean)

  return (
    <div>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'datePublished': article.date,
        'author': { '@type': 'Organization', 'name': 'Japan Living Tools' },
        'publisher': {
          '@type': 'Organization',
          'name': 'Japan Living Tools',
          'url': 'https://japan-living-tools.vercel.app',
        },
      }} />

      <Breadcrumbs items={[
        { label: l.breadcrumbArticles, href: '/articles' },
        { label: displayTitle },
      ]} />

      <div style={{ marginBottom: 8 }}>
        <span className="tag" style={{ marginRight: 12 }}>{article.tag}</span>
        <span style={{ fontSize: '0.85em', color: '#9aa0a6' }}>{article.date}</span>
      </div>

      <h1 style={{
        fontSize: 'clamp(1.5em, 4vw, 2em)',
        fontWeight: 700,
        color: '#0d47a1',
        lineHeight: 1.3,
        marginBottom: 24,
      }}>
        {displayTitle}
      </h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <div style={{
          marginTop: 48,
          paddingTop: 28,
          borderTop: '2px solid #e8f0fe',
        }}>
          <h3 style={{
            fontSize: '1.15em',
            fontWeight: 700,
            color: '#0d47a1',
            marginBottom: 16,
          }}>
            {l.related}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}>
            {relatedArticles.map(ra => ra && (
              <Link
                key={ra.slug}
                href={`/articles/${ra.slug}`}
                style={{
                  display: 'block',
                  padding: '18px 20px',
                  background: '#f8fafd',
                  border: '1px solid #e8f0fe',
                  borderRadius: 12,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <span className="tag" style={{ marginBottom: 8, display: 'inline-block' }}>
                  {ra.tag}
                </span>
                <div style={{
                  fontSize: '0.95em',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  lineHeight: 1.4,
                }}>
                  {ra.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{
        marginTop: 40,
        paddingTop: 20,
        borderTop: '1px solid #dadce0',
        textAlign: 'center',
      }}>
        <Link
          href="/articles"
          style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 600 }}
        >
          {l.back}
        </Link>
      </div>
    </div>
  )
}
