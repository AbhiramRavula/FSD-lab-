const express = require("express");
const initDB = require("./db");

const PORT = process.env.PORT || 3000; // Generally 3000 only but this process.env.PORT is generally used for deployment purposes, you can ignore that

async function startServer() {
  const db = await initDB();
  const app = express();
  app.use(express.json());

  // The above lines are for initialisation of the database!!

  // --- CRUD Endpoints ---

  app.get("/products", async (req, res) => {
    try {
      const query = "SELECT * FROM products";
      const rows = await db.all(query);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/products/:id", async (req, res) => {
    try {
      const query = "SELECT * FROM products WHERE id = ?";
      const row = await db.get(query, req.params.id);
      if (!row) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json(row);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/products", async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        error: "Invalid request: No body found. Did you set Content-Type to application/json?",
      });
    }
    const { name, quantity, price, description } = req.body;
    try {
      const query =
        "INSERT INTO products (name, quantity, price, description) VALUES (?, ?, ?, ?)";
      const result = await db.run(query, [name, quantity, price, description]);
      res.status(201).json({ id: result.lastID }); // Returns the Id of the latest created product
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/products/:id", async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        error: "Invalid request: No body found. Did you set Content-Type to application/json?",
      });
    }
    const { name, quantity, price, description } = req.body;
    try {
      const query =
        "UPDATE products SET name = ?, quantity = ?, price = ?, description = ? WHERE id = ?";
      const result = await db.run(query, [
        name,
        quantity,
        price,
        description,
        req.params.id,
      ]);
      res.json({ changes: result.changes });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/products/:id", async (req, res) => {
    try {
      const query = "DELETE FROM products WHERE id = ?";
      const result = await db.run(query, req.params.id);
      res.json({ deleted: result.changes });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
