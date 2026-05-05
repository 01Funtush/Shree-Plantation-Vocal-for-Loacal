const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');
const auth = require('../middleware/auth');

// GET all products (supports search by name and category filtering)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new product (secured, handles images)
router.post('/', auth, upload.array('imageFiles', 5), async (req, res) => {
  try {
    let images = [];
    if (req.body.images && Array.isArray(req.body.images)) {
      images = req.body.images;
    } else if (typeof req.body.images === 'string') {
      images = req.body.images.split('\n').map(url => url.trim()).filter(url => url);
    }
    
    // Add uploaded file URLs
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map(file => {
        // If Cloudinary, path is full URL. If local, path is absolute system path.
        if (file.path.startsWith('http')) return file.path;
        return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      });
      images = [...images, ...fileUrls];
    }

    const productData = { ...req.body, images };
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT update a product (secured, handles images)
router.put('/:id', auth, upload.array('imageFiles', 5), async (req, res) => {
  try {
    let images = [];
    if (req.body.images && Array.isArray(req.body.images)) {
      images = req.body.images;
    } else if (typeof req.body.images === 'string') {
      images = req.body.images.split('\n').map(url => url.trim()).filter(url => url);
    }
    
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map(file => {
        if (file.path.startsWith('http')) return file.path;
        return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      });
      images = [...images, ...fileUrls];
    }

    const defaultData = { ...req.body };
    if (images.length > 0 || (req.body.images && req.body.images.trim() === '')) {
      defaultData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      defaultData,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a product (secured)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
