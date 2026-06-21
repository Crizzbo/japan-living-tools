'use client'

import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'

// ── 令和7年(2025) 給与所得控除 ──
function calcEmploymentDeduction(annualIncome: number): number {
  if (annualIncome <= 1_900_000) return 650_000
  if (annualIncome <= 3_600_000) return Math.round(annualIncome * 0.3 + 80_000)
  if (annualIncome <= 6_600_000) return Math.round(annualIncome * 0.2 + 440_000)
  if (annualIncome <= 8_500_000) return Math.round(annualIncome * 0.1 + 1_100_000)
  return 1_950_000
}

// ── 令和7年 基礎控除 ──
function calcBasicDeduction(employmentIncome: number): number {
  if (employmentIncome <= 1_320_000) return 950_000
  if (employmentIncome <= 3_360_000) return 880_000
  if (employmentIncome <= 4_890_000) return 680_000
  if (employmentIncome <= 6_550_000) return 630_000
  if (employmentIncome <= 23_500_000) return 580_000
  if (employmentIncome <= 24_000_000) return 480_000
  if (employmentIncome <= 24_500_000) return 320_000
  if (employmentIncome <= 25_000_000) return 160_000
  return 0
}

// ── 社会保険料（概算） ──
function calcSocialInsurance(annualIncome: number, over40: boolean): number {
  const rate = over40 ? 0.1645 : 0.1565
  const cap = 16_680_000
  const base = Math.min(annualIncome, cap)
  return Math.round(base * rate)
}

// ── 所得税 速算表 ──
function calcIncomeTax(taxableIncome: number): number {
  const brackets = [
    { max: 1_949_000, rate: 0.05, deduction: 0 },
    { max: 3_299_000, rate: 0.10, deduction: 97_500 },
    { max: 6_949_000, rate: 0.20, deduction: 427_500 },
    { max: 8_999_000, rate: 0.23, deduction: 636_000 },
    { max: 17_999_000, rate: 0.33, deduction: 1_536_000 },
    { max: 39_999_000, rate: 0.40, deduction: 2_796_000 },
    { max: Infinity, rate: 0.45, deduction: 4_796_000 },
  ]
  const truncated = Math.floor(taxableIncome / 1000) * 1000
  for (const b of brackets) {
    if (truncated <= b.max) {
      return Math.max(0, Math.round(truncated * b.rate - b.deduction))
    }
  }
  return 0
}

// ── 住民税（概算） ──
function calcResidentTax(employmentIncome: number, basicDeduction: number): number {
  const residentBasicDeduction = 430_000
  const taxableForResident = Math.max(0, Math.floor(employmentIncome / 1000) * 1000 - residentBasicDeduction)
  return Math.round(taxableForResident * 0.1) + 5_000
}

export default function SalaryCalculator() {
  const { t } = useT()
  const sc = t.salaryCalculator

  const [annualIncome, setAnnualIncome] = useState(6_000_000)
  const [over40, setOver40] = useState(false)

  const result = useMemo(() => {
    const employmentDeduction = calcEmploymentDeduction(annualIncome)
    const employmentIncome = Math.max(0, annualIncome - employmentDeduction)
    const socialInsurance = calcSocialInsurance(annualIncome, over40)
    const basicDeduction = calcBasicDeduction(employmentIncome)
    const taxableIncome = Math.max(0, employmentIncome - socialInsurance - basicDeduction)
    const incomeTax = calcIncomeTax(taxableIncome)
    const reconstructionTax = Math.round(incomeTax * 0.021)
    const totalIncomeTax = incomeTax + reconstructionTax
    const residentTax = calcResidentTax(employmentIncome, basicDeduction)
    const totalDeductions = socialInsurance + totalIncomeTax + residentTax
    const takeHome = annualIncome - totalDeductions
    const monthlyTakeHome = Math.round(takeHome / 12)
    const monthlyGross = Math.round(annualIncome / 12)
    const monthlyDeductions = Math.round(totalDeductions / 12)

    return {
      employmentDeduction,
      employmentIncome,
      socialInsurance,
      basicDeduction,
      taxableIncome,
      incomeTax,
      reconstructionTax,
      totalIncomeTax,
      residentTax,
      totalDeductions,
      takeHome,
      monthlyTakeHome,
      monthlyGross,
      monthlyDeductions,
      netRate: ((takeHome / annualIncome) * 100).toFixed(1),
    }
  }, [annualIncome, over40])

  const fmt = (n: number) => n.toLocaleString('ja-JP')

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '日本税后工资计算器',
        'description': '基于令和7年度税率，输入年收入自动计算日本税后到手金额',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
        'browserRequirements': 'Requires JavaScript',
      }} />
      <Breadcrumbs items={[{ label: t.common.breadcrumbTools, href: '/tools' }, { label: sc.title }]} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>{sc.title}</h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>
        {sc.description}
      </p>

      {/* Input */}
      <section aria-label="入力" style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px 28px',
        border: '1px solid #dadce0',
        marginBottom: 24,
      }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.95em' }}>
            {sc.incomeLabel}
          </label>
          <input
            type="range"
            min={200}
            max={3000}
            step={10}
            value={annualIncome / 10000}
            onChange={e => setAnnualIncome(Number(e.target.value) * 10000)}
            style={{ width: '100%', accentColor: '#1a73e8' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <input
              type="number"
              value={Math.round(annualIncome / 10000)}
              onChange={e => setAnnualIncome(Math.max(200, Math.min(3000, Number(e.target.value))) * 10000)}
              style={{
                width: 120,
                fontSize: '1.3em',
                fontWeight: 700,
                textAlign: 'center',
                border: '2px solid #1a73e8',
                borderRadius: 8,
                padding: '4px 8px',
                color: '#1a73e8',
                outline: 'none',
              }}
            />
            <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#1a73e8', lineHeight: '42px' }}>{sc.incomeUnit}</span>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9em' }}>
          <input
            type="checkbox"
            checked={over40}
            onChange={e => setOver40(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#1a73e8' }}
          />
          {sc.over40Label}
        </label>
      </section>

      {/* Result */}
      <section aria-label="計算結果" style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px 28px',
        border: '1px solid #dadce0',
        marginBottom: 24,
      }}>
        {/* 手取额 */}
        <div style={{
          background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
          borderRadius: 12,
          padding: '24px',
          color: '#fff',
          textAlign: 'center',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: '0.85em', opacity: 0.85, marginBottom: 4 }}>{sc.monthlyTakeHome}</div>
          <div style={{ fontSize: '2.4em', fontWeight: 700 }}>¥{fmt(result.monthlyTakeHome)}</div>
          <div style={{ fontSize: '0.85em', opacity: 0.8, marginTop: 4 }}>
            {sc.annualTakeHome} ¥{fmt(result.takeHome)}（{sc.takeHomeRate.replace('{rate}', result.netRate)}）
          </div>
        </div>

        {/* 明细 */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92em' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #1a73e8' }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>{sc.thItem}</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>{sc.thAnnual}</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>{sc.thMonthly}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.grossIncome}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', fontWeight: 600 }}>¥{fmt(annualIncome)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0' }}>¥{fmt(result.monthlyGross)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.employmentDeduction}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(result.employmentDeduction)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(Math.round(result.employmentDeduction / 12))}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.socialInsurance}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(result.socialInsurance)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(Math.round(result.socialInsurance / 12))}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.basicDeduction}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(result.basicDeduction)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.incomeTax}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(result.totalIncomeTax)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(Math.round(result.totalIncomeTax / 12))}</td>
            </tr>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#5f6368' }}>{sc.residentTax}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(result.residentTax)}</td>
              <td style={{ textAlign: 'right', padding: '8px 0', color: '#d93025' }}>-¥{fmt(Math.round(result.residentTax / 12))}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 0', fontWeight: 700, fontSize: '1.05em' }}>{sc.takeHome}</td>
              <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: 700, color: '#1a73e8', fontSize: '1.1em' }}>¥{fmt(result.takeHome)}</td>
              <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: 700, color: '#1a73e8', fontSize: '1.1em' }}>¥{fmt(result.monthlyTakeHome)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <aside role="note" style={{
        background: '#e8f0fe',
        borderRadius: 8,
        padding: '14px 18px',
        fontSize: '0.82em',
        color: '#5f6368',
        lineHeight: 1.7,
      }}>
        {sc.note}
      </aside>
    </div>
  )
}
