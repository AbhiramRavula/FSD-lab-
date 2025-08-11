const express = require("express");
const cors = require("cors");
const initDB = require("./db");

const PORT = process.env.PORT || 3000;
const app = express();

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

let db;

// --- Initialize DB and Server ---
initDB().then((database) => {
  db = database;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// --- CRUD Endpoints ---

// Get all posts
app.get("/blogs", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post by ID
app.get("/blogs/:id", async (req, res) => {
  try {
    const row = await db.get("SELECT * FROM posts WHERE id = ?", req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
app.post("/blogs", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = await db.run(
      "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)",
      [title, content, author]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post
app.put("/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    // 1️⃣ Get existing blog from SQLite
    const existingBlog = await db.get(
      "SELECT * FROM posts WHERE id = ?",
      blogId
    );
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // 2️⃣ Use old values if new values are not provided
    const updatedTitle = req.body.title || existingBlog.title;
    const updatedContent = req.body.content || existingBlog.content;
    const updatedAuthor = req.body.author || existingBlog.author;

    // 3️⃣ Update in SQLite
    const result = await db.run(
      "UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?",
      [updatedTitle, updatedContent, updatedAuthor, blogId]
    );

    res.json({ changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
app.delete("/blogs/:id", async (req, res) => {
  try {
    const result = await db.run(
      "DELETE FROM posts WHERE id = ?",
      req.params.id
    );
    res.json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
