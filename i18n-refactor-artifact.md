# i18n-ize All Tool Calculator Pages — Completion Report

## Objective
Refactor 4 tool calculator pages to use the existing `useT()` i18n hook instead of hardcoded mixed-language UI strings.

## Files Modified

### 1. `locales/types.ts` — Extended `LocaleDict` interface
Added 4 new sections with full TypeScript interfaces:
- `HouseCalculatorDict` — 购房费用计算器 (Home Purchase Cost Calculator)
- `HsPointCalculatorDict` — 高度人材积分计算器 (HSFP Points Calculator)
- `SalaryCalculatorDict` — 税后工资计算器 (Take-home Pay Calculator)
- `RentVsBuyDict` — 买房vs租房对比 (Rent vs Buy Comparison)

### 2. `locales/zh.ts` — Chinese translations (~11.5KB)
All UI strings across all 4 calculators, with mixed Japanese/Chinese labels where appropriate.

### 3. `locales/ja.ts` — Japanese translations (~11.6KB)
Pure Japanese translations for all calculator UI strings.

### 4. `locales/en.ts` — English translations (~17.5KB)
Full English translations with accurate tax/visa/real estate terminology.

### 5. `app/components/LoanCalculator.tsx` (24KB → 22KB)
- Added `'use client'` and `useT()` import
- All hardcoded strings replaced with `t.houseCalculator.*` references
- Form labels, tips, table headers, summary cards, accordion content, burden rate messages
- RowItem labels/formulas/notes sourced from locale dict
- Template strings (`{loanRatio}`, `{priceMan}`, etc.) preserved with `.replace()`

### 6. `app/tools/hs-point-calculator/page.tsx` (18KB → 16KB)
- Converted education/experience options to key-based lookup using locale dict
- All labels, descriptions, notes, bonus option labels from `t.hsPointCalculator.*`
- Age bracket labels, result messages, breakdown labels, experience warning template

### 7. `app/tools/salary-calculator/page.tsx` (11KB → 10.6KB)
- All table headers, row labels, result labels from `t.salaryCalculator.*`
- Take-home rate template string with `{rate}` placeholder

### 8. `app/tools/rent-vs-buy/page.tsx` (14KB → 14KB)
- All field labels, section titles, chart legends, table headers from `t.rentVsBuy.*`
- Verdict messages with template strings (`{years}`, `{amount}`)
- Unit strings and monthly payment template

## Verification
```
npx tsc --noEmit  →  PASS (zero errors)
```

## Design Decisions
- Each calculator's i18n keys are nested under the calculator name (e.g., `t.houseCalculator.purchase.items.agentFee.label`)
- Template strings (e.g., `{loanRatio}`, `{amount}`) are stored in locale files and populated at runtime via `.replace()`
- Dynamic formulas (e.g., acquisition tax rate) use `formulaPrefix` + computed suffix pattern
- No calculation logic or UI structure was changed
- The `house-calculator/page.tsx` metadata wrapper was left unchanged (it's a server component for SEO only)
