# API Endpoints Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": {...}
    },
    "token": "jwt_token"
  }
}
```

### POST /auth/login
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "jwt_token"
  }
}
```

### GET /auth/me
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "addresses": [...],
    "wishlist": [...]
  }
}
```

### PUT /auth/profile
Update user profile.

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data:**
- name (optional)
- email (optional)
- phoneNumber (optional)
- avatar (file, optional)

### PUT /auth/change-password
Change user password.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

### POST /auth/addresses
Add new address.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postalCode": "10001",
  "isDefault": true
}
```

---

## 📦 Product Endpoints

### GET /products
Get all products with filtering and pagination.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 12)
- `category` (e.g., Electronics, Clothing)
- `minPrice` (number)
- `maxPrice` (number)
- `rating` (1-5)
- `search` (text search)
- `sort` (e.g., -createdAt, price, -price, ratings)
- `featured` (true/false)

**Example:**
```
GET /products?page=1&limit=12&category=Electronics&minPrice=50&maxPrice=500&rating=4&sort=-ratings
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "Wireless Headphones",
      "description": "...",
      "price": 149.99,
      "originalPrice": 199.99,
      "discount": 25,
      "category": "Electronics",
      "brand": "AudioPro",
      "images": [...],
      "stock": 50,
      "ratings": 4.5,
      "numOfReviews": 120,
      "isFeatured": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 60,
    "limit": 12
  }
}
```

### GET /products/:id
Get single product details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Wireless Headphones",
    "description": "...",
    "price": 149.99,
    "images": [...],
    "reviews": [
      {
        "user": {...},
        "rating": 5,
        "comment": "Great product!",
        "createdAt": "2024-01-15"
      }
    ],
    "specifications": {...}
  }
}
```

### GET /products/categories
Get all product categories.

**Response (200):**
```json
{
  "success": true,
  "data": [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Sports"
  ]
}
```

### GET /products/featured
Get featured products.

**Response (200):**
```json
{
  "success": true,
  "data": [...]
}
```

### POST /products/:id/reviews
Add product review.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

### POST /products (Admin Only)
Create new product.

**Headers:** 
- `Authorization: Bearer <admin_token>`
- `Content-Type: multipart/form-data`

**Form Data:**
- name (required)
- description (required)
- price (required)
- originalPrice (optional)
- category (required)
- brand (optional)
- stock (required)
- images (files, up to 5)
- specifications (JSON string)
- tags (array of strings)
- isFeatured (boolean)

---

## 🛒 Cart Endpoints

### GET /cart
Get user's cart.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "id": "item_id",
        "product": {...},
        "quantity": 2,
        "price": 149.99
      }
    ],
    "totalItems": 2,
    "totalPrice": 299.98
  }
}
```

### POST /cart/items
Add item to cart.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### PUT /cart/items/:itemId
Update cart item quantity.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quantity": 3
}
```

### DELETE /cart/items/:itemId
Remove item from cart.

**Headers:** `Authorization: Bearer <token>`

### DELETE /cart
Clear entire cart.

**Headers:** `Authorization: Bearer <token>`

---

## 📝 Order Endpoints

### POST /orders
Create new order.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "image": "image_url",
      "price": 149.99
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "addressLine1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "postalCode": "10001"
  },
  "paymentMethod": "card",
  "itemsPrice": 299.98,
  "taxPrice": 24.00,
  "shippingPrice": 10.00,
  "totalPrice": 333.98
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-1234567890",
    "orderStatus": "Processing",
    "totalPrice": 333.98
  }
}
```

### GET /orders/my-orders
Get user's order history.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id",
      "orderItems": [...],
      "orderStatus": "Delivered",
      "totalPrice": 333.98,
      "createdAt": "2024-01-15",
      "isPaid": true,
      "isDelivered": true
    }
  ]
}
```

### GET /orders/:id
Get single order details.

**Headers:** `Authorization: Bearer <token>`

### PUT /orders/:id/cancel
Cancel order.

**Headers:** `Authorization: Bearer <token>`

### POST /orders/payment
Process payment (Stripe).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 333.98
}
```

**Response (200):**
```json
{
  "success": true,
  "clientSecret": "stripe_client_secret"
}
```

### PUT /orders/:id/payment
Update payment status.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "paymentId": "stripe_payment_id",
  "status": "succeeded"
}
```

---

## ❤️ Wishlist Endpoints

### GET /wishlist
Get user's wishlist.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 149.99,
      "images": [...],
      "ratings": 4.5
    }
  ]
}
```

### POST /wishlist/:productId
Add product to wishlist.

**Headers:** `Authorization: Bearer <token>`

### DELETE /wishlist/:productId
Remove product from wishlist.

**Headers:** `Authorization: Bearer <token>`

---

## 👑 Admin Endpoints

### GET /admin/stats
Get dashboard statistics.

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 1250,
      "totalProducts": 150,
      "totalOrders": 3420,
      "totalRevenue": "185420.50"
    },
    "ordersByStatus": [...],
    "recentOrders": [...],
    "monthlyRevenue": [...],
    "topProducts": [...],
    "lowStockProducts": [...]
  }
}
```

### GET /admin/users
Get all users.

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` (text search)

### PUT /admin/users/:id/role
Update user role.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "role": "admin"
}
```

### PUT /admin/users/:id/deactivate
Deactivate user account.

**Headers:** `Authorization: Bearer <admin_token>`

### DELETE /admin/users/:id
Delete user account.

**Headers:** `Authorization: Bearer <admin_token>`

### GET /orders (Admin)
Get all orders with filtering.

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page`
- `limit`
- `status` (Processing, Confirmed, Shipped, Delivered, Cancelled)

### PUT /orders/:id/status (Admin)
Update order status.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "Shipped",
  "note": "Order dispatched via FedEx"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Response when exceeded:**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products?category=Electronics&limit=5
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 1
  }'
```

---

## Testing with Postman

1. Import the collection from `/postman/ecommerce-api.json`
2. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (will be set automatically after login)
3. Start with the "Auth" folder to login
4. Token will be automatically saved for subsequent requests

---

## WebSocket Events (Future Enhancement)

Real-time order updates:
```javascript
socket.on('order-status-update', (data) => {
  console.log('Order status changed:', data);
});
```

---

**📝 Note:** Replace `YOUR_TOKEN` and `PRODUCT_ID` with actual values from your application.
