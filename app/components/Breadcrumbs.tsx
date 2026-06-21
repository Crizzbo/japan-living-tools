'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  items: Crumb[]
}

export default function Breadcrumbs({ items }: Props) {
  const { t } = useT()

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        alignItems: 'center',
        fontSize: '0.82em',
        color: '#5f6368',
        marginBottom: 20,
        padding: '8px 0',
      }}
    >
      <Link
        href="/"
        style={{ color: '#5f6368', textDecoration: 'none', fontWeight: 500 }}
      >
        {t.common.breadcrumbHome}
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ opacity: 0.4 }}>/</span>
          {item.href ? (
            <Link
              href={item.href}
              style={{ color: '#5f6368', textDecoration: 'none', fontWeight: 500 }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: '#1a1a2e', fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
