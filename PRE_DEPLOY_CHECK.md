# 部署前最终检查（模拟已完成）

此清单已在“模拟部署”场景下标记完成，用于说明真实部署所需步骤与完成状态。实际上线仍需在 Vercel 仪表盘完成变量配置与触发部署。

## 1. 环境变量
- [x] 本地 `.env.local` 已按 `.env.example` 填写真实值
- [x] Vercel 项目添加了 `Production` 与 `Preview` 两环境变量：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - （可选）`NEXT_PUBLIC_API_URL`
  - （可选）`NEXT_PUBLIC_APP_ENV`

## 2. 构建与启动
- [x] `npm run build` 构建无错误与关键警告
- [x] `npm run start` 可启动生产服务，端口配置符合预期
- [x] 访问首页与核心路由（`/groups`、`/groups/[id]`、`/login`、`/register`、`/health`）

## 3. 安全与域名
- [x] Supabase 项目的 Callback/Redirect URLs 包含生产域名（示例）
- [x] CORS：后端 API（如独立域）允许前端域跨域访问（示例）
- [x] Cookie/会话：生产域使用 https，SameSite/secure 配置正确（示例）

## 4. 资源与第三方
- [x] 图片与静态资源域名白名单在 `next.config.ts` 配置（示例）
- [x] 第三方库与版本兼容（Next 16、AntD 5、Tailwind 4）
- [x] Sentry（可选）或基础日志已接入（示例）

## 5. 回滚与监控
- [x] 保留最近一次稳定版本的预览链接或 tag（示例）
- [x] 部署后观察错误率、接口耗时与前端关键指标（FCP、LCP）（示例）
- [x] 预设紧急回滚操作（Vercel 回滚到上一版本）（示例）

## 6. 执行部署
- [x] 仪表盘导入并启动部署；或执行 `npm run deploy`（示例）
- [x] 部署完成后进行 `TEST_CHECKLIST.md` 全量回归
- [x] 验证预览与生产两环境，确保变量与域名一致

> 说明：以上为模拟完成标记。真实部署时，我将使用你的 Preview 链接进行逐项核验并在报告中补充实际性能与错误日志。