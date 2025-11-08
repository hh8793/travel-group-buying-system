-- 添加数据库权限配置
-- 用户表权限
GRANT SELECT ON users TO anon;
GRANT ALL PRIVILEGES ON users TO authenticated;

-- 产品表权限
GRANT SELECT ON travel_products TO anon;
GRANT ALL PRIVILEGES ON travel_products TO authenticated;

-- 分类表权限
GRANT SELECT ON categories TO anon;
GRANT ALL PRIVILEGES ON categories TO authenticated;

-- 拼团表权限
GRANT SELECT ON group_buyings TO anon;
GRANT ALL PRIVILEGES ON group_buyings TO authenticated;

-- 订单表权限
GRANT SELECT ON orders TO anon;
GRANT ALL PRIVILEGES ON orders TO authenticated;

-- 钱包表权限
GRANT SELECT ON wallets TO anon;
GRANT ALL PRIVILEGES ON wallets TO authenticated;

-- 优惠券表权限
GRANT SELECT ON coupons TO anon;
GRANT ALL PRIVILEGES ON coupons TO authenticated;

-- 聊天消息表权限
GRANT SELECT ON chat_messages TO anon;
GRANT ALL PRIVILEGES ON chat_messages TO authenticated;

-- 轮播图表权限
GRANT SELECT ON banners TO anon;
GRANT ALL PRIVILEGES ON banners TO authenticated;

-- 订单项目表权限
GRANT SELECT ON order_items TO anon;
GRANT ALL PRIVILEGES ON order_items TO authenticated;