-- 添加基础数据

-- 添加分类数据
INSERT INTO categories (name, description, icon, sort_order) VALUES
('国内游', '国内热门旅游目的地', '🏔️', 1),
('出境游', '海外精选旅游路线', '✈️', 2),
('周边游', '周末短途游', '🚗', 3),
('亲子游', '适合家庭的旅游路线', '👨‍👩‍👧‍👦', 4),
('情侣游', '浪漫双人游', '💕', 5),
('海岛游', '热带海岛度假', '🏝️', 6),
('美食游', '品尝各地美食', '🍜', 7),
('文化游', '历史文化探索', '🏛️', 8);

-- 添加产品数据
INSERT INTO products (name, description, price, original_price, images, category_id, stock_quantity, is_featured) VALUES
('三亚5日游', '阳光沙滩，热带风情，包含机票酒店', 2999.00, 3999.00, ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tropical%20beach%20resort%20in%20Sanya%20China%20with%20palm%20trees%20and%20clear%20blue%20water&image_size=landscape_16_9'], (SELECT id FROM categories WHERE name = '海岛游'), 50, true),
('云南大理丽江7日游', '古城风韵，苍山洱海，深度体验云南文化', 2599.00, 3299.00, ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20town%20of%20Dali%20Yunnan%20with%20traditional%20buildings%20and%20mountain%20background&image_size=landscape_16_9'], (SELECT id FROM categories WHERE name = '国内游'), 30, true),
('日本东京大阪6日游', '樱花季节，文化体验，购物美食', 4999.00, 6299.00, ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Tokyo%20Japan%20street%20with%20cherry%20blossoms%20and%20traditional%20temple&image_size=landscape_16_9'], (SELECT id FROM categories WHERE name = '出境游'), 20, true),
('桂林山水甲天下4日游', '漓江风光，阳朔西街，山水画卷', 1899.00, 2399.00, ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Li%20River%20Guilin%20with%20karst%20mountains%20and%20bamboo%20rafts&image_size=landscape_16_9'], (SELECT id FROM categories WHERE name = '国内游'), 40, false),
('巴厘岛蜜月游', '浪漫海岛，私人沙滩，奢华度假', 6999.00, 8999.00, ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Bali%20beach%20resort%20with%20private%20villa%20and%20infinity%20pool%20overlooking%20ocean&image_size=landscape_16_9'], (SELECT id FROM categories WHERE name = '情侣游'), 15, true);

-- 添加拼团数据
INSERT INTO group_buyings (product_id, title, description, current_price, original_price, min_participants, max_participants, current_participants, start_date, end_date, images) VALUES
((SELECT id FROM products WHERE name = '三亚5日游'), '三亚5日游拼团特惠', '3人即可成团，享受团购优惠价，含往返机票+4晚酒店+早餐', 2399.00, 2999.00, 3, 8, 2, NOW(), NOW() + INTERVAL '7 days', ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Sanya%20tropical%20beach%20group%20tour%20with%20happy%20tourists&image_size=landscape_16_9']),
((SELECT id FROM products WHERE name = '云南大理丽江7日游'), '云南深度游拼团', '探索古城文化，体验民族风情，小团精品游', 2199.00, 2599.00, 4, 10, 3, NOW(), NOW() + INTERVAL '10 days', ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Dali%20ancient%20town%20group%20tour%20exploring%20traditional%20culture&image_size=landscape_16_9']),
((SELECT id FROM products WHERE name = '日本东京大阪6日游'), '日本樱花季拼团', '春季限定樱花季，东京大阪深度游，含导游服务', 4299.00, 4999.00, 5, 12, 4, NOW(), NOW() + INTERVAL '14 days', ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Japan%20cherry%20blossom%20group%20tour%20in%20Tokyo&image_size=landscape_16_9']),
((SELECT id FROM products WHERE name = '桂林山水甲天下4日游'), '桂林山水拼团游', '漓江竹筏，阳朔骑行，山水画卷之旅', 1599.00, 1899.00, 3, 6, 1, NOW(), NOW() + INTERVAL '5 days', ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Guilin%20Li%20River%20group%20tour%20on%20bamboo%20rafts&image_size=landscape_16_9']),
((SELECT id FROM products WHERE name = '巴厘岛蜜月游'), '巴厘岛浪漫拼团', '情侣专属拼团，浪漫海滩晚餐，私人定制服务', 5999.00, 6999.00, 2, 4, 1, NOW(), NOW() + INTERVAL '21 days', ARRAY['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Bali%20romantic%20couple%20tour%20at%20sunset%20beach&image_size=landscape_16_9']);

-- 添加轮播图数据
INSERT INTO banners (title, description, image_url, link_url, sort_order, is_active) VALUES
('春季特惠旅游', '全场旅游产品8折起，限时优惠', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20travel%20promotion%20banner%20with%20colorful%20flowers%20and%20happy%20tourists&image_size=landscape_16_9', '/groups', 1, true),
('樱花季日本游', '日本樱花季特别路线，感受粉色浪漫', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Japan%20cherry%20blossom%20travel%20banner%20with%20pink%20sakura%20and%20traditional%20temple&image_size=landscape_16_9', '/products/japan', 2, true),
('海岛度假', '热带海岛，阳光沙滩，完美假期', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tropical%20island%20vacation%20banner%20with%20palm%20trees%20and%20crystal%20clear%20water&image_size=landscape_16_9', '/products/island', 3, true),
('亲子游推荐', '适合全家的旅游路线，欢乐时光', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=family%20travel%20banner%20with%20parents%20and%20children%20having%20fun%20at%20tourist%20attraction&image_size=landscape_16_9', '/products/family', 4, true);

-- 添加优惠券数据
INSERT INTO coupons (code, title, description, discount_type, discount_value, min_amount, start_date, end_date, usage_limit) VALUES
('WELCOME2024', '新用户专享', '新用户注册即享9折优惠', 'percentage', 10, 1000, NOW(), NOW() + INTERVAL '30 days', 100),
('SPRING2024', '春季特惠', '春季旅游产品8.5折', 'percentage', 15, 2000, NOW(), NOW() + INTERVAL '15 days', 50),
('GROUP5', '拼团优惠', '3人以上拼团立减200元', 'fixed', 200, 1500, NOW(), NOW() + INTERVAL '60 days', 200),
('FAMILYFUN', '亲子游特价', '亲子游路线立减300元', 'fixed', 300, 2500, NOW(), NOW() + INTERVAL '45 days', 80);