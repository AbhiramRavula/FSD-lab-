// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Home page route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Your First Express Website!</h1><p>This page is served from an Express backend.</p>');
});

// About page route
app.get('/about', (req, res) => {
  res.send('<h2>About This App</h2><p>This is a simple demonstration of Express routing.</p>');
});

app.get('/mecs', (req, res) => {
  res.send('<h2>Matrusri Ebgineerin College </h2><p>This is a simple demonstration of Express routing.</p>');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('<h3>404 Not Found</h3>');
});

app.listen(PORT, () => {
  console.log(`Express app running at http://localhost:${PORT}`);
});
