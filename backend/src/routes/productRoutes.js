const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  validateProduct,
  validateReview,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes
router.post(
  '/:id/reviews',
  protect,
  validateReview,
  handleValidationErrors,
  addReview
);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  upload.array('images', 5),
  validateProduct,
  handleValidationErrors,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  upload.array('images', 5),
  updateProduct
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  deleteProduct
);

module.exports = router;
