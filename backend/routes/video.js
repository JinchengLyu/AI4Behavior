const express = require('express');
const router = express.Router();
const {
  getAllVideos,
  queryVideos,
  queryFileSessions,
  getDistinctValues,
  updateTranscript,
  countRecords
} = require('../db/database');

// Endpoint to get all videos
router.get('/wholeDB', (req, res) => {
  getAllVideos((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ videos: rows });
  });
});

// Endpoint to download whole DB as JSON
router.get('/wholeDB.json', (req, res) => {
  getAllVideos((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.setHeader('Content-Disposition', 'attachment; filename=DB.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ videos: rows }, null, 2));
  });
});

// Endpoint to filter videos
router.post('/filter', (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: 'No filter provided' });
  }

  queryVideos(filters, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows.length) {
      return res.status(404).json({ error: 'No matching videos found' });
    }
    res.json({ videos: rows });
  });
});

// Endpoint to filter and deduplicate file sessions
router.post('/filter/deduplicate', (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: 'No filter provided' });
  }

  queryFileSessions(filters, filters['GroupBy'], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows.length) {
      return res.status(404).json({ error: 'No matching videos found' });
    }
    res.json({ videos: rows });
  });
});

// Endpoint to get distinct values for a column
router.get('/distinct/:column', (req, res) => {
  const column = req.params.column;
  getDistinctValues(column, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const distinctValues = rows.map((row) => row[column]);
    console.log(`Fetched distinct values: ${distinctValues}`);
    res.json({ distinctValues });
  });
});

// Endpoint to update transcript
router.post('/update-transcript', (req, res) => {
  const { annotation, id } = req.body;
  updateTranscript(annotation, id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Endpoint to count records based on fields
router.post('/count', (req, res) => {
  const { field1, value1, field2, value2 } = req.body;
  countRecords(field1, value1, field2, value2, (err, result) => {
    if (err) {
      res.status(500).send('Error executing query');
      return;
    }
    res.json(result);
  });
});

module.exports = router;
