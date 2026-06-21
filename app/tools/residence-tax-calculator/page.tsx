'use client'
import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'

// Employment income deduction (Reiwa 7)
function calcEmploymentDeduction(income: number): number {
  if (income <= 1_625_000) return 550_000
  if (income <= 1_800_000) return Math.round(income * 0.4 - 100_000)
  if (income <= 3_600_000) return Math.round(income * 0.3 + 80_000)
  if (income <= 6_600_000) return Math.round(income * 0.2 + 440_000)
  if (income <= 8_500_000) return Math.round(income * 0.1 + 1_100_000)
  return 1_950_000
}

// Basic deduction
function calcBasicDeduction(taxableIncome: number): number {
  if (taxableIncome <= 2_400_000) return 480_000
  if (taxableIncome <= 2_450_000) return 320_000
  if (taxableIncome <= 2_500_000) return 160_000
  return 0
}

// Social insurance (approx. 14.5%/15%)
function calcSocialInsurance(income: number, over40: boolean): number {
  return Math.round(income * (over40 ? 0.15 : 0.145))
}

// Residence tax calculation
function calcResidenceTax(income: number, over40: boolean, dependents: number) {
  const deduction = calcEmploymentDeduction(income)
  const employmentIncome = Math.max(0, income - deduction)
  const socialInsurance = calcSocialInsurance(income, over40)
  const basicDeduction = calcBasicDeduction(employmentIncome - socialInsurance)
  const dependentDeduction = dependents * 330_000
  const taxableIncome = Math.max(0, employmentIncome - socialInsurance - basicDeduction - dependentDeduction)

  const incomePortion = Math.round(taxableIncome * 0.1)
  const perCapita = 5_000
  const total = incomePortion + perCapita
  const monthly = Math.round(total / 12)

  const isExempt = taxableIncome <= 0 && income <= 350_000 * (1 + dependents) + 310_000

  return {
    income, deduction, employmentIncome, socialInsurance,
    basicDeduction, dependentDeduction, taxableIncome,
    incomePortion, perCapita, total, monthly, isExempt,
  }
}

export default function ResidenceTaxPage() {
  const { t } = useT()
  const rt = t.residenceTax

  const [income, setIncome] = useState(500)
  const [over40, setOver40] = useState(false)
  const [dependents, setDependents] = useState(0)

  const result = useMemo(
    () => calcResidenceTax(income * 10000, over40, dependents),
    [income, over40, dependents]
  )

  const fmt = (n: number) => n.toLocaleString('ja-JP')

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '住民税計算器',
        'description': '年収から住民税（所得割＋均等割）を自動計算',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
      }} />
      <Breadcrumbs items={[{ label: t.common.breadcrumbTools, href: '/tools' }, { label: rt.title }]} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>
        {rt.title}
      </h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>
        {rt.description}
      </p>

      <section aria-label="入力" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{rt.formTitle}</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {rt.annualIncome}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="range" min={100} max={2000} step={10} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9em', minWidth: 80, textAlign: 'right' }}>
              {income}{rt.manYen}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {rt.ageGroup}
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { val: false, label: rt.under40 },
              { val: true, label: rt.over40 },
            ].map(opt => (
              <button key={String(opt.val)} onClick={() => setOver40(opt.val)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8,
                  border: over40 === opt.val ? '2px solid #1a73e8' : '1px solid #dadce0',
                  background: over40 === opt.val ? '#e8f0fe' : '#fff',
                  fontWeight: 600, fontSize: '0.88em',
                  color: over40 === opt.val ? '#1a73e8' : '#5f6368',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.88em', color: '#5f6368', display: 'block', marginBottom: 4 }}>
            {rt.dependents}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="range" min={0} max={5} step={1} value={dependents}
              onChange={e => setDependents(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#1a73e8' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9em', minWidth: 40, textAlign: 'right' }}>
              {dependents}{rt.personUnit}
            </span>
          </div>
        </div>
      </section>

      <section aria-label="計算結果" style={{
        background: '#fff', borderRadius: 12, padding: '24px 28px',
        border: '1px solid #dadce0', marginBottom: 24,
      }}>
        <h2 style={{ fontSize: '1.05em', fontWeight: 700, marginBottom: 16 }}>{rt.resultTitle}</h2>

        {result.isExempt ? (
          <div style={{
            background: 'linear-gradient(135deg, #1e8e3e, #0d6529)',
            borderRadius: 12, padding: '20px 24px', color: '#fff', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.2em', fontWeight: 700 }}>{rt.exemptMessage}</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#e8f0fe', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{rt.annualLabel}</div>
                <div style={{ fontSize: '1.3em', fontWeight: 700, color: '#1a73e8' }}>¥{fmt(result.total)}</div>
              </div>
              <div style={{ background: '#fef7e0', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{rt.monthlyLabel}</div>
                <div style={{ fontSize: '1.3em', fontWeight: 700, color: '#e37400' }}>¥{fmt(result.monthly)}</div>
              </div>
              <div style={{ background: '#fce8e6', borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78em', color: '#5f6368', marginBottom: 4 }}>{rt.taxRate}</div>
                <div style={{ fontSize: '1.3em', fontWeight: 700, color: '#d93025' }}>
                  {((result.total / result.income) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88em' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1a73e8' }}>
                  <th style={{ textAlign: 'left', padding: '8px 4px', fontSize: '0.82em' }}>{rt.colItem}</th>
                  <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '0.82em' }}>{rt.colAmount}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: rt.rowIncome, value: result.income, bold: false },
                  { label: rt.rowDeduction, value: result.deduction, bold: false, minus: true },
                  { label: rt.rowEmploymentIncome, value: result.employmentIncome, bold: true },
                  { label: rt.rowSocialInsurance, value: result.socialInsurance, bold: false, minus: true },
                  { label: rt.rowBasicDeduction, value: result.basicDeduction, bold: false, minus: true },
                  ...(result.dependentDeduction > 0 ? [{ label: rt.rowDependentDeduction, value: result.dependentDeduction, bold: false, minus: true }] : []),
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 4px', color: '#5f6368' }}>{row.label}</td>
                    <td style={{ textAlign: 'right', padding: '8px 4px', fontWeight: row.bold ? 600 : 400 }}>
                      {row.minus ? '−' : ''}¥{fmt(row.value)}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '2px solid #dadce0' }}>
                  <td style={{ padding: '8px 4px', fontWeight: 700, color: '#1a73e8' }}>{rt.rowTaxableIncome}</td>
                  <td style={{ textAlign: 'right', padding: '8px 4px', fontWeight: 700, color: '#1a73e8' }}>¥{fmt(result.taxableIncome)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px 4px', color: '#5f6368' }}>{rt.rowIncomePortion}</td>
                  <td style={{ textAlign: 'right', padding: '8px 4px' }}>¥{fmt(result.incomePortion)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px 4px', color: '#5f6368' }}>{rt.rowPerCapita}</td>
                  <td style={{ textAlign: 'right', padding: '8px 4px' }}>¥{fmt(result.perCapita)}</td>
                </tr>
                <tr style={{ background: '#e8f0fe' }}>
                  <td style={{ padding: '10px 4px', fontWeight: 700, fontSize: '1.05em' }}>{rt.rowTotal}</td>
                  <td style={{ textAlign: 'right', padding: '10px 4px', fontWeight: 700, fontSize: '1.05em', color: '#1a73e8' }}>¥{fmt(result.total)}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </section>

      <aside role="note" style={{
        background: '#fff8e1', borderRadius: 12, padding: '20px 24px',
        border: '1px solid #ffe082', fontSize: '0.86em', lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#e37400' }}>⚠️ {rt.noteTitle}</div>
        <p style={{ color: '#5f6368', margin: 0 }}>{rt.noteContent}</p>
      </aside>
    </div>
  )
}
