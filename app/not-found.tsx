'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

export default function NotFound() {
  const { t } = useT()

  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: '#fff',
      borderRadius: '16px',
      border: '1px solid #dadce0',
    }}>
      <div style={{ fontSize: '3em', marginBottom: '12px' }}>404</div>
      <h2 style={{ fontSize: '1.3em', marginBottom: '8px' }}>{t.common.notFound.title}</h2>
      <p style={{ color: '#5f6368', marginBottom: '20px' }}>{t.common.notFound.desc}</p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#1a73e8',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        → {t.common.notFound.back}
      </Link>
    </div>
  )
}
