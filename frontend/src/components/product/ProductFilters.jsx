import { CATEGORIES, SORT_OPTIONS, PRICE_RANGES } from '../../utils/constants';
import useFilterStore from '../../context/filterStore';

export default function ProductFilters() {
  const { filters, setSearch, setCategory, setPriceRange, setRating, setSortBy, resetFilters } = useFilterStore();

  return (
    <div className="bg-transparent space-y-4">
      {/* Category Links */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 border-b pb-1 mb-2">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => setCategory('')}
            className={`block text-sm text-left w-full ${!filters.category ? 'font-bold text-[#c45500]' : 'text-gray-700 hover:text-[#c45500]'}`}
          >
            Any Category
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`block text-sm text-left w-full ${filters.category === cat.id ? 'font-bold text-[#c45500]' : 'text-gray-700 hover:text-[#c45500]'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Reviews Rating */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 border-b pb-1 mb-2">Customer Reviews</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`flex items-center gap-1 w-full text-left group ${filters.rating === star ? 'font-bold' : ''}`}
            >
              <div className="flex text-[#ffa41c]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg leading-none">{i < star ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-[#c45500]">& Up</span>
            </button>
          ))}
          <button
            onClick={() => setRating(0)}
            className={`text-sm text-gray-700 hover:text-[#c45500] mt-1 ${filters.rating === 0 ? 'font-bold' : ''}`}
          >
            Clear rating
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 border-b pb-1 mb-2">Price</h4>
        <div className="space-y-1">
          <button
            onClick={() => setPriceRange({ min: 0, max: 10000 })}
            className={`block text-sm text-left w-full ${filters.priceRange.min === 0 && filters.priceRange.max === 10000 ? 'font-bold' : 'text-gray-700 hover:text-[#c45500]'}`}
          >
            All
          </button>
          {PRICE_RANGES.map((range, idx) => (
            <button
              key={idx}
              onClick={() => setPriceRange({ min: range.min, max: range.max })}
              className={`block text-sm text-left w-full ${filters.priceRange.min === range.min && filters.priceRange.max === range.max ? 'font-bold text-[#c45500]' : 'text-gray-700 hover:text-[#c45500]'}`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Section - More like a drop down in Amazon results but here as sidebar */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 border-b pb-1 mb-2">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-white border border-gray-300 text-sm py-1 px-2 rounded-md shadow-sm focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Global Reset */}
      <button
        onClick={resetFilters}
        className="w-full text-xs text-[#007185] hover:text-[#c45500] hover:underline font-bold mt-4"
      >
        Clear all filters
      </button>
    </div>
  );
}
