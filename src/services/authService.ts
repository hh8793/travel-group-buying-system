import { supabase } from '@/lib/supabase'
import type { RegisterData, LoginCredentials, AuthResponse } from '@/types/auth'
import type { User } from '@/types/models'

export class AuthService {
  private static instance: AuthService
  
  private constructor() {}
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // 检查Supabase配置
  private checkSupabaseConfig() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase配置不完整，请检查环境变量')
    }
  }

  // 用户注册
  async register(data: RegisterData): Promise<AuthResponse> {
    this.checkSupabaseConfig()
    try {
      // 创建Supabase用户
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        return {
          success: false,
          error: authError.message
        }
      }

      if (authData.user) {
        // 创建用户资料
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: data.email,
              nickname: data.nickname || data.email.split('@')[0],
              phone: data.phone
            }
          ])

        if (profileError) {
          return {
            success: false,
            error: profileError.message
          }
        }

        return {
          success: true,
          user: {
            id: authData.user.id,
            email: data.email,
            nickname: data.nickname || data.email.split('@')[0],
            phone: data.phone,
            level: 1,
            points: 0,
            is_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      }

      return {
        success: false,
        error: '注册失败'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '注册失败'
      }
    }
  }

  // 用户登录
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    this.checkSupabaseConfig()
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      if (data.user) {
        // 获取用户资料
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (userError) {
          return {
            success: false,
            error: userError.message
          }
        }

        return {
          success: true,
          user: userData,
          token: data.session?.access_token
        }
      }

      return {
        success: false,
        error: '登录失败'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '登录失败'
      }
    }
  }

  // 用户登出
  async logout(): Promise<void> {
    this.checkSupabaseConfig()
    await supabase.auth.signOut()
  }

  // 获取当前用户
  async getCurrentUser(): Promise<User | null> {
    this.checkSupabaseConfig()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        return null
      }

      return userData
    } catch (error) {
      return null
    }
  }

  // 更新用户资料
  async updateProfile(userId: string, updates: Partial<User>): Promise<AuthResponse> {
    this.checkSupabaseConfig()

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select('*')
        .single()

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      return {
        success: true,
        user: data
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '更新失败'
      }
    }
  }

  // 修改密码
  async changePassword(newPassword: string): Promise<AuthResponse> {
    this.checkSupabaseConfig()

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      return {
        success: true,
        message: '密码修改成功'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '密码修改失败'
      }
    }
  }

  // 重置密码
  async resetPassword(email: string): Promise<AuthResponse> {
    this.checkSupabaseConfig()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      return {
        success: true,
        message: '重置密码邮件已发送'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '重置密码失败'
      }
    }
  }

  // 认证状态变化监听
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}