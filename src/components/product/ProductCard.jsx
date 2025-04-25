import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { truncateAddress } from '../../utils/helpers'

function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden h-48 md:h-56">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-1 text-neutral-800 group-hover:text-primary-600 transition">
              {product.name}
            </h3>
            <div className="text-lg font-semibold text-secondary-600">
              {product.price} BNB
            </div>
          </div>
          <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="text-xs text-neutral-500">
              Seller: {product.seller.name || truncateAddress(product.seller.address)}
            </div>
            <div className="flex items-center">
              <FaStar className="text-secondary-500 mr-1" />
              <span className="text-sm font-medium">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard