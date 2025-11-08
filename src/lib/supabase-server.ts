import { createClient } from '@supabase/supabase-js'

// 安全地获取环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabaseClient: any

// 增强占位符与格式校验（服务端）
const isValidHttpUrl = (url: string) => /^https?:\/\/.+/.test(url)
const isPlaceholderUrl = (url: string) => !url || url.includes('your_supabase_url') || !isValidHttpUrl(url)
const isPlaceholderKey = (key: string) => !key || key.includes('your_supabase_anon_key')

// 添加安全检查
if (isPlaceholderUrl(supabaseUrl) || isPlaceholderKey(supabaseAnonKey)) {
  console.warn('⚠️ [server] Supabase配置不完整或为占位符，请检查环境变量')
  console.warn('需要在.env.local文件中设置:')
  console.warn('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  
  // 返回一个模拟的客户端，避免应用崩溃
  supabaseClient = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      signUp: () => Promise.reject(new Error('Supabase未配置')),
      signInWithPassword: () => Promise.reject(new Error('Supabase未配置')),
      signOut: () => Promise.resolve(),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
    }),
    channel: () => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) })
    }),
    rpc: () => Promise.resolve({ data: null, error: null })
  } as any
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = supabaseClient