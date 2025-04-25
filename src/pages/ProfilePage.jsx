import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { useProducts } from '../context/ProductContext'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaWallet, FaShoppingBag, FaListAlt, FaMedal, FaEdit, FaTag, FaStar } from 'react-icons/fa'
import { truncateAddress, formatCrypto, formatPoints } from '../utils/helpers'
import ProductCard from '../components/product/ProductCard'

function ProfilePage() {
  const { account, balance } = useWallet()
  const { products } = useProducts()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [activeTab, setActiveTab] = useState('purchases')
  const [loyaltyPoints, setLoyaltyPoints] = useState(2500) // Mock data
  const [mockPurchases, setMockPurchases] = useState([])
  const [userListings, setUserListings] = useState([])
  
  useEffect(() => {
    if (!account) {
      navigate('/')
      toast.info('Please connect your wallet to view your profile')
      return
    }
    
    // In a real app, we would fetch these from the blockchain
    generateMockData()
    
    // Check if the URL has a tab parameter
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    if (tab && ['purchases', 'listings', 'rewards'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [account, navigate, location.search])
  
  useEffect(() => {
    if (products.length > 0 && account) {
      // Filter products listed by the current user
      const listings = products.filter(product => 
        product.seller.address.toLowerCase() === account.toLowerCase()
      )
      setUserListings(listings)
    }
  }, [products, account])
  
  const generateMockData = () => {
    // Generate mock purchase history
    const purchases = []
    for (let i = 0; i < 3; i++) {
      const randomProductIndex = Math.floor(Math.random() * products.length)
      if (products[randomProductIndex]) {
        purchases.push({
          id: `purchase-${i}`,
          product: products[randomProductIndex],
          date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          status: ['Delivered', 'Shipped', 'Processing'][Math.floor(Math.random() * 3)],
          txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
          quantity: Math.floor(Math.random() * 3) + 1
        })
      }
    }
    setMockPurchases(purchases)
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'purchases':
        return (
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              Purchase History
            </h2>
            
            {mockPurchases.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="inline-block p-4 bg-neutral-100 rounded-full mb-4">
                  <FaShoppingBag className="text-3xl text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  No Purchases Yet
                </h3>
                <p className="text-neutral-600 mb-4">
                  You haven't made any purchases yet. Start shopping on the marketplace!
                </p>
                <Link to="/products" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {mockPurchases.map((purchase) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <img 
                          src={purchase.product.image} 
                          alt={purchase.product.name}
                          className="w-full h-28 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                          <div>
                            <Link 
                              to={`/products/${purchase.product.id}`}
                              className="text-lg font-medium text-neutral-800 hover:text-primary-600 transition"
                            >
                              {purchase.product.name}
                            </Link>
                            <div className="text-sm text-neutral-500">
                              {new Date(purchase.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                              purchase.status === 'Delivered' 
                                ? 'bg-success-50 text-success-700' 
                                : purchase.status === 'Shipped'
                                ? 'bg-secondary-50 text-secondary-700'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}>
                              {purchase.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <div>
                            <div className="text-neutral-600 text-sm mb-1">
                              Quantity: {purchase.quantity}
                            </div>
                            <div className="text-neutral-600 text-sm">
                              Total: <span className="font-medium">{formatCrypto(purchase.product.price * purchase.quantity)} BNB</span>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
                            <a 
                              href={`https://testnet.bscscan.com/tx/${purchase.txHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              View Transaction
                            </a>
                            {purchase.status === 'Delivered' && (
                              <button className="text-sm text-secondary-600 hover:text-secondary-700 flex items-center">
                                <FaStar className="mr-1" />
                                Leave Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )
      
      case 'listings':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-800">
                Your Listings
              </h2>
              <Link to="/sell" className="btn-primary">
                <FaTag className="mr-2" />
                Add New Listing
              </Link>
            </div>
            
            {userListings.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="inline-block p-4 bg-neutral-100 rounded-full mb-4">
                  <FaListAlt className="text-3xl text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  No Listings Yet
                </h3>
                <p className="text-neutral-600 mb-4">
                  You haven't listed any products for sale yet. Create your first listing now!
                </p>
                <Link to="/sell" className="btn-primary">
                  Create Listing
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )
      
      case 'rewards':
        return (
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              Loyalty Rewards
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-secondary-600 to-secondary-400 p-6 text-white">
                <div className="flex items-center">
                  <FaMedal className="text-4xl text-white mr-3" />
                  <div>
                    <div className="text-lg font-medium">Loyalty Points</div>
                    <div className="text-3xl font-bold">{formatPoints(loyaltyPoints)}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-neutral-800 font-medium mb-4">Rewards Available</div>
                
                <div className="space-y-4">
                  <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-neutral-800">5% Discount</div>
                        <div className="text-sm text-neutral-600">
                          Receive 5% off your next purchase
                        </div>
                      </div>
                      <div className="text-secondary-600 font-medium">
                        1,000 points
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        Redeem Reward
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-neutral-800">10% Discount</div>
                        <div className="text-sm text-neutral-600">
                          Receive 10% off your next purchase
                        </div>
                      </div>
                      <div className="text-secondary-600 font-medium">
                        2,500 points
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        Redeem Reward
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-neutral-800">Free Shipping</div>
                        <div className="text-sm text-neutral-600">
                          Get free shipping on your next order
                        </div>
                      </div>
                      <div className="text-secondary-600 font-medium">
                        1,500 points
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        Redeem Reward
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-neutral-800 font-medium mb-3">How to Earn Points</div>
                  <ul className="text-neutral-600 text-sm space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>100 points for every purchase</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>50 points for leaving a review</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>200 points for referring a friend</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  if (!account) {
    return null
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {account.substring(2, 4)}
                </div>
                <div className="ml-4">
                  <h1 className="text-xl md:text-2xl font-bold text-neutral-800">
                    My Profile
                  </h1>
                  <div className="flex items-center mt-1">
                    <div className="text-neutral-600 flex items-center">
                      <FaWallet className="mr-1 text-primary-500" />
                      {truncateAddress(account)}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(account)
                        toast.info('Address copied to clipboard')
                      }}
                      className="ml-2 text-neutral-400 hover:text-primary-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="text-neutral-600">Wallet Balance</div>
                <div className="text-xl font-bold text-primary-600">
                  {balance ? parseFloat(balance).toFixed(4) : '0'} BNB
                </div>
                <div className="text-secondary-600 flex items-center mt-1">
                  <FaMedal className="mr-1" />
                  {formatPoints(loyaltyPoints)} Loyalty Points
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Tabs Navigation */}
          <div className="mb-8 flex flex-col sm:flex-row justify-center">
            <div className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`flex items-center justify-center px-4 py-3 ${
                  activeTab === 'purchases' 
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <FaShoppingBag className="mr-2" />
                Purchases
              </button>
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex items-center justify-center px-4 py-3 ${
                  activeTab === 'listings' 
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <FaListAlt className="mr-2" />
                Your Listings
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex items-center justify-center px-4 py-3 ${
                  activeTab === 'rewards' 
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <FaMedal className="mr-2" />
                Rewards
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage