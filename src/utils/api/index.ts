import { ApiResponse, PaginatedResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// API请求工具类
class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string, timeout = 10000) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeout)

    // 根据 body 类型设置合适的 headers（FormData 不设置 Content-Type）
    let headers: HeadersInit = {
      ...(options.headers || {}),
    }
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
    if (!isFormData) {
      headers = {
        'Content-Type': 'application/json',
        ...headers,
      }
    }

    const config: RequestInit = {
      ...options,
      headers,
      signal: controller.signal,
    }

    // 添加认证token（仅在浏览器环境）
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        }
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    } finally {
      clearTimeout(timer)
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]))
        }
      })
    }
    
    return this.request<T>(url.pathname + url.search, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  async upload<T>(endpoint: string, file: File): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // 不要设置Content-Type，让浏览器自动设置
      },
    })
  }
}

// 创建API客户端实例
export const apiClient = new ApiClient(API_BASE_URL)

// 用户相关API
export const userApi = {
  // 用户登录
  login: (data: { username: string; password: string }) =>
    apiClient.post<{ user: any; token: string }>('/auth/login', data),

  // 用户注册
  register: (data: { username: string; email: string; password: string; phone: string }) =>
    apiClient.post<{ user: any; token: string }>('/auth/register', data),

  // 获取用户信息
  getProfile: () => apiClient.get<any>('/user/profile'),

  // 更新用户信息
  updateProfile: (data: any) => apiClient.put<any>('/user/profile', data),

  // 上传头像
  uploadAvatar: (file: File) => apiClient.upload<any>('/user/avatar', file),

  // 修改密码
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    apiClient.post<any>('/user/change-password', data),

  // 重置密码
  resetPassword: (data: { email: string }) =>
    apiClient.post<any>('/auth/reset-password', data),
}

// 旅游产品相关API
export const productApi = {
  // 获取产品列表
  getProducts: (params?: {
    page?: number
    page_size?: number
    category?: string
    destination?: string
    price_min?: number
    price_max?: number
    sort_by?: string
    sort_order?: 'asc' | 'desc'
  }) => apiClient.get<PaginatedResponse<any>>('/products', params),

  // 获取产品详情
  getProduct: (id: string) => apiClient.get<any>(`/products/${id}`),

  // 获取热门产品
  getHotProducts: () => apiClient.get<any[]>('/products/hot'),

  // 获取推荐产品
  getRecommendedProducts: () => apiClient.get<any[]>('/products/recommended'),

  // 搜索产品
  searchProducts: (keyword: string, params?: any) =>
    apiClient.get<PaginatedResponse<any>>(`/products/search`, { keyword, ...params }),
}

// 拼团相关API
export const groupApi = {
  // 获取拼团列表
  getGroups: (params?: {
    page?: number
    page_size?: number
    status?: string
    category?: string
    destination?: string
    sort_by?: string
    sort_order?: 'asc' | 'desc'
  }) => apiClient.get<PaginatedResponse<any>>('/groups', params),

  // 获取拼团详情
  getGroup: (id: string) => apiClient.get<any>(`/groups/${id}`),

  // 创建拼团
  createGroup: (data: { product_id: string; max_participants: number; end_time: string }) =>
    apiClient.post<any>('/groups', data),

  // 加入拼团
  joinGroup: (id: string, data: { participants: any[] }) =>
    apiClient.post<any>(`/groups/${id}/join`, data),

  // 获取用户的拼团
  getUserGroups: () => apiClient.get<any[]>('/groups/my'),

  // 获取热门拼团
  getHotGroups: () => apiClient.get<any[]>('/groups/hot'),

  // 获取拼团参与者
  getGroupParticipants: (id: string) => apiClient.get<any[]>(`/groups/${id}/participants`),
}

// 订单相关API
export const orderApi = {
  // 创建订单
  createOrder: (data: any) => apiClient.post<any>('/orders', data),

  // 获取订单列表
  getOrders: (params?: {
    page?: number
    page_size?: number
    status?: string
    start_date?: string
    end_date?: string
  }) => apiClient.get<PaginatedResponse<any>>('/orders', params),

  // 获取订单详情
  getOrder: (id: string) => apiClient.get<any>(`/orders/${id}`),

  // 取消订单
  cancelOrder: (id: string) => apiClient.post<any>(`/orders/${id}/cancel`),

  // 支付订单
  payOrder: (id: string, data: { payment_method: string }) =>
    apiClient.post<any>(`/orders/${id}/pay`, data),

  // 确认订单
  confirmOrder: (id: string) => apiClient.post<any>(`/orders/${id}/confirm`),
}

// 钱包相关API
export const walletApi = {
  // 获取钱包余额
  getBalance: () => apiClient.get<{ balance: number }>('/wallet/balance'),

  // 充值
  recharge: (data: { amount: number; payment_method: string }) =>
    apiClient.post<any>('/wallet/recharge', data),

  // 提现
  withdraw: (data: { amount: number; bank_account: string }) =>
    apiClient.post<any>('/wallet/withdraw', data),

  // 获取交易记录
  getTransactions: (params?: {
    page?: number
    page_size?: number
    type?: string
    start_date?: string
    end_date?: string
  }) => apiClient.get<PaginatedResponse<any>>('/wallet/transactions', params),
}

// 分类相关API
export const categoryApi = {
  // 获取分类列表
  getCategories: () => apiClient.get<any[]>('/categories'),

  // 获取分类详情
  getCategory: (id: string) => apiClient.get<any>(`/categories/${id}`),
}

// 轮播图相关API
export const bannerApi = {
  // 获取轮播图列表
  getBanners: () => apiClient.get<any[]>('/banners'),
}

// 评论相关API
export const reviewApi = {
  // 获取产品评论
  getProductReviews: (productId: string, params?: any) =>
    apiClient.get<PaginatedResponse<any>>(`/reviews/product/${productId}`, params),

  // 创建评论
  createReview: (data: { product_id: string; rating: number; content: string; images?: string[] }) =>
    apiClient.post<any>('/reviews', data),

  // 上传评论图片
  uploadReviewImages: (files: File[]) => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return apiClient.upload<any[]>('/reviews/images', files[0])
  },
}

// 聊天相关API
export const chatApi = {
  // 获取群聊消息
  getGroupMessages: (groupId: string) => apiClient.get<any[]>(`/chat/groups/${groupId}/messages`),

  // 发送消息
  sendMessage: (groupId: string, data: { content: string; message_type: string }) =>
    apiClient.post<any>(`/chat/groups/${groupId}/messages`, data),
}

// 文件上传API
export const uploadApi = {
  // 上传文件
  uploadFile: (file: File) => apiClient.upload<any>('/upload', file),

  // 上传图片
  uploadImage: (file: File) => apiClient.upload<any>('/upload/image', file),
}

// 工具函数
export const apiUtils = {
  // 处理API错误
  handleError: (error: any) => {
    console.error('API Error:', error)
    
    if (error.message) {
      // 这里可以集成toast通知
      console.error('Error message:', error.message)
    }
    
    throw error
  },

  // 构建查询参数
  buildQueryParams: (params: Record<string, any>) => {
    const query = new URLSearchParams()
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        query.append(key, String(params[key]))
      }
    })
    return query.toString()
  },

  // 格式化响应数据
  formatResponse: (response: ApiResponse<any>) => {
    if (response.code === 200) {
      return response.data
    } else {
      throw new Error(response.message || 'Request failed')
    }
  },
}