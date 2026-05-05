const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST a new contact request
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    
    // Background task: Send an email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: `"${savedContact.name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Request from ${savedContact.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${savedContact.name}</p>
          <p><strong>Phone:</strong> ${savedContact.phone}</p>
          <p><strong>Interested Product:</strong> ${savedContact.productName || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${savedContact.message}</p>
        `
      };
      
      transporter.sendMail(mailOptions).catch(err => console.error("Email failed:", err));
    }

    res.status(201).json({ message: 'Contact request submitted successfully', data: savedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all contacts (admin only)
router.get('/', require('../middleware/auth'), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a contact (admin only)
router.delete('/:id', require('../middleware/auth'), async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
