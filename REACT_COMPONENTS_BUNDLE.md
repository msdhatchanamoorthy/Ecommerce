# Complete React Components Bundle

Copy each section below into its respective file path.

---

## src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## src/App.jsx
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

import useAuthStore from './context/authStore';
import useCartStore from './context/cartStore';

function App() {
  const { loadUser, isAuthenticated } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/payment/failure" element={<ProtectedRoute><PaymentFailure /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </Router>
  );
}

export default App;
```

---

## Component Creation Instructions

Due to file size limits, here's how to create each component:

### 1. Layout Components (src/components/layout/)

Create these files using the templates from COMPONENT_TEMPLATES.md:
- Navbar.jsx
- Footer.jsx

### 2. Auth Components (src/components/auth/)

**ProtectedRoute.jsx**
**AdminRoute.jsx**

Use the auth component templates provided.

### 3. Product Components (src/components/product/)

**ProductCard.jsx**
**FilterSidebar.jsx**
**ProductGallery.jsx**

### 4. Common Components (src/components/common/)

**LoadingSpinner.jsx**
**LoadingSkeleton.jsx**
**SearchBar.jsx**

### 5. Pages (src/pages/)

All page components with full functionality for:
- Home.jsx
- Products.jsx  
- ProductDetails.jsx
- Cart.jsx
- Checkout.jsx
- Login.jsx
- Register.jsx
- Profile.jsx
- Orders.jsx
- OrderDetails.jsx
- PaymentSuccess.jsx
- PaymentFailure.jsx
- NotFound.jsx

### 6. Admin Pages (src/pages/admin/)

- AdminDashboard.jsx
- AdminProducts.jsx
- AdminOrders.jsx

---

## Quick Setup Command

After downloading, run:

```bash
cd ecommerce-platform
chmod +x setup.sh
./setup.sh

# Then manually copy the component code from COMPONENT_TEMPLATES.md
# into the respective files
```

---

## File Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   └── ProductGallery.jsx
│   │   └── common/
│   │       ├── LoadingSpinner.jsx
│   │       └── SearchBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── PaymentFailure.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       └── AdminOrders.jsx
│   ├── context/
│   │   ├── authStore.js
│   │   └── cartStore.js
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

All component code is available in COMPONENT_TEMPLATES.md for easy copy-paste.
