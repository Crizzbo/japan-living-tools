'use client'

import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'

// ── ローン月額返済額計算（元利均等） ──
function calcMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) return principal / n
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

// ── 年度ごとの累計コスト計算 ──
function calcBuyCosts(
  price: number,
  downPaymentRate: number,
  interestRate: number,
  loanYears: number,
  propertyTaxRate: number,
  maintenanceRate: number,
  acquisitionRate: number,
  years: number,
): {
  cumulative: number
  mortgagePaid: number
  interestPaid: number
  propertyTax: number
  maintenance: number
  equity: number
  acquisitionCost: number
  remainingPrincipal: number
} {
  const downPayment = price * (downPaymentRate / 100)
  const loanAmount = price - downPayment
  const monthlyPayment = calcMonthlyPayment(loanAmount, interestRate, loanYears)
  const acquisitionCost = price * (acquisitionRate / 100)

  let remainingPrincipal = loanAmount
  let mortgagePaid = 0
  let interestPaid = 0
  let propertyTax = 0
  let maintenance = 0

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      if (remainingPrincipal <= 0) break
      const monthlyRate = interestRate / 100 / 12
      const interestPayment = remainingPrincipal * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      interestPaid += interestPayment
      mortgagePaid += monthlyPayment
      remainingPrincipal = Math.max(0, remainingPrincipal - principalPayment)
    }
    propertyTax += price * (propertyTaxRate / 100)
    maintenance += price * (maintenanceRate / 100)
  }

  const cumulative = downPayment + acquisitionCost + mortgagePaid + propertyTax + maintenance
  const equity = price - remainingPrincipal

  return {
    cumulative,
    mortgagePaid,
    interestPaid,
    propertyTax,
    maintenance,
    equity,
    acquisitionCost,
    remainingPrincipal,
  }
}

function calcRentCosts(
  monthlyRent: number,
  increaseRate: number,
  renewalFee: number,
  years: number,
): { cumulative: number; rentPaid: number; renewals: number } {
  let cumulative = 0
  let renewals = 0
  let currentRent = monthlyRent

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      cumulative += currentRent
    }
    if (y % 2 === 0) {
      renewals += currentRent
      cumulative += currentRent
    }
    currentRent *= (1 + increaseRate / 100)
  }

  return { cumulative, rentPaid: cumulative - renewals, renewals }
}

export default function RentVsBuyPage() {
  const { t } = useT()
  const rv = t.rentVsBuy

  const [price, setPrice] = useState(4000)
  const [downPaymentRate, setDownPaymentRate] = useState(20)
  const [interestRate, setInterestRate] = useState(0.6)
  const [loanYears, setLoanYears] = useState(35)
  const [propertyTaxRate, setPropertyTaxRate] = useState(0.7)
  const [maintenanceRate, setMaintenanceRate] = useState(0.5)
  const [acquisitionRate, setAcquisitionRate] = useState(7)
  const [monthlyRent, setMonthlyRent] = useState(12)
  const [rentIncreaseRate, setRentIncreaseRate] = useState(0.5)
  const [renewalFeeMonths, setRenewalFeeMonths] = useState(1)
  const [compareYears, setCompareYears] = useState(30)

  const priceYen = price * 10000
  const rentYen = monthlyRent * 10000
  const renewalFeeYen = rentYen * renewalFeeMonths

  const milestones = [5, 10, 15, 20, 25, 30, 35]

  const data = useMemo(() => {
    return milestones
      .filter(y => y <= compareYears)
      .map(years => {
        const buy = calcBuyCosts(priceYen, downPaymentRate, interestRate, loanYears, propertyTaxRate, maintenanceRate, acquisitionRate, years)
        const rent = calcRentCosts(rentYen, rentIncreaseRate, renewalFeeYen, years)
        return {
          years,
          buyCumulative: buy.cumulative,
          rentCumulative: rent.cumulative,
          buyEquity: buy.equity,
          buyNet: buy.cumulative - buy.equity,
          buyInterest: buy.interestPaid,
          diff: rent.cumulative - buy.cumulative,
          netDiff: rent.cumulative - buy.cumulative + buy.equity,
          buyMonthly: calcMonthlyPayment(priceYen * (1 - downPaymentRate / 100), interestRate, loanYears),
        }
      })
  }, [priceYen, downPaymentRate, interestRate, loanYears, propertyTaxRate, maintenanceRate, acquisitionRate, rentYen, rentIncreaseRate, renewalFeeYen, compareYears])

  const final = data[data.length - 1]
  const fmt = (n: number) => Math.round(n / 10000).toLocaleString('ja-JP')
  const fmtYen = (n: number) => n.toLocaleString('ja-JP')

  const monthlyPayment = calcMonthlyPayment(priceYen * (1 - downPaymentRate / 100), interestRate, loanYears)

  const maxVal = Math.max(...data.flatMap(d => [d.buyCumulative, d.rentCumulative, d.buyNet]))

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '买房vs租房对比',
        'description': '5~35年の累计支出を比较——データで決める住まいの選択',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
        'browserRequirements': 'Requires JavaScript',
      }} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>
        {rv.title}
      </h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>
        {rv.description}
      </p>

      {/* Input Section */}
      <section aria-label="入力" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 24,
      }}>
        {/* 買う */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '20px 24px',
          border: '1px solid #dadce0',
        }}>
          <h3 style={{ fontSize: '1em', fontWeight: 700, marginBottom: 16, color: '#1a73e8' }}>{rv.buySectionTitle}</h3>

          <Field label={rv.buyFields.price} value={price} onChange={setPrice} min={500} max={30000} step={100} />
          <Field label={rv.buyFields.downPayment} value={downPaymentRate} onChange={setDownPaymentRate} min={0} max={50} step={5} unit={rv.units.percent} />
          <Field label={rv.buyFields.interestRate} value={interestRate} onChange={v => setInterestRate(Math.round(v * 100) / 100)} min={0.1} max={5} step={0.05} unit={rv.units.percent} />
          <Field label={rv.buyFields.loanYears} value={loanYears} onChange={setLoanYears} min={5} max={50} step={5} unit={rv.units.years} />
          <Field label={rv.buyFields.propertyTax} value={propertyTaxRate} onChange={v => setPropertyTaxRate(Math.round(v * 100) / 100)} min={0.1} max={3} step={0.1} unit={rv.units.percent} />
          <Field label={rv.buyFields.maintenance} value={maintenanceRate} onChange={v => setMaintenanceRate(Math.round(v * 100) / 100)} min={0.1} max={3} step={0.1} unit={rv.units.percent} />
          <Field label={rv.buyFields.acquisition} value={acquisitionRate} onChange={setAcquisitionRate} min={3} max={15} step={0.5} unit={rv.units.percent} />

          <div style={{ marginTop: 12, padding: '10px 12px', background: '#e8f0fe', borderRadius: 8, fontSize: '0.85em' }}>
            {rv.buyFields.monthlyPayment.replace('{amount}', fmtYen(Math.round(monthlyPayment)))}
          </div>
        </div>

        {/* 借りる */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '20px 24px',
          border: '1px solid #dadce0',
        }}>
          <h3 style={{ fontSize: '1em', fontWeight: 700, marginBottom: 16, color: '#0d47a1' }}>{rv.rentSectionTitle}</h3>

          <Field label={rv.rentFields.monthlyRent} value={monthlyRent} onChange={v => setMonthlyRent(Math.round(v * 10) / 10)} min={3} max={100} step={0.5} />
          <Field label={rv.rentFields.increaseRate} value={rentIncreaseRate} onChange={v => setRentIncreaseRate(Math.round(v * 100) / 100)} min={0} max={5} step={0.1} unit={rv.units.percent} />
          <Field label={rv.rentFields.renewalFee} value={renewalFeeMonths} onChange={setRenewalFeeMonths} min={0} max={3} step={0.5} unit={rv.units.months} />

          <Field label={rv.rentFields.compareYears} value={compareYears} onChange={setCompareYears} min={5} max={50} step={5} unit={rv.units.years} />
        </div>
      </section>

      {/* Results */}
      <section aria-label="比較結果" style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px 28px',
        border: '1px solid #dadce0',
        marginBottom: 24,
      }}>
        <h3 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>
          📈 {rv.comparisonTitle.replace('{years}', String(compareYears))}
        </h3>

        {/* Chart */}
        <div style={{ marginBottom: 20, position: 'relative' }}>
          {data.map((d) => {
            return (
              <div key={d.years} style={{ marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78em' }}>
                  <span style={{ width: 30, textAlign: 'right', color: '#5f6368' }}>{d.years}{rv.units.years}</span>
                  <div style={{ flex: 1, position: 'relative', height: 16, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(d.rentCumulative / maxVal) * 100}%`, background: '#f44336', opacity: 0.7, borderRadius: 4 }} />
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(d.buyCumulative / maxVal) * 100}%`, background: '#1a73e8', opacity: 0.7, borderRadius: 4 }} />
                  </div>
                  <span style={{ width: 70, textAlign: 'right', fontSize: '0.8em', color: '#1a73e8', fontWeight: 600 }}>
                    {fmt(d.buyCumulative)}{rv.units.manYen}
                  </span>
                  <span style={{ width: 70, textAlign: 'right', fontSize: '0.8em', color: '#f44336', fontWeight: 600 }}>
                    {fmt(d.rentCumulative)}{rv.units.manYen}
                  </span>
                </div>
              </div>
            )
          })}
          <div style={{ display: 'flex', gap: 20, fontSize: '0.75em', color: '#5f6368', marginTop: 6, paddingLeft: 38 }}>
            <span>{rv.chartLegendBuy}</span>
            <span>{rv.chartLegendRent}</span>
          </div>
        </div>

        {/* Detail Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85em' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1a73e8' }}>
                <th style={thStyle}>{rv.thYears}</th>
                <th style={thStyleR}>{rv.thBuyTotal}</th>
                <th style={thStyleR}>{rv.thBuyEquity}</th>
                <th style={thStyleR}>{rv.thBuyNet}</th>
                <th style={thStyleR}>{rv.thRentTotal}</th>
                <th style={thStyleR}>{rv.thDiff}</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.years} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{d.years}{rv.units.years}</td>
                  <td style={tdStyleR}>{fmt(d.buyCumulative)}{rv.units.manYen}</td>
                  <td style={tdStyleR}>{fmt(d.buyEquity)}{rv.units.manYen}</td>
                  <td style={{ ...tdStyleR, fontWeight: 600, color: '#1a73e8' }}>{fmt(d.buyNet)}{rv.units.manYen}</td>
                  <td style={tdStyleR}>{fmt(d.rentCumulative)}{rv.units.manYen}</td>
                  <td style={{
                    ...tdStyleR,
                    fontWeight: 700,
                    color: d.netDiff > 0 ? '#1e8e3e' : '#d93025',
                  }}>
                    {d.netDiff > 0 ? '+' : ''}{fmt(Math.abs(d.netDiff))}{rv.units.manYen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      {final && (
        <aside role="note" style={{
          background: final.netDiff > 0
            ? 'linear-gradient(135deg, #1e8e3e, #0d6529)'
            : 'linear-gradient(135deg, #1a73e8, #0d47a1)',
          borderRadius: 12,
          padding: '24px 28px',
          color: '#fff',
        }}>
          <div style={{ fontSize: '1.2em', fontWeight: 700, marginBottom: 8 }}>
            {final.netDiff > 0
              ? rv.verdictBuyBetter.replace('{years}', String(compareYears)).replace('{amount}', fmt(Math.abs(final.netDiff)))
              : rv.verdictRentBetter.replace('{years}', String(compareYears)).replace('{amount}', fmt(Math.abs(final.netDiff)))}
          </div>
          <p style={{ fontSize: '0.88em', opacity: 0.9, lineHeight: 1.7 }}>
            {final.netDiff > 0
              ? rv.verdictBuyReason
              : rv.verdictRentReason}
            <br />
            {rv.verdictDisclaimer}
          </p>
        </aside>
      )}
    </div>
  )
}

function Field({
  label, value, onChange, min, max, step, unit,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit?: string
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ fontSize: '0.82em', color: '#5f6368', display: 'block', marginBottom: 2 }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: '#1a73e8' }}
        />
        <span style={{
          fontWeight: 600, fontSize: '0.88em', minWidth: 60, textAlign: 'right',
        }}>
          {value}{unit || ''}
        </span>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '6px 4px', fontSize: '0.8em', fontWeight: 700 }
const thStyleR: React.CSSProperties = { textAlign: 'right', padding: '6px 4px', fontSize: '0.8em', fontWeight: 700 }
const tdStyle: React.CSSProperties = { padding: '8px 4px', color: '#5f6368' }
const tdStyleR: React.CSSProperties = { textAlign: 'right', padding: '8px 4px' }
