import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import useCartStore from '../context/cartStore';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id || id.replace(':', '')}`);
        setProduct(data.data || data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="max-w-[1500px] mx-auto p-4 md:p-8 flex gap-8">
      <div className="w-1/2 h-[500px] bg-gray-100 animate-pulse rounded" />
      <div className="w-1/2 space-y-4">
        <div className="h-8 bg-gray-100 animate-pulse w-3/4" />
        <div className="h-4 bg-gray-100 animate-pulse w-1/4" />
        <div className="h-24 bg-gray-100 animate-pulse w-full" />
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-20 text-xl font-bold">Product not found. <Link to="/products" className="text-blue-600 underline">Go back to products</Link></div>;

  const images = product.images || [{ url: product.image }];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-4 text-xs text-gray-500">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <Link to="/products" className="hover:underline">Products</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700 capitalize">{product.category}</span>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">

        {/* Left: Image Gallery */}
        <div className="lg:w-1/2 flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveImage(idx)}
                className={`w-12 h-12 border-2 rounded cursor-pointer overflow-hidden ${activeImage === idx ? 'border-[#e77600] shadow-sm' : 'border-gray-200'}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-grow bg-white border border-gray-100 rounded h-[400px] md:h-[600px] flex items-center justify-center p-8 sticky top-36">
            <img
              src={images[activeImage]?.url}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Middle: Info */}
        <div className="lg:w-[30%]">
          <h1 className="text-2xl font-medium text-gray-900 border-b border-gray-100 pb-4 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-[#ffa41c]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xl">{i < Math.floor(product.ratings) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
              {product.numOfReviews || 0} ratings
            </span>
          </div>

          <div className="border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-red-600 font-light mt-1">Limited time deal</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1 text-[#b12704]">
              <span className="text-sm">-15%</span>
              <span className="text-sm self-start mt-1">$</span>
              <span className="text-3xl font-medium">{product.price}</span>
            </div>
            <p className="text-sm text-gray-500 line-through">List Price: ${product.originalPrice || (product.price * 1.2).toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold">About this item</h3>
              <p className="text-sm text-gray-800 leading-relaxed mt-2">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="font-bold">Brand</span>
              <span className="text-gray-700">Premium Choice</span>
              <span className="font-bold">Material</span>
              <span className="text-gray-700">High Quality</span>
              <span className="font-bold">Color</span>
              <span className="text-gray-700">As shown</span>
            </div>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="lg:w-[20%]">
          <div className="border border-gray-300 rounded-lg p-5 sticky top-36">
            <div className="text-2xl font-medium mb-1">${product.price}</div>
            <p className="text-sm text-[#007185] hover:underline cursor-pointer mb-4">FREE delivery Tomorrow</p>

            <div className="text-[#007600] text-lg font-bold mb-4">In stock</div>

            <div className="space-y-3">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 border border-[#fcd200] py-2 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
              >
                Add to Cart
              </button>
              <button className="w-full bg-[#ffa41c] hover:bg-[#f3a847] text-gray-900 border border-[#ee9220] py-2 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-[0.98]">
                Buy Now
              </button>
            </div>

            <div className="mt-6 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span className="text-gray-900">ShopHub.in</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span>
                <span className="text-gray-900">Appario Retail Private Ltd</span>
              </div>
            </div>

            <button className="w-full border border-gray-300 rounded py-1.5 mt-8 text-xs font-semibold hover:bg-gray-50">
              Add to Wish List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
