import type { LocaleDict } from './types'

const zh: LocaleDict = {
  header: {
    logo: '🗾 Japan Living Tools',
    articles: '📝 实用文章',
    nav: {
      home: '首页',
      houseCalculator: '购房计算器',
      hsPointCalculator: '高度人材积分',
      salaryCalculator: '税后工资',
      rentVsBuy: '买房vs租房',
      articles: '实用文章',
    },
  },
  footer: {
    about: {
      title: '🗾 Japan Living Tools',
      desc: '为在日本生活的你提供实用在线工具。购房计算、税务估算、签证积分一站解决。',
    },
    tools: {
      title: '🛠️ 计算工具',
      nav: {
        houseCalculator: '购房费用计算器',
        hsPointCalculator: '高度人材积分计算',
        salaryCalculator: '税后工资计算',
        rentVsBuy: '买房vs租房对比',
      },
    },
    articles: {
      title: '📝 实用文章',
      nav: {
        costOfLiving: '日本物价',
        homeBuying: '日本买房攻略',
        salary: '日本工资',
        visa: '日本签证',
      },
    },
    disclaimer: {
      title: 'ℹ️ 免责声明',
      desc: '本网站内容仅供参考，实际费用因个人条件而异。计算结果不构成任何投资或购房建议。',
    },
    bottom: '© {year} Japan Living Tools. Built with Next.js · Deployed on Cloudflare Pages.',
  },
  home: {
    hero: {
      badge: '🇯🇵 日本生活实用工具',
      title: '日本生活をもっと簡単に',
      desc: '购房费用、签证积分、税务计算——在日生活所需的关键数字，一站式算出。',
      cta1: '开始使用工具',
      cta2: '查看文章 →',
    },
    tools: {
      title: '🧮 核心工具',
      desc: '精准计算，决策有据',
      cards: {
        houseCalculator: {
          title: '🏠 购房费用计算器',
          desc: '计算日本购房全部费用——中介费、税费、贷款利息、固定资产税。',
          cta: '开始计算 →',
        },
        hsPointCalculator: {
          title: '📊 高度人材积分计算',
          desc: '学历·年收·年龄·日语——综合评估高度専門職签证积分。',
          cta: '计算积分 →',
        },
        salaryCalculator: {
          title: '💰 税后工资计算器',
          desc: '基于令和7年最新税率，精确计算手取额、所得税、住民税。',
          cta: '计算工资 →',
        },
        rentVsBuy: {
          title: '⚖️ 买房vs租房',
          desc: '5~35年对比——累计支出一目了然，用数据做置业决策。',
          cta: '开始对比 →',
        },
      },
    },
    articles: {
      title: '📝 最新文章',
      desc: '了解日本生活方方面面，从签证到购房，从工资到物价。',
      readMore: '阅读全文 →',
      items: {
        costOfLiving: { title: '2025年日本物价全解析', desc: '超市购物、水电煤、外出就餐、交通出行——一天到底花多少？', date: '2025-06-15', tag: '生活指南' },
        homeBuying: { title: '日本买房完全指南', desc: '从看房到拿钥匙，首付、贷款、税费全流程拆解。', date: '2025-06-12', tag: '房产' },
        salary: { title: '2025年日本工资水平详解', desc: 'IT、制造业、服务业等各行业平均工资与到手金额一网打尽。', date: '2025-06-08', tag: '职场' },
        visa: { title: '日本签证全攻略', desc: '从留学到工作到永住——在留资格的分类、条件与申请流程。', date: '2025-06-01', tag: '签证' },
      },
    },
  },
  common: {
    langSwitch: '语言',
    langZh: '中文',
    langJa: '日本語',
    langEn: 'English',
    notFound: {
      title: '404 — 页面未找到',
      desc: '你访问的页面不存在或已被移动。',
      back: '返回首页',
    },
    toolsTitle: '全部工具',
    toolsDesc: '为日本生活打造的在线计算工具。',
  },
  articles: {
    title: '📝 实用文章',
    desc: '日本生活方方面面的实用指南与最新信息。',
    back: '← 返回文章列表',
  },
  tools: {
    houseCalculator: { title: '购房费用计算器', desc: '计算日本购房全部費用明细——中介费、税费、贷款利息。' },
    hsPointCalculator: { title: '高度人材积分计算', desc: '出入国在留管理庁「高度専門職ポイント制」準拠。' },
    salaryCalculator: { title: '税后工资计算器', desc: '令和7年最新税率，精确计算手取额。' },
    rentVsBuy: { title: '买房vs租房对比', desc: '数据驱动的置业决策工具。' },
  },

  // ─── 购房费用计算器 ───
  houseCalculator: {
    title: '🏠 日本购房费用计算器',
    subtitle: '购房一次性费用 · 年度维持费 · 贷款还贷',
    formSectionTitle: '📝 基本信息',

    housePrice: { label: '💰 房屋价格（万日元）', hint: '例：3000 = 3,000万日元', tip: '所有计算的基准值。中介费、固都税、贷款额等全部费用基于此价格计算' },
    propertyType: { label: '🏷️ 房屋类型', tip: '公寓→有管理费+修缮积立金+停车场 ／ 独栋→仅自主修缮储备，无固定管理费', mansion: '公寓', house: '独栋' },
    visaType: { label: '🛂 签证类型', tip: '自动切换利率与贷款比例默认值。永住者→利率0.5%·贷款比例90% ／ 技术签证→利率1.0%·贷款比例70%', permanent: '永住者', tech: '技术·人文知识·国际业务' },
    loanRatio: { label: '🏦 期望贷款比例（%）', tip: '贷款额 = 房屋价格 × 此比例，剩余为首付。永住者最高100%，技术签证通常70%以下' },
    interestRate: { label: '📈 参考利率（%）', tip: '直接影响月还款额、总利息、还款负担率', rateHintPermanent: '永住约0.3～0.8%', rateHintTech: '技术签证约0.8～2.0%' },
    loanYears: { label: '📅 还款年限', tip: '年限越长月还款越低但总利息越高', unit: '年' },
    annualIncome: { label: '💵 年收入（万日元）', tip: '还款负担率 = 年还款额 ÷ 年收入。银行通常要求30%以下' },
    buildingAge: {
      label: '🏗️ 房龄', tip: '影响不动产取得税的减免幅度和修缮积立基金清算金额',
      options: { new: '新房', age5: '房龄5年', age10: '房龄10年', age15: '房龄15年', age20: '房龄20年', age30: '房龄30年', age40: '房龄40年以上' },
    },

    summary: { housePrice: '💰 房屋价格', initialCost: '🔑 初期费用', annualCost: '📅 年度维持费', monthlyPayment: '🏦 月还款额' },

    purchase: {
      title: '🔑 购房一次性费用明细',
      thItem: '费用项目', thAmount: '金额', thFormula: '计算公式', thNote: '备注',
      totalLabel: '🔴 初期费用合计', totalDescPrefix: '约占房屋价格的',
      downPaymentLabel: '⚠️ 另需首付', downPaymentNote: '贷款比例{loanRatio}% → 首付{downPaymentPct}%',
      totalCashLabel: '💸 初期现金总需求', totalCashDesc: '初期费用 + 首付',
      accordionTitle: '📖 各项费用计算说明',
      accordionContent: '中介费 = MIN(房屋价格×3.3% + 6.6万日元（含消费税），法定上限）\n登记许可税 = 评估值×2%\n不动产取得税 = 评估值×3%，新房/二手房有减免措施\n司法书士报酬 = 约8～15万日元\n印花税 = 按合同金额阶梯税率（2027年3月前有减税）\n贷款手续费 = 贷款额×2.2%\n贷款保证费 = 贷款额×1.0%（一次性）\n火灾·地震保险 = 首年约3～6万日元\n修缮积立基金清算 = 购买二手公寓时一次性清算约30～80万日元',
      items: {
        agentFee: { label: '中介费', formula: '房屋价格×3%+6万日元（+消费税10%）', note: '法定上限金额' },
        regTax: { label: '登记许可税', formula: '固定资产评估值×2%', note: '评估值≈市场价×60%' },
        acqTax: { label: '不动产取得税', formulaPrefix: '评估值×', noteNew: '新房基本全额免除', noteOld: '二手房适用减免' },
        judicialScrivener: { label: '司法书士报酬', formula: '定额 8～15万日元', note: '所有权转移登记代办' },
        stampDuty: { label: '印花税', formula: '合同金额阶梯税率（减免后）', note: '2027年3月前适用减免税率' },
        loanFee: { label: '贷款手续费', formula: '贷款额×2.2%（含消费税）', note: '根据银行和方案有所不同' },
        guaranteeFee: { label: '贷款保证费', formula: '贷款额×1.0%（一次性）', note: '保证公司费用。可并入利率' },
        insurance: { label: '火灾·地震保险（首年）', formula: '定额 3～8万日元', note: '贷款签约时必须加入火灾保险' },
        repairLump: { label: '修缮积立基金清算', formula: '按房龄比例估算', note: '购买二手公寓时一次性清算' },
      },
    },

    annual: {
      title: '📅 年度维持费用明细',
      thItem: '费用项目', thAmount: '年金额', thFormula: '计算公式', thNote: '备注',
      totalLabel: '🔴 年度维持费合计', totalDescPrefix: '约占房屋价格的',
      accordionTitle: '📖 各项费用计算说明',
      accordionContent: '固定资产税 = 评估值×1.4%（评估值≈市场价×60%）\n城市规划税 = 评估值×0.3%（仅限于市街化区域）\n管理费（公寓） = 平均8,000～20,000日元/月\n修缮积立金（公寓） = 房龄越长金额越高\n自主修缮储备（独栋） = 建议每月储备3～5万日元\n火灾保险 = 约1～5万日元/年\n地震保险 = 约1～3万日元/年（与火灾保险捆绑）',
      items: {
        fixedAssetTax: { label: '固定资产税', formula: '评估值×1.4%', note: '分4次缴纳' },
        cityPlanTax: { label: '城市规划税', formula: '评估值×0.3%', note: '仅限于市街化区域' },
        mgmtFee: { label: '管理费', formula: '约{man}万日元/月×12', note: '公共区域清洁·水电费' },
        repairFee: { label: '修缮积立金', formula: '约{man}万日元/月×12', note: '12年周期大规模修缮用' },
        parking: { label: '停车场', formula: '约{man}万日元/月×12', note: '如有车辆需另付' },
        selfRepair: { label: '自主修缮储备（推荐）', formula: '约{man}万日元/月×12', note: '无管理组合，建议自主储备' },
        fireInsurance: { label: '火灾保险', formula: '约2～5万日元/年', note: '' },
        quakeInsurance: { label: '地震保险', formula: '约1～3万日元/年', note: '强烈推荐加入' },
      },
    },

    loan: {
      title: '🏦 贷款还款明细',
      summaryLabels: { loanAmount: '贷款金额', downPayment: '首付', monthlyPayment: '月还款额', totalInterest: '总支付利息', burdenRate: '还款负担率', initialCash: '初期现金需求' },
      tableHeaders: { item: '项目', amount: '金额', desc: '说明' },
      rows: {
        loanAmount: { label: '贷款金额', desc: '房屋价格 {priceMan} × {ratio}%' },
        downPayment: { label: '首付', desc: '房屋价格 - 贷款额' },
        interestRate: { label: '利率（浮动）', descPermanent: '永住者优惠利率 0.3～0.8% 参考', descTech: '技术签证 0.8～2.0% 参考' },
        loanYears: { label: '还款年限' },
        monthlyPayment: { label: '📌 月还款额', desc: '等额本息还款' },
        annualPayment: { label: '年还款额', desc: '月还款×12' },
        totalPayment: { label: '总还款额', desc: '本金+利息' },
        totalInterest: { label: '总支付利息', descPattern: '利息占总还款额的 {pct}%' },
        burdenRate: { label: '还款负担率' },
        initialCash: { label: '💸 初期现金需求合计', desc: '初期费用 + 首付' },
      },
      burdenMessages: { severe: '⚠️ 严重超标！银行审查困难', warning: '⚠️ 偏高，建议减少贷款额', safe: '✅ 安全范围内' },
      accordionTitle: '📖 还款计算公式说明',
      accordionContent: '月还款额 = 贷款额 × 月利率 × (1+月利率)^期数 ÷ [(1+月利率)^期数 - 1]\n总还款额 = 月还款额 × 期数\n总支付利息 = 总还款额 - 贷款额\n还款负担率 = 年还款额 ÷ 年收入 × 100%（银行通常要求 ≤30～35%）\n注意：浮动利率每半年可能调整',
    },
  },

  // ─── 高度人材积分计算 ───
  hsPointCalculator: {
    title: '📊 高度人材积分计算',
    description: '依据出入国在留管理厅"高度専門職积分制"（高度专业·技术活动）。70分以上3年后、80分以上1年后可申请永住。',
    descriptionNote: '※ 年收入积分因年龄档位而异（29岁以下最有利）。',

    age: { label: '🎂 年龄', note: '（影响年收入·经验的判定基准）' },
    salary: { label: '💰 年收入', unit: '万日元' },
    education: { label: '🎓 学历' },
    experience: { label: '💼 工作经验' },
    japanese: { label: '🗾 日语能力' },
    bonus: { label: '⭐ 加分项（可多选）' },

    ageOptions: { under29: '29岁以下', age30to34: '30岁～34岁', age35to39: '35岁～39岁', over40: '40岁以上' },
    ageBracketLabels: { under29: '29岁以下', age30to34: '30-34岁', age35to39: '35-39岁', over40: '40岁以上' },
    educationOptions: { phd: '博士（PhD）', mba: '硕士（含MBA/MOT）', masters: '硕士', bachelors: '学士', college: '短大·专门学校', none: '无' },
    experienceOptions: { y15: '15年以上', y10: '10年～14年', y7: '7年～9年', y5: '5年～6年', y3: '3年～4年', less3: '不足3年' },
    japaneseOptions: { n1: 'N1合格 / 同等以上', n2: 'N2合格', none: '无' },
    bonusOptions: {
      jpGrad: '日本大学院毕业', jpUniv: '日本大学毕业',
      topUniv: '世界顶尖大学（QS/THE 前300）毕业', jpLangBonus: '日语N1 + 日本大学/大学院毕业',
      qualification: '持有日本国家资格（律师·会计师·技术士等）', research: '研究业绩（论文3篇以上）',
      patent: '发明专利1件以上', executive: '管理经验（管理职10年以上）',
      govProject: '参与日本政府相关项目经验', investment: '对日投资（1,000万日元以上）',
    },

    resultYourScore: '您的总积分',
    resultUnit: '分',
    result80: '✅ 80分以上！1年后可申请永住',
    result70: '✅ 70分以上！3年后可申请永住',
    resultUnder70: '⚠️ 未达到70分。请确认加分项目',

    breakdownTitle: '明细',
    breakdownTotal: '合计',
    breakdownLabels: { age: '🎂 年龄', salary: '💰 年收入', education: '🎓 学历', experience: '💼 工作经验', japanese: '🗾 日语能力' },
    salaryDetail: '{salary}万日元（{ageBracket}档位）',
    experienceWarning: '⚠️ 所选年龄档位（{ageLabel}）与工作经验"{expLabel}"存在矛盾。按22岁大学毕业推算，工作年限超过当前年龄。',
  },

  // ─── 税后工资计算器 ───
  salaryCalculator: {
    title: '💰 日本税后工资计算',
    description: '令和7年度（2025年）税率基准。输入年收入，自动计算到手金额。',
    incomeLabel: '年收入（万日元）',
    incomeUnit: '万日元',
    over40Label: '40岁以上（含护理保险费）',

    monthlyTakeHome: '月到手金额',
    annualTakeHome: '年到手金额：',
    takeHomeRate: '到手率 {rate}%',

    thItem: '项目', thAnnual: '年金额', thMonthly: '月金额',
    grossIncome: '税前年收入',
    employmentDeduction: '工资所得扣除',
    socialInsurance: '社会保险费',
    basicDeduction: '基础扣除',
    incomeTax: '所得税 + 复兴特别所得税',
    residentTax: '住民税',
    takeHome: '到手金额',

    note: '⚠️ 注意：社会保险费·住民税为概算。实际金额因所在自治体、加入保险组合而异。不含奖金，按月薪基准估算。',
  },

  // ─── 买房vs租房对比 ───
  rentVsBuy: {
    title: '⚖️ 买房 vs 租房 对比',
    description: '从累计支出·资产形成的角度，比较该买还是该租。',

    buySectionTitle: '🏠 购房',
    rentSectionTitle: '🏢 租房',

    buyFields: {
      price: '房屋价格（万日元）', downPayment: '首付（%）', interestRate: '房贷利率（%）',
      loanYears: '贷款年限', propertyTax: '固定资产税（%）', maintenance: '修缮·管理费（%）',
      acquisition: '购房各项费用（%）', monthlyPayment: '月还款额：¥{amount}',
    },

    rentFields: {
      monthlyRent: '月租金（万日元）', increaseRate: '租金上涨率（%/年）', renewalFee: '更新费（个月租金）',
      compareYears: '比较年限',
    },

    units: { manYen: '万日元', percent: '%', years: '年', months: '个月' },

    comparisonTitle: '{years}年 累计对比',
    chartLegendBuy: '🟦 购房累计支出', chartLegendRent: '🟥 租房累计支出',

    thYears: '经过年数', thBuyTotal: '购房\n累计支出', thBuyEquity: '购房\n资产价值',
    thBuyNet: '购房\n实际负担', thRentTotal: '租房\n累计支出', thDiff: '差额\n(租房-购房)',

    verdictBuyBetter: '✅ {years}年后，购房约节省{amount}万日元',
    verdictRentBetter: '💡 {years}年后，租房支出约少{amount}万日元',
    verdictBuyReason: '购房的话，通过还贷可积累资产，最终实际负担比租房少。',
    verdictRentReason: '租房的话，初期费用低，灵活性高。短期居住计划的话租房更有利。',
    verdictDisclaimer: '实际判断时请综合考虑人生规划（调动可能性、家庭构成变化等）。',
  },
}

export default zh
