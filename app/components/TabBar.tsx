'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from '@/lib/i18n'

const tabs = [
  { key: 'home', href: '/', icon: '🏠' },
  { key: 'houseCalculator', href: '/tools/house-calculator', icon: '🏠' },
  { key: 'salaryCalculator', href: '/tools/salary-calculator', icon: '💰' },
  { key: 'articles', href: '/articles', icon: '📖' },
  { key: 'more', href: '#', icon: '⋯' },
] as const

export default function TabBar() {
  const pathname = usePathname()
  const { t } = useT()

  // For "more" tab, toggle a small menu or scroll to tools section
  // Simple: just link to home where all tools are visible
  const moreHref = '/'

  return (
    <nav className="tab-bar" role="navigation" aria-label="Mobile">
      {tabs.map(tab => {
        const href = tab.key === 'more' ? moreHref : tab.href
        const isActive = tab.key === 'home'
          ? pathname === '/'
          : pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.key}
            href={href}
            className={`tab-bar-item${isActive ? ' active' : ''}`}
          >
            <span className="tab-bar-icon">{tab.icon}</span>
            <span className="tab-bar-label">
              {tab.key === 'more'
                ? (t.header.nav.rentVsBuy || 'More')
                : t.header.nav[tab.key as keyof typeof t.header.nav]}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
