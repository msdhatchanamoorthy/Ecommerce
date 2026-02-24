import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joinDate: '2024-01-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'admin', status: 'active', joinDate: '2024-01-05' },
  ]);

  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success('User role updated');
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Users: <span className="font-bold text-orange-500">{users.length}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{user.email}</td>
                    <td className="py-4 px-6">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-200'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200'
                        }`}
                      >
                        {user.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{user.joinDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
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
