const express = require('express');
const router = express.Router();
const path = require('path');
const { safePath, downloadItem } = require('../utils/fileTree');

// API: Download file or folder
router.get('/download', async (req, res) => {
  try {
    const itemPath = safePath(req.query.path);
    await downloadItem(itemPath, res);
  } catch (error) {
    console.error('下载失败:', error);
    res.status(500).json({ error: '无法下载' });
  }
});

module.exports = router;
