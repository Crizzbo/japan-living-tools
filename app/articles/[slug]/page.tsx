import Link from 'next/link'
import { getAllSlugs, getArticle } from '@/lib/articles'
import type { Metadata } from 'next'

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
  return {
    title: article.title,
    description: article.desc,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2 style={{ fontSize: '1.5em', color: '#1a1a2e', marginBottom: 12 }}>
          文章未找到
        </h2>
        <Link
          href="/articles"
          style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 600 }}
        >
          ← 返回文章列表
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/articles"
        style={{
          display: 'inline-block',
          color: '#1a73e8',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9em',
          marginBottom: 20,
        }}
      >
        ← 返回文章列表
      </Link>

      <div style={{ marginBottom: 8 }}>
        <span className="tag" style={{ marginRight: 12 }}>{article.tag}</span>
        <span style={{ fontSize: '0.85em', color: '#9aa0a6' }}>{article.date}</span>
      </div>

      <h1 style={{
        fontSize: '2em',
        fontWeight: 700,
        color: '#0d47a1',
        lineHeight: 1.3,
        marginBottom: 24,
      }}>
        {article.title}
      </h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

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
          ← 返回文章列表
        </Link>
      </div>
    </div>
  )
}
