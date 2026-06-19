'use client'
import Script from 'next/script'

// ⚠️ 部署前替换为你的 Google Analytics 测量 ID
const GA_ID = 'G-XXXXXXXXXX'

export default function GoogleAnalytics() {
  if (GA_ID === 'G-XXXXXXXXXX') return null // 未配置时不加载

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
