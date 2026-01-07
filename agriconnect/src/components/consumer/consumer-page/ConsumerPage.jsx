import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./ConsumerPage.css";

const ConsumerPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  // Notice we check for 'consumer' role specifically
  if (!token || role !== 'consumer') {
    navigate('/consumer-login');
  }
}, [navigate]);

  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">AgriConnect</h2>

        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>Complaints</li>
          <li>Cart (0)</li>
        </ul>
      </nav>

     <section
  className="hero"
  style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6")`,
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
    <button className="shop-btn">Shop Now</button>
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
          <p>Orders above ₹499</p>
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
            <img src="https://images.unsplash.com/photo-1576402187878-974f70c890a5" />
            <p>Fresh Fruits</p>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443" />
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

    <button className="shop-btn">Shop Now</button>
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
