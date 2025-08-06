// index.js
const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
app.use(express.json());

// In-memory user store
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully.' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.json({ message: `Welcome, ${username}! Login successful.` });
});

app.listen(PORT, () => {
  console.log(`Login system running at http://localhost:${PORT}`);
});
