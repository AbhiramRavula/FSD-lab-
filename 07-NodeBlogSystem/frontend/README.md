# Blog System Frontend

A beautiful and intuitive blog management system built with Vite, React, and CSS. Create, read, update, and delete blog posts with ease!

## Features

- ✍️ **Write Blog Posts** - Create engaging blog posts with title, author, and content
- 📚 **View All Posts** - Browse all blog posts in a beautiful card layout
- 👁️ **Read Full Posts** - Click to read complete blog posts in a modal
- ✏️ **Edit Posts** - Update existing blog posts easily
- 🗑️ **Delete Posts** - Remove posts with confirmation
- 🔄 **Refresh** - Reload posts from the server
- 📱 **Mobile Responsive** - Works great on all devices
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations

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
- `GET /blogs` - Fetch all blog posts
- `POST /blogs` - Create a new blog post
- `PUT /blogs/:id` - Update a blog post
- `DELETE /blogs/:id` - Delete a blog post
- `GET /blogs/:id` - Get a specific blog post

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx      # Main application component
│   ├── App.css      # Application styles
│   ├── index.css    # Base styles
│   └── main.jsx     # Application entry point
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## Usage

### Creating a Blog Post
1. Fill out the form at the top with:
   - **Title**: An engaging title for your post
   - **Author**: Your name
   - **Content**: The main content of your blog post
2. Click "📤 Publish Blog Post"

### Reading Blog Posts
- All posts are displayed in cards below the form
- Click on the title or "👁️ Read More" to view the full post
- Posts are sorted by creation date (newest first)

### Editing Blog Posts
1. Click "✏️ Edit" on any blog card
2. Update the fields in the modal
3. Click "💾 Update Blog Post"

### Deleting Blog Posts
1. Click "🗑️ Delete" on any blog card
2. Confirm the deletion in the popup

## Styling Features

- **Modern Design**: Beautiful gradient backgrounds and glass effects
- **Smooth Animations**: Hover effects and modal transitions
- **Responsive Layout**: Grid system that adapts to screen size
- **Typography**: Clean, readable fonts with proper spacing
- **Color Scheme**: Professional purple-blue gradient theme
- **Interactive Elements**: Buttons with hover and active states

## Blog Post Structure

Each blog post contains:
- `id` - Unique identifier
- `title` - Post title
- `content` - Main content
- `author` - Author name
- `created_at` - Timestamp of creation

## Development

This project was created for educational purposes focusing on:
- React functional components and hooks
- State management with useState and useEffect
- API integration with Axios
- Form handling and validation
- Modal implementations
- Responsive CSS design
- CRUD operations

## Browser Support

This application works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
