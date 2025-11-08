import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/models'
import { AuthState } from '@/types/auth'

interface AppState {
  // 认证状态
  auth: AuthState
  
  // 全局加载状态
  isLoading: boolean
  
  // 搜索和筛选状态
  searchKeyword: string
  selectedCategory: string
  selectedDestination: string
  priceRange: [number, number]
  sortBy: string
  
  // 购物车状态
  cartItems: any[]
  
  // 通知状态
  notifications: any[]
  
  // 设置状态
  settings: {
    theme: 'light' | 'dark'
    language: string
    currency: string
  }
}

interface AppActions {
  // 认证相关操作
  setAuth: (auth: Partial<AuthState>) => void
  login: (user: User) => void
  logout: () => void
  
  // 全局状态操作
  setLoading: (loading: boolean) => void
  
  // 搜索和筛选操作
  setSearchKeyword: (keyword: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedDestination: (destination: string) => void
  setPriceRange: (range: [number, number]) => void
  setSortBy: (sortBy: string) => void
  clearFilters: () => void
  
  // 购物车操作
  addToCart: (item: any) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  
  // 通知操作
  addNotification: (notification: any) => void
  removeNotification: (notificationId: string) => void
  clearNotifications: () => void
  
  // 设置操作
  updateSettings: (settings: Partial<AppState['settings']>) => void
}

const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  isLoading: false,
  searchKeyword: '',
  selectedCategory: '',
  selectedDestination: '',
  priceRange: [0, 10000],
  sortBy: 'created_at',
  cartItems: [],
  notifications: [],
  settings: {
    theme: 'light',
    language: 'zh-CN',
    currency: 'CNY'
  }
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // 认证相关操作
      setAuth: (auth) => set((state) => ({
        auth: { ...state.auth, ...auth }
      })),
      
      login: (user) => set((state) => ({
        auth: {
          ...state.auth,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }
      })),
      
      logout: () => set((state) => ({
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        },
        cartItems: []
      })),
      
      // 全局状态操作
      setLoading: (loading) => set({ isLoading: loading }),
      
      // 搜索和筛选操作
      setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedDestination: (destination) => set({ selectedDestination: destination }),
      setPriceRange: (range) => set({ priceRange: range }),
      setSortBy: (sortBy) => set({ sortBy }),
      clearFilters: () => set({
        searchKeyword: '',
        selectedCategory: '',
        selectedDestination: '',
        priceRange: [0, 10000],
        sortBy: 'created_at'
      }),
      
      // 购物车操作
      addToCart: (item) => set((state) => ({
        cartItems: [...state.cartItems, item]
      })),
      removeFromCart: (itemId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== itemId)
      })),
      clearCart: () => set({ cartItems: [] }),
      
      // 通知操作
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications]
      })),
      removeNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId)
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      // 设置操作
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings }
      }))
    }),
    {
      name: 'travel-app-store',
      partialize: (state) => ({
        auth: state.auth,
        settings: state.settings,
        cartItems: state.cartItems
      })
    }
  )
)