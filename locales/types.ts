// ── i18n 类型定义 ──

export interface LocaleDict {
  // Header
  header: {
    logo: string
    nav: Record<string, string> // key → label
    articles: string
  }
  // Footer
  footer: {
    about: { title: string; desc: string }
    tools: { title: string; nav: Record<string, string> }
    articles: { title: string; nav: Record<string, string> }
    disclaimer: { title: string; desc: string }
    bottom: string
  }
  // Home
  home: {
    hero: { badge: string; title: string; desc: string; cta1: string; cta2: string }
    tools: { title: string; desc: string; cards: Record<string, { title: string; desc: string; cta: string }> }
    articles: { title: string; desc: string; readMore: string; items: Record<string, { title: string; desc: string; date: string; tag: string }> }
  }
  // Articles
  articles: { title: string; desc: string; back: string }
  // Common
  common: {
    langSwitch: string
    langZh: string
    langJa: string
    langEn: string
    notFound: { title: string; desc: string; back: string }
    toolsTitle: string
    toolsDesc: string
  }
  // Tool pages
  tools: Record<string, { title: string; desc: string }>

  // ─── Calculator i18n ───
  houseCalculator: HouseCalculatorDict
  hsPointCalculator: HsPointCalculatorDict
  salaryCalculator: SalaryCalculatorDict
  rentVsBuy: RentVsBuyDict
  residenceTax: ResidenceTaxDict
  furusato: FurusatoDict
  cityCost: CityCostDict
}

// ─── 购房计算器 (House/Loan Calculator) ───

export interface HouseCalculatorDict {
  title: string
  subtitle: string
  formSectionTitle: string

  // Form labels
  housePrice: { label: string; hint: string; tip: string }
  propertyType: { label: string; tip: string; mansion: string; house: string }
  visaType: { label: string; tip: string; permanent: string; tech: string }
  loanRatio: { label: string; tip: string }
  interestRate: { label: string; tip: string; rateHintPermanent: string; rateHintTech: string }
  loanYears: { label: string; tip: string; unit: string }
  annualIncome: { label: string; tip: string }
  buildingAge: {
    label: string; tip: string
    options: { new: string; age5: string; age10: string; age15: string; age20: string; age30: string; age40: string }
  }

  // Summary cards
  summary: {
    housePrice: string; initialCost: string; annualCost: string; monthlyPayment: string
  }

  // Purchase costs section
  purchase: {
    title: string
    thItem: string; thAmount: string; thFormula: string; thNote: string
    totalLabel: string; totalDescPrefix: string
    downPaymentLabel: string; downPaymentNote: string
    totalCashLabel: string; totalCashDesc: string
    accordionTitle: string; accordionContent: string
    items: {
      agentFee: { label: string; formula: string; note: string }
      regTax: { label: string; formula: string; note: string }
      acqTax: { label: string; formulaPrefix: string; noteNew: string; noteOld: string }
      judicialScrivener: { label: string; formula: string; note: string }
      stampDuty: { label: string; formula: string; note: string }
      loanFee: { label: string; formula: string; note: string }
      guaranteeFee: { label: string; formula: string; note: string }
      insurance: { label: string; formula: string; note: string }
      repairLump: { label: string; formula: string; note: string }
    }
  }

  // Annual costs section
  annual: {
    title: string
    thItem: string; thAmount: string; thFormula: string; thNote: string
    totalLabel: string; totalDescPrefix: string
    accordionTitle: string; accordionContent: string
    items: {
      fixedAssetTax: { label: string; formula: string; note: string }
      cityPlanTax: { label: string; formula: string; note: string }
      mgmtFee: { label: string; formula: string; note: string }
      repairFee: { label: string; formula: string; note: string }
      parking: { label: string; formula: string; note: string }
      selfRepair: { label: string; formula: string; note: string }
      fireInsurance: { label: string; formula: string; note: string }
      quakeInsurance: { label: string; formula: string; note: string }
    }
  }

  // Loan section
  loan: {
    title: string
    summaryLabels: {
      loanAmount: string; downPayment: string; monthlyPayment: string
      totalInterest: string; burdenRate: string; initialCash: string
    }
    tableHeaders: { item: string; amount: string; desc: string }
    rows: {
      loanAmount: { label: string; desc: string }
      downPayment: { label: string; desc: string }
      interestRate: { label: string; descPermanent: string; descTech: string }
      loanYears: { label: string }
      monthlyPayment: { label: string; desc: string }
      annualPayment: { label: string; desc: string }
      totalPayment: { label: string; desc: string }
      totalInterest: { label: string; descPattern: string }
      burdenRate: { label: string }
      initialCash: { label: string; desc: string }
    }
    burdenMessages: { severe: string; warning: string; safe: string }
    accordionTitle: string; accordionContent: string
  }
}

// ─── 高度人材积分计算器 ───

export interface HsPointCalculatorDict {
  title: string
  description: string
  descriptionNote: string

  // Form labels
  age: { label: string; note: string }
  salary: { label: string; unit: string }
  education: { label: string }
  experience: { label: string }
  japanese: { label: string }
  bonus: { label: string }

  // Options
  ageOptions: { under29: string; age30to34: string; age35to39: string; over40: string }
  ageBracketLabels: { under29: string; age30to34: string; age35to39: string; over40: string }
  educationOptions: { phd: string; mba: string; masters: string; bachelors: string; college: string; none: string }
  experienceOptions: { y15: string; y10: string; y7: string; y5: string; y3: string; less3: string }
  japaneseOptions: { n1: string; n2: string; none: string }
  bonusOptions: {
    jpGrad: string; jpUniv: string; topUniv: string; jpLangBonus: string
    qualification: string; research: string; patent: string
    executive: string; govProject: string; investment: string
  }

  // Result
  resultYourScore: string
  resultUnit: string
  result80: string
  result70: string
  resultUnder70: string

  // Breakdown
  breakdownTitle: string
  breakdownTotal: string
  breakdownLabels: { age: string; salary: string; education: string; experience: string; japanese: string }
  salaryDetail: string  // "{salary}万円（{ageBracket}基準）"

  // Warning
  experienceWarning: string  // template: {ageLabel} and {expLabel}
}

// ─── 税后工资计算器 ───

export interface SalaryCalculatorDict {
  title: string
  description: string
  incomeLabel: string
  incomeUnit: string
  over40Label: string

  // Result
  monthlyTakeHome: string
  annualTakeHome: string
  takeHomeRate: string  // "手取率 {rate}%"

  // Table headers
  thItem: string; thAnnual: string; thMonthly: string

  // Table rows
  grossIncome: string
  employmentDeduction: string
  socialInsurance: string
  basicDeduction: string
  incomeTax: string
  residentTax: string
  takeHome: string

  // Note
  note: string
}

// ─── 买房vs租房对比 ───

export interface RentVsBuyDict {
  title: string
  description: string

  // Sections
  buySectionTitle: string
  rentSectionTitle: string

  // Buy fields
  buyFields: {
    price: string; downPayment: string; interestRate: string
    loanYears: string; propertyTax: string; maintenance: string; acquisition: string
    monthlyPayment: string  // "月々返済額: ¥{amount}"
  }

  // Rent fields
  rentFields: {
    monthlyRent: string; increaseRate: string; renewalFee: string
    compareYears: string
  }

  // Units
  units: { manYen: string; percent: string; years: string; months: string }

  // Comparison
  comparisonTitle: string
  chartLegendBuy: string; chartLegendRent: string

  // Table headers
  thYears: string; thBuyTotal: string; thBuyEquity: string
  thBuyNet: string; thRentTotal: string; thDiff: string

  // Verdict
  verdictBuyBetter: string   // "{years}年後、購入の方が約{amount}万円お得"
  verdictRentBetter: string  // "{years}年後、賃貸の支出が約{amount}万円少ない"
  verdictBuyReason: string
  verdictRentReason: string
  verdictDisclaimer: string
}

export type Lang = 'zh' | 'ja' | 'en'

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'zh', label: '中文', native: '中文' },
  { code: 'ja', label: '日本語', native: '日本語' },
  { code: 'en', label: 'English', native: 'English' },
]

// ─── 住民税计算器 ───

export interface ResidenceTaxDict {
  title: string; description: string
  formTitle: string; annualIncome: string; manYen: string
  ageGroup: string; under40: string; over40: string
  dependents: string; personUnit: string
  resultTitle: string; exemptMessage: string
  annualLabel: string; monthlyLabel: string; taxRate: string
  colItem: string; colAmount: string
  rowIncome: string; rowDeduction: string; rowEmploymentIncome: string
  rowSocialInsurance: string; rowBasicDeduction: string; rowDependentDeduction: string
  rowTaxableIncome: string; rowIncomePortion: string; rowPerCapita: string
  rowTotal: string
  noteTitle: string; noteContent: string
}

// ─── 故乡税模拟器 ───

export interface FurusatoDict {
  title: string; description: string
  formTitle: string; annualIncome: string; manYen: string
  ageGroup: string; under40: string; over40: string
  dependents: string; personUnit: string
  limitLabel: string; selfPayNote: string
  simTitle: string; donationAmount: string; overLimitWarning: string
  totalDeduction: string; selfPayLabel: string
  rowDonation: string; rowIncomeDeduction: string; rowResidenceTaxDeduction: string
  rowTotalDeduction: string
  returnRatePrefix: string; returnRateSuffix: string
  noteTitle: string; noteContent: string
}

// ─── 都市生活费计算器 ───

export interface CityCostDict {
  title: string; description: string
  formTitle: string; cityLabel: string; roomLabel: string; lifestyleLabel: string
  resultSuffix: string; monthlyTotal: string; annualTotal: string
  colItem: string; colMonthly: string; colRatio: string
  rowRent: string; rowFood: string; rowUtility: string; rowInternet: string
  rowPhone: string; rowTransport: string; rowEntertainment: string
  rowMisc: string; rowInsurance: string; rowTotal: string
  comparisonTitle: string
  noteTitle: string; noteContent: string
}
