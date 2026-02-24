import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      // Login
      login: async (credentials) => {
        try {
          set({ loading: true });
          const { data } = await authAPI.login(credentials);
          
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          set({
            user: data.data.user,
            token: data.data.token,
            isAuthenticated: true,
            loading: false,
          });
          
          toast.success('✅ Login successful!');
          return data.data;
        } catch (error) {
          set({ loading: false });
          const errorMsg = error.response?.data?.message || 'Invalid email or password';
          toast.error(errorMsg);
          throw error;
        }
      },

      // Register
      register: async (userData) => {
        try {
          set({ loading: true });
          const { data } = await authAPI.register(userData);
          
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          set({
            user: data.data.user,
            token: data.data.token,
            isAuthenticated: true,
            loading: false,
          });
          
          toast.success('✅ Registration successful! Welcome to ShopHub!');
          return data.data;
        } catch (error) {
          set({ loading: false });
          const errorMsg = error.response?.data?.message || 'Registration failed';
          toast.error(errorMsg);
          throw error;
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        toast.success('Logged out successfully');
      },

      // Load user from storage
      loadUser: () => {
        try {
          const token = localStorage.getItem('token');
          const user = localStorage.getItem('user');
          
          if (token && user) {
            set({
              token,
              user: JSON.parse(user),
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Error loading user from storage:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },

      // Update profile
      updateProfile: async (userData) => {
        try {
          const { data } = await authAPI.updateProfile(userData);
          
          const updatedUser = data.data;
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          set({ user: updatedUser });
          toast.success('Profile updated successfully');
          return updatedUser;
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to update profile');
          throw error;
        }
      },

      // Check if user is admin
      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
