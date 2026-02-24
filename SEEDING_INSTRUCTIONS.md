# 📦 Product Seeding Instructions

This guide will help you seed the database with 20 sample products for the ShopHub E-Commerce Platform.

## 📋 What's Included

The product seeder includes **20 diverse sample products** across multiple categories:

### Products by Category:

**Electronics (7 products)**
- Wireless Bluetooth Headphones - $149.99
- Smart Fitness Watch - $199.99
- Bluetooth Speaker Portable - $79.99
- Wireless Gaming Mouse - $69.99
- Mechanical Keyboard RGB - $129.99
- 4K Webcam USB - $89.99
- USB-C Fast Charger - $39.99

**Clothing (3 products)**
- Organic Cotton T-Shirt - $29.99
- Winter Puffer Jacket - $149.99
- Denim Jeans Slim Fit - $54.99

**Home & Kitchen (4 products)**
- Stainless Steel Water Bottle - $34.99
- LED Desk Lamp - $44.99
- Coffee Maker Machine - $79.99
- Bamboo Cutting Board Set - $34.99
- Microfiber Towel Pack - $29.99

**Sports (3 products)**
- Yoga Mat with Carrying Strap - $39.99
- Running Shoes Men - $89.99
- Yoga Block Set (2pcs) - $24.99

**Jewelry & Accessories (4 products)**
- Professional Camera Backpack - $89.99
- Polarized Sunglasses - $49.99
- Vintage Leather Wallet - $59.99
- Stainless Steel Watch - $99.99
- Trendy Canvas Backpack - $49.99
- Phone Stand Tripod - $19.99

### Product Features
✅ High-quality Unsplash image URLs  
✅ Realistic pricing with discounts  
✅ Ratings from 4.2 to 4.8 stars  
✅ Stock levels from 20 to 100 units  
✅ Detailed descriptions and specifications  
✅ Multiple product tags for filtering  

---

## 🚀 How to Run the Seeder

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas URL configured
- Environment variables set up (.env file in backend folder)

### Step 1: Ensure .env is Configured

Create or update `./.env` in the backend folder with:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

ADMIN_EMAIL=admin@ecommerce.com
ADMIN_PASSWORD=Admin@123456
JWT_SECRET=your_jwt_secret_key
```

### Step 2: Install Dependencies (if not already done)

```bash
cd backend
npm install
```

### Step 3: Run the Seeder Script

```bash
npm run seed
```

Or manually:

```bash
node src/seeders/productSeeder.js
```

### Expected Output

```
🗑️  Deleting existing products...
👤 Creating admin user...
✅ Admin created: admin@ecommerce.com
📦 Seeding products...
✅ Database seeded successfully!
📊 20 products added

🔑 Admin Credentials:
   Email: admin@ecommerce.com
   Password: Admin@123456
```

---

## 🛠️ What the Seeder Does

1. **Connects to MongoDB** using the connection string in .env
2. **Deletes existing products** (clears the collection)
3. **Creates an admin user** with the credentials from .env
4. **Inserts 20 sample products** with:
   - Realistic data
   - Product images from Unsplash
   - Specifications and tags
   - Admin user as the creator
5. **Displays success message** with admin credentials

---

## 📱 Viewing Seeded Products

### In Frontend:

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend server:**
   ```bash
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

3. **Navigate to Products page:**
   - Go to http://localhost:3000/products
   - Products will display in a grid layout
   - Try filters: Category, Price Range, Rating, Sort

### In Admin Dashboard:

1. Login with:
   - Email: `admin@ecommerce.com`
   - Password: `Admin@123456`

2. Click on **Admin** link in navbar

3. Go to **Admin Dashboard** → **Manage Products**

4. All 20 products will be listed in a table

---

## 🔄 Resetting Data

To clear all products and reseed fresh data:

```bash
npm run seed
```

The script automatically deletes all existing products before seeding new ones.

---

## 🗄️ Database Collections Created

After seeding, your MongoDB will have:

```
Collections:
├── products (20 documents)
├── users (1 admin user)
├── carts (empty)
├── orders (empty)
└── wishlists (empty)
```

---

## ✅ Troubleshooting

### Error: "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check `MONGO_URI` in .env file
- For MongoDB Atlas: verify username, password, and IP whitelist

### Error: "Admin user already exists"
- Modify `ADMIN_EMAIL` in .env to use a different email
- Or delete the admin user from MongoDB first

### Error: "Module not found"
- Ensure you've run `npm install` in backend folder
- Check that all dependencies are installed: `npm list`

### Products not showing on frontend
- Verify backend is running on port 5000
- Check browser console for API errors
- Ensure `.env.local` is configured in frontend with correct API URL

---

## 📝 Customizing Products

To add or modify products:

1. Edit `backend/src/seeders/productSeeder.js`
2. Modify the `sampleProducts` array
3. Run `npm run seed` again

Example product structure:

```javascript
{
  name: 'Product Name',
  description: 'Detailed product description',
  price: 99.99,
  originalPrice: 149.99,
  category: 'Electronics',
  brand: 'Brand Name',
  images: [
    { url: 'https://images.unsplash.com/...' }
  ],
  stock: 50,
  ratings: 4.5,
  isFeatured: true,
  specifications: {
    'Feature 1': 'Value',
    'Feature 2': 'Value'
  },
  tags: ['tag1', 'tag2']
}
```

---

## 🎯 Available Categories

- Electronics
- Clothing
- Home & Kitchen
- Sports
- Jewelry & Accessories

---

## 📊 API Endpoints

### Fetch Products
```
GET /api/products
Query Parameters:
  - search: search term
  - category: filter by category
  - sort: 'newest', 'popular', 'price_low_high'
  - limit: number of products
```

### Fetch Single Product
```
GET /api/products/:id
```

### Admin: Create Product (requires admin token)
```
POST /api/products
Body: { name, description, price, category, stock, images }
```

---

## 🎓 Next Steps

After seeding:

1. ✅ Verify products appear on Products page
2. ✅ Test filtering by category, price, rating
3. ✅ Test search functionality
4. ✅ Add products to cart
5. ✅ Add products to wishlist
6. ✅ Test checkout flow

---

## ❓ Need Help?

- Check backend logs for errors: `npm start`
- Verify MongoDB connection: `npm run seed`
- Check browser console for frontend errors
- Review `.env` file configuration

---

Happy seeding! 🚀
