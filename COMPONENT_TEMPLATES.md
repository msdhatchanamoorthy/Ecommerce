# React Component Templates

This file contains template code for all essential React components to complete the frontend.

## Layout Components

### Navbar.jsx
```jsx
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../context/authStore';
import useCartStore from '../../context/cartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getCartCount } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary-600 transition">
              Products
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative">
                  <FiShoppingCart className="w-6 h-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist">
                  <FiHeart className="w-6 h-6" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <FiUser className="w-6 h-6" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <Link to="/" className="block py-2">Home</Link>
              <Link to="/products" className="block py-2">Products</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="block py-2">Cart ({getCartCount()})</Link>
                  <Link to="/profile" className="block py-2">Profile</Link>
                  <Link to="/orders" className="block py-2">Orders</Link>
                  <button onClick={handleLogout} className="block py-2 text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2">Login</Link>
                  <Link to="/register" className="block py-2">Register</Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
```

### Footer.jsx
```jsx
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ShopHub</h3>
            <p className="text-sm">Your one-stop shop for quality products at great prices.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-500"><FiFacebook /></a>
              <a href="#" className="hover:text-primary-500"><FiTwitter /></a>
              <a href="#" className="hover:text-primary-500"><FiInstagram /></a>
              <a href="#" className="hover:text-primary-500"><FiMail /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-primary-500">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="hover:text-primary-500">Electronics</Link></li>
              <li><Link to="/products?category=Clothing" className="hover:text-primary-500">Clothing</Link></li>
              <li><Link to="/products?featured=true" className="hover:text-primary-500">Featured</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary-500">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-500">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-500">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary-500">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for exclusive deals and updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## Auth Components

### ProtectedRoute.jsx
```jsx
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

### AdminRoute.jsx
```jsx
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminRoute;
```

## Product Components

### ProductCard.jsx
```jsx
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useCartStore from '../../context/cartStore';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addToCart(product._id, 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{product.discount}%
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.round(product.ratings))}
            {'☆'.repeat(5 - Math.round(product.ratings))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.numOfReviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="flex space-x-2">
        <button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
          className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
        >
          <FiShoppingCart />
          <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
        </button>
        <button className="btn btn-outline">
          <FiHeart />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
```

### FilterSidebar.jsx
```jsx
import { useState, useEffect } from 'react';
import { productAPI } from '../../services/api';

const FilterSidebar = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await productAPI.getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.checked ? category : '',
                  })
                }
                className="rounded"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.maxPrice || 1000}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>$0</span>
            <span>${filters.maxPrice || 1000}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => setFilters({ ...filters, rating })}
              />
              <span className="text-yellow-400">
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
              </span>
              <span>& Up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({})}
        className="w-full btn btn-outline"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
```

## Common Components

### LoadingSpinner.jsx
```jsx
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
```

## Page Templates

### Home.jsx (Simplified)
```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { productAPI } from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await productAPI.getFeatured();
        setFeatured(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">
              Welcome to ShopHub
            </h1>
            <p className="text-xl mb-8">
              Discover amazing products at unbeatable prices
            </p>
            <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```

### Products.jsx (Simplified)
```jsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import { productAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getAll(filters);
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>
        
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
```

## Additional Component Notes

To complete the frontend, you'll need to create:

1. **Login.jsx** - Login form with validation
2. **Register.jsx** - Registration form
3. **Cart.jsx** - Shopping cart with item management
4. **Checkout.jsx** - Checkout form with Stripe integration
5. **Profile.jsx** - User profile and address management
6. **Orders.jsx** - Order history list
7. **OrderDetails.jsx** - Single order view
8. **ProductDetails.jsx** - Detailed product view with reviews
9. **NotFound.jsx** - 404 page
10. **Admin components** - Dashboard, product/order/user management

Each component should follow the same patterns shown above:
- Use Framer Motion for animations
- Use Tailwind CSS for styling
- Implement proper loading states
- Handle errors with toast notifications
- Follow responsive design principles

For complete implementation, refer to similar e-commerce projects or use AI code completion tools.
```
