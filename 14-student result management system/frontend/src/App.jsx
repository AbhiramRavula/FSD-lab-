/**
 * Student Result Management App - Main Component
 * 
 * This is the main React component that handles all student and result management.
 * Features:
 * - Add new students with marks for different subjects
 * - Edit existing student information and marks
 * - Delete students from the system
 * - View all students with calculated grades and percentages
 * - Dynamic subject loading from backend
 * 
 * Uses all 5 backend APIs for complete CRUD operations
 */

import { useState, useEffect } from 'react'
import './App.css'
import { getStudents, getSubjects, addStudent, updateStudent, deleteStudent as delStudent } from './api'

function App() {
  // State variables for managing application data
  const [students, setStudents] = useState([])        // Array of all students from backend
  const [subjects, setSubjects] = useState([])        // Array of available subjects from backend
  const [form, setForm] = useState({ name: '', roll_number: '', marks: {} })  // Form data for add/edit
  const [editing, setEditing] = useState(null)        // ID of student being edited (null = add mode)
  const [showStudents, setShowStudents] = useState(false)  // Toggle for showing/hiding student list

  // Load initial data when component mounts
  useEffect(() => {
    getStudents().then(setStudents)    // Load all students from backend
    getSubjects().then(setSubjects)    // Load all subjects from backend
  }, [])

  /**
   * Save student data - handles both add and edit operations
   * Converts form data to API format and sends to backend
   */
  const save = async () => {
    // Convert form marks to API format (only non-zero marks)
    const marks = subjects.map(s => ({ 
      subject: s, 
      marks_obtained: +form.marks[s] || 0, 
      max_marks: 100 
    })).filter(m => m.marks_obtained > 0)
    
    // Call appropriate API based on mode (edit vs add)
    if (editing) {
      await updateStudent(editing, { ...form, marks })  // Update existing student
    } else {
      await addStudent({ ...form, marks })              // Add new student
    }
    
    // Reset form and refresh data
    setForm({ name: '', roll_number: '', marks: {} })
    setEditing(null)
    getStudents().then(setStudents)  // Refresh student list
  }

  /**
   * Delete student from system
   * @param {number} id - Student ID to delete
   */
  const deleteStudentHandler = async (id) => {
    await delStudent(id)             // Call delete API
    getStudents().then(setStudents)  // Refresh student list
  }

  /**
   * Switch to edit mode for a specific student
   * Populates form with existing student data
   * @param {Object} s - Student object to edit
   */
  const edit = (s) => {
    setEditing(s.id)  // Set editing mode
    // Convert student marks to form format
    const marks = {}
    s.marks.forEach(m => marks[m.subject] = m.marks_obtained)
    setForm({ name: s.name, roll_number: s.roll_number, marks })
  }

  // Render the main application UI
  return (
    <div>
      {/* Main application title */}
      <h1>Student Result Management App</h1>
      
      {/* Student Add/Edit Form Section */}
      <div>
        <h2>{editing ? 'Edit' : 'Add'} Student</h2>
        
        {/* Basic student information inputs */}
        <input placeholder="Name" value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Roll Number" value={form.roll_number} 
          onChange={e => setForm({...form, roll_number: e.target.value})} />
        
        {/* Dynamic subject mark inputs - generated from backend subjects */}
        {subjects.map(subject => (
          <input key={subject} type="number" placeholder={subject} 
            value={form.marks[subject] || ''} 
            onChange={e => setForm({...form, marks: {...form.marks, [subject]: e.target.value}})} />
        ))}
        
        {/* Action buttons */}
        <button onClick={save}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button onClick={() => {setEditing(null); setForm({ name: '', roll_number: '', marks: {} })}}>Cancel</button>}
        <button onClick={() => setShowStudents(!showStudents)}>{showStudents ? 'Hide Students' : 'View All Students'}</button>
      </div>

      {/* Students List Table - Only shown when showStudents is true */}
      {showStudents && (
        <div>
          <h2>Students ({students.length})</h2>
          <table>
            {/* Table header */}
            <tr><th>Roll</th><th>Name</th><th>Marks</th><th>Total</th><th>%</th><th>Grade</th><th>Actions</th></tr>
            {/* Student data rows - each student from backend with calculated results */}
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.roll_number}</td>
                <td>{s.name}</td>
                <td>{s.marks.map(m => <div key={m.subject}>{m.subject}: {m.marks_obtained}</div>)}</td>
                <td>{s.total_obtained}/{s.total_max}</td>
                <td>{s.percentage}%</td>
                <td>{s.grade}</td>
                <td>
                  <button onClick={() => edit(s)}>Edit</button>
                  <button onClick={() => deleteStudentHandler(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default App
