import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';
import useCartStore from '../context/cartStore';
import useWishlistStore from '../context/wishlistStore';
import Button from '../components/common/Button';
import { CATEGORIES } from '../utils/constants';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/products?limit=8');
        setFeaturedProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Customer',
      text: 'Amazing shopping experience! Fast delivery and great quality products.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Jane Smith',
      role: 'Verified Buyer',
      text: 'ShopHub has the best prices and customer service is top-notch!',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Mike Johnson',
      role: 'Regular Customer',
      text: 'Love the variety and the easy checkout process. Highly recommended!',
      rating: 5,
      avatar: '👨‍🔧',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Welcome to ShopHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8"
          >
            Your one-stop destination for premium products at unbeatable prices
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/products">
              <Button variant="primary" size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  className="block bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Banner */}
      <section className="py-12 bg-yellow-100 dark:bg-yellow-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🎉 Limited Time Offers</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                Get up to 50% off on selected products. Hurry, offer ends soon!
              </p>
              <Link to="/products">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Deals
                </Button>
              </Link>
            </div>
            <div className="text-6xl">🏷️</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onAddToWishlist={addToWishlist}
                    isInWishlist={isInWishlist(product._id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-2">{'★'.repeat(testimonial.rating)}</div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-orange-500">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-lg">Get exclusive deals, new arrivals, and special offers directly to your inbox!</p>
          <form onSubmit={handleNewsletterSignup} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <Button variant="primary" className="bg-white text-orange-500 hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '💰', title: 'Best Prices', desc: 'Guaranteed lowest prices' },
              { icon: '🛡️', title: 'Secure Payment', desc: '100% secure transactions' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
