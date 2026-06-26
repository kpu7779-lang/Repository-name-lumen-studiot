# 部署 Lumen Studio 到 Vercel（5 分钟最快路径）

## 前置准备

- 一个 GitHub 账号（https://github.com）
- 一个 Vercel 账号（https://vercel.com，可用 GitHub 一键登录）
- 本地已安装 Git

---

## 步骤 1：推送到 GitHub

### 1.1 在 GitHub 创建新仓库

访问 https://github.com/new ，按以下配置创建：

- Repository name: `lumen-studio`（或你喜欢的名字）
- Description: `Photography portfolio built with Next.js 16`
- Visibility: **Public**（Vercel 免费版只能部署公开仓库；如需私有，需 Vercel Pro）
- **不要**勾选 "Add a README file" / "Add .gitignore" / "Choose a license"（项目里已有）

点击 **Create repository**。

### 1.2 本地推送代码

在项目根目录执行（替换 `<your-username>` 为你的 GitHub 用户名）：

```bash
git init
git add .
git commit -m "Initial commit: Lumen Studio photography portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/lumen-studio.git
git push -u origin main
```

如果遇到认证问题：
- Windows 用户：使用 Git Credential Manager 或 Personal Access Token
- Mac/Linux 用户：建议用 `gh` CLI（`brew install gh && gh auth login`）

---

## 步骤 2：在 Vercel 导入项目

### 2.1 创建新项目

1. 访问 https://vercel.com/new
2. 找到刚才推送的 `lumen-studio` 仓库，点击 **Import**

### 2.2 配置部署

Vercel 会自动识别为 Next.js 项目，**默认配置即可**，无需修改：

- Framework Preset: Next.js (自动识别)
- Root Directory: `./` (默认)
- Build Command: `next build` (默认)
- Output Directory: `.next` (默认)
- Install Command: `bun install` 或 `npm install` (自动识别)

### 2.3 添加环境变量（可选）

展开 **Environment Variables** 部分，添加以下变量：

| Name | Value | 说明 |
|------|-------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://lumen-studio.vercel.app` | 替换为 Vercel 分配的域名（部署后回填） |
| `RESEND_API_KEY` | `re_xxxxxxxx` | 在 https://resend.com/api-keys 创建（可选，未配置则表单模拟提交） |
| `CONTACT_EMAIL` | `your@email.com` | 接收表单邮件的邮箱（需在 Resend 验证） |
| `RESEND_FROM_EMAIL` | `Lumen Studio <onboarding@resend.dev>` | 免费版可用 Resend 默认发件人测试 |

> 💡 第一次部署可以先不配 Resend 相关变量，先把站点跑起来，邮件功能后补。

点击 **Deploy**，等待 1-2 分钟构建完成。

---

## 步骤 3：访问你的站点

部署成功后，Vercel 会分配一个 `xxx.vercel.app` 子域名，例如：

```
https://lumen-studio-xxxxx.vercel.app
```

点击 **Visit Site** 即可看到线上版本。

---

## 步骤 4：替换占位域名（重要）

代码中 `photographer-portfolio.example.com` 是占位符，需替换为 Vercel 实际域名。

### 4.1 全局替换

在本地项目执行（把 `your-actual-domain.vercel.app` 换成你实际分到的域名）：

```bash
# 替换 4 个文件中的占位域名
sed -i 's|photographer-portfolio.example.com|your-actual-domain.vercel.app|g' \
  src/app/layout.tsx \
  src/app/sitemap.ts \
  src/app/robots.ts \
  src/components/json-ld.tsx

# 提交并推送
git add .
git commit -m "Replace placeholder domain with production URL"
git push
```

Vercel 会自动触发重新部署。

### 4.2 更新环境变量

在 Vercel 项目 **Settings → Environment Variables** 中，把 `NEXT_PUBLIC_SITE_URL` 改为完整域名（如 `https://lumen-studio.vercel.app`），然后 **Redeploy**。

---

## 步骤 5（可选）：绑定自定义域名

如果想用 `lumenstudio.com` 等自有域名：

1. 在域名服务商购买域名
2. 进入 Vercel 项目 **Settings → Domains**
3. 输入域名，点击 **Add**
4. 按提示在域名服务商添加 DNS 记录：
   - **A 记录**：`@` → `76.76.21.21`
   - **CNAME 记录**：`www` → `cname.vercel-dns.com`
5. 等待 DNS 生效（5-30 分钟），Vercel 自动签发 HTTPS 证书
6. 把代码中的域名再次替换为自定义域名，重新部署

---

## 步骤 6（可选）：启用真实邮件服务

### 6.1 注册 Resend

1. 访问 https://resend.com → Sign up（免费 3000 封/月）
2. 在 API Keys 页面创建 API Key，复制 `re_xxxxxxxx`

### 6.2 配置发件人

- **测试阶段**：直接用 Resend 提供的 `onboarding@resend.dev` 作为发件人
- **正式使用**：在 Domains 页面验证你的域名，即可用 `hello@yourdomain.com` 作为发件人

### 6.3 在 Vercel 配置环境变量

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=your@email.com
RESEND_FROM_EMAIL=Lumen Studio <onboarding@resend.dev>
```

保存后 Redeploy，联系表单即可真实发送邮件。

---

# 方案 B：部署到 Cloudflare Pages（国内访问更快）

Cloudflare Pages 在国内访问速度优于 Vercel，且免费额度更慷慨（无限请求、500 次/月构建）。

## 与 Vercel 的关键差异

| 特性 | Vercel | Cloudflare Pages |
|------|--------|------------------|
| 部署方式 | 原生 Next.js | 需 `@cloudflare/next-on-pages` 适配 |
| Image Optimization | 内置 | 不支持，已改用 `unoptimized: true` |
| API Routes | 完整支持 | 仅 Edge Runtime（已配置） |
| 国内访问 | 较慢 | 较快 |
| 免费额度 | 100GB/月流量 | 无限流量 |

## 前置准备

- Cloudflare 账号（https://dash.cloudflare.com/sign-up，免费）
- 本地已装 Git
- 项目已适配 Cloudflare（已完成，见 `wrangler.toml` 和 `package.json` 中的 `build:cf` 脚本）

## 步骤 1：推代码到 GitHub

同 Vercel 方案的第 1 步。

## 步骤 2：在 Cloudflare 创建 Pages 项目

### 方式 A：通过 Dashboard 连接 GitHub（推荐，自动部署）

1. 登录 https://dash.cloudflare.com
2. 左侧菜单 → **Workers & Pages → Create application → Pages → Connect to Git**
3. 授权 Cloudflare 访问你的 GitHub，选择 `lumen-studio` 仓库
4. 配置构建：

| 字段 | 值 |
|------|-----|
| Project name | `lumen-studio` |
| Production branch | `main` |
| Framework preset | None（不要选 Next.js） |
| Build command | `bun run build:cf` |
| Build output directory | `.vercel/output/static` |
| Root directory | `/` |

5. 展开 **Environment variables** 添加：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://lumen-studio.pages.dev` |
| `NODE_VERSION` | `20` |
| `BUN_VERSION` | `1.1` |

> ⚠️ 敏感变量（如 `RESEND_API_KEY`）**不要**在这里填，部署后在 Pages 项目 Settings → Environment variables 中以加密形式添加。

6. 点击 **Save and Deploy**

### 方式 B：用 Wrangler CLI 手动部署（适合 CI/CD）

```bash
# 1. 登录 Cloudflare（首次会开浏览器授权）
npx wrangler login

# 2. 创建 Pages 项目（首次执行）
npx wrangler pages project create lumen-studio

# 3. 一键构建 + 部署
bun run deploy:cf
```

后续每次更新代码只需执行 `bun run deploy:cf` 即可。

## 步骤 3：访问你的站点

部署成功后会分配域名：

```
https://lumen-studio.pages.dev
```

或自定义分支子域名：

```
https://<branch>.lumen-studio.pages.dev
```

## 步骤 4：替换占位域名

代码中 `photographer-portfolio.example.com` 替换为你的 `xxx.pages.dev` 域名：

```bash
sed -i 's|photographer-portfolio.example.com|lumen-studio.pages.dev|g' \
  src/app/layout.tsx \
  src/app/sitemap.ts \
  src/app/robots.ts \
  src/components/json-ld.tsx

git add . && git commit -m "Replace domain with Cloudflare Pages URL" && git push
```

推送后 Cloudflare 会自动重新部署（方式 A）。

## 步骤 5：配置 Resend 邮件服务

1. 注册 https://resend.com → 创建 API Key
2. Cloudflare Dashboard → Pages → 你的项目 → **Settings → Environment variables**
3. 添加 3 个加密变量：

| Name | Value | Type |
|------|-------|------|
| `RESEND_API_KEY` | `re_xxxxxxxx` | **Encrypt** |
| `CONTACT_EMAIL` | `your@email.com` | Plaintext |
| `RESEND_FROM_EMAIL` | `Lumen Studio <onboarding@resend.dev>` | Plaintext |

4. **Settings → Functions → Compatibility flags** 添加 `nodejs_compat`（重要！否则 Resend SDK 无法运行）
5. 重新部署生效

## 步骤 6：本地预览（可选）

部署前在本地用 wrangler 预览 Cloudflare 环境：

```bash
# 1. 复制本地环境变量
cp .dev.vars.example .dev.vars
# 编辑 .dev.vars 填入真实值

# 2. 构建并本地预览
bun run build:cf
bun run preview:cf
# 打开 http://localhost:8788
```

## 步骤 7（可选）：绑定自定义域名

1. Cloudflare Dashboard → Pages → 你的项目 → **Custom domains → Set up a custom domain**
2. 输入域名（如 `lumenstudio.com`）
3. 如果域名已在 Cloudflare 管理：自动配置 DNS
4. 如果域名在其他服务商：按提示添加 CNAME 记录指向 `lumen-studio.pages.dev`
5. 等待 5-30 分钟，HTTPS 自动签发

## Cloudflare 常见问题

### Q1：构建报错 "Edge Runtime not configured"

`@cloudflare/next-on-pages` 要求所有动态路由（API Routes）必须声明 Edge Runtime。本项目已配置，若新增 API 路由记得加：

```ts
export const runtime = 'edge'
```

### Q2：图片加载慢

Cloudflare Pages 不支持 Next.js Image Optimization，已通过 `unoptimized: true` 关闭。优化方案：
- 把图片上传到 Cloudflare Images（付费，$5/月 10万次）
- 或用 Cloudflare Image Resizing（需 Pro 套餐）
- 或继续用 Unsplash CDN（自动 WebP，无需改造）

### Q3：API 路由返回 500

检查 Cloudflare Dashboard → Pages → Functions → Real-time Logs。最常见原因是缺环境变量或 `nodejs_compat` flag 未开启。

### Q4：部署后联系表单不工作

确认以下配置：
1. Pages Settings → Environment variables 已添加 `RESEND_API_KEY`
2. Pages Settings → Functions → Compatibility flags 包含 `nodejs_compat`
3. 重新部署（环境变量改了不会自动生效）

---

## Vercel 方案常见问题

### Q1：部署报错 "Module not found"

通常是依赖未安装。检查 `package.json` 是否包含所有依赖。Vercel 默认用 npm，如果用 bun 需在 Vercel 设置中指定 Install Command 为 `bun install`。

### Q2：图片加载失败

`next.config.ts` 的 `images.remotePatterns` 限制了图片来源。如果换了自己的 CDN，需要添加新域名。

### Q3：自定义光标在 Vercel 不显示

正常。自定义光标仅桌面端启用，且需 `matchMedia('(hover: hover) and (pointer: fine)')` 通过。手机/平板会自动隐藏。

### Q4：部署后字体显示异常

Vercel 默认走 Google Fonts CDN，国内访问可能慢。如需优化，可在 `layout.tsx` 改用本地字体（下载 woff2 放到 `public/fonts/`）。

### Q5：如何查看构建日志

Vercel 项目页面 → **Deployments** → 点击最新一次部署 → **Building` 标签页可看完整日志。

---

## 部署后检查清单

部署完成后访问线上地址，逐项确认：

- [ ] 首页 Hero 大图与标题正常加载
- [ ] 字体无 FOUT 闪烁
- [ ] 中英文切换并刷新后偏好保留
- [ ] Lightbox 弹窗 + 键盘 ← → ESC 导航正常
- [ ] 联系表单提交后看到成功 toast
- [ ] （配了 Resend 后）邮箱真实收到邮件
- [ ] 移动端汉堡菜单可开关
- [ ] 滚动进度条与自定义光标（桌面端）正常
- [ ] 访问 `/sitemap.xml` 返回 XML
- [ ] 访问 `/robots.txt` 返回文本
- [ ] Lighthouse 跑分 Performance ≥ 90

---

## 后续优化方向

1. **SEO 提交**：到 Google Search Console 提交 sitemap.xml
2. **分析统计**：接入 Vercel Analytics（免费）或 Plausible
3. **图片优化**：把 Unsplash 通用图换成自有 OSS + 域名加入 `remotePatterns`
4. **国内访问**：考虑 Cloudflare Pages 或 EdgeOne 反代
5. **CMS 接入**：用 Sanity/Contentful 替代 `lib/photos-data.ts` 静态数据
