'use client'

import { useState, useEffect } from 'react'
import { Card, Carousel, Row, Col, Button, Typography, Tag } from 'antd'
import { ArrowRightOutlined, StarOutlined, SafetyOutlined, ClockCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { ApiService } from '@/services/apiService'
import { TravelProduct, GroupBuying } from '@/types/models'
import { supabase } from '@/lib/supabase'
import { formatCurrency, getTimeRemaining } from '@/utils/helpers'
import GroupCard from '@/components/groups/GroupCard'

const { Title, Text } = Typography

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<TravelProduct[]>([])
  const [hotGroups, setHotGroups] = useState<GroupBuying[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    try {
      setIsLoading(true)
      
      const apiService = ApiService.getInstance()
      
      // 并行加载数据
      const [productsData, groupsData, categoriesData] = await Promise.all([
        apiService.getFeaturedProducts(),
        apiService.getHotGroups(),
        apiService.getCategories()
      ])

      setFeaturedProducts(productsData)
      setHotGroups(groupsData)
      setCategories(categoriesData)
    } catch (error: any) {
      console.error('加载首页数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGroup = async (groupId: string) => {
    try {
      const apiService = ApiService.getInstance()
      // 获取当前用户信息
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }
      await ApiService.joinGroupBuying(groupId, user.id)
      // 重新加载数据
      loadHomeData()
    } catch (error: any) {
      throw error
    }
  }

  const bannerImages = [
    {
      url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful+tropical+beach+with+palm+trees+and+clear+blue+water+travel+destination&image_size=landscape_16_9',
      title: '热带海岛度假',
      subtitle: '享受阳光沙滩，体验海岛风情'
    },
    {
      url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Mountain+landscape+with+ancient+temple+traditional+architecture+travel&image_size=landscape_16_9',
      title: '古镇文化之旅',
      subtitle: '探索历史文化，感受古镇魅力'
    },
    {
      url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Modern+city+skyline+with+shopping+district+night+lights+travel&image_size=landscape_16_9',
      title: '都市购物天堂',
      subtitle: '时尚购物体验，都市夜生活'
    }
  ]

  const features = [
    {
      icon: <SafetyOutlined className="text-3xl text-blue-600" />,
      title: '安全可靠',
      description: '平台担保交易，确保资金安全'
    },
    {
      icon: <ClockCircleOutlined className="text-3xl text-green-600" />,
      title: '实时拼团',
      description: '实时显示拼团进度，随时参与'
    },
    {
      icon: <StarOutlined className="text-3xl text-yellow-600" />,
      title: '优质产品',
      description: '精选优质旅游产品，品质保证'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text>加载中...</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 轮播图 */}
      <section className="relative">
        <Carousel autoplay className="h-96">
          {bannerImages.map((banner, index) => (
            <div key={index} className="h-96 relative">
              <img
                src={banner.url}
                alt={banner.title}
                className="w-full h-96 object-cover"
              />
              <div className="hero-overlay" />
              <div className="glass px-6 py-6 md:px-10 md:py-8 text-center text-white animate-fade-in">
                <Title level={1} className="text-white mb-3 animate-slide-up">
                  {banner.title}
                </Title>
                <Text className="text-white text-lg block mb-6 animate-slide-up" style={{animationDelay: '80ms'}}>
                  {banner.subtitle}
                </Text>
                <Link href="/groups">
                  <Button type="primary" size="large" className="btn-cta animate-slide-up" style={{animationDelay: '160ms'}}>
                    立即拼团
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* 特色服务 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            为什么选择我们
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <Title level={4} className="mb-2">
                    {feature.title}
                  </Title>
                  <Text type="secondary">{feature.description}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 热门拼团 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Title level={2}>
              热门拼团
            </Title>
            <Link href="/groups">
              <Button type="link">
                查看更多 <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
          <Row gutter={[24, 24]}>
            {hotGroups.slice(0, 6).map((group) => (
              <Col xs={24} sm={12} lg={8} key={group.id}>
                <GroupCard
                  group={group}
                  onJoin={() => handleJoinGroup(group.id)}
                  showJoinButton={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 产品分类 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            热门目的地
          </Title>
          <Row gutter={[16, 16]}>
            {categories.map((category) => (
              <Col xs={12} sm={8} md={6} lg={4} key={category.id}>
                <Link href={`/groups?category=${category.id}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={category.name}
                        src={category.image || 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Travel+destination+category+icon&image_size=square'}
                        className="h-32 object-cover"
                      />
                    }
                    className="text-center"
                  >
                    <Text strong>{category.name}</Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </div>
  )
}
