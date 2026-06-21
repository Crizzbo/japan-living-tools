'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from '@/lib/i18n'

const tabs = [
  { key: 'home', href: '/', icon: '\u{1F3E0}' },
  { key: 'houseCalculator', href: '/tools/house-calculator', icon: '\u{1F3E1}' },
  { key: 'salaryCalculator', href: '/tools/salary-calculator', icon: '\u{1F4B0}' },
  { key: 'rentVsBuy', href: '/tools/rent-vs-buy', icon: '\u2696\uFE0F' },
  { key: 'articles', href: '/articles', icon: '\u{1F4D6}' },
] as const

export default function TabBar() {
  const pathname = usePathname()
  const { t } = useT()

  return (
    <nav className="tab-bar" role="navigation" aria-label="Mobile">
      {tabs.map(tab => {
        const isActive = tab.key === 'home'
          ? pathname === '/'
          : pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`tab-bar-item${isActive ? ' active' : ''}`}
          >
            <span className="tab-bar-icon">{tab.icon}</span>
            <span className="tab-bar-label">
              {tab.key === 'home'
                ? t.header.nav.home
                : t.header.nav[tab.key as keyof typeof t.header.nav] || tab.key}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
