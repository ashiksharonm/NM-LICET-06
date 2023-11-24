// DeleteStock.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteStock } from "../service/service";
import useAuth from "../service/useAuth";

const DeleteStock = ({ Load }) => {
  const [stockId, setStockId] = useState("");
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  // Check if the user is authenticated before rendering the component
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  async function deleteStockData() {
    try {
      await deleteStock(stockId); // Use the deleteStock function from service.jsx
      alert("Stock Deleted Successfully");
      resetForm();
      Load();
    } catch (err) {
      console.error("Error deleting stock:", err);
      alert("Stock Deletion Failed");
    }
  }

  function resetForm() {
    setStockId("");
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
            <Link to="/update" className="nav-link me-3 text-white">
              Update Stocks
            </Link>
            <Link to="/" className="btn btn-light me-3 rounded-pill">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-5 stock-container">
        <h1 className="text-center mb-4">Delete Stocks</h1>
        <form>
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="text"
              className="form-control"
              value={stockId}
              onChange={(e) => setStockId(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteStockData}
          >
            Delete Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteStock;
