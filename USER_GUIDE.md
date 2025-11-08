# 用户操作指引（部署与验证）

本指引帮助你从本地到线上完成部署与功能验证。

## 一、准备工作
- 安装 Node.js 与 npm（已安装）
- 安装 Vercel CLI：`npm i -g vercel`
- 按 `.env.example` 创建并填写 `.env.local`

## 二、本地验证
```bash
npm run dev      # 开发预览：http://localhost:3000
npm run build    # 生产构建
npm run start    # 生产启动（如端口占用：npm run start -- -p 3010）
```
- 页面检查：访问首页、`/groups`、`/groups/[id]`、`/login`、`/register`
- 若提示 Supabase 占位符，需在 `.env.local` 填入真实值

## 三、部署到 Vercel
- 仪表盘导入：选择仓库，设置 `Root Directory` 为 `travel-app`，添加环境变量后部署
- CLI 快速部署：
  ```bash
  vercel        # 首次初始化，选择 travel-app 为 Root Directory
  npm run deploy
  ```
- 部署完成后，在 Preview 环境先按 `TEST_CHECKLIST.md` 验证，再 Promote 到 Production

## 四、环境变量（线上）
- 在 Vercel Project → Settings → Environment Variables 添加：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - （可选）`NEXT_PUBLIC_API_URL`、`NEXT_PUBLIC_APP_ENV`

## 五、常见问题
- 404 `/@vite/client`：开发模式的 Turbopack 噪音，可忽略
- 跨域提示：遵循 Next 16 的 `allowedDevOrigins` 提示，生产不受影响
- Supabase 登录失败：检查 Supabase Auth 的站点域名与回调 URL 配置

## 六、支持与回归
- 部署后执行 `TEST_CHECKLIST.md` 全量验证
- 如需我代为部署或排查，请提供 Supabase `URL/Anon Key` 或 Vercel 项目链接与权限