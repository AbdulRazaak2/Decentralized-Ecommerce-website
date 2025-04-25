import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaDiscord, FaMedium } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-display font-bold text-2xl mb-4">DexCommerce</div>
            <p className="text-neutral-400 mb-4">
              A decentralized e-commerce platform built on Binance Smart Chain.
              Buy and sell products securely using cryptocurrency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaDiscord size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaMedium size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-neutral-400 hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-neutral-400 hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Collectibles" className="text-neutral-400 hover:text-white transition">
                  Collectibles
                </Link>
              </li>
              <li>
                <Link to="/products?category=Digital+Art" className="text-neutral-400 hover:text-white transition">
                  Digital Art
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-neutral-400 hover:text-white transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=purchases" className="text-neutral-400 hover:text-white transition">
                  My Purchases
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=listings" className="text-neutral-400 hover:text-white transition">
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-neutral-400 hover:text-white transition">
                  Sell an Item
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Platform Status
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} DexCommerce. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer