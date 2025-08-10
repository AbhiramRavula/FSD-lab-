/**
 * Student Management System - Backend Server
 * A RESTful API server for managing student records, marks, and grades
 * 
 * Features:
 * - Student CRUD operations (Create, Read, Update, Delete)
 * - Grade calculation based on marks
 * - Subject management
 * - SQLite database for data persistence
 * 
 * Technologies Used:
 * - Node.js with Express.js framework
 * - SQLite database with sqlite3
 * - CORS for cross-origin requests
 * - Custom grade calculation utilities
 */

const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const db = require('./db'); // SQLite database connection and setup
const { calculateGrade, calculatePercentage } = require('./gradeHelper'); // Grade calculation utilities

// Initialize Express application
const app = express();
const PORT = 5000; // Server port number

// Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

/**
 * POST /api/students - Create a new student with marks
 * 
 * Request Body Format:
 * {
 *   "name": "Student Name",
 *   "roll_number": "ROLL001",
 *   "marks": [
 *     {
 *       "subject": "Math",
 *       "marks_obtained": 85,
 *       "max_marks": 100
 *     }
 *   ]
 * }
 * 
 * Response:
 * - 200: Student created successfully with calculated grades
 * - 400: Missing required fields (name, roll_number)
 * - 500: Database error
 */
app.post('/api/students', (req, res) => {
  // Extract data from request body with default empty array for marks
  const { name, roll_number, marks = [] } = req.body;
  
  // Validate required fields
  if (!name || !roll_number) {
    return res.status(400).json({ error: "Name and roll_number are required" });
  }
  
  // Insert new student record into database
  db.run("INSERT INTO students (name, roll_number) VALUES (?, ?)", [name, roll_number], function(err) {
    if (err) {
      return res.status(500).json({ error: "Failed to create student" });
    }
    
    // Get the auto-generated student ID
    const studentId = this.lastID;
    let processedMarks = 0; // Counter for async mark processing
    
    // Handle case where no marks are provided
    if (marks.length === 0) {
      return res.json({
        id: studentId,
        name,
        roll_number,
        marks: [],
        total_obtained: 0,
        total_max: 0,
        percentage: 0,
        grade: 'F'
      });
    }
    
    // Process each mark entry
    marks.forEach(mark => {
      // First ensure subject exists in subjects table (INSERT OR IGNORE prevents duplicates)
      db.run("INSERT OR IGNORE INTO subjects (name) VALUES (?)", [mark.subject], () => {
        // Get subject ID for foreign key relationship
        db.get("SELECT id FROM subjects WHERE name = ?", [mark.subject], (err, subject) => {
          if (subject) {
            const maxMarks = mark.max_marks || 100; // Default max marks to 100
            
            // Insert mark record linking student and subject
            db.run(
              "INSERT INTO marks (student_id, subject_id, marks_obtained, max_marks) VALUES (?, ?, ?, ?)",
              [studentId, subject.id, mark.marks_obtained, maxMarks],
              () => {
                processedMarks++;
                
                // When all marks are processed, calculate final results and respond
                if (processedMarks === marks.length) {
                  // Calculate aggregate totals
                  let totalObtained = 0;
                  let totalMax = 0;
                  marks.forEach(m => {
                    totalObtained += m.marks_obtained;
                    totalMax += (m.max_marks || 100);
                  });
                  
                  // Calculate percentage and letter grade using helper functions
                  const percentage = calculatePercentage(totalObtained, totalMax);
                  const grade = calculateGrade(percentage);
                  
                  // Return complete student record with calculated grades
                  res.json({
                    id: studentId,
                    name,
                    roll_number,
                    marks,
                    total_obtained: totalObtained,
                    total_max: totalMax,
                    percentage,
                    grade
                  });
                }
              }
            );
          }
        });
      });
    });
  });
});

/**
 * GET /api/students - Get all students with marks and grades
 * 
 * Response Format:
 * [
 *   {
 *     "id": 1,
 *     "name": "Student Name",
 *     "roll_number": "ROLL001",
 *     "marks": [
 *       {
 *         "subject": "Math",
 *         "marks_obtained": 85,
 *         "max_marks": 100
 *       }
 *     ],
 *     "total_obtained": 85,
 *     "total_max": 100,
 *     "percentage": 85.00,
 *     "grade": "B"
 *   }
 * ]
 * 
 * Response Codes:
 * - 200: Success with array of students (empty array if no students)
 * - 500: Database error
 */
app.get('/api/students', (req, res) => {
  // Retrieve all student records from database
  db.all("SELECT * FROM students", (err, students) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get students" });
    }
    
    const results = [];
    let processed = 0; // Counter to track async processing completion
    
    // Handle empty result set
    if (students.length === 0) {
      return res.json([]);
    }
    
    // Process each student to get their marks and calculate grades
    students.forEach(student => {
      // Retrieve marks for current student with subject names via JOIN
      db.all(
        `SELECT s.name as subject, m.marks_obtained, m.max_marks 
         FROM marks m 
         JOIN subjects s ON m.subject_id = s.id 
         WHERE m.student_id = ?`,
        [student.id],
        (err, marks) => {
          // Calculate aggregate totals from all subject marks
          let totalObtained = 0;
          let totalMax = 0;
          marks.forEach(mark => {
            totalObtained += mark.marks_obtained;
            totalMax += mark.max_marks;
          });
          
          // Calculate percentage and grade (handle division by zero)
          const percentage = totalMax > 0 ? calculatePercentage(totalObtained, totalMax) : 0;
          const grade = calculateGrade(percentage);
          
          // Build complete student object with calculated values
          results.push({
            id: student.id,
            name: student.name,
            roll_number: student.roll_number,
            marks,
            total_obtained: totalObtained,
            total_max: totalMax,
            percentage,
            grade
          });
          
          // Check if all students have been processed
          processed++;
          if (processed === students.length) {
            res.json(results);
          }
        }
      );
    });
  });
});

/**
 * PUT /api/students/:id - Update student information and marks
 * 
 * URL Parameters:
 * - id: Student ID to update
 * 
 * Request Body (partial updates supported):
 * {
 *   "name": "Updated Name" (optional),
 *   "roll_number": "ROLL002" (optional),
 *   "marks": [ (optional - if provided, replaces ALL existing marks)
 *     {
 *       "subject": "Math",
 *       "marks_obtained": 90,
 *       "max_marks": 100
 *     }
 *   ]
 * }
 * 
 * Response Codes:
 * - 200: Student updated successfully
 * - 404: Student not found
 * - 500: Database error
 */
app.put('/api/students/:id', (req, res) => {
  const studentId = req.params.id; // Extract student ID from URL parameter
  const { name, roll_number, marks } = req.body; // Extract update data from request body
  
  // Verify student exists before attempting update
  db.get("SELECT * FROM students WHERE id = ?", [studentId], (err, student) => {
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    // Use provided values or keep existing ones (partial update support)
    const newName = name || student.name;
    const newRollNumber = roll_number || student.roll_number;
    
    // Update basic student information
    db.run(
      "UPDATE students SET name = ?, roll_number = ? WHERE id = ?",
      [newName, newRollNumber, studentId],
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update student" });
        }
        
        // Handle marks update if provided (complete replacement strategy)
        if (marks) {
          // First, remove all existing marks for the student
          db.run("DELETE FROM marks WHERE student_id = ?", [studentId], () => {
            let processedMarks = 0; // Counter for async mark processing
            
            // Handle case where marks array is empty
            if (marks.length === 0) {
              return res.json({
                id: parseInt(studentId),
                name: newName,
                roll_number: newRollNumber,
                marks: [],
                total_obtained: 0,
                total_max: 0,
                percentage: 0,
                grade: 'F'
              });
            }
            
            // Add all new marks (same logic as POST endpoint)
            marks.forEach(mark => {
              // Ensure subject exists in subjects table
              db.run("INSERT OR IGNORE INTO subjects (name) VALUES (?)", [mark.subject], () => {
                // Get subject ID for foreign key reference
                db.get("SELECT id FROM subjects WHERE name = ?", [mark.subject], (err, subject) => {
                  if (subject) {
                    const maxMarks = mark.max_marks || 100;
                    
                    // Insert new mark record
                    db.run(
                      "INSERT INTO marks (student_id, subject_id, marks_obtained, max_marks) VALUES (?, ?, ?, ?)",
                      [studentId, subject.id, mark.marks_obtained, maxMarks],
                      () => {
                        processedMarks++;
                        
                        // When all marks are processed, calculate totals and respond
                        if (processedMarks === marks.length) {
                          // Calculate aggregate totals
                          let totalObtained = 0;
                          let totalMax = 0;
                          marks.forEach(m => {
                            totalObtained += m.marks_obtained;
                            totalMax += (m.max_marks || 100);
                          });
                          
                          // Calculate final percentage and grade
                          const percentage = calculatePercentage(totalObtained, totalMax);
                          const grade = calculateGrade(percentage);
                          
                          // Return updated student with calculated values
                          res.json({
                            id: parseInt(studentId),
                            name: newName,
                            roll_number: newRollNumber,
                            marks,
                            total_obtained: totalObtained,
                            total_max: totalMax,
                            percentage,
                            grade
                          });
                        }
                      }
                    );
                  }
                });
              });
            });
          });
        } else {
          // No marks update requested, return updated student info only
          res.json({
            id: parseInt(studentId),
            name: newName,
            roll_number: newRollNumber
          });
        }
      }
    );
  });
});

/**
 * DELETE /api/students/:id - Delete a student and all associated data
 * 
 * URL Parameters:
 * - id: Student ID to delete
 * 
 * Behavior:
 * - Deletes student record from students table
 * - Automatically cascades to delete associated marks (due to foreign key CASCADE)
 * - Does not delete subjects (they may be used by other students)
 * 
 * Response Codes:
 * - 200: Student deleted successfully
 * - 404: Student not found (no student with given ID)
 * - 500: Database error
 */
app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id; // Extract student ID from URL parameter
  
  // Execute DELETE query with parameterized query to prevent SQL injection
  db.run("DELETE FROM students WHERE id = ?", [studentId], function(err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete student" });
    }
    
    // Check if any rows were actually deleted
    // this.changes contains the number of rows affected by the query
    if (this.changes === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    // Successful deletion - return confirmation message
    res.json({ message: "Student deleted successfully" });
  });
});

/**
 * GET /api/subjects - Get list of all unique subjects
 * 
 * Returns an alphabetically sorted array of all subject names that have been
 * used in the system. Useful for dropdown lists and autocomplete features.
 * 
 * Response Format:
 * ["Chemistry", "English", "Math", "Physics"]
 * 
 * Response Codes:
 * - 200: Success with array of subject names (empty array if no subjects)
 * - 500: Database error
 */
app.get('/api/subjects', (req, res) => {
  // Query all subjects and sort alphabetically
  db.all("SELECT name FROM subjects ORDER BY name", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get subjects" });
    }
    
    // Transform database rows into simple array of subject names
    const subjects = rows.map(row => row.name);
    res.json(subjects);
  });
});

/**
 * Server Startup
 * Start the Express server on the specified port and log startup message
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST   /api/students     - Create new student with marks');
  console.log('  GET    /api/students     - Get all students with calculated grades');
  console.log('  PUT    /api/students/:id - Update student information and marks');
  console.log('  DELETE /api/students/:id - Delete student and associated marks');
  console.log('  GET    /api/subjects     - Get list of all subjects');
});
