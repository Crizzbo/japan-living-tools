'use client'

import { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback, type ReactNode } from 'react'
import type { Lang, LocaleDict } from '@/locales/types'
import zh from '@/locales/zh'
import ja from '@/locales/ja'
import en from '@/locales/en'

const dicts: Record<Lang, LocaleDict> = { zh, ja, en }

interface I18nContextValue {
  lang: Lang
  t: LocaleDict
  setLang: (l: Lang) => void
  langs: { code: Lang; native: string }[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'ja'
  // 1. Cookie
  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/)
  if (match) {
    const v = match[1]
    if (v === 'zh' || v === 'ja' || v === 'en') return v
  }
  // 2. navigator.language
  const nav = navigator.language || (navigator as any).userLanguage || ''
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('ja')) return 'ja'
  if (nav.startsWith('en')) return 'en'
  // 3. fallback
  return 'ja'
}

function setLangCookie(lang: Lang) {
  document.cookie = `lang=${lang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
}

const htmlLangMap: Record<Lang, string> = { zh: 'zh-CN', ja: 'ja', en: 'en' }

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ja')

  // Detect language on mount (client-side only, sync to avoid flash)
  useLayoutEffect(() => {
    const detected = detectLang()
    setLangState(detected)
    document.documentElement.lang = htmlLangMap[detected]
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    setLangCookie(l)
    document.documentElement.lang = htmlLangMap[l]
  }, [])

  const t = dicts[lang]

  const langs = [
    { code: 'zh' as Lang, native: '中文' },
    { code: 'ja' as Lang, native: '日本語' },
    { code: 'en' as Lang, native: 'English' },
  ]

  return (
    <I18nContext.Provider value={{ lang, t, setLang, langs }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useT(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used within I18nProvider')
  return ctx
}
