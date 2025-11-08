# Vercel 导入与配置步骤摘要

## 1. 导入项目
- 登录 Vercel，点击 `New Project`
- 选择仓库：`hh8793/travel-group-buying-system`
- 设置 `Root Directory`: `travel-app`

## 2. 环境变量（Dashboard）
在 Project → Settings → Environment Variables 添加：
- `NEXT_PUBLIC_SUPABASE_URL`: `https://cgdidyvjobqafwgnzrwg.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZGlkeXZqb2JxYWZ3Z256cndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDI0OTksImV4cCI6MjA3ODExODQ5OX0.iGlEBEbgjUDqLWXQSVVgN2LfAaZscPCIRoFd_OqWq7k`
- `NEXT_PUBLIC_APP_ENV`: `production`

## 3. 构建配置
- 使用根目录 `vercel.json`：
```json
{
  "version": 2,
  "builds": [
    { "src": "travel-app/package.json", "use": "@vercel/next" }
  ]
}
```
- 子目录 `travel-app/vercel.json` 已简化为 `{"version":2}`，避免重复环境变量来源。

## 4. 触发部署
- 仪表盘点击 `Deploy`
- 完成后获取生产 URL（如 `https://your-project.vercel.app`）

## 5. 上线后验证
- 首页 UI：轮播图覆盖层、玻璃态卡片、CTA 动效
- 列表页：容器统一、筛选卡片美化、按钮统一风格
- 响应式：移动端纵向排布、容器边距与可点击区域
- 功能：列表与详情渲染、筛选与分页联动、空状态与参团按钮
- 数据：Supabase 连接与数据加载无错误

## 6. 备注
- 环境变量建议仅在 Vercel 仪表盘维护，改动后自动生效。
- 如需预览环境，请在 Dashboard 为 Preview 环境添加同名变量。