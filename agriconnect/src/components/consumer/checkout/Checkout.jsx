import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../../context/CartContext"; // Import Cart Context
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Extract data passed from ProductDetails OR CartPage
  const { product, qty, totalAmount, cartItems } = location.state || {};
  const [processing, setProcessing] = useState(false);

  // If the user lands here without data, redirect to shop
  useEffect(() => {
    if (!product && !cartItems) {
      navigate("/shop");
    }
  }, [product, cartItems, navigate]);

  const handleConfirmOrder = async () => {
    setProcessing(true);
    const token = localStorage.getItem("token");

    try {
      // Determine if we are processing a single item or multiple from cart
      const ordersToPlace = cartItems 
        ? cartItems.map(item => ({
            productId: item._id,
            farmerId: item.farmerId._id || item.farmerId,
            quantity: item.qty,
            totalPrice: (item.price * item.qty).toFixed(4)
          }))
        : [{
            productId: product._id,
            farmerId: product.farmerId._id || product.farmerId,
            quantity: qty,
            totalPrice: totalAmount
          }];

      // Loop through and place each order in the backend
      for (const order of ordersToPlace) {
        await axios.post("http://localhost:5000/api/orders/place", order, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      if (cartItems) clearCart(); // Empty cart if checkout was successful

      alert("Transaction Successful! Your fresh produce is on the way.");
      navigate("/my-orders");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Checkout failed. Please check your connection.");
    } finally {
      setProcessing(false);
    }
  };

  if (!product && !cartItems) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2 className="checkout-title">Finalize Transaction</h2>
        
        <div className="checkout-items-preview">
          {cartItems ? (
            cartItems.map(item => (
              <div key={item._id} className="checkout-row">
                <img src={`http://localhost:5000/${item.image?.replace(/\\/g, "/")}`} alt={item.cropName} />
                <span>{item.cropName} (x{item.qty}kg)</span>
                <strong>{item.price * item.qty} ETH</strong>
              </div>
            ))
          ) : (
            <div className="checkout-row">
              <img src={`http://localhost:5000/${product.image?.replace(/\\/g, "/")}`} alt={product.cropName} />
              <span>{product.cropName} (x{qty}kg)</span>
              <strong>{totalAmount} ETH</strong>
            </div>
          )}
        </div>

        <hr />

        <div className="checkout-billing">
          <div className="billing-item">
            <span>Subtotal:</span>
            <span>{totalAmount} ETH</span>
          </div>
          <div className="billing-item">
            <span>Network Fee:</span>
            <span>0.0000 ETH</span>
          </div>
          <div className="billing-item grand-total">
            <span>Grand Total:</span>
            <span>{totalAmount} ETH</span>
          </div>
        </div>

        <div className="payment-method-box">
          <p><i className="fab fa-ethereum"></i> <strong>Pay with ETH</strong></p>
          <code>Simulated Wallet: 0xAgri...2026</code>
        </div>

        <button 
          className="confirm-btn" 
          onClick={handleConfirmOrder}
          disabled={processing}
        >
          {processing ? (
            <><i className="fas fa-spinner fa-spin"></i> Processing...</>
          ) : (
            `Pay ${totalAmount} ETH Now`
          )}
        </button>
        
        <button className="cancel-text" onClick={() => navigate(-1)}>
          Cancel and return
        </button>
      </div>
    </div>
  );
};

export default Checkout;