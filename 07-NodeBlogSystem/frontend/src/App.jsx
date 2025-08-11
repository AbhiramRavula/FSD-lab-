import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  })
  const [editingBlog, setEditingBlog] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const API_BASE_URL = 'http://localhost:3000'

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/blogs`)
      setBlogs(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch blogs. Make sure the backend server is running on port 3000.')
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  // Add new blog
  const addBlog = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setError('All fields are required')
      return
    }
    
    try {
      await axios.post(`${API_BASE_URL}/blogs`, formData)
      setFormData({ title: '', content: '', author: '' })
      setSuccess('Blog post created successfully!')
      fetchBlogs()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to create blog post')
      console.error('Error creating blog:', err)
    }
  }

  // Update blog
  const updateBlog = async (e) => {
    e.preventDefault()
    if (!editingBlog) return
    
    try {
      await axios.put(`${API_BASE_URL}/blogs/${editingBlog.id}`, {
        title: editingBlog.title,
        content: editingBlog.content,
        author: editingBlog.author
      })
      setShowEditModal(false)
      setEditingBlog(null)
      setSuccess('Blog post updated successfully!')
      fetchBlogs()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to update blog post')
      console.error('Error updating blog:', err)
    }
  }

  // Delete blog
  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`)
      setSuccess('Blog post deleted successfully!')
      fetchBlogs()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to delete blog post')
      console.error('Error deleting blog:', err)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    if (editingBlog) {
      setEditingBlog({
        ...editingBlog,
        [name]: value
      })
    }
  }

  // Open edit modal
  const openEditModal = (blog) => {
    setEditingBlog(blog)
    setShowEditModal(true)
  }

  // Open view modal
  const openViewModal = (blog) => {
    setSelectedBlog(blog)
    setShowViewModal(true)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className="app">
      <header className="header">
        <h1>✍️ My Blog System</h1>
        <p>Share your thoughts with the world</p>
      </header>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {/* Create Blog Form */}
      <div className="section">
        <h2>📝 Write a New Blog Post</h2>
        <form onSubmit={addBlog} className="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter an engaging title..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              rows={8}
              required
            />
          </div>
          <button type="submit" className="btn primary">📤 Publish Blog Post</button>
        </form>
      </div>

      {/* Blog Posts List */}
      <div className="section">
        <div className="section-header">
          <h2>📚 All Blog Posts ({blogs.length} posts)</h2>
          <button onClick={fetchBlogs} className="btn secondary">🔄 Refresh</button>
        </div>
        
        {loading ? (
          <div className="loading">Loading blog posts...</div>
        ) : (
          <div className="blogs-grid">
            {blogs.length === 0 ? (
              <div className="no-blogs">
                <p>📄 No blog posts yet</p>
                <p>Write your first blog post above to get started!</p>
              </div>
            ) : (
              blogs.map(blog => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-header">
                    <h3 onClick={() => openViewModal(blog)}>{blog.title}</h3>
                    <span className="date">{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="blog-meta">
                    <span className="author">👤 {blog.author}</span>
                  </div>
                  <div className="blog-content">
                    <p>{truncateText(blog.content, 150)}</p>
                  </div>
                  <div className="blog-actions">
                    <button 
                      onClick={() => openViewModal(blog)} 
                      className="btn view"
                    >
                      👁️ Read More
                    </button>
                    <button 
                      onClick={() => openEditModal(blog)} 
                      className="btn edit"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deleteBlog(blog.id)} 
                      className="btn delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* View Blog Modal */}
      {showViewModal && selectedBlog && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3>👁️ {selectedBlog.title}</h3>
              <button 
                onClick={() => setShowViewModal(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="blog-meta-full">
                <span className="author">👤 By {selectedBlog.author}</span>
                <span className="date">📅 {formatDate(selectedBlog.created_at)}</span>
              </div>
              <div className="blog-content-full">
                <p>{selectedBlog.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && editingBlog && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>✏️ Edit Blog Post</h3>
              <button 
                onClick={() => setShowEditModal(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>
            <form onSubmit={updateBlog} className="form">
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={editingBlog.title}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-author">Author</label>
                <input
                  type="text"
                  id="edit-author"
                  name="author"
                  value={editingBlog.author}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-content">Content</label>
                <textarea
                  id="edit-content"
                  name="content"
                  value={editingBlog.content}
                  onChange={handleEditInputChange}
                  rows={8}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn primary">💾 Update Blog Post</button>
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)} 
                  className="btn secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
