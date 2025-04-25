import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useWallet } from '../context/WalletContext'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaStar, FaShoppingCart, FaWallet, FaClock, FaShieldAlt, FaArrowLeft, FaTag } from 'react-icons/fa'
import { truncateAddress, formatDate, calculateEscrowFee } from '../utils/helpers'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, addReview } = useProducts()
  const { account, sendPayment } = useWallet()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const [isPurchasing, setIsPurchasing] = useState(false)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const foundProduct = getProductById(id)
        
        if (!foundProduct) {
          navigate('/not-found')
          return
        }
        
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProduct()
  }, [id, getProductById, navigate])
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= product.stock) {
      setQuantity(value)
    }
  }
  
  const handleBuy = async () => {
    if (!account) {
      toast.warning('Please connect your wallet first')
      return
    }
    
    try {
      setIsPurchasing(true)
      const totalAmount = (product.price * quantity).toString()
      const escrowFee = calculateEscrowFee(product.price * quantity)
      const totalWithFee = (parseFloat(totalAmount) + escrowFee).toFixed(6)
      
      // In a real application, this would call the escrow smart contract
      const tx = await sendPayment(product.seller.address, totalWithFee)
      
      if (tx) {
        toast.success('Purchase successful! Transaction sent to escrow contract.')
      } else {
        toast.error('Transaction failed or was rejected')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error('Failed to process purchase')
    } finally {
      setIsPurchasing(false)
    }
  }
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    
    if (!account) {
      toast.warning('Please connect your wallet first')
      return
    }
    
    if (review.comment.trim() === '') {
      toast.warning('Please enter a comment')
      return
    }
    
    try {
      setIsSubmittingReview(true)
      
      // In a real app, this would be stored on the blockchain
      const newReview = {
        id: Date.now().toString(),
        user: account,
        username: truncateAddress(account),
        rating: review.rating,
        comment: review.comment,
        date: new Date().toISOString()
      }
      
      addReview(product.id, newReview)
      
      toast.success('Review submitted successfully!')
      setReview({ rating: 5, comment: '' })
      setShowReviewForm(false)
      
      // Update the product in the local state
      setProduct(getProductById(id))
    } catch (error) {
      console.error('Review submission error:', error)
      toast.error('Failed to submit review')
    } finally {
      setIsSubmittingReview(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-pulse-slow">
          <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return null
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Product Details */}
            <div className="p-6 lg:col-span-2">
              <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center ml-4">
                        <FaStar className="text-secondary-500 mr-1" />
                        <span className="text-sm font-medium">
                          {product.averageRating.toFixed(1)}
                        </span>
                        <span className="text-sm text-neutral-500 ml-1">
                          ({product.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
                      {product.name}
                    </h1>
                    
                    <div className="text-2xl font-bold text-primary-600 mb-6">
                      {product.price} BNB
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-neutral-800 mb-2">
                        Description
                      </h2>
                      <p className="text-neutral-600">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <FaTag className="text-neutral-500 mr-2" />
                        <span className="text-neutral-600">
                          Listed by{' '}
                          <span className="font-medium">
                            {product.seller.name || truncateAddress(product.seller.address)}
                          </span>{' '}
                          on {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <FaShieldAlt className="text-success-500 mr-2" />
                        <h3 className="font-medium text-neutral-800">
                          Escrow Protection
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600">
                        This transaction is protected by our escrow service. 
                        Funds are only released to the seller when you confirm receipt of the item.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="lg:col-span-1 mt-6 lg:mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-neutral-50 p-5 rounded-lg border border-neutral-200"
                  >
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-600">Price:</span>
                        <span className="font-medium text-neutral-800">{product.price} BNB</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-600">Status:</span>
                        <span className="font-medium text-success-600">In Stock</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Quantity Available:</span>
                        <span className="font-medium text-neutral-800">{product.stock}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-1">
                        Quantity
                      </label>
                      <div className="flex">
                        <button
                          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          className="px-3 py-2 border border-r-0 border-neutral-300 rounded-l-lg bg-neutral-100 text-neutral-600"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          min="1"
                          max={product.stock}
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-full text-center border-y border-neutral-300 py-2 focus:outline-none text-neutral-800"
                        />
                        <button
                          onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                          className="px-3 py-2 border border-l-0 border-neutral-300 rounded-r-lg bg-neutral-100 text-neutral-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-neutral-600">Subtotal:</span>
                        <span className="font-medium text-neutral-800">
                          {(product.price * quantity).toFixed(6)} BNB
                        </span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-neutral-600">Escrow Fee (2.5%):</span>
                        <span className="font-medium text-neutral-800">
                          {calculateEscrowFee(product.price * quantity).toFixed(6)} BNB
                        </span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-primary-600">
                          {(product.price * quantity + calculateEscrowFee(product.price * quantity)).toFixed(6)} BNB
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBuy}
                      disabled={isPurchasing || !account}
                      className="btn-primary w-full mb-3 flex items-center justify-center"
                    >
                      {isPurchasing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaWallet className="mr-2" />
                          Buy Now
                        </>
                      )}
                    </button>
                    
                    <div className="text-xs text-neutral-500 flex items-start">
                      <FaClock className="text-neutral-400 mt-0.5 mr-1 flex-shrink-0" />
                      <span>
                        Typically ships within 1-3 business days. 
                        You'll receive a notification when the item is shipped.
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">
              Reviews ({product.reviews.length})
            </h2>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-outline"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>
          
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md mb-8"
            >
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Write Your Review
              </h3>
              
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-neutral-700 mb-2">Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview({ ...review, rating: star })}
                        className="text-2xl text-secondary-400 focus:outline-none"
                      >
                        <FaStar 
                          className={star <= review.rating ? 'text-secondary-500' : 'text-neutral-300'} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-neutral-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Share your experience with this product..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !account}
                    className="btn-primary"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          {product.reviews.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="inline-block p-3 bg-neutral-100 rounded-full mb-4">
                <FaStar className="text-3xl text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-800 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-neutral-600 mb-4">
                Be the first to review this product!
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="btn-outline"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-primary-100 text-primary-800 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                        {review.username.substring(0, 2)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-neutral-800">
                          {review.username}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {formatDate(review.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={star <= review.rating ? 'text-secondary-500' : 'text-neutral-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-700">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage