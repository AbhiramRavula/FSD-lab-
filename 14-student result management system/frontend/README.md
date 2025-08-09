# Student Management System - Frontend

A modern React web application for managing student records with automatic grade calculations.

## 🚀 Features

- **Student CRUD Operations** - Add, edit, delete, and view students
- **Automatic Grade Calculation** - Real-time percentage and letter grades
- **Dynamic Mark Entry** - Add/remove subjects dynamically
- **Responsive Design** - Works on desktop and mobile
- **Modern UI** - Clean, professional interface

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                # Main component with all logic
│   ├── App.css                # Styles
│   ├── api.js                 # Backend API calls
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 📋 Key Files

- **App.jsx**: Main application component with complete CRUD operations
- **api.js**: Backend API integration functions
- **App.css**: Styling with responsive design
- **main.jsx**: Application entry point

## 🛠️ Technology Stack

- **React 18**: UI framework with hooks
- **JavaScript ES6+**: Modern JavaScript
- **CSS3**: Responsive styling
- **Fetch API**: HTTP requests

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 API Integration

Connects to backend at `http://localhost:5000`:
- GET /api/students - Fetch all students
- POST /api/students - Create student
- PUT /api/students/:id - Update student
- DELETE /api/students/:id - Delete student

## 📦 Dependencies

- **react** (^18.2.0): Core React library
- **react-dom** (^18.2.0): DOM rendering
- **react-scripts** (5.0.1): Build tools

Runs on `http://localhost:3000` with hot reloading and automatic refresh.
