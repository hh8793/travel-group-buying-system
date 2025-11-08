'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading } = useAuth()
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    try {
      await register(values.email, values.password, {
        nickname: values.nickname,
        phone: values.phone
      })
      message.success('注册成功')
      router.push('/')
    } catch (error: any) {
      message.error(error.message || '注册失败')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">加入拼团旅游</h1>
          <p className="text-gray-600">创建账户，开始您的旅行之旅</p>
        </div>

        <Card className="shadow-lg">
          <Form
            form={form}
            name="register"
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
              name="nickname"
              label="昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="请输入昵称"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="手机号码"
              rules={[
                { required: false, message: '请输入手机号码' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="请输入手机号码（可选）"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度至少为6位' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="确认密码"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  }
                })
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="请确认密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 border-none"
              >
                注册账户
              </Button>
            </Form.Item>

            <div className="text-center">
              <span className="text-gray-600">已有账户？</span>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 ml-1">
                立即登录
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'