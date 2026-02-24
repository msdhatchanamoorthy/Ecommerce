import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      loading: false,

      // Add to wishlist
      addToWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some(item => item._id === product._id);
        
        if (!exists) {
          set({ wishlist: [...wishlist, product] });
          toast.success('Added to wishlist');
        } else {
          toast.error('Already in wishlist');
        }
      },

      // Remove from wishlist
      removeFromWishlist: (productId) => {
        set(state => ({
          wishlist: state.wishlist.filter(item => item._id !== productId)
        }));
        toast.success('Removed from wishlist');
      },

      // Check if product is in wishlist
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item._id === productId);
      },

      // Clear wishlist
      clearWishlist: () => {
        set({ wishlist: [] });
      },

      // Get wishlist
      getWishlist: () => get().wishlist,
    }),
    {
      name: 'wishlist-store',
    }
  )
);

export default useWishlistStore;
