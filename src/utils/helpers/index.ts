// 工具函数
export const formatPrice = (price: number): string => {
  return price.toLocaleString('zh-CN')
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('zh-CN')
}

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export const getStatusBadge = (status: string): { color: string; text: string } => {
  switch (status) {
    case 'active':
      return { color: 'green', text: '进行中' }
    case 'full':
      return { color: 'orange', text: '已满员' }
    case 'expired':
      return { color: 'red', text: '已过期' }
    case 'completed':
      return { color: 'blue', text: '已完成' }
    default:
      return { color: 'default', text: '未知' }
  }
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}