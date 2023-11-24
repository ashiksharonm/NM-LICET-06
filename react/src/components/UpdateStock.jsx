// UpdateStock.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateStock } from "../service/service";
import axios from "axios";
import useAuth from "../service/useAuth";

const UpdateStock = ({ Load }) => {
  const [stockId, setId] = useState("");
  const [stockName, setName] = useState("");
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

  useEffect(() => {
    // Fetch stock details based on stockId when the component mounts
    async function fetchStockDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/stock/get/${stockId}`
        );

        const stockDetails = response.data;
        // Set fetched details in the state
        setName(stockDetails._stockName);
        setPrice(stockDetails._price);
        setQuantity(stockDetails._quantity);
        setSupplier(stockDetails._supplier);
        setOcd(stockDetails._orderCompletionDate);
        setStatus(stockDetails._status);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    }

    fetchStockDetails();
  }, [stockId]);

  async function updateStockData(event) {
    event.preventDefault();

    // Calculate stockAmt based on stockPrice and stockQuantity
    const calculatedAmt = parseFloat(stockPrice) * parseFloat(stockQuantity);

    const data = {
      _stockName: stockName,
      _price: stockPrice,
      _quantity: stockQuantity,
      _amount: calculatedAmt.toFixed(2),
      _supplier: stockSupplier,
      _orderCompletionDate: orderCompletionDate,
      _status: stockStatus, // Include status in the data
    };

    try {
      await updateStock(stockId, data); // Use the updateStock function from service.jsx
      alert("Stock Updated Successfully");
      resetForm();
      Load();
    } catch (err) {
      console.error("Error updating stock:", err);
      // alert("Stock Update Failed");
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
      {/* Your navigation bar */}
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
            <Link to="/add" className="nav-link me-3 text-white">
              Add Stocks
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
        <h1 className="text-center mb-4">Update Stocks</h1>
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
              value={stockName}
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

          <button className="btn btn-primary" onClick={updateStockData}>
            Update Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStock;
