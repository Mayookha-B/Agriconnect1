import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./shopnow.css"; 

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        // Fetching from the global route (irrespective of location)
        const res = await axios.get("http://localhost:5000/api/products/all");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Marketplace Error:", err);
        setLoading(false);
      }
    };
    fetchMarketplace();
  }, []);

  if (loading) return <div className="loader">Loading Marketplace...</div>;

  return (
    <div className="shop-page">
      {/* Banner Section */}
      <section className="shop-hero">
        <div className="hero-overlay">
          <h1>Shop</h1>
        </div>
      </section>

      <div className="shop-container">
        <div className="product-grid">
          {products.map((item) => (
            <div className="product-card" key={item._id}>
              <div className="product-image">
                <img 
                  src={item.image ? `http://localhost:5000/${item.image.replace(/\\/g, "/")}` : "/placeholder.jpg"} 
                  alt={item.cropName} 
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.cropName}</h3>
                <p className="farmer-label">Farmer: {item.farmerId?.name || "Verified Farmer"}</p>
                <p className="product-category">{item.category}</p>
                
                <div className="price-row">
                  <p className="product-price"><strong>{item.price} ETH</strong>/unit</p>
                  <p className="stock-label">{item.quantity} kg available</p>
                </div>

                {/* Link to the Details Page with dynamic ID */}
                <Link to={`/product/${item._id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopNow;