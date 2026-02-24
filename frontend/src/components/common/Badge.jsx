import { motion } from 'framer-motion';

export default function Badge({ children, variant = 'primary', size = 'md' }) {
  const variants = {
    primary: 'bg-orange-500 text-white',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-block rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </motion.span>
  );
}
