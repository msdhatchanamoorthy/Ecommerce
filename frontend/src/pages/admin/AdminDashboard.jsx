import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  const stats = [
    { icon: '📦', label: 'Total Products', value: '142', color: 'bg-blue-500' },
    { icon: '👥', label: 'Total Users', value: '238', color: 'bg-green-500' },
    { icon: '🛒', label: 'Total Orders', value: '856', color: 'bg-purple-500' },
    { icon: '💰', label: 'Total Revenue', value: '$45,280', color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', status: 'Delivered', amount: '$299.99', date: '2024-02-10' },
    { id: '#ORD002', customer: 'Jane Smith', status: 'Shipped', amount: '$149.99', date: '2024-02-09' },
    { id: '#ORD003', customer: 'Mike Johnson', status: 'Pending', amount: '$89.99', date: '2024-02-08' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} text-white rounded-lg shadow-lg p-6`}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/admin/products">
              <Button variant="primary" fullWidth>
                📦 Manage Products
              </Button>
            </Link>
            <Link to="/admin/orders">
              <Button variant="primary" fullWidth>
                🛒 View Orders
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="primary" fullWidth>
                👥 Manage Users
              </Button>
            </Link>
            <Button variant="secondary" fullWidth>
              📊 View Reports
            </Button>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{order.date}</td>
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
