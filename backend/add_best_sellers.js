require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const bestSellers = [
  {
    name: 'OnePlus Nord CE6 | 8GB+256GB | Fresh Blue',
    description: 'Snapdragon 7s Gen 4 | 8000mAh Battery | 144Hz 1.5K AMOLED Display | 50MP Main + 32MP Selfie 4K Cameras | IP66,68,69,69K.',
    price: 32998,
    originalPrice: 35999,
    category: 'electronics',
    brand: 'OnePlus',
    images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' }],
    stock: 100,
    ratings: 4.5,
    numOfReviews: 1250,
    isFeatured: true,
    tags: ['mobile', 'oneplus', 'smartphone']
  },
  {
    name: 'iQOO Z10 Lite 5G (Cyber Green, 4GB RAM)',
    description: '6000 mAh Battery | Dimensity 6300 5G Processor with 433K+ AnTuTu Score | IP64 Rated & Military Grade Shock-Resistance.',
    price: 13998,
    originalPrice: 15999,
    category: 'electronics',
    brand: 'iQOO',
    images: [{ url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' }],
    stock: 50,
    ratings: 4.2,
    numOfReviews: 6896,
    isFeatured: true,
    tags: ['mobile', 'iqoo', 'smartphone']
  },
  {
    name: 'Portronics Conch Theta C Wired Earphones',
    description: 'In-Ear Type C Wired Earphones with in-Line HD Mic, Powerful Audio, 14.2mm Driver, Unique Earbuds Design.',
    price: 309,
    originalPrice: 799,
    category: 'electronics',
    brand: 'Portronics',
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' }],
    stock: 500,
    ratings: 4.1,
    numOfReviews: 8576,
    isFeatured: true,
    tags: ['earphones', 'audio', 'gadget']
  },
  {
    name: 'Ghar Soaps Sandalwood & Saffron Magic Soaps',
    description: 'Bath (300 Gms Pack Of 3) | Paraben Free | Chandan & Kesar Bath Soap | Handmade Soaps For Glowing Skin.',
    price: 308,
    originalPrice: 499,
    category: 'accessories',
    brand: 'Ghar Soaps',
    images: [{ url: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80' }],
    stock: 200,
    ratings: 3.9,
    numOfReviews: 31784,
    isFeatured: true,
    tags: ['beauty', 'soap', 'luxury']
  },
  {
    name: 'The Derma Co 1% Hyaluronic Sunscreen Aqua Gel',
    description: 'SPF 50 PA++++ | Hydrating, Lightweight & Non-Greasy | No White Cast | Broad Spectrum & Blue Light Protection.',
    price: 255,
    originalPrice: 499,
    category: 'accessories',
    brand: 'The Derma Co',
    images: [{ url: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&q=80' }],
    stock: 300,
    ratings: 4.2,
    numOfReviews: 37484,
    isFeatured: true,
    tags: ['skincare', 'sunscreen', 'beauty']
  },
  {
    name: 'Nike Mens Revolution 7 Running Shoes',
    description: 'Premium quality running shoes with enhanced cushioning and breathable mesh upper.',
    price: 2289,
    originalPrice: 3695,
    category: 'fashion',
    brand: 'Nike',
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' }],
    stock: 150,
    ratings: 4.2,
    numOfReviews: 2289,
    isFeatured: true,
    tags: ['shoes', 'nike', 'fashion', 'sports']
  },
  {
    name: 'NutriPro Juicer Mixer Grinder - 500 Watts',
    description: 'Smoothie Maker - 500 Watts (2 Jars & 1 Blade, Silver) - 2 Year Warranty.',
    price: 1499,
    originalPrice: 2499,
    category: 'home',
    brand: 'NutriPro',
    images: [{ url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80' }],
    stock: 80,
    ratings: 4.4,
    numOfReviews: 29611,
    isFeatured: true,
    tags: ['kitchen', 'home', 'mixer']
  },
  {
    name: 'MILTON Comet 1000 Stainless Steel Bottle',
    description: '1000 ml, Single Walled, ISI Certified I Leak Proof Lid, Rust Proof I For School, Office, Gym.',
    price: 237,
    originalPrice: 350,
    category: 'home',
    brand: 'MILTON',
    images: [{ url: 'https://images.unsplash.com/photo-1602143399827-bd934934c566?w=800&q=80' }],
    stock: 400,
    ratings: 3.9,
    numOfReviews: 4872,
    isFeatured: true,
    tags: ['bottle', 'home', 'school']
  }
];

const seedBestSellers = async () => {
  try {
    await connectDB();
    
    const admin = await User.findOne({ role: 'admin' });
    const adminId = admin ? admin._id : null;

    const productsWithAdmin = bestSellers.map(p => ({
      ...p,
      createdBy: adminId
    }));

    await Product.insertMany(productsWithAdmin);
    console.log('✅ Best Sellers added successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error adding best sellers:', error);
    process.exit(1);
  }
};

seedBestSellers();
