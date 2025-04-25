// Truncate Ethereum/BSC address for display
export const truncateAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Format date to readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format timestamp to time ago
export const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const seconds = Math.floor((new Date() - date) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'
  
  return Math.floor(seconds) + ' seconds ago'
}

// Calculate average rating
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0)
  return sum / reviews.length
}

// Generate random transaction hash for mock data
export const generateTxHash = () => {
  return '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

// Calculate escrow fee (2.5% in this example)
export const calculateEscrowFee = (amount) => {
  return amount * 0.025
}

// Format currency with 6 decimals max (for crypto)
export const formatCrypto = (value) => {
  const num = parseFloat(value)
  if (isNaN(num)) return '0'
  
  if (num < 0.000001) {
    return num.toExponential(4)
  }
  
  return num.toFixed(6).replace(/\.?0+$/, '')
}

// Format loyalty points
export const formatPoints = (points) => {
  return parseInt(points).toLocaleString()
}