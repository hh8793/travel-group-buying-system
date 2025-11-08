'use client'

import { Row, Col, Card, Tag, Button, Rate } from 'antd'
import { useRouter } from 'next/navigation'
import { ClockCircleOutlined, EnvironmentOutlined, StarOutlined } from '@ant-design/icons'
import { TravelProduct } from '@/types'

const { Meta } = Card

interface RecommendedProductsProps {
  products: TravelProduct[]
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  const router = useRouter()

  const handleProductClick = (product: TravelProduct) => {
    router.push(`/products/${product.id}`)
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            推荐旅游产品
          </h2>
          <p className="text-gray-600 text-lg">
            精心策划的旅游线路，为您带来难忘的旅行体验
          </p>
        </div>
        
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                className="h-full transition-all duration-300 hover:shadow-xl"
                cover={
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Tag color="blue">{product.category}</Tag>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        省¥{product.original_price - product.price}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <Rate disabled defaultValue={4.8} className="text-sm" />
                        <span className="text-white text-sm">4.8分</span>
                      </div>
                    </div>
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    key="view"
                    onClick={() => handleProductClick(product)}
                    className="w-full"
                  >
                    查看详情
                  </Button>
                ]}
              >
                <Meta
                  title={
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-gray-800 truncate">
                        {product.title}
                      </span>
                    </div>
                  }
                  description={
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <EnvironmentOutlined className="mr-2" />
                        <span>{product.destination}</span>
                        <ClockCircleOutlined className="ml-4 mr-2" />
                        <span>{product.duration}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-500">
                            ¥{product.price}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ¥{product.original_price}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <StarOutlined className="text-yellow-400 mr-1" />
                          热门推荐
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>最多{product.max_participants}人</span>
                        <span>最少{product.min_participants}人成团</span>
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
            className="px-8 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            探索更多旅游产品
          </Button>
        </div>
      </div>
    </div>
  )
}