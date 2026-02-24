import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,

      // Fetch cart
      fetchCart: async () => {
        try {
          set({ loading: true });
          const { data } = await cartAPI.get();
          set({ cart: data.data, loading: false });
        } catch (error) {
          set({ loading: false });
          console.error('Failed to fetch cart:', error);
        }
      },

      // Add to cart
      addToCart: async (productId, quantity = 1) => {
        try {
          const { data } = await cartAPI.add({ productId, quantity });
          set({ cart: data.data });
          toast.success('Added to cart');
          return data.data;
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to add to cart');
          throw error;
        }
      },

      // Update cart item
      updateCartItem: async (itemId, quantity) => {
        try {
          const { data } = await cartAPI.update(itemId, { quantity });
          set({ cart: data.data });
          toast.success('Cart updated');
          return data.data;
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to update cart');
          throw error;
        }
      },

      // Remove from cart
      removeFromCart: async (itemId) => {
        try {
          const { data } = await cartAPI.remove(itemId);
          set({ cart: data.data });
          toast.success('Item removed from cart');
          return data.data;
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to remove item');
          throw error;
        }
      },

      // Clear cart
      clearCart: async () => {
        try {
          const { data } = await cartAPI.clear();
          set({ cart: data.data });
          return data.data;
        } catch (error) {
          console.error('Failed to clear cart:', error);
          throw error;
        }
      },

      // Get cart count
      getCartCount: () => {
        const { cart } = get();
        return cart?.totalItems || 0;
      },

      // Get cart total
      getCartTotal: () => {
        const { cart } = get();
        return cart?.totalPrice || 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
