import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", quantity: "", price: "" });

  // Fetch products from backend API on mount
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        quantity: Number(form.quantity),
        price: Number(form.price)
      })
    })
      .then(res => res.json())
      .then(newProduct => {
        setProducts([newProduct, ...products]);
        setForm({ name: "", quantity: "", price: "" });
      })
      .catch(console.error);
  };

  // Start editing a product (just fill form)
  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditForm({ name: product.name, quantity: product.quantity, price: product.price });
  };

  // Submit updated product
  const handleEditSubmit = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editForm.name,
        quantity: Number(editForm.quantity),
        price: Number(editForm.price)
      })
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
        setEditId(null);
      })
      .catch(console.error);
  };

  // Delete a product
  const handleDelete = (id) => {
    if (window.confirm("Confirm deletion?")) {
      fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => {
          setProducts(products.filter(p => p.id !== id));
        })
        .catch(console.error);
    }
  };

  // Render UI (similar to before, but using API-integrated state)
  return (
    <div className="inventory-app">
      <h1>Product Inventory</h1>

      <form onSubmit={handleAddProduct} className="add-form">
        <input
          type="text" placeholder="Product Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} required
        />
        <input
          type="number" placeholder="Quantity" min="0" value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })} required
        />
        <input
          type="number" placeholder="Price" min="0" step="0.01" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })} required
        />
        <button type="submit">Add Product</button>
      </form>

      <table className="product-table">
        <thead>
          <tr><th>Name</th><th>Quantity</th><th>Price ($)</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(product => (
            editId === product.id ? (
              <tr key={product.id}>
                <td>
                  <input type="text" value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                </td>
                <td>
                  <input type="number" min="0" value={editForm.quantity}
                    onChange={e => setEditForm({ ...editForm, quantity: e.target.value })} />
                </td>
                <td>
                  <input type="number" min="0" step="0.01" value={editForm.price}
                    onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                </td>
                <td>
                  <button onClick={() => handleEditSubmit(product.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
