require('dotenv').config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000})

  const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('✅ MongoDB connection successful');
});

connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
});

connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});


  module.exports = mongoose;