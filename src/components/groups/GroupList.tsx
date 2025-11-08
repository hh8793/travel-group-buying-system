'use client'

import { useState } from 'react'
import { Card, Button, Tag, Progress, Avatar, Row, Col, Empty } from 'antd'
import { UserOutlined, CalendarOutlined, EnvironmentOutlined, EyeOutlined, TeamOutlined } from '@ant-design/icons'
import { GroupBuying } from '@/types'
import { formatPrice, formatDate } from '@/utils/helpers'

const { Meta } = Card

interface GroupListProps {
  groups: GroupBuying[]
  loading: boolean
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function GroupList({ 
  groups, 
  loading, 
  total, 
  page, 
  pageSize, 
  onPageChange 
}: GroupListProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green'
      case 'full': return 'orange'
      case 'expired': return 'red'
      case 'completed': return 'blue'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中'
      case 'full': return '已满员'
      case 'expired': return '已过期'
      case 'completed': return '已完成'
      default: return '未知'
    }
  }

  const handleJoinGroup = (groupId: string) => {
    // 处理参团逻辑
    console.log('Join group:', groupId)
  }

  const handleViewDetail = (groupId: string) => {
    // 跳转到详情页
    console.log('View detail:', groupId)
  }

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Empty
          description="暂无拼团信息"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button type="primary" className="mt-4 btn-cta">
          浏览其他拼团
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 列表头部 */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          共找到 <span className="font-semibold text-gray-800">{total}</span> 个拼团
        </div>
      </div>

      {/* 拼团卡片网格 */}
      <Row gutter={[24, 24]}>
        {groups.map((group) => {
          const progressPercent = (group.current_participants / group.max_participants) * 100
          const isNearFull = progressPercent >= 80
          const isExpired = new Date(group.end_time) < new Date()

          return (
            <Col key={group.id} xs={24} sm={12} lg={8} xl={6}>
              <Card
                hoverable
                className="h-full group transition-all duration-300 hover:shadow-lg"
                cover={
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      alt={group.product.title}
                      src={group.product.images[0]}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Tag color={getStatusColor(group.status)}>
                        {getStatusText(group.status)}
                      </Tag>
                    </div>
                    {isNearFull && (
                      <div className="absolute top-3 right-3">
                        <Tag color="red">即将满员</Tag>
                      </div>
                    )}
                  </div>
                }
                actions={[
                  <Button 
                    key="view"
                    type="text" 
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDetail(group.id)}
                  >
                    查看详情
                  </Button>,
                  <Button 
                    key="join"
                    type="primary"
                    disabled={group.status !== 'active' || isExpired}
                    onClick={() => handleJoinGroup(group.id)}
                    className="btn-cta"
                  >
                    {group.status === 'active' && !isExpired ? '立即参团' : '无法参团'}
                  </Button>
                ]}
              >
                <Meta
                  title={
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {group.product.title}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-500">
                          ¥{formatPrice(group.product.price)}
                        </div>
                        <div className="text-sm text-gray-400 line-through">
                          ¥{formatPrice(group.product.original_price)}
                        </div>
                      </div>
                    </div>
                  }
                  description={
                    <div className="space-y-3">
                      {/* 产品描述 */}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {group.product.description}
                      </p>

                      {/* 目的地和日期 */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <EnvironmentOutlined />
                          <span>{group.product.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarOutlined />
                          <span>{formatDate(group.product.start_date)}</span>
                        </div>
                      </div>

                      {/* 参团进度 */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">参团进度</span>
                          <span className="font-medium">
                            {group.current_participants}/{group.max_participants}人
                          </span>
                        </div>
                        <Progress 
                          percent={progressPercent} 
                          size="small"
                          strokeColor={isNearFull ? '#ff4d4f' : '#52c41a'}
                          showInfo={false}
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>剩余{group.max_participants - group.current_participants}个名额</span>
                          <span>截止：{formatDate(group.end_time)}</span>
                        </div>
                      </div>

                      {/* 参团用户头像预览 */}
                      {group.participants && group.participants.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <TeamOutlined className="text-gray-400" />
                          <Avatar.Group maxCount={4} size="small">
                            {group.participants.slice(0, 5).map((participant, index) => (
                              <Avatar
                                key={index}
                                src={participant.avatar}
                                icon={!participant.avatar && <UserOutlined />}
                              />
                            ))}
                          </Avatar.Group>
                          <span className="text-xs text-gray-500">
                            {group.participants.length}人已参团
                          </span>
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          )
        })}
      </Row>

      {/* 分页器 */}
      {total > pageSize && (
        <div className="flex justify-center mt-8">
          {/* 这里可以添加分页组件 */}
        </div>
      )}
    </div>
  )
}