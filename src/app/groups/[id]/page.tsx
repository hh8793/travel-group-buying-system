'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { GroupBuying } from '@/types/models'
import { Card, Button, Tag, Avatar, Row, Col, Divider, Space, message, Modal } from 'antd'
import { UserOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons'
import GroupChatRealTime from '@/components/groups/GroupChatRealTime'

export default function GroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [group, setGroup] = useState<GroupBuying | null>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadGroupDetail()
    }
  }, [params.id])

  const loadGroupDetail = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('group_buyings')
        .select(`
          *,
          product:travel_products(*),
          creator:users(*)
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      setGroup(data)
    } catch (error: any) {
      message.error('获取拼团详情失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGroup = async () => {
    try {
      setJoining(true)
      
      // 检查是否已登录
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        message.warning('请先登录')
        router.push('/login')
        return
      }

      // 检查是否已满员
      if (group && group.current_participants >= group.target_participants) {
        message.error('该拼团已满员')
        return
      }

      // 创建订单
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          group_id: group?.id,
          total_amount: group?.price_per_person || 0,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (orderError) throw orderError

      // 更新拼团参与人数
      const { error: updateError } = await supabase
        .from('group_buyings')
        .update({
          current_participants: (group?.current_participants || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', group?.id)

      if (updateError) throw updateError

      message.success('成功加入拼团！')
      loadGroupDetail() // 重新加载详情
    } catch (error: any) {
      message.error('加入拼团失败: ' + error.message)
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">拼团不存在</h2>
          <Button type="primary" onClick={() => router.push('/groups')}>
            返回拼团列表
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <Button 
            type="link" 
            onClick={() => router.push('/groups')}
            className="mb-4"
          >
            ← 返回拼团列表
          </Button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{group.title}</h1>
            <Tag color={group.status === 'active' ? 'green' : 'orange'}>
              {group.status === 'active' ? '进行中' : '已满员'}
            </Tag>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {/* 左侧：拼团详情 */}
          <Col xs={24} lg={16}>
            <Card className="mb-6">
              {/* 产品图片 */}
              {group.product?.images?.[0] && (
                <div className="mb-6">
                  <img
                    src={group.product.images[0]}
                    alt={group.product.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* 基本信息 */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <EnvironmentOutlined className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">目的地</p>
                    <p className="text-gray-600">{group.product?.destination || '未知目的地'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CalendarOutlined className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">出发时间</p>
                    <p className="text-gray-600">
                      {new Date(group.start_date).toLocaleDateString()} - {new Date(group.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <TeamOutlined className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">拼团人数</p>
                    <p className="text-gray-600">
                      {group.current_participants}/{group.target_participants} 人
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((group.current_participants / group.target_participants) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* 拼团描述 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">拼团介绍</h3>
                <p className="text-gray-600 leading-relaxed">{group.description}</p>
              </div>

              {group.product?.description && (
                <>
                  <Divider />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">产品详情</h3>
                    <p className="text-gray-600 leading-relaxed">{group.product.description}</p>
                  </div>
                </>
              )}
            </Card>
          </Col>

          {/* 右侧：操作面板 */}
          <Col xs={24} lg={8}>
            <Card className="mb-6">
              <div className="text-center space-y-4">
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    ¥{group.price_per_person}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    原价: ¥{group.product?.original_price || 0}
                  </div>
                  <div className="text-sm text-green-600">
                    节省: ¥{(group.product?.original_price || 0) - group.price_per_person}
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  disabled={group.current_participants >= group.target_participants}
                  loading={joining}
                  onClick={handleJoinGroup}
                >
                  {group.current_participants >= group.target_participants ? '拼团已满' : '立即参团'}
                </Button>

                <Button
                  type="default"
                  block
                  onClick={() => setShowChat(true)}
                >
                  群聊咨询
                </Button>
              </div>
            </Card>

            {/* 发起人信息 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">发起人信息</h3>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar size="large" icon={<UserOutlined />} />
                <div>
                  <p className="font-medium text-gray-900">
                    {group.creator?.nickname || '匿名用户'}
                  </p>
                  <p className="text-sm text-gray-500">拼团发起人</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MailOutlined className="text-gray-400" />
                  <span className="text-gray-600">{group.creator?.email}</span>
                </div>
                {group.creator?.phone && (
                  <div className="flex items-center space-x-2">
                    <PhoneOutlined className="text-gray-400" />
                    <span className="text-gray-600">{group.creator.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <ClockCircleOutlined className="text-gray-400" />
                  <span className="text-gray-600">
                    发起于 {new Date(group.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 群聊弹窗 */}
      <Modal
        title="拼团群聊"
        open={showChat}
        onCancel={() => setShowChat(false)}
        footer={null}
        width={800}
      >
        <GroupChatRealTime groupId={group.id} />
      </Modal>
    </div>
  )
}