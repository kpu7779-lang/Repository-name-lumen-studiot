# Lumen Studio · Photography Portfolio

独立摄影师作品集网站，杂志风高端设计，支持中英文双语、深浅色主题、响应式布局。

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ 特性

- **设计**：杂志风字号阶梯、grayscale→color 图片 hover、自定义磁吸光标、滚动进度条
- **动画**：framer-motion 视差 / Reveal / Stagger / layout 动画
- **国际化**：next-intl 中英文双语，localStorage 持久化
- **主题**：next-themes 深浅色切换
- **响应式**：mobile / tablet / desktop 三档断点
- **SEO**：完整 metadata、JSON-LD 结构化数据、sitemap.xml、robots.txt
- **表单**：react-hook-form + zod 校验 + Resend 邮件 API

## 🚀 快速开始

```bash
# 安装依赖
bun install   # 或 npm install

# 复制环境变量
cp .env.example .env.local

# 启动开发
bun run dev   # 或 npm run dev

# 打开 http://localhost:3000
```

## 📦 部署

参考 [DEPLOY.md](./DEPLOY.md) 的"5 分钟最快路径"部署到 Vercel。

## 📁 项目结构

```
src/
├── app/
│   ├── layout.tsx           # 根布局：字体、Provider、metadata、JSON-LD
│   ├── page.tsx             # 单页应用：10 个区块
│   ├── globals.css          # 主题色、字号阶梯、动画工具类
│   ├── sitemap.ts           # 动态 sitemap
│   ├── robots.ts            # robots.txt
│   └── api/contact/route.ts # Resend 邮件 API
├── components/
│   ├── header.tsx           # 序号导航 + 滚动收缩
│   ├── footer.tsx           # 大字 CTA + 多列
│   ├── custom-cursor.tsx    # 自定义磁吸光标
│   ├── scroll-progress.tsx  # 顶部进度条
│   ├── reveal.tsx           # Reveal/Stagger 动画组件
│   ├── lightbox.tsx         # 作品详情查看器
│   └── sections/            # 10 个区块组件
├── i18n/                    # i18n Provider 与 hook
├── lib/
│   ├── types.ts             # 类型定义
│   ├── photos-data.ts       # 作品数据
│   └── photos.ts            # 数据访问层
└── messages/                # zh.json + en.json
```

## 🎨 自定义

| 修改内容 | 文件位置 |
|---------|---------|
| 作品数据 | `src/lib/photos-data.ts` |
| 文案翻译 | `messages/zh.json` / `messages/en.json` |
| 主题色 | `src/app/globals.css` 中的 `:root` / `.dark` |
| 字体 | `src/app/layout.tsx` 的 `next/font` |
| 服务报价 | `src/components/sections/services.tsx` |
| 客户证言 | `src/components/sections/testimonials.tsx` |

## 📝 License

MIT
