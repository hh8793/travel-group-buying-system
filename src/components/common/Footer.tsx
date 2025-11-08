import { Layout, Row, Col, Typography, Space, Divider } from 'antd'
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  WechatOutlined,
  QqOutlined,
  WeiboOutlined
} from '@ant-design/icons'

const { Footer: AntFooter } = Layout
const { Title, Text, Link } = Typography

export default function Footer() {
  return (
    <AntFooter className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]}>
          {/* 公司信息 */}
          <Col xs={24} sm={12} md={6}>
            <div className="mb-6">
              <Title level={3} className="text-white mb-4">
                拼团旅游
              </Title>
              <Text className="text-gray-300 leading-relaxed">
                专业的在线拼团旅游平台，为您提供优质的旅游产品和服务。
                实时拼团，优惠价格，让旅行更简单。
              </Text>
            </div>
            <Space direction="vertical" size="small">
              <Space>
                <PhoneOutlined className="text-blue-400" />
                <Text className="text-gray-300">400-123-4567</Text>
              </Space>
              <Space>
                <MailOutlined className="text-blue-400" />
                <Text className="text-gray-300">service@travel-group.com</Text>
              </Space>
              <Space>
                <EnvironmentOutlined className="text-blue-400" />
                <Text className="text-gray-300">北京市朝阳区xxx大厦</Text>
              </Space>
            </Space>
          </Col>

          {/* 快速链接 */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              快速链接
            </Title>
            <Space direction="vertical" size="small">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                关于我们
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                联系我们
              </Link>
              <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                帮助中心
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                服务条款
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                隐私政策
              </Link>
            </Space>
          </Col>

          {/* 旅游服务 */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              旅游服务
            </Title>
            <Space direction="vertical" size="small">
              <Link href="/groups" className="text-gray-300 hover:text-white transition-colors">
                拼团旅游
              </Link>
              <Link href="/custom" className="text-gray-300 hover:text-white transition-colors">
                定制旅游
              </Link>
              <Link href="/visa" className="text-gray-300 hover:text-white transition-colors">
                签证服务
              </Link>
              <Link href="/insurance" className="text-gray-300 hover:text-white transition-colors">
                旅游保险
              </Link>
              <Link href="/guide" className="text-gray-300 hover:text-white transition-colors">
                旅游攻略
              </Link>
            </Space>
          </Col>

          {/* 社交媒体 */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">
              关注我们
            </Title>
            <Text className="text-gray-300 mb-4 block">
              关注我们的社交媒体，获取最新旅游资讯和优惠活动。
            </Text>
            <Space size="large">
              <WechatOutlined className="text-2xl text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
              <QqOutlined className="text-2xl text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
              <WeiboOutlined className="text-2xl text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
            </Space>
          </Col>
        </Row>

        <Divider className="border-gray-600 my-8" />

        {/* 底部版权信息 */}
        <div className="text-center">
          <Text className="text-gray-400">
            © 2024 拼团旅游平台. 保留所有权利. | 
            <Link href="/icp" className="text-gray-400 hover:text-gray-300">
              京ICP备12345678号
            </Link>
          </Text>
          <div className="mt-2">
            <Text className="text-gray-500 text-sm">
              本网站仅供演示使用，请勿进行真实交易
            </Text>
          </div>
        </div>
      </div>
    </AntFooter>
  )
}