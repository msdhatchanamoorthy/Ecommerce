const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  processPayment,
  updatePaymentStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder, handleValidationErrors } = require('../middleware/validation');

// Protected routes
router.post('/', protect, validateOrder, handleValidationErrors, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

// Payment routes
router.post('/payment', protect, processPayment);
router.put('/:id/payment', protect, updatePaymentStatus);

// Admin routes
router.get('/', protect, authorize('admin'), getAllOrders);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
