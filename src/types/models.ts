export interface User {
  id: string
  email: string
  phone?: string
  nickname?: string
  avatar_url?: string
  bio?: string
  location?: string
  level: number
  points: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface TravelProduct {
  id: string
  title: string
  description?: string
  destination: string
  duration: number
  price: number
  original_price?: number
  images: string[]
  tags: string[]
  category_id: string
  includes: string[]
  excludes: string[]
  itinerary?: string
  transportation?: string
  accommodation?: string
  min_group_size: number
  max_group_size: number
  status: 'active' | 'inactive' | 'sold_out'
  created_at: string
  updated_at: string
  category?: Category
}

export interface GroupBuying {
  id: string
  product_id: string
  creator_id: string
  title: string
  description?: string
  target_participants: number
  current_participants: number
  min_participants: number
  price_per_person: number
  start_date: string
  end_date: string
  deadline: string
  status: 'active' | 'full' | 'completed' | 'expired' | 'cancelled'
  is_public: boolean
  created_at: string
  updated_at: string
  product?: TravelProduct
  creator?: User
  participants?: GroupParticipant[]
}

export interface GroupParticipant {
  id: string
  group_id: string
  user_id: string
  role: 'creator' | 'participant'
  joined_at: string
  status: 'active' | 'cancelled'
  user?: User
}

export interface Order {
  id: string
  user_id: string
  group_id?: string
  product_id: string
  order_no: string
  total_amount: number
  participants_count: number
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'refunded'
  contact_name: string
  contact_phone: string
  contact_email?: string
  travel_date: string
  notes?: string
  paid_at?: string
  confirmed_at?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
  product?: TravelProduct
  group?: GroupBuying
}

export interface Wallet {
  id: string
  user_id: string
  balance: number
  total_recharge: number
  total_consumption: number
  frozen_amount: number
  created_at: string
  updated_at: string
}

export interface WalletTransaction {
  id: string
  wallet_id: string
  user_id: string
  type: 'recharge' | 'payment' | 'refund' | 'withdraw'
  amount: number
  balance: number
  description?: string
  related_order_id?: string
  created_at: string
  order?: Order
}

export interface ChatMessage {
  id: string
  group_id: string
  user_id: string
  content: string
  message_type: 'text' | 'image' | 'system'
  created_at: string
  user?: User
}

export interface Coupon {
  id: string
  code: string
  title: string
  description?: string
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  min_order_amount: number
  max_discount_amount?: number
  valid_from: string
  valid_until: string
  usage_limit: number
  usage_count: number
  is_active: boolean
  created_at: string
}

export interface UserCoupon {
  id: string
  user_id: string
  coupon_id: string
  status: 'unused' | 'used' | 'expired'
  used_at?: string
  created_at: string
  coupon?: Coupon
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
  category?: string
  destination?: string
  priceMin?: number
  priceMax?: number
  status?: string
  dateFrom?: string
  dateTo?: string
  keyword?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  message?: string
}