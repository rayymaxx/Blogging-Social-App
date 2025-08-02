// backend/index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Simple route to test server
app.get('/', (req, res) => {
  res.send('Hellooo from Riri\'s Backend! 👑');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
