'use client'

import { useState } from 'react'
import { Card, Input, Select, Button, DatePicker, Slider, Space, Row, Col } from 'antd'
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import type { Category } from '@/types'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const { Option } = Select

interface GroupFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
  onSearch: (keyword: string) => void
  categories: Category[]
}

export default function GroupFilters({ 
  filters, 
  onFilterChange, 
  onSearch, 
  categories 
}: GroupFiltersProps) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])

  const handleSearch = () => {
    onSearch(searchKeyword)
  }

  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ [key]: value })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    handleFilterChange('priceRange', value)
  }

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      handleFilterChange('startDate', dates[0].format('YYYY-MM-DD'))
      handleFilterChange('endDate', dates[1].format('YYYY-MM-DD'))
    } else {
      handleFilterChange('startDate', '')
      handleFilterChange('endDate', '')
    }
  }

  const resetFilters = () => {
    const resetFilters = {
      category: '',
      destination: '',
      priceRange: [0, 10000],
      startDate: '',
      endDate: '',
      status: 'active',
      sortBy: 'created_at',
      sortOrder: 'desc'
    }
    setSearchKeyword('')
    setPriceRange([0, 10000])
    onFilterChange(resetFilters)
  }

  return (
    <Card className="glass shadow-sm animate-fade-in">
      <div className="space-y-6">
        {/* 标题区 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FilterOutlined />
            精选筛选
          </h2>
          <Button type="default" icon={<ReloadOutlined />} onClick={resetFilters}>
            重置
          </Button>
        </div>

        {/* 搜索框 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">搜索拼团</h3>
          <div className="flex gap-2">
            <Input
              placeholder="搜索目的地、产品名称..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
              allowClear
              size="large"
            />
            <Button type="primary" onClick={handleSearch} size="large" className="btn-cta">
              搜索
            </Button>
          </div>
        </div>

        {/* 分类筛选 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">旅游分类</h3>
          <Select
            style={{ width: '100%' }}
            placeholder="选择分类"
            value={filters.category || undefined}
            onChange={(value) => handleFilterChange('category', value)}
            allowClear
            size="large"
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* 目的地筛选 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">目的地</h3>
          <Input
            placeholder="输入目的地"
            value={filters.destination}
            onChange={(e) => handleFilterChange('destination', e.target.value)}
            allowClear
            size="large"
          />
        </div>

        {/* 价格范围 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">价格范围</h3>
          <div className="space-y-3">
            <Slider
              range
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onChange={handlePriceChange}
              tooltip={{ formatter: (value) => `¥${value}` }}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>¥{priceRange[0]}</span>
              <span>¥{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* 出行日期 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">出行日期</h3>
          <RangePicker
            style={{ width: '100%' }}
            placeholder={['开始日期', '结束日期']}
            onChange={handleDateChange}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            size="large"
          />
        </div>

        {/* 拼团状态 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">拼团状态</h3>
          <Select
            style={{ width: '100%' }}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            size="large"
          >
            <Option value="">全部状态</Option>
            <Option value="active">进行中</Option>
            <Option value="full">已满员</Option>
            <Option value="completed">已完成</Option>
            <Option value="expired">已过期</Option>
          </Select>
        </div>

        {/* 排序方式 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">排序方式</h3>
          <Row gutter={8}>
            <Col span={12}>
              <Select
                style={{ width: '100%' }}
                value={filters.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
                size="large"
              >
                <Option value="created_at">创建时间</Option>
                <Option value="price">价格</Option>
                <Option value="participants">参团人数</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: '100%' }}
                value={filters.sortOrder}
                onChange={(value) => handleFilterChange('sortOrder', value)}
                size="large"
              >
                <Option value="desc">降序</Option>
                <Option value="asc">升序</Option>
              </Select>
            </Col>
          </Row>
        </div>

        {/* 重置按钮 */}
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={resetFilters}
          block
          size="large"
        >
          重置筛选
        </Button>
      </div>
    </Card>
  )
}