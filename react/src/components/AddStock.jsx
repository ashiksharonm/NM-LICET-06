// AddStock.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addStock } from "../service/service";
import useAuth from "../service/useAuth";

const AddStock = ({ Load }) => {
  const [stockId, setId] = useState("");
  const [stockname, setName] = useState("");
  const [stockPrice, setPrice] = useState("");
  const [stockQuantity, setQuantity] = useState("");
  const [stockSupplier, setSupplier] = useState("");
  const [orderCompletionDate, setOcd] = useState("");
  const [stockStatus, setStatus] = useState("active"); // Default status is 'active'
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  async function save(event) {
    event.preventDefault();
    const calculatedAmt = parseFloat(stockPrice) * parseFloat(stockQuantity);

    const data = {
      _itemId: stockId,
      _stockName: stockname,
      _price: stockPrice,
      _quantity: stockQuantity,
      _amount: calculatedAmt.toFixed(2),
      _supplier: stockSupplier,
      _orderCompletionDate: orderCompletionDate,
      _status: stockStatus, // Include status in the data
    };

    try {
      await addStock(data); // Use the addStock function from service.jsx
      alert("Stock added Successfully");
      resetForm();
      Load();
    } catch (err) {
      console.error("Error adding stock:", err);
      alert("Stock Registration Failed");
    }
  }

  function resetForm() {
    setId("");
    setName("");
    setPrice("");
    setQuantity("");
    setSupplier("");
    setOcd("");
    setStatus("active");
  }

  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#485c7f" }}
      >
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand text-white">
            StockEasy
          </Link>
          <div className="d-flex align-items-center">
            <Link to="/home" className="nav-link me-3 text-white">
              Home
            </Link>
            <Link to="/update" className="nav-link me-3 text-white">
              Update Stocks
            </Link>
            <Link to="/delete" className="nav-link me-3 text-white">
              Delete Stocks
            </Link>
            <Link to="/" className="btn btn-light me-3 rounded-pill">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-5 stock-container">
        <h1 className="text-center mb-4">Add Stocks</h1>
        <form>
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="text"
              className="form-control"
              value={stockId}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Stock Name</label>
            <input
              type="text"
              className="form-control"
              value={stockname}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price (in Rs.)</label>
            <input
              type="text"
              className="form-control"
              value={stockPrice}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              value={stockQuantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              className="form-control"
              value={stockSupplier}
              onChange={(event) => setSupplier(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Order Completion Date</label>
            <input
              type="text"
              className="form-control"
              value={orderCompletionDate}
              onChange={(event) => setOcd(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              value={stockStatus}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="active">Active</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={save}>
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
