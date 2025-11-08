'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Input, Space } from 'antd'
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  SearchOutlined,
  MenuOutlined,
  BellOutlined,
  HomeOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  WalletOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { useAppStore } from '@/stores'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

const { Header: AntHeader } = Layout
// 使用 Space.Compact + Input + Button 组合

export default function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchDesktop, setSearchDesktop] = useState('')
  const [searchMobile, setSearchMobile] = useState('')

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  const handleLogout = async () => {
    // 先登出 Supabase（若未配置会安全降级）
    try { await supabase.auth.signOut() } catch {}
    // 再清理本地全局状态
    logout()
    router.push('/')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => router.push('/profile')
    },
    {
      key: 'orders',
      icon: <WalletOutlined />,
      label: '我的订单',
      onClick: () => router.push('/profile?tab=orders')
    },
    {
      key: 'groups',
      icon: <TeamOutlined />,
      label: '我的拼团',
      onClick: () => router.push('/profile?tab=groups')
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ]

  const mainMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
      onClick: () => router.push('/')
    },
    {
      key: 'groups',
      icon: <TeamOutlined />,
      label: '拼团列表',
      onClick: () => router.push('/groups')
    },
    {
      key: 'profile',
      icon: <UserSwitchOutlined />,
      label: '个人中心',
      onClick: () => router.push('/profile')
    }
  ]

  return (
    <AntHeader className="bg-white shadow-md px-0 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="text-2xl font-bold text-blue-600">
              拼团旅游
            </div>
          </div>

          {/* 搜索框 - 桌面版 */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Space.Compact className="w-full">
            <Input
            placeholder="搜索目的地、景点、拼团..."
            allowClear
            size="large"
            value={searchDesktop}
            onChange={(e) => setSearchDesktop(e.target.value)}
            onPressEnter={() => handleSearch(searchDesktop)}
            className="rounded-lg"
            />
            <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() => handleSearch(searchDesktop)}
            />
            </Space.Compact>
            </div>

          {/* 导航菜单 - 桌面版 */}
          <div className="hidden lg:flex items-center space-x-6">
            {mainMenuItems.map(item => (
              <Button
                key={item.key}
                type="text"
                icon={item.icon}
                onClick={item.onClick}
                className="hover:text-blue-600"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 通知 */}
            <Badge count={0} showZero={false}>
              <Button 
                type="text" 
                icon={<BellOutlined className="text-lg" />}
                className="hover:text-blue-600"
              />
            </Badge>

            {/* 购物车 */}
            <Badge count={0} showZero={false}>
              <Button 
                type="text" 
                icon={<ShoppingCartOutlined className="text-lg" />}
                className="hover:text-blue-600"
                onClick={() => router.push('/cart')}
              />
            </Badge>

            {/* 用户菜单 */}
            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1">
                  <Avatar 
                    size="small" 
                    src={user?.avatar}
                    icon={!user?.avatar && <UserOutlined />}
                  />
                  <span className="ml-2 hidden sm:block text-sm font-medium">
                    {user?.username || '用户'}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Space>
                <Button 
                  type="text"
                  onClick={() => router.push('/login')}
                  className="hover:text-blue-600"
                >
                  登录
                </Button>
                <Button 
                  type="primary"
                  onClick={() => router.push('/register')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  注册
                </Button>
              </Space>
            )}

            {/* 移动端菜单按钮 */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* 移动端搜索框 */}
        <div className="md:hidden mt-4 pb-4">
          <Space.Compact className="w-full">
          <Input
          placeholder="搜索目的地、景点、拼团..."
          allowClear
          size="middle"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          onPressEnter={() => handleSearch(searchMobile)}
          className="rounded-lg"
          />
          <Button
          type="primary"
          size="middle"
          icon={<SearchOutlined />}
          onClick={() => handleSearch(searchMobile)}
          />
          </Space.Compact>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <Menu
              mode="vertical"
              items={mainMenuItems}
              className="border-none"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </AntHeader>
  )
}