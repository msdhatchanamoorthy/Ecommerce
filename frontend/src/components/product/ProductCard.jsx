import { CATEGORIES } from '../../utils/constants';

export default function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }) {
  // Get category name safely
  const category = CATEGORIES.find(c => c.id === product.category)?.name || product.category;

  // Get image URL safely
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image';

  // Calculate if it's a new product (created within last 7 days)
  const isNew = new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />

        {/* Product Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
              -{product.discount}%
            </div>
          )}
          {isNew && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
              NEW
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-gray-900/80 backdrop-blur text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToWishlist?.(product);
          }}
          className={`absolute top-2 left-2 p-2 rounded-full shadow-md transition-all duration-300 ${isInWishlist
            ? 'bg-red-500 text-white'
            : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur text-gray-600 hover:text-red-500'
            }`}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{category}</span>
          <h3 className="font-bold text-gray-900 dark:text-white mt-1 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.floor(product.ratings) ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.numOfReviews || 0})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
