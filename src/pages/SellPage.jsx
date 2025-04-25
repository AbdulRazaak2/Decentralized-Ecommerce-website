import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useWallet } from '../context/WalletContext'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaUpload, FaImage, FaTag, FaCircleNotch } from 'react-icons/fa'
import { categories } from '../data/mockData'

function SellPage() {
  const { addProduct } = useProducts()
  const { account } = useWallet()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 1,
    image: '',
    sellerAddress: ''
  })
  
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  
  // For demo purposes, we're using placeholder images
  const placeholderImages = [
    'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ]
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Validation for numerical inputs
    if (name === 'price') {
      if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
        setProduct({ ...product, [name]: value })
        if (errors[name]) {
          setErrors({ ...errors, [name]: null })
        }
      }
    } else if (name === 'stock') {
      if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
        setProduct({ ...product, [name]: value === '' ? '' : parseInt(value) })
        if (errors[name]) {
          setErrors({ ...errors, [name]: null })
        }
      }
    } else {
      setProduct({ ...product, [name]: value })
      if (errors[name]) {
        setErrors({ ...errors, [name]: null })
      }
    }
  }
  
  const handleSelectImage = (url) => {
    setProduct({ ...product, image: url })
    setImagePreview(url)
    if (errors.image) {
      setErrors({ ...errors, image: null })
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required'
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!product.price || parseFloat(product.price) <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }
    
    if (!product.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!product.stock || product.stock <= 0) {
      newErrors.stock = 'Stock must be at least 1'
    }
    
    if (!product.image) {
      newErrors.image = 'Product image is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!account) {
      toast.warning('Please connect your wallet first')
      return
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // In a real app, this would interact with a smart contract
      const newProduct = await addProduct({
        ...product,
        price: parseFloat(product.price),
        sellerAddress: account
      })
      
      toast.success('Product listed successfully!')
      navigate(`/products/${newProduct.id}`)
    } catch (error) {
      console.error('Error listing product:', error)
      toast.error('Failed to list product')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              List Your Product
            </h1>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Create your product listing and start selling on our decentralized marketplace. 
              All transactions are secured through smart contracts.
            </p>
          </motion.div>
          
          {!account ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-block p-4 bg-neutral-100 rounded-full mb-4">
                <FaWallet className="text-4xl text-neutral-500" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-3">
                Connect Your Wallet to Sell
              </h2>
              <p className="text-neutral-600 mb-6">
                You need to connect your cryptocurrency wallet first to list products on the marketplace.
              </p>
              <button
                onClick={() => document.querySelector('.btn-primary')?.click()}
                className="btn-primary"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className={`input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="e.g. Wireless Headphones"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-500">{errors.name}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={product.description}
                    onChange={handleInputChange}
                    className={`input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Describe your product in detail..."
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-500">{errors.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">
                      Price (BNB)
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      className={`input ${errors.price ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="0.05"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-error-500">{errors.price}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleInputChange}
                      className={`input ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-error-500">{errors.category}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="stock" className="block text-sm font-medium text-neutral-700 mb-1">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="1"
                    value={product.stock}
                    onChange={handleInputChange}
                    className={`input ${errors.stock ? 'border-error-500 focus:ring-error-500' : ''}`}
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-error-500">{errors.stock}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Product Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('')
                          setProduct({ ...product, image: '' })
                        }}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100"
                      >
                        <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {placeholderImages.map((url, index) => (
                        <div 
                          key={index}
                          onClick={() => handleSelectImage(url)}
                          className="cursor-pointer relative group rounded-lg overflow-hidden h-40"
                        >
                          <img 
                            src={url}
                            alt={`Placeholder ${index + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <FaImage className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.image && (
                    <p className="mt-2 text-sm text-error-500">{errors.image}</p>
                  )}
                  
                  <p className="mt-2 text-sm text-neutral-500">
                    <FaTag className="inline mr-1" />
                    Select a sample image for your product.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <FaCircleNotch className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        List Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellPage