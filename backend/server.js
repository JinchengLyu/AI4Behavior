const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const port = 4005;
const BASE_DIR = path.join(__dirname, "files");

app.use(cors());
app.use(bodyParser.json());

// 安全路径检查函数
const safePath = (userPath) => {
  const root = path.join(__dirname, "files");
  const requestedPath = path.join(root, userPath);
  if (!requestedPath.startsWith(root)) {
    throw new Error("illegal");
  }
  return requestedPath;
};

// Serve static video files
app.use("/videos", express.static(path.join(__dirname, "video_clips")));

const db = new sqlite3.Database("./first_round_data_50.sqlite");

// Endpoint to get all videos
app.get("/api/wholeDB", (req, res) => {
  db.all("SELECT * FROM videos", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ videos: rows });
  });
});

app.get("/api/wholeDB.json", (req, res) => {
  db.all("SELECT * FROM videos", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.setHeader("Content-Disposition", "attachment; filename=DB.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ videos: rows }, null, 2));
  });
});

//filter as provided feild:value provided
app.post("/api/filter", (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: "No filter provided" });
  }

  const filterKeys = Object.keys(filters).filter(
    (key) =>
      filters[key] !== null && filters[key] !== undefined && filters[key] !== ""
  ); //ignore feilds with meaningless values
  const filterValues = filterKeys.map((key) => {
    if (key === "matched_transcript") {
      return `%${filters[key]}%`; // Use wildcards for partial match
    }
    return filters[key];
  });
  console.log("filters", filterKeys, filterValues);

  const query = `SELECT * FROM videos WHERE ${filterKeys
    .map((key) =>
      key === "matched_transcript" ? `${key} LIKE ?` : `"${key}" = ?`
    )
    .join(" AND ")}`;

  db.all(query, filterValues, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows.length) {
      return res.status(404).json({ error: "No matching videos found" });
    }
    res.json({ videos: rows });
  });
});

// New endpoint to get distinct values for a column
//can have a global var to store, so only go over whole DB once on lunch
app.get("/api/distinct/:column", (req, res) => {
  const column = req.params.column;
  console.log(
    `Received request to fetch distinct values for column: ${column}`
  ); // Debug print
  if (!column) {
    console.error("No column specified"); // Debug print
    return res.status(400).json({ error: "No column specified" });
  }

  const query = `SELECT DISTINCT "${column}" FROM videos`;
  console.log(`Executing query: ${query}`); // Debug print

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(`Error executing query: ${err.message}`); // Debug print
      return res.status(400).json({ error: err.message });
    }
    const distinctValues = rows.map((row) => row[column]);
    console.log(`Fetched distinct values: ${distinctValues}`); // Debug print
    res.json({ distinctValues });
  });
});

// Endpoint to update transcript
app.post("/api/update-transcript", (req, res) => {
  const { annotation, id } = req.body;

  // Update the transcript field in the database
  const query = `UPDATE videos SET matched_transcript = ? WHERE Id=?`;
  db.run(query, [annotation, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(`updated ${id} transcript to "${annotation}"`);
    res.json({
      message: "Transcript updated successfully",
      changes: this.changes,
    });
  });
});

//count how many value exist in feild
app.post("/count", (req, res) => {
  const { field1, value1, field2, value2 } = req.body;
  let query = `SELECT COUNT(*) AS count FROM videos`;
  let params = [];
  if (value1 !== "") {
    query += ` WHERE ${field1} = ?`;
    params.push(value1);
    if (value2 !== "") {
      query += ` AND ${field2} = ?`;
      params.push(value2);
    }
  } else {
    if (value2 !== "") {
      query += ` WHERE ${field2} = ?`;
      params.push(value2);
    }
  }

  db.get(query, params, (err, row) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    res.json({ count: row.count });
  });
});

// 递归构建文件树
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

// API: 获取文件树
app.get("/api/files", async (req, res) => {
  try {
    const rootPath = path.join(__dirname, "files");
    const tree = await buildFileTree(rootPath);
    res.json(tree);
  } catch (error) {
    console.error("构建文件树失败:", error);
    res.status(500).json({ error: "无法获取文件树" });
  }
});

// API: 下载文件
app.get("/api/download", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "files", req.query.path);
    const stat = await fs.stat(filePath);

    if (!stat.isFile()) {
      return res.status(400).json({ error: "不是文件" });
    }

    res.download(filePath);
  } catch (error) {
    console.error("下载文件失败:", error);
    res.status(500).json({ error: "无法下载文件" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
