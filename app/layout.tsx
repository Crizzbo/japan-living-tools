import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TabBar from './components/TabBar'
import GoogleAnalytics from './components/GoogleAnalytics'
import AdSense from './components/AdSense'
import { I18nProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: {
    default: 'Japan Living Tools | 日本生活实用工具',
    template: '%s | Japan Living Tools',
  },
  description: '日本购房费用计算器、高度人才积分、税后工资计算、买房vs租房对比。在日生活实用在线工具。',
  keywords: ['日本购房', '日本买房', '购房计算器', '高度人才', '税后工资', '买房租房对比', '住民税', '故乡税', '生活费用'],
  authors: [{ name: 'Japan Living Tools' }],
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'googlec2a7130db270ea35',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Japan Living Tools',
    title: 'Japan Living Tools | 日本生活实用工具',
    description: '日本购房费用、高度人才积分、税后工资、住民税、故乡税——在日生活必备计算工具。',
  },
  alternates: {
    languages: {
      'ja': '/',
      'zh': '/',
      'en': '/',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <AdSense />
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen flex flex-col">
        <I18nProvider>
          <Header />
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
            {children}
          </main>
          <Footer />
          <TabBar />
        </I18nProvider>
      </body>
    </html>
  )
}
