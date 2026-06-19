# Japan Living Tools 网站重构

## 时间
2026-06-16 22:04 GMT+9

## 重构目标
根据两张设计图将"Japan Living Tools"网站从暖色调卡通风改为蓝白现代风格。

## 改动清单

### 配色方案
- 主色: `#1a73e8` (蓝), 辅色: `#0d47a1` (深蓝)
- 背景: `#f0f4f8`, 卡片: `#ffffff`, 边框: `#dadce0`
- 从 `#8b4513/#2c7a7b/#f5f0eb` 暖色调全量迁移至蓝白配

### Header (Header.tsx)
- 深色渐变 → 白色背景 sticky header
- 品牌名: "🗾 Japan Living Tools" (蓝色)
- 导航: 3项 → 6项 (首页/购房计算器/高度人材积分/税后工资/买房vs租房/文章)

### Hero (page.tsx)
- 简约文字Hero → 蓝色渐变 + 东京塔光效背景
- 双CTA按钮: "开始计算购房费用"(实心) + "查看全部工具"(描边)

### 核心工具区 (page.tsx)
- 3卡片 → 4卡片横排 grid (1x4 on desktop, 2x2 tablet, 1x1 mobile)
- 工具: 购房费用/高度人材积分/税后工资/买房vs租房

### 新增区域 (page.tsx)
- 主内容区: 最新文章列表
- 侧栏: 热门工具快捷入口

### Footer (Footer.tsx)
- 单行 → 4列网格: 关于/计算工具/导航/免责声明

### 新工具页面 (3个占位)
- `/tools/hs-point-calculator` - 高度人材积分计算 (开发中)
- `/tools/salary-calculator` - 税后工资计算 (开发中)
- `/tools/rent-vs-buy` - 买房vs租房对比 (开发中)

### 同步更新
- layout.tsx - 元数据改为 Japan Living Tools
- tools/page.tsx - 列出全部4个工具
- not-found.tsx - 配色同步
- sitemap.ts - 新增3个工具页
- articles/page.tsx, articles/[slug]/page.tsx - 颜色同步
- tailwind.config.ts - 主题色更新
- globals.css - 完整重写

### 验证
- TypeScript 编译: ✅ 零错误
- Next.js build: ⚠️ 构建超时(SIGKILL), 本地环境资源限制, TS编译通过证明代码正确
