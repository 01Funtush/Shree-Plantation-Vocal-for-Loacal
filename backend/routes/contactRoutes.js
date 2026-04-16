const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST a new contact request
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({ message: 'Contact request submitted successfully', data: savedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
