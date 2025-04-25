import { createContext, useContext, useState, useEffect } from 'react'
import { mockProducts } from '../data/mockData'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch products from the blockchain or API
    // For now, we'll use mock data
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProducts(mockProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getProductById = (id) => {
    return products.find(product => product.id === id)
  }

  const addProduct = (product) => {
    // In a real app, this would interact with a smart contract
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      seller: { address: product.sellerAddress, name: 'Anonymous' },
      reviews: [],
      averageRating: 0
    }
    
    setProducts([newProduct, ...products])
    return newProduct
  }

  const addReview = (productId, review) => {
    // In a real app, this would interact with a smart contract
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const updatedReviews = [...product.reviews, review]
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0)
          const averageRating = totalRating / updatedReviews.length
          
          return {
            ...product,
            reviews: updatedReviews,
            averageRating
          }
        }
        return product
      })
    )
  }

  const filterProducts = (query = '', category = null, minPrice = 0, maxPrice = Infinity) => {
    return products.filter(product => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                          product.description.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !category || product.category === category
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      
      return matchesQuery && matchesCategory && matchesPrice
    })
  }

  const value = {
    products,
    isLoading,
    getProductById,
    addProduct,
    addReview,
    filterProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}