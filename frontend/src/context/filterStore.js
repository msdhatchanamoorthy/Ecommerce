import { create } from 'zustand';
import { SORT_OPTIONS, PRICE_RANGES } from '../utils/constants';

const useFilterStore = create((set) => ({
  filters: {
    search: '',
    category: '',
    priceRange: { min: 0, max: 10000 },
    rating: 0,
    sortBy: 'newest',
  },

  setSearch: (search) => {
    set(state => ({
      filters: { ...state.filters, search }
    }));
  },

  setCategory: (category) => {
    set(state => ({
      filters: { ...state.filters, category }
    }));
  },

  setPriceRange: (priceRange) => {
    set(state => ({
      filters: { ...state.filters, priceRange }
    }));
  },

  setRating: (rating) => {
    set(state => ({
      filters: { ...state.filters, rating }
    }));
  },

  setSortBy: (sortBy) => {
    set(state => ({
      filters: { ...state.filters, sortBy }
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        search: '',
        category: '',
        priceRange: { min: 0, max: 10000 },
        rating: 0,
        sortBy: 'newest',
      }
    });
  },
}));

export default useFilterStore;
