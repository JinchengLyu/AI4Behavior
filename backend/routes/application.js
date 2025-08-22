// routes/applications.js
const express = require('express');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const router = express.Router();

// Supabase admin client (server-side only; service_role)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

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

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }

    // Insert into Supabase
    const { data: inserted, error: insertError } = await supabase
      .from('applications')
      .insert([{ name, email, purpose, disclaimerAgreed }])
      .select('*')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Error saving application' });
    }

    // Send notification email (to admin mailbox)
    // const mail = {
    //   from: process.env.GMAIL_USER,
    //   to: process.env.GMAIL_USER,
    //   subject: 'New application submitted',
    //   text: `Name: ${name}\nEmail: ${email}\nPurpose: ${purpose}\nDisclaimerAgreed: ${disclaimerAgreed}\nId: ${inserted.id || inserted.Id || 'n/a'}`,
    // };

    // await transporter.sendMail(mail);

    res.status(201).json({ message: 'Application saved and email sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error saving application or sending email' });
  }
});

// GET: Review all applications
router.get('/applications', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('createdAt', { ascending: false }); // ensure column exists or rename to your timestamp column

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Error fetching applications' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

module.exports = router;
