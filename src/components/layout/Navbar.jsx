import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'
import { motion } from 'framer-motion'
import { truncateAddress } from '../../utils/helpers'
import { FaWallet, FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
  const { account, balance, connectWallet, disconnectWallet } = useWallet()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    // Navigate to products page with search query
    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    setSearchQuery('')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-2xl text-primary-800"
          >
            DexCommerce
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-3 pr-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-500">
              <FaSearch />
            </button>
          </form>
          
          <nav className="flex items-center space-x-6">
            <Link to="/products" className="font-medium text-neutral-700 hover:text-primary-600 transition">
              Explore
            </Link>
            <Link to="/sell" className="font-medium text-neutral-700 hover:text-primary-600 transition">
              Sell
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {account ? (
              <>
                <div className="flex items-center bg-neutral-100 rounded-lg pl-3 pr-4 py-2">
                  <FaWallet className="text-secondary-500 mr-2" />
                  <span className="text-sm font-medium">
                    {parseFloat(balance).toFixed(4)} BNB
                  </span>
                </div>
                <div className="relative group">
                  <button className="btn-primary flex items-center">
                    <FaUser className="mr-2" />
                    <span>{truncateAddress(account)}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 invisible group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition">
                      My Profile
                    </Link>
                    <button 
                      onClick={disconnectWallet}
                      className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={connectWallet} className="btn-primary flex items-center">
                <FaWallet className="mr-2" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-700 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-3 pr-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-500">
                <FaSearch />
              </button>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/products" className="font-medium text-neutral-700 hover:text-primary-600 transition py-2">
                Explore
              </Link>
              <Link to="/sell" className="font-medium text-neutral-700 hover:text-primary-600 transition py-2">
                Sell
              </Link>
              <Link to="/profile" className="font-medium text-neutral-700 hover:text-primary-600 transition py-2">
                My Profile
              </Link>
            </nav>
            
            {account ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center bg-neutral-100 rounded-lg px-3 py-2">
                  <FaWallet className="text-secondary-500 mr-2" />
                  <span className="text-sm font-medium">
                    {parseFloat(balance).toFixed(4)} BNB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-700">
                    {truncateAddress(account)}
                  </div>
                  <button 
                    onClick={disconnectWallet}
                    className="text-error-500 text-sm font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={connectWallet} 
                className="btn-primary w-full mt-4 flex items-center justify-center"
              >
                <FaWallet className="mr-2" />
                Connect Wallet
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar