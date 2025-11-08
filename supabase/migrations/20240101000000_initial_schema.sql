-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  nickname VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(200),
  level INTEGER DEFAULT 1,
  points INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 产品分类表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 旅游产品表
CREATE TABLE travel_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  destination VARCHAR(200) NOT NULL,
  duration INTEGER NOT NULL, -- 天数
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  images TEXT[], -- 图片URL数组
  tags TEXT[], -- 标签数组
  category_id UUID REFERENCES categories(id),
  includes TEXT[], -- 包含项目
  excludes TEXT[], -- 不包含项目
  itinerary TEXT, -- 行程安排
  transportation VARCHAR(100), -- 交通方式
  accommodation VARCHAR(100), -- 住宿标准
  min_group_size INTEGER DEFAULT 1,
  max_group_size INTEGER DEFAULT 20,
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, sold_out
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 拼团表
CREATE TABLE group_buyings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES travel_products(id) NOT NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_participants INTEGER NOT NULL,
  current_participants INTEGER DEFAULT 0,
  min_participants INTEGER DEFAULT 1,
  price_per_person DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active, full, completed, expired, cancelled
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 拼团参与者表
CREATE TABLE group_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES group_buyings(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  role VARCHAR(20) DEFAULT 'participant', -- creator, participant
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active', -- active, cancelled
  UNIQUE(group_id, user_id)
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  group_id UUID REFERENCES group_buyings(id),
  product_id UUID REFERENCES travel_products(id) NOT NULL,
  order_no VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  participants_count INTEGER DEFAULT 1,
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, confirmed, cancelled, refunded
  contact_name VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_email VARCHAR(255),
  travel_date DATE NOT NULL,
  notes TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 钱包表
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0.00,
  total_recharge DECIMAL(10,2) DEFAULT 0.00,
  total_consumption DECIMAL(10,2) DEFAULT 0.00,
  frozen_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 钱包交易记录表
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  type VARCHAR(20) NOT NULL, -- recharge, payment, refund, withdraw
  amount DECIMAL(10,2) NOT NULL,
  balance DECIMAL(10,2) NOT NULL, -- 交易后余额
  description TEXT,
  related_order_id UUID REFERENCES orders(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 聊天消息表
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES group_buyings(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- text, image, system
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 优惠券表
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- percentage, fixed_amount
  discount_value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2) DEFAULT 0.00,
  max_discount_amount DECIMAL(10,2),
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  usage_limit INTEGER DEFAULT 1,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户优惠券表
CREATE TABLE user_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  coupon_id UUID REFERENCES coupons(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'unused', -- unused, used, expired
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, coupon_id)
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_travel_products_category ON travel_products(category_id);
CREATE INDEX idx_travel_products_status ON travel_products(status);
CREATE INDEX idx_group_buyings_product ON group_buyings(product_id);
CREATE INDEX idx_group_buyings_creator ON group_buyings(creator_id);
CREATE INDEX idx_group_buyings_status ON group_buyings(status);
CREATE INDEX idx_group_participants_group ON group_participants(group_id);
CREATE INDEX idx_group_participants_user ON group_participants(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_no ON orders(order_no);
CREATE INDEX idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX idx_chat_messages_group ON chat_messages(group_id);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX idx_user_coupons_user ON user_coupons(user_id);
CREATE INDEX idx_user_coupons_status ON user_coupons(status);