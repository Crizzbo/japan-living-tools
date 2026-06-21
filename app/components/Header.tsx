'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useT } from '@/lib/i18n'
import type { Lang } from '@/locales/types'

const navKeys = ['home', 'houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy', 'articles'] as const
const navHrefs: Record<string, string> = {
  home: '/',
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
  articles: '/articles',
}

export default function Header() {
  const { t, lang, setLang, langs } = useT()
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-aware glassmorphism
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!langOpen) return
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [langOpen])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-top-row">
        {/* Logo */}
        <Link href="/" className="header-logo">
          {t.header.logo}
        </Link>

        {/* Language Switcher */}
        <div ref={containerRef} className="header-lang-wrap">
          <button
            onClick={() => setLangOpen(v => !v)}
            aria-label={t.common.langSwitch}
            className="lang-trigger"
          >
            🌐 {langs.find(l => l.code === lang)?.native || lang}
            <span className="lang-arrow">{langOpen ? '▲' : '▼'}</span>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {langs.map(l => (
                <button
                  key={l.code}
                  onMouseDown={() => { setLang(l.code); setLangOpen(false) }}
                  className={`lang-option${l.code === lang ? ' active' : ''}`}
                >
                  {l.native}
                  {l.code === lang && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Always-visible nav bar */}
      <nav className="header-nav-bar" role="navigation" aria-label="Main">
        {navKeys.map(key => (
          <Link
            key={key}
            href={navHrefs[key]}
            className="header-nav-link"
          >
            {t.header.nav[key]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
