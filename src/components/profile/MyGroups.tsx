'use client'

import { useState } from 'react'
import { Card, Table, Tag, Button, Space, Avatar } from 'antd'
import { TeamOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons'
import { formatDate } from '@/utils/helpers'

const mockMyGroups = [
  {
    id: 'GRP001',
    product_title: '日本东京5日游',
    product_image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    status: 'active',
    current_participants: 8,
    max_participants: 10,
    end_time: '2024-02-15T00:00:00Z',
    role: 'creator',
    joined_at: '2024-01-10T10:30:00Z'
  },
  {
    id: 'GRP002',
    product_title: '泰国普吉岛7日游',
    product_image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop',
    status: 'completed',
    current_participants: 15,
    max_participants: 15,
    end_time: '2024-01-20T00:00:00Z',
    role: 'participant',
    joined_at: '2024-01-05T14:20:00Z'
  },
  {
    id: 'GRP003',
    product_title: '韩国首尔4日游',
    product_image: 'https://images.unsplash.com/photo-1517154421773-052853f8f9cf?w=400&h=300&fit=crop',
    status: 'full',
    current_participants: 12,
    max_participants: 12,
    end_time: '2024-02-01T00:00:00Z',
    role: 'participant',
    joined_at: '2024-01-08T09:15:00Z'
  }
]

export default function MyGroups() {
  const [loading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green'
      case 'full': return 'orange'
      case 'completed': return 'blue'
      case 'expired': return 'red'
      case 'cancelled': return 'gray'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中'
      case 'full': return '已满员'
      case 'completed': return '已完成'
      case 'expired': return '已过期'
      case 'cancelled': return '已取消'
      default: return '未知'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'creator': return '团长'
      case 'participant': return '团员'
      default: return '未知'
    }
  }

  const getProgressPercent = (current: number, max: number) => {
    return Math.round((current / max) * 100)
  }

  const columns = [
    {
      title: '产品信息',
      key: 'product',
      width: 300,
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.product_image}
            alt={record.product_title}
            className="w-16 h-12 object-cover rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-800">{record.product_title}</div>
            <div className="text-sm text-gray-500">拼团ID: {record.id}</div>
          </div>
        </div>
      )
    },
    {
      title: '拼团状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (text: string) => (
        <Tag color={getStatusColor(text)}>{getStatusText(text)}</Tag>
      )
    },
    {
      title: '参团进度',
      key: 'progress',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <div className="text-center">
          <div className="text-sm font-medium">
            {record.current_participants}/{record.max_participants}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full ${
                getProgressPercent(record.current_participants, record.max_participants) >= 80 
                  ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${getProgressPercent(record.current_participants, record.max_participants)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getProgressPercent(record.current_participants, record.max_participants)}%
          </div>
        </div>
      )
    },
    {
      title: '我的角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      align: 'center' as const,
      render: (text: string) => (
        <Tag color={text === 'creator' ? 'gold' : 'blue'}>
          {getRoleText(text)}
        </Tag>
      )
    },
    {
      title: '截止时间',
      dataIndex: 'end_time',
      key: 'end_time',
      width: 120,
      render: (text: string) => (
        <div className="text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <CalendarOutlined />
            <span>{formatDate(text)}</span>
          </div>
        </div>
      )
    },
    {
      title: '参团时间',
      dataIndex: 'joined_at',
      key: 'joined_at',
      width: 120,
      render: (text: string) => formatDate(text)
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => console.log('查看拼团详情:', record.id)}
          >
            详情
          </Button>
          {record.status === 'active' && record.role === 'creator' && (
            <Button size="small" danger>
              取消
            </Button>
          )}
        </Space>
      )
    }
  ]

  return (
    <Card 
      title="我的拼团" 
      className="shadow-sm"
      extra={
        <Space>
          <Button size="small">创建拼团</Button>
          <Button size="small">刷新</Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={mockMyGroups}
        rowKey="id"
        loading={loading}
        pagination={{
          total: mockMyGroups.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
        scroll={{ x: 1000 }}
      />
    </Card>
  )
}