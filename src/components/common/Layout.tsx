import { Layout as AntLayout } from 'antd'
import Header from './Header'
import Footer from './Footer'

const { Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <AntLayout className="min-h-screen bg-gray-50">
      <Header />
      <Content className={className}>
        {children}
      </Content>
      <Footer />
    </AntLayout>
  )
}