import { create } from 'zustand';
import toast from 'react-hot-toast';

const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  
  toggleTheme: () => {
    set((state) => {
      const newState = !state.isDark;
      if (newState) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return { isDark: newState };
    });
  },
  
  setTheme: (isDark) => {
    set({ isDark });
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  },
}));

export default useThemeStore;
