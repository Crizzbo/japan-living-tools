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
  const [menuOpen, setMenuOpen] = useState(false)
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

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          {t.header.logo}
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navKeys.map(key => (
            <Link
              key={key}
              href={navHrefs[key]}
              className="header-nav-link"
              style={key === 'home' ? { display: 'none' } : undefined}
            >
              {t.header.nav[key]}
            </Link>
          ))}
        </nav>

        {/* Right side: lang + hamburger */}
        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(v => !v)}
              aria-label={t.common.langSwitch}
              className="lang-trigger"
            >
              🌐 {langs.find(l => l.code === lang)?.native || lang}
              <span style={{ fontSize: '0.7em', marginLeft: 2, opacity: 0.5 }}>{langOpen ? '▲' : '▼'}</span>
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

          {/* Hamburger (mobile only) */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Slide-down Menu */}
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navKeys.map(key => (
          <Link
            key={key}
            href={navHrefs[key]}
            onClick={() => setMenuOpen(false)}
            className="mobile-menu-link"
          >
            {t.header.nav[key]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
