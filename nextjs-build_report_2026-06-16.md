# Next.js + Cloudflare Pages 迁移 — 构建完成

## 成果

| 指标 | 值 |
|------|----|
| 框架 | Next.js 15.4.11 |
| 构建结果 | ✅ 编译 + 类型检查 + 静态导出全部通过 |
| 导出目录 | `my-website/out/` |
| 总页数 | 10 |
| 计算器JS | 6.27 kB (gzipped ~2 kB) |
| CSS文件 | 2 bundle |

## 项目结构

```
my-website/
├── app/
│   ├── layout.tsx          ← 全局布局（GA/AdSense/SearchConsole meta注入）
│   ├── globals.css          ← 全局样式 + 卡片hover + .tag + prose
│   ├── page.tsx             ← 首页（三卡片：计算器/文章/工具集）
│   ├── not-found.tsx        ← 404
│   ├── robots.ts            ← robots.txt（声明了 force-static）
│   ├── sitemap.ts           ← sitemap.xml（动态遍历文章列表）
│   ├── components/          ← 共享组件
│   │   ├── LoanCalculator.tsx   ← 买房计算器核心（全逻辑）
│   │   ├── LoanCalculator.module.css
│   │   ├── GoogleAnalytics.tsx
│   │   ├── GoogleAdsense.tsx
│   │   └── SearchConsole.tsx
│   ├── articles/
│   │   ├── page.tsx         ← 文章列表页
│   │   └── [slug]/page.tsx  ← 文章详情页（unified→HTML渲染）
│   └── tools/
│       ├── page.tsx         ← 工具集列表
│       └── house-calculator/page.tsx  ← 计算器页面
├── content/articles/        ← MDX/MD 文章目录
│   └── hello-world.mdx      ← 示例文章
├── lib/
│   └── articles.ts          ← 文章元数据遍历工具
├── next.config.mjs          ← output: 'export' + MDX插件配置
├── tailwind.config.ts
├── postcss.config.mjs
└── package.json
```

## 构建中解决的问题

1. **TypeScript discriminated union** — `selfRepairReservePerMonth` 不存在于 mansion 分支，改用 `CONFIG.house.xxx` 直接引用
2. **Static export + robots/sitemap** — 添加 `export const dynamic = 'force-static'`
3. **`onMouseEnter`/`onMouseLeave` in Server Components** — 全部改为 CSS `:hover` 方案
4. **`<style jsx>` → `styled-jsx` client-side only** — 改用全局 CSS class + `:hover`
5. **`next-mdx-remote` v5 React 版本冲突** — 弃用，改用 `unified` + `remark` → `rehype` 管线编译 MDX→HTML
6. **Article [slug] params 为 Promise** — 适配 Next.js 15 async params

## 部署方式

```bash
cd my-website
npx wrangler pages deploy out --project-name=my-website
```

或通过 Cloudflare Dashboard 关联 GitHub 仓库后 `npx next build && npx wrangler pages deploy out`。
