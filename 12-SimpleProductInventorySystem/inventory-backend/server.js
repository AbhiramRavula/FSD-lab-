const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Setup SQLite database stored in ./data/inventory.db
const db_name = path.join(__dirname, "data", "inventory.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB.");
});

// Create products table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL
)`);

// Get all products (Read)
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
 
// Add a new product (Create)
app.post("/products", (req, res) => {
  const { name, quantity, price } = req.body;

  const errors = [];
  if (typeof name !== "string" || name.trim() === "") {
    errors.push("Name must be a non-empty string.");
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
    errors.push("Quantity must be a non-negative integer.");
  }
  if (typeof price !== "number" || price < 0) {
    errors.push("Price must be a non-negative number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  db.run(
    "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)",
    [name, quantity, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, quantity, price });
    }
  );
});

// Update product by id (Update)
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;

  const errors = [];
  if (typeof name !== "string" || name.trim() === "") {
    errors.push("Name must be a non-empty string.");
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
    errors.push("Quantity must be a non-negative integer.");
  }
  if (typeof price !== "number" || price < 0) {
    errors.push("Price must be a non-negative number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  db.run(
    "UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?",
    [name, quantity, price, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ id: Number(id), name, quantity, price });
    }
  );
});

// Delete product by id (Delete)
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
