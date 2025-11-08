// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  wallet_balance: number;
  created_at: string;
  updated_at: string;
  // 兼容 Profile 与群聊显示所需的可选字段
  nickname?: string;
  level?: number;
  verified?: boolean;
  bio?: string;
  location?: string;
}

// 旅游产品类型
export interface TravelProduct {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  original_price: number;
  category: string;
  destination: string;
  duration: string;
  max_participants: number;
  min_participants: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive' | 'sold_out';
  created_at: string;
  updated_at: string;
}

// 拼团类型
export interface GroupBuying {
  id: string;
  product_id: string;
  product: TravelProduct;
  current_participants: number;
  max_participants: number;
  min_participants: number;
  status: 'active' | 'full' | 'expired' | 'completed';
  start_time: string;
  end_time: string;
  participants: User[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

// 订单类型
export interface Order {
  id: string;
  user_id: string;
  group_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'refunded';
  payment_method: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  participants: Participant[];
  created_at: string;
  updated_at: string;
}

// 参与者类型
export interface Participant {
  id: string;
  name: string;
  phone: string;
  id_card: string;
  age: number;
  gender: 'male' | 'female';
  emergency_contact: string;
  emergency_phone: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// 轮播图类型
export interface Banner {
  id: string;
  title: string;
  image: string;
  link: string;
  sort_order: number;
  is_active: boolean;
  start_time: string;
  end_time: string;
}

// 聊天消息类型
export interface ChatMessage {
  id: string;
  group_id: string;
  user_id: string;
  user: User;
  content: string;
  message_type: 'text' | 'image' | 'system';
  created_at: string;
}

// 钱包交易记录类型
export interface WalletTransaction {
  id: string;
  user_id: string;
  type: 'recharge' | 'consumption' | 'refund' | 'withdraw';
  amount: number;
  balance: number;
  description: string;
  related_order_id?: string;
  created_at: string;
}

// API响应类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// 文件上传响应类型
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mime_type: string;
}

// 地理位置类型
export interface Location {
  id: string;
  name: string;
  parent_id?: string;
  level: number;
  sort_order: number;
}

// 评论类型
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user: User;
  rating: number;
  content: string;
  images: string[];
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}