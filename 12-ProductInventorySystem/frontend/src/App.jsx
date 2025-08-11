import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    description: ''
  })
  const [editingProduct, setEditingProduct] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const API_BASE_URL = 'http://localhost:3000'

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/products`)
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend server is running on port 3000.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Add new product
  const addProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE_URL}/products`, formData)
      setFormData({ name: '', quantity: 0, price: 0, description: '' })
      setSuccess('Product added successfully!')
      fetchProducts()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to add product')
      console.error('Error adding product:', err)
    }
  }

  // Update product
  const updateProduct = async (e) => {
    e.preventDefault()
    if (!editingProduct) return
    
    try {
      await axios.put(`${API_BASE_URL}/products/${editingProduct.id}`, {
        name: editingProduct.name,
        quantity: editingProduct.quantity,
        price: editingProduct.price,
        description: editingProduct.description
      })
      setShowEditModal(false)
      setEditingProduct(null)
      setSuccess('Product updated successfully!')
      fetchProducts()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to update product')
      console.error('Error updating product:', err)
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`)
      setSuccess('Product deleted successfully!')
      fetchProducts()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to delete product')
      console.error('Error deleting product:', err)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }))
  }

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === 'quantity' || name === 'price' ? Number(value) : value
      })
    }
  }

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product)
    setShowEditModal(true)
  }

  useEffect(() => {
    fetchProducts()
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
        <h1>🏪 Product Inventory System</h1>
        <p>Simple and clean inventory management for your business</p>
      </header>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {/* Add Product Form */}
      <div className="section">
        <h2>➕ Add New Product</h2>
        <form onSubmit={addProduct} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Product description (optional)"
              />
            </div>
          </div>
          <button type="submit" className="btn primary">Add Product</button>
        </form>
      </div>

      {/* Products List */}
      <div className="section">
        <div className="section-header">
          <h2>📦 Product Inventory ({products.length} items)</h2>
          <button onClick={fetchProducts} className="btn secondary">🔄 Refresh</button>
        </div>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.length === 0 ? (
              <div className="no-products">
                <p>📋 No products found</p>
                <p>Add your first product above to get started!</p>
              </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <h3>{product.name}</h3>
                    <span className="price">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="product-details">
                    <div className="detail-item">
                      <span className="label">Quantity:</span>
                      <span className="value">{product.quantity}</span>
                    </div>
                    {product.description && (
                      <div className="detail-item">
                        <span className="label">Description:</span>
                        <span className="value">{product.description}</span>
                      </div>
                    )}
                  </div>
                  <div className="product-actions">
                    <button 
                      onClick={() => openEditModal(product)} 
                      className="btn edit"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)} 
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

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>✏️ Edit Product</h3>
              <button 
                onClick={() => setShowEditModal(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>
            <form onSubmit={updateProduct} className="form">
              <div className="form-group">
                <label htmlFor="edit-name">Product Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-quantity">Quantity</label>
                  <input
                    type="number"
                    id="edit-quantity"
                    name="quantity"
                    value={editingProduct.quantity}
                    onChange={handleEditInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-price">Price ($)</label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleEditInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <input
                  type="text"
                  id="edit-description"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn primary">Update Product</button>
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
