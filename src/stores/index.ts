import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, GroupBuying, TravelProduct, Order } from '@/types'

interface AppState {
  // 用户状态
  user: User | null
  isAuthenticated: boolean
  token: string | null
  
  // 全局状态
  loading: boolean
  theme: 'light' | 'dark'
  language: 'zh-CN' | 'en-US'
  
  // 数据缓存
  banners: any[]
  categories: any[]
  hotGroups: GroupBuying[]
  recommendedProducts: TravelProduct[]
  
  // 用户相关数据
  userOrders: Order[]
  userGroups: GroupBuying[]
  walletBalance: number
  
  // 方法
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'zh-CN' | 'en-US') => void
  setBanners: (banners: any[]) => void
  setCategories: (categories: any[]) => void
  setHotGroups: (groups: GroupBuying[]) => void
  setRecommendedProducts: (products: TravelProduct[]) => void
  setUserOrders: (orders: Order[]) => void
  setUserGroups: (groups: GroupBuying[]) => void
  setWalletBalance: (balance: number) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
      theme: 'light',
      language: 'zh-CN',
      banners: [],
      categories: [],
      hotGroups: [],
      recommendedProducts: [],
      userOrders: [],
      userGroups: [],
      walletBalance: 0,
      
      // 方法实现
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setBanners: (banners) => set({ banners }),
      setCategories: (categories) => set({ categories }),
      setHotGroups: (hotGroups) => set({ hotGroups }),
      setRecommendedProducts: (recommendedProducts) => set({ recommendedProducts }),
      setUserOrders: (userOrders) => set({ userOrders }),
      setUserGroups: (userGroups) => set({ userGroups }),
      setWalletBalance: (walletBalance) => set({ walletBalance }),
      logout: () => set({
        user: null,
        isAuthenticated: false,
        token: null,
        userOrders: [],
        userGroups: [],
        walletBalance: 0,
      }),
    }),
    {
      name: 'travel-app-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        theme: state.theme,
        language: state.language,
        walletBalance: state.walletBalance,
      }),
    }
  )
)

// 购物车状态
interface CartState {
  items: Array<{
    product: TravelProduct
    quantity: number
    participants: number
  }>
  
  addToCart: (product: TravelProduct, quantity: number, participants: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number, participants: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity, participants) => {
        const items = get().items
        const existingItem = items.find(item => item.product.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity, participants }
                : item
            )
          })
        } else {
          set({ items: [...items, { product, quantity, participants }] })
        }
      },
      
      removeFromCart: (productId) => {
        set({ items: get().items.filter(item => item.product.id !== productId) })
      },
      
      updateQuantity: (productId, quantity, participants) => {
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity, participants }
              : item
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.price * item.quantity * item.participants)
        }, 0)
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

// 聊天状态
interface ChatState {
  messages: Record<string, any[]> // groupId -> messages
  isConnected: boolean
  
  setMessages: (groupId: string, messages: any[]) => void
  addMessage: (groupId: string, message: any) => void
  setConnected: (connected: boolean) => void
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: {},
  isConnected: false,
  
  setMessages: (groupId, messages) => {
    set({
      messages: { ...get().messages, [groupId]: messages }
    })
  },
  
  addMessage: (groupId, message) => {
    const currentMessages = get().messages[groupId] || []
    set({
      messages: {
        ...get().messages,
        [groupId]: [...currentMessages, message]
      }
    })
  },
  
  setConnected: (isConnected) => set({ isConnected })
}))