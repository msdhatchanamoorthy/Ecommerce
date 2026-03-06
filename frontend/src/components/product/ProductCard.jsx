import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';

export default function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }) {
  const category = CATEGORIES.find(c => c.id === product.category)?.name || product.category;
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <div className="bg-white dark:bg-gray-800 p-4 border border-transparent hover:border-gray-200 transition-all h-full flex flex-col group relative">
      <Link to="/products" className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-56 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30 rounded mb-4 overflow-hidden">
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
            className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800 shadow-sm rounded-full hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            {isInWishlist ? <span className="text-red-500">❤️</span> : <span className="text-gray-400">🤍</span>}
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm md:text-base font-medium text-[#007185] dark:text-[#00a8c1] group-hover:text-[#c45500] line-clamp-2 md:line-clamp-3 mb-1 min-h-[3rem]">
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
            <span className="text-xs text-[#007185] ml-1">({product.numOfReviews || 0})</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.isFeatured && (
              <span className="bg-[#232f3e] text-white text-[10px] font-bold px-1.5 py-0.5">Best Seller</span>
            )}
            <span className="text-[#007185] text-xs flex items-center gap-0.5">
              <span className="text-blue-500 font-bold italic">prime</span>
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold self-start mt-1">$</span>
              <span className="text-2xl font-bold">{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through ml-2">
                  List: ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              FREE delivery <span className="font-bold">Tomorrow</span>
            </p>
          </div>
        </div>
      </Link>

      {/* Add To Cart Button */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          disabled={product.stock === 0}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 border border-[#fcd200] py-2 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
