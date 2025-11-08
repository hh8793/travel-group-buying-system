'use client'

import { useState } from 'react'
import { Card, Avatar, Button, Space, Tag, Statistic, Row, Col } from 'antd'
import { UserOutlined, EditOutlined, WalletOutlined, ShoppingOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons'
import { useAppStore } from '@/stores'
import Layout from '@/components/common/Layout'
import UserInfo from '@/components/profile/UserInfo'
import OrderList from '@/components/profile/OrderList'
import Wallet from '@/components/profile/Wallet'
import MyGroups from '@/components/profile/MyGroups'
import Settings from '@/components/profile/Settings'

export default function ProfilePage() {
  const { user } = useAppStore()
  const [activeTab, setActiveTab] = useState('info')

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">请先登录</h2>
            <p className="text-gray-600 mb-6">登录后可以查看个人信息、订单和钱包</p>
            <Button type="primary" size="large">
              立即登录
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  const menuItems = [
    {
      key: 'info',
      label: '个人信息',
      icon: <UserOutlined />
    },
    {
      key: 'orders',
      label: '我的订单',
      icon: <ShoppingOutlined />
    },
    {
      key: 'groups',
      label: '我的拼团',
      icon: <TeamOutlined />
    },
    {
      key: 'wallet',
      label: '我的钱包',
      icon: <WalletOutlined />
    },
    {
      key: 'settings',
      label: '账户设置',
      icon: <SettingOutlined />
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* 页面头部 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar
                  size={80}
                  src={user.avatar}
                  icon={!user.avatar && <UserOutlined />}
                  className="border-4 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold">{user.nickname || '用户'}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Tag color="blue">{user.verified ? '已认证' : '未认证'}</Tag>
                    <Tag color="green">等级 {user.level || 1}</Tag>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => setActiveTab('info')}
              >
                编辑资料
              </Button>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="container mx-auto px-4 -mt-8 mb-8">
          <Row gutter={16}>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="我的订单"
                  value={12}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ShoppingOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="我的拼团"
                  value={8}
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="钱包余额"
                  value={2580.50}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<WalletOutlined />}
                  suffix="元"
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="优惠券"
                  value={5}
                  valueStyle={{ color: '#722ed1' }}
                  prefix="🎫"
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 侧边菜单 */}
            <div className="lg:w-64 flex-shrink-0">
              <Card className="shadow-sm">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.key
                          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* 内容区域 */}
            <div className="flex-1">
              {activeTab === 'info' && <UserInfo />}
              {activeTab === 'orders' && <OrderList />}
              {activeTab === 'groups' && <MyGroups />}
              {activeTab === 'wallet' && <Wallet />}
              {activeTab === 'settings' && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}