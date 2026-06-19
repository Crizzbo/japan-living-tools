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

const navStyles: Record<string, React.CSSProperties> = {
  home:       { display: 'none' },
  houseCalculator: {},
  hsPointCalculator: {},
  salaryCalculator: {},
  rentVsBuy: {},
  articles:   {},
}

const dropdownItemStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 16px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.88em',
}

const triggerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 12px',
  border: '1px solid #dadce0',
  borderRadius: 20,
  background: '#f8f9fa',
  cursor: 'pointer',
  fontSize: '0.85em',
  fontWeight: 500,
  color: '#1a1a2e',
  whiteSpace: 'nowrap',
}

export default function Header() {
  const { t, lang, setLang, langs } = useT()
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #dadce0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: '#1a73e8',
          fontWeight: 700,
          fontSize: '1.05em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {t.header.logo}
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '4px', alignItems: 'center', flex: 1, justifyContent: 'center', flexWrap: 'nowrap' }}>
          {navKeys.map(key => (
            <Link
              key={key}
              href={navHrefs[key]}
              className="header-nav-link"
              style={navStyles[key]}
            >
              {t.header.nav[key]}
            </Link>
          ))}
        </nav>

        {/* Right side: lang + hamburger */}
        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(v => !v)}
              aria-label={t.common.langSwitch}
              style={triggerStyle}
            >
              🌐 {langs.find((l: { code: string; native: string }) => l.code === lang)?.native || lang}
              <span style={{ fontSize: '0.7em', marginLeft: 2 }}>{langOpen ? '▲' : '▼'}</span>
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 4,
                background: '#fff',
                border: '1px solid #dadce0',
                borderRadius: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                zIndex: 200,
                minWidth: 130,
              }}>
                {langs.map((l: { code: Lang; native: string }) => (
                  <button
                    key={l.code}
                    onMouseDown={() => { setLang(l.code); setLangOpen(false) }}
                    style={{
                      ...dropdownItemStyle,
                      background: l.code === lang ? '#e8f0fe' : 'transparent',
                      color: l.code === lang ? '#1a73e8' : '#1a1a2e',
                      fontWeight: l.code === lang ? 600 : 400,
                    }}
                  >
                    {l.native}
                    {l.code === lang && <span style={{ marginLeft: 8, fontSize: '0.8em' }}>✓</span>}
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
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5em',
              cursor: 'pointer',
              padding: '4px 8px',
              color: '#1a1a2e',
              lineHeight: 1,
            }}
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
      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{
          display: 'none',
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          zIndex: 150,
          padding: '20px 16px',
          flexDirection: 'column',
          gap: '4px',
          overflow: 'auto',
        }}
      >
        {navKeys.map(key => (
          <Link
            key={key}
            href={navHrefs[key]}
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '14px 16px',
              fontSize: '1.05em',
              fontWeight: 500,
              color: '#1a1a2e',
              textDecoration: 'none',
              borderRadius: 10,
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.15s',
            }}
          >
            {t.header.nav[key]}
          </Link>
        ))}
      </div>

      {/* Inline styles for responsive behavior */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
            transform: translateY(-10px);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.25s, opacity 0.25s;
          }
          .mobile-menu.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .mobile-menu-overlay {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
