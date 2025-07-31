import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;
const host = '0.0.0.0'; // Allow connections from all network interfaces

app.use(cors());
app.use(express.json());

app.get('/api/greet', (req, res) => {
  res.json({ message: "Hello from the backend! Welcome to the FSD Lab." });
});

app.listen(port, host, () => {
  console.log(`Backend Server running at http://${host}:${port}`);
});