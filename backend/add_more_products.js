require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const moreProducts = [
  {
    name: 'Apple MacBook Pro 14-inch (M3 Pro)',
    description: 'Apple M3 Pro chip with 11-core CPU and 14-core GPU, 18GB Unified Memory, 512GB SSD Storage.',
    price: 199900,
    originalPrice: 199900,
    category: 'electronics',
    brand: 'Apple',
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80' }],
    stock: 25,
    ratings: 4.8,
    numOfReviews: 3120,
    isFeatured: true,
    tags: ['laptop', 'apple', 'macbook', 'computer']
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    description: 'Industry Leading Noise Canceling with Auto NC Optimizer, crystal clear hands-free calling, up to 30 hours battery life.',
    price: 29990,
    originalPrice: 34990,
    category: 'electronics',
    brand: 'Sony',
    images: [{ url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80' }],
    stock: 120,
    ratings: 4.7,
    numOfReviews: 12845,
    isFeatured: true,
    tags: ['headphones', 'audio', 'sony', 'wireless']
  },
  {
    name: 'Samsung Galaxy S24 Ultra 5G',
    description: 'AI Smartphone, Titanium Gray, 12GB RAM, 256GB Storage, 200MP Camera, S Pen Included.',
    price: 129999,
    originalPrice: 134999,
    category: 'electronics',
    brand: 'Samsung',
    images: [{ url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80' }],
    stock: 45,
    ratings: 4.6,
    numOfReviews: 5430,
    isFeatured: true,
    tags: ['mobile', 'samsung', 'smartphone']
  },
  {
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    description: 'A modern slim with room to move, the 511 Slim Fit Jeans are a classic since right now.',
    price: 2299,
    originalPrice: 3599,
    category: 'fashion',
    brand: 'Levi\'s',
    images: [{ url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80' }],
    stock: 200,
    ratings: 4.3,
    numOfReviews: 8750,
    isFeatured: true,
    tags: ['clothing', 'jeans', 'fashion', 'men']
  },
  {
    name: 'Adidas Ultraboost Light Running Shoes',
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.',
    price: 14399,
    originalPrice: 18999,
    category: 'fashion',
    brand: 'Adidas',
    images: [{ url: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80' }],
    stock: 85,
    ratings: 4.5,
    numOfReviews: 4320,
    isFeatured: true,
    tags: ['shoes', 'adidas', 'fashion', 'sports']
  },
  {
    name: 'Ray-Ban Classic Aviator Sunglasses',
    description: 'Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937.',
    price: 6590,
    originalPrice: 8590,
    category: 'accessories',
    brand: 'Ray-Ban',
    images: [{ url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' }],
    stock: 150,
    ratings: 4.6,
    numOfReviews: 9540,
    isFeatured: true,
    tags: ['sunglasses', 'accessories', 'eyewear']
  },
  {
    name: 'Fossil Gen 6 Smartwatch',
    description: 'Powered with Wear OS by Google, compatible with iPhone and Android Phones, with sleep, heart rate, and activity tracking.',
    price: 19995,
    originalPrice: 23995,
    category: 'electronics',
    brand: 'Fossil',
    images: [{ url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80' }],
    stock: 60,
    ratings: 4.1,
    numOfReviews: 2450,
    isFeatured: true,
    tags: ['smartwatch', 'watch', 'wearable']
  },
  {
    name: 'Pigeon by Stovekraft Cruise 1800 watt Induction Cooktop',
    description: '7 segments LED display for power and temperature, 93-percent energy saving technology.',
    price: 1499,
    originalPrice: 3195,
    category: 'home',
    brand: 'Pigeon',
    images: [{ url: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=800&q=80' }],
    stock: 300,
    ratings: 4.0,
    numOfReviews: 45600,
    isFeatured: true,
    tags: ['kitchen', 'appliance', 'cooking']
  },
  {
    name: 'Wakefit Orthopedic Memory Foam Mattress',
    description: '78x72x6 inches, King Size, High-quality memory foam for pressure relief and spinal alignment.',
    price: 12599,
    originalPrice: 17800,
    category: 'home',
    brand: 'Wakefit',
    images: [{ url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' }],
    stock: 40,
    ratings: 4.4,
    numOfReviews: 11200,
    isFeatured: true,
    tags: ['furniture', 'bed', 'mattress']
  },
  {
    name: 'Echo Dot (5th Gen) | Smart speaker with Alexa',
    description: 'Our best sounding Echo Dot yet, with clearer vocals and deeper bass. Just ask Alexa to play music, check the weather, and more.',
    price: 4499,
    originalPrice: 5499,
    category: 'electronics',
    brand: 'Amazon',
    images: [{ url: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80' }],
    stock: 250,
    ratings: 4.5,
    numOfReviews: 89000,
    isFeatured: true,
    tags: ['smart home', 'speaker', 'alexa']
  },
  {
    name: 'Lakmé Absolute Perfect Radiance Skin Lightening Day Creme',
    description: 'With precious micro-crystals and skin lightening vitamins, gives a radiant glowing skin.',
    price: 299,
    originalPrice: 375,
    category: 'accessories',
    brand: 'Lakmé',
    images: [{ url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80' }],
    stock: 400,
    ratings: 4.2,
    numOfReviews: 12500,
    isFeatured: true,
    tags: ['beauty', 'skincare', 'cream']
  },
  {
    name: 'Puma Men\'s Backpack',
    description: 'Durable polyester material, multiple compartments, padded shoulder straps for comfort.',
    price: 999,
    originalPrice: 1999,
    category: 'fashion',
    brand: 'Puma',
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' }],
    stock: 180,
    ratings: 4.3,
    numOfReviews: 5600,
    isFeatured: true,
    tags: ['bag', 'backpack', 'fashion']
  }
];

const seedMoreProducts = async () => {
  try {
    await connectDB();
    
    const admin = await User.findOne({ role: 'admin' });
    const adminId = admin ? admin._id : null;

    const productsWithAdmin = moreProducts.map(p => ({
      ...p,
      createdBy: adminId
    }));

    await Product.insertMany(productsWithAdmin);
    console.log('✅ More products added successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
};

seedMoreProducts();
