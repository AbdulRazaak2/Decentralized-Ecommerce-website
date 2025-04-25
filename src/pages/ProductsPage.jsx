import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/product/ProductCard'
import { categories } from '../data/mockData'
import { FaFilter, FaTimes, FaSearch, FaSortAmountDown } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductsPage() {
  const { products, isLoading, filterProducts } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1 })
  const [sortOption, setSortOption] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get('search')
    const category = queryParams.get('category')
    
    if (searchQuery) {
      setSearchTerm(searchQuery)
    }
    
    if (category) {
      setSelectedCategory(category)
    }
  }, [location.search])

  useEffect(() => {
    // Find max price in products for the price range slider
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(product => product.price)) * 1.5
      setPriceRange(prev => ({ ...prev, max: maxPrice }))
    }
  }, [products])

  useEffect(() => {
    // Filter products based on search, category, and price
    let filtered = filterProducts(searchTerm, selectedCategory, priceRange.min, priceRange.max)
    
    // Sort products
    if (sortOption === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortOption === 'rating') {
      filtered = [...filtered].sort((a, b) => b.averageRating - a.averageRating)
    } else if (sortOption === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, sortOption, products, filterProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    // The search is already handled by the effect above
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setPriceRange({ min: 0, max: priceRange.max })
    setSortOption('default')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Explore Products
          </h1>
          <p className="text-neutral-600 max-w-3xl">
            Browse our marketplace for a wide selection of products. 
            Use filters to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-3 pl-12 pr-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <FaSearch size={16} />
            </div>
          </form>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
            >
              <FaFilter size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-neutral-800">
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <FaTimes size={12} className="mr-1" />
                  Clear All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-neutral-800 font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="category-all" className="ml-2 text-neutral-700">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-neutral-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-neutral-800 font-medium mb-3">Price Range (BNB)</h3>
                <div className="flex gap-4 mb-3">
                  <div>
                    <label htmlFor="min-price" className="text-xs text-neutral-500 mb-1 block">
                      Min
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })}
                      min="0"
                      step="0.001"
                      className="py-1 px-2 border border-neutral-300 rounded w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="text-xs text-neutral-500 mb-1 block">
                      Max
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
                      min="0"
                      step="0.001"
                      className="py-1 px-2 border border-neutral-300 rounded w-full"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="text-neutral-800 font-medium mb-3">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                >
                  <option value="default">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </motion.div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse-slow">
                  <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-neutral-700 mb-2">No products found</h3>
                <p className="text-neutral-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-neutral-600">
                    Showing <span className="font-medium text-neutral-800">{filteredProducts.length}</span> products
                  </p>
                  <div className="flex items-center gap-2">
                    <FaSortAmountDown className="text-neutral-500" />
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="text-sm border-0 bg-transparent focus:outline-none text-neutral-700"
                    >
                      <option value="default">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage