📌 Simple Node.js + SQLite CRUD API
This is a basic Node.js + Express application using SQLite for data storage.It demonstrates CRUD (Create, Read, Update, Delete) operations on a posts table.

🚀 Features

Create a post
Get all posts
Get a post by ID
Update a post
Delete a post
SQLite database for persistent storage

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone <your-repo-url>
cd <project-folder>

2️⃣ Initialize the project
npm init -y

3️⃣ Install dependencies
npm install express sqlite3

4️⃣ (Optional) Install Nodemon for development
npm install --save-dev nodemon

▶️ Running the Application
Using Node
node index.js

Using Nodemon (auto-restart on changes)
npx nodemon index.js

Server will start at:
http://localhost:3000

📂 API Endpoints
1️⃣ Create a Post
POST /postsBody (JSON):
{
"title": "My First Post",
"content": "This is the content of my post."
}

Response:
{ "message": "Post created successfully" }

2️⃣ Get All Posts
GET /postsResponse:
[{ "id": 1, "title": "My First Post", "content": "This is the content" }]

3️⃣ Get a Post by ID
GET /posts/:idExample: /posts/1Response:
{ "id": 1, "title": "My First Post", "content": "This is the content" }

4️⃣ Update a Post
PUT /posts/:idBody (JSON) – Only include fields you want to update:
{
"title": "Updated Title"
}

If a field is not provided, the previous value will be kept.Response:
{ "message": "Post updated successfully" }

5️⃣ Delete a Post
DELETE /posts/:idResponse:
{ "message": "Post deleted successfully" }

📌 Notes

If a field is missing during update, it will retain the existing value.
Make sure SQLite database file (database.db) is writable in your project folder.
