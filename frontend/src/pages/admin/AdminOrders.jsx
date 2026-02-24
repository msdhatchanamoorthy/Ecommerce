import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { ORDER_STATUS } from '../../utils/constants';

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    { id: '#ORD001', customer: 'John Doe', email: 'john@example.com', total: 299.99, status: 'pending', date: '2024-02-10', items: 3 },
    { id: '#ORD002', customer: 'Jane Smith', email: 'jane@example.com', total: 149.99, status: 'shipped', date: '2024-02-09', items: 2 },
    { id: '#ORD003', customer: 'Mike Johnson', email: 'mike@example.com', total: 89.99, status: 'delivered', date: '2024-02-08', items: 1 },
    { id: '#ORD004', customer: 'Sarah Williams', email: 'sarah@example.com', total: 549.99, status: 'confirmed', date: '2024-02-07', items: 5 },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Manage Orders</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Items</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Total</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{order.items} items</td>
                    <td className="py-4 px-6 font-semibold text-orange-500">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{order.date}</td>
                    <td className="py-4 px-6">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
