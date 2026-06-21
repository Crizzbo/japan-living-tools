'use client'
import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'

// 住民税所得割计算（简化版）
function calcEmploymentDeduction(income: number): number {
  if (income <= 1_625_000) return 550_000
  if (income <= 1_800_000) return Math.round(income * 0.4 - 100_000)
  if (income <= 3_600_000) return Math.round(income * 0.3 + 80_000)
  if (income <= 6_600_000) return Math.round(income * 0.2 + 440_000)
  if (income <= 8_500_000) return Math.round(income * 0.1 + 1_100_000)
  return 1_950_000
}

function calcFurusatoLimit(income: number, over40: boolean, dependents: number) {
  const deduction = calcEmploymentDeduction(income)
  const employmentIncome = Math.max(0, income - deduction)
  const socialInsurance = Math.round(income * (over40 ? 0.15 : 0.145))
  const basicDeduction = 480_000
  const dependentDeduction = dependents * 330_000
  const taxableIncome = Math.max(0, employmentIncome - socialInsurance - basicDeduction - dependentDeduction)
  const residenceTaxIncomePortion = Math.round(taxableIncome * 0.1)

  // 故乡税抵扣额度概算：所得割 × 约20%
  const limit = Math.round(residenceTaxIncomePortion * 0.2)
  const selfPay = 2000
  const taxSaving = Math.max(0, limit - selfPay)

  return { limit, selfPay, taxSaving }
}

function simulateDonation(amount: number, limit: number) {
  if (amount <= 0) return { incomeDeduction: 0, residenceTaxDeduction: 0, totalDeduction: 0, selfPay: 0, returnRate: 0 }

  const taxableAmount = amount - 2000
  const incomeTaxRate = 0.1
  const incomeDeduction = Math.round(taxableAmount * incomeTaxRate * 1.021)

  const residenceTaxDeduction = Math.min(
    Math.round(taxableAmount * 0.9),
    limit
  )

  const totalDeduction = incomeDeduction + residenceTaxDeduction
  const selfPay = Math.max(0, amount - totalDeduction)
  const returnRate = amount > 0 ? (totalDeduction / amount) * 100 : 0

  return { incomeDeduction, residenceTaxDeduction, totalDeduction, selfPay, returnRate }
}

export default function FurusatoPage() {
  const { t } = useT()
  const ft = t.furusato

  const [income, setIncome] = useState(500)
  const [over40, setOver40] = useState(false)
  const [dependents, setDependents] = useState(0)
  const [donation, setDonation] = useState(5)

  const limitResult = useMemo(
    () => calcFurusatoLimit(income * 10000, over40, dependents),
    [income, over40, dependents]
  )

  const simResult = useMemo(
    () => simulateDonation(donation * 10000, limitResult.limit),
    [donation, limitResult.limit]
  )

  const fmt = (n: number) => n.toLocaleString('ja-JP')
  const isOverLimit = donation * 10000 > limitResult.limit

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'ふるさと納税シミュレーター',
        'description': 'ふるさと納税の控除限度額と節税効果を自動計算',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
      }} />
      <Breadcrumbs items={[{ label: t.common.breadcrumbTools, href: '/tools' }, { label: ft.title }]} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>
        {ft.title}
      </h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>
        {ft.description}
      </p>

      <section aria-label="入力" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{ft.formTitle}</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {ft.annualIncome}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="range" min={200} max={2000} step={10} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9em', minWidth: 80, textAlign: 'right' }}>
              {income}{ft.manYen}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {ft.ageGroup}
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { val: false, label: ft.under40 },
              { val: true, label: ft.over40 },
            ].map(opt => (
              <button key={String(opt.val)} onClick={() => setOver40(opt.val)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8,
                  border: over40 === opt.val ? '2px solid #1a73e8' : '1px solid #dadce0',
                  background: over40 === opt.val ? '#e8f0fe' : '#fff',
                  fontWeight: 600, fontSize: '0.88em',
                  color: over40 === opt.val ? '#1a73e8' : '#5f6368', cursor: 'pointer',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {ft.dependents}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="range" min={0} max={5} step={1} value={dependents}
              onChange={e => setDependents(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9em', minWidth: 40, textAlign: 'right' }}>
              {dependents}{ft.personUnit}
            </span>
          </div>
        </div>

        <div style={{
          background: '#e8f0fe', borderRadius: 10, padding: '16px 18px', marginTop: 16, textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.82em', color: '#5f6368', marginBottom: 4 }}>{ft.limitLabel}</div>
          <div style={{ fontSize: '1.5em', fontWeight: 700, color: '#1a73e8' }}>
            ¥{fmt(limitResult.limit)}
          </div>
          <div style={{ fontSize: '0.78em', color: '#5f6368', marginTop: 4 }}>
            {ft.selfPayNote}
          </div>
        </div>
      </section>

      <section aria-label="寄附シミュレーション" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{ft.simTitle}</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {ft.donationAmount}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="range" min={1} max={Math.min(100, Math.round(limitResult.limit / 10000 * 1.5))} step={1}
              value={donation} onChange={e => setDonation(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9em', minWidth: 80, textAlign: 'right' }}>
              {donation}{ft.manYen}
            </span>
          </div>
          {isOverLimit && (
            <div style={{ color: '#d93025', fontSize: '0.82em', marginTop: 4, fontWeight: 600 }}>
              ⚠️ {ft.overLimitWarning}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#e8f0fe', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{ft.totalDeduction}</div>
            <div style={{ fontSize: '1.3em', fontWeight: 700, color: '#1a73e8' }}>¥{fmt(simResult.totalDeduction)}</div>
          </div>
          <div style={{
            background: isOverLimit ? '#fce8e6' : '#e6f4ea',
            borderRadius: 10, padding: '16px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{ft.selfPayLabel}</div>
            <div style={{
              fontSize: '1.3em', fontWeight: 700,
              color: isOverLimit ? '#d93025' : '#1e8e3e',
            }}>¥{fmt(simResult.selfPay)}</div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88em' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 4px', color: '#5f6368' }}>{ft.rowDonation}</td>
              <td style={{ textAlign: 'right', padding: '8px 4px', fontWeight: 600 }}>¥{fmt(donation * 10000)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 4px', color: '#5f6368' }}>{ft.rowIncomeDeduction}</td>
              <td style={{ textAlign: 'right', padding: '8px 4px' }}>¥{fmt(simResult.incomeDeduction)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 4px', color: '#5f6368' }}>{ft.rowResidenceTaxDeduction}</td>
              <td style={{ textAlign: 'right', padding: '8px 4px' }}>¥{fmt(simResult.residenceTaxDeduction)}</td>
            </tr>
            <tr style={{ background: '#e8f0fe' }}>
              <td style={{ padding: '10px 4px', fontWeight: 700 }}>{ft.rowTotalDeduction}</td>
              <td style={{ textAlign: 'right', padding: '10px 4px', fontWeight: 700, color: '#1a73e8' }}>
                ¥{fmt(simResult.totalDeduction)}
              </td>
            </tr>
          </tbody>
        </table>

        {simResult.returnRate > 0 && !isOverLimit && (
          <div style={{
            background: 'linear-gradient(135deg, #1e8e3e, #0d652d)',
            borderRadius: 10, padding: '14px 18px', marginTop: 16, color: '#fff', textAlign: 'center',
          }}>
            <span style={{ fontSize: '0.88em', opacity: 0.9 }}>{ft.returnRatePrefix}</span>
            <span style={{ fontSize: '1.4em', fontWeight: 700, margin: '0 4px' }}>
              {simResult.returnRate.toFixed(0)}%
            </span>
            <span style={{ fontSize: '0.88em', opacity: 0.9 }}>{ft.returnRateSuffix}</span>
          </div>
        )}
      </section>

      <aside role="note" style={{
        background: '#fff8e1', borderRadius: 12, padding: '20px 24px',
        border: '1px solid #ffe082', fontSize: '0.86em', lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#e37400' }}>⚠️ {ft.noteTitle}</div>
        <p style={{ color: '#5f6368', margin: 0 }}>{ft.noteContent}</p>
      </aside>
    </div>
  )
}
