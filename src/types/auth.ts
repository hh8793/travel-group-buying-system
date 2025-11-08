import { User } from '@/types/models'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  nickname?: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
  error?: string
}