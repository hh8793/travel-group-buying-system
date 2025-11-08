'use client'

import { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Row, Col, Switch, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CameraOutlined } from '@ant-design/icons'

export default function Settings() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>()

  const handleFinish = async (values: any) => {
    setLoading(true)
    try {
      console.log('保存设置:', values)
      message.success('设置保存成功')
    } catch (error) {
      message.error('设置保存失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      setAvatarUrl(info.file.response?.url)
      message.success('头像上传成功')
    } else if (info.file.status === 'error') {
      message.error('头像上传失败')
    }
  }

  return (
    <div className="space-y-6">
      {/* 账户安全 */}
      <Card title="账户安全" className="shadow-sm">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="当前密码"
                name="currentPassword"
                rules={[{ required: false, message: '请输入当前密码' }]}
              >
                <Input.Password placeholder="输入当前密码" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[{ required: false, message: '请输入新密码' }]}
              >
                <Input.Password placeholder="输入新密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="确认新密码"
                name="confirmPassword"
                rules={[
                  { required: false, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'))
                    }
                  })
                ]}
              >
                <Input.Password placeholder="确认新密码" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label=" ">
                <Button type="primary" htmlType="submit" loading={loading}>
                  更新密码
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 通知设置 */}
      <Card title="通知设置" className="shadow-sm">
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item label="订单通知">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">接收订单状态更新通知</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="拼团通知">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">接收拼团进度通知</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item label="优惠活动">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">接收优惠活动通知</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="系统通知">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">接收系统重要通知</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 隐私设置 */}
      <Card title="隐私设置" className="shadow-sm">
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item label="个人资料可见性">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">允许其他用户查看我的个人资料</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="拼团记录可见性">
                <Switch defaultChecked />
                <span className="ml-2 text-sm text-gray-600">允许其他用户查看我的拼团记录</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 数据管理 */}
      <Card title="数据管理" className="shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">导出个人数据</div>
              <div className="text-sm text-gray-600">下载您的个人资料、订单记录等数据</div>
            </div>
            <Button>导出数据</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">清除缓存</div>
              <div className="text-sm text-gray-600">清除应用缓存数据，可能需要重新登录</div>
            </div>
            <Button>清除缓存</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <div className="font-medium text-red-700">注销账户</div>
              <div className="text-sm text-red-600">永久删除您的账户和所有相关数据</div>
            </div>
            <Button danger>注销账户</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}