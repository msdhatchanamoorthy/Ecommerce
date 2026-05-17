import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';

export default function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }) {
  const category = CATEGORIES.find(c => c.id === product.category)?.name || product.category;
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <div className="bg-white p-4 border border-transparent hover:border-gray-200 transition-all h-full flex flex-col group relative">
      <Link to={`/product/${product._id}`} className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-56 flex items-center justify-center bg-gray-50 rounded mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=f3f4f6&color=666&size=400&font-size=0.1`;
            }}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToWishlist?.(product);
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 shadow-sm rounded-full hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            {isInWishlist ? <span className="text-red-500 text-xl">❤️</span> : <span className="text-gray-400 text-xl">🤍</span>}
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-[17px] font-medium text-gray-900 group-hover:text-[#c45500] line-clamp-2 mb-1 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-[#ffa41c] text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-lg">
                  {i < Math.floor(product.ratings) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-[14px] text-[#007185] ml-1">({product.numOfReviews || 0})</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.isFeatured && (
              <span className="bg-[#e47911] text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">Limited time deal</span>
            )}
            <div className="flex items-center gap-0.5">
              <span className="prime-text text-sm">prime</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-start gap-0.5">
              <span className="text-[13px] font-medium mt-1">₹</span>
              <span className="text-[28px] font-medium leading-none">{product.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[13px] text-gray-600">M.R.P: </span>
              <span className="text-[13px] text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-[13px] text-gray-700">({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)</span>
            </div>

            <p className="text-[14px] text-gray-700 mt-1">
              FREE delivery <span className="font-bold">Tomorrow</span>
            </p>
          </div>
        </div>
      </Link>

      {/* Add To Cart Button */}
      <div className="mt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(product._id);
          }}
          disabled={product.stock === 0}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 border border-[#fcd200] py-2 rounded-full text-[13px] font-medium shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

