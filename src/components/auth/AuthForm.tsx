'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  isLogin?: boolean
  onSuccess?: () => void
}

export default function AuthForm({ isLogin = true, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        // 登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // 登录成功，创建或更新用户资料
        if (data.user) {
          await supabase.from('users').upsert({
            id: data.user.id,
            email: data.user.email,
            nickname: data.user.user_metadata?.nickname || data.user.email?.split('@')[0],
            phone: data.user.user_metadata?.phone || '',
            updated_at: new Date().toISOString(),
          })
        }

        setMessage('登录成功！')
        onSuccess?.()
        router.push('/')
      } else {
        // 注册
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname,
              phone,
            }
          }
        })

        if (error) throw error

        // 创建用户资料
        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            email: data.user.email,
            nickname: nickname || email.split('@')[0],
            phone,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          // 创建钱包
          await supabase.from('wallets').insert({
            user_id: data.user.id,
            balance: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        }

        setMessage('注册成功！请检查邮箱验证账户。')
        onSuccess?.()
      }
    } catch (error: any) {
      setMessage(error.message || '操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            邮箱地址
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入邮箱地址"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            密码
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入密码"
          />
        </div>

        {!isLogin && (
          <>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                昵称
              </label>
              <input
                id="nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入昵称"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入手机号（可选）"
              />
            </div>
          </>
        )}

        {message && (
          <div className={`p-4 rounded-md ${message.includes('成功') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '处理中...' : isLogin ? '登录' : '注册'}
        </button>
      </form>
    </div>
  )
}