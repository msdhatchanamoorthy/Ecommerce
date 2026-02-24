import { motion } from 'framer-motion';

export default function Rating({ rating = 0, count = 0, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {stars.map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange?.(star)}
            className={`text-2xl cursor-pointer transition ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </motion.button>
        ))}
      </div>
      {count > 0 && <span className="text-sm text-gray-600 dark:text-gray-400">({count})</span>}
    </div>
  );
}
