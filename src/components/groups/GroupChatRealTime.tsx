'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, Input, Button, Avatar, List, Space, message } from 'antd'
import { UserOutlined, SendOutlined } from '@ant-design/icons'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

interface ChatMessage {
  id: string
  group_id: string
  user_id: string
  message: string
  created_at: string
  users: {
    nickname: string
    email: string
  }
}

interface GroupChatRealTimeProps {
  groupId: string
}

export default function GroupChatRealTime({ groupId }: GroupChatRealTimeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadMessages()
    
    // 订阅实时消息
    const subscription = supabase
      .channel(`chat:${groupId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `group_id=eq.${groupId}`
      }, (payload: RealtimePostgresChangesPayload<ChatMessage>) => {
        setMessages(prev => [...prev, payload.new as ChatMessage])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [groupId])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          users(nickname, email)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      message.error('加载消息失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      setSending(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        message.warning('请先登录')
        return
      }

      const { error } = await supabase
        .from('chat_messages')
        .insert({
          group_id: groupId,
          user_id: user.id,
          message: newMessage.trim(),
          created_at: new Date().toISOString(),
        })

      if (error) throw error

      setNewMessage('')
      message.success('消息发送成功')
    } catch (error: any) {
      message.error('发送消息失败: ' + error.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-96">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t-lg">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">加载消息中...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">暂无消息，开始聊天吧！</p>
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item className="mb-3">
                <div className="flex items-start space-x-3 w-full">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">
                        {msg.users?.nickname || msg.users?.email || '匿名用户'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-800">{msg.message}</p>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      {/* 输入框 */}
      <div className="p-4 bg-white border-t rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            placeholder="输入消息..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={sendMessage}
            className="flex-1"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={sending}
            onClick={sendMessage}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}