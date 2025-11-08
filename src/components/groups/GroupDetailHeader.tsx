import { GroupBuying } from '@/types'

interface GroupDetailHeaderProps {
  group: GroupBuying
}

export default function GroupDetailHeader({ group }: GroupDetailHeaderProps) {
  const progressPercent = (group.current_participants / group.max_participants) * 100
  const isNearFull = progressPercent >= 80

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* 面包屑导航 */}
          <div className="flex items-center space-x-2 text-sm mb-4 opacity-90">
            <span>首页</span>
            <span>/</span>
            <span>拼团列表</span>
            <span>/</span>
            <span>拼团详情</span>
          </div>

          {/* 标题和标签 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">
                {group.product.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                group.status === 'active' 
                  ? 'bg-green-500 text-white' 
                  : group.status === 'full'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {group.status === 'active' ? '进行中' : 
                 group.status === 'full' ? '已满员' : 
                 group.status === 'completed' ? '已完成' : '已过期'}
              </span>
              {isNearFull && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                  即将满员
                </span>
              )}
            </div>
            
            <p className="text-lg opacity-90">
              {group.product.description}
            </p>
          </div>

          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <p className="text-sm opacity-75">目的地</p>
                <p className="text-lg font-semibold">{group.product.destination}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-sm opacity-75">出发日期</p>
                <p className="text-lg font-semibold">
                  {new Date(group.product.start_date).toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
              <div>
                <p className="text-sm opacity-75">行程天数</p>
                <p className="text-lg font-semibold">{group.product.duration}天</p>
              </div>
            </div>
          </div>

          {/* 价格信息 */}
          <div className="mt-8 flex items-end space-x-4">
            <div>
              <p className="text-sm opacity-75 mb-1">拼团价格</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">¥{group.product.price.toLocaleString()}</span>
                <span className="text-lg opacity-75 line-through">¥{group.product.original_price.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              省¥{(group.product.original_price - group.product.price).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}