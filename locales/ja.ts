import type { LocaleDict } from './types'

const ja: LocaleDict = {
  header: {
    logo: '🗾 Japan Living Tools',
    articles: '📝 お役立ち記事',
    nav: {
      home: 'ホーム',
      houseCalculator: '購入費用',
      hsPointCalculator: '高度人材P',
      salaryCalculator: '手取り計算',
      rentVsBuy: '買うvs借りる',
      residenceTaxCalculator: '住民税',
      furusatoCalculator: 'ふるさと納税',
      cityCostCalculator: '生活費',
      articles: '記事',
    },
  },
  footer: {
    about: {
      title: '🗾 Japan Living Tools',
      desc: '日本で暮らすあなたのための実用オンラインツール。住宅購入計算、税務見積もり、ビザポイントを一括サポート。',
    },
    tools: {
      title: '🛠️ 計算ツール',
      nav: {
        houseCalculator: '住宅購入費用計算',
        hsPointCalculator: '高度人材ポイント計算',
        salaryCalculator: '手取り給与計算',
        rentVsBuy: '購入vs賃貸比較',
        residenceTaxCalculator: '住民税計算',
        furusatoCalculator: 'ふるさと納税',
        cityCostCalculator: '都市別生活費',
      },
    },
    articles: {
      title: '📝 お役立ち記事',
      nav: {
        costOfLiving: '日本物価',
        homeBuying: '日本の住宅購入',
        salary: '日本の給与',
        visa: '日本ビザ',
        residenceTax: '住民税ガイド',
      },
    },
    disclaimer: {
      title: 'ℹ️ 免責事項',
      desc: '本サイトの内容は参考情報です。実際の費用は個人の条件により異なります。計算結果はいかなる投資・購入の助言にもなりません。',
    },
    bottom: '© {year} Japan Living Tools. Built with Next.js · Deployed on Cloudflare Pages.',
  },
  home: {
    hero: {
      badge: '🇯🇵 日本生活お役立ちツール',
      title: '日本生活をもっと簡単に',
      desc: '住宅購入費用、ビザポイント、税金計算——日本生活に必要な数字をワンストップで。',
      cta1: 'ツールを使う',
      cta2: '記事を読む →',
    },
    tools: {
      title: '🧮 コアツール',
      desc: '正確な計算で確かな判断を',
      cards: {
        houseCalculator: {
          title: '🏠 購入費用計算',
          desc: '仲介手数料・税金・ローン金利・固定資産税——購入総費用をすべて計算。',
          cta: '計算する →',
        },
        hsPointCalculator: {
          title: '📊 高度人材ポイント',
          desc: '学歴・年収・年齢・日本語力——高度専門職ビザの総合ポイントを算出。',
          cta: 'ポイント計算 →',
        },
        salaryCalculator: {
          title: '💰 手取り計算',
          desc: '令和7年最新税率に基づき、手取り額・所得税・住民税を正確に計算。',
          cta: '給与計算 →',
        },
        rentVsBuy: {
          title: '⚖️ 買うvs借りる',
          desc: '5〜35年の累計支出を比較——データで決める住まいの選択。',
          cta: '比較する →',
        },
        residenceTaxCalculator: {
          title: '🏛️ 住民税計算',
          desc: '所得割10%＋均等割5,000円。扶養控除にも対応。',
          cta: '計算する →',
        },
        furusatoCalculator: {
          title: '🎁 ふるさと納税',
          desc: '控除限度額と節税効果をシミュレーション。',
          cta: 'シミュレーション →',
        },
        cityCostCalculator: {
          title: '🏙️ 都市別生活費',
          desc: '8都市の月額生活費を物価指数で自動調整。',
          cta: '計算する →',
        },
      },
    },
    articles: {
      title: '📝 最新記事',
      desc: '日本生活のあれこれをわかりやすく解説。ビザから住宅購入、給与から物価まで。',
      readMore: '続きを読む →',
      items: {
        costOfLiving: { title: '2025年 日本物価のすべて', desc: 'スーパーでの買い物、光熱費、外食、交通費——生活費のリアル。', date: '2025-06-15', tag: '生活ガイド' },
        homeBuying: { title: '日本の住宅購入完全ガイド', desc: '物件探しから鍵の受け取りまで、頭金・ローン・諸費用を徹底解説。', date: '2025-06-12', tag: '不動産' },
        salary: { title: '2025年 日本給与実態', desc: 'IT、製造、サービス——業種別平均給与と手取り額をまとめました。', date: '2025-06-08', tag: 'キャリア' },
        visa: { title: '日本ビザ完全攻略', desc: '留学→就労→永住。在留資格の種類・条件・申請手順を網羅。', date: '2025-06-01', tag: 'ビザ' },
        residenceTax: { title: '住民税完全ガイド：計算・支払い・節税', desc: '住民税の仕組み、計算方法（所得割＋均等割）、支払い時期、節税できる控除までをわかりやすく解説。', date: '2025-06-18', tag: '税務' },
      },
    },
  },
  common: {
    langSwitch: '言語',
    langZh: '中文',
    langJa: '日本語',
    langEn: 'English',
    notFound: {
      title: '404 — ページが見つかりません',
      desc: 'お探しのページは存在しないか、移動されました。',
      back: 'トップに戻る',
    },
    toolsTitle: '全ツール',
    toolsDesc: '日本生活のためのオンライン計算ツール。',
  },
  articles: {
    title: '📝 お役立ち記事',
    desc: '日本生活に役立つ実用ガイドと最新情報。',
    back: '← 記事一覧に戻る',
  },
  tools: {
    houseCalculator: { title: '住宅購入費用計算', desc: '日本での住宅購入にかかる全費用を明細計算——仲介手数料・税金・ローン金利。' },
    hsPointCalculator: { title: '高度人材ポイント計算', desc: '出入国在留管理庁「高度専門職ポイント制」に準拠。' },
    salaryCalculator: { title: '手取り給与計算', desc: '令和7年最新税率で手取り額を正確に計算。' },
    rentVsBuy: { title: '購入vs賃貸 比較', desc: 'データドリブンな住まいの意思決定ツール。' },
    residenceTaxCalculator: { title: '住民税計算', desc: '所得割＋均等割を自動計算。' },
    furusatoCalculator: { title: 'ふるさと納税シミュレーター', desc: '控除限度額と節税効果を自動計算。' },
    cityCostCalculator: { title: '都市別生活費計算', desc: '8都市の月額生活費を物価指数で調整。' },
  },

  // ─── 住宅購入費用計算 ───
  houseCalculator: {
    title: '🏠 日本住宅購入費用計算',
    subtitle: '購入時一時費用 · 年間維持費 · ローン返済',
    formSectionTitle: '📝 基本情報',

    housePrice: { label: '💰 物件価格（万円）', hint: '例：3000 = 3,000万円', tip: 'すべての計算の基準値。仲介手数料、固都税、借入額などの全費用がこの価格に基づいて計算されます' },
    propertyType: { label: '🏷️ 物件タイプ', tip: 'マンション→管理費+修繕積立金+駐車場 ／ 一戸建て→自主修繕積立のみ、固定管理費なし', mansion: '分譲マンション', house: '一戸建て' },
    visaType: { label: '🛂 ビザ種類', tip: '金利と融資比率のデフォルト値を自動切替。永住者→金利0.5%·融資比率90% ／ 技術ビザ→金利1.0%·融資比率70%', permanent: '永住者', tech: '技術・人文知識・国際業務' },
    loanRatio: { label: '🏦 希望融資比率（%）', tip: '借入額=物件価格×この比率、残りが頭金。永住者は最大100%、技術ビザは通常70%以下' },
    interestRate: { label: '📈 参考金利（%）', tip: '月々返済額、総利息、返済負担率に直接影響', rateHintPermanent: '永住は約0.3～0.8%', rateHintTech: '技術ビザは約0.8～2.0%' },
    loanYears: { label: '📅 返済年数', tip: '返済年数が長いほど月々返済は低いが総利息は高くなる', unit: '年' },
    annualIncome: { label: '💵 年収（万円）', tip: '返済負担率=年間返済額÷年収。銀行は通常30%以下を要求' },
    buildingAge: {
      label: '🏗️ 築年数', tip: '不動産取得税の減免幅と修繕積立基金清算額に影響',
      options: { new: '新築', age5: '築5年', age10: '築10年', age15: '築15年', age20: '築20年', age30: '築30年', age40: '築40年以上' },
    },

    summary: { housePrice: '💰 物件価格', initialCost: '🔑 初期費用', annualCost: '📅 年間維持費', monthlyPayment: '🏦 月々返済' },

    purchase: {
      title: '🔑 購入時一時費用明細',
      thItem: '費用項目', thAmount: '金額', thFormula: '計算式', thNote: '備考',
      totalLabel: '🔴 初期費用合計', totalDescPrefix: '物件価格の約',
      downPaymentLabel: '⚠️ 別途頭金必要', downPaymentNote: '融資比率{loanRatio}% → 頭金{downPaymentPct}%',
      totalCashLabel: '💸 初期現金総需要', totalCashDesc: '初期費用 + 頭金',
      accordionTitle: '📖 各費用の計算式説明',
      accordionContent: '仲介手数料 = MIN(物件価格×3.3% + 6.6万円（消費税込），法定上限）\n登録免許税 = 評価額×2%\n不動産取得税 = 評価額×3%、新築/中古軽減措置あり\n司法書士報酬 = 約8～15万円\n印紙税 = 契約金額に応じた階段税率（2027年3月まで軽減）\nローン事務手数料 = 借入額×2.2%\nローン保証料 = 借入額×1.0%（一括）\n火災・地震保険 = 初年度 約3～6万円\n修繕積立基金精算 = 中古マンション購入時の一括清算 約30～80万円',
      items: {
        agentFee: { label: '仲介手数料', formula: '物件価格×3%+6万円（+消費税10%）', note: '法定上限金額' },
        regTax: { label: '登録免許税', formula: '固定資産評価額×2%', note: '評価額≈市場価格×60%' },
        acqTax: { label: '不動産取得税', formulaPrefix: '評価額×', noteNew: '新築ほぼ全額免除', noteOld: '中古軽減適用' },
        judicialScrivener: { label: '司法書士報酬', formula: '定額 8～15万円', note: '所有権移転登記代行' },
        stampDuty: { label: '印紙税', formula: '契約金額階段税率（軽減後）', note: '2027年3月まで軽減税率適用' },
        loanFee: { label: 'ローン事務手数料', formula: '借入額×2.2%（消費税込）', note: '銀行・プランにより異なる' },
        guaranteeFee: { label: 'ローン保証料', formula: '借入額×1.0%（一括）', note: '保証会社費用。金利に組込可' },
        insurance: { label: '火災・地震保険（初年度）', formula: '定額 3～8万円', note: 'ローン契約時は火災保険加入必須' },
        repairLump: { label: '修繕積立基金精算', formula: '築年数比例で推定', note: '中古マンション購入時に一括精算' },
      },
    },

    annual: {
      title: '📅 年間維持費用明細',
      thItem: '費用項目', thAmount: '年額', thFormula: '計算式', thNote: '備考',
      totalLabel: '🔴 年間維持費合計', totalDescPrefix: '物件価格の約',
      accordionTitle: '📖 各費用の計算式説明',
      accordionContent: '固定資産税 = 評価額×1.4%（評価額≈市場価格×60%）\n都市計画税 = 評価額×0.3%（市街化区域のみ）\n管理費（マンション） = 平均8,000～20,000円/月\n修繕積立金（マンション） = 築年数が長いほど高額\n自主修繕積立（一戸建て） = 毎月3～5万円積立推奨\n火災保険 = 約1～5万円/年\n地震保険 = 約1～3万円/年（火災保険とセット）',
      items: {
        fixedAssetTax: { label: '固定資産税', formula: '評価額×1.4%', note: '年4回分割納付' },
        cityPlanTax: { label: '都市計画税', formula: '評価額×0.3%', note: '市街化区域のみ' },
        mgmtFee: { label: '管理費', formula: '約{man}万円/月×12', note: '共用部清掃・光熱水費' },
        repairFee: { label: '修繕積立金', formula: '約{man}万円/月×12', note: '12年周期大規模修繕用' },
        parking: { label: '駐車場', formula: '約{man}万円/月×12', note: '車がある場合は別途' },
        selfRepair: { label: '自主修繕積立（推奨）', formula: '約{man}万円/月×12', note: '管理組合がないため自主積立推奨' },
        fireInsurance: { label: '火災保険', formula: '約2～5万円/年', note: '' },
        quakeInsurance: { label: '地震保険', formula: '約1～3万円/年', note: '加入を強く推奨' },
      },
    },

    loan: {
      title: '🏦 ローン返済明細',
      summaryLabels: { loanAmount: '借入金額', downPayment: '頭金', monthlyPayment: '月々返済', totalInterest: '総支払利息', burdenRate: '返済負担率', initialCash: '初期現金需要' },
      tableHeaders: { item: '項目', amount: '金額', desc: '説明' },
      rows: {
        loanAmount: { label: '借入金額', desc: '物件価格 {priceMan} × {ratio}%' },
        downPayment: { label: '頭金', desc: '物件価格 - 借入額' },
        interestRate: { label: '金利（変動）', descPermanent: '永住者優遇金利 0.3～0.8% 参考', descTech: '技術ビザ 0.8～2.0% 参考' },
        loanYears: { label: '返済年数' },
        monthlyPayment: { label: '📌 月々返済額', desc: '元利均等返済' },
        annualPayment: { label: '年間返済額', desc: '月々返済×12' },
        totalPayment: { label: '総返済額', desc: '元金+利息' },
        totalInterest: { label: '総支払利息', descPattern: '利息が総返済額の {pct}% を占める' },
        burdenRate: { label: '返済負担率' },
        initialCash: { label: '💸 初期現金需要合計', desc: '初期費用 + 頭金' },
      },
      burdenMessages: { severe: '⚠️ 深刻な超過！銀行審査困難', warning: '⚠️ やや高め、借入額減額を推奨', safe: '✅ 安全圏内' },
      accordionTitle: '📖 返済計算式説明',
      accordionContent: '月々返済額 = 借入額 × 月利 × (1+月利)^回数 ÷ [(1+月利)^回数 - 1]\n総返済額 = 月々返済額 × 回数\n総支払利息 = 総返済額 - 借入額\n返済負担率 = 年間返済額 ÷ 年収 × 100%（銀行通常 ≤30～35%）\n注意：変動金利 半年ごとに見直しの可能性あり',
    },
  },

  // ─── 高度人材ポイント計算 ───
  hsPointCalculator: {
    title: '📊 高度人材ポイント計算',
    description: '出入国在留管理庁「高度専門職ポイント制」（高度専門・技術活動）に準拠。70点以上で3年後、80点以上で1年後に永住申請可能。',
    descriptionNote: '※ 年収ポイントは年齢区分により異なります（29歳以下が最も有利）。',

    age: { label: '🎂 年齢', note: '（年収・経験の判定基準に影響）' },
    salary: { label: '💰 年収', unit: '万円' },
    education: { label: '🎓 学歴' },
    experience: { label: '💼 実務経験' },
    japanese: { label: '🗾 日本語能力' },
    bonus: { label: '⭐ 加点項目（複数選択可）' },

    ageOptions: { under29: '29歳以下', age30to34: '30歳〜34歳', age35to39: '35歳〜39歳', over40: '40歳以上' },
    ageBracketLabels: { under29: '29歳以下', age30to34: '30-34歳', age35to39: '35-39歳', over40: '40歳以上' },
    educationOptions: { phd: '大学院博士号（PhD）', mba: '大学院修士号（MBA/MOT含む）', masters: '大学院修士号', bachelors: '大学学士号', college: '短期大学・専門学校', none: '特になし' },
    experienceOptions: { y15: '15年以上', y10: '10年〜14年', y7: '7年〜9年', y5: '5年〜6年', y3: '3年〜4年', less3: '3年未満' },
    japaneseOptions: { n1: 'N1合格 / 同等以上', n2: 'N2合格', none: 'なし' },
    bonusOptions: {
      jpGrad: '日本の大学院を修了', jpUniv: '日本の大学を卒業',
      topUniv: '世界トップ大学（QS/THS 上位300校）卒業', jpLangBonus: '日本語N1相当 + 日本の大学/大学院 修了',
      qualification: '日本国家資格（弁護士・会計士・技術士等）保有', research: '研究実績（論文3本以上）',
      patent: '特許発明 1件以上', executive: '役員経験（管理職 10年以上）',
      govProject: '日本政府関連プロジェクト従事経験', investment: '日本への投資（1,000万円以上）',
    },

    resultYourScore: 'あなたの合計ポイント',
    resultUnit: '点',
    result80: '✅ 80点以上！1年で永住申請可能です',
    result70: '✅ 70点以上！3年で永住申請可能です',
    resultUnder70: '⚠️ 70点に達していません。加点項目を確認してください',

    breakdownTitle: '内訳',
    breakdownTotal: '合計',
    breakdownLabels: { age: '🎂 年齢', salary: '💰 年収', education: '🎓 学歴', experience: '💼 実務経験', japanese: '🗾 日本語能力' },
    salaryDetail: '{salary}万円（{ageBracket}基準）',
    experienceWarning: '⚠️ 選択された年齢区分（{ageLabel}）と実務経験「{expLabel}」に矛盾があります。大卒22歳から換算して経験年数が年齢を超過しています。',
  },

  // ─── 手取り給与計算 ───
  salaryCalculator: {
    title: '💰 日本手取り給与計算',
    description: '令和7年度（2025年）税率基準。年収を入力すると手取り額を自動計算します。',
    incomeLabel: '年収（万円）',
    incomeUnit: '万円',
    over40Label: '40歳以上（介護保険料あり）',

    monthlyTakeHome: '月間手取額',
    annualTakeHome: '年間手取:',
    takeHomeRate: '手取率 {rate}%',

    thItem: '項目', thAnnual: '年間', thMonthly: '月額',
    grossIncome: '額面年収',
    employmentDeduction: '給与所得控除',
    socialInsurance: '社会保険料',
    basicDeduction: '基礎控除',
    incomeTax: '所得税 + 復興特別所得税',
    residentTax: '住民税',
    takeHome: '手取額',

    note: '⚠️ 注意: 社会保険料・住民税は概算です。実際の金額はお住まいの自治体、加入保険組合により異なります。賞与（ボーナス）を含まない月額ベースの試算です。',
  },

  // ─── 購入vs賃貸比較 ───
  rentVsBuy: {
    title: '⚖️ 買う vs 借りる 比較',
    description: '累計支出・資産形成の観点から、買うべきか・借りるべきかを比較。',

    buySectionTitle: '🏠 購入',
    rentSectionTitle: '🏢 賃貸',

    buyFields: {
      price: '物件価格（万円）', downPayment: '頭金（%）', interestRate: '住宅ローン金利（%）',
      loanYears: 'ローン年数', propertyTax: '固定資産税（%）', maintenance: '修繕・管理費（%）',
      acquisition: '購入時諸費用（%）', monthlyPayment: '月々返済額: ¥{amount}',
    },

    rentFields: {
      monthlyRent: '月額家賃（万円）', increaseRate: '家賃上昇率（%/年）', renewalFee: '更新料（ヶ月分）',
      compareYears: '比較年数',
    },

    units: { manYen: '万円', percent: '%', years: '年', months: 'ヶ月' },

    comparisonTitle: '{years}年間 累計比較',
    chartLegendBuy: '🟦 購入累計支出', chartLegendRent: '🟥 賃貸累計支出',

    thYears: '経過年数', thBuyTotal: '購入\n累計支出', thBuyEquity: '購入\n資産価値',
    thBuyNet: '購入\n実質負担', thRentTotal: '賃貸\n累計支出', thDiff: '差額\n(賃貸-購入)',

    verdictBuyBetter: '✅ {years}年後、購入の方が約{amount}万円お得',
    verdictRentBetter: '💡 {years}年後、賃貸の支出が約{amount}万円少ない',
    verdictBuyReason: '購入の場合、住宅ローン返済による資産形成効果があり、最終的な実質負担は賃貸より少なくなります。',
    verdictRentReason: '賃貸の場合、初期費用が少なく柔軟性が高いです。短期間の居住予定なら賃貸が有利です。',
    verdictDisclaimer: '実際の判断にはライフプラン（転勤の可能性、家族構成の変化等）も考慮してください。',
  },

  // ─── 住民税計算 ───
  residenceTax: {
    title: '🏛️ 住民税計算器',
    description: '年収から住民税（所得割＋均等割）を自動計算。扶養控除・社会保険料にも対応。',
    formTitle: '条件入力',
    annualIncome: '年収（額面）',
    manYen: '万円',
    ageGroup: '年齢区分',
    under40: '40歳未満',
    over40: '40歳以上',
    dependents: '扶養親族の数',
    personUnit: '人',
    resultTitle: '計算結果',
    exemptMessage: '住民税は非課税です',
    annualLabel: '住民税（年額）',
    monthlyLabel: '住民税（月額）',
    taxRate: '住民税率',
    colItem: '項目', colAmount: '金額',
    rowIncome: '給与収入', rowDeduction: '給与所得控除', rowEmploymentIncome: '給与所得',
    rowSocialInsurance: '社会保険料控除', rowBasicDeduction: '基礎控除', rowDependentDeduction: '扶養控除',
    rowTaxableIncome: '課税所得', rowIncomePortion: '所得割（10%）', rowPerCapita: '均等割（5,000円）',
    rowTotal: '住民税合計',
    noteTitle: '計算について',
    noteContent: 'この計算は概算です。実際の住民税は市区町村によって異なる場合があります。また、住宅ローン控除や医療費控除など他の控除は含まれていません。正確な金額はお住まいの市区町村の住民税決定通知書をご確認ください。',
  },

  // ─── ふるさと納税シミュレーター ───
  furusato: {
    title: '🎁 ふるさと納税シミュレーター',
    description: '年収からふるさと納税の控除限度額を計算。寄附額に対する節税効果をシミュレーション。',
    formTitle: '基本情報',
    annualIncome: '年収（額面）',
    manYen: '万円',
    ageGroup: '年齢区分',
    under40: '40歳未満',
    over40: '40歳以上',
    dependents: '扶養親族の数',
    personUnit: '人',
    limitLabel: '控除限度額の目安',
    selfPayNote: '自己負担2,000円で返礼品がもらえる上限額',
    simTitle: '寄附シミュレーション',
    donationAmount: '寄附金額',
    overLimitWarning: '限度額を超えています。超過分は自己負担となります。',
    totalDeduction: '控除合計',
    selfPayLabel: '実質自己負担',
    rowDonation: '寄附金額', rowIncomeDeduction: '所得税控除', rowResidenceTaxDeduction: '住民税控除',
    rowTotalDeduction: '控除合計',
    returnRatePrefix: '寄附金の', returnRateSuffix: 'が控除されます',
    noteTitle: '計算について',
    noteContent: 'この計算は概算です。実際の控除額は所得税率や住民税の額によって異なります。また、住宅ローン控除等の他の控除がある場合は限度額が下がる場合があります。正確な限度額は総務省のふるさと納税ポータルサイトでご確認ください。',
  },

  // ─── 都市別生活費計算 ───
  cityCost: {
    title: '🏙️ 都市別生活費計算器',
    description: '日本8都市の月額生活費を自動計算。家賃・食費・光熱費など9項目を都市別物価指数で調整し、リアルな生活費をシミュレーション。',
    formTitle: '条件選択',
    cityLabel: '居住都市',
    roomLabel: '部屋タイプ',
    lifestyleLabel: 'ライフスタイル',
    resultSuffix: 'の月額生活費',
    monthlyTotal: '月額合計',
    annualTotal: '年額合計',
    colItem: '項目', colMonthly: '月額', colRatio: '割合',
    rowRent: '家賃', rowFood: '食費', rowUtility: '水道・光熱費', rowInternet: 'インターネット',
    rowPhone: '携帯電話', rowTransport: '交通費', rowEntertainment: '娯楽・交際費',
    rowMisc: '日用品・雑費', rowInsurance: '保険・医療費', rowTotal: '合計',
    comparisonTitle: '都市間比較',
    noteTitle: '計算について',
    noteContent: 'この計算は概算です。家賃は各都市の平均的な相場を基にしています。実際の生活費は居住エリアや個人の生活習慣により大きく変動します。通学・通勤定期券の有無や会社の住宅手当も考慮していません。',
  },
}

export default ja
