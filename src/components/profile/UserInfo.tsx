'use client'

import { useState } from 'react'
import { Card, Form, Input, Button, Upload, Avatar, message } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { useAppStore } from '@/stores'

export default function UserInfo() {
  const { user, setUser } = useAppStore()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新用户信息
      setUser({
        ...user!,
        ...values,
        updated_at: new Date().toISOString()
      })
      
      message.success('个人信息更新成功！')
    } catch (error) {
      message.error('更新失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('头像上传成功！')
      // 这里可以处理头像上传逻辑
    } else if (info.file.status === 'error') {
      message.error('头像上传失败')
    }
  }

  return (
    <Card title="个人信息" className="shadow-sm">
      <div className="max-w-2xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="text-center">
            <Avatar
              size={100}
              src={user?.avatar}
              icon={!user?.avatar && <UserOutlined />}
              className="mb-2"
            />
            <Upload
              name="avatar"
              showUploadList={false}
              onChange={handleAvatarChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />} size="small">
                更换头像
              </Button>
            </Upload>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{user?.nickname || '未设置昵称'}</h3>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <p className="text-gray-600 mb-1">手机号：{user?.phone || '未绑定'}</p>
            <p className="text-gray-600">注册时间：{user?.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : '未知'}</p>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            nickname: user?.nickname || '',
            phone: user?.phone || '',
            bio: user?.bio || '',
            location: user?.location || ''
          }}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              { required: true, message: '请输入昵称' },
              { min: 2, max: 20, message: '昵称长度应在2-20个字符之间' }
            ]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="个人简介"
            name="bio"
            rules={[
              { max: 200, message: '个人简介不能超过200个字符' }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="介绍一下自己..."
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            label="所在地区"
            name="location"
          >
            <Input placeholder="请输入所在地区" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}