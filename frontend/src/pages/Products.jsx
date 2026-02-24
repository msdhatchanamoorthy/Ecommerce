import { useState, useEffect } from 'react';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const { filters, setCategory, setSearch } = useFilterStore();
  const debouncedSearch = useDebounce(filters.search, 300);
  const pagination = usePagination(products, 12);

  // Sync URL query params with filter store
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') || '';
    const search = params.get('search') || '';

    // Only update if they differ from current filters to avoid unnecessary renders
    if (cat !== filters.category) setCategory(cat);
    if (search !== filters.search) setSearch(search);
  }, [window.location.search, filters.category, filters.search, setCategory, setSearch]); // Depend on search string for changes

  // Update URL when filters change (Store -> URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (filters.category) params.set('category', filters.category);
    else params.delete('category');

    if (filters.search) params.set('search', filters.search);
    else params.delete('search');

    const newSearch = params.toString();
    const currentSearch = window.location.search.replace(/^\?/, '');

    if (newSearch !== currentSearch) {
      window.history.pushState({}, '', `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`);
    }
  }, [filters.category, filters.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (debouncedSearch) params.append('search', debouncedSearch);
        if (filters.category) params.append('category', filters.category);
        if (filters.sortBy) params.append('sort', filters.sortBy);

        const { data } = await api.get(`/products?${params.toString()}`);

        // Apply additional filters on the client side
        let filtered = data.data || [];

        if (filters.priceRange) {
          filtered = filtered.filter(
            p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
          );
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {pagination.currentItems.length > 0 ? (pagination.currentPage - 1) * 12 + 1 : 0} - {Math.min(pagination.currentPage * 12, products.length)} of {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <Skeleton width="w-full" height="h-64" />
                    <div className="p-4">
                      <Skeleton width="w-3/4" height="h-4" className="mb-2" />
                      <Skeleton width="w-1/2" height="h-4" className="mb-4" />
                      <Skeleton width="w-full" height="h-10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : pagination.currentItems.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No products found"
                message="Try adjusting your filters or search term"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pagination.currentItems.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
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

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={pagination.prevPage}
                      disabled={!pagination.hasPrevPage}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 hover:bg-orange-600 transition"
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: pagination.totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => pagination.goToPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition ${pagination.currentPage === i + 1
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-orange-200 dark:hover:bg-orange-900'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={pagination.nextPage}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 hover:bg-orange-600 transition"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
