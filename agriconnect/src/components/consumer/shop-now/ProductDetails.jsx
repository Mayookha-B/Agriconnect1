import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) { console.error(err); }
    };
    fetchDetails();
  }, [id]);

  if (!product) return <div className="loader">Loading details...</div>;

  const totalAmount = (product.price * qty).toFixed(4);

  return (
    <div className="product-details-page">
      <div className="details-card">
        {/* IMAGE SECTION */}
        <div className="details-image">
          <img src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`} alt={product.cropName} />
        </div>

        {/* INFO SECTION */}
        <div className="details-info">
          <span className="badge">{product.category}</span>
          <h1>{product.cropName}</h1>
          
          {/* PRODUCT ID BOX */}
          <div className="pid-box">
            <span className="label">Product ID:</span>
            <span className="value">#{product._id.toUpperCase()}</span>
          </div>

          <div className="price-main">{product.price} ETH <small>/ kg</small></div>
          
          {/* HARVEST & EXPIRY SECTION */}
          <div className="date-details">
            <div className="date-item">
              <i className="fas fa-seedling"></i>
              <div>
                <p className="label">Harvest Date</p>
                <p className="value">{new Date(product.harvestDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="date-item">
              <i className="fas fa-hourglass-end"></i>
              <div>
                <p className="label">Expiry Date</p>
                <p className="value">{new Date(product.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="qty-custom">
            <label>Select Quantity (kg):</label>
            <div className="qty-input">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <input type="number" value={qty} readOnly />
              <button onClick={() => setQty(Math.min(product.quantity, qty + 1))}>+</button>
            </div>
            <small>Available: {product.quantity} kg</small>
          </div>

          <div className="bill-box">
            <p>Subtotal:</p>
            <h2>{totalAmount} ETH</h2>
          </div>

          <div className="detail-actions">
            <button className="cart-btn">Add to Cart</button>
            <button className="buy-btn" onClick={() => navigate('/checkout', { state: { product, qty, totalAmount } })}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;