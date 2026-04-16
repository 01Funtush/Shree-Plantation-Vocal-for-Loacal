const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const auth = require('../middleware/auth');

// Seed default content if none exists
const seedContent = async () => {
  const count = await SiteContent.countDocuments();
  if (count === 0) {
    await SiteContent.create({});
    console.log('🌱 Seeded default Site Content configuration');
  }
};
seedContent();

// @route   GET api/content
// @desc    Get website dynamic content
router.get('/', async (req, res) => {
  try {
    const content = await SiteContent.findOne();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/content
// @desc    Update website dynamic content
router.put('/', auth, async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(req.body);
    } else {
      content = Object.assign(content, req.body);
    }
    await content.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
