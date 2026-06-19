# Japan Living Tools — 站点架构 v2

## 核心目标
1. **手机端友好** — 核心操作 2 步内触达，不依赖横向滚动
2. **AI/LLM 可检索** — 结构化语义标记 + JSON-LD + API 端点，让 ChatGPT / Gemini 能直接消费工具数据

---

## 一、信息架构 (Sitemap)

```
🏠 首页 (/)
├── 🧮 计算工具 (/tools)
│   ├── 💰 税后工资      /tools/salary-calculator
│   ├── 📊 高度人材积分  /tools/hs-point-calculator
│   ├── 🏠 购房费用      /tools/house-calculator
│   ├── ⚖️ 买房vs租房   /tools/rent-vs-buy
│   ├── 🎁 ふるさと納税  /tools/furusato-nozei        ← 新建
│   ├── 📋 住民税简易    /tools/residence-tax          ← 新建
│   └── 🏙️ 都市生活費   /tools/city-compare           ← 新建
├── 📝 实用文章 (/articles)
│   ├── [slug]           5篇现有 + 持续新增
│   └── 🔍 按标签过滤   /articles?tag=tax
├── 📊 API (LLM 可消费) ← 新建
│   ├── GET /api/v1/tools/salary          年收→手取り JSON
│   ├── GET /api/v1/tools/hs-points       积分明细 JSON
│   ├── GET /api/v1/tools/house-cost      购房费用明细 JSON
│   ├── GET /api/v1/tools/rent-vs-buy     租房vs购房对比 JSON
│   ├── GET /api/v1/static/residence-tax  住民税率表
│   └── GET /api/v1/static/city-data      都市生活数据
└── 📄 静态页
    ├── sitemap.xml
    ├── robots.txt
    └── googlec2a7130db270ea35
```

---

## 二、手机端导航设计

### 当前问题
- 顶部 6 个 nav link → 汉堡菜单可接受但不够便捷
- 工具页之间跳转需回到首页

### 改进方案：底部 Tab Bar（推荐）

```
┌─────────────────────────────┐
│  🗾 Japan Living Tools  🌐 │ ← Header（毛玻璃）
├─────────────────────────────┤
│                             │
│  [页面内容区域]              │
│  工具 / 文章 / 结果         │
│                             │
├─────────────────────────────┤
│  🏠       🧮       📝       │ ← Bottom Tab Bar
│ 首页    工具    文章        │   固定底部
└─────────────────────────────┘
```

各 Tab 行为：
- **首页** → 当前首页（Hero + 工具卡片 + 文章列表）
- **工具** → 全屏工具Grid，可快速切换计算器
- **文章** → 文章列表

实现：`app/layout.tsx` 中添加 `<BottomNav />` 组件，768px 以下显示。用 CSS `position: fixed; bottom: 0` + `safe-area-inset-bottom` 适配刘海屏。

### Header 改为紧凑模式（手机）
- Logo 保留
- 语言切换 → icon only 🌐
- 导航 link → 全部移入底部 Tab
- 汉堡菜单保留放次要链接（关于、隐私政策等）

---

## 三、AI/LLM 检索优化

### 3.1 每页 JSON-LD 结构化数据

工具页示例（工资计算器）：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "税后工资计算器",
  "description": "基于令和7年度税率，输入年收入自动计算日本税后到手金额",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY" },
  "browserRequirements": "Requires JavaScript"
}
</script>
```

文章页示例：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "住民税とは？計算方法・支払い時期を完全解説",
  "datePublished": "2025-06-18",
  "dateModified": "2025-06-18",
  "author": { "@type": "Organization", "name": "Japan Living Tools" },
  "publisher": { "@type": "Organization", "name": "Japan Living Tools" },
  "description": "住民税の仕組みから計算方法、支払い時期まで",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://japan-living-tools.vercel.app/articles/japan-residence-tax-guide" }
}
</script>
```

FAQ 页（文章底部 FAQ）：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "住民税はいつからいつまで？",
      "acceptedAnswer": { "@type": "Answer", "text": "住民税の年度は6月～翌年5月です..." } },
    { "@type": "Question", "name": "転職すると住民税はどうなる？",
      "acceptedAnswer": { "@type": "Answer", "text": "前職の給与所得者異動届出書を転職先に提出します..." } }
  ]
}
</script>
```

### 3.2 API 端点（LLM 直接消费）

`/api/v1/tools/salary?income=500&age=35&lang=ja` 返回：

```json
{
  "tool": "salary-calculator",
  "version": "1.0.0",
  "input": {
    "annualIncome": 5000000,
    "age": 35,
    "currency": "JPY"
  },
  "output": {
    "grossAnnual": 5000000,
    "grossMonthly": 416667,
    "deductions": {
      "employmentIncomeDeduction": 1540000,
      "socialInsurance": 735000,
      "basicDeduction": 480000
    },
    "taxableIncome": 2245000,
    "incomeTax": 148000,
    "residentTax": 234500,
    "netAnnual": 3882500,
    "netMonthly": 323542
  },
  "meta": {
    "taxYear": 2025,
    "sources": ["国税庁 令和7年分 源泉徴収税額表", "総務省 個人住民税"],
    "disclaimer": "概算であり実際の税額とは異なる場合があります"
  }
}
```

**为什么重要**：
- ChatGPT/Gemini/Perplexity 可以通过 Function Calling 调用这些 API
- Google 索引到结构化 JSON 后会在搜索结果展示 Rich Snippet
- 第三方网站可以嵌入你的计算器（提高外链/权重）

### 3.3 语义 HTML 增强

每个工具结果区使用 `<data>` 元素：

```html
<data class="calc-result" value="323542" data-unit="JPY" data-period="monthly">
  ¥323,542
</data>
```

每个数据点明确标记：
```html
<dl class="breakdown">
  <dt>课税所得</dt>
  <dd><data value="2245000">¥2,245,000</data></dd>
  <dt>所得税</dt>
  <dd><data value="148000">¥148,000</data></dd>
</dl>
```

AI 爬虫能精确解析 `<data>` 和 `<dl>` 的语义，直接从页面提取结构化数据。

---

## 四、URL 设计规范

```
/tools/{kebab-case}           — 工具页
/articles/{kebab-case}        — 文章页
/api/v1/tools/{name}          — API 端点
/api/v1/static/{dataset}      — 静态数据 API
```

关键原则：
- URL 中不含查询参数作为内容区分（不利于 SEO）
- 每个工具独立页面 = 独立着陆页 = 独立 SEO
- API 版本化（v1）为未来兼容

---

## 五、文件结构建议

```
app/
├── layout.tsx                  # Root layout（含 Header + BottomNav + Footer）
├── page.tsx                    # 首页
├── globals.css
├── not-found.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BottomNav.tsx           ← 新建：底部 Tab Bar
│   ├── JsonLd.tsx              ← 新建：JSON-LD 注入组件
│   └── StructuredData.tsx      ← 新建：<data>/<dl> 包装组件
├── tools/
│   ├── page.tsx                # 工具总览
│   ├── salary-calculator/
│   │   └── page.tsx
│   ├── hs-point-calculator/
│   │   └── page.tsx
│   ├── house-calculator/
│   │   └── page.tsx
│   ├── rent-vs-buy/
│   │   └── page.tsx
│   ├── furusato-nozei/         ← 新建
│   │   └── page.tsx
│   ├── residence-tax/          ← 新建
│   │   └── page.tsx
│   └── city-compare/           ← 新建
│       └── page.tsx
├── articles/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── api/
    └── v1/
        ├── tools/
        │   ├── salary/route.ts    ← 新建
        │   ├── hs-points/route.ts ← 新建
        │   ├── house-cost/route.ts← 新建
        │   └── rent-vs-buy/route.ts←新建
        └── static/
            ├── tax-rates/route.ts ← 新建
            └── city-data/route.ts ← 新建
```

---

## 六、实施优先级

### Phase 1：本周
1. **JSON-LD 注入** — `JsonLd.tsx` 组件，文章页 + 工具页各加 Schema
2. **BottomNav** — 底部 Tab Bar（先做首页/工具/文章三Tab）
3. **语义 HTML 改造** — 工具结果区改用 `<data>` + `<dl>`

### Phase 2：两周内
4. **API v1 端点** — 4个工具各暴露 JSON API
5. **sitemap.xml 动态生成** — 自动包含所有工具+文章

### Phase 3：一个月内
6. **新工具上线** — ふるさと納税 / 住民税计算 / 都市比较
7. **文章系统升级** — 标签过滤、搜索、相关推荐
