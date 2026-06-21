import type { ArticleLocale } from '@/locales/types'

const articlesEn: Record<string, ArticleLocale> = {

  'japan-residence-tax-guide': {
    title: 'Japan Residence Tax: Complete Guide to Calculation, Payment & Tax-Saving Tips [2025]',
    desc: 'A clear explanation of residence tax: how it\'s calculated (income + per-capita), payment schedules, special vs ordinary collection, and available deductions.',
    content: `
<div class="article-cta-box" style="background:linear-gradient(135deg,#e8f0fe,#fff);border:2px solid #1a73e8;border-radius:16px;padding:24px 28px;margin-bottom:28px;text-align:center">
  <p style="font-size:1.05em;font-weight:700;color:#0d47a1;margin-bottom:8px">💡 Calculate Your Take-Home Pay</p>
  <p style="font-size:0.9em;color:#5f6368;margin-bottom:14px">Enter your annual income to compute residence tax, income tax, and social insurance deductions automatically.</p>
  <a href="/tools/salary-calculator" style="display:inline-block;background:#1a73e8;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:0.95em">💰 Salary Calculator →</a>
</div>

<p>If you work in Japan, you know the annual routine: <strong>every June, the residence tax notice arrives</strong>. Many are shocked by the large deduction suddenly appearing on their payslip. This article explains everything—<strong>from scratch</strong>.</p>

<h2>What Is Residence Tax?</h2>
<p>Residence tax is a <strong>local tax paid to the municipality where you lived on January 1</strong>. It\'s based on the <em>previous</em> year\'s income, creating a <strong>"previous year\'s income → next year\'s residence tax"</strong> time lag.</p>

<p>Two components:</p>
<ul>
  <li><strong>Income-based</strong>: ~10% of your previous year\'s taxable income</li>
  <li><strong>Per-capita</strong>: Flat 5,000 yen (prefectural 1,000 + municipal 3,000 + forest environment tax 1,000)</li>
</ul>

<h2>Breaking Down the Components</h2>

<h3>① Income-Based (taxable income × rate)</h3>
<table>
  <tr><th>Tax Type</th><th>Rate</th></tr>
  <tr><td>Prefectural Tax</td><td>4%</td></tr>
  <tr><td>Municipal Tax</td><td>6%</td></tr>
  <tr><td><strong>Total</strong></td><td><strong>10%</strong></td></tr>
</table>

<pre>Taxable Income = Gross Salary - Employment Deduction - Social Insurance - Basic Deduction (430k yen) - Other Deductions</pre>

<h3>② Per-Capita (flat rate)</h3>
<table>
  <tr><th>Breakdown</th><th>Annual Amount</th></tr>
  <tr><td>Prefectural per-capita</td><td>1,000 yen</td></tr>
  <tr><td>Municipal per-capita</td><td>3,000 yen</td></tr>
  <tr><td>Forest environment tax (national)</td><td>1,000 yen</td></tr>
  <tr><td><strong>Total</strong></td><td><strong>5,000 yen</strong></td></tr>
</table>

<p>The per-capita portion is <strong>exempt if your income falls below the threshold</strong>. For Tokyo\'s 23 wards: total income ≤ 350k × (self + dependents) + 310k yen annually.</p>

<h2>Calculation Walkthrough</h2>
<p>Example: Annual income ¥5M, age 35, single, Tokyo, social insurance ¥735k, no dependents</p>

<table>
  <tr><th>Step</th><th>Amount</th></tr>
  <tr><td>① Gross Salary</td><td>¥5,000,000</td></tr>
  <tr><td>② Employment Deduction (-)</td><td>¥1,540,000</td></tr>
  <tr><td>③ Employment Income (①-②)</td><td>¥3,460,000</td></tr>
  <tr><td>④ Social Insurance (-)</td><td>¥735,000</td></tr>
  <tr><td>⑤ Basic Deduction (-)</td><td>¥430,000</td></tr>
  <tr><td><strong>⑥ Taxable Income (③-④-⑤)</strong></td><td><strong>¥2,295,000</strong></td></tr>
  <tr><td>⑦ Income-based = ⑥ × 10%</td><td>¥229,500</td></tr>
  <tr><td>⑧ Per-capita</td><td>¥5,000</td></tr>
  <tr><td><strong>⑨ Annual Total (⑦+⑧)</strong></td><td><strong>¥234,500</strong></td></tr>
  <tr><td>Monthly (÷12)</td><td>~¥19,500</td></tr>
</table>

<div class="article-data" style="background:#f8f9fa;border-radius:12px;padding:20px 24px;margin:20px 0;border-left:4px solid #1a73e8">
  <p style="font-weight:700;margin-bottom:8px;color:#0d47a1">📊 Residence Tax by Income (Single, No Dependents, Tokyo)</p>
  <table style="margin:0">
    <tr><th>Annual Income</th><th>Residence Tax (Year)</th><th>Monthly</th><th>Take-Home%</th></tr>
    <tr><td>¥3M</td><td>~¥108k</td><td>~¥9k</td><td>~82%</td></tr>
    <tr><td>¥4M</td><td>~¥166k</td><td>~¥13.8k</td><td>~80%</td></tr>
    <tr><td>¥5M</td><td>~¥234.5k</td><td>~¥19.5k</td><td>~78%</td></tr>
    <tr><td>¥6M</td><td>~¥310k</td><td>~¥25.8k</td><td>~76%</td></tr>
    <tr><td>¥8M</td><td>~¥480k</td><td>~¥40k</td><td>~73%</td></tr>
    <tr><td>¥10M</td><td>~¥660k</td><td>~¥55k</td><td>~70%</td></tr>
  </table>
  <p style="font-size:0.82em;color:#5f6368;margin-top:8px">※ Estimates only. Actual amounts vary by municipality and deductions.</p>
</div>

<h2>Special vs. Ordinary Collection</h2>
<h3>Special Collection (payroll deduction)</h3>
<p>12 installments from June to May, automatically deducted from salary. Company employees default to this.</p>
<ul>
  <li>✅ Pro: No manual payment needed</li>
  <li>⚠️ Note: Take-home pay drops starting June</li>
</ul>
<h3>Ordinary Collection (self-payment)</h3>
<p>4 installments per year (June, August, October, January). For freelancers or after job changes.</p>

<h2>The "Second-Year Shock"</h2>
<ul>
  <li>Year 1: little to no prior Japanese income → minimal residence tax</li>
  <li>Year 2: based on a full year of working → <strong>spikes significantly</strong></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Q. Is Furusato Nozei connected to residence tax?</h3>
<p>Yes. Furusato Nozei functions as a residence tax deduction. Within your limit, you pay only ¥2,000 out of pocket for return gifts.</p>
`,
  },

  'japan-cost-of-living': {
    title: 'Japan Cost of Living 2025: Real Expenses from Groceries to Utilities',
    desc: 'How much does it really cost to live in Japan per month? We break down groceries, utilities, dining out, and transportation item by item.',
    content: `
<p>Before moving to Japan, almost everyone asks: <strong>"How much does it really cost to live in Japan per month?"</strong> Here\'s a clear reference.</p>

<h2>1. Food & Daily Goods</h2>
<h3>Staple Ingredients (Tokyo, June 2025)</h3>
<ul>
  <li>Rice 5kg: 2,200~2,800 yen</li>
  <li>Sliced bread (8 slices): 120~180 yen</li>
  <li>Eggs (10-pack, L): 210~320 yen</li>
  <li>Milk 1L: 190~260 yen</li>
  <li>Chicken breast 100g: 80~110 yen</li>
  <li>Pork belly 100g: 180~250 yen</li>
  <li>Beef 100g: 300~600 yen</li>
  <li>Salmon fillet: 250~400 yen</li>
  <li>Tofu 300g: 50~80 yen</li>
</ul>

<h3>Eating Out</h3>
<ul>
  <li>Gyudon (regular): 498 yen</li>
  <li>Ramen: 850~1,200 yen</li>
  <li>Teishoku set meal: 650~1,100 yen</li>
  <li>Conveyor sushi/plate: 110~330 yen</li>
  <li>Izakaya/person: 3,000~5,000 yen</li>
</ul>

<h2>2. Housing</h2>
<h3>Tokyo Area (1K~1DK, ~25m²/monthly)</h3>
<ul>
  <li>Inside Yamanote Line: 90k~150k yen</li>
  <li>Outside Yamanote: 65k~95k yen</li>
  <li>Saitama/Chiba (30min commute): 40k~60k yen</li>
</ul>
<h3>Other Cities</h3>
<ul>
  <li>Osaka center: 55k~80k yen</li>
  <li>Nagoya center: 50k~70k yen</li>
  <li>Fukuoka center: 45k~65k yen</li>
  <li>Sapporo center: 35k~55k yen</li>
</ul>

<h2>3. Utilities</h2>
<table>
  <tr><th>Item</th><th>Single/Month</th></tr>
  <tr><td>Electricity</td><td>5,000~8,000 yen</td></tr>
  <tr><td>Gas</td><td>2,500~5,000 yen</td></tr>
  <tr><td>Water</td><td>2,000~3,000 yen</td></tr>
  <tr><td>Internet (fiber)</td><td>4,000~5,500 yen</td></tr>
  <tr><td>Mobile (MVNO)</td><td>1,500~3,000 yen</td></tr>
</table>

<h2>4. Transportation</h2>
<ul>
  <li>Train starting fare: 130~200 yen</li>
  <li>Inner-city commuter pass: ~5,000 yen/month</li>
  <li>Taxi flagfall: 500 yen</li>
</ul>
<p>Most companies fully reimburse commuter passes.</p>

<h2>5. Sample Monthly Budget (Single, Tokyo)</h2>
<table>
  <tr><th>Category</th><th>Frugal</th><th>Standard</th><th>Comfortable</th></tr>
  <tr><td>Rent</td><td>60,000</td><td>85,000</td><td>130,000</td></tr>
  <tr><td>Food</td><td>25,000</td><td>40,000</td><td>70,000</td></tr>
  <tr><td>Utilities</td><td>10,000</td><td>13,000</td><td>18,000</td></tr>
  <tr><td>Telecom</td><td>5,000</td><td>8,000</td><td>12,000</td></tr>
  <tr><td>Entertainment</td><td>10,000</td><td>25,000</td><td>50,000</td></tr>
  <tr><td><strong>Total</strong></td><td><strong>126,000</strong></td><td><strong>198,000</strong></td><td><strong>330,000</strong></td></tr>
</table>
`,
  },

  'japan-home-buying-guide': {
    title: 'Japan Home Buying Guide: From House Hunting to Getting the Keys',
    desc: 'What restrictions do foreigners face buying property in Japan? How to get a mortgage? What taxes and fees apply? Complete walkthrough.',
    content: `
<p>Japan has <strong>no nationality restrictions</strong> on property purchase. But <strong>buying ability ≠ mortgage ability</strong>—loans are the real hurdle for foreign buyers.</p>

<h2>1. Foreign Buyer Basics</h2>
<ul>
  <li>✅ Freehold land (permanent ownership vs China\'s 70-year use right)</li>
  <li>✅ Condominiums</li>
  <li>✅ Investment properties</li>
  <li>❌ Farmland (requires special approval)</li>
  <li>❌ Buying ≠ getting a visa (no "property visa" in Japan)</li>
</ul>

<h2>2. 6-Step Purchase Process</h2>
<h3>Step 1: Budget & Pre-Approval (1~2 weeks)</h3>
<p>Get <strong>pre-approval</strong> from a bank. Permanent residents: rates as low as 0.3%. Work visa: Bank of China Tokyo branch, rates ~1.5~2.5%, 30%+ down payment.</p>

<h3>Step 2: Property Search (2~4 weeks)</h3>
<p>SUUMO, HOME\'S, at home — Japan\'s top 3 portals. Check <strong>hazard maps</strong> before viewing.</p>

<h3>Step 3: Offer & Negotiation (1 week)</h3>
<p>Submit a <strong>purchase offer</strong>. New builds rarely negotiable; existing homes have more room.</p>

<h3>Step 4: Contract (1 day)</h3>
<p>Mandatory <strong>important matters explanation</strong>. Deposit typically 5~10% of price.</p>

<h3>Step 5: Final Loan Approval (1~2 weeks)</h3>
<p>Submit residence certificate, tax certificate, withholding slip.</p>

<h3>Step 6: Settlement (1 day)</h3>
<p>Judicial scrivener oversees: loan funds → remaining payment → registration → keys.</p>

<h2>3. Taxes & Fees Breakdown</h2>
<ul>
  <li><strong>Stamp duty</strong> on contract</li>
  <li><strong>Registration & license tax</strong>: assessed value × 2%</li>
  <li><strong>Property acquisition tax</strong>: assessed value × 3% (~6 months after purchase)</li>
  <li><strong>Fixed asset tax</strong>: assessed value × 1.4% (annual)</li>
  <li><strong>City planning tax</strong>: assessed value × 0.3% (annual)</li>
</ul>

<h2>4. Agent Fee</h2>
<p>Legal maximum: <code>price × 3.3% + ¥66,000</code>. Example: ¥20M → ¥726,000.</p>

<h2>5. Mortgages</h2>
<p><strong>Flat35</strong>: Government-backed fixed-rate, up to 35 years, ~1.8~2.1%.</p>
<p><strong>Variable</strong>: Major banks ~0.3~0.6% (permanent residents). Reassessed every 6 months.</p>

<h2>6. Rent vs Buy Decision</h2>
<p>If staying <strong>7+ years</strong> with stable income, buying typically beats renting. Use our <a href="/tools/rent-vs-buy">Rent vs Buy Calculator</a>.</p>
`,
  },

  'japan-salary-guide': {
    title: 'Japan Salary Guide 2025: Industry Pay & Take-Home Amounts Explained',
    desc: 'Average salary by industry, deductions breakdown, and how much you actually take home after taxes and social insurance.',
    content: `
<p>What\'s the real salary landscape in Japan? Data from MHLW and NTA surveys.</p>

<h2>1. Average Salary</h2>
<ul>
  <li>Overall average: <strong>~¥4.58M</strong></li>
  <li>Male average: ~¥5.45M</li>
  <li>Female average: ~¥3.02M</li>
  <li>Full-time employees: ~¥5.23M</li>
  <li><strong>Median: ~¥3.74M</strong> (50% earn below this)</li>
</ul>

<h2>2. Average by Industry</h2>
<table>
  <tr><th>Industry</th><th>Average (M yen)</th></tr>
  <tr><td>IT/Telecom</td><td>6.80</td></tr>
  <tr><td>Finance/Insurance</td><td>6.56</td></tr>
  <tr><td>Professional Services</td><td>6.10</td></tr>
  <tr><td>Manufacturing</td><td>5.10</td></tr>
  <tr><td>Construction</td><td>5.05</td></tr>
  <tr><td>Education</td><td>4.85</td></tr>
  <tr><td>Healthcare/Welfare</td><td>4.05</td></tr>
  <tr><td>Retail</td><td>3.90</td></tr>
  <tr><td>Food/Hotel</td><td>3.05</td></tr>
</table>

<h2>3. IT Salary Tiers</h2>
<ul>
  <li>SES/Dispatch 2~3yr: ¥3.5~5M</li>
  <li>In-house Mid 4~6yr: ¥5~7M</li>
  <li>In-house Senior 7~10yr: ¥7~10M</li>
  <li>Tech Lead/Manager: ¥9~13M</li>
  <li>FAANG Japan L4: ¥10~15M, L5: ¥15~22M</li>
</ul>

<h2>4. Take-Home Calculation</h2>
<p>Social insurance ~14~15%, income tax (5~45% progressive + 2.1% surtax), residence tax ~10% + ¥5,000 flat.</p>

<h2>5. Example: ¥5M → ¥3.88M take-home (~77.5%)</h2>
<p>Monthly: ~¥323k net. Try our <a href="/tools/salary-calculator">Salary Calculator</a>.</p>

<h2>6. Tips to Increase Income</h2>
<ol>
  <li><strong>Job-hop</strong>: 10~30% typical raise in Japan</li>
  <li><strong>English + Japanese</strong>: bilingual = rare, salary premium</li>
  <li><strong>International qualifications</strong>: TOEIC, PMP, USCPA</li>
  <li><strong>Avoid seniority-based traditional companies</strong></li>
</ol>
`,
  },

  'japan-visa-guide': {
    title: 'Japan Visa Guide: From Student to Permanent Residency',
    desc: 'Types of Japanese visas, conditions, and the typical path from student to permanent resident. All residence statuses explained.',
    content: `
<p>Japan\'s visa system: <strong>each residence status permits a specific set of activities</strong>.</p>

<h2>1. Residence Status Overview (~29 types)</h2>
<h3>Activity-Based (restricted)</h3>
<ul>
  <li>Work: Engineer/Specialist in Humanities/Int\'l Services, Skilled Labor, Intra-company Transferee, Highly Skilled Professional, Specified Skilled Worker</li>
  <li>Study/Training: Student, Trainee, Dependent</li>
</ul>
<h3>Status-Based (unrestricted)</h3>
<ul>
  <li>Permanent Resident, Spouse of PR, Spouse of Japanese National, Long-term Resident</li>
</ul>

<h2>2. Key Work Visas</h2>
<h3>Engineer/Specialist in Humanities/Int\'l Services</h3>
<p>Requirements: ① University degree or 10+ years of experience ② Japanese employer ③ Job relevance to education ④ Salary ≥ equivalent Japanese worker.</p>

<h3>Highly Skilled Professional (points-based)</h3>
<ul>
  <li><strong>70+ points</strong> → eligible for PR after 3 years</li>
  <li><strong>80+ points</strong> → eligible for PR after 1 year</li>
</ul>
<p>Use the <a href="/tools/hs-point-calculator">HS Point Calculator</a>.</p>

<h2>3. PR Application Conditions</h2>
<ol>
  <li><strong>Good conduct</strong>: no criminal record, taxes paid on time</li>
  <li><strong>Independent livelihood</strong>: stable income or assets</li>
  <li><strong>National interest</strong>: 10+ years continuous residence (shortened under HSP)</li>
</ol>

<h2>4. Typical Paths</h2>
<p>Path A: Student → Engineer → PR (~8~10 years)</p>
<p>Path B: Student → Engineer → HSP → PR (~7~8 years)</p>
<p>Path C: Direct → HSP → PR (~2~3 years with 80+ points)</p>

<h2>5. Common Rejection Reasons</h2>
<ol>
  <li>Degree-job mismatch</li>
  <li>Tax/pension arrears</li>
  <li>Long absences from Japan</li>
  <li>Not reporting job changes to Immigration</li>
</ol>
<p><strong>Most important</strong>: lawful, honest, pay taxes on time — the foundation for every application.</p>
`,
  },

  'japan-furusato-nozei-guide': {
    title: 'Furusato Nozei Guide: How It Works, Tax Savings & Limits',
    desc: 'The mechanism behind Japan\'s hometown tax donation system, how to calculate your limit, and how to get the best return gifts.',
    content: `
<p><strong>Furusato Nozei</strong> is Japan\'s unique hometown tax donation: donate to any municipality, deduct from taxes, and receive local specialty gifts. Essentially: ¥2,000 for goods worth tens of thousands of yen.</p>

<h2>1. How It Works</h2>
<ol>
  <li><strong>Donate</strong>: Choose municipality and gift on sites like Furusato Choice</li>
  <li><strong>Receive gift</strong>: Wagyu, rice, seafood, electronics, etc.</li>
  <li><strong>Tax deduction</strong>: Donation minus ¥2,000 deducted from income tax (current year) and residence tax (following year)</li>
</ol>

<h2>2. Donation Limit</h2>
<table>
  <tr><th>Annual Income</th><th>Single Limit</th><th>Couple+1 Child</th></tr>
  <tr><td>¥3M</td><td>~¥28k</td><td>~¥19k</td></tr>
  <tr><td>¥5M</td><td>~¥61k</td><td>~¥46k</td></tr>
  <tr><td>¥7M</td><td>~¥108k</td><td>~¥86k</td></tr>
  <tr><td>¥10M</td><td>~¥177k</td><td>~¥149k</td></tr>
</table>
<p>Exceeding your limit means partial loss of deduction. Use our <a href="/tools/furusato-calculator">Furusato Nozei Calculator</a>.</p>

<h2>3. One-Stop Exception</h2>
<p>Skip the year-end tax return. Requirements: ≤ 5 municipalities donated to, employed (no other filing needs), submit simplified declaration to each municipality.</p>

<h2>4. Important Notes</h2>
<ol>
  <li>Must donate within calendar year (Jan 1~Dec 31)</li>
  <li>Limit is a hard cap — excess not deductible</li>
  <li>Recalculate limit when income changes</li>
  <li>Gift value ≤ 30% of donation (regulation)</li>
  <li>Reduces your local municipality\'s tax revenue</li>
</ol>

<h2>5. Who Benefits Most</h2>
<ul>
  <li>✅ Annual income ¥4M+</li>
  <li>✅ Company employees (one-stop easy)</li>
  <li>✅ Love regional specialties</li>
  <li>⚠️ Freelancers (need tax return)</li>
  <li>⚠️ Below ¥3M (low limit, limited gift choice)</li>
</ul>
`,
  },

  'japan-city-cost-comparison': {
    title: 'Japan Major Cities Cost Comparison: How Much Can You Save?',
    desc: 'Tokyo, Osaka, Nagoya, Fukuoka, Sapporo — compare living costs across Japan\'s top cities and find the best value for your salary.',
    content: `
<p>The same salary, vastly different quality of life. Cities ranked by living costs:</p>

<h2>1. Monthly Living Costs (Single Person)</h2>
<table>
  <tr><th>Category</th><th>Tokyo 23W</th><th>Osaka</th><th>Nagoya</th><th>Fukuoka</th><th>Sapporo</th></tr>
  <tr><td>Rent (1K)</td><td>90,000</td><td>60,000</td><td>58,000</td><td>50,000</td><td>42,000</td></tr>
  <tr><td>Food</td><td>45,000</td><td>38,000</td><td>37,000</td><td>35,000</td><td>35,000</td></tr>
  <tr><td>Utilities</td><td>13,000</td><td>12,000</td><td>12,000</td><td>11,000</td><td>14,000*</td></tr>
  <tr><td>Transport</td><td>10,000</td><td>8,000</td><td>7,000</td><td>6,000</td><td>8,000</td></tr>
  <tr><td>Misc</td><td>57,000</td><td>53,000</td><td>53,000</td><td>49,000</td><td>48,000</td></tr>
  <tr><td><strong>Total</strong></td><td><strong>215,000</strong></td><td><strong>171,000</strong></td><td><strong>167,000</strong></td><td><strong>151,000</strong></td><td><strong>147,000</strong></td></tr>
</table>
<p>* Sapporo: higher winter heating costs</p>

<h2>2. ¥5M Salary: Monthly Savings</h2>
<table>
  <tr><th>City</th><th>Take-Home</th><th>Living Cost</th><th>Savings/Mo</th><th>Rate</th></tr>
  <tr><td>Tokyo 23W</td><td>¥323k</td><td>¥215k</td><td><strong>¥108k</strong></td><td>33%</td></tr>
  <tr><td>Osaka</td><td>¥323k</td><td>¥171k</td><td><strong>¥152k</strong></td><td>47%</td></tr>
  <tr><td>Nagoya</td><td>¥323k</td><td>¥167k</td><td><strong>¥156k</strong></td><td>48%</td></tr>
  <tr><td>Fukuoka</td><td>¥323k</td><td>¥151k</td><td><strong>¥172k</strong></td><td>53%</td></tr>
  <tr><td>Sapporo</td><td>¥323k</td><td>¥147k</td><td><strong>¥176k</strong></td><td>54%</td></tr>
</table>
<p><strong>Key finding</strong>: Sapporo saves ~¥70k/month more than Tokyo — ¥840k/year difference!</p>

<h2>3. City Profiles</h2>
<h3>Tokyo — Best for high earners</h3>
<ul>
  <li>Best for: ¥6M+ earners in IT, finance, consulting</li>
  <li>Unmatched career opportunities</li>
  <li>Downside: highest rent, packed trains</li>
</ul>
<h3>Osaka — Best value metro</h3>
<ul>
  <li>Best for: ¥4~6M earners valuing livability</li>
  <li>Rent ~70% of Tokyo, amazing food scene</li>
</ul>
<h3>Fukuoka — Rising tech hub</h3>
<ul>
  <li>Best for: Startups, 20s~30s professionals</li>
  <li>Low rent, compact city, near airport</li>
</ul>
<h3>Sapporo — Lowest cost of living</h3>
<ul>
  <li>Best for: Cold-tolerant remote workers, ski lovers</li>
  <li>Japan\'s cheapest rents, great food/nature</li>
  <li>Downside: high winter heating, winter transport</li>
</ul>

<h2>4. Decision Framework</h2>
<ol>
  <li><strong>Industry/job</strong> — Where are the roles?</li>
  <li><strong>Salary median</strong> — What\'s the market rate for your role in each city?</li>
  <li><strong>Net surplus</strong> — Income minus living costs. Try our <a href="/tools/city-cost-calculator">City Cost Calculator</a>.</li>
  <li><strong>Lifestyle preference</strong> — Urban buzz or nature? Climate?</li>
</ol>
`,
  },
}

export default articlesEn
