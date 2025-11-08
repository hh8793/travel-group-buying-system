import { GroupBuying } from '@/types'

interface GroupProgressProps {
  group: GroupBuying
}

export default function GroupProgress({ group }: GroupProgressProps) {
  const progressPercent = (group.current_participants / group.max_participants) * 100
  const isNearFull = progressPercent >= 80
  const isExpired = new Date(group.end_time) < new Date()
  
  const remainingDays = Math.max(0, Math.ceil((new Date(group.end_time).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
  const remainingHours = Math.max(0, Math.ceil((new Date(group.end_time).getTime() - new Date().getTime()) / (1000 * 60 * 60)))

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">拼团进度</h3>
      
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">参团进度</span>
          <span className="text-sm font-medium">
            {group.current_participants}/{group.max_participants}人
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isNearFull ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>剩余{group.max_participants - group.current_participants}个名额</span>
          <span>{progressPercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* 倒计时 */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">剩余时间</div>
        {remainingDays > 0 ? (
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {remainingDays}
            </div>
            <div className="text-sm text-gray-600">天</div>
          </div>
        ) : remainingHours > 0 ? (
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {remainingHours}
            </div>
            <div className="text-sm text-gray-600">小时</div>
          </div>
        ) : (
          <div className="text-center text-red-500 font-medium">
            拼团已结束
          </div>
        )}
      </div>

      {/* 状态提示 */}
      <div className="space-y-3">
        {group.status === 'active' && !isExpired && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-800 font-medium">拼团进行中</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              还差{group.max_participants - group.current_participants}人即可成团
            </p>
          </div>
        )}

        {isNearFull && group.status === 'active' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-orange-800 font-medium">即将满员</span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              仅剩{group.max_participants - group.current_participants}个名额，抓紧时间参团！
            </p>
          </div>
        )}

        {group.status === 'full' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-blue-800 font-medium">拼团已满</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              该拼团已达到最大人数，您可以关注其他拼团
            </p>
          </div>
        )}

        {isExpired && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-red-800 font-medium">拼团已结束</span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              该拼团已过期，您可以关注其他拼团
            </p>
          </div>
        )}
      </div>

      {/* 拼团信息 */}
      <div className="border-t pt-4 mt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">拼团创建时间：</span>
            <span>{new Date(group.created_at).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">拼团截止时间：</span>
            <span>{new Date(group.end_time).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">最低成团人数：</span>
            <span>{group.min_participants}人</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">最大参团人数：</span>
            <span>{group.max_participants}人</span>
          </div>
        </div>
      </div>
    </div>
  )
}