'use client'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Card, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { login, loading } = useAuth()
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    try {
      await login(values.email, values.password)
      message.success('登录成功')
      router.push('/')
    } catch (error: any) {
      message.error(error.message || '登录失败')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录您的拼团旅游账户</p>
        </div>

        <Card className="shadow-lg">
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="邮箱地址"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="请输入邮箱地址"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 border-none"
              >
                登录
              </Button>
            </Form.Item>

            <div className="text-center space-y-2">
              <Link href="/auth/reset-password" className="text-blue-600 hover:text-blue-700 text-sm">
                忘记密码？
              </Link>
              <div>
                <span className="text-gray-600 text-sm">还没有账户？</span>
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 ml-1 text-sm">
                  立即注册
                </Link>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}