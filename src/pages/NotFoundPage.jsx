import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFoundPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-8">
              <svg 
                className="w-40 h-40 mx-auto text-neutral-200" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-neutral-800">404</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-neutral-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
              Let's get you back to shopping!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
              <Link to="/products" className="btn-outline">
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage