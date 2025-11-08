import { Banner, Category, GroupBuying, TravelProduct } from '@/types'

// 轮播图模拟数据
export const mockBanners: Banner[] = [
  {
    id: '1',
    title: '春节特惠 - 海南三亚5日游',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tropical beach resort with palm trees and clear blue ocean, vacation paradise, luxury travel destination&image_size=landscape_16_9',
    link: '/groups/1',
    sort_order: 1,
    is_active: true,
    start_time: '2024-01-01T00:00:00Z',
    end_time: '2024-12-31T23:59:59Z'
  },
  {
    id: '2',
    title: '冰雪奇缘 - 哈尔滨雪乡之旅',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=winter snow landscape with traditional chinese village, snow-covered houses, ice sculptures, winter wonderland&image_size=landscape_16_9',
    link: '/groups/2',
    sort_order: 2,
    is_active: true,
    start_time: '2024-01-01T00:00:00Z',
    end_time: '2024-03-31T23:59:59Z'
  },
  {
    id: '3',
    title: '江南水乡 - 苏州杭州古镇游',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional chinese water town with canals, ancient bridges, classical gardens, peaceful scenery&image_size=landscape_16_9',
    link: '/groups/3',
    sort_order: 3,
    is_active: true,
    start_time: '2024-01-01T00:00:00Z',
    end_time: '2024-12-31T23:59:59Z'
  }
]

// 分类模拟数据
export const mockCategories: Category[] = [
  {
    id: '1',
    name: '海滨度假',
    icon: '🏖️',
    description: '阳光沙滩，海岛风情',
    sort_order: 1,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: '山水风光',
    icon: '🏔️',
    description: '名山大川，自然奇观',
    sort_order: 2,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: '古镇民俗',
    icon: '🏘️',
    description: '古色古香，文化传承',
    sort_order: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: '都市观光',
    icon: '🏙️',
    description: '现代都市，繁华体验',
    sort_order: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: '冰雪世界',
    icon: '❄️',
    description: '冰雪奇缘，冬季魅力',
    sort_order: 5,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: '美食之旅',
    icon: '🍜',
    description: '舌尖美味，特色小食',
    sort_order: 6,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

// 旅游产品模拟数据
export const mockProducts: TravelProduct[] = [
  {
    id: '1',
    title: '海南三亚5日游',
    description: '阳光沙滩，椰风海韵，享受热带海滨度假时光',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tropical beach resort with palm trees and clear blue ocean, vacation paradise&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury beach hotel pool area with ocean view&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tropical seafood buffet restaurant&image_size=landscape_4_3'
    ],
    price: 2999,
    original_price: 3999,
    category: '海滨度假',
    destination: '海南三亚',
    duration: '5天4晚',
    max_participants: 20,
    min_participants: 5,
    start_date: '2024-02-01',
    end_date: '2024-12-31',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: '哈尔滨雪乡7日游',
    description: '冰雪童话世界，体验东北民俗文化和冰雪运动',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=winter snow landscape with traditional chinese village, snow-covered houses&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ice sculpture festival with colorful ice buildings&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=northeast china hot pot restaurant with traditional decor&image_size=landscape_4_3'
    ],
    price: 3599,
    original_price: 4599,
    category: '冰雪世界',
    destination: '黑龙江哈尔滨',
    duration: '7天6晚',
    max_participants: 15,
    min_participants: 4,
    start_date: '2024-12-01',
    end_date: '2025-02-28',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: '苏州杭州古镇4日游',
    description: '江南水乡风情，古典园林艺术，品味传统文化',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional chinese water town with canals and ancient bridges&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classical chinese garden with pavilions and rockery&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional jiangnan cuisine presentation&image_size=landscape_4_3'
    ],
    price: 2199,
    original_price: 2899,
    category: '古镇民俗',
    destination: '江苏浙江',
    duration: '4天3晚',
    max_participants: 25,
    min_participants: 6,
    start_date: '2024-03-01',
    end_date: '2024-11-30',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// 热门拼团模拟数据
export const mockHotGroups: GroupBuying[] = [
  {
    id: '1',
    product_id: '1',
    product: mockProducts[0],
    current_participants: 12,
    max_participants: 20,
    min_participants: 5,
    status: 'active',
    start_time: '2024-02-15T08:00:00Z',
    end_time: '2024-02-20T18:00:00Z',
    participants: [],
    created_by: 'user1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    product_id: '2',
    product: mockProducts[1],
    current_participants: 8,
    max_participants: 15,
    min_participants: 4,
    status: 'active',
    start_time: '2024-01-25T08:00:00Z',
    end_time: '2024-01-30T18:00:00Z',
    participants: [],
    created_by: 'user2',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    product_id: '3',
    product: mockProducts[2],
    current_participants: 18,
    max_participants: 25,
    min_participants: 6,
    status: 'active',
    start_time: '2024-03-01T08:00:00Z',
    end_time: '2024-03-05T18:00:00Z',
    participants: [],
    created_by: 'user3',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  }
]

// 推荐产品模拟数据
export const mockRecommendedProducts: TravelProduct[] = mockProducts

// 用户模拟数据
export const mockUsers = [
  {
    id: '1',
    username: '旅行达人',
    email: 'traveler@example.com',
    phone: '13800138000',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy young traveler avatar portrait, friendly smile, outdoor adventure background&image_size=square',
    wallet_balance: 1580.50,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: '摄影爱好者',
    email: 'photographer@example.com',
    phone: '13900139000',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=photographer avatar with camera, artistic portrait style&image_size=square',
    wallet_balance: 3200.00,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]