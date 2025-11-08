import { supabase } from '@/lib/supabase'
import { 
  TravelProduct, 
  GroupBuying, 
  GroupParticipant, 
  Order, 
  Wallet, 
  WalletTransaction, 
  ChatMessage,
  Category,
  PaginatedResponse,
  PaginationParams,
  FilterParams
} from '@/types/models'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export class ApiService {
  private static instance: ApiService

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  private checkSupabaseConfig() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase 配置缺失：请在环境变量中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
  }

  async getCategories(): Promise<Category[]> {
    this.checkSupabaseConfig()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('priority', { ascending: true })

    if (error) throw error
    return data || []
  }

  async getHotGroups(limit: number = 8): Promise<GroupBuying[]> {
    this.checkSupabaseConfig()
    const { data, error } = await supabase
      .from('group_buyings')
      .select(`*, product:travel_products(*), creator:users(*)`)
      .eq('status', 'active')
      .order('current_participants', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async getRecommendedProducts(limit: number = 8): Promise<TravelProduct[]> {
    this.checkSupabaseConfig()
    const { data, error } = await supabase
      .from('travel_products')
      .select(`*, category:categories(*)`)
      .eq('status', 'active')
      .order('popularity', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  async getFeaturedProducts(limit: number = 8): Promise<TravelProduct[]> {
    this.checkSupabaseConfig()
    const { data, error } = await supabase
      .from('travel_products')
      .select(`*, category:categories(*)`)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  static async getProducts(params?: PaginationParams & FilterParams): Promise<PaginatedResponse<TravelProduct>> {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 12
    const offset = (page - 1) * pageSize

    let query = supabase.from('travel_products').select('*', { count: 'exact' })

    if (params?.category) {
      query = query.eq('category_id', params.category)
    }
    if (params?.priceMin !== undefined) {
      query = query.gte('price', params.priceMin)
    }
    if (params?.priceMax !== undefined) {
      query = query.lte('price', params.priceMax)
    }
    if (params?.keyword) {
      query = query.ilike('title', `%${params.keyword}%`)
    }
    if (params?.status) {
      query = query.eq('status', params.status)
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    return {
      success: true,
      data: data || [],
      total,
      page,
      pageSize,
      totalPages
    }
  }

  static async getGroupBuyings(params?: PaginationParams & FilterParams): Promise<PaginatedResponse<GroupBuying>> {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 12
    const offset = (page - 1) * pageSize

    let query = supabase
      .from('group_buyings')
      .select(`*, product:travel_products(*), creator:users(*)`, { count: 'exact' })

    if (params?.status) query = query.eq('status', params.status)
    if (params?.keyword) query = query.ilike('title', `%${params.keyword}%`)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    return {
      success: true,
      data: data || [],
      total,
      page,
      pageSize,
      totalPages
    }
  }

  static async getGroupBuyingById(id: string): Promise<GroupBuying | null> {
    const { data, error } = await supabase
      .from('group_buyings')
      .select(`*, product:travel_products(*), creator:users(*)`)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async createGroupBuying(groupData: Partial<GroupBuying>): Promise<GroupBuying> {
    const { data, error } = await supabase
      .from('group_buyings')
      .insert([groupData])
      .select(`*, product:travel_products(*), creator:users(*)`)
      .single()

    if (error) throw error
    return data
  }

  static async joinGroupBuying(groupId: string, userId: string): Promise<GroupParticipant> {
    const { data, error } = await supabase
      .from('group_participants')
      .insert([{ group_id: groupId, user_id: userId }])
      .select(`*, user:users(*)`)
      .single()

    if (error) throw error
    return data
  }

  static async getOrders(userId: string, params?: PaginationParams): Promise<PaginatedResponse<Order>> {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const offset = (page - 1) * pageSize

    const { data, error, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    return {
      success: true,
      data: data || [],
      total,
      page,
      pageSize,
      totalPages
    }
  }

  static async createOrder(orderData: Partial<Order>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select('*')
      .single()

    if (error) throw error
    return data
  }

  static async getWallet(userId: string): Promise<Wallet | null> {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  }

  static async getWalletTransactions(userId: string, params?: PaginationParams): Promise<PaginatedResponse<WalletTransaction>> {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const offset = (page - 1) * pageSize

    const { data, error, count } = await supabase
      .from('wallet_transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    return {
      success: true,
      data: data || [],
      total,
      page,
      pageSize,
      totalPages
    }
  }

  static async rechargeWallet(userId: string, amount: number): Promise<WalletTransaction> {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert([{ user_id: userId, type: 'recharge', amount }])
      .select('*')
      .single()

    if (error) throw error
    return data
  }

  // 聊天消息相关API
  static async getChatMessages(groupId: string, limit: number = 50): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`*, user:users(*)`)
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data?.reverse() || []
  }

  static async sendChatMessage(messageData: Partial<ChatMessage>): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([messageData])
      .select(`*, user:users(*)`)
      .single()

    if (error) throw error
    return data
  }

  // 订阅实时消息
  static subscribeToChatMessages(groupId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat:${groupId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `group_id=eq.${groupId}`
        }, 
        (payload: RealtimePostgresChangesPayload<ChatMessage>) => {
          callback(payload.new as ChatMessage)
        }
      )
      .subscribe()
  }

  // 获取用户优惠券
  static async getUserCoupons(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('user_coupons')
      .select(`*, coupon:coupons(*)`)
      .eq('user_id', userId)
      .eq('status', 'unused')
      .gte('coupon.valid_until', new Date().toISOString())

    if (error) throw error
    return data || []
  }

  // 获取热门拼团
  static async getHotGroupBuyings(limit: number = 6): Promise<GroupBuying[]> {
    const { data, error } = await supabase
      .from('group_buyings')
      .select(`*, product:travel_products(*), creator:users(*)`)
      .eq('status', 'active')
      .order('current_participants', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // 获取推荐产品
  static async getRecommendedProducts(limit: number = 6): Promise<TravelProduct[]> {
    const { data, error } = await supabase
      .from('travel_products')
      .select(`*, category:categories(*)`)
      .eq('status', 'active')
      .order('popularity', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }
}