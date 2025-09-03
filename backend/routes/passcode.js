const express = require('express');
const router = express.Router();
const { generatePasscode, validatePasscode } = require('../db/database');

// API: Generate a new passcode
router.post('/generate-passcode', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const code = await generatePasscode(userId);
    res.json({ passcode: code });
  } catch (error) {
    console.error('Error generating passcode:', error);
    res.status(500).json({ error: 'Failed to generate passcode' });
  }
});

// API: Validate a passcode
router.post('/validate-passcode', async (req, res) => {
  try {
    const { code, userId } = req.body;
    if (!code || !userId) {
      return res.status(400).json({ error: 'code and userId are required' });
    }
    const isValid = await validatePasscode(code, userId);
    res.json({ success: isValid });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 400).json({ error: error.message });
  }
});

module.exports = router;
