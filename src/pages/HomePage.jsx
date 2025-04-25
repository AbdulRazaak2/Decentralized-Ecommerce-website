import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/product/ProductCard'
import { FaShoppingCart, FaShieldAlt, FaMedal, FaWallet } from 'react-icons/fa'

function HomePage() {
  const { products, isLoading } = useProducts()
  
  // Get featured products (limited to 4)
  const featuredProducts = products.slice(0, 4)
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/90 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-[-1]" 
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            filter: 'brightness(0.4)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 pt-24 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Decentralized Commerce
                <span className="text-secondary-400 block mt-2">Powered by Blockchain</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Buy and sell products securely with cryptocurrency. 
                No middlemen, lower fees, and complete ownership over your transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary">
                  Browse Products
                </Link>
                <Link to="/sell" className="btn-outline text-white border-white hover:bg-white/10">
                  Start Selling
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="glass-card p-6 shadow-lg bg-white/10">
                <div className="text-white text-xl font-semibold mb-4">Featured Product</div>
                {products.length > 0 && (
                  <div className="bg-white rounded-lg overflow-hidden">
                    <img 
                      src={products[0].image} 
                      alt={products[0].name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 text-neutral-800">
                        {products[0].name}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                        {products[0].description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-600">
                          {products[0].price} BNB
                        </span>
                        <Link 
                          to={`/products/${products[0].id}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <svg 
              className="w-10 h-10 text-white animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose DexCommerce?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to provide a secure, 
              transparent, and efficient shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Escrow Security</h3>
              <p className="text-neutral-600">
                Our smart contract escrow system ensures your funds are only released when you receive your purchase.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWallet className="text-secondary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Crypto Payments</h3>
              <p className="text-neutral-600">
                Pay with cryptocurrency for faster transactions and lower fees than traditional payment methods.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Verified Reviews</h3>
              <p className="text-neutral-600">
                All reviews are stored on the blockchain, ensuring they're authentic and cannot be manipulated.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMedal className="text-neutral-800 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Loyalty Rewards</h3>
              <p className="text-neutral-600">
                Earn loyalty tokens with every purchase that can be redeemed for discounts on future purchases.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">
              Featured Products
            </h2>
            <Link to="/products" className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse-slow">
                <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative py-20 bg-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#fff"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to join the future of e-commerce?
            </h2>
            <p className="text-neutral-300 text-lg mb-8">
              Connect your wallet today and start buying or selling with the security and transparency of blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
              <Link to="/sell" className="btn-outline text-white border-white hover:bg-white/10">
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage