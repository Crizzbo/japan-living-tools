'use client'
import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'

// ── City CPI data (national avg = 100) ──
const cityData: Record<string, {
  name: string
  rent1k: number
  rent1ldk: number
  foodIndex: number
  transportIndex: number
  utilityIndex: number
}> = {
  tokyo: { name: '東京23区', rent1k: 90000, rent1ldk: 150000, foodIndex: 105, transportIndex: 108, utilityIndex: 102 },
  yokohama: { name: '横浜市', rent1k: 75000, rent1ldk: 120000, foodIndex: 100, transportIndex: 105, utilityIndex: 100 },
  osaka: { name: '大阪市', rent1k: 65000, rent1ldk: 105000, foodIndex: 96, transportIndex: 100, utilityIndex: 98 },
  nagoya: { name: '名古屋市', rent1k: 60000, rent1ldk: 95000, foodIndex: 95, transportIndex: 98, utilityIndex: 97 },
  fukuoka: { name: '福岡市', rent1k: 55000, rent1ldk: 85000, foodIndex: 92, transportIndex: 95, utilityIndex: 95 },
  sapporo: { name: '札幌市', rent1k: 50000, rent1ldk: 78000, foodIndex: 93, transportIndex: 92, utilityIndex: 110 },
  sendai: { name: '仙台市', rent1k: 48000, rent1ldk: 75000, foodIndex: 92, transportIndex: 90, utilityIndex: 98 },
  okayama: { name: '岡山市', rent1k: 42000, rent1ldk: 65000, foodIndex: 88, transportIndex: 85, utilityIndex: 95 },
}

type Lifestyle = 'frugal' | 'standard' | 'comfortable'

const lifestyleMultipliers: Record<Lifestyle, { food: number; entertainment: number; misc: number; label: string }> = {
  frugal: { food: 0.65, entertainment: 0.3, misc: 0.6, label: '節約型' },
  standard: { food: 1.0, entertainment: 1.0, misc: 1.0, label: '標準型' },
  comfortable: { food: 1.5, entertainment: 2.0, misc: 1.5, label: 'ゆとり型' },
}

// Base monthly costs (national avg, standard lifestyle, unit: JPY/month)
const baseCosts = {
  food: 40000,
  utility: 12000,
  internet: 5000,
  phone: 3000,
  transport: 8000,
  entertainment: 25000,
  misc: 10000,
  insurance: 12000,
}

function calcMonthly(city: string, roomType: '1k' | '1ldk', lifestyle: Lifestyle) {
  const c = cityData[city]
  if (!c) return null

  const ls = lifestyleMultipliers[lifestyle]
  const rent = roomType === '1k' ? c.rent1k : c.rent1ldk
  const food = Math.round(baseCosts.food * ls.food * (c.foodIndex / 100))
  const utility = Math.round(baseCosts.utility * (c.utilityIndex / 100))
  const internet = baseCosts.internet
  const phone = baseCosts.phone
  const transport = Math.round(baseCosts.transport * (c.transportIndex / 100))
  const entertainment = Math.round(baseCosts.entertainment * ls.entertainment)
  const misc = Math.round(baseCosts.misc * ls.misc)
  const insurance = baseCosts.insurance

  const total = rent + food + utility + internet + phone + transport + entertainment + misc + insurance

  return {
    city: c.name,
    rent, food, utility, internet, phone, transport,
    entertainment, misc, insurance,
    total,
    annual: total * 12,
  }
}

export default function CityCostPage() {
  const { t } = useT()
  const ct = t.cityCost

  const [city, setCity] = useState('tokyo')
  const [roomType, setRoomType] = useState<'1k' | '1ldk'>('1k')
  const [lifestyle, setLifestyle] = useState<Lifestyle>('standard')

  const result = useMemo(() => calcMonthly(city, roomType, lifestyle), [city, roomType, lifestyle])

  const comparison = useMemo(() => {
    return Object.keys(cityData).map(key => {
      const r = calcMonthly(key, roomType, lifestyle)
      return { key, ...r! }
    }).sort((a, b) => a.total - b.total)
  }, [roomType, lifestyle])

  const fmt = (n: number) => n.toLocaleString('ja-JP')
  const maxTotal = Math.max(...comparison.map(c => c.total))

  if (!result) return null

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '都市別生活費計算器',
        'description': '日本8都市の月額生活費を自動計算・比較',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
      }} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>{ct.title}</h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>{ct.description}</p>

      {/* Input */}
      <section aria-label="入力" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{ct.formTitle}</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 8 }}>{ct.cityLabel}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {Object.entries(cityData).map(([key, c]) => (
              <button key={key} onClick={() => setCity(key)}
                style={{
                  padding: '8px 14px', borderRadius: 8, fontSize: '0.82em', fontWeight: 600,
                  border: city === key ? '2px solid #1a73e8' : '1px solid #dadce0',
                  background: city === key ? '#e8f0fe' : '#fff',
                  color: city === key ? '#1a73e8' : '#5f6368', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 8 }}>{ct.roomLabel}</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { val: '1k' as const, label: '1K・1R' },
              { val: '1ldk' as const, label: '1LDK・2K' },
            ].map(opt => (
              <button key={opt.val} onClick={() => setRoomType(opt.val)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8,
                  border: roomType === opt.val ? '2px solid #1a73e8' : '1px solid #dadce0',
                  background: roomType === opt.val ? '#e8f0fe' : '#fff',
                  fontWeight: 600, fontSize: '0.88em',
                  color: roomType === opt.val ? '#1a73e8' : '#5f6368', cursor: 'pointer',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 8 }}>{ct.lifestyleLabel}</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {(Object.entries(lifestyleMultipliers) as [Lifestyle, typeof lifestyleMultipliers[Lifestyle]][]).map(([key, ls]) => (
              <button key={key} onClick={() => setLifestyle(key)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8,
                  border: lifestyle === key ? '2px solid #1a73e8' : '1px solid #dadce0',
                  background: lifestyle === key ? '#e8f0fe' : '#fff',
                  fontWeight: 600, fontSize: '0.88em',
                  color: lifestyle === key ? '#1a73e8' : '#5f6368', cursor: 'pointer',
                }}>
                {ls.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-label="計算結果" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>
          {result.city} {ct.resultSuffix}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#e8f0fe', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{ct.monthlyTotal}</div>
            <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#1a73e8' }}>¥{fmt(result.total)}</div>
          </div>
          <div style={{ background: '#fef7e0', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{ct.annualTotal}</div>
            <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#e37400' }}>¥{fmt(result.annual)}</div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88em' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #1a73e8' }}>
              <th style={{ textAlign: 'left', padding: '8px 4px', fontSize: '0.82em' }}>{ct.colItem}</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '0.82em' }}>{ct.colMonthly}</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '0.82em' }}>{ct.colRatio}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: ct.rowRent, value: result.rent },
              { label: ct.rowFood, value: result.food },
              { label: ct.rowUtility, value: result.utility },
              { label: ct.rowInternet, value: result.internet },
              { label: ct.rowPhone, value: result.phone },
              { label: ct.rowTransport, value: result.transport },
              { label: ct.rowEntertainment, value: result.entertainment },
              { label: ct.rowMisc, value: result.misc },
              { label: ct.rowInsurance, value: result.insurance },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 4px', color: '#5f6368' }}>{row.label}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px', fontWeight: 500 }}>¥{fmt(row.value)}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px', color: '#5f6368', fontSize: '0.85em' }}>
                  {((row.value / result.total) * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
            <tr style={{ background: '#e8f0fe' }}>
              <td style={{ padding: '10px 4px', fontWeight: 700 }}>{ct.rowTotal}</td>
              <td style={{ textAlign: 'right', padding: '10px 4px', fontWeight: 700, color: '#1a73e8' }}>¥{fmt(result.total)}</td>
              <td style={{ textAlign: 'right', padding: '10px 4px', fontWeight: 700 }}>100%</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* City Comparison */}
      <section aria-label="都市比較" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{ct.comparisonTitle}</h2>
        <div>
          {comparison.map(c => (
            <div key={c.key} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82em' }}>
                <span style={{ width: 70, textAlign: 'right', fontWeight: c.key === city ? 700 : 400, color: c.key === city ? '#1a73e8' : '#5f6368' }}>
                  {c.city}
                </span>
                <div style={{ flex: 1, position: 'relative', height: 16, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: `${(c.total / maxTotal) * 100}%`,
                    background: c.key === city ? '#1a73e8' : '#90caf9',
                    borderRadius: 4, transition: 'width 0.3s',
                  }} />
                </div>
                <span style={{ width: 80, textAlign: 'right', fontWeight: 600, color: c.key === city ? '#1a73e8' : '#5f6368' }}>
                  ¥{fmt(c.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside role="note" style={{
        background: '#fff8e1', borderRadius: 12, padding: '20px 24px',
        border: '1px solid #ffe082', fontSize: '0.86em', lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#e37400' }}>⚠️ {ct.noteTitle}</div>
        <p style={{ color: '#5f6368', margin: 0 }}>{ct.noteContent}</p>
      </aside>
    </div>
  )
}
