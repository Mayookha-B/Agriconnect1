import React from 'react';
import './ConsumerPage.css';

const ConsumerPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AGRICONNECT</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="nav-icons">
          <i className="fas fa-search"></i>
          <i className="far fa-user"></i>
          <i className="far fa-heart"></i>
          <i className="fas fa-shopping-bag"></i>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Get organic vegetables at Your Fingertips</h1>
          <button className="btn-primary">Shop Now</button>
        </div>
      </header>

      {/* Features Bar 
      <section className="features-bar">
        <div className="feature-item"><span>🔒</span> Secure Payment</div>
        <div className="feature-item"><span>🚚</span> Free Shipping</div>
        <div className="feature-item"><span>🎧</span> 24/7 Support</div>
        <div className="feature-item"><span>🌿</span> Quality Plants</div>
      </section>
      */}

      {/* Trending Products */}
      <section className="product-section">
        <h2>Trending Products</h2>
        <div className="product-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="product-card">
              <div className="product-img-placeholder">Plant {item}</div>
              <h3>Snake Plant</h3>
              <p>$25.00</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="sale-banner">
        <div className="sale-content">
          <h2>Flash Sale: Up to 50% Off</h2>
          <p>On Select Items!</p>
          <button className="btn-secondary">Shop Now</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-image">
           <div className="img-placeholder">Plants Group</div>
        </div>
        <div className="about-text">
          <h2>Your Premier Destination for All Green.</h2>
          <p>We provide a wide variety of indoor and outdoor plants to brighten your space.</p>
          <div className="stats">
            <div><strong>20%</strong> Off first order</div>
            <div><strong>100K</strong> Happy customers</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">AGRICONNECT</div>
        <p>© 2026 AgriConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ConsumerPage;