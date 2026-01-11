import React from 'react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import "./CartPage.css";

const CartPage = () => {
  // Destructure updateQty from context
  const { cart, removeFromCart, updateQty } = useCart(); 
  const navigate = useNavigate();

  // Global subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(4);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/shop')}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items-list">
          <h1>Shopping Cart</h1>
          <hr />
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={`http://localhost:5000/${item.image?.replace(/\\/g, "/")}`} alt={item.cropName} />
              
              <div className="item-details">
                <h3>{item.cropName}</h3>
                <p className="instock">In Stock</p>
                
                <div className="qty-edit-wrapper">
                  <label>Qty:</label>
                  <div className="qty-edit-controls">
                    {/* updateQty triggers a re-render, updating individual and total prices */}
                    <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                    <input type="number" value={item.qty} readOnly />
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                    <span className="unit-label">kg</span>
                  </div>
                </div>

                <button className="delete-btn" onClick={() => removeFromCart(item._id)}>Delete</button>
              </div>

              {/* DYNAMIC INDIVIDUAL PRICE: Unit Price * Quantity */}
              <div className="item-price-column">
                <strong className="item-total-price">
                  {(item.price * item.qty).toFixed(4)} ETH
                </strong>
                <p className="unit-price-hint">({item.price} ETH / kg)</p>
              </div>
            </div>
          ))}
          
          <div className="cart-footer-subtotal">
            Subtotal ({cart.length} items): <strong>{subtotal} ETH</strong>
          </div>
        </div>

        <div className="cart-checkout-sidebar">
          <h3>Subtotal ({cart.length} items):</h3>
          <h2 className="total-price">{subtotal} ETH</h2>
          <button 
            className="proceed-btn" 
            onClick={() => navigate('/checkout', { 
              state: { 
                cartItems: cart, 
                totalAmount: subtotal 
              } 
            })}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;