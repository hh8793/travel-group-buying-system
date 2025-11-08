'use client'

import { Card, Tag, Space, Typography, Divider, Button } from 'antd'
import { supabase, supabaseIsMock } from '@/lib/supabase'

export default function HealthPage() {
  const items = [
    { label: 'App Env', value: process.env.NEXT_PUBLIC_APP_ENV || 'unknown' },
    { label: 'Supabase URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing' },
    { label: 'Supabase Key', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing' },
    { label: 'Supabase Client', value: supabaseIsMock ? 'mock' : 'real' },
  ]

  const testQuery = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(1)

      if (error) throw error
      alert(`Query OK. Rows: ${data?.length ?? 0}`)
    } catch (err: any) {
      alert(`Query Error: ${err?.message || 'unknown'}`)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>健康检查</Typography.Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space wrap>
            {items.map((it) => (
              <Tag key={it.label} color="blue">
                {it.label}: {it.value}
              </Tag>
            ))}
          </Space>
        </Card>
        <Card>
          <Space>
            <Button type="primary" onClick={testQuery}>测试 categories 查询</Button>
          </Space>
        </Card>
        <Divider />
        <Typography.Paragraph>
          若 Supabase 为 mock，查询将返回空或报错；真实配置则返回数据库结果。
        </Typography.Paragraph>
      </Space>
    </div>
  )
}