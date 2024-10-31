const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4004;

app.use(cors());
app.use(bodyParser.json());

// Serve static video files
app.use("/videos", express.static(path.join(__dirname, "videos")));

const db = new sqlite3.Database("./database.sqlite");

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

app.post("/api/video", (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: "No filter provided" });
  }

  const filterKeys = Object.keys(filters);
  const filterValues = filterKeys.map((key) => {
    if (key === "Transcript") {
      return `%${filters[key]}%`; // Use wildcards for partial match
    }
    return filters[key];
  });

  const query = `SELECT * FROM videos WHERE ${filterKeys
    .map((key) => (key === "Transcript" ? `${key} LIKE ?` : `"${key}" = ?`))
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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
