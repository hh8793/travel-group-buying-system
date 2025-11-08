'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { GroupBuying } from '@/types/models'
import { Card, Button, Tag, Avatar, Row, Col, Input, Select, Space, Empty, BackTop } from 'antd'
import { UserOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Search } = Input
const { Option } = Select

export default function GroupList() {
  const [groups, setGroups] = useState<GroupBuying[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('group_buyings')
        .select(`
          *,
          product:travel_products(*),
          creator:users(*)
        `)
        .eq('status', 'active')

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      if (selectedCategory) {
        query = query.eq('product.category_id', selectedCategory)
      }

      if (selectedStatus) {
        query = query.eq('status', selectedStatus)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error

      setGroups(data || [])
    } catch (error: any) {
      console.error('获取拼团列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadGroups()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green'
      case 'full': return 'orange'
      case 'completed': return 'blue'
      case 'cancelled': return 'red'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中'
      case 'full': return '已满员'
      case 'completed': return '已完成'
      case 'cancelled': return '已取消'
      default: return '未知'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">拼团列表</h1>
          <p className="text-gray-600">发现热门旅游拼团，享受优惠价格</p>
        </div>

        {/* 搜索和筛选 */}
        <Card className="glass mb-8 animate-fade-in sticky top-16 z-30">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="搜索拼团标题或描述"
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select
              placeholder="选择分类"
              allowClear
              size="large"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="md:w-48"
            >
              <Option value="">全部分类</Option>
              <Option value="1">国内游</Option>
              <Option value="2">出境游</Option>
              <Option value="3">周边游</Option>
              <Option value="4">海岛游</Option>
            </Select>
            <Select
              placeholder="选择状态"
              allowClear
              size="large"
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="md:w-32"
            >
              <Option value="">全部状态</Option>
              <Option value="active">进行中</Option>
              <Option value="full">已满员</Option>
            </Select>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              onClick={handleSearch}
              className="btn-cta"
            >
              搜索
            </Button>
          </div>
        </Card>
        <BackTop visibilityHeight={300}>
          <Button type="primary" shape="circle" className="btn-cta">↑</Button>
        </BackTop>

        {/* 拼团列表 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} loading={true} className="h-96 glass" />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-12">
            <Empty
              description="暂无拼团信息"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <p className="text-gray-500 mt-4">试试调整搜索条件或创建新的拼团</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card
                key={group.id}
                hoverable
                className="transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
                cover={
                  <div className="h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                    {group.product?.images?.[0] ? (
                      <img
                        src={group.product.images[0]}
                        alt={group.product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <EnvironmentOutlined className="text-white text-4xl" />
                      </div>
                    )}
                  </div>
                }
                actions={[
                  <Link key="view" href={`/groups/${group.id}`}>
                    <Button type="primary" block className="btn-cta">
                      查看详情
                    </Button>
                  </Link>
                ]}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {group.title}
                    </h3>
                    <Tag color={getStatusColor(group.status)}>
                      {getStatusText(group.status)}
                    </Tag>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {group.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500">
                    <EnvironmentOutlined className="mr-1" />
                    <span>{group.product?.destination || '未知目的地'}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarOutlined className="mr-1" />
                    <span>{new Date(group.start_date).toLocaleDateString()} - {new Date(group.end_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <TeamOutlined className="mr-1" />
                      <span>{group.current_participants}/{group.target_participants} 人</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        ¥{group.price_per_person}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ¥{group.product?.original_price || 0}
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((group.current_participants / group.target_participants) * 100, 100)}%`
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Avatar size="small" icon={<UserOutlined />} />
                      <span className="ml-2 text-gray-600">
                        {group.creator?.nickname || '匿名用户'}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {new Date(group.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}