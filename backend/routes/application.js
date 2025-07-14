// routes/applications.js
const express = require('express');
const nodemailer = require('nodemailer');
const { runQuery, getAllQuery } = require('../db/database');
require('dotenv').config();

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// POST: Submit application and send email
router.post('/applications', async (req, res) => {
  try {
    const { name, email, purpose, disclaimerAgreed } = req.body;
    await runQuery(
      'INSERT INTO applications (name, email, purpose, disclaimerAgreed) VALUES (?, ?, ?, ?)',
      [name, email, purpose, disclaimerAgreed]
    );

    res.status(201).json({ message: 'Application saved and email sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error saving application or sending email' });
  }
});

// GET: Review all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await getAllQuery('SELECT * FROM applications ORDER BY createdAt DESC');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

module.exports = router;
