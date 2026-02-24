require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const fs = require('fs');
const testLogin = async () => {
    await connectDB();
    const email = 'admin@ecommerce.com';
    const password = 'Admin@123456';

    const user = await User.findOne({ email }).select('+password');
    let result = '';
    if (!user) {
        result = 'User not found';
    } else {
        const isMatch = await user.comparePassword(password);
        result = `Login Result: ${isMatch ? 'SUCCESS' : 'FAILURE'}\nUser ID: ${user._id}\nHashed Pass: ${user.password}`;
    }
    fs.writeFileSync('test_result.txt', result);
    process.exit();
};

testLogin();
