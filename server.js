const express = require('express');
const { getJson } = require('serpapi');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'docs')));

// API endpoint to fetch data from SerpAPI
app.get('/api/data', (req, res) => {
  getJson({
    api_key: "4d577dbb1c17b9cf3107217a1c1ea8fc59e2d421275bb3bb240405886f3c0f55",
    engine: "google_scholar_author",
    hl: "en",
    author_id: "VRKtYGUAAAAJ"
  }, (json) => {
    res.json(json);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});