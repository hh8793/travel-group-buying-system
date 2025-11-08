import { GroupBuying, GroupParticipant } from '@/types/models'
import { Avatar } from 'antd'
import { UserOutlined, CrownOutlined } from '@ant-design/icons'

interface GroupParticipantsProps {
  group: GroupBuying
}

export default function GroupParticipants({ group }: GroupParticipantsProps) {
  const totalTarget = group.target_participants || group.current_participants || 1
  const progressPercent = Math.min(100, Math.round((group.current_participants / totalTarget) * 100))
  const isCreator = (participantUserId: string) => participantUserId === group.creator_id

  return (
    <div className="space-y-6">
      {/* 参团统计 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">参团统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{group.current_participants}</div>
            <div className="text-sm text-gray-600">已参团</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">{Math.max(totalTarget - group.current_participants, 0)}</div>
            <div className="text-sm text-gray-600">剩余名额</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{progressPercent}%</div>
            <div className="text-sm text-gray-600">完成度</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{group.min_participants}</div>
            <div className="text-sm text-gray-600">最低成团</div>
          </div>
        </div>
      </div>

      {/* 参团人员列表 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          参团人员 ({group.current_participants}/{totalTarget})
        </h3>
        
        {group.participants && group.participants.length > 0 ? (
          <div className="space-y-4">
            {group.participants.map((participant: GroupParticipant, index: number) => (
              <div key={participant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar
                      size="large"
                      src={participant.user?.avatar_url}
                      icon={!participant.user?.avatar_url && <UserOutlined />}
                    />
                    {isCreator(participant.user_id) && (
                      <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                        <CrownOutlined className="text-xs text-yellow-800" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{participant.user?.nickname || '匿名用户'}</span>
                      {isCreator(participant.user_id) && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          团长
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      参团时间：{new Date(participant.joined_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    第{index + 1}位参团
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">暂无参团人员</div>
            <div className="text-sm text-gray-500">成为第一个参团的人吧！</div>
          </div>
        )}
      </div>

      {/* 参团动态 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">参团动态</h3>
        <div className="space-y-3">
          {group.participants && group.participants.length > 0 ? (
            group.participants.slice(-5).reverse().map((participant: GroupParticipant, index: number) => (
              <div key={`activity-${participant.id}-${index}`} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar
                  size="small"
                  src={participant.user?.avatar_url}
                  icon={!participant.user?.avatar_url && <UserOutlined />}
                />
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{participant.user?.nickname || '匿名用户'}</span>
                    <span className="text-gray-600 ml-2">
                      {isCreator(participant.user_id) ? '创建了拼团' : '参与了拼团'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(participant.joined_at).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              暂无参团动态
            </div>
          )}
        </div>
      </div>
    </div>
  )
}