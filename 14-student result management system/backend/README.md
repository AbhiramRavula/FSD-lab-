# Student Management System - Backend

A RESTful API server for managing student records, marks, and grades using Node.js, Express, and SQLite.

## 🚀 Features

- **Student CRUD** - Create, read, update, delete students
- **Automatic Grade Calculation** - Percentage and letter grades
- **Subject Management** - Normalized subject data
- **SQLite Database** - Persistent and reliable storage
- **RESTful API** - Proper HTTP status codes and methods

## 📁 Project Structure

```
backend/
├── server.js          # Express server with API routes
├── db.js             # Database setup and schema
├── gradeHelper.js    # Grade calculation utilities
├── package.json      # Dependencies and scripts
└── students.db       # SQLite database file
```

## 📋 Key Files

- **server.js**: Main application server with API endpoints
- **db.js**: Database configuration and schema initialization
- **gradeHelper.js**: Grade and percentage calculation logic

## 🛠️ Technology Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **SQLite3**: Database driver
- **CORS**: Cross-origin middleware

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

- **POST /api/students** - Create student
- **GET /api/students** - Get all students
- **PUT /api/students/:id** - Update student
- **DELETE /api/students/:id** - Delete student
- **GET /api/subjects** - Get all subjects

## 📦 Dependencies

- **express**: ^4.18.2
- **cors**: ^2.8.5
- **sqlite3**: ^5.1.6
- **nodemon**: ^3.0.1 (dev)

Server runs on `http://localhost:5000`.
