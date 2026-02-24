# 🛒 E-Commerce Platform - Production-Ready

A complete, modern e-commerce platform built with MERN stack (MongoDB, Express, React, Node.js), featuring secure authentication, payment integration, admin dashboard, and beautiful animations.

## ✨ Features

### User Features
- 🔐 **User Authentication** - JWT-based registration and login
- 🛍️ **Product Browsing** - Filter, sort, search products
- 🛒 **Shopping Cart** - Add, update, remove items
- ❤️ **Wishlist** - Save favorite products
- 💳 **Secure Checkout** - Stripe payment integration
- 📦 **Order Tracking** - View order history and status
- 👤 **User Profile** - Manage account and addresses
- ⭐ **Product Reviews** - Rate and review products

### Admin Features
- 📊 **Analytics Dashboard** - Sales, revenue, user stats
- 📦 **Product Management** - CRUD operations
- 👥 **User Management** - View and manage users
- 🚚 **Order Management** - Update order status
- 📈 **Monthly Revenue Charts**
- 🏷️ **Low Stock Alerts**

### Technical Features
- ⚡ **Framer Motion Animations** - Smooth page transitions
- 🎨 **Tailwind CSS** - Modern, responsive design
- 🌙 **Dark Mode Support**
- 📱 **Fully Responsive** - Mobile, tablet, desktop
- 🔒 **Secure API** - JWT authentication, rate limiting
- 📤 **Image Upload** - Cloudinary integration
- 🎯 **SEO Optimized**
- ⚡ **Fast Performance** - Optimized loading

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Stripe** - Payment processing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment gateway
- **Cloudinary** - Image hosting
- **Helmet** - Security
- **Express Rate Limit** - API protection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your credentials
nano .env
```

**Configure your .env file:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d

# Stripe (Get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=Admin@123456
```

**Start MongoDB** (if not running):

```bash
# macOS/Linux with Homebrew
brew services start mongodb-community

# Windows
net start MongoDB

# Or use MongoDB Atlas (cloud)
```

**Seed the Database:**

```bash
npm run seed
```

This will create:
- Sample products (12 products)
- Admin user with credentials from .env

**Start the Backend Server:**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
nano .env
```

**Configure your frontend .env:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

**Start the Frontend Server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Profile
```http
GET /auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=12&category=Electronics&minPrice=0&maxPrice=1000&rating=4&search=phone&sort=-createdAt
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Form Data:
- name
- description
- price
- category
- stock
- images (files)
```

#### Update Product (Admin)
```http
PUT /products/:id
Authorization: Bearer <admin-token>
```

#### Delete Product (Admin)
```http
DELETE /products/:id
Authorization: Bearer <admin-token>
```

#### Add Review
```http
POST /products/:id/reviews
Authorization: Bearer <token>

{
  "rating": 5,
  "comment": "Great product!"
}
```

### Cart Endpoints

#### Get Cart
```http
GET /cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /cart/items
Authorization: Bearer <token>

{
  "productId": "product_id",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /cart/items/:itemId
Authorization: Bearer <token>

{
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /cart/items/:itemId
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>

{
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "card",
  "itemsPrice": 100,
  "taxPrice": 10,
  "shippingPrice": 5,
  "totalPrice": 115
}
```

#### Get My Orders
```http
GET /orders/my-orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer <token>
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /admin/stats
Authorization: Bearer <admin-token>
```

#### Get All Users
```http
GET /admin/users?page=1&limit=10&search=john
Authorization: Bearer <admin-token>
```

#### Get All Orders
```http
GET /orders?page=1&limit=10&status=Processing
Authorization: Bearer <admin-token>
```

## 🔑 Default Admin Credentials

```
Email: admin@ecommerce.com
Password: Admin@123456
```

**⚠️ IMPORTANT:** Change these credentials immediately in production!

## 🎨 Frontend Pages

### Public Pages
- **Home** (`/`) - Hero section, featured products
- **Products** (`/products`) - Product listing with filters
- **Product Details** (`/products/:id`) - Product information
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

### Protected Pages (Require Login)
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Order placement
- **Profile** (`/profile`) - User account
- **Orders** (`/orders`) - Order history
- **Order Details** (`/orders/:id`) - Single order view

### Admin Pages (Require Admin Role)
- **Dashboard** (`/admin`) - Analytics overview
- **Products** (`/admin/products`) - Product management
- **Orders** (`/admin/orders`) - Order management
- **Users** (`/admin/users`) - User management

## 🏗️ Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── database.js
│   │   │   └── cloudinary.js
│   │   ├── controllers/     # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   ├── adminController.js
│   │   │   └── wishlistController.js
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   └── Cart.js
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── wishlistRoutes.js
│   │   ├── seeders/         # Database seeders
│   │   │   └── productSeeder.js
│   │   └── utils/           # Utility functions
│   ├── server.js            # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── auth/        # Auth components
│   │   │   ├── product/     # Product components
│   │   │   └── common/      # Shared components
│   │   ├── context/         # Zustand stores
│   │   │   ├── authStore.js
│   │   │   └── cartStore.js
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── utils/           # Utility functions
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 🔒 Security Features

- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ Helmet.js for security headers
- ✅ CORS protection
- ✅ XSS protection
- ✅ SQL injection prevention (NoSQL)
- ✅ Secure HTTP headers

## 📦 Deployment

### Backend Deployment (Heroku/Railway)

1. Create a production MongoDB database (MongoDB Atlas)
2. Set all environment variables
3. Deploy using:

```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Build the production bundle:

```bash
npm run build
```

2. Deploy the `dist` folder

## 🧪 Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test123"}'
```

### Test Product Fetching
```bash
curl http://localhost:5000/api/products
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### Stripe Payment Errors
- Use test card: 4242 4242 4242 4242
- Ensure STRIPE_SECRET_KEY is correct
- Check Stripe dashboard for logs

### CORS Errors
- Verify FRONTEND_URL in backend .env
- Check proxy settings in vite.config.js

### Image Upload Failures
- Verify Cloudinary credentials
- Check file size limits (5MB max)
- Ensure correct image formats (JPG, PNG)

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for learning and portfolio purposes.

## 🙏 Acknowledgments

- Icons from React Icons
- Images from Unsplash
- UI inspiration from Amazon and Shopify
- Community support from Stack Overflow

---

**⭐ Star this repo if you find it helpful!**

For issues and questions, please open an issue on GitHub.
"# resultanalysis" 
