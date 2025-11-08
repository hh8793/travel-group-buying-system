# Supabase 迁移执行指南（手动）

本指南帮助你在 Supabase 仪表盘手动应用本项目的最小数据库结构与函数，并插入基础种子数据。

## 一、准备
- 登录你的 Supabase 项目（即你提供的 `Project URL` 与 `Anon Key` 对应项目）。
- 确保你有 `SQL` 访问权限（Owner/Admin）。

## 二、执行迁移 SQL
- 仪表盘左侧选择 `SQL` → `New query`。
- 打开本地文件：`supabase/migrations/0001_min_init.sql`，将其全部内容复制到 SQL Editor。
- 点击 `Run` 执行。
- 该文件包含：
  - `users`、`categories`、`travel_products`、`group_buyings`、`group_participants`、`orders`、`wallets`、`chat_messages`、`coupons`、`user_coupons` 等表结构
  - `increment_group_participants(group_id uuid)` 函数（用于递增拼团参与人数，已修复为安全递增并更新 `updated_at`）
  - 基础 `categories` 种子数据（`domestic` / `international` / `nearby`）

## 三、启用 Realtime（推荐）
- 仪表盘 → `Database` → `Replication` → 启用 `Realtime`。
- 勾选 `public` schema 下需要的表（例如 `chat_messages`、`group_buyings`）。

## 四、认证与回调（必须）
- 仪表盘 → `Authentication` → `URL Configuration`：
  - 设置 `Site URL` 为你的生产或当前预览域名
  - 将所有需要的域名加入 `Additional Redirect URLs`

## 五、验证
- 本地打开 `http://localhost:3000/health`，确认：
  - `App Env` 显示为 `production`
  - `Supabase Client` 显示为 `real`
  - 点击“测试 categories 查询”，应返回 `Query OK. Rows: 3`

## 六、故障排查
- 提示表不存在：确认迁移 SQL 已在目标项目执行成功。
- 认证失败或回调错误：检查 `Site URL` 与 `Additional Redirect URLs`。
- Realtime 无法订阅：确认已启用并勾选对应表；前端 `.env.local` 的 `URL/Anon Key` 为真实值。

## 七、后续
- 需要我继续导入更多种子数据（产品、拼团、用户、订单、钱包）并做一次端到端验证，请告知，我来执行。