import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import useCartStore from '../context/cartStore';
import { CATEGORIES } from '../utils/constants';

const heroBanners = [
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/BAU/Page/Revamp/Creatives/Headphones_PC_1500x600.jpg', title: 'Up to 75% off | Headphones' },
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/Event/JanART/Bank/PC_Hero_1500x600._CB584949577_.jpg', title: 'Style for Everyone' },
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_Hot_Deals/Nov/BAU_Hero/PC_Hero_3000x1200_1._CB573934444_.jpg', title: 'Upgrade your home' }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHero, setCurrentHero] = useState(0);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/products?limit=24');
        setFeaturedProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();

    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#eaeded] min-h-screen pb-10">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroBanners.map((banner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentHero ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img src={banner.url} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Overlapping Category Cards */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-[150px] sm:pt-[350px]">
          {CATEGORIES.slice(0, 4).map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 p-5 shadow-sm group cursor-pointer flex flex-col h-full border border-gray-100">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{category.name}</h3>
              <div className="flex-grow overflow-hidden mb-4 h-64 bg-gray-50 flex items-center justify-center">
                <Link to={`/products?category=${category.id}`}>
                  <span className="text-8xl group-hover:scale-110 transition-transform block">
                    {category.icon === '📱' ? '💻' : category.icon}
                  </span>
                </Link>
              </div>
              <Link to={`/products?category=${category.id}`} className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-semibold">
                Explore now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 max-w-[1500px] mx-auto px-4 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Deals & more</h2>
            <Link to="/products" className="text-[#007185] text-sm hover:underline hover:text-[#c45500]">See all deals</Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[200px] h-60 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300">
              {featuredProducts.map((product) => (
                <div key={product._id} className="min-w-[200px] max-w-[220px] group">
                  <Link to={`/products`}>
                    <div className="h-48 flex items-center justify-center mb-2 bg-gray-50 rounded p-4 group-hover:brightness-95 transition-all">
                      <img src={product.images[0]?.url} alt={product.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm">Limited time deal</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-xl font-medium">$</span>
                      <span className="text-2xl font-medium">{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      )}
                    </div>
                    <h3 className="text-sm line-clamp-2 text-gray-700 group-hover:text-[#c45500]">{product.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promo Row */}
      <section className="py-8 max-w-[1500px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Upto 60% off | Top rated Electronics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredProducts.filter(p => p.category === 'electronics').slice(0, 4).map(p => (
              <Link key={p._id} to="/products" className="group">
                <div className="bg-gray-50 p-2 mb-2 h-40 flex items-center justify-center border border-gray-50 rounded">
                  <img src={p.images[0]?.url} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-all" />
                </div>
                <p className="text-xs text-[#007185] font-bold group-hover:underline">{p.name}</p>
              </Link>
            ))}
          </div>
          <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline mt-6 inline-block">See more</Link>
        </div>
        <div className="bg-white p-6 shadow-sm flex flex-col justify-between border border-gray-100">
          <div>
            <h2 className="text-xl font-bold mb-4 italic text-[#c45500]">ShopHub Prime</h2>
            <p className="text-sm text-gray-600 mb-4">Join Prime for FREE delivery, exclusive deals and more.</p>
            <Link to="/register" className="block w-full bg-[#f0c14b] text-center border border-[#a88734] py-2 text-sm rounded-md hover:bg-[#eeb933] shadow-sm mb-4 font-semibold">
              Try Prime Free
            </Link>
          </div>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-orange-50 flex flex-col items-center justify-center rounded border border-blue-100">
            <span className="text-6xl mb-2">🚚</span>
            <span className="text-xs font-bold text-blue-800">FAST & FREE DELIVERY</span>
          </div>
        </div>
      </section>
    </div>
  );
}
