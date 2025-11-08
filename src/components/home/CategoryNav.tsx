'use client'

import { Row, Col, Card } from 'antd'
import { useRouter } from 'next/navigation'
import { Category } from '@/types'

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter()

  const handleCategoryClick = (category: Category) => {
    router.push(`/groups?category=${category.id}`)
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            热门旅游分类
          </h2>
          <p className="text-gray-600 text-lg">
            精选优质旅游线路，总有一款适合您
          </p>
        </div>
        
        <Row gutter={[24, 24]} justify="center">
          {categories.map((category) => (
            <Col key={category.id} xs={12} sm={8} md={4}>
              <Card
                hoverable
                className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-gray-50"
                onClick={() => handleCategoryClick(category)}
                bodyStyle={{ padding: '24px 16px' }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* 装饰性元素 */}
        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            查看更多分类 →
          </button>
        </div>
      </div>
    </div>
  )
}