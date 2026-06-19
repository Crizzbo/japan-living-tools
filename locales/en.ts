import type { LocaleDict } from './types'

const en: LocaleDict = {
  header: {
    logo: '🗾 Japan Living Tools',
    articles: '📝 Articles',
    nav: {
      home: 'Home',
      houseCalculator: 'Purchase Cost',
      hsPointCalculator: 'HSFP Score',
      salaryCalculator: 'Take-home Pay',
      rentVsBuy: 'Rent vs Buy',
      articles: 'Articles',
    },
  },
  footer: {
    about: {
      title: '🗾 Japan Living Tools',
      desc: 'Practical online tools for life in Japan. Home purchase costs, tax estimates, visa points — all in one place.',
    },
    tools: {
      title: '🛠️ Calculators',
      nav: {
        houseCalculator: 'Home Purchase Cost',
        hsPointCalculator: 'HSFP Score',
        salaryCalculator: 'Take-home Pay',
        rentVsBuy: 'Rent vs Buy',
      },
    },
    articles: {
      title: '📝 Articles',
      nav: {
        costOfLiving: 'Cost of Living',
        homeBuying: 'Home Buying Guide',
        salary: 'Japan Salaries',
        visa: 'Japan Visas',
      },
    },
    disclaimer: {
      title: 'ℹ️ Disclaimer',
      desc: 'Content is for reference only. Actual costs vary by individual circumstances. Calculations do not constitute investment or purchase advice.',
    },
    bottom: '© {year} Japan Living Tools. Built with Next.js · Deployed on Cloudflare Pages.',
  },
  home: {
    hero: {
      badge: '🇯🇵 Tools for Life in Japan',
      title: 'Simplify Your Life in Japan',
      desc: 'Home purchase costs, visa points, tax calculations — all the numbers you need for life in Japan, in one place.',
      cta1: 'Try Tools',
      cta2: 'Read Articles →',
    },
    tools: {
      title: '🧮 Core Tools',
      desc: 'Precise calculations for informed decisions',
      cards: {
        houseCalculator: {
          title: '🏠 Home Purchase Cost',
          desc: 'Calculate all costs of buying a home in Japan — agent fees, taxes, loan interest, property tax.',
          cta: 'Calculate →',
        },
        hsPointCalculator: {
          title: '📊 HSFP Points',
          desc: 'Education, income, age, Japanese ability — comprehensive evaluation for the Highly Skilled Professional visa.',
          cta: 'Calculate Points →',
        },
        salaryCalculator: {
          title: '💰 Take-home Pay',
          desc: 'Based on the latest FY2025 tax rates. Precisely calculate net pay, income tax, and residence tax.',
          cta: 'Calculate Salary →',
        },
        rentVsBuy: {
          title: '⚖️ Rent vs Buy',
          desc: 'Compare cumulative costs over 5–35 years. Make your housing decision with data.',
          cta: 'Compare →',
        },
      },
    },
    articles: {
      title: '📝 Latest Articles',
      desc: 'Practical guides on living in Japan — from visas to home buying, from salaries to cost of living.',
      readMore: 'Read More →',
      items: {
        costOfLiving: { title: '2025 Japan Cost of Living Guide', desc: 'Groceries, utilities, dining out, transport — how much does a day really cost?', date: '2025-06-15', tag: 'Living' },
        homeBuying: { title: 'Complete Guide to Buying a Home in Japan', desc: 'From property hunting to getting the keys — a full walkthrough of costs, loans, and taxes.', date: '2025-06-12', tag: 'Real Estate' },
        salary: { title: '2025 Japan Salary Guide', desc: 'Average salaries across IT, manufacturing, services and more — gross vs take-home pay.', date: '2025-06-08', tag: 'Career' },
        visa: { title: 'Japan Visa Complete Guide', desc: 'From student to work to permanent residency — all visa types, requirements, and procedures.', date: '2025-06-01', tag: 'Visa' },
        residenceTax: { title: 'Japan Residence Tax Guide: Calculation, Payment & Savings', desc: 'How residence tax works, income-based + flat-rate portions, payment schedule, special vs ordinary collection, and deductible tax-saving strategies.', date: '2025-06-18', tag: 'Tax' },
      },
    },
  },
  common: {
    langSwitch: 'Language',
    langZh: '中文',
    langJa: '日本語',
    langEn: 'English',
    notFound: {
      title: '404 — Page Not Found',
      desc: 'The page you are looking for does not exist or has been moved.',
      back: 'Back to Home',
    },
    toolsTitle: 'All Tools',
    toolsDesc: 'Online calculators for life in Japan.',
  },
  articles: {
    title: '📝 Articles',
    desc: 'Practical guides and latest information for life in Japan.',
    back: '← Back to Articles',
  },
  tools: {
    houseCalculator: { title: 'Home Purchase Cost Calculator', desc: 'Detailed breakdown of all costs when buying a home in Japan.' },
    hsPointCalculator: { title: 'HSFP Points Calculator', desc: 'Based on the Immigration Services Agency official points system.' },
    salaryCalculator: { title: 'Take-home Pay Calculator', desc: 'Accurate net pay calculation using FY2025 tax rates.' },
    rentVsBuy: { title: 'Rent vs Buy Comparison', desc: 'Data-driven housing decision tool.' },
  },

  // ─── Home Purchase Cost Calculator ───
  houseCalculator: {
    title: '🏠 Japan Home Purchase Cost Calculator',
    subtitle: 'One-time Purchase Costs · Annual Ownership Costs · Mortgage Repayment',
    formSectionTitle: '📝 Basic Info',

    housePrice: { label: '💰 Property Price (¥10,000)', hint: 'e.g. 3000 = ¥30,000,000', tip: 'Base value for all calculations. Agent fees, taxes, loan amount, etc. are all derived from this price.' },
    propertyType: { label: '🏷️ Property Type', tip: 'Condo → management fee + repair fund + parking  /  House → self-repair reserve only, no fixed mgmt fee', mansion: 'Condo', house: 'Detached House' },
    visaType: { label: '🛂 Visa Type', tip: 'Auto-switches interest rate and loan ratio defaults. Permanent Resident → 0.5% rate·90% loan  /  Work Visa → 1.0% rate·70% loan', permanent: 'Permanent Resident', tech: 'Engineer/Humanities/Intl Services' },
    loanRatio: { label: '🏦 Desired Loan Ratio (%)', tip: 'Loan amount = property price × this ratio, remainder is down payment. PR can go up to 100%, work visa typically ≤70%' },
    interestRate: { label: '📈 Reference Interest Rate (%)', tip: 'Directly impacts monthly payment, total interest, and debt burden ratio', rateHintPermanent: 'PR: approx 0.3–0.8%', rateHintTech: 'Work visa: approx 0.8–2.0%' },
    loanYears: { label: '📅 Loan Term', tip: 'Longer term → lower monthly payment but higher total interest', unit: 'years' },
    annualIncome: { label: '💵 Annual Income (¥10,000)', tip: 'Debt burden ratio = annual repayment ÷ annual income. Banks typically require ≤30%' },
    buildingAge: {
      label: '🏗️ Building Age', tip: 'Affects real estate acquisition tax reduction and repair fund settlement amount',
      options: { new: 'New', age5: '5 years', age10: '10 years', age15: '15 years', age20: '20 years', age30: '30 years', age40: '40+ years' },
    },

    summary: { housePrice: '💰 Property Price', initialCost: '🔑 Initial Cost', annualCost: '📅 Annual Cost', monthlyPayment: '🏦 Monthly Payment' },

    purchase: {
      title: '🔑 One-time Purchase Cost Breakdown',
      thItem: 'Item', thAmount: 'Amount', thFormula: 'Formula', thNote: 'Notes',
      totalLabel: '🔴 Total Initial Cost', totalDescPrefix: 'Approx.',
      downPaymentLabel: '⚠️ Additional Down Payment Required', downPaymentNote: 'Loan ratio {loanRatio}% → down payment {downPaymentPct}%',
      totalCashLabel: '💸 Total Cash Needed Upfront', totalCashDesc: 'Initial cost + Down payment',
      accordionTitle: '📖 How Each Cost Is Calculated',
      accordionContent: 'Agent Fee = MIN(property price × 3.3% + ¥66,000 (incl. tax), statutory cap)\nRegistration Tax = assessed value × 2%\nReal Estate Acquisition Tax = assessed value × 3%, with reductions for new/used\nJudicial Scrivener Fee = approx. ¥80,000–150,000\nStamp Duty = tiered by contract amount (reduced rates until Mar 2027)\nLoan Processing Fee = loan amount × 2.2%\nLoan Guarantee Fee = loan amount × 1.0% (one-time)\nFire & Earthquake Insurance = approx. ¥30,000–60,000 first year\nRepair Fund Settlement = one-time settlement for used condo purchase, approx. ¥300,000–800,000',
      items: {
        agentFee: { label: 'Agent Fee', formula: 'Price × 3% + ¥60,000 (+10% tax)', note: 'Statutory maximum' },
        regTax: { label: 'Registration Tax', formula: 'Assessed value × 2%', note: 'Assessed value ≈ market × 60%' },
        acqTax: { label: 'Acquisition Tax', formulaPrefix: 'Assessed value × ', noteNew: 'Nearly fully exempt for new builds', noteOld: 'Reduction applies for used' },
        judicialScrivener: { label: 'Judicial Scrivener', formula: 'Fixed ¥80,000–150,000', note: 'Title transfer registration' },
        stampDuty: { label: 'Stamp Duty', formula: 'Tiered by contract amount (reduced)', note: 'Reduced rates until Mar 2027' },
        loanFee: { label: 'Loan Processing Fee', formula: 'Loan amount × 2.2% (incl. tax)', note: 'Varies by bank & plan' },
        guaranteeFee: { label: 'Loan Guarantee Fee', formula: 'Loan amount × 1.0% (one-time)', note: 'Guarantor company fee. Can be rolled into rate' },
        insurance: { label: 'Fire & Quake Insurance (1st yr)', formula: 'Fixed ¥30,000–80,000', note: 'Fire insurance mandatory for mortgage' },
        repairLump: { label: 'Repair Fund Settlement', formula: 'Estimated by building age ratio', note: 'One-time settlement when buying used condo' },
      },
    },

    annual: {
      title: '📅 Annual Ownership Cost Breakdown',
      thItem: 'Item', thAmount: 'Annual', thFormula: 'Formula', thNote: 'Notes',
      totalLabel: '🔴 Total Annual Cost', totalDescPrefix: 'Approx.',
      accordionTitle: '📖 How Each Cost Is Calculated',
      accordionContent: 'Fixed Asset Tax = assessed value × 1.4% (assessed value ≈ market × 60%)\nCity Planning Tax = assessed value × 0.3% (urbanization zones only)\nManagement Fee (condo) = avg ¥8,000–20,000/month\nRepair Fund (condo) = higher for older buildings\nSelf Repair Reserve (house) = recommended ¥30,000–50,000/month\nFire Insurance = approx. ¥10,000–50,000/year\nEarthquake Insurance = approx. ¥10,000–30,000/year (bundled with fire insurance)',
      items: {
        fixedAssetTax: { label: 'Fixed Asset Tax', formula: 'Assessed value × 1.4%', note: 'Paid in 4 installments' },
        cityPlanTax: { label: 'City Planning Tax', formula: 'Assessed value × 0.3%', note: 'Urbanization zones only' },
        mgmtFee: { label: 'Management Fee', formula: '~¥{man}0,000/month × 12', note: 'Common area cleaning & utilities' },
        repairFee: { label: 'Repair Fund', formula: '~¥{man}0,000/month × 12', note: 'For 12-year-cycle major repairs' },
        parking: { label: 'Parking', formula: '~¥{man}0,000/month × 12', note: 'Separate if you have a car' },
        selfRepair: { label: 'Self Repair Reserve (recommended)', formula: '~¥{man}0,000/month × 12', note: 'No HOA, self-reserve recommended' },
        fireInsurance: { label: 'Fire Insurance', formula: '~¥20,000–50,000/year', note: '' },
        quakeInsurance: { label: 'Earthquake Insurance', formula: '~¥10,000–30,000/year', note: 'Strongly recommended' },
      },
    },

    loan: {
      title: '🏦 Mortgage Repayment Details',
      summaryLabels: { loanAmount: 'Loan Amount', downPayment: 'Down Payment', monthlyPayment: 'Monthly Payment', totalInterest: 'Total Interest', burdenRate: 'Debt Burden Ratio', initialCash: 'Upfront Cash Needed' },
      tableHeaders: { item: 'Item', amount: 'Amount', desc: 'Description' },
      rows: {
        loanAmount: { label: 'Loan Amount', desc: 'Price {priceMan} × {ratio}%' },
        downPayment: { label: 'Down Payment', desc: 'Price - Loan Amount' },
        interestRate: { label: 'Interest Rate (variable)', descPermanent: 'PR preferential rate 0.3–0.8% reference', descTech: 'Work visa 0.8–2.0% reference' },
        loanYears: { label: 'Loan Term' },
        monthlyPayment: { label: '📌 Monthly Payment', desc: 'Equal amortization' },
        annualPayment: { label: 'Annual Payment', desc: 'Monthly × 12' },
        totalPayment: { label: 'Total Repayment', desc: 'Principal + Interest' },
        totalInterest: { label: 'Total Interest Paid', descPattern: 'Interest accounts for {pct}% of total repayment' },
        burdenRate: { label: 'Debt Burden Ratio' },
        initialCash: { label: '💸 Total Upfront Cash', desc: 'Initial cost + Down payment' },
      },
      burdenMessages: { severe: '⚠️ Severely over limit! Bank review unlikely', warning: '⚠️ Somewhat high — consider reducing loan amount', safe: '✅ Within safe range' },
      accordionTitle: '📖 Repayment Formula',
      accordionContent: 'Monthly payment = Loan × monthly rate × (1+rate)^n ÷ [(1+rate)^n − 1]\nTotal repayment = Monthly × n\nTotal interest = Total repayment − Loan amount\nDebt burden ratio = Annual repayment ÷ Annual income × 100% (banks usually require ≤30–35%)\nNote: Variable rates may adjust every 6 months',
    },
  },

  // ─── HSFP Points Calculator ───
  hsPointCalculator: {
    title: '📊 HSFP Points Calculator',
    description: 'Based on the Immigration Services Agency "Highly Skilled Professional Points System" (Advanced Professional/Technical Activities). 70+ points → PR eligible after 3 years. 80+ points → PR eligible after 1 year.',
    descriptionNote: '※ Income points vary by age bracket (under 29 is most favorable).',

    age: { label: '🎂 Age', note: '(affects income & experience scoring)' },
    salary: { label: '💰 Annual Income', unit: '¥10,000' },
    education: { label: '🎓 Education' },
    experience: { label: '💼 Work Experience' },
    japanese: { label: '🗾 Japanese Ability' },
    bonus: { label: '⭐ Bonus Items (multi-select)' },

    ageOptions: { under29: 'Under 29', age30to34: '30–34', age35to39: '35–39', over40: '40+' },
    ageBracketLabels: { under29: 'Under 29', age30to34: '30–34', age35to39: '35–39', over40: '40+' },
    educationOptions: { phd: 'PhD', mba: "Master's (incl. MBA/MOT)", masters: "Master's", bachelors: "Bachelor's", college: 'Associate/College', none: 'None' },
    experienceOptions: { y15: '15+ years', y10: '10–14 years', y7: '7–9 years', y5: '5–6 years', y3: '3–4 years', less3: 'Under 3 years' },
    japaneseOptions: { n1: 'N1 Pass / Equivalent', n2: 'N2 Pass', none: 'None' },
    bonusOptions: {
      jpGrad: 'Graduated from Japanese graduate school', jpUniv: 'Graduated from Japanese university',
      topUniv: 'Top global university (QS/THE top 300)', jpLangBonus: 'N1 level Japanese + JP university/grad school degree',
      qualification: 'Japanese national qualification (lawyer, CPA, engineer, etc.)', research: 'Research achievements (3+ papers)',
      patent: '1+ patent invention', executive: 'Executive experience (10+ years management)',
      govProject: 'Japanese government-related project experience', investment: 'Investment in Japan (¥10M+)',
    },

    resultYourScore: 'Your Total Score',
    resultUnit: 'pts',
    result80: '✅ 80+ points! Eligible for PR after 1 year',
    result70: '✅ 70+ points! Eligible for PR after 3 years',
    resultUnder70: '⚠️ Below 70 points. Check bonus items.',

    breakdownTitle: 'Breakdown',
    breakdownTotal: 'Total',
    breakdownLabels: { age: '🎂 Age', salary: '💰 Income', education: '🎓 Education', experience: '💼 Experience', japanese: '🗾 Japanese' },
    salaryDetail: '¥{salary}0,000 (age bracket: {ageBracket})',
    experienceWarning: '⚠️ Age bracket ({ageLabel}) conflicts with work experience "{expLabel}". Assuming university graduation at 22, your claimed experience exceeds your age.',
  },

  // ─── Take-home Pay Calculator ───
  salaryCalculator: {
    title: '💰 Japan Take-home Pay Calculator',
    description: 'FY2025 (Reiwa 7) tax rates. Enter your annual income to calculate take-home pay.',
    incomeLabel: 'Annual Income (¥10,000)',
    incomeUnit: '¥10,000',
    over40Label: 'Age 40+ (incl. long-term care insurance)',

    monthlyTakeHome: 'Monthly Take-home',
    annualTakeHome: 'Annual Take-home:',
    takeHomeRate: 'Take-home rate {rate}%',

    thItem: 'Item', thAnnual: 'Annual', thMonthly: 'Monthly',
    grossIncome: 'Gross Income',
    employmentDeduction: 'Employment Income Deduction',
    socialInsurance: 'Social Insurance',
    basicDeduction: 'Basic Deduction',
    incomeTax: 'Income Tax + Reconstruction Surtax',
    residentTax: 'Residence Tax',
    takeHome: 'Take-home Pay',

    note: '⚠️ Note: Social insurance & residence tax are estimates. Actual amounts vary by municipality and insurance union. Bonus not included; monthly base calculation only.',
  },

  // ─── Rent vs Buy Comparison ───
  rentVsBuy: {
    title: '⚖️ Rent vs Buy Comparison',
    description: 'Compare cumulative costs and asset building to decide whether to buy or rent.',

    buySectionTitle: '🏠 Buying',
    rentSectionTitle: '🏢 Renting',

    buyFields: {
      price: 'Property Price (¥10,000)', downPayment: 'Down Payment (%)', interestRate: 'Mortgage Rate (%)',
      loanYears: 'Loan Term', propertyTax: 'Property Tax (%)', maintenance: 'Maintenance & Repairs (%)',
      acquisition: 'Acquisition Costs (%)', monthlyPayment: 'Monthly Payment: ¥{amount}',
    },

    rentFields: {
      monthlyRent: 'Monthly Rent (¥10,000)', increaseRate: 'Rent Increase Rate (%/yr)', renewalFee: 'Renewal Fee (months)',
      compareYears: 'Comparison Period',
    },

    units: { manYen: '¥10,000', percent: '%', years: 'years', months: 'months' },

    comparisonTitle: '{years}-Year Cumulative Comparison',
    chartLegendBuy: '🟦 Buying Cumulative Cost', chartLegendRent: '🟥 Renting Cumulative Cost',

    thYears: 'Year', thBuyTotal: 'Buy\nCumulative', thBuyEquity: 'Buy\nEquity',
    thBuyNet: 'Buy\nNet Cost', thRentTotal: 'Rent\nCumulative', thDiff: 'Diff\n(Rent−Buy)',

    verdictBuyBetter: '✅ After {years} years, buying saves approx. ¥{amount}0,000',
    verdictRentBetter: '💡 After {years} years, renting costs approx. ¥{amount}0,000 less',
    verdictBuyReason: 'Buying builds equity through mortgage repayment, resulting in lower net cost than renting over the long term.',
    verdictRentReason: 'Renting requires less upfront capital and offers more flexibility. Better if you plan to stay short-term.',
    verdictDisclaimer: 'Consider your life plan (job transfers, family changes, etc.) when making your decision.',
  },
}

export default en
