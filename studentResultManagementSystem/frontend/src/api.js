/**
 * API Module - Backend Communication Functions
 * 
 * This module contains all the functions needed to communicate with the backend API.
 * Handles all CRUD operations for the Student Result Management System.
 * 
 * Backend Server: http://localhost:5000
 * All functions return Promises that resolve to JSON data from the backend.
 */

// Base URL for all API endpoints
const API = 'http://localhost:5000/api'

/**
 * GET all students with their marks, grades, and calculated results
 * @returns {Promise<Array>} Array of student objects with complete information
 */
export const getStudents = () => fetch(`${API}/students`).then(r => r.json())

/**
 * GET all available subjects from the backend
 * @returns {Promise<Array>} Array of subject names
 */
export const getSubjects = () => fetch(`${API}/subjects`).then(r => r.json())

/**
 * POST - Create a new student with marks
 * @param {Object} data - Student data {name, roll_number, marks: [{subject, marks_obtained, max_marks}]}
 * @returns {Promise<Object>} Created student object with calculated grade
 */
export const addStudent = (data) => fetch(`${API}/students`, {
  method: 'POST', 
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify(data)
})

/**
 * PUT - Update existing student information and marks
 * @param {number} id - Student ID to update
 * @param {Object} data - Updated student data
 * @returns {Promise<Object>} Updated student object with recalculated grade
 */
export const updateStudent = (id, data) => fetch(`${API}/students/${id}`, {
  method: 'PUT', 
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify(data)
})

/**
 * DELETE - Remove a student from the system
 * @param {number} id - Student ID to delete
 * @returns {Promise<Object>} Success message from backend
 */
export const deleteStudent = (id) => fetch(`${API}/students/${id}`, {method: 'DELETE'})

/*
 * Usage Examples:
 * import { getStudents, addStudent, updateStudent, deleteStudent, getSubjects } from './api'
 * 
 * // Get all students: const students = await getStudents()
 * // Add student: await addStudent({name: 'John', roll_number: '123', marks: [...]})
 * // Update student: await updateStudent(1, {name: 'John Updated'})
 * // Delete student: await deleteStudent(1)
 * // Get subjects: const subjects = await getSubjects()
 */
