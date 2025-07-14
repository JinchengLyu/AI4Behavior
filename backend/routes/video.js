const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  getAllVideos,
  queryVideos,
  queryFileSessions,
  getDistinctValues,
  updateTranscript,
  countRecords,
} = require("../db/database");

// Endpoint to get all videos
router.get("/wholeDB", (req, res) => {
  getAllVideos((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ videos: rows });
  });
});

// Endpoint to download whole DB as JSON
router.get("/wholeDB.json", (req, res) => {
  getAllVideos((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.setHeader("Content-Disposition", "attachment; filename=DB.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ videos: rows }, null, 2));
  });
});

// Endpoint to filter videos
router.post("/filter", (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: "No filter provided" });
  }

  queryVideos(filters, (err, rows) => {
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

// Endpoint to filter and deduplicate file sessions
router.post("/filter/deduplicate", (req, res) => {
  const filters = req.body;
  if (!Object.keys(filters).length) {
    return res.status(400).json({ error: "No filter provided" });
  }

  queryFileSessions(filters, filters["GroupBy"], (err, rows) => {
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

// Endpoint to get distinct values for a column
router.get("/distinct/:column", (req, res) => {
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
router.post("/update-transcript", (req, res) => {
  const { annotation, id } = req.body;
  updateTranscript(annotation, id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Endpoint to count records based on fields
router.post("/count", (req, res) => {
  const { field1, value1, field2, value2 } = req.body;
  countRecords(field1, value1, field2, value2, (err, result) => {
    if (err) {
      res.status(500).send("Error executing query");
      return;
    }
    res.json(result);
  });
});

// GET: Stream video file
router.get("/video/*", (req, res) => {
  const relativePath = req.params[0]; // Captures the full path after /video/, e.g., 'files/human_annotation/AL_TD/Section1.MOV'
  const videoPath = path.join(
    __dirname,
    "../files/human_annotation",
    relativePath
  ); // Adjust base path if needed (assuming from project root)
  console.log(`Requested video path: ${videoPath}`);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send("Video not found");
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Handle partial content (for video seeking)
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/quicktime", // For .MOV files; change to 'video/mp4' if needed
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Full video
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/quicktime",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
