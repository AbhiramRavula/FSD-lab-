/**
 * App.jsx
 * High-level React frontend for Student Result Management System.
 * - Simple hooks only: useState, useEffect
 * - Clear inline comments to help beginners follow the flow
 * - Uses api.js (fetch-based) for all backend calls
 */

import { useEffect, useState } from 'react';
import './App.css';
import {
  getStudents,
  getSubjects,
  addStudent,
  updateStudent,
  deleteStudent,
  addSubject
} from './api';

export default function App() {
  // application state
  const [students, setStudents] = useState([]);     // all students from backend
  const [subjects, setSubjects] = useState([]);     // available subjects
  const [form, setForm] = useState({                // add/edit form state
    name: '',
    roll_number: '',
    marks: {}           // object: { [subject]: value }
  });
  const [editing, setEditing] = useState(null);     // id when editing
  const [showStudents, setShowStudents] = useState(false);
  const [newSubject, setNewSubject] = useState(''); // for adding subject
  const [loading, setLoading] = useState(false);    // simple loader flag

  // load students & subjects on mount
  useEffect(() => { loadAll(); }, []);

  // load helper
  async function loadAll() {
    setLoading(true);
    try {
      const [s, sub] = await Promise.all([getStudents(), getSubjects()]);
      setStudents(s || []);
      setSubjects(sub || []);
    } catch (err) {
      alert('Failed to load data: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  // Convert form.marks + subjects list -> API marks array
  function buildMarksArray() {
    return subjects
      .map(sub => ({
        subject: sub,
        marks_obtained: Number(form.marks?.[sub] || 0),
        max_marks: 100
      }))
      // send only subjects where student has entered > 0 marks
      .filter(m => m.marks_obtained > 0);
  }

  // Save (create or update)
  async function save() {
    // basic validation
    if (!form.name.trim()) return alert('Please enter student name.');
    if (!form.roll_number.trim()) return alert('Please enter roll number.');

    const marks = buildMarksArray();
    if (marks.length === 0) {
      // confirm, because student may want to save without marks
      if (!confirm('No marks entered. Do you want to continue?')) return;
    }

    setLoading(true);
    try {
      if (editing) {
        await updateStudent(editing, { ...form, marks });
        setEditing(null);
      } else {
        await addStudent({ ...form, marks });
      }
      setForm({ name: '', roll_number: '', marks: {} });
      await loadAll();
      setShowStudents(true);
    } catch (err) {
      alert('Save failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  // populate form for editing
  function startEdit(student) {
    setEditing(student.id);
    const marksObj = {};
    (student.marks || []).forEach(m => (marksObj[m.subject] = m.marks_obtained));
    setForm({ name: student.name, roll_number: student.roll_number, marks: marksObj });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // delete student
  async function removeStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    setLoading(true);
    try {
      await deleteStudent(id);
      await loadAll();
    } catch (err) {
      alert('Delete failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  // Add a new subject (calls backend if supported; otherwise reloads)
  async function handleAddSubject() {
    const name = newSubject.trim();
    if (!name) return;
    setLoading(true);
    try {
      await addSubject(name).catch(() => { }); // tolerate backend not supporting POST /subjects
      setNewSubject('');
      await loadAll();
    } catch (err) {
      alert('Adding subject failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  // Compute totals locally if backend didn't precompute
  function computeTotals(student) {
    if (student.total_obtained != null && student.total_max != null && student.percentage != null) {
      return {
        obtained: student.total_obtained,
        max: student.total_max,
        percentage: student.percentage,
        grade: student.grade
      };
    }
    const m = student.marks || [];
    const obtained = m.reduce((acc, it) => acc + Number(it.marks_obtained || 0), 0);
    const max = m.reduce((acc, it) => acc + Number(it.max_marks || 100), 0) || (subjects.length * 100);
    const percentage = max ? Math.round((obtained / max) * 100) : 0;
    const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';
    return { obtained, max, percentage, grade };
  }

  // tiny helper to update form marks value
  function setMark(subject, val) {
    setForm(f => ({ ...f, marks: { ...(f.marks || {}), [subject]: val } }));
  }

  return (
    <div className="container">
      <h1>Student Result Management</h1>

      <div className="form-box">
        <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>

        <input
          placeholder="Student name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Roll number"
          value={form.roll_number}
          onChange={e => setForm({ ...form, roll_number: e.target.value })}
        />

        <div className="subjects-row">
          {subjects.map(sub => (
            <input
              key={sub}
              type="number"
              min="0"
              max="100"
              placeholder={`${sub} marks`}
              value={form.marks?.[sub] ?? ''}
              onChange={e => setMark(sub, e.target.value)}
            />
          ))}
        </div>

        <div className="subject-add">
          <input
            placeholder="Add new subject"
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
          />
          <button className="small" onClick={handleAddSubject}>Add Subject</button>
        </div>

        <div className="actions">
          <button onClick={save} disabled={loading}>{editing ? 'Update' : 'Add'}</button>
          {editing && <button className="secondary" onClick={() => { setEditing(null); setForm({ name: '', roll_number: '', marks: {} }); }}>Cancel</button>}
          <button className="secondary" onClick={() => setShowStudents(s => !s)}>{showStudents ? 'Hide Students' : 'View Students'}</button>
        </div>
      </div>

      {showStudents && (
        <div>
          <h2>Students ({students.length})</h2>
          {students.length === 0 ? <p>No students found. Add one above.</p> : (
            <table>
              <thead>
                <tr>
                  <th>Roll</th>
                  <th>Name</th>
                  <th>Marks</th>
                  <th>Total</th>
                  <th>%</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => {
                  const t = computeTotals(s);
                  return (
                    <tr key={s.id}>
                      <td>{s.roll_number}</td>
                      <td>{s.name}</td>
                      <td>
                        {(s.marks || []).map(m => <div key={m.subject}>{m.subject}: {m.marks_obtained}</div>)}
                      </td>
                      <td>{t.obtained}/{t.max}</td>
                      <td>{t.percentage}%</td>
                      <td>{s.grade || t.grade}</td>
                      <td>
                        <button className="warn" onClick={() => startEdit(s)}>Edit</button>
                        <button className="danger" onClick={() => removeStudent(s.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* small loading indicator */}
      {loading && <div className="loading">Loading…</div>}
    </div>
  );
}
