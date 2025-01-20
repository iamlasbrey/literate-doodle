const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
};

module.exports = connectDB;
