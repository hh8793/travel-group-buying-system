'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/stores'
import type { User as AppUser } from '@/types'
import type { User as SupaUser, AuthChangeEvent, Session } from '@supabase/supabase-js'

function mapSupabaseUserToAppUser(user: SupaUser): AppUser {
  return {
    id: user.id,
    username: (user.user_metadata as any)?.nickname || (user.user_metadata as any)?.username || user.email?.split('@')[0] || '用户',
    email: user.email || '',
    phone: (user.user_metadata as any)?.phone || '',
    avatar: (user.user_metadata as any)?.avatar_url || '',
    wallet_balance: 0,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export function useSupabaseAuthSync() {
  const { setUser, setToken } = useAppStore()

  useEffect(() => {
    // 初始化获取用户（避免隐式 any）
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user
      if (user) {
        setUser(mapSupabaseUserToAppUser(user))
        // 获取 session token（如果可用）
        const { data: sessionData } = await supabase.auth.getSession()
        if (sessionData?.session?.access_token) {
          setToken(sessionData.session.access_token)
        }
      } else {
        setUser(null)
        setToken(null)
      }
    }
    init()

    // 监听认证状态变化，补充类型注解
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        setUser(mapSupabaseUserToAppUser(session.user))
        setToken((session as any).access_token || session?.access_token || null)
      } else {
        setUser(null)
        setToken(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setToken])
}