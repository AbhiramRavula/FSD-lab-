/**
 * Database Configuration Module
 * Sets up SQLite database connection and creates required tables
 * 
 * Database Design:
 * - Normalized schema with three main tables: students, subjects, marks
 * - Foreign key relationships for data integrity
 * - CASCADE deletion for proper cleanup
 * 
 * Database File:
 * - Located at: ./students.db (SQLite file database)
 * - Persistent storage across server restarts
 */

const sqlite3 = require('sqlite3').verbose(); // SQLite3 database driver with verbose error reporting
const path = require('path'); // Node.js path utilities

// Initialize SQLite database connection
// Creates or connects to 'students.db' file in the current directory
const db = new sqlite3.Database(path.join(__dirname, 'students.db'));

// Enable foreign key constraint enforcement
// SQLite disables foreign keys by default - this enables them for data integrity
db.run("PRAGMA foreign_keys = ON");

/**
 * Initialize Database Schema
 * Creates all required tables with proper relationships and constraints
 * Uses 'IF NOT EXISTS' to avoid errors on subsequent runs
 */
function initializeDatabase() {
  /**
   * Students Table
   * Primary table storing student information
   * 
   * Columns:
   * - id: Auto-incrementing primary key
   * - name: Student's full name (required)
   * - roll_number: Unique identifier for student (required, unique)
   */
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_number TEXT NOT NULL UNIQUE
    )
  `, (err) => {
    if (err && !err.message.includes('already exists')) {
      console.error('Error creating students table:', err.message);
    } else {
      console.log('Students table initialized successfully');
    }
  });

  /**
   * Subjects Table
   * Lookup table for all subjects/courses
   * 
   * Columns:
   * - id: Auto-incrementing primary key
   * - name: Subject name (required, unique)
   * 
   * Purpose: Normalizes subject data to avoid duplication
   */
  db.run(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `, (err) => {
    if (err && !err.message.includes('already exists')) {
      console.error('Error creating subjects table:', err.message);
    } else {
      console.log('Subjects table initialized successfully');
    }
  });

  /**
   * Marks Table
   * Junction table linking students to subjects with their marks
   * 
   * Columns:
   * - id: Auto-incrementing primary key
   * - student_id: Foreign key to students table
   * - subject_id: Foreign key to subjects table
   * - marks_obtained: Actual marks scored by student
   * - max_marks: Maximum possible marks for this subject (default 100)
   * 
   * Constraints:
   * - Foreign key to students with CASCADE delete (removes marks when student deleted)
   * - Foreign key to subjects (prevents deletion of subjects in use)
   * - Unique constraint on (student_id, subject_id) prevents duplicate entries
   */
  db.run(`
    CREATE TABLE IF NOT EXISTS marks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      subject_id INTEGER NOT NULL,
      marks_obtained REAL NOT NULL,
      max_marks REAL NOT NULL DEFAULT 100,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      UNIQUE(student_id, subject_id)
    )
  `, (err) => {
    if (err && !err.message.includes('already exists')) {
      console.error('Error creating marks table:', err.message);
    } else {
      console.log('Marks table initialized successfully');
    }
  });
}

// Initialize database schema when module is loaded
// This ensures tables exist before any operations are attempted
initializeDatabase();

// Export database connection for use by other modules
module.exports = db;
