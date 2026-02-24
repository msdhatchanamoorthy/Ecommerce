# 🛒 Ecommerce Web Application (MERN Stack)

A full-stack Ecommerce Web Application built using the MERN Stack
(MongoDB, Express.js, React.js, Node.js).

This project includes user authentication, product management,
shopping cart, orders, and admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Search & Filter Products
- Add to Cart / Remove from Cart
- Place Orders
- View Order History

### 🛠️ Admin Features
- Admin Dashboard
- Add / Edit / Delete Products
- Manage Orders
- Manage Users

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

Ecommerce/
├── frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── README.md
└── .gitignore

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/your-username/Ecommerce.git
cd Ecommerce

### 2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server:
npm start

---

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

---

## 🌐 Environment Variables

PORT - Backend server port  
MONGO_URI - MongoDB connection string  
JWT_SECRET - JWT secret key  

---

## 🔮 Future Enhancements
- Payment Gateway Integration
- Wishlist Feature
- Product Reviews & Ratings
- Email Notifications
- Deployment (Vercel / Render)

---

## 📄 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author

Dhatchanamoorthy M S  
B.Tech Information Technology  
Full Stack Developer  

GitHub: https://github.com/msdhatchanamoorthy
