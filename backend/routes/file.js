const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { safePath, downloadItem } = require('../utils/fileTree'); // 复用您的工具函数（如果需要；这里未直接使用，因为路径固定）

// POST: 下载 "./splits/" 下的所有内容作为 ZIP
router.get('/download-all', async (req, res) => {
  try {
    await downloadItem(safePath('split.zip'), res);
  } catch (error) {
    console.error('批量下载失败:', error);
    res.status(500).json({ error: '无法下载' });
  }
});

// 您的原有单个下载路由（保持不变）
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
