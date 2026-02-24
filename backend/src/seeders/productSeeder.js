require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/database');

const sampleProducts = [
  // Electronics
  {
    name: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with Titanium design, A17 Pro chip, customizable Action button, and a more versatile Pro camera system.',
    price: 1199.99,
    originalPrice: 1299.99,
    category: 'electronics',
    brand: 'Apple',
    images: [{ url: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800' }],
    stock: 25,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Storage': '256GB', 'Chip': 'A17 Pro', 'Display': '6.7-inch OLED', 'Color': 'Natural Titanium' },
    tags: ['iphone', 'smartphone', 'apple', 'ios']
  },
  {
    name: 'MacBook Air M2',
    description: 'Strikingly thin and fast, the MacBook Air features the M2 chip, a 13.6-inch Liquid Retina display, and up to 18 hours of battery life.',
    price: 1099,
    originalPrice: 1199,
    category: 'electronics',
    brand: 'Apple',
    images: [{ url: 'https://images.unsplash.com/photo-1661961111184-11273023fb8a?w=800' }],
    stock: 15,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'RAM': '8GB', 'SSD': '256GB', 'Chip': 'M2', 'Weight': '1.24kg' },
    tags: ['laptop', 'macbook', 'apple', 'm2']
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and incredible sound quality for music and calls.',
    price: 399.99,
    originalPrice: 449.99,
    category: 'electronics',
    brand: 'Sony',
    images: [{ url: 'https://images.unsplash.com/photo-1644794106607-df1576214158?w=800' }],
    stock: 40,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Battery': '30 hours', 'Noise Cancelling': 'Active', 'Connectivity': 'Bluetooth 5.2' },
    tags: ['headphones', 'sony', 'audio', 'wireless']
  },
  {
    name: 'Samsung 32" Odyssey G7',
    description: 'World\'s first 1000R curved gaming monitor with 240Hz refresh rate and 1ms response time.',
    price: 699.99,
    originalPrice: 799.99,
    category: 'electronics',
    brand: 'Samsung',
    images: [{ url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800' }],
    stock: 12,
    ratings: 4.7,
    isFeatured: false,
    specifications: { 'Resolution': '2560 x 1440', 'Refresh Rate': '240Hz', 'Curve': '1000R' },
    tags: ['monitor', 'gaming', 'samsung', 'curved']
  },

  // Clothing
  {
    name: 'Levis 501 Original Jeans',
    description: 'The original blue jean since 1873. Straight fit with the iconic button fly.',
    price: 89.50,
    originalPrice: 98.00,
    category: 'fashion',
    brand: 'Levis',
    images: [{ url: 'https://images.unsplash.com/photo-1542272604-787c62ff0b4c?w=800' }],
    stock: 100,
    ratings: 4.6,
    isFeatured: true,
    specifications: { 'Material': '100% Cotton', 'Fit': 'Straight', 'Care': 'Machine Wash' },
    tags: ['jeans', 'levis', 'denim', 'casual']
  },
  {
    name: 'The North Face Nuptse Jacket',
    description: 'The iconic 1996 Retro Nuptse Jacket is packed with 700-fill down for warmth and style.',
    price: 280,
    originalPrice: 320,
    category: 'fashion',
    brand: 'The North Face',
    images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800' }],
    stock: 30,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'Fill': '700 Down', 'Season': 'Winter', 'Weight': 'Standard' },
    tags: ['jacket', 'northface', 'winter', 'fashion']
  },
  {
    name: 'Premium Wool Overcoat',
    description: 'Elegant tailored overcoat made from a premium wool blend. Perfect for professional and formal occasions.',
    price: 199.99,
    originalPrice: 299.99,
    category: 'fashion',
    brand: 'ShopHub Luxe',
    images: [{ url: 'https://images.unsplash.com/photo-1539533397308-a61e761d48c8?w=800' }],
    stock: 20,
    ratings: 4.5,
    isFeatured: false,
    specifications: { 'Material': 'Wool Blend', 'Fit': 'Slim', 'Lining': 'Satin' },
    tags: ['coat', 'luxury', 'men', 'formal']
  },

  // Home & Kitchen
  {
    name: 'KitchenAid Artisan Mixer',
    description: 'The legendary KitchenAid stand mixer with 10 speeds and a 5-quart stainless steel bowl.',
    price: 449.99,
    originalPrice: 499.99,
    category: 'home',
    brand: 'KitchenAid',
    images: [{ url: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=800' }],
    stock: 15,
    ratings: 5.0,
    isFeatured: true,
    specifications: { 'Capacity': '5 Quart', 'Speeds': '10', 'Power': '325W' },
    tags: ['mixer', 'kitchen', 'baking', 'appliance']
  },
  {
    name: 'Nespresso Vertuo Coffee Machine',
    description: 'Automatic coffee and espresso machine that brews 5 cup sizes with a single touch.',
    price: 179,
    originalPrice: 229,
    category: 'home',
    brand: 'Nespresso',
    images: [{ url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800' }],
    stock: 25,
    ratings: 4.6,
    isFeatured: false,
    specifications: { 'Coffee Type': 'Capsules', 'Tank Size': '40oz', 'Heating': '15 seconds' },
    tags: ['coffee', 'nespresso', 'machine', 'kitchen']
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Dyson\'s most powerful, intelligent cordless vacuum. Laser reveals microscopic dust.',
    price: 749.99,
    originalPrice: 849.99,
    category: 'home',
    brand: 'Dyson',
    images: [{ url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800' }],
    stock: 10,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Suction': '230AW', 'Runtime': '60 min', 'Weight': '3kg' },
    tags: ['vacuum', 'dyson', 'cleaning', 'home']
  },

  // Sports
  {
    name: 'Nike Air Max 270',
    description: 'Nike\'s first lifestyle Air Max delivers style, comfort and big attitude.',
    price: 160,
    originalPrice: 180,
    category: 'sports',
    brand: 'Nike',
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' }],
    stock: 60,
    ratings: 4.7,
    isFeatured: true,
    specifications: { 'Style': 'Athletic', 'Cushion': 'Max Air', 'Color': 'Core Black' },
    tags: ['nike', 'sneakers', 'shoes', 'running']
  },
  {
    name: 'Peloton Bike+',
    description: 'The ultimate immersive indoor cycling experience with a 24-inch rotating touchscreen.',
    price: 2495,
    originalPrice: 2800,
    category: 'sports',
    brand: 'Peloton',
    images: [{ url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800' }],
    stock: 5,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'Screen': '23.8" HD', 'Weight': '63kg', 'Resistance': 'Magnetic' },
    tags: ['cycling', 'peloton', 'fitness', 'home-gym']
  },
  {
    name: 'Wilson Pro Staff Tennis Racket',
    description: 'The legendary racket choice of champions, providing ultimate precision and feel.',
    price: 249,
    originalPrice: 279,
    category: 'sports',
    brand: 'Wilson',
    images: [{ url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=800' }],
    stock: 20,
    ratings: 4.7,
    isFeatured: false,
    specifications: { 'Head Size': '97 sq in', 'Weight': '315g', 'String Pattern': '16x19' },
    tags: ['tennis', 'racket', 'wilson', 'sport']
  },

  // Books
  {
    name: 'The Creative Act by Rick Rubin',
    description: 'A beautiful and generous course of study that illuminates the path of the artist as a road we all can travel.',
    price: 32,
    originalPrice: 45,
    category: 'books',
    brand: 'Penguin Press',
    images: [{ url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800' }],
    stock: 50,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Format': 'Hardcover', 'Pages': '432', 'Language': 'English' },
    tags: ['books', 'art', 'creativity', 'reading']
  },
  {
    name: 'Kindle Paperwhite',
    description: 'Now with a 6.8” display and thinner borders, adjustable warm light, up to 10 weeks of battery life.',
    price: 139.99,
    originalPrice: 159.99,
    category: 'books',
    brand: 'Amazon',
    images: [{ url: 'https://images.unsplash.com/photo-1592434134753-a70baf7979d7?w=800' }],
    stock: 35,
    ratings: 4.8,
    isFeatured: false,
    specifications: { 'Display': '6.8 inch', 'Storage': '16GB', 'Battery': '10 weeks' },
    tags: ['kindle', 'ereader', 'books', 'tech']
  },

  // Beauty & Accessories
  {
    name: 'Estée Lauder Advanced Night Repair',
    description: 'Fast visible repair and youth-generating power. Our number 1 serum to help reduce multiple signs of aging.',
    price: 115,
    originalPrice: 125,
    category: 'accessories',
    brand: 'Estée Lauder',
    images: [{ url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800' }],
    stock: 45,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'Volume': '50ml', 'Skin Type': 'All types', 'Benefit': 'Repair' },
    tags: ['skincare', 'serum', 'beauty', 'luxury']
  },
  {
    name: 'Dyson Airwrap Multi-Styler',
    description: 'Curl, shape, smooth, and hide flyaways with the Coanda effect. No extreme heat.',
    price: 599.99,
    originalPrice: 650.00,
    category: 'accessories',
    brand: 'Dyson',
    images: [{ url: 'https://images.unsplash.com/photo-1652438135898-0c36398b18de?w=800' }],
    stock: 12,
    ratings: 4.7,
    isFeatured: true,
    specifications: { 'Power': '1300W', 'Settings': '3 heat, 3 speed', 'Weight': '0.7kg' },
    tags: ['haircare', 'dyson', 'styler', 'beauty']
  },

  // Toys & Games
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Build and display an iconic LEGO Star Wars model with 7,500+ pieces.',
    price: 799.99,
    originalPrice: 849.99,
    category: 'accessories',
    brand: 'LEGO',
    images: [{ url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800' }],
    stock: 8,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Pieces': '7541', 'Age': '18+', 'Dimensions': '84cm x 60cm' },
    tags: ['lego', 'starwars', 'toys', 'collectibles']
  },
  {
    name: 'PlayStation 5 Console',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback.',
    price: 499.99,
    originalPrice: 549.99,
    category: 'electronics',
    brand: 'Sony',
    images: [{ url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800' }],
    stock: 15,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Storage': '825GB SSD', 'Output': '4K 120Hz', 'Controllers': '1 DualSense' },
    tags: ['ps5', 'gaming', 'console', 'sony']
  },

  // Jewelry & Accessories
  {
    name: 'Ray-Ban Classic Wayfarer',
    description: 'The most recognizable style in the history of sunglasses. A signature style since 1952.',
    price: 163,
    originalPrice: 180,
    category: 'accessories',
    brand: 'Ray-Ban',
    images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800' }],
    stock: 50,
    ratings: 4.7,
    isFeatured: false,
    specifications: { 'Frame': 'Acetate', 'Lens': 'Green Classic G-15', 'Fit': 'Standard' },
    tags: ['sunglasses', 'rayban', 'fashion', 'classic']
  },
  {
    name: 'Tissot Gentleman Automatic',
    description: 'The Tissot Gentleman is a multi-purpose watch, both ergonomic and elegant in any circumstance.',
    price: 775,
    originalPrice: 850,
    category: 'accessories',
    brand: 'Tissot',
    images: [{ url: 'https://images.unsplash.com/photo-1523170671563-430f63602d4b?w=800' }],
    stock: 15,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'Movement': 'Swiss Automatic', 'Power Reserve': '80 hours', 'Water Resistance': '10 bar' },
    tags: ['watch', 'tissot', 'luxury', 'swiss']
  },

  // More variety to reach ~40 products
  {
    name: 'Fujifilm X-T5 Mirrorless Camera',
    description: 'A photography-focused mirrorless camera with 40.2MP sensor and classic dial-driven design.',
    price: 1699,
    originalPrice: 1899,
    category: 'electronics',
    brand: 'Fujifilm',
    images: [{ url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800' }],
    stock: 10,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Sensor': '40.2MP APS-C', 'Video': '6.2K/30p', 'IBIS': '7.0 stops' },
    tags: ['camera', 'fujifilm', 'photography', 'mirrorless']
  },
  {
    name: 'Adidas Ultraboost Light',
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.',
    price: 190,
    originalPrice: 210,
    category: 'sports',
    brand: 'Adidas',
    images: [{ url: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800' }],
    stock: 45,
    ratings: 4.7,
    isFeatured: false,
    specifications: { 'Cushion': 'Boost Light', 'Midsole Drop': '10mm', 'Weight': '293g' },
    tags: ['adidas', 'shoes', 'running', 'comfort']
  },
  {
    name: 'Cast Iron Skillet Set',
    description: 'Pre-seasoned cast iron skillet set for searing, sautéing, baking, and frying.',
    price: 65,
    originalPrice: 85,
    category: 'home',
    brand: 'Lodge',
    images: [{ url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800' }],
    stock: 30,
    ratings: 4.8,
    specifications: { 'Material': 'Cast Iron', 'Sizes': '8", 10", 12"', 'Country': 'USA' },
    tags: ['kitchen', 'cooking', 'skillet', 'iron']
  },
  {
    name: 'Acoustic Guitar Bundle',
    description: 'Full-size acoustic guitar with spruce top, includes gig bag, tuner, and picks.',
    price: 199,
    originalPrice: 249,
    category: 'accessories',
    brand: 'Fender',
    images: [{ url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800' }],
    stock: 20,
    ratings: 4.6,
    specifications: { 'Body': 'Dreadnought', 'Finish': 'Natural', 'Grade': 'Beginner' },
    tags: ['music', 'guitar', 'instrument']
  },
  {
    name: 'Memory Foam Gaming Chair',
    description: 'Premium gaming chair with ergonomic design, 4D armrests, and cooling memory foam.',
    price: 399,
    originalPrice: 499,
    category: 'home',
    brand: 'Secretlab',
    images: [{ url: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?w=800' }],
    stock: 15,
    ratings: 4.9,
    isFeatured: true,
    specifications: { 'Material': 'Hybrid Leatherette', 'Size': 'Regular', 'Warranty': '5 years' },
    tags: ['chair', 'gaming', 'setup', 'office']
  },
  {
    name: 'Hydro Flask 32oz Wide Mouth',
    description: 'TempShield double-wall vacuum insulation keeps drinks cold for 24h/hot for 12h.',
    price: 44.95,
    originalPrice: 49.95,
    category: 'sports',
    brand: 'Hydro Flask',
    images: [{ url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800' }],
    stock: 80,
    ratings: 4.9,
    specifications: { 'Volume': '32oz', 'Material': 'Stainless Steel', 'BPA Free': 'Yes' },
    tags: ['waterbottle', 'fitness', 'travel', 'outdoors']
  },
  {
    name: 'Fitbit Charge 6',
    description: 'Advanced fitness and health tracker with Google apps, heart rate on gym equipment, and GPS.',
    price: 159,
    originalPrice: 179,
    category: 'electronics',
    brand: 'Fitbit',
    images: [{ url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800' }],
    stock: 40,
    ratings: 4.5,
    specifications: { 'Battery': '7 days', 'GPS': 'Built-in', 'Water Resistance': '50m' },
    tags: ['fitbit', 'tracker', 'fitness', 'health']
  },
  {
    name: 'La Mer Moisturizing Cream',
    description: 'The moisturizer that started it all. Legendary Crème de la Mer has the power to transform skin.',
    price: 380,
    originalPrice: 420,
    category: 'accessories',
    brand: 'La Mer',
    images: [{ url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800' }],
    stock: 10,
    ratings: 4.7,
    specifications: { 'Volume': '60ml', 'Key Ingredient': 'Miracle Broth', 'Benefit': 'Renewal' },
    tags: ['luxury', 'skincare', 'lamer', 'beauty']
  },
  {
    name: 'Patagonia Better Sweater',
    description: 'Warm, low-bulk full-zip jacket made of soft polyester sweater-knit face and fleece interior.',
    price: 149,
    originalPrice: 169,
    category: 'fashion',
    brand: 'Patagonia',
    images: [{ url: 'https://images.unsplash.com/photo-1614633833026-07205c9d47c7?w=800' }],
    stock: 25,
    ratings: 4.9,
    specifications: { 'Material': 'Recycled Polyester', 'Weight': 'Midweight', 'Fair Trade': 'Yes' },
    tags: ['patagonia', 'fleece', 'sustainable', 'outdoor']
  },
  {
    name: 'Anker 737 Power Bank',
    description: 'Ultra-powerful 140W power bank with digital display and 24,000mAh capacity.',
    price: 149.99,
    originalPrice: 169.99,
    category: 'electronics',
    brand: 'Anker',
    images: [{ url: 'https://images.unsplash.com/photo-1609592424086-444aeb80927e?w=800' }],
    stock: 50,
    ratings: 4.8,
    specifications: { 'Capacity': '24,000mAh', 'Output': '140W Max', 'Ports': '2 USB-C, 1 USB-A' },
    tags: ['powerbank', 'anker', 'charging', 'tech']
  },
  {
    name: 'Herman Miller Aeron Chair',
    description: 'The benchmark for ergonomic seating. Breathable, comfortable, and iconic.',
    price: 1805,
    originalPrice: 2000,
    category: 'home',
    brand: 'Herman Miller',
    images: [{ url: 'https://images.unsplash.com/photo-1589384273441-c5df2f9131be?w=800' }],
    stock: 5,
    ratings: 5.0,
    isFeatured: true,
    specifications: { 'Size': 'Medium (B)', 'Lumbar': 'PostureFit SL', 'Warranty': '12 years' },
    tags: ['office', 'chair', 'ergonomic', 'luxury']
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Performance wireless mouse with 8K DPI tracking and quiet clicks.',
    price: 99,
    originalPrice: 109,
    category: 'electronics',
    brand: 'Logitech',
    images: [{ url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800' }],
    stock: 75,
    ratings: 4.9,
    specifications: { 'Sensor': '8,000 DPI', 'Battery': '70 days', 'Flow': 'Multi-device' },
    tags: ['logitech', 'mouse', 'productivity', 'wireless']
  },
  {
    name: 'Kindle Scribe',
    description: 'The first Kindle for reading and writing, with a 10.2” 300 ppi Paperwhite display and included Basic Pen.',
    price: 339,
    originalPrice: 389,
    category: 'books',
    brand: 'Amazon',
    images: [{ url: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?w=800' }],
    stock: 12,
    ratings: 4.6,
    specifications: { 'Display': '10.2 inch', 'Storage': '16GB', 'Pen': 'Included' },
    tags: ['kindle', 'notebook', 'ereader', 'tech']
  },
  {
    name: 'Yeti Tundra 45 Cooler',
    description: 'Virtually indestructible cooler with PermaFrost insulation to keep your ice cold.',
    price: 325,
    originalPrice: 350,
    category: 'sports',
    brand: 'Yeti',
    images: [{ url: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=800' }],
    stock: 15,
    ratings: 4.9,
    specifications: { 'Capacity': '26 cans', 'Weight': '10.4kg', 'Ice Retention': '5+ days' },
    tags: ['yeti', 'cooler', 'camping', 'outdoors']
  },
  {
    name: 'Theragun Pro G5',
    description: 'Professional-grade percussive therapy device to relieve pain, improve motion, and enhance recovery.',
    price: 599,
    originalPrice: 650,
    category: 'accessories',
    brand: 'Therabody',
    images: [{ url: 'https://images.unsplash.com/photo-1632732939023-e29864275155?w=800' }],
    stock: 10,
    ratings: 4.8,
    isFeatured: true,
    specifications: { 'Force': '60lbs', 'Speed': '5 built-in', 'Battery': '150 min' },
    tags: ['recovery', 'massage', 'fitness', 'wellness']
  },
  {
    name: 'Moleskine Classic Notebook',
    description: 'Hardcover large notebook with 240 ruled pages. The classic choice for writers and artists.',
    price: 24,
    originalPrice: 28,
    category: 'books',
    brand: 'Moleskine',
    images: [{ url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800' }],
    stock: 100,
    ratings: 4.7,
    specifications: { 'Size': '5" x 8.25"', 'Pages': '240', 'Paper': 'Acid-free' },
    tags: ['notebook', 'stationery', 'writing', 'moleskine']
  },
  {
    name: 'GoPro HERO12 Black',
    description: 'Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life.',
    price: 399,
    originalPrice: 449,
    category: 'electronics',
    brand: 'GoPro',
    images: [{ url: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800' }],
    stock: 25,
    ratings: 4.8,
    specifications: { 'Resolution': '5.3K60', 'Stabilization': 'HyperSmooth 6.0', 'Waterproof': '10m' },
    tags: ['gopro', 'camera', 'action', 'video']
  },
  {
    name: 'Vitamix A3500 Ascent',
    description: 'Professional-grade blender with 5 program settings and a built-in timer.',
    price: 649,
    originalPrice: 699,
    category: 'home',
    brand: 'Vitamix',
    images: [{ url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800' }],
    stock: 15,
    ratings: 5.0,
    isFeatured: true,
    specifications: { 'Power': '2.2 HP', 'Container': '64oz', 'Warranty': '10 years' },
    tags: ['blender', 'kitchen', 'vitamix', 'cooking']
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    console.log('🗑️  Deleting existing products...');
    await Product.deleteMany();

    console.log('👤 Creating admin user...');

    // Delete existing admin if exists
    await User.deleteOne({ email: process.env.ADMIN_EMAIL });

    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@ecommerce.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123',
      role: 'admin'
    });

    console.log('✅ Admin created:', admin.email);

    // Add admin as creator to products
    const productsWithAdmin = sampleProducts.map(product => ({
      ...product,
      createdBy: admin._id
    }));

    console.log('📦 Seeding products...');
    await Product.insertMany(productsWithAdmin);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 ${sampleProducts.length} products added`);
    console.log('\n🔑 Admin Credentials:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();
