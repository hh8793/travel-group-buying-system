import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MM月dd日 HH:mm', { locale: zhCN })
}

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'yyyy年MM月dd日', { locale: zhCN })
}

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'HH:mm', { locale: zhCN })
}

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(amount)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toString()
}

export const getGroupStatusColor = (status: string): string => {
  const colors = {
    recruiting: 'blue',
    active: 'green',
    completed: 'success',
    cancelled: 'red',
    expired: 'gray'
  }
  return colors[status as keyof typeof colors] || 'default'
}

export const getGroupStatusText = (status: string): string => {
  const texts = {
    recruiting: '招募中',
    active: '进行中',
    completed: '已完成',
    cancelled: '已取消',
    expired: '已过期'
  }
  return texts[status as keyof typeof texts] || status
}

export const getRoleText = (role: string): string => {
  const texts = {
    creator: '团长',
    participant: '团员',
    admin: '管理员'
  }
  return texts[role as keyof typeof texts] || role
}

export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0
  return Math.min((current / target) * 100, 100)
}

export const getTimeRemaining = (endTime: string | Date): { text: string; isExpired: boolean } => {
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { text: '已过期', isExpired: true }
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return { text: `${days}天`, isExpired: false }
  } else if (hours > 0) {
    return { text: `${hours}小时${minutes}分钟`, isExpired: false }
  } else {
    return { text: `${minutes}分钟`, isExpired: false }
  }
}