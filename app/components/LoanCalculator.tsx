'use client'

import { useState, useMemo, useCallback } from 'react'
import { useT } from '@/lib/i18n'
import styles from './Calculator.module.css'

// ─── 常量配置 ───
const CONFIG = {
  mansion: { mgmtPerMonth: 12000, repairPerMonth: 13000, parkingPerMonth: 15000 },
  house: { mgmtPerMonth: 0, repairPerMonth: 0, parkingPerMonth: 0, selfRepairReservePerMonth: 35000 },
  stampDutyRanges: [
    { max: 100, fee: 0 }, { max: 500, fee: 2000 }, { max: 1000, fee: 10000 },
    { max: 5000, fee: 10000 }, { max: 10000, fee: 10000 }, { max: 50000, fee: 30000 }, { max: Infinity, fee: 60000 },
  ],
  visaDefaults: {
    permanent: { rate: 0.5, loanRatio: 90, rateRange: '0.3～0.8%' },
    tech: { rate: 1.0, loanRatio: 70, rateRange: '0.8～2.0%' },
  },
} as const

type PropertyType = 'mansion' | 'house'
type VisaType = 'permanent' | 'tech'
type BuildingAge = 'new' | '5' | '10' | '15' | '20' | '30' | '40'

// ─── 工具函数 ───
const fmtYen = (v: number) => v.toLocaleString('ja-JP') + '円'
const toMan = (v: number) => (v / 10000).toFixed(0) + '万円'

function calcLoan(yenPrincipal: number, annualRate: number, years: number) {
  const months = years * 12
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) {
    const mp = yenPrincipal / months
    return { monthly: mp, totalPayment: yenPrincipal, totalInterest: 0, months }
  }
  const monthly = yenPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = monthly * months
  return { monthly, totalPayment, totalInterest: totalPayment - yenPrincipal, months }
}

function getStampDuty(priceMan: number): number {
  for (const r of CONFIG.stampDutyRanges) {
    if (priceMan <= r.max) return r.fee
  }
  return 60000
}

// ─── 类型 ───
interface RowItem {
  label: string; value: number; formula: string; note: string
}

function InfoIcon({ tip }: { tip: string }) {
  return <span className={styles.infoIcon} data-tip={tip}>!</span>
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.accordion}>
      <button className={styles.accordionToggle} onClick={() => setOpen(!open)}>
        {title} {open ? '▴' : '▾'}
      </button>
      <div className={`${styles.accordionContent} ${open ? styles.open : ''}`}>{children}</div>
    </div>
  )
}

// ─── 主组件 ───
export default function LoanCalculator() {
  const { t } = useT()
  const lc = t.houseCalculator

  const [housePrice, setHousePrice] = useState(3000) // 万円
  const [propertyType, setPropertyType] = useState<PropertyType>('mansion')
  const [visaType, setVisaType] = useState<VisaType>('permanent')
  const [loanRatio, setLoanRatio] = useState(90)
  const [interestRate, setInterestRate] = useState(0.5)
  const [loanYears, setLoanYears] = useState(35)
  const [annualIncome, setAnnualIncome] = useState(500) // 万円
  const [buildingAge, setBuildingAge] = useState<BuildingAge>('new')

  const onVisaChange = useCallback((visa: VisaType) => {
    setVisaType(visa)
    const def = CONFIG.visaDefaults[visa]
    setInterestRate(def.rate)
    setLoanRatio(def.loanRatio)
  }, [])

  // ─── 计算结果 ───
  const result = useMemo(() => {
    const P = housePrice
    const priceYen = P * 10000
    const prop = propertyType === 'mansion' ? CONFIG.mansion : CONFIG.house
    const visaDef = CONFIG.visaDefaults[visaType]
    const loanAmountYen = Math.round(priceYen * loanRatio / 100)
    const downPaymentYen = priceYen - loanAmountYen
    const loan = calcLoan(loanAmountYen, interestRate, loanYears)
    const annualRepayment = loan.monthly * 12
    const burdenRate = (annualRepayment / (annualIncome * 10000)) * 100
    const assessedYen = priceYen * 0.6

    // 一次性费用
    const agentFee = Math.round((priceYen * 0.03 + 60000) * 1.1)
    const regTax = Math.round(assessedYen * 0.02)
    let acqTaxRate = 0.03
    if (buildingAge === 'new') acqTaxRate = 0.001
    else if (['5', '10'].includes(buildingAge)) acqTaxRate = 0.005
    else if (['15', '20'].includes(buildingAge)) acqTaxRate = 0.01
    const acqTax = Math.round(assessedYen * acqTaxRate)
    const judicialScrivener = 100000
    const stampDuty = getStampDuty(P)
    const loanFee = Math.round(loanAmountYen * 0.022)
    const guaranteeFee = Math.round(loanAmountYen * 0.01)
    const insurance = 50000
    let repairLump = 0
    if (propertyType === 'mansion') {
      if (buildingAge === '5') repairLump = 200000
      else if (buildingAge === '10') repairLump = 350000
      else if (buildingAge === '15') repairLump = 500000
      else if (buildingAge === '20') repairLump = 600000
      else if (buildingAge === '30') repairLump = 700000
      else if (buildingAge === '40') repairLump = 800000
    }

    const pi = lc.purchase.items
    const purchaseItems: RowItem[] = [
      { label: pi.agentFee.label, value: agentFee, formula: pi.agentFee.formula, note: pi.agentFee.note },
      { label: pi.regTax.label, value: regTax, formula: pi.regTax.formula, note: pi.regTax.note },
      { label: pi.acqTax.label, value: acqTax, formula: pi.acqTax.formulaPrefix + (acqTaxRate * 100).toFixed(1) + '%（軽減後）', note: buildingAge === 'new' ? pi.acqTax.noteNew : pi.acqTax.noteOld },
      { label: pi.judicialScrivener.label, value: judicialScrivener, formula: pi.judicialScrivener.formula, note: pi.judicialScrivener.note },
      { label: pi.stampDuty.label, value: stampDuty, formula: pi.stampDuty.formula, note: pi.stampDuty.note },
      { label: pi.loanFee.label, value: loanFee, formula: pi.loanFee.formula, note: pi.loanFee.note },
      { label: pi.guaranteeFee.label, value: guaranteeFee, formula: pi.guaranteeFee.formula, note: pi.guaranteeFee.note },
      { label: pi.insurance.label, value: insurance, formula: pi.insurance.formula, note: pi.insurance.note },
    ]
    if (repairLump > 0) {
      purchaseItems.push({ label: pi.repairLump.label, value: repairLump, formula: pi.repairLump.formula, note: pi.repairLump.note })
    }
    const totalPurchase = purchaseItems.reduce((s, i) => s + i.value, 0)

    // 每年持有成本
    const fixedAssetTax = Math.round(assessedYen * 0.014)
    const cityPlanTax = Math.round(assessedYen * 0.003)
    const mgmtAnnual = prop.mgmtPerMonth * 12
    const repairAnnual = prop.repairPerMonth * 12
    const fireInsAnnual = 25000
    const quakeInsAnnual = 15000
    const selfRepairAnnual = propertyType === 'house' ? CONFIG.house.selfRepairReservePerMonth * 12 : 0
    const parkingAnnual = propertyType === 'mansion' ? prop.parkingPerMonth * 12 : 0

    const ai = lc.annual.items
    const annualItems: RowItem[] = [
      { label: ai.fixedAssetTax.label, value: fixedAssetTax, formula: ai.fixedAssetTax.formula, note: ai.fixedAssetTax.note },
      { label: ai.cityPlanTax.label, value: cityPlanTax, formula: ai.cityPlanTax.formula, note: ai.cityPlanTax.note },
    ]
    if (propertyType === 'mansion') {
      annualItems.push(
        { label: ai.mgmtFee.label, value: mgmtAnnual, formula: ai.mgmtFee.formula.replace('{man}', (prop.mgmtPerMonth / 10000).toFixed(1)), note: ai.mgmtFee.note },
        { label: ai.repairFee.label, value: repairAnnual, formula: ai.repairFee.formula.replace('{man}', (prop.repairPerMonth / 10000).toFixed(1)), note: ai.repairFee.note },
        { label: ai.parking.label, value: parkingAnnual, formula: ai.parking.formula.replace('{man}', (prop.parkingPerMonth / 10000).toFixed(1)), note: ai.parking.note },
      )
    } else {
      const houseProp = CONFIG.house
      annualItems.push(
        { label: ai.selfRepair.label, value: selfRepairAnnual, formula: ai.selfRepair.formula.replace('{man}', (houseProp.selfRepairReservePerMonth / 10000).toFixed(1)), note: ai.selfRepair.note },
      )
    }
    annualItems.push(
      { label: ai.fireInsurance.label, value: fireInsAnnual, formula: ai.fireInsurance.formula, note: ai.fireInsurance.note },
      { label: ai.quakeInsurance.label, value: quakeInsAnnual, formula: ai.quakeInsurance.formula, note: ai.quakeInsurance.note },
    )
    const totalAnnual = annualItems.reduce((s, i) => s + i.value, 0)

    return {
      priceYen, loanAmountYen, downPaymentYen, loan, annualRepayment, burdenRate,
      purchaseItems, totalPurchase, annualItems, totalAnnual,
      assessedYen, visaDef,
    }
  }, [housePrice, propertyType, visaType, loanRatio, interestRate, loanYears, annualIncome, buildingAge, lc])

  const rateHint = visaType === 'permanent'
    ? lc.interestRate.rateHintPermanent
    : lc.interestRate.rateHintTech

  const { priceYen, loanAmountYen, downPaymentYen, loan, burdenRate,
    purchaseItems, totalPurchase, annualItems, totalAnnual, visaDef } = result

  const lo = lc.loan
  const buildingAgeOptions = lc.buildingAge.options

  return (
    <div className={styles.calculator}>
      <header className={styles.header}>
        <h1>{lc.title}</h1>
        <div className={styles.sub}>{lc.subtitle}</div>
      </header>

      {/* ─── 输入区 ─── */}
      <section className={styles.card}>
        <h2>{lc.formSectionTitle}</h2>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>{lc.housePrice.label} <InfoIcon tip={lc.housePrice.tip} /></label>
            <input type="number" value={housePrice} min={100} step={100}
              onChange={e => setHousePrice(Number(e.target.value) || 0)} />
            <span className={styles.hint}>{lc.housePrice.hint}</span>
          </div>
          <div className={styles.formGroup}>
            <label>{lc.propertyType.label} <InfoIcon tip={lc.propertyType.tip} /></label>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value as PropertyType)}>
              <option value="mansion">{lc.propertyType.mansion}</option>
              <option value="house">{lc.propertyType.house}</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>{lc.visaType.label} <InfoIcon tip={lc.visaType.tip} /></label>
            <select value={visaType} onChange={e => onVisaChange(e.target.value as VisaType)}>
              <option value="permanent">{lc.visaType.permanent}</option>
              <option value="tech">{lc.visaType.tech}</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>{lc.loanRatio.label} <InfoIcon tip={lc.loanRatio.tip} /></label>
            <input type="number" value={loanRatio} min={0} max={100} step={5}
              onChange={e => setLoanRatio(Number(e.target.value) || 0)} />
          </div>
          <div className={styles.formGroup}>
            <label>{lc.interestRate.label} <InfoIcon tip={lc.interestRate.tip} /></label>
            <input type="number" value={interestRate} min={0.1} max={5} step={0.05}
              onChange={e => setInterestRate(Number(e.target.value) || 0)} />
            <span className={styles.hint}>{rateHint}</span>
          </div>
          <div className={styles.formGroup}>
            <label>{lc.loanYears.label} <InfoIcon tip={lc.loanYears.tip} /></label>
            <select value={loanYears} onChange={e => setLoanYears(Number(e.target.value))}>
              {[35, 30, 25, 20, 15].map(y => <option key={y} value={y}>{y}{lc.loanYears.unit}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>{lc.annualIncome.label} <InfoIcon tip={lc.annualIncome.tip} /></label>
            <input type="number" value={annualIncome} min={100} step={10}
              onChange={e => setAnnualIncome(Number(e.target.value) || 0)} />
          </div>
          <div className={styles.formGroup}>
            <label>{lc.buildingAge.label} <InfoIcon tip={lc.buildingAge.tip} /></label>
            <select value={buildingAge} onChange={e => setBuildingAge(e.target.value as BuildingAge)}>
              <option value="new">{buildingAgeOptions.new}</option>
              <option value="5">{buildingAgeOptions.age5}</option>
              <option value="10">{buildingAgeOptions.age10}</option>
              <option value="15">{buildingAgeOptions.age15}</option>
              <option value="20">{buildingAgeOptions.age20}</option>
              <option value="30">{buildingAgeOptions.age30}</option>
              <option value="40">{buildingAgeOptions.age40}</option>
            </select>
          </div>
        </div>
      </section>

      {/* ─── 摘要区 ─── */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryItem}>
          <div className={styles.sLabel}>{lc.summary.housePrice}</div>
          <div className={styles.sValue}>{toMan(priceYen)}</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.sLabel}>{lc.summary.initialCost}</div>
          <div className={`${styles.sValue} ${styles.danger}`}>{toMan(totalPurchase)}</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.sLabel}>{lc.summary.annualCost}</div>
          <div className={`${styles.sValue} ${styles.accent2}`}>{toMan(totalAnnual)}</div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.sLabel}>{lc.summary.monthlyPayment}</div>
          <div className={styles.sValue}>{toMan(Math.round(loan.monthly))}</div>
        </div>
      </div>

      {/* ─── 购房一次性费用 ─── */}
      <section className={styles.card}>
        <h2>{lc.purchase.title}</h2>
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>{lc.purchase.thItem}</th><th className={styles.num}>{lc.purchase.thAmount}</th><th>{lc.purchase.thFormula}</th><th>{lc.purchase.thNote}</th>
            </tr>
          </thead>
          <tbody>
            {purchaseItems.map((item, i) => (
              <tr key={i}>
                <td>{item.label}</td>
                <td className={styles.num}>{fmtYen(item.value)}</td>
                <td className={styles.formulaCol}>{item.formula}</td>
                <td className={styles.noteCol}>{item.note}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td>{lc.purchase.totalLabel}</td>
              <td className={styles.num}>{fmtYen(totalPurchase)}</td>
              <td colSpan={2}>{lc.purchase.totalDescPrefix} {(totalPurchase / priceYen * 100).toFixed(1)}%</td>
            </tr>
            {downPaymentYen > 0 && (
              <tr>
                <td style={{ fontWeight: 700 }}>{lc.purchase.downPaymentLabel}</td>
                <td className={styles.num} style={{ color: 'var(--danger)' }}>{fmtYen(downPaymentYen)}</td>
                <td colSpan={2}>{lc.purchase.downPaymentNote.replace('{loanRatio}', String(loanRatio)).replace('{downPaymentPct}', String(100 - loanRatio))}</td>
              </tr>
            )}
            <tr style={{ background: '#fff3e0' }}>
              <td style={{ fontWeight: 700 }}>{lc.purchase.totalCashLabel}</td>
              <td className={styles.num} style={{ fontWeight: 700, color: 'var(--danger)', fontSize: '1.1em' }}>
                {fmtYen(totalPurchase + downPaymentYen)}
              </td>
              <td colSpan={2}>{lc.purchase.totalCashDesc}</td>
            </tr>
          </tbody>
        </table>
        <Accordion title={lc.purchase.accordionTitle}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{lc.purchase.accordionContent}</pre>
        </Accordion>
      </section>

      {/* ─── 每年持有成本 ─── */}
      <section className={styles.card}>
        <h2>{lc.annual.title}</h2>
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>{lc.annual.thItem}</th><th className={styles.num}>{lc.annual.thAmount}</th><th>{lc.annual.thFormula}</th><th>{lc.annual.thNote}</th>
            </tr>
          </thead>
          <tbody>
            {annualItems.map((item, i) => (
              <tr key={i}>
                <td>{item.label}</td>
                <td className={styles.num}>{fmtYen(item.value)}</td>
                <td className={styles.formulaCol}>{item.formula}</td>
                <td className={styles.noteCol}>{item.note}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td>{lc.annual.totalLabel}</td>
              <td className={styles.num}>{fmtYen(totalAnnual)}</td>
              <td colSpan={2}>{lc.annual.totalDescPrefix} {(totalAnnual / priceYen * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
        <Accordion title={lc.annual.accordionTitle}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{lc.annual.accordionContent}</pre>
        </Accordion>
      </section>

      {/* ─── 贷款还贷 ─── */}
      <section className={styles.card}>
        <h2>{lo.title}</h2>
        <div className={styles.loanSummary}>
          <div className={styles.loanItem}>
            <div className={styles.loanVal}>{toMan(loanAmountYen)}</div>
            <div className={styles.loanLbl}>{lo.summaryLabels.loanAmount}</div>
          </div>
          <div className={styles.loanItem}>
            <div className={styles.loanVal}>{toMan(downPaymentYen)}</div>
            <div className={styles.loanLbl}>{lo.summaryLabels.downPayment}</div>
          </div>
          <div className={styles.loanItem}>
            <div className={styles.loanVal}>{Math.round(loan.monthly).toLocaleString()}円</div>
            <div className={styles.loanLbl}>{lo.summaryLabels.monthlyPayment}</div>
          </div>
          <div className={styles.loanItem}>
            <div className={styles.loanVal}>{toMan(Math.round(loan.totalInterest))}</div>
            <div className={styles.loanLbl}>{lo.summaryLabels.totalInterest}（{loanYears}{lc.loanYears.unit}）</div>
          </div>
          <div className={styles.loanItem}>
            <div className={styles.loanVal} style={{
              color: burdenRate > 35 ? 'var(--danger)' : burdenRate > 30 ? '#f39c12' : '#27ae60'
            }}>
              {burdenRate.toFixed(1)}%
            </div>
            <div className={styles.loanLbl}>{lo.summaryLabels.burdenRate}</div>
          </div>
          <div className={styles.loanItem}>
            <div className={styles.loanVal}>{toMan(totalPurchase + downPaymentYen)}</div>
            <div className={styles.loanLbl}>{lo.summaryLabels.initialCash}</div>
          </div>
        </div>

        <table className={styles.resultTable}>
          <thead>
            <tr><th>{lo.tableHeaders.item}</th><th className={styles.num}>{lo.tableHeaders.amount}</th><th>{lo.tableHeaders.desc}</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{lo.rows.loanAmount.label}</td><td className={styles.num}>{fmtYen(loanAmountYen)}</td>
              <td>{lo.rows.loanAmount.desc.replace('{priceMan}', toMan(priceYen)).replace('{ratio}', String(loanRatio))}</td>
            </tr>
            <tr>
              <td>{lo.rows.downPayment.label}</td><td className={styles.num}>{fmtYen(downPaymentYen)}</td>
              <td>{lo.rows.downPayment.desc}</td>
            </tr>
            <tr>
              <td>{lo.rows.interestRate.label}</td><td className={styles.num}>{interestRate.toFixed(2)}%</td>
              <td>{visaType === 'permanent' ? lo.rows.interestRate.descPermanent : lo.rows.interestRate.descTech}</td>
            </tr>
            <tr>
              <td>{lo.rows.loanYears.label}</td><td className={styles.num}>{loanYears}{lc.loanYears.unit}（{loanYears * 12}回）</td><td></td>
            </tr>
            <tr style={{ fontWeight: 700 }}>
              <td>{lo.rows.monthlyPayment.label}</td><td className={styles.num} style={{ fontSize: '1.1em' }}>{Math.round(loan.monthly).toLocaleString()}円</td><td>{lo.rows.monthlyPayment.desc}</td>
            </tr>
            <tr>
              <td>{lo.rows.annualPayment.label}</td><td className={styles.num}>{fmtYen(Math.round(result.annualRepayment))}</td><td>{lo.rows.annualPayment.desc}</td>
            </tr>
            <tr>
              <td>{lo.rows.totalPayment.label}</td><td className={styles.num}>{fmtYen(Math.round(loan.totalPayment))}</td><td>{lo.rows.totalPayment.desc}</td>
            </tr>
            <tr>
              <td>{lo.rows.totalInterest.label}</td><td className={styles.num} style={{ color: 'var(--danger)' }}>{fmtYen(Math.round(loan.totalInterest))}</td>
              <td>{lo.rows.totalInterest.descPattern.replace('{pct}', (loan.totalInterest / loan.totalPayment * 100).toFixed(1))}</td>
            </tr>
            <tr style={{
              background: burdenRate > 35 ? '#ffebee' : burdenRate > 30 ? '#fff8e1' : '#e8f5e9'
            }}>
              <td><strong>{lo.rows.burdenRate.label}</strong></td>
              <td className={styles.num} style={{ fontWeight: 700, fontSize: '1.1em' }}>{burdenRate.toFixed(1)}%</td>
              <td>
                {burdenRate > 35
                  ? <span className={styles.warn}>{lo.burdenMessages.severe}</span>
                  : burdenRate > 30
                    ? <span className={styles.warn}>{lo.burdenMessages.warning}</span>
                    : <span className={styles.okTag}>{lo.burdenMessages.safe}</span>}
              </td>
            </tr>
            <tr style={{ fontWeight: 700 }}>
              <td>{lo.rows.initialCash.label}</td>
              <td className={styles.num} style={{ color: 'var(--danger)', fontSize: '1.1em' }}>{fmtYen(totalPurchase + downPaymentYen)}</td>
              <td>{lo.rows.initialCash.desc}</td>
            </tr>
          </tbody>
        </table>

        <Accordion title={lo.accordionTitle}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{lo.accordionContent}</pre>
        </Accordion>
      </section>
    </div>
  )
}
