/**
 * api.js
 * High-level, robust fetch helpers for the Student Result Management System.
 * - Uses native fetch
 * - Handles non-JSON responses and HTTP errors gracefully
 * - All functions return a Promise that resolves to parsed JSON (or null for empty)
 */

const BASE = "http://localhost:5000/api";

// parse and handle HTTP response
async function handleResponse(res) {
  if (!res.ok) {
    // try to extract backend error message, fallback to status
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `HTTP ${res.status}`);
  }
  // 204 No Content → return null
  if (res.status === 204) return null;
  // try parse JSON, if empty return null
  const txt = await res.text().catch(() => "");
  return txt ? JSON.parse(txt) : null;
}

/** GET /students -> [students] */
export async function getStudents() {
  const res = await fetch(`${BASE}/students`);
  return handleResponse(res);
}

/** GET /subjects -> [subjects] */
export async function getSubjects() {
  const res = await fetch(`${BASE}/subjects`);
  return handleResponse(res);
}

/**
 * POST /students
 * data: { name, roll_number, marks: [{ subject, marks_obtained, max_marks }] }
 */
export async function addStudent(data) {
  const res = await fetch(`${BASE}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

/**
 * PUT /students/:id
 * id: number or string
 * data: same shape as addStudent
 */
export async function updateStudent(id, data) {
  const res = await fetch(`${BASE}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

/** DELETE /students/:id */
export async function deleteStudent(id) {
  const res = await fetch(`${BASE}/students/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

/**
 * Optional: POST /subjects (if backend supports adding subjects)
 * body: { name: 'New Subject' }
 * If backend doesn't support it, this will throw / be ignored when used — UI falls back to reloading subjects.
 */
export async function addSubject(name) {
  const res = await fetch(`${BASE}/subjects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return handleResponse(res);
}
