import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import useCartStore from '../context/cartStore';
import useWishlistStore from '../context/wishlistStore';
import useFilterStore from '../context/filterStore';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';

export default function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const { filters, setCategory, setSearch } = useFilterStore();
  const debouncedSearch = useDebounce(filters.search, 300);
  const pagination = usePagination(products, 48);

  // Sync URL query params with filter store
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || '';
    const search = params.get('search') || '';

    if (cat !== filters.category) setCategory(cat);
    if (search !== filters.search) setSearch(search);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (debouncedSearch) params.append('search', debouncedSearch);
        if (filters.category) params.append('category', filters.category);
        if (filters.sortBy) params.append('sort', filters.sortBy);
        params.append('limit', '100');

        const { data } = await api.get(`/products?${params.toString()}`);

        let filtered = data.data || [];
        if (filters.priceRange) {
          filtered = filtered.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
        }
        if (filters.rating > 0) {
          filtered = filtered.filter(p => p.rating >= filters.rating);
        }

        setProducts(filtered);
        pagination.goToPage(1);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [debouncedSearch, filters.category, filters.sortBy, filters.priceRange, filters.rating]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-12">
      {/* Top Header Row for Results */}
      <div className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-[104px] z-40 px-4 md:px-8">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            {products.length} results for <span className="text-[#c45500] font-bold">"{filters.search || 'All Products'}"</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded cursor-pointer">{filters.sortBy || 'Featured'} ▾</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 border-r border-gray-100 pr-6">
            <ProductFilters />
          </aside>

          {/* Products Results */}
          <main className="flex-grow">
            <h1 className="text-xl font-bold mb-4 text-gray-900">RESULTS</h1>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} height="h-80" />)}
              </div>
            ) : pagination.currentItems.length === 0 ? (
              <EmptyState icon="😕" title="No results found" message="We couldn't find matches for your current search/filters." />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {pagination.currentItems.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={addToCart}
                      onAddToWishlist={addToWishlist}
                      isInWishlist={isInWishlist(product._id)}
                    />
                  ))}
                </div>

                {/* Amazon Style Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12 py-4 border-t border-gray-100">
                    <button
                      onClick={pagination.prevPage}
                      disabled={!pagination.hasPrevPage}
                      className="px-4 py-1.5 border border-gray-300 rounded shadow-sm hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
                    >
                      ← Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: pagination.totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => pagination.goToPage(i + 1)}
                          className={`px-3 py-1 text-sm border ${pagination.currentPage === i + 1 ? 'border-[#e77600] text-[#c45500] font-bold shadow-inner bg-gray-50' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={pagination.nextPage}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-1.5 border border-gray-300 rounded shadow-sm hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Disclaimer */}
            <div className="mt-16 pt-8 border-t text-[11px] text-gray-500 leading-normal">
              Need help? Visit the <span className="text-[#007185] hover:underline cursor-pointer">Help Section</span> or <span className="text-[#007185] hover:underline cursor-pointer">contact us</span>.
              <br />
              All prices include VAT. Select items may be subject to additional shipping fees.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
