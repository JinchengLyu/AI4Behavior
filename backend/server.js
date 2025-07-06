const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const videoRoutes = require('./routes/video');
const fileRoutes = require('./routes/file');
const passcodeRoutes = require('./routes/passcode');

const app = express();
const port = 4005;

app.use(cors());
app.use(bodyParser.json());

// Serve static video files
app.use('/videos', express.static(path.join(__dirname, 'video_clips')));

// Use API routes
app.use('/api', videoRoutes);
app.use('/api', fileRoutes);
app.use('/api', passcodeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
