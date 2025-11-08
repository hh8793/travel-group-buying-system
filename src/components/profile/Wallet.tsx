'use client'

import { useState } from 'react'
import { Card, Button, Statistic, Row, Col, Table, Tag, Space } from 'antd'
import { PlusOutlined, TransactionOutlined, PayCircleOutlined } from '@ant-design/icons'
import { formatPrice, formatDate } from '@/utils/helpers'

const mockTransactions = [
  {
    id: 'TXN001',
    type: 'recharge',
    amount: 1000,
    balance: 2580.50,
    description: '账户充值',
    created_at: '2024-01-20T10:30:00Z'
  },
  {
    id: 'TXN002',
    type: 'payment',
    amount: -2999,
    balance: 1580.50,
    description: '日本东京5日游订单支付',
    created_at: '2024-01-15T14:20:00Z'
  },
  {
    id: 'TXN003',
    type: 'refund',
    amount: 1999,
    balance: 4580.50,
    description: '韩国首尔4日游订单退款',
    created_at: '2024-01-10T09:15:00Z'
  }
]

export default function Wallet() {
  const [balance] = useState(2580.50)
  const [rechargeAmount, setRechargeAmount] = useState('')

  const getTransactionType = (type: string) => {
    switch (type) {
      case 'recharge': return { color: 'green', text: '充值' }
      case 'payment': return { color: 'red', text: '支付' }
      case 'refund': return { color: 'blue', text: '退款' }
      case 'withdraw': return { color: 'orange', text: '提现' }
      default: return { color: 'default', text: '其他' }
    }
  }

  const handleRecharge = () => {
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      return
    }
    console.log('充值金额:', rechargeAmount)
  }

  const handleWithdraw = () => {
    console.log('申请提现')
  }

  const columns = [
    {
      title: '交易时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      render: (text: string) => formatDate(text)
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      align: 'center' as const,
      render: (text: string) => {
        const typeInfo = getTransactionType(text)
        return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>
      }
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right' as const,
      render: (text: number) => (
        <span className={text > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {text > 0 ? '+' : ''}¥{formatPrice(Math.abs(text))}
        </span>
      )
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      width: 120,
      align: 'right' as const,
      render: (text: number) => (
        <span className="font-medium">¥{formatPrice(text)}</span>
      )
    },
    {
      title: '交易描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* 钱包概览 */}
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="账户余额"
              value={balance}
              precision={2}
              valueStyle={{ color: '#cf1322', fontSize: '24px' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="累计充值"
              value={5000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="累计消费"
              value={2419.50}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix="¥"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="冻结金额"
              value={0}
              precision={2}
              valueStyle={{ color: '#fa8c16' }}
              prefix="¥"
            />
          </Card>
        </Col>
      </Row>

      {/* 快速操作 */}
      <Card title="快速操作" className="shadow-sm">
        <div className="flex flex-wrap gap-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleRecharge}
          >
            账户充值
          </Button>
          <Button
            icon={<PayCircleOutlined />}
            onClick={handleWithdraw}
            disabled={balance <= 0}
          >
            申请提现
          </Button>
          <Button icon={<TransactionOutlined />}>
            交易记录
          </Button>
        </div>
      </Card>

      {/* 交易记录 */}
      <Card 
        title="交易记录" 
        className="shadow-sm"
        extra={
          <Space>
            <Button size="small">导出记录</Button>
            <Button size="small">筛选</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={mockTransactions}
          rowKey="id"
          pagination={{
            total: mockTransactions.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
}