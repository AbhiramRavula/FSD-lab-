const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

// Path to the SQLite file (auto-created)
const dbPath = path.join(__dirname, "blog.db");

async function initDB() {
  // Open a database handle with sqlite's async open()
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  console.log("Connected to SQLite via open():", dbPath);

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Ensured posts table exists");

  return db;
}

module.exports = initDB;
