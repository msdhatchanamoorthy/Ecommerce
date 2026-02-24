// Format currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Truncate text
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Generate rating starts
export const generateStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆').join('');
};

// Check if product is in array
export const isProductInArray = (productId, array) => {
  return array.some(item => item._id === productId || item.productId === productId);
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Calculate tax
export const calculateTax = (amount, taxRate = 0.1) => {
  return Math.round(amount * taxRate * 100) / 100;
};

// Calculate shipping
export const calculateShipping = (subtotal) => {
  if (subtotal > 100) return 0;
  if (subtotal > 50) return 5;
  return 10;
};
