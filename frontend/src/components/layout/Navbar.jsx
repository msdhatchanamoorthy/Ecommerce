import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../../context/authStore';
import useCartStore from '../../context/cartStore';
import useWishlistStore from '../../context/wishlistStore';
import useThemeStore from '../../context/themeStore';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition flex items-center gap-2">
              🛍️ ShopHub
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition">
              Products
            </Link>
            
            {isAuthenticated && (
              <Link to="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition relative">
                ❤️ Wishlist
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}

            <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition relative">
              🛒 Cart
              {cart?.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="text-2xl"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition font-semibold">
                    👨‍💼 Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition font-semibold">
                    👤 {user.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700">
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 border-t border-gray-200 dark:border-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="text-2xl"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 dark:text-gray-300 text-2xl"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700"
          >
            <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
              Home
            </Link>
            <Link to="/products" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
              Products
            </Link>
            {isAuthenticated && (
              <Link to="/wishlist" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
                Wishlist ({wishlist.length})
              </Link>
            )}
            <Link to="/cart" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
              Cart ({cart?.items?.length || 0})
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
                  Profile
                </Link>
                <Link to="/orders" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 px-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-orange-500 font-bold">
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
