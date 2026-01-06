import React from "react";
import "./ConsumerPage.css";
import { Link } from "react-router-dom";

const ConsumerPage = () => {
  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">AgriConnect</h2>

        <ul className="nav-links">
  <li>Home</li>

  <li>
    <Link to="/shop">Shop</Link>
  </li>

  <li>Complaints</li>
  <li>Cart</li>
</ul>

      </nav>

     <section
  className="hero"
  style={{
    backgroundImage: `url("https://images.pexels.com/photos/551997/pexels-photo-551997.jpeg?auto=compress&cs=tinysrgb&w=1600")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="hero-overlay">
    <p className="hero-subtitle">WELCOME TO AGRICONNECT MARKETPLACE</p>
    <h1 className="hero-title">
      Fresh Fruits & Vegetables <br />
      Delivered to Your Fingertips
    </h1>
    <Link to="/shop">
  <button className="shop-btn">Shop Now</button>
</Link>
  </div>
</section>


      {/* FEATURES */}
      <section className="features">
        <div>
          <h3>Secure Payments</h3>
          <p>Safe transactions guaranteed</p>
        </div>

        <div>
          <h3>Free Delivery</h3>
          <p>Orders above ₹199</p>
        </div>

        <div>
          <h3>Farm Fresh</h3>
          <p>Direct from farmers</p>
        </div>

        <div>
          <h3>24×7 Support</h3>
          <p>We are here for you</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section">
        <h2>Our Categories</h2>

        <div className="categories">

          <div>
            <img src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1200" />
            <p>Fresh Fruits</p>
          </div>

          <div>
            <img src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200" />
            <p>Organic Vegetables</p>
          </div>

        </div>
      </section>

      <section
  className="cta-section"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38')",
  }}
>
  <div className="cta-overlay">
    <h2>Ready to Find Your Perfect Produce?</h2>

    <p>
      Browse fresh fruits and vegetables from trusted farmers,
      delivered directly to your doorstep.
    </p>

    <Link to="/shop">
  <button className="shop-btn">Shop Now</button>
</Link>

  </div>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <h2>AgriConnect</h2>
        <p>Connecting Farmers and Consumers</p>
        <p>© 2026 AgriConnect</p>
      </footer>
    </div>
  );
};

export default ConsumerPage;
