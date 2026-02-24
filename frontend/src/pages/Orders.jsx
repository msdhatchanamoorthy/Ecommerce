import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { formatDate, formatPrice } from '../utils/helpers';
import { ORDER_STATUS } from '../utils/constants';

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      _id: '1',
      orderNumber: '#ORD001',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'delivered',
      total: 299.99,
      items: [{ name: 'Product 1', quantity: 2 }, { name: 'Product 2', quantity: 1 }],
      trackingNumber: 'TRACK123456',
    },
    {
      _id: '2',
      orderNumber: '#ORD002',
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'shipped',
      total: 149.99,
      items: [{ name: 'Product 3', quantity: 1 }],
      trackingNumber: 'TRACK789012',
    },
    {
      _id: '3',
      orderNumber: '#ORD003',
      date: new Date(Date.now() - 259200000).toISOString(),
      status: 'confirmed',
      total: 89.99,
      items: [{ name: 'Product 4', quantity: 3 }],
      trackingNumber: 'TRACK345678',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // const { data } = await api.get('/orders');
        // setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';
      case 'shipped': return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200';
      case 'delivered': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'shipped': return '🚚';
      case 'delivered': return '📦';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  const getOrderProgress = (status) => {
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
    return Math.floor((statuses.indexOf(status) + 1) / statuses.length * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Orders</h1>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height="h-40" className="rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Orders</h1>
          <EmptyState
            icon="📦"
            title="No orders yet"
            message="Start shopping to place your first order!"
            action={
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Orders ({orders.length})</h1>

        <div className="space-y-6">
          {orders.map((order, idx) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-500">{formatPrice(order.total)}</p>
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mt-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getOrderProgress(order.status)}%` }}
                    />
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>Tracking: {order.trackingNumber}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Items</h4>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-700 dark:text-gray-300 text-sm">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-6 flex gap-3">
                <Link to={`/orders/${order._id}`} className="flex-1">
                  <Button variant="secondary" fullWidth>
                    View Details
                  </Button>
                </Link>
                {order.status === 'shipped' && (
                  <Button variant="primary" fullWidth>
                    📍 Track Order
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
