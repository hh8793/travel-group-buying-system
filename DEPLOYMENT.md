# 部署指南

本项目为 Next.js 16（Turbopack）应用，位于子目录 `travel-app`。以下提供在 Vercel 上的标准部署流程，及本地生产验证。

## 一、环境变量

将 `.env.example` 复制为 `.env.local` 并填入真实值：
- `NEXT_PUBLIC_SUPABASE_URL`（必填）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`（必填）
- `NEXT_PUBLIC_API_URL`（可选，后端 API 独立域名时）
- `NEXT_PUBLIC_APP_ENV`（可选：development | staging | production）

部署到 Vercel 后，在 Project → Settings → Environment Variables 添加以上同名变量到 `Production` 和 `Preview` 环境。

## 二、Vercel 仪表盘部署（推荐）
1. 打开 Vercel 仪表盘，选择 Import Git Repository。
2. 设置 `Root Directory` 为 `travel-app`。
3. `Framework` 自动识别为 Next.js，`Build Command` 默认 `next build`，`Output` 使用 Next 16 默认输出即可。
4. 在项目设置添加环境变量（见上）。
5. 触发部署，完成后获取预览/生产 URL。

## 三、Vercel CLI 部署
```bash
npm i -g vercel
vercel            # 首次初始化，Root Directory 选择 travel-app
vercel --prod     # 生产部署
```
初始化后在 Vercel 仪表盘设置环境变量，或使用 `vercel env add` 命令添加。

## 四、本地生产验证
```bash
npm run build
npm run start
# 访问 http://localhost:3000
```
构建/启动过程中如提示 Supabase 配置为占位符，请在 `.env.local` 填入真实值后重试。

## 五、目录与配置
- 根目录 `vercel.json` 指向子目录：
  ```json
  {"version":2,"builds":[{"src":"travel-app/package.json","use":"@vercel/next"}]}
  ```
- `travel-app/next.config.ts` 使用默认配置，如需要外源图片、headers、rewrites，请在该文件中设置。

## 六、常见问题
- 404 `/@vite/client`：Next 16 的 Turbopack 日志噪音，可忽略，不影响页面。
- Supabase 认证/实时：确保 Supabase 项目启用 Auth 与 Realtime，前端使用的 URL 与 Anon Key 有效。
- API 跨域：如后端独立域名，需要在后端允许 CORS，并在前端设置 `NEXT_PUBLIC_API_URL`。

## 七、附录：一键部署脚本
在 `package.json` 中添加以下脚本：
```json
{
  "scripts": {
    "deploy": "vercel --prod --yes"
  }
}
```
使用前请先 `npm i -g vercel` 并完成 Vercel 项目初始化。