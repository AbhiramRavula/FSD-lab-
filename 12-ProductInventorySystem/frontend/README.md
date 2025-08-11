# Product Inventory System Frontend (Vite Version)

A simple and clean Product Inventory Management System built with Vite, React, and CSS.

## Features

- ➕ Add new products
- 📦 View all products in a responsive grid
- ✏️ Edit existing products
- 🗑️ Delete products
- 🔄 Refresh product list
- 📱 Mobile-responsive design
- 🎨 Clean and attractive UI with gradients and animations

## Technology Stack

- **Vite** - Fast build tool and development server
- **React** - JavaScript library for building user interfaces
- **Axios** - HTTP client for API requests
- **CSS** - Pure CSS for styling (no frameworks)

## Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:3000`

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The application connects to the following backend endpoints:
- `GET /products` - Fetch all products
- `POST /products` - Add a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Project Structure

```
frontend2/
├── src/
│   ├── App.jsx      # Main application component
│   ├── App.css      # Application styles
│   ├── index.css    # Base styles
│   └── main.jsx     # Application entry point
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## Usage

1. **Adding Products**: Fill out the form at the top and click "Add Product"
2. **Viewing Products**: All products are displayed in cards below the form
3. **Editing Products**: Click the "Edit" button on any product card
4. **Deleting Products**: Click the "Delete" button and confirm the action
5. **Refreshing**: Click the "Refresh" button to reload products from the server

## Styling Features

- Modern gradient background
- Glass morphism effect on cards
- Smooth animations and hover effects
- Responsive grid layout
- Mobile-first design approach
- Clean typography and spacing

## Development

This project was created for educational purposes as a simple lab exercise focusing on:
- Basic CRUD operations
- API integration with Axios
- Component state management
- Form handling
- CSS styling without frameworks

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
