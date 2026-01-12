import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./shopnow.css"; 

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState("all"); // Default to 'all'
  const [customRadius, setCustomRadius] = useState("");

  const fetchMarketplace = async (selectedRadius) => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products/all";
      
      // Get location saved during Consumer Login/Landing
      const userLoc = JSON.parse(localStorage.getItem('userLocation'));

      // If a radius is selected and we have coordinates, use the filter route
      if (selectedRadius !== "all" && userLoc?.lat && userLoc?.lon) {
        const dist = selectedRadius === "custom" ? customRadius : selectedRadius;
        url = `http://localhost:5000/api/products/filter/nearby?lat=${userLoc.lat}&lon=${userLoc.lon}&radius=${dist}`;
      }

      const res = await axios.get(url);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Marketplace Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplace("all");
  }, []);

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setRadius(val);
    if (val !== "custom") {
      fetchMarketplace(val);
    }
  };

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
        {/* --- DISTANCE FILTER BAR --- */}
        <div className="filter-controls">
          <div className="filter-item">
            <label><i className="fas fa-map-marker-alt"></i> Distance Filter:</label>
            <select value={radius} onChange={handleFilterChange}>
              <option value="all">Global (All Locations)</option>
              <option value="10">Within 10 km</option>
              <option value="20">Within 20 km</option>
              <option value="30">Within 30 km</option>
              <option value="custom">Custom Radius</option>
            </select>
          </div>

          {radius === "custom" && (
            <div className="custom-radius-input">
              <input 
                type="number" 
                placeholder="Enter km" 
                value={customRadius}
                onChange={(e) => setCustomRadius(e.target.value)} 
              />
              <button onClick={() => fetchMarketplace("custom")}>Apply</button>
            </div>
          )}
        </div>
        {loading ? (
          <div className="loader">Loading Products...</div>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((item) => (
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
                    <Link to={`/product/${item._id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">No products found in this range. Try increasing the radius!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopNow;