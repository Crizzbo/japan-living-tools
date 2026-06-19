'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const toolKeys = ['houseCalculator', 'hsPointCalculator', 'salaryCalculator', 'rentVsBuy'] as const
const toolEmoji: Record<string, string> = {
  houseCalculator: '🏠',
  hsPointCalculator: '📊',
  salaryCalculator: '💰',
  rentVsBuy: '⚖️',
}
const toolHrefs: Record<string, string> = {
  houseCalculator: '/tools/house-calculator',
  hsPointCalculator: '/tools/hs-point-calculator',
  salaryCalculator: '/tools/salary-calculator',
  rentVsBuy: '/tools/rent-vs-buy',
}

export default function ToolsPage() {
  const { t } = useT()

  return (
    <div>
      <h2 style={{ fontSize: '1.4em', fontWeight: 700, marginBottom: '8px' }}>
        🛠️ {t.common.toolsTitle}
      </h2>
      <p style={{ color: '#5f6368', marginBottom: '24px' }}>
        {t.common.toolsDesc}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {toolKeys.map(key => {
          const tool = t.tools[key]
          return (
            <Link key={key} href={toolHrefs[key]} style={{ textDecoration: 'none' }}>
              <div className="tools-list-item">
                <div style={{ fontSize: '2em', flexShrink: 0 }}>{toolEmoji[key]}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1em', color: '#1a1a2e', marginBottom: '4px' }}>{tool.title}</h3>
                  <p style={{ fontSize: '0.88em', color: '#5f6368' }}>{tool.desc}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
