'use client'

import { useState, useEffect } from 'react'
import { Card, Button, Tag, Avatar, Progress, Row, Col, message } from 'antd'
import { UserOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
import { TravelProduct, GroupBuying } from '@/types/models'
import { formatCurrency, getGroupStatusColor, getGroupStatusText, getTimeRemaining, calculateProgress } from '@/utils/helpers'

interface GroupCardProps {
  group: GroupBuying
  onJoin?: () => void
  showJoinButton?: boolean
}

export default function GroupCard({ group, onJoin, showJoinButton = true }: GroupCardProps) {
  const [isJoining, setIsJoining] = useState(false)
  // 使用 models.ts 的字段：deadline
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(group.deadline))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(group.deadline))
    }, 60000) // 每分钟更新一次

    return () => clearInterval(timer)
  }, [group.deadline])

  const handleJoin = async () => {
    if (!onJoin) return
    
    setIsJoining(true)
    try {
      await onJoin()
      message.success('加入拼团成功！')
    } catch (error) {
      console.error('加入拼团失败:', error)
      message.error('加入拼团失败，请重试')
    } finally {
      setIsJoining(false)
    }
  }

  const progress = group.product ? calculateProgress(group.current_participants, group.target_participants) : 0

  // 以产品原价与团购价计算优惠
  const originalPrice = group.product?.price ?? 0
  const discountAmount = originalPrice > group.price_per_person ? originalPrice - group.price_per_person : 0
  const discountPercent = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0

  return (
    <Card
      hoverable
      className="group-card transition-all duration-300 hover:shadow-lg"
      cover={
        <div className="relative">
          <img
            alt={group.product?.title || '旅游产品'}
            src={group.product?.images?.[0] || 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful+travel+destination+landscape&image_size=landscape_16_9'}
            className="h-48 w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Tag color={getGroupStatusColor(group.status)}>
              {getGroupStatusText(group.status)}
            </Tag>
          </div>
          {discountAmount > 0 && (
            <div className="absolute top-2 left-2">
              <Tag color="red">优惠 {discountPercent > 0 ? `${discountPercent}%` : formatCurrency(discountAmount)}</Tag>
            </div>
          )}
        </div>
      }
      actions={[
        showJoinButton && group.status === 'active' && !timeRemaining.isExpired && (
          <Button
            type="primary"
            onClick={handleJoin}
            loading={isJoining}
            disabled={group.current_participants >= group.target_participants}
            className="w-full"
          >
            {group.current_participants >= group.target_participants ? '拼团已满' : '立即参团'}
          </Button>
        )
      ].filter(Boolean)}
    >
      <div className="space-y-3">
        {/* 产品标题 */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {group.product?.title || '旅游产品'}
        </h3>

        {/* 价格和优惠 */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-red-600">
            {formatCurrency(group.price_per_person)}
          </span>
          {discountAmount > 0 && group.product && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        {/* 行程信息 */}
        <div className="space-y-2 text-sm text-gray-600">
          {group.product && (
            <>
              <div className="flex items-center space-x-2">
                <EnvironmentOutlined />
                <span>{group.product.destination}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarOutlined />
                <span>{group.product.duration}</span>
              </div>
            </>
          )}
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>参团进度</span>
            <span>{group.current_participants}/{group.target_participants}人</span>
          </div>
          {group.product && (
            <Progress
              percent={progress}
              strokeColor={progress >= 100 ? '#52c41a' : '#1890ff'}
              showInfo={false}
            />
          )}
        </div>

        {/* 剩余时间 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <ClockCircleOutlined />
            <span className={timeRemaining.isExpired ? 'text-red-600' : 'text-gray-600'}>
              {timeRemaining.text}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <UserOutlined />
            <span>团长: {group.creator?.nickname || '匿名'}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}