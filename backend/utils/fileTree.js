const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

// Safe path checking function
const safePath = (userPath) => {
  const root = path.join(__dirname, "../files");
  const requestedPath = path.join(root, userPath);
  if (!requestedPath.startsWith(root)) {
    throw new Error("illegal");
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
        type: "folder",
        path: relativePath,
        children: await buildFileTree(fullPath, basePath),
      });
    } else {
      tree.push({
        name: entry.name,
        type: "file",
        path: relativePath,
      });
    }
  }
  return tree;
};

// Function to handle file or folder download
const downloadItem = async (itemPath, res) => {
  try {
    const stat = await fs.promises.stat(itemPath);
    if (!stat.isFile()) {
      return res.status(400).json({ error: "Not a file" });
    }

    const fileName = path.basename(itemPath);
    const fileSize = stat.size; // 用于 Content-Length

    // 立即设置响应头，让客户端知道下载开始
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", fileSize); // 帮助浏览器显示进度
    res.setHeader("Accept-Ranges", "bytes"); // 支持断点续传（可选）

    // 创建读流：立即 pipe 到响应
    const readStream = fs.createReadStream(itemPath, {
      highWaterMark: 4 * 1024 * 1024,
    }); // 调整缓冲大小以优化

    // let startTime = Date.now();
    // readStream.on("data", (chunk) =>
    //   console.log(
    //     `Sent ${chunk.length} bytes, elapsed: ${Date.now() - startTime}ms`
    //   )
    // );

    readStream.pipe(res);

    // 错误处理
    readStream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).end();
    });

    // 完成日志
    res.on("finish", () => {
      console.log("File sent successfully");
    });
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).json({ error: "Unable to download" });
  }
};
module.exports = { safePath, buildFileTree, downloadItem };
