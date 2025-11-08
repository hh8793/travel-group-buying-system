'use client'

import { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Select } from 'antd'
import { SearchOutlined, EyeOutlined } from '@ant-design/icons'
import { formatDate, formatPrice } from '@/utils/helpers'

const { Option } = Select

const mockOrders = [
  {
    id: 'ORD001',
    product_title: '日本东京5日游',
    group_id: 'GRP001',
    amount: 2999,
    status: 'paid',
    created_at: '2024-01-15T10:30:00Z',
    participants: 2,
    start_date: '2024-03-01'
  },
  {
    id: 'ORD002',
    product_title: '泰国普吉岛7日游',
    group_id: 'GRP002',
    amount: 4599,
    status: 'confirmed',
    created_at: '2024-01-20T14:20:00Z',
    participants: 1,
    start_date: '2024-02-15'
  },
  {
    id: 'ORD003',
    product_title: '韩国首尔4日游',
    group_id: 'GRP003',
    amount: 1999,
    status: 'cancelled',
    created_at: '2024-01-25T09:15:00Z',
    participants: 1,
    start_date: '2024-02-20'
  }
]

export default function OrderList() {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange'
      case 'paid': return 'blue'
      case 'confirmed': return 'green'
      case 'completed': return 'purple'
      case 'cancelled': return 'red'
      case 'refunded': return 'gray'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待支付'
      case 'paid': return '已支付'
      case 'confirmed': return '已确认'
      case 'completed': return '已完成'
      case 'cancelled': return '已取消'
      case 'refunded': return '已退款'
      default: return '未知'
    }
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.product_title.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = !statusFilter || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => <span className="font-mono text-sm">{text}</span>
    },
    {
      title: '产品名称',
      dataIndex: 'product_title',
      key: 'product_title',
      ellipsis: true,
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: '参团人数',
      dataIndex: 'participants',
      key: 'participants',
      width: 100,
      align: 'center' as const,
      render: (text: number) => <span>{text}人</span>
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (text: number) => (
        <span className="text-red-500 font-semibold">¥{formatPrice(text)}</span>
      )
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (text: string) => (
        <Tag color={getStatusColor(text)}>{getStatusText(text)}</Tag>
      )
    },
    {
      title: '出行日期',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 120,
      render: (text: string) => formatDate(text)
    },
    {
      title: '下单时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
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
            onClick={() => console.log('查看订单详情:', record.id)}
          >
            详情
          </Button>
        </Space>
      )
    }
  ]

  return (
    <Card 
      title="我的订单" 
      className="shadow-sm"
      extra={
        <Space>
          <Input
            placeholder="搜索订单号或产品名称"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder="订单状态"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 120 }}
            allowClear
          >
            <Option value="">全部状态</Option>
            <Option value="pending">待支付</Option>
            <Option value="paid">已支付</Option>
            <Option value="confirmed">已确认</Option>
            <Option value="completed">已完成</Option>
            <Option value="cancelled">已取消</Option>
            <Option value="refunded">已退款</Option>
          </Select>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        loading={loading}
        pagination={{
          total: filteredOrders.length,
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