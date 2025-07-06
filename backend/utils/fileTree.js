const path = require('path');
const fs = require('fs').promises;
const archiver = require('archiver');

// Safe path checking function
const safePath = (userPath) => {
  const root = path.join(__dirname, '../files');
  const requestedPath = path.join(root, userPath);
  if (!requestedPath.startsWith(root)) {
    throw new Error('illegal');
  }
  return requestedPath;
};

// Recursive function to build file tree
const buildFileTree = async (dirPath, basePath = dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const tree = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(basePath, fullPath);

    if (entry.isDirectory()) {
      tree.push({
        name: entry.name,
        type: 'folder',
        path: relativePath,
        children: await buildFileTree(fullPath, basePath),
      });
    } else {
      tree.push({
        name: entry.name,
        type: 'file',
        path: relativePath,
      });
    }
  }
  return tree;
};

// Function to handle file or folder download
const downloadItem = async (itemPath, res) => {
  const stat = await fs.stat(itemPath);
  const fileName = path.basename(itemPath);
  const parentDir = path.basename(path.dirname(itemPath));
  const customName = `${parentDir}_${fileName}`;

  console.log(`Downloading: ${itemPath}, Custom Name: ${customName}`);

  if (stat.isFile()) {
    res.setHeader('Content-Disposition', `attachment; filename="${customName}"`);
    res.sendFile(itemPath);
  } else if (stat.isDirectory()) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const zipName = `${path.basename(itemPath)}.zip`;
    res.setHeader('Content-Disposition', `attachment; filename="${zipName}"`);
    res.setHeader('Content-Type', 'application/zip');

    archive.pipe(res);
    archive.directory(itemPath, path.basename(itemPath));
    archive.finalize();
  } else {
    res.status(400).json({ error: '无效的路径' });
  }
};

module.exports = { safePath, buildFileTree, downloadItem };
