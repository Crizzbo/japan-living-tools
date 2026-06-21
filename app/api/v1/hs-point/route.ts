import { NextRequest, NextResponse } from 'next/server'

// ── 高度人材ポイント計算 API ──
// POST /api/v1/hs-point
// Body: { age: 0-3, salary: number(万円), education: string, experience: string, japanese: string, bonuses?: string[] }

const educationPoints: Record<string, number> = { phd: 30, mba: 25, masters: 20, bachelors: 10, college: 5, none: 0 }
const experiencePoints: Record<string, number> = { y15: 25, y10: 20, y7: 15, y5: 10, y3: 5, less3: 0 }
const japanesePoints: Record<string, number> = { n1: 15, n2: 10, none: 0 }

const salaryTable: { min: number; max: number; points: [number, number, number, number] }[] = [
  { min:   0, max:  399, points: [ 0,  0,  0,  0] },
  { min: 400, max:  499, points: [10,  5,  0,  0] },
  { min: 500, max:  599, points: [15, 10,  5,  0] },
  { min: 600, max:  699, points: [20, 15, 10,  5] },
  { min: 700, max:  799, points: [25, 20, 15, 10] },
  { min: 800, max:  899, points: [30, 25, 20, 15] },
  { min: 900, max:  999, points: [35, 30, 25, 20] },
  { min:1000, max: 1499, points: [40, 35, 30, 25] },
  { min:1500, max: 1999, points: [45, 40, 35, 30] },
  { min:2000, max: 2499, points: [50, 45, 40, 35] },
  { min:2500, max: 2999, points: [55, 50, 45, 40] },
  { min:3000, max: 99999, points: [55, 55, 55, 55] },
]

const agePoints = [15, 10, 5, 0] // under29, 30-34, 35-39, 40+

const bonusPoints: Record<string, number> = {
  research: 5, patent: 5, seedFunding: 5, overseas: 5,
  stem: 5, topUniversity: 10, japaneseTraining: 5,
  investment: 5, certified: 5, smeSupport: 5,
}

function getSalaryPoints(salary: number, ageBracket: number): number {
  for (const row of salaryTable) {
    if (salary >= row.min && salary <= row.max) return row.points[ageBracket]
  }
  return 0
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { age = 0, salary = 0, education = 'none', experience = 'less3', japanese = 'none', bonuses = [] } = body

    if (typeof age !== 'number' || age < 0 || age > 3) {
      return NextResponse.json({ error: 'age must be 0-3' }, { status: 400 })
    }

    const edu = educationPoints[education] ?? 0
    const exp = experiencePoints[experience] ?? 0
    const jpn = japanesePoints[japanese] ?? 0
    const sal = getSalaryPoints(salary, age)
    const ageP = agePoints[age]
    const bonusTotal = (bonuses as string[]).reduce((sum, b) => sum + (bonusPoints[b] ?? 0), 0)

    const total = ageP + sal + edu + exp + jpn + bonusTotal

    return NextResponse.json({
      breakdown: { age: ageP, salary: sal, education: edu, experience: exp, japanese: jpn, bonuses: bonusTotal },
      total,
      eligible70: total >= 70,
      eligible80: total >= 80,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
