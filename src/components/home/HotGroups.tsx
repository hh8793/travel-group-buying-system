'use client'

import { Row, Col, Card, Tag, Progress, Button, Avatar, Space } from 'antd'
import { useRouter } from 'next/navigation'
import { TeamOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { GroupBuying } from '@/types'

const { Meta } = Card

interface HotGroupsProps {
  groups: GroupBuying[]
}

export default function HotGroups({ groups }: HotGroupsProps) {
  const router = useRouter()

  const handleGroupClick = (group: GroupBuying) => {
    router.push(`/groups/${group.id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'full': return 'warning'
      case 'expired': return 'error'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中'
      case 'full': return '已满员'
      case 'expired': return '已结束'
      default: return '未知'
    }
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            热门拼团
          </h2>
          <p className="text-gray-600 text-lg">
            人气拼团推荐，优惠价格，品质保证
          </p>
        </div>
        
        <Row gutter={[24, 24]}>
          {groups.map((group) => (
            <Col key={group.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                className="h-full transition-all duration-300 hover:shadow-lg"
                cover={
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={group.product.images[0]}
                      alt={group.product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Tag color={getStatusColor(group.status)}>
                        {getStatusText(group.status)}
                      </Tag>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        省¥{group.product.original_price - group.product.price}
                      </div>
                    </div>
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    key="join"
                    onClick={() => handleGroupClick(group)}
                    disabled={group.status !== 'active' || group.current_participants >= group.max_participants}
                  >
                    {group.status === 'active' && group.current_participants < group.max_participants 
                      ? '立即参团' 
                      : group.status === 'full' 
                        ? '已满员' 
                        : '已结束'
                    }
                  </Button>
                ]}
              >
                <Meta
                  title={
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold truncate">
                        {group.product.title}
                      </span>
                    </div>
                  }
                  description={
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {group.product.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <EnvironmentOutlined className="mr-1" />
                        <span>{group.product.destination}</span>
                        <CalendarOutlined className="ml-3 mr-1" />
                        <span>{group.product.duration}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-500">
                            ¥{group.product.price}
                          </span>
                          <span className="text-gray-400 line-through">
                            ¥{group.product.original_price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            <TeamOutlined /> 已拼{group.current_participants}人
                          </span>
                          <span className="text-gray-500">
                            目标{group.min_participants}人
                          </span>
                        </div>
                        <Progress
                          percent={Math.round((group.current_participants / group.max_participants) * 100)}
                          strokeColor="#52c41a"
                          showInfo={false}
                          size="small"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>限时拼团</span>
                          <span>剩余{group.max_participants - group.current_participants}个名额</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* 查看更多 */}
        <div className="text-center mt-12">
          <Button 
            type="default" 
            size="large"
            onClick={() => router.push('/groups')}
            className="px-8"
          >
            查看更多拼团
          </Button>
        </div>
      </div>
    </div>
  )
}