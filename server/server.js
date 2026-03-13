const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, '../data');
const dataFile = path.join(dataDir, 'progress.json');

// Initialize data directory and file ONLY if they do not already exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ days: {} }, null, 2), 'utf8');
}

// GET /progress
app.get('/progress', (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading progress:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /progress
app.post('/progress', (req, res) => {
  try {
    const newProgress = req.body;
    fs.writeFileSync(dataFile, JSON.stringify(newProgress, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing progress:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
