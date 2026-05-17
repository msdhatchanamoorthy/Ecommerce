require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const newReleases = [
  {
    name: 'Hot Wheels Premium Race Team Red Bull',
    description: '1:64 Scale Premium Race Team Oracle RED Bull - Driver 1 Die-Cast Formula 1 Collectible Toy Race Car with Real Riders Tires.',
    price: 1999,
    originalPrice: 2499,
    category: 'accessories',
    brand: 'Hot Wheels',
    images: [{ url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800' }],
    stock: 50,
    ratings: 5.0,
    numOfReviews: 12,
    isFeatured: true,
    tags: ['toys', 'hotwheels', 'redbull', 'collectible']
  },
  {
    name: 'Drone with 4k Camera Foldable 1080P HD',
    description: 'Foldable 1080P HD Drone with FPV Live Video, Smart Gestures Selfie, Altitude Hold, One Key Take Off/Landing, 3D Flips.',
    price: 1424,
    originalPrice: 2999,
    category: 'electronics',
    brand: 'Generic',
    images: [{ url: 'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?w=800' }],
    stock: 30,
    ratings: 4.5,
    numOfReviews: 45,
    isFeatured: true,
    tags: ['drone', 'camera', 'gadget', 'electronics']
  },
  {
    name: 'XIAOMI Pad 8 Creator Edition',
    description: 'Flagship Snapdragon 8s Gen 4 | 11.2" 3.2K | 12GB, 256GB | Ultra Slim Metal Design | 9200mAh Battery HyperAI | Wi-Fi 7.',
    price: 40999,
    originalPrice: 45999,
    category: 'electronics',
    brand: 'Xiaomi',
    images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' }],
    stock: 20,
    ratings: 4.8,
    numOfReviews: 89,
    isFeatured: true,
    tags: ['tablet', 'xiaomi', 'pad8', 'android']
  },
  {
    name: 'KLOSIA Women Printed Straight Kurta',
    description: 'Women\'s Printed Straight Kurta and Pant with Dupatta Set. Elegant ethnic wear for office and college.',
    price: 579,
    originalPrice: 1299,
    category: 'fashion',
    brand: 'KLOSIA',
    images: [{ url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800' }],
    stock: 100,
    ratings: 4.6,
    numOfReviews: 270,
    isFeatured: true,
    tags: ['kurta', 'fashion', 'women', 'ethnic']
  },
  {
    name: 'Redmi Pad 2 Pro',
    description: '12000mAh | Snapdragon 7s Gen 4 | 12.1-inch, 2.5K Display | 83+ Days Standby | HyperOS 2 | 120Hz | AI Powered.',
    price: 24999,
    originalPrice: 29999,
    category: 'electronics',
    brand: 'Redmi',
    images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' }],
    stock: 40,
    ratings: 4.2,
    numOfReviews: 100,
    isFeatured: true,
    tags: ['tablet', 'redmi', 'electronics']
  },
  {
    name: 'ZEBRONICS Heat Buster 200',
    description: 'Portable Hand Fan, Upto 12h Backup, 3600mAh Rechargeable Battery, 5 Speed Modes, LED Display.',
    price: 899,
    originalPrice: 1599,
    category: 'electronics',
    brand: 'ZEBRONICS',
    images: [{ url: 'https://images.unsplash.com/photo-1619183355550-717013d28f09?w=800' }],
    stock: 200,
    ratings: 4.1,
    numOfReviews: 43,
    isFeatured: true,
    tags: ['fan', 'zebronics', 'gadget']
  },
  {
    name: 'Happi Planet Magic Eraser | Pack of 4',
    description: 'No Scratch Multi-Surface Cleaning Sponge | Removes 100+ Tough Stains | Walls, Kitchen, Bathroom.',
    price: 200,
    originalPrice: 399,
    category: 'home',
    brand: 'Happi Planet',
    images: [{ url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' }],
    stock: 500,
    ratings: 4.2,
    numOfReviews: 334,
    isFeatured: true,
    tags: ['cleaning', 'home', 'sponge']
  },
  {
    name: 'Kerok Portable Auto Travel Umbrella',
    description: 'Windproof for Rain, Strong for Wind, Auto Open/Close Button, Perfect for Men & Women.',
    price: 289,
    originalPrice: 799,
    category: 'accessories',
    brand: 'Kerok',
    images: [{ url: 'https://images.unsplash.com/photo-1520625345674-8848123286f7?w=800&q=80' }],
    stock: 150,
    ratings: 4.8,
    numOfReviews: 19,
    isFeatured: true,
    tags: ['umbrella', 'travel', 'accessories']
  }
];

const seedNewReleases = async () => {
  try {
    await connectDB();
    
    // Get an admin user for createdBy field
    const admin = await User.findOne({ role: 'admin' });
    const adminId = admin ? admin._id : null;

    const productsWithAdmin = newReleases.map(p => ({
      ...p,
      createdBy: adminId
    }));

    await Product.insertMany(productsWithAdmin);
    console.log('✅ New releases added successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error adding new releases:', error);
    process.exit(1);
  }
};

seedNewReleases();
