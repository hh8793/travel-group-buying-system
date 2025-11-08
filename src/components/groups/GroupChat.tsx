'use client'

import { useState, useEffect, useRef } from 'react'
import { Input, Button, Avatar, Space, message } from 'antd'
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { useAppStore } from '@/stores'

const { TextArea } = Input

interface ChatMessage {
  id: string
  userId: string
  nickname: string
  avatar: string
  content: string
  timestamp: string
  type: 'text' | 'join' | 'leave'
}

interface GroupChatProps {
  groupId: string
}

export default function GroupChat({ groupId }: GroupChatProps) {
  const { user } = useAppStore()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟聊天消息数据
  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      userId: 'user1',
      nickname: '小明',
      avatar: '',
      content: '这个行程看起来不错，有人一起吗？',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '2',
      userId: 'user2',
      nickname: '小红',
      avatar: '',
      content: '我也觉得不错，已经参团了！',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '3',
      userId: 'user3',
      nickname: '小李',
      avatar: '',
      content: '参团成功，期待和大家一起出行！',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      type: 'join'
    },
    {
      id: '4',
      userId: 'user1',
      nickname: '小明',
      avatar: '',
      content: '太好了，我们马上就能成团了！',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '5',
      userId: 'user4',
      nickname: '小张',
      avatar: '',
      content: '请问这个行程包含餐食吗？',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      type: 'text'
    }
  ]

  useEffect(() => {
    // 加载模拟消息
    setMessages(mockMessages)
  }, [])

  useEffect(() => {
    // 自动滚动到底部
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      message.warning('请输入消息内容')
      return
    }

    if (!user) {
      message.warning('请先登录后再发送消息')
      return
    }

    setLoading(true)
    
    try {
      // 模拟发送消息
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const messageData: ChatMessage = {
        id: Date.now().toString(),
        userId: user.id,
        nickname: user.nickname || '匿名用户',
        avatar: user.avatar || '',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        type: 'text'
      }

      setMessages(prev => [...prev, messageData])
      setNewMessage('')
      
      message.success('消息发送成功')
    } catch (error) {
      message.error('消息发送失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60 * 1000) {
      return '刚刚'
    } else if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))}分钟前`
    } else if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  return (
    <div className="flex flex-col h-96">
      {/* 聊天消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💬</div>
            <div>暂无聊天记录</div>
            <div className="text-sm">快来发送第一条消息吧！</div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <Avatar
                size="small"
                src={msg.avatar}
                icon={!msg.avatar && <UserOutlined />}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{msg.nickname}</span>
                  <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.type === 'join' ? (
                  <div className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg inline-block">
                    {msg.content}
                  </div>
                ) : msg.type === 'leave' ? (
                  <div className="bg-red-100 text-red-800 text-sm px-3 py-2 rounded-lg inline-block">
                    {msg.content}
                  </div>
                ) : (
                  <div className="bg-white text-gray-800 text-sm px-3 py-2 rounded-lg inline-block max-w-xs break-words">
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 消息输入框 */}
      <div className="border-t pt-4 mt-4">
        <div className="flex space-x-2">
          <TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={user ? "输入消息..." : "请先登录后发送消息"}
            autoSize={{ minRows: 1, maxRows: 3 }}
            disabled={!user}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            className="resize-none"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            loading={loading}
            disabled={!user || !newMessage.trim()}
            className="flex-shrink-0"
          >
            发送
          </Button>
        </div>
        
        {!user && (
          <div className="text-xs text-gray-500 mt-2">
            登录后可以参与群聊，与其他团友交流
          </div>
        )}
        
        <div className="text-xs text-gray-400 mt-2">
          按 Enter 发送消息，Shift+Enter 换行
        </div>
      </div>
    </div>
  )
}