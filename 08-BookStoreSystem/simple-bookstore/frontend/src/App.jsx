import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (bookId) => {
    setCart((prev) => ({ ...prev, [bookId]: (prev[bookId] || 0) + 1 }));
  };

  const removeFromCart = (bookId) => {
    setCart((prev) => {
      if (!prev[bookId]) return prev;
      const newCount = prev[bookId] - 1;
      if (newCount <= 0) {
        const { [bookId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [bookId]: newCount };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const checkout = async () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }
    const cartItems = Object.entries(cart).map(([bookId, quantity]) => ({
      bookId: Number(bookId),
      quantity,
    }));
    try {
      await axios.post("http://localhost:5000/api/checkout", {
        items: cartItems,
      });
      alert(`Checkout successful! Total items: ${totalItems}`);
      setCart({});
    } catch {
      alert("Checkout failed, please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Simple Bookstore</h1>
        <button
          className="btn btn-primary"
          onClick={checkout}
          disabled={totalItems === 0}
        >
          Checkout ({totalItems})
        </button>
      </div>
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-3 mb-3">
            <div className="card h-100">
              <img src={book.image} className="card-img-top" alt={book.title} />
              <div className="card-body text-center">
                <h6 className="card-title">{book.title}</h6>
                <p className="card-text small">{book.author}</p>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => addToCart(book.id)}
                  >
                    Add
                  </button>
                  <span>{cart[book.id] || 0}</span>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => removeFromCart(book.id)}
                    disabled={!cart[book.id]}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
