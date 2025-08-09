# Node.js SQLite CRUD API

A simple RESTful API built with **Node.js**, **Express.js**, and **SQLite** for performing CRUD (Create, Read, Update, Delete) operations on a `posts` table.

---

## Features

- Create a new post
- Get all posts
- Get a single post by ID
- Update an existing post (with partial update support)
- Delete a post

---

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **Nodemon** (dev dependency) - Auto-restart server on file changes

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Initialize SQLite database

Make sure you have SQLite installed, then create the database and table:

```bash
sqlite3 database.db

-- Inside SQLite prompt:
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);
.exit
```

### 4. Run the server

#### Development mode (auto-restart):

```bash
npx nodemon index.js
```

#### Production mode:

```bash
node index.js
```

---

## API Endpoints

### **1. Create Post**

**POST** `/posts`

**Request Body:**

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

**Response:**

```json
{
  "message": "Post created successfully",
  "postId": 1
}
```

---

### **2. Get All Posts**

**GET** `/posts`

**Response:**

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first post."
  }
]
```

---

### **3. Get Post by ID**

**GET** `/posts/:id`

**Example:**
`/posts/1`

**Response:**

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

---

### **4. Update Post (Partial Update Supported)**

**PUT** `/posts/:id`

**Request Body (Only send fields you want to update):**

```json
{
  "title": "Updated Post Title"
}
```

If a field is not sent, its previous value is retained.

**Response:**

```json
{
  "message": "Post updated successfully"
}
```

---

### **5. Delete Post**

**DELETE** `/posts/:id`

**Example:**
`/posts/1`

**Response:**

```json
{
  "message": "Post deleted successfully"
}
```

---

## Notes

- Make sure `database.db` file exists and `posts` table is created before running the API.
- Update operation keeps old values if new values are not provided.
- For testing, you can use **Postman** or **cURL** or **ThunderClient(VS CODE extension)**.

---
