const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const { upload } = require('../config/cloudinary');
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
router.put('/', auth, upload.fields([
  { name: 'heroImage', maxCount: 1 }, 
  { name: 'aboutImage1', maxCount: 1 }, 
  { name: 'aboutImage2', maxCount: 1 },
  { name: 'heroImagesFiles', maxCount: 10 },
  { name: 'aboutImages1Files', maxCount: 10 },
  { name: 'aboutImages2Files', maxCount: 10 }
]), async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    const updateData = { ...req.body };
    
    if (updateData.testimonials) {
      try {
        updateData.testimonials = JSON.parse(updateData.testimonials);
      } catch (e) {
        console.error("Failed to parse testimonials", e);
      }
    }

    const parseUrls = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split('\n').map(url => url.trim()).filter(url => url);
      return [];
    };

    if (req.body.heroImagesUrls !== undefined) updateData.heroImages = parseUrls(req.body.heroImagesUrls);
    if (req.body.aboutImages1Urls !== undefined) updateData.aboutImages1 = parseUrls(req.body.aboutImages1Urls);
    if (req.body.aboutImages2Urls !== undefined) updateData.aboutImages2 = parseUrls(req.body.aboutImages2Urls);

    if (req.files) {
      if (req.files.heroImage && req.files.heroImage.length > 0) {
        updateData.heroImage = req.files.heroImage[0].path;
      }
      if (req.files.aboutImage1 && req.files.aboutImage1.length > 0) {
        updateData.aboutImage1 = req.files.aboutImage1[0].path;
      }
      if (req.files.aboutImage2 && req.files.aboutImage2.length > 0) {
        updateData.aboutImage2 = req.files.aboutImage2[0].path;
      }

      const getFileUrls = (fileArray) => fileArray.map(f => f.path.startsWith('http') ? f.path : `http://localhost:5000/uploads/${f.filename}`);

      if (req.files.heroImagesFiles && req.files.heroImagesFiles.length > 0) {
        updateData.heroImages = [...(updateData.heroImages || []), ...getFileUrls(req.files.heroImagesFiles)];
      }
      if (req.files.aboutImages1Files && req.files.aboutImages1Files.length > 0) {
        updateData.aboutImages1 = [...(updateData.aboutImages1 || []), ...getFileUrls(req.files.aboutImages1Files)];
      }
      if (req.files.aboutImages2Files && req.files.aboutImages2Files.length > 0) {
        updateData.aboutImages2 = [...(updateData.aboutImages2 || []), ...getFileUrls(req.files.aboutImages2Files)];
      }
    }

    if (!content) {
      content = new SiteContent(updateData);
    } else {
      content.set(updateData);
    }
    await content.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
