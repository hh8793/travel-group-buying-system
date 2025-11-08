# Supabase 配置指南（从零到部署）

本指南帮助你创建 Supabase 项目、获取 `Project URL` 与 `Anon Key`、正确配置认证回调与环境变量，并验证到本项目与 Vercel 的部署流程。

## 一、创建 Supabase 项目
- 访问 https://supabase.com/ 并登录（可用 GitHub 账户快速登录）。
- 点击 `New project`：
  - 选择 Organization（默认或新建）。
  - 设置 `Project Name`、`Region`（靠近主要用户）与 `Database Password`（妥善保存）。
  - 等待资源初始化（约 1–3 分钟）。
- 启用认证（默认开启 Email 登录）：左侧 `Authentication` → `Providers`，确认 `Email` Provider 已启用。

## 二、获取 Project URL 与 Anon Key
- 左侧 `Settings` → `API`：
  - 复制 `Project URL`（形如 `https://xxxxx.supabase.co`）。
  - 在 `Project API keys` 中复制 `anon` 公钥。
  - 切勿在前端使用 `service_role`（仅后端安全环境使用）。
- 将两者填入本地环境文件 `.env.local`：
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- 提示：本仓库的前端代码会校验占位符；若为占位或格式错误，将在控制台发出警告并回退到安全的 mock 客户端（避免崩溃）。

## 三、认证回调与域名（必须）
- 左侧 `Authentication` → `URL Configuration`：
  - `Site URL`：填写生产域名（如 `https://your-app.vercel.app`）。
  - `Additional Redirect URLs`：添加需要的预览或自定义域名，用于邮箱登录/重置密码等回调。
    - 示例：首个部署后，将 Vercel 的 Preview 域名（如 `https://your-app-git-main-yourname.vercel.app`）加入此处。
  - 保持 `Email confirmations` 默认设置或按需开启。
- 若使用第三方 OAuth（可选）：在 `Authentication` → `Providers` 中按官方指引配置对应的 Client ID/Secret 与回调 URL。

## 四、Realtime 与数据库设置（按需）
- 如需前端订阅实时消息：`Database` → `Replication` → 启用 `Realtime`，并为 `public` schema 勾选需要的表。
- 如需对象存储：`Storage` → 创建 Bucket，并设置 `Public` 或基于策略（RLS）访问。
- 当前项目以演示功能为主，不强制依赖具体表结构；你可后续根据业务创建表并在前端服务层接入。

## 五、在 Vercel 配置环境变量（线上）
- Vercel 仪表盘 → `Project` → `Settings` → `Environment Variables`：
  - 为 `Production` 与 `Preview` 两个环境分别添加：
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - （可选）`NEXT_PUBLIC_API_URL`、`NEXT_PUBLIC_APP_ENV`
- 完成后重新部署或触发 `Redeploy`，在 Preview 环境先按 `TEST_CHECKLIST.md` 验证，再 `Promote` 到 Production。

## 六、验证与故障排查
- 本地验证：
```bash
npm run dev      # 开发预览
npm run build    # 生产构建
npm run start    # 生产启动（如端口占用：npm run start -- -p 3010）
```
- 页面检查：访问首页、`/groups`、`/groups/[id]`、`/login`、`/register`。
- 常见问题：
  - 登录失败/回调错误：检查 `Site URL` 与 `Additional Redirect URLs` 是否包含当前域名。
  - 控制台占位符警告：确认 `.env.local` 与 Vercel 环境变量已填入真实值，且 `URL` 以 `https://` 开头。
  - 跨域报错（如独立后端域）：在后端允许前端域跨域（CORS），并在前端设置 `NEXT_PUBLIC_API_URL`。

## 七、免费套餐与注意事项
- 免费套餐资源有限（数据库/带宽/连接数/存储等），请留意用量；超出后服务可能受限或需升级。
- 不要在前端暴露 `service_role` 或数据库密码；仅使用 `anon key` 在浏览器环境。
- 变更 Region 或重大配置通常需要新项目，请在规划阶段确定所在区域。
- 邮件发送与域名可信：如使用邮件验证，请在 `Authentication` → `Email` 按需设置发件机或自定义域。

## 八、我代为配置的可选方案
- 当前 IDE 的 Supabase 集成未连接到任何项目，无法自动读取 URL/Key（集成调用返回错误）。你可以：
  1) 在 IDE 集成面板连接你的 Supabase 项目；或
  2) 直接将 `Project URL` 与 `Anon Key` 发给我，我会填入 `.env.local` 并同步到 Vercel；或
  3) 提供 Vercel 项目协作权限，我来在项目设置中添加环境变量并触发部署。

## 九、完成标志
- 本地构建与生产启动无错误；`/login`、`/register` 能正常工作（依赖你启用的 Auth 策略）。
- Preview 环境验证通过并 Promote 到 Production；`TEST_CHECKLIST.md` 与 `PRE_DEPLOY_CHECK.md` 全部项完成。

如需我立即执行配置与部署，请把 `Project URL` 与 `Anon Key` 发给我，或在 IDE 集成中连接项目后告知，我将完成变量填充、部署与线上回归，并输出验证报告。