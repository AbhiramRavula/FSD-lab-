# Student Management System - Setup Guide

## Prerequisites
- Node.js 14.0.0+ (Download: https://nodejs.org/)
- Code editor (VS Code recommended)

## Project Structure
```
LAB_FSD/
├── frontend/                    # React Application
│   ├── src/
│   │   ├── App.jsx             # Main component
│   │   ├── api.js              # API integration
│   │   └── App.css             # Styles
│   └── package.json
└── backend/                     # Node.js API
    ├── server.js               # Express server
    ├── db.js                   # Database setup
    ├── gradeHelper.js          # Grade calculations
    └── package.json
```

## Backend Setup
1. **Navigate to backend directory:**
   ```bash
   cd [YOUR_PROJECT_PATH]/LAB_FSD/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

## Frontend Setup
1. **Navigate to frontend directory:**
   ```bash
   cd [YOUR_PROJECT_PATH]/LAB_FSD/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   Application opens at http://localhost:3000

## Running the Application
**Terminal 1 (Backend):**
```bash
cd [YOUR_PROJECT_PATH]/LAB_FSD/backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd [YOUR_PROJECT_PATH]/LAB_FSD/frontend
npm start
```

**Replace `[YOUR_PROJECT_PATH]` with your actual project location**

## Features
- Add, edit, delete students
- Manage marks for multiple subjects
- Automatic grade calculation (A-F)
- Responsive web interface

## API Endpoints
- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/subjects` - Get all subjects

## Grade Scale
- A: 90-100% (Excellent)
- B: 80-89% (Good)
- C: 70-79% (Satisfactory)
- D: 60-69% (Pass)
- F: Below 60% (Fail)

## Common Issues
1. **"node: command not found"**
   - Install Node.js from https://nodejs.org/
   - Restart terminal

2. **"EADDRINUSE: address already in use"**
   - Kill process on port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <ProcessID> /F
   ```

3. **"Cannot GET /api/students"**
   - Ensure backend is running on port 5000
   - Run `npm run dev` in backend directory

4. **"Failed to fetch" in frontend**
   - Verify both servers are running
   - Check API_BASE_URL in frontend/src/api.js

5. **"Module not found" errors**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

## Tech Stack
- **Frontend:** React 18, CSS3, Vite
- **Backend:** Node.js, Express.js, SQLite3
- **Database:** SQLite with normalized schema

## Development
- Backend uses Nodemon for auto-restart
- Frontend has hot reload enabled
- SQLite database auto-creates on first run

For detailed project information, see REPORT.md
