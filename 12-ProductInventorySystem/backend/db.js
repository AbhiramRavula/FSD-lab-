const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

// Path to the SQLite file (auto-created)
// The db file will be automatically get created, you dont need to do anything
const dbPath = path.join(__dirname, "inventory.db");

async function initDB() {
  // Open a database handle with sqlite's async open()
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  console.log("Connected to SQLite via open():", dbPath);

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      price REAL NOT NULL,
      description TEXT
    );
  `);
  console.log("Ensured products table exists");

  return db;
}

module.exports = initDB;
