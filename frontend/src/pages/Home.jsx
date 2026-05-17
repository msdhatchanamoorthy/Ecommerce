import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const heroBanners = [
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/BAU/Page/Revamp/Creatives/Headphones_PC_1500x600.jpg', title: 'Headphones' },
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/Event/JanART/Bank/PC_Hero_1500x600._CB584949577_.jpg', title: 'Fashion' },
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_Hot_Deals/Nov/BAU_Hero/PC_Hero_3000x1200_1._CB573934444_.jpg', title: 'Home' },
  { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img24/AmazonPay/Jan/Flight/PC_Hero_3000x1200_2._CB584737213_.jpg', title: 'Flights' }
];

const imageErrorFallback = (e, name) => {
  e.target.onerror = null;
  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=666&size=400&font-size=0.1`;
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    fetchProducts();
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?limit=30');
      setFeaturedProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#eaeded] min-h-screen pb-10 font-sans">
      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroBanners.map((banner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentHero ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img 
                src={banner.url} 
                alt={banner.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Quadrant Cards overlay */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-[100px] sm:pt-[350px]">
          
          {/* Card 1: Electronics Quadrant */}
          <div className="bg-white p-5 shadow-sm flex flex-col h-full border border-gray-100">
            <h3 className="text-[21px] font-bold mb-3 text-gray-900 leading-tight">Up to 70% off | Electronics & more</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {featuredProducts.filter(p => p.category === 'electronics').slice(0, 4).map(p => (
                <Link key={p._id} to={`/product/${p._id}`} className="group">
                  <div className="h-28 bg-gray-50 flex items-center justify-center mb-1 overflow-hidden">
                    <img 
                      src={p.images[0]?.url} 
                      alt={p.name} 
                      className="max-h-full object-contain group-hover:scale-105 transition-all" 
                      onError={(e) => imageErrorFallback(e, p.name)}
                    />
                  </div>
                  <p className="text-[12px] text-gray-600 truncate">{p.name}</p>
                </Link>
              ))}
            </div>
            <Link to="/products?category=electronics" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-auto">
              See all offers
            </Link>
          </div>

          {/* Card 2: Fashion Quadrant */}
          <div className="bg-white p-5 shadow-sm flex flex-col h-full border border-gray-100">
            <h3 className="text-[21px] font-bold mb-3 text-gray-900 leading-tight">Styles for you | Fashion</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {featuredProducts.filter(p => p.category === 'fashion').slice(0, 4).map(p => (
                <Link key={p._id} to={`/product/${p._id}`} className="group">
                  <div className="h-28 bg-gray-50 flex items-center justify-center mb-1 overflow-hidden">
                    <img 
                      src={p.images[0]?.url} 
                      alt={p.name} 
                      className="max-h-full object-contain group-hover:scale-105 transition-all" 
                      onError={(e) => imageErrorFallback(e, p.name)}
                    />
                  </div>
                  <p className="text-[12px] text-gray-600 truncate">{p.name}</p>
                </Link>
              ))}
            </div>
            <Link to="/products?category=fashion" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-auto">
              See all deals
            </Link>
          </div>

          {/* Card 3: Home & Kitchen Quadrant */}
          <div className="bg-white p-5 shadow-sm flex flex-col h-full border border-gray-100">
            <h3 className="text-[21px] font-bold mb-3 text-gray-900 leading-tight">Revamp your home | Kitchen</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {featuredProducts.filter(p => p.category === 'home').slice(0, 4).map(p => (
                <Link key={p._id} to={`/product/${p._id}`} className="group">
                  <div className="h-28 bg-gray-50 flex items-center justify-center mb-1 overflow-hidden">
                    <img 
                      src={p.images[0]?.url} 
                      alt={p.name} 
                      className="max-h-full object-contain group-hover:scale-105 transition-all" 
                      onError={(e) => imageErrorFallback(e, p.name)}
                    />
                  </div>
                  <p className="text-[12px] text-gray-600 truncate">{p.name}</p>
                </Link>
              ))}
            </div>
            <Link to="/products?category=home" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-auto">
              See all products
            </Link>
          </div>

          {/* Card 4: Sign In/Promo Card */}
          <div className="flex flex-col gap-5">
            <div className="bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-[21px] font-bold mb-4 text-gray-900">Sign in for your best experience</h3>
              <Link to="/login" className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#F2C200] py-1.5 text-sm rounded-[8px] text-center shadow-sm font-medium transition-all mb-2">
                Sign in securely
              </Link>
            </div>
            <div className="bg-white p-2 shadow-sm border border-gray-100 flex-grow relative overflow-hidden flex items-center justify-center group cursor-pointer">
               <img 
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Kartik/Jan24/Flight/Flight_325x450._SY450_CB584737213_.jpg" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                alt="Promo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1464012656919-08ae34407421?w=800';
                }}
               />
               <div className="absolute top-4 left-4 font-bold text-lg text-white drop-shadow-md">TRAVEL SPECIAL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Horizontal Scroll */}
      <section className="py-6 max-w-[1500px] mx-auto px-4">
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-[21px] font-bold text-gray-900">Today's Deals</h2>
            <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">See all deals</Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[200px] h-64 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {featuredProducts.slice(0, 15).map((product) => (
                <div key={product._id} className="min-w-[210px] max-w-[210px] group cursor-pointer">
                  <Link to={`/product/${product._id}`}>
                    <div className="h-52 flex items-center justify-center mb-3 bg-white p-2 transition-all">
                      <img 
                        src={product.images[0]?.url} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300" 
                        onError={(e) => imageErrorFallback(e, product.name)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                        <span className="text-[#cc0c39] text-[12px] font-bold">Limited time deal</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[12px] font-medium">₹</span>
                        <span className="text-xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-sm text-gray-500 line-through ml-1">M.R.P: ₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <h3 className="text-sm line-clamp-1 text-gray-800">{product.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hot New Releases Horizontal Scroll */}
      <section className="py-6 max-w-[1500px] mx-auto px-4">
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-[21px] font-bold text-gray-900">Hot New Releases</h2>
            <Link to="/products?sort=-createdAt" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">See more</Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[200px] h-64 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {featuredProducts.slice().reverse().slice(0, 15).map((product) => (
                <div key={product._id} className="min-w-[210px] max-w-[210px] group cursor-pointer">
                  <Link to={`/product/${product._id}`}>
                    <div className="h-52 flex items-center justify-center mb-3 bg-white p-2 transition-all">
                      <img 
                        src={product.images[0]?.url} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300" 
                        onError={(e) => imageErrorFallback(e, product.name)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">New Release</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[12px] font-medium">₹</span>
                        <span className="text-xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <h3 className="text-sm line-clamp-1 text-gray-800">{product.name}</h3>
                      <div className="flex text-[#ffa41c] text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < Math.floor(product.ratings) ? '★' : '☆'}</span>
                        ))}
                        <span className="text-[#007185] ml-1">{product.numOfReviews}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers Horizontal Scroll */}
      <section className="py-6 max-w-[1500px] mx-auto px-4">
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-[21px] font-bold text-gray-900">Bestsellers</h2>
            <Link to="/products?sort=-numOfReviews" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">See more</Link>
          </div>

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[200px] h-64 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {featuredProducts.filter(p => p.numOfReviews > 1000).slice(0, 15).map((product) => (
                <div key={product._id} className="min-w-[210px] max-w-[210px] group cursor-pointer">
                  <Link to={`/product/${product._id}`}>
                    <div className="h-52 flex items-center justify-center mb-3 bg-white p-2 transition-all">
                      <img 
                        src={product.images[0]?.url} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300" 
                        onError={(e) => imageErrorFallback(e, product.name)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[12px] font-medium">₹</span>
                        <span className="text-xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <h3 className="text-sm line-clamp-1 text-gray-800">{product.name}</h3>
                      <div className="flex text-[#ffa41c] text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < Math.floor(product.ratings) ? '★' : '☆'}</span>
                        ))}
                        <span className="text-[#007185] ml-1">{product.numOfReviews.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Row of boxes */}
      <section className="py-6 max-w-[1500px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Box 1 */}
        <div className="bg-white p-5 shadow-sm border border-gray-100">
           <h3 className="text-[21px] font-bold mb-3">Starting ₹99 | ShopHub Brands</h3>
           <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="h-28 bg-gray-50 flex items-center justify-center">
                  <img src="https://m.media-amazon.com/images/I/41D8V+u9C7L._AC_SY200_.jpg" className="max-h-full" onError={(e) => imageErrorFallback(e, 'Home Decor')} />
                  <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500" className="max-h-full" onError={(e) => imageErrorFallback(e, 'Home Decor')} />
                </div>
                <p className="text-[12px]">Home Decor</p>
              </div>
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="h-28 bg-gray-50 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500" className="max-h-full" onError={(e) => imageErrorFallback(e, 'Kitchen')} />
                </div>
                <p className="text-[12px]">Kitchen & dining</p>
              </div>
           </div>
           <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-4 block">See more</Link>
        </div>

        {/* Box 2 */}
        <div className="bg-white p-5 shadow-sm border border-gray-100 flex flex-col">
           <h3 className="text-[21px] font-bold mb-3">Best Sellers in Computers</h3>
           <div className="flex-grow flex items-center justify-center bg-gray-50 p-4 mb-4">
              <img src="https://images.unsplash.com/photo-1547082299-de196ad013d6?w=500" className="max-h-full object-contain" onError={(e) => imageErrorFallback(e, 'Computers')} />
           </div>
           <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-auto block">Shop now</Link>
        </div>

        {/* Box 3 */}
        <div className="bg-white p-5 shadow-sm border border-gray-100">
           <h3 className="text-[21px] font-bold mb-3">Up to 60% off | Fitness & Sports</h3>
           <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="h-28 bg-gray-50 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" className="max-h-full" onError={(e) => imageErrorFallback(e, 'Watches')} />
                </div>
                <p className="text-[12px]">Smart watches</p>
              </div>
              <div className="flex flex-col gap-1 cursor-pointer">
                <div className="h-28 bg-gray-50 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500" className="max-h-full" onError={(e) => imageErrorFallback(e, 'Gym')} />
                </div>
                <p className="text-[12px]">Gym essentials</p>
              </div>
           </div>
           <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-4 block">Explore more</Link>
        </div>

        {/* Box 4 */}
        <div className="bg-white p-5 shadow-sm border border-gray-100 flex flex-col">
           <h3 className="text-[21px] font-bold mb-3">Latest Styles | Men's Fashion</h3>
           <div className="flex-grow flex items-center justify-center bg-gray-50 p-4 mb-4">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500" className="max-h-full object-contain" onError={(e) => imageErrorFallback(e, 'Fashion')} />
           </div>
           <Link to="/products" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline font-medium mt-auto block">See more</Link>
        </div>

      </section>
    </div>
  );
}



