'use client'

import { useState, useMemo } from 'react'
import { useT } from '@/lib/i18n'
import JsonLd from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/Breadcrumbs'

// ── 高度人材ポイント計算表 ──
// 基準: 出入国在留管理庁「高度専門職ポイント制」（高度専門・技術活動）

type EducationKey = 'phd' | 'mba' | 'masters' | 'bachelors' | 'college' | 'none'
type ExperienceKey = 'y15' | 'y10' | 'y7' | 'y5' | 'y3' | 'less3'

const educationPoints: Record<EducationKey, number> = {
  phd: 30, mba: 25, masters: 20, bachelors: 10, college: 5, none: 0,
}
const educationKeys: EducationKey[] = ['phd', 'mba', 'masters', 'bachelors', 'college', 'none']

const experiencePoints: Record<ExperienceKey, number> = {
  y15: 25, y10: 20, y7: 15, y5: 10, y3: 5, less3: 0,
}
const experienceKeys: ExperienceKey[] = ['y15', 'y10', 'y7', 'y5', 'y3', 'less3']

// 年収ポイント表 [年齢区分][年収帯] → ポイント
const salaryTable: { min: number; max: number; points: [number, number, number, number] }[] = [
  { min:   0, max:  399, points: [ 0,  0,  0,  0] },
  { min: 400, max:  499, points: [10,  5,  0,  0] },
  { min: 500, max:  599, points: [15, 10,  5,  0] },
  { min: 600, max:  699, points: [20, 15, 10,  5] },
  { min: 700, max:  799, points: [25, 20, 15, 10] },
  { min: 800, max:  899, points: [30, 25, 20, 15] },
  { min: 900, max:  999, points: [35, 30, 25, 20] },
  { min:1000, max: 1249, points: [40, 35, 30, 25] },
  { min:1250, max: 1499, points: [45, 40, 35, 30] },
  { min:1500, max: 1999, points: [50, 45, 40, 35] },
  { min:2000, max: 2999, points: [55, 50, 45, 40] },
  { min:3000, max:Infinity,points: [60, 55, 50, 45] },
]

function calcSalaryPoints(annualSalaryMan: number, ageBracket: number): number {
  const bracket = salaryTable.find(b => annualSalaryMan >= b.min && annualSalaryMan <= b.max)
  if (!bracket) return 0
  return bracket.points[ageBracket]
}

const agePoints = [15, 10, 5, 0] // [under29, age30to34, age35to39, over40]
const japanesePoints = [15, 10, 0] // [n1, n2, none]

const bonusOptionDefs = [
  { key: 'jpGrad', points: 10 },
  { key: 'jpUniv', points: 10 },
  { key: 'topUniv', points: 10 },
  { key: 'jpLangBonus', points: 5 },
  { key: 'qualification', points: 5 },
  { key: 'research', points: 15 },
  { key: 'patent', points: 15 },
  { key: 'executive', points: 20 },
  { key: 'govProject', points: 10 },
  { key: 'investment', points: 5 },
]

export default function HsPointCalculator() {
  const { t } = useT()
  const hp = t.hsPointCalculator

  const [educationKey, setEducationKey] = useState<EducationKey>('phd')
  const [experienceKey, setExperienceKey] = useState<ExperienceKey>('y15')
  const [annualSalary, setAnnualSalary] = useState(600)
  const [age, setAge] = useState(0)
  const [japaneseIdx, setJapaneseIdx] = useState(0)
  const [bonuses, setBonuses] = useState<Record<string, boolean>>({})

  const education = educationPoints[educationKey]
  const experience = experiencePoints[experienceKey]
  const japanese = japanesePoints[japaneseIdx]

  const salaryPoints = useMemo(() => {
    return calcSalaryPoints(annualSalary, age)
  }, [annualSalary, age])

  const bonusTotal = useMemo(() => {
    return bonusOptionDefs.reduce((sum, opt) => sum + (bonuses[opt.key] ? opt.points : 0), 0)
  }, [bonuses])

  const total = education + experience + salaryPoints + agePoints[age] + japanese + bonusTotal

  const toggleBonus = (key: string) => {
    setBonuses(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSalaryChange = (value: number) => {
    setAnnualSalary(Math.max(200, Math.min(3000, value)))
  }

  const ageBracketLabels = [hp.ageBracketLabels.under29, hp.ageBracketLabels.age30to34, hp.ageBracketLabels.age35to39, hp.ageBracketLabels.over40]
  const ageBracketName = ageBracketLabels[age]

  // 経験年数の実現可能性警告
  const experienceWarning = useMemo(() => {
    const expYearsMap: Record<ExperienceKey, number> = { y15: 15, y10: 10, y7: 7, y5: 5, y3: 3, less3: 0 }
    const expYears = expYearsMap[experienceKey]
    const ages = [25, 32, 37, 45]
    const approxAge = ages[age]
    if (22 + expYears > approxAge) {
      const ageLabels = [
        hp.ageOptions.under29, hp.ageOptions.age30to34, hp.ageOptions.age35to39, hp.ageOptions.over40,
      ]
      return hp.experienceWarning.replace('{ageLabel}', ageLabels[age]).replace('{expLabel}', hp.experienceOptions[experienceKey])
    }
    return null
  }, [experienceKey, age, hp])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': '高度人材积分计算器',
        'description': '出入国在留管理庁「高度専門職ポイント制」に準拠した积分计算',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'JPY' },
        'browserRequirements': 'Requires JavaScript',
      }} />
      <Breadcrumbs items={[{ label: t.common.breadcrumbTools, href: '/tools' }, { label: hp.title }]} />
      <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 8 }}>
        {hp.title}
      </h1>
      <p style={{ color: '#5f6368', marginBottom: 24 }}>
        {hp.description}
        <br />
        <span style={{ fontSize: '0.88em', color: '#e37400' }}>
          {hp.descriptionNote}
        </span>
      </p>

      {/* Form */}
      <section aria-label="入力" style={{
        background: '#fff',
        borderRadius: 12,
        padding: '24px 28px',
        border: '1px solid #dadce0',
        marginBottom: 24,
      }}>
        {/* 年齢 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block', fontSize: '0.95em' }}>
            {hp.age.label}
            <span style={{ fontWeight: 400, fontSize: '0.82em', color: '#5f6368', marginLeft: 8 }}>
              {hp.age.note}
            </span>
          </label>
          <select
            value={age}
            onChange={e => setAge(Number(e.target.value))}
            style={selectStyle}
          >
            {[0, 1, 2, 3].map(i => {
              const labels = [hp.ageOptions.under29, hp.ageOptions.age30to34, hp.ageOptions.age35to39, hp.ageOptions.over40]
              return (
                <option key={i} value={i}>{labels[i]}（{hp.breakdownLabels.age} {agePoints[i]}{hp.resultUnit}）</option>
              )
            })}
          </select>
        </div>

        {/* 年収 */}
        <div style={{
          marginBottom: 20,
          background: '#f8f9fa',
          borderRadius: 10,
          padding: '16px',
          border: '2px solid #1a73e8',
        }}>
          <label style={{ fontWeight: 600, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95em' }}>
            <span>{hp.salary.label}（{hp.salary.unit}）</span>
            <span style={{
              fontSize: '0.85em',
              background: '#1a73e8',
              color: '#fff',
              padding: '2px 12px',
              borderRadius: 12,
            }}>
              {ageBracketName} → {salaryPoints}{hp.resultUnit}
            </span>
          </label>

          {/* 年齢別の簡易早見表 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 4,
            marginBottom: 12,
            fontSize: '0.72em',
            color: '#5f6368',
          }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '3px 0',
                borderRadius: 4,
                background: age === i ? '#1a73e8' : '#e8e8e8',
                color: age === i ? '#fff' : '#5f6368',
                fontWeight: age === i ? 700 : 400,
              }}>{ageBracketLabels[i]}</div>
            ))}
          </div>

          <div style={{ fontSize: '0.75em', color: '#5f6368', marginBottom: 10, lineHeight: 1.6 }}>
            {salaryTable.filter(b => b.points[age] > 0).map((b, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1px 0',
                background: annualSalary >= b.min && annualSalary <= b.max ? '#e8f0fe' : 'transparent',
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
              }}>
                <span>{b.min}〜{b.max === Infinity ? '' : b.max}{hp.salary.unit}</span>
                <span style={{ fontWeight: annualSalary >= b.min && annualSalary <= b.max ? 700 : 400, color: annualSalary >= b.min && annualSalary <= b.max ? '#1a73e8' : '#5f6368' }}>
                  {b.points[age]}{hp.resultUnit}
                </span>
              </div>
            ))}
          </div>

          <input
            type="range"
            min={200}
            max={3000}
            step={10}
            value={annualSalary}
            onChange={e => handleSalaryChange(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#1a73e8' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <input
              type="number"
              value={annualSalary}
              onChange={e => handleSalaryChange(Number(e.target.value))}
              style={{
                width: 100,
                fontSize: '1.1em',
                fontWeight: 600,
                textAlign: 'center',
                border: '2px solid #1a73e8',
                borderRadius: 8,
                padding: '4px 8px',
                color: '#1a73e8',
                outline: 'none',
              }}
            />
            <span style={{ fontWeight: 600 }}>{hp.salary.unit}</span>
          </div>
        </div>

        {/* 学歴 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block', fontSize: '0.95em' }}>{hp.education.label}</label>
          <select
            value={educationKey}
            onChange={e => setEducationKey(e.target.value as EducationKey)}
            style={selectStyle}
          >
            {educationKeys.map(key => (
              <option key={key} value={key}>{hp.educationOptions[key]}（{educationPoints[key]}{hp.resultUnit}）</option>
            ))}
          </select>
        </div>

        {/* 職歴 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block', fontSize: '0.95em' }}>{hp.experience.label}</label>
          <select
            value={experienceKey}
            onChange={e => setExperienceKey(e.target.value as ExperienceKey)}
            style={selectStyle}
          >
            {experienceKeys.map(key => (
              <option key={key} value={key}>
                {hp.experienceOptions[key]}（{experiencePoints[key]}{hp.resultUnit}）
              </option>
            ))}
          </select>
          {experienceWarning && (
            <div style={{
              marginTop: 6,
              padding: '6px 10px',
              background: '#fef7e0',
              border: '1px solid #e37400',
              borderRadius: 6,
              fontSize: '0.8em',
              color: '#e37400',
            }}>
              {experienceWarning}
            </div>
          )}
        </div>

        {/* 日本語 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block', fontSize: '0.95em' }}>{hp.japanese.label}</label>
          <select
            value={japaneseIdx}
            onChange={e => setJapaneseIdx(Number(e.target.value))}
            style={selectStyle}
          >
            {[0, 1, 2].map(i => {
              const labels = [hp.japaneseOptions.n1, hp.japaneseOptions.n2, hp.japaneseOptions.none]
              return (
                <option key={i} value={i}>{labels[i]}（{japanesePoints[i]}{hp.resultUnit}）</option>
              )
            })}
          </select>
        </div>

        {/* ボーナスポイント */}
        <div>
          <label style={{ fontWeight: 600, marginBottom: 10, display: 'block', fontSize: '0.95em' }}>
            {hp.bonus.label}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {bonusOptionDefs.map(opt => (
              <label
                key={opt.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 8,
                  background: bonuses[opt.key] ? '#e8f0fe' : '#f8f9fa',
                  border: bonuses[opt.key] ? '1px solid #1a73e8' : '1px solid #dadce0',
                  cursor: 'pointer',
                  fontSize: '0.88em',
                  transition: 'all 0.15s',
                }}
              >
                <input
                  type="checkbox"
                  checked={!!bonuses[opt.key]}
                  onChange={() => toggleBonus(opt.key)}
                  style={{ width: 16, height: 16, accentColor: '#1a73e8' }}
                />
                <span style={{ flex: 1 }}>{(hp.bonusOptions as any)[opt.key]}</span>
                <span style={{
                  fontWeight: 600,
                  color: '#1a73e8',
                  fontSize: '0.85em',
                  background: '#fff',
                  padding: '1px 8px',
                  borderRadius: 12,
                  border: '1px solid #1a73e8',
                }}>
                  +{opt.points}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Result */}
      <section aria-label="計算結果" style={{
        background: total >= 80
          ? 'linear-gradient(135deg, #1e8e3e, #0d6529)'
          : total >= 70
            ? 'linear-gradient(135deg, #1a73e8, #0d47a1)'
            : 'linear-gradient(135deg, #5f6368, #3c4043)',
        borderRadius: 12,
        padding: '28px',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: '0.85em', opacity: 0.85, marginBottom: 4 }}>{hp.resultYourScore}</div>
        <div style={{ fontSize: '3em', fontWeight: 700 }}>{total}{hp.resultUnit}</div>
        <div style={{ fontSize: '1em', marginTop: 8, opacity: 0.9 }}>
          {total >= 80
            ? hp.result80
            : total >= 70
              ? hp.result70
              : hp.resultUnder70}
        </div>
      </section>

      {/* Breakdown */}
      <section aria-label="内訳" style={{
        background: '#fff',
        borderRadius: 12,
        padding: '20px 28px',
        border: '1px solid #dadce0',
      }}>
        <h3 style={{ fontSize: '1em', marginBottom: 12 }}>{hp.breakdownTitle}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
          <tbody>
            <Row label={hp.breakdownLabels.age} points={agePoints[age]} detail={ageBracketName} unit={hp.resultUnit} />
            <Row label={hp.breakdownLabels.salary} points={salaryPoints} detail={hp.salaryDetail.replace('{salary}', String(annualSalary)).replace('{ageBracket}', ageBracketName)} unit={hp.resultUnit} />
            <Row label={hp.breakdownLabels.education} points={education} unit={hp.resultUnit} />
            <Row label={hp.breakdownLabels.experience} points={experience} unit={hp.resultUnit} />
            <Row label={hp.breakdownLabels.japanese} points={japanese} unit={hp.resultUnit} />
            {bonusOptionDefs.filter(o => bonuses[o.key]).map(o => (
              <Row key={o.key} label={`⭐ ${(hp.bonusOptions as any)[o.key]}`} points={o.points} unit={hp.resultUnit} />
            ))}
            <tr style={{ borderTop: '2px solid #1a73e8' }}>
              <td style={{ padding: '10px 0', fontWeight: 700, fontSize: '1.05em' }}>{hp.breakdownTotal}</td>
              <td style={{
                textAlign: 'right',
                padding: '10px 0',
                fontWeight: 700,
                color: '#1a73e8',
                fontSize: '1.2em',
              }}>
                {total}{hp.resultUnit}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

function Row({ label, points, detail, unit }: { label: string; points: number; detail?: string; unit: string }) {
  return (
    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
      <td style={{ padding: '8px 0', color: '#5f6368' }}>{label}</td>
      <td style={{ textAlign: 'right', padding: '8px 0', fontWeight: 600 }}>{points}{unit}</td>
      <td style={{ textAlign: 'right', padding: '8px 0', color: '#5f6368', fontSize: '0.85em' }}>{detail || ''}</td>
    </tr>
  )
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #dadce0',
  borderRadius: 8,
  fontSize: '0.92em',
  background: '#fff',
  cursor: 'pointer',
  outline: 'none',
}
