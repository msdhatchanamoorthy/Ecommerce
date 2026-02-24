import { Navigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return user?.role === 'admin' ? children : <Navigate to="/" />;
}
