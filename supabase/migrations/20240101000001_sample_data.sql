-- 插入测试数据 - 分类
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('国内游', 'domestic', '国内热门旅游目的地', 'China', 1),
('出境游', 'international', '海外旅游目的地', 'Globe', 2),
('周边游', 'nearby', '周边短途旅游', 'MapPin', 3),
('海岛游', 'island', '海岛度假旅游', 'Umbrella', 4),
('亲子游', 'family', '适合家庭的旅游', 'Users', 5),
('蜜月游', 'honeymoon', '浪漫蜜月旅游', 'Heart', 6);

-- 插入测试数据 - 旅游产品
INSERT INTO travel_products (title, description, destination, duration, price, original_price, images, tags, category_id, includes, excludes, itinerary, transportation, accommodation, min_group_size, max_group_size) VALUES
('日本东京5日游', '探索东京的现代与传统，体验日本文化的魅力。包含浅草寺、东京塔、银座等经典景点。', '日本东京', 5, 3999, 4999, ARRAY['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop'], ARRAY['文化体验', '美食', '购物'], (SELECT id FROM categories WHERE slug = 'international'), ARRAY['往返机票', '4晚酒店住宿', '中文导游', '景点门票', '早餐'], ARRAY['个人消费', '晚餐', '签证费用'], '第1天：抵达东京，入住酒店；第2天：浅草寺、东京晴空塔；第3天：皇居、银座购物；第4天：富士山一日游；第5天：自由活动，返程', '飞机+旅游巴士', '4星级酒店', 1, 20),
('泰国普吉岛7日游', '享受普吉岛的阳光沙滩，体验泰式按摩和美食。包含皮皮岛浮潜、大象营等精彩活动。', '泰国普吉岛', 7, 2999, 3999, ARRAY['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop'], ARRAY['海岛', '浮潜', '泰式按摩'], (SELECT id FROM categories WHERE slug = 'island'), ARRAY['往返机票', '6晚酒店住宿', '早餐', '接送机', '皮皮岛一日游'], ARRAY['午餐', '晚餐', '个人消费'], '第1天：抵达普吉岛；第2天：皮皮岛浮潜；第3天：大象营体验；第4天：普吉镇文化游；第5天：SPA体验；第6天：自由活动；第7天：返程', '飞机+当地交通', '海边度假村', 2, 15),
('韩国首尔4日游', '感受韩流文化，品尝正宗韩式料理。包含明洞购物、景福宫参观、济州岛一日游。', '韩国首尔', 4, 1999, 2999, ARRAY['https://images.unsplash.com/photo-1517154421773-052853f8f9cf?w=800&h=600&fit=crop'], ARRAY['韩流文化', '购物', '美食'], (SELECT id FROM categories WHERE slug = 'international'), ARRAY['往返机票', '3晚酒店住宿', '中文导游', '景点门票'], ARRAY['个人消费', '部分餐食', '签证费用'], '第1天：抵达首尔；第2天：景福宫、明洞购物；第3天：济州岛一日游；第4天：返程', '飞机+旅游巴士', '市区酒店', 1, 25),
('云南大理丽江6日游', '探索云南的自然风光和少数民族文化。包含洱海、玉龙雪山、丽江古城等著名景点。', '云南大理丽江', 6, 2599, 3299, ARRAY['https://images.unsplash.com/photo-1608037521244-f1c6c7635194?w=800&h=600&fit=crop'], ARRAY['自然风光', '民族文化', '古城'], (SELECT id FROM categories WHERE slug = 'domestic'), ARRAY['往返交通', '5晚酒店住宿', '景点门票', '中文导游'], ARRAY['个人消费', '部分餐食'], '第1天：抵达大理；第2天：洱海环游；第3天：前往丽江；第4天：玉龙雪山；第5天：丽江古城；第6天：返程', '飞机+旅游巴士', '精品客栈', 1, 30),
('海南三亚5日游', '享受三亚的热带海滨风光，体验水上运动和高尔夫。包含天涯海角、南山寺等景点。', '海南三亚', 5, 1899, 2499, ARRAY['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'], ARRAY['海滨', '热带风光', '水上运动'], (SELECT id FROM categories WHERE slug = 'island'), ARRAY['往返机票', '4晚酒店住宿', '早餐', '接送机'], ARRAY['午餐', '晚餐', '水上运动费用'], '第1天：抵达三亚；第2天：天涯海角；第3天：南山寺；第4天：亚龙湾；第5天：返程', '飞机+当地交通', '海边酒店', 1, 20),
('四川九寨沟7日游', '探索九寨沟的人间仙境，感受川西的壮美风光。包含黄龙、牟尼沟等自然奇观。', '四川九寨沟', 7, 3299, 4299, ARRAY['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&h=600&fit=crop'], ARRAY['自然风光', '世界遗产', '摄影'], (SELECT id FROM categories WHERE slug = 'domestic'), ARRAY['往返交通', '6晚酒店住宿', '景点门票', '中文导游'], ARRAY['个人消费', '部分餐食'], '第1天：成都集合；第2天：前往九寨沟；第3天：九寨沟全天游览；第4天：黄龙景区；第5天：牟尼沟；第6天：返回成都；第7天：返程', '飞机+旅游巴士', '景区酒店', 2, 16);

-- 插入测试数据 - 用户
INSERT INTO users (email, phone, nickname, avatar_url, bio, location, level, points, is_verified) VALUES
('test@example.com', '13800138000', '旅行达人小王', 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200&h=200&fit=crop', '热爱旅行，喜欢探索不同的文化和美食', '北京', 3, 2580, true),
('user2@example.com', '13900139000', '摄影师小李', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', '专业摄影师，专注风光和人文摄影', '上海', 2, 1200, false),
('user3@example.com', '13700137000', '美食家小张', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', '美食博主，喜欢品尝各地特色美食', '广州', 1, 580, false);

-- 插入测试数据 - 拼团
INSERT INTO group_buyings (product_id, creator_id, title, description, target_participants, current_participants, min_participants, price_per_person, start_date, end_date, deadline, status, is_public) VALUES
((SELECT id FROM travel_products WHERE title = '日本东京5日游'), (SELECT id FROM users WHERE email = 'test@example.com'), '日本东京5日游拼团', '寻找志同道合的朋友一起探索东京的魅力', 8, 5, 4, 3599, '2024-03-15', '2024-03-19', '2024-03-10 23:59:59', 'active', true),
((SELECT id FROM travel_products WHERE title = '泰国普吉岛7日游'), (SELECT id FROM users WHERE email = 'user2@example.com'), '普吉岛海岛度假拼团', '享受阳光沙滩，体验海岛风情', 6, 4, 4, 2699, '2024-04-01', '2024-04-07', '2024-03-25 23:59:59', 'active', true),
((SELECT id FROM travel_products WHERE title = '韩国首尔4日游'), (SELECT id FROM users WHERE email = 'user3@example.com'), '首尔购物美食拼团', '一起体验韩流文化和美食', 10, 8, 6, 1799, '2024-03-01', '2024-03-04', '2024-02-25 23:59:59', 'full', true),
((SELECT id FROM travel_products WHERE title = '云南大理丽江6日游'), (SELECT id FROM users WHERE email = 'test@example.com'), '云南风光摄影拼团', '摄影爱好者一起记录云南美景', 12, 3, 4, 2399, '2024-05-01', '2024-05-06', '2024-04-25 23:59:59', 'active', true);

-- 插入测试数据 - 拼团参与者
INSERT INTO group_participants (group_id, user_id, role) VALUES
((SELECT id FROM group_buyings WHERE title = '日本东京5日游拼团'), (SELECT id FROM users WHERE email = 'test@example.com'), 'creator'),
((SELECT id FROM group_buyings WHERE title = '日本东京5日游拼团'), (SELECT id FROM users WHERE email = 'user2@example.com'), 'participant'),
((SELECT id FROM group_buyings WHERE title = '日本东京5日游拼团'), (SELECT id FROM users WHERE email = 'user3@example.com'), 'participant'),
((SELECT id FROM group_buyings WHERE title = '泰国普吉岛7日游'), (SELECT id FROM users WHERE email = 'user2@example.com'), 'creator'),
((SELECT id FROM group_buyings WHERE title = '泰国普吉岛7日游'), (SELECT id FROM users WHERE email = 'test@example.com'), 'participant'),
((SELECT id FROM group_buyings WHERE title = '韩国首尔4日游'), (SELECT id FROM users WHERE email = 'user3@example.com'), 'creator'),
((SELECT id FROM group_buyings WHERE title = '韩国首尔4日游'), (SELECT id FROM users WHERE email = 'test@example.com'), 'participant'),
((SELECT id FROM group_buyings WHERE title = '云南大理丽江6日游'), (SELECT id FROM users WHERE email = 'test@example.com'), 'creator');

-- 插入测试数据 - 订单
INSERT INTO orders (user_id, group_id, product_id, order_no, total_amount, participants_count, status, contact_name, contact_phone, contact_email, travel_date) VALUES
((SELECT id FROM users WHERE email = 'test@example.com'), (SELECT id FROM group_buyings WHERE title = '日本东京5日游拼团'), (SELECT id FROM travel_products WHERE title = '日本东京5日游'), 'ORD20240115001', 7198, 2, 'confirmed', '王小明', '13800138000', 'test@example.com', '2024-03-15'),
((SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM group_buyings WHERE title = '泰国普吉岛7日游'), (SELECT id FROM travel_products WHERE title = '泰国普吉岛7日游'), 'ORD20240115002', 2699, 1, 'pending', '李摄影', '13900139000', 'user2@example.com', '2024-04-01'),
((SELECT id FROM users WHERE email = 'user3@example.com'), (SELECT id FROM group_buyings WHERE title = '韩国首尔4日游'), (SELECT id FROM travel_products WHERE title = '韩国首尔4日游'), 'ORD20240115003', 1799, 1, 'confirmed', '张美食', '13700137000', 'user3@example.com', '2024-03-01');

-- 插入测试数据 - 钱包
INSERT INTO wallets (user_id, balance, total_recharge, total_consumption) VALUES
((SELECT id FROM users WHERE email = 'test@example.com'), 2580.50, 5000.00, 2419.50),
((SELECT id FROM users WHERE email = 'user2@example.com'), 1200.00, 2000.00, 800.00),
((SELECT id FROM users WHERE email = 'user3@example.com'), 580.00, 1000.00, 420.00);

-- 插入测试数据 - 钱包交易记录
INSERT INTO wallet_transactions (wallet_id, user_id, type, amount, balance, description, related_order_id) VALUES
((SELECT id FROM wallets WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com')), (SELECT id FROM users WHERE email = 'test@example.com'), 'recharge', 1000.00, 2580.50, '账户充值', NULL),
((SELECT id FROM wallets WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com')), (SELECT id FROM users WHERE email = 'test@example.com'), 'payment', -2999.00, 1580.50, '日本东京5日游订单支付', (SELECT id FROM orders WHERE order_no = 'ORD20240115001')),
((SELECT id FROM wallets WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com')), (SELECT id FROM users WHERE email = 'test@example.com'), 'refund', 1999.00, 4580.50, '韩国首尔4日游订单退款', NULL);