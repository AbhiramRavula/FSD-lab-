# Product Inventory System - Frontend

This is a React-based frontend for the Product Inventory Management System. It provides a modern, responsive UI for managing products with full CRUD operations.

## Features

- ✅ **Add Products**: Create new products with name, quantity, price, and description
- ✅ **View Products**: Display all products in a responsive grid layout
- ✅ **Edit Products**: Update existing product information via modal
- ✅ **Delete Products**: Remove products with confirmation
- ✅ **Real-time Updates**: Automatic refresh after operations
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Modern UI**: Clean design with animations and gradients

## Tech Stack

- **React** (with JavaScript)
- **Axios** for HTTP requests
- **CSS3** with modern styling
- **Responsive Grid Layout**

## Prerequisites

Make sure you have:
- Node.js installed
- The backend server running on `http://localhost:3000`

## Running the Application

### Start the Backend (Required First!)
```bash
# Navigate to the parent directory
cd ..

# Start the backend server
npm start
```
The backend will run on `http://localhost:3000`

### Start the Frontend
```bash
# In this directory (frontend)
npm start
```
The React app will run on `http://localhost:3001` (or next available port)

## Usage

1. **Adding Products**: Fill out the form at the top and click "Add Product"
2. **Viewing Products**: All products are displayed in cards below the form
3. **Editing Products**: Click the "Edit" button on any product card
4. **Deleting Products**: Click the "Delete" button and confirm the action
5. **Refreshing**: Use the "Refresh" button to reload products

## API Integration

The frontend communicates with the backend API at `http://localhost:3000`:

- `GET /products` - Fetch all products
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Troubleshooting

1. **CORS Errors**: Make sure the backend has CORS enabled (already configured)
2. **Connection Refused**: Ensure the backend is running on port 3000
3. **Port Issues**: React dev server will automatically use next available port
4. **Axios Errors**: Check browser console for detailed error messages

## Development Notes

- The app uses plain JavaScript React (no TypeScript)
- All forms have validation and error handling
- Success and error messages auto-dismiss after a few seconds
- The UI is fully responsive and works on all device sizes
- Animations and hover effects enhance user experience
