import { NextRequest, NextResponse } from 'next/server'

// ── 税後工資計算 API ──
// POST /api/v1/salary
// Body: { income: number, over40?: boolean }

function calcSalary(income: number, over40: boolean) {
  // 給与所得控除
  let deduction: number
  if (income <= 1625000) deduction = 550000
  else if (income <= 1800000) deduction = income * 0.4 - 100000
  else if (income <= 3600000) deduction = income * 0.3 + 80000
  else if (income <= 6600000) deduction = income * 0.2 + 440000
  else if (income <= 85000000) deduction = income * 0.1 + 1100000
  else deduction = 1950000

  const employmentIncome = Math.max(0, income - deduction)

  // 社会保険料（概算）
  const socialInsurance = Math.round(income * (over40 ? 0.15 : 0.145))

  // 基礎控除
  const basicDeduction = 480000

  // 課税所得
  const taxableIncome = Math.max(0, employmentIncome - socialInsurance - basicDeduction)

  // 所得税（7段階 + 復興2.1%）
  let incomeTax: number
  if (taxableIncome <= 1950000) incomeTax = taxableIncome * 0.05
  else if (taxableIncome <= 3300000) incomeTax = taxableIncome * 0.1 - 97500
  else if (taxableIncome <= 6950000) incomeTax = taxableIncome * 0.2 - 427500
  else if (taxableIncome <= 9000000) incomeTax = taxableIncome * 0.23 - 636000
  else if (taxableIncome <= 18000000) incomeTax = taxableIncome * 0.33 - 1536000
  else if (taxableIncome <= 40000000) incomeTax = taxableIncome * 0.40 - 2796000
  else incomeTax = taxableIncome * 0.45 - 4796000
  incomeTax = Math.round(incomeTax * 1.021)

  // 住民税
  const residentTax = Math.round(taxableIncome * 0.1) + 5000

  const totalDeduction = socialInsurance + incomeTax + residentTax
  const takeHome = income - totalDeduction

  return {
    income,
    employmentIncome,
    deduction,
    socialInsurance,
    basicDeduction,
    taxableIncome,
    incomeTax,
    residentTax,
    totalDeduction,
    takeHome,
    monthlyTakeHome: Math.round(takeHome / 12),
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { income, over40 = false } = body

    if (!income || typeof income !== 'number' || income < 1) {
      return NextResponse.json({ error: 'income is required and must be a positive number' }, { status: 400 })
    }

    const result = calcSalary(income, over40)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
