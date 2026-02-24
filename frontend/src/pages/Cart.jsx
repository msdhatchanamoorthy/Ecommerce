import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../context/cartStore';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { calculateTax, calculateShipping, formatPrice } from '../utils/helpers';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  if (!cart?.items || cart.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            message="Add some products to get started!"
            action={
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            }
          />
        </div>
      </motion.div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-5 bg-gray-100 dark:bg-gray-700 p-4 font-bold text-gray-900 dark:text-white">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div className="text-right">Total</div>
              </div>

              {cart.items.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-200 dark:border-gray-700 p-4 md:grid md:grid-cols-5 md:items-center gap-4"
                >
                  {/* Product Info */}
                  <div className="col-span-2 flex gap-4 mb-4 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="w-12 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div className="text-right font-bold text-orange-500 text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/products" className="inline-block mt-6">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-20"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500 font-bold' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>

              {subtotal > 100 && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded p-3 mb-6 text-green-700 dark:text-green-200 text-sm">
                  🎉 You qualify for FREE SHIPPING!
                </div>
              )}

              <Link to="/checkout" className="block mb-3">
                <Button variant="primary" fullWidth>
                  Proceed to Checkout
                </Button>
              </Link>

              <Button variant="secondary" fullWidth>
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
