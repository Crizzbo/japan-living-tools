import { NextRequest, NextResponse } from 'next/server'

// ── 購房費用計算 API ──
// POST /api/v1/house
// Body: { housePrice(万円), loanRatio(%), interestRate(%), loanYears, annualIncome(万円), propertyType:'mansion'|'house', visaType:'permanent'|'tech', buildingAge }

function calcLoan(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) return { monthly: principal / n, totalPayment: principal, totalInterest: 0 }
  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
  const totalPayment = monthly * n
  return { monthly, totalPayment, totalInterest: totalPayment - principal }
}

function fmtYen(val: number): string {
  return '¥' + Math.round(val).toLocaleString()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      housePrice = 5000,      // 万円
      loanRatio = 70,         // %
      interestRate = 1.5,     // %
      loanYears = 35,
      annualIncome = 500,     // 万円
      propertyType = 'mansion',
      visaType = 'permanent',
      buildingAge = 'new',
    } = body

    const priceYen = housePrice * 10000
    const loanAmountYen = priceYen * (loanRatio / 100)
    const downPaymentYen = priceYen - loanAmountYen
    const loan = calcLoan(loanAmountYen, interestRate, loanYears)

    // 購入時費用
    const stampDuty = propertyType === 'new' ? 600 : 600 // 簡易
    const brokerage = propertyType === 'house' ? 0 : priceYen * 0.03 + 60000 // 中介手数料（新築不要、中古マンション3%+6万）
    const acquisitionTax = priceYen * 0.03 // 簡易3%
    const registrationTax = priceYen * 0.003 // 簡易
    const judicialScrivener = 200000
    const totalPurchase = stampDuty + brokerage + acquisitionTax + registrationTax + judicialScrivener

    // 年間持有コスト
    const propertyTax = priceYen * 0.014 * 0.7
    const cityPlanningTax = priceYen * 0.003 * 0.7
    const maintenance = priceYen * 0.005
    const fireInsurance = 150000
    const totalAnnual = propertyTax + cityPlanningTax + maintenance + fireInsurance

    // 返済負担率
    const annualRepayment = loan.monthly * 12
    const burdenRate = (annualRepayment / (annualIncome * 10000)) * 100

    return NextResponse.json({
      purchase: {
        items: [
          { label: '印紙税', value: fmtYen(stampDuty) },
          { label: '仲介手数料', value: fmtYen(brokerage) },
          { label: '不動産取得税', value: fmtYen(acquisitionTax) },
          { label: '登録免許税', value: fmtYen(registrationTax) },
          { label: '司法書士報酬', value: fmtYen(judicialScrivener) },
        ],
        total: fmtYen(totalPurchase),
        rate: ((totalPurchase / priceYen) * 100).toFixed(1) + '%',
      },
      annual: {
        items: [
          { label: '固定資産税', value: fmtYen(propertyTax) },
          { label: '都市計画税', value: fmtYen(cityPlanningTax) },
          { label: '修繕積立金（概算）', value: fmtYen(maintenance) },
          { label: '火災保険料（概算）', value: fmtYen(fireInsurance) },
        ],
        total: fmtYen(totalAnnual),
        rate: ((totalAnnual / priceYen) * 100).toFixed(1) + '%',
      },
      loan: {
        amount: fmtYen(loanAmountYen),
        downPayment: fmtYen(downPaymentYen),
        monthly: fmtYen(Math.round(loan.monthly)),
        totalPayment: fmtYen(Math.round(loan.totalPayment)),
        totalInterest: fmtYen(Math.round(loan.totalInterest)),
        burdenRate: burdenRate.toFixed(1) + '%',
        burdenLevel: burdenRate > 35 ? 'severe' : burdenRate > 30 ? 'warning' : 'safe',
      },
      totalInitialCash: fmtYen(totalPurchase + downPaymentYen),
    })
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
