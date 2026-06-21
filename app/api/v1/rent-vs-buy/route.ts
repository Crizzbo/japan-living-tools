import { NextRequest, NextResponse } from 'next/server'

// ── 買房vs租房 計算 API ──
// POST /api/v1/rent-vs-buy
// Body: { price, downPaymentRate, interestRate, loanYears, propertyTaxRate, maintenanceRate, acquisitionRate,
//          monthlyRent, rentIncreaseRate, renewalFeeMonths, compareYears, appreciationRate? }

function calcLoan(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) return { monthly: principal / n, totalPayment: principal, totalInterest: 0 }
  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
  const totalPayment = monthly * n
  return { monthly, totalPayment, totalInterest: totalPayment - principal }
}

function fmtMan(val: number): number {
  return Math.round(val / 10000)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      price = 5000,         // 万円
      downPaymentRate = 10, // %
      interestRate = 1.5,   // %
      loanYears = 35,
      propertyTaxRate = 1.4, // %
      maintenanceRate = 0.5, // %
      acquisitionRate = 5,   // %
      monthlyRent = 10,      // 万円
      rentIncreaseRate = 1,  // %
      renewalFeeMonths = 1,  // 月分
      compareYears = 35,
      appreciationRate = 2,  // %
    } = body

    const priceYen = price * 10000
    const downPaymentYen = priceYen * (downPaymentRate / 100)
    const loanAmountYen = priceYen - downPaymentYen
    const loan = calcLoan(loanAmountYen, interestRate, loanYears)
    const acquisitionTax = priceYen * (acquisitionRate / 100)
    const annualPropertyTax = priceYen * (propertyTaxRate / 100) * 0.7 // 評価額7割
    const annualMaintenance = priceYen * (maintenanceRate / 100)

    // 年ごとの累積コスト
    const data = []
    for (let y = 5; y <= compareYears; y += 5) {
      // 買う：初期費用 + ローン返済 + 固都税 + 修繕
      const loanPayments = y <= loanYears ? Math.round(loan.monthly) * 12 * y : Math.round(loan.monthly) * 12 * loanYears
      const buyCumulative = acquisitionTax + downPaymentYen + loanPayments + (annualPropertyTax + annualMaintenance) * y
      // 資産価値（簡易：物件価格 × (1+appreciationRate)^y）
      const assetValue = priceYen * Math.pow(1 + appreciationRate / 100, y)
      const buyEquity = assetValue - (y < loanYears ? loanAmountYen * (1 - y / loanYears) : 0)
      const buyNet = buyEquity - buyCumulative

      // 借りる：家賃（毎年rentIncreaseRate%上昇）+ 更新料
      let rentCumulative = 0
      for (let ry = 1; ry <= y; ry++) {
        const yearRent = monthlyRent * 10000 * 12 * Math.pow(1 + rentIncreaseRate / 100, ry - 1)
        rentCumulative += yearRent
        if (ry % 2 === 0) rentCumulative += monthlyRent * 10000 * renewalFeeMonths // 2年ごと更新料
      }

      data.push({
        years: y,
        buyCumulative: fmtMan(buyCumulative),
        buyEquity: fmtMan(Math.max(0, buyEquity)),
        buyNet: fmtMan(buyNet),
        rentCumulative: fmtMan(rentCumulative),
        netDiff: fmtMan(buyNet - rentCumulative / 10000),
      })
    }

    const final = data[data.length - 1]
    return NextResponse.json({ data, final, loan: { monthly: Math.round(loan.monthly), totalPayment: fmtMan(loan.totalPayment), totalInterest: fmtMan(loan.totalInterest) } })
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
