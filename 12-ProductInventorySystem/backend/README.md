# Product Inventory System

A simple Node.js REST API to manage products—perfect for learning back-end basics!

## Prerequisites

Before starting, make sure you have:

1. **Node.js (v18 or above)**  
   Download and install from the official Node.js site.

2. **npm** (Node Package Manager)  
   npm comes automatically with Node.js.

**Verify installation:**

```bash
node --version
npm --version
```

Your terminal should print versions for both commands.

## Project Setup

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/product-inventory-system.git
cd product-inventory-system
```

> Replace `your-username` with your GitHub username if you fork or own the repo.

### 2. Install Dependencies

Install backend dependencies using npm:

```bash
npm install
```

### 3. Start the Server

To launch the server, run:

```bash
npm start
```

You should see:

```
Server running on http://localhost:3000
```

The server is now live and ready to accept API requests!

## API Overview: CRUD Endpoints

This API supports the standard CRUD (Create, Read, Update, Delete) operations for "products."  
All endpoints are based at: `http://localhost:3000`

| Operation | HTTP Method | Endpoint        | Purpose                    |
| --------- | :---------: | --------------- | -------------------------- |
| Create    |    POST     | `/products`     | Add a new product          |
| Read All  |     GET     | `/products`     | List all products          |
| Read One  |     GET     | `/products/:id` | Get details of one product |
| Update    |     PUT     | `/products/:id` | Modify an existing product |
| Delete    |   DELETE    | `/products/:id` | Remove a product           |

## Example Requests & Responses

**You can use `curl` commands, Postman, or Insomnia to interact with the API.**

### 1. Create a Product

**Endpoint:**  
`POST http://localhost:3000/products`

**Headers:**  
`Content-Type: application/json`

**Example Request Body:**

```json
{
  "name": "Widget",
  "quantity": 10,
  "price": 9.99,
  "description": "A useful widget."
}
```

**Success Response (`201 Created`):**

```json
{
  "id": 1
}
```

> **Note:** The `id` is auto-generated and unique for each product.

### 2. List All Products

**Endpoint:**  
`GET http://localhost:3000/products`

**Success Response (`200 OK`):**

```json
[
  {
    "id": 1,
    "name": "Widget",
    "quantity": 10,
    "price": 9.99,
    "description": "A useful widget."
  },
  {
    "id": 2,
    "name": "Gadget",
    "quantity": 5,
    "price": 19.99,
    "description": "An advanced gadget."
  }
]
```

### 3. Get a Single Product by ID

**Endpoint:**  
`GET http://localhost:3000/products/1`

**Success Response (`200 OK`):**

```json
{
  "id": 1,
  "name": "Widget",
  "quantity": 10,
  "price": 9.99,
  "description": "A useful widget."
}
```

**If the Product is Not Found (`404 Not Found`):**

```json
{
  "error": "Product not found"
}
```

### 4. Update a Product

**Endpoint:**  
`PUT http://localhost:3000/products/1`

**Headers:**  
`Content-Type: application/json`

**Example Request Body:**

```json
{
  "name": "Widget",
  "quantity": 15,
  "price": 9.99,
  "description": "Updated description."
}
```

**Success Response (`200 OK`):**

```json
{
  "changes": 1
}
```

> **Note:** `changes: 1` means the product was updated.

### 5. Delete a Product

**Endpoint:**  
`DELETE http://localhost:3000/products/1`

**Success Response (`200 OK`):**

```json
{
  "deleted": 1
}
```

> **Note:** `deleted: 1` means one product was removed.

## Troubleshooting

- **Port Already in Use:**  
  If you see `EADDRINUSE` error, it means another app is already using port 3000.

  - Stop that app, or
  - Change the port in your project’s main file (often `index.js` or `server.js`).

- **Resetting Data:**

  - Stop the server.
  - Delete the `inventory.db` file in the project root.
  - Restart the server with `npm start`.

- **Automatic Restart During Development:**  
  To enable auto-reloading (server restarts when code changes):

  ```bash
  npm install --save-dev nodemon
  ```

  Add this to your `package.json` under `"scripts"`:

  ```json
  "dev": "nodemon index.js"
  ```

  Then run:

  ```bash
  npm run dev
  ```

## Further Tips

- Explore the API using Thunderclient(VS code extension) or Postman/Insomnia for a visual interface.
- Build a simple frontend or connect to a database for more advanced features.
- Read the source code comments to understand each function's job.

## You're Ready! 🎉

Now you’re ready to build, extend, or integrate this simple product inventory system into larger projects.  
**Happy coding!**
