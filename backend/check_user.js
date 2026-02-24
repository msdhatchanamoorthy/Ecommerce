require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const checkUser = async () => {
    await connectDB();
    const user = await User.findOne({ email: 'admin@ecommerce.com' }).select('+password');
    console.log('RESULT:' + JSON.stringify(user));
    process.exit();
};

checkUser();
