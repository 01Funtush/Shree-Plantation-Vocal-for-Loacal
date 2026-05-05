require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/orders', orderRoutes);

// Add basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Shree Plantation API' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shree_plantation')
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error: Could not connect to the database.');
    console.error('👉 Tip: Make sure MongoDB is installed and running locally on port 27017,');
    console.error('         OR create a backend/.env file with a valid MONGO_URI from MongoDB Atlas.');
  });

// Start server regardless of DB connection (so frontend doesn't crash)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
