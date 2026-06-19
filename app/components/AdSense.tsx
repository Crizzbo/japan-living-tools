'use client'
import Script from 'next/script'

// ⚠️ 部署前替换为你的 AdSense 发布商 ID
const ADSENSE_ID = 'ca-pub-XXXXXXXXXXXXXXXX'

export default function AdSense() {
  if (ADSENSE_ID === 'ca-pub-XXXXXXXXXXXXXXXX') return null // 未配置时不加载

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
