import React from "react";
import "./shopnow.css";

const ShopPage = () => {
  return (
    <div className="shop-wrapper">

      {/* HERO SECTION */}
      <section
        className="shop-hero"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/551997/pexels-photo-551997.jpeg?auto=compress&cs=tinysrgb&w=1600")`,}}
      >
        <h1 className="shop-title">Shop</h1>
      </section>

      {/* RESULTS + SORT BAR */}
      <div className="shop-topbar">
        <p>Showing all 6 results</p>
        <select>
          <option>Sort items</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">

        <div className="product-card">
          <img src="https://tse1.mm.bing.net/th/id/OIP._BXSCTNuOau9rUtGZ8TdgAExDM?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Tomatoes"/>
          <h3>Organic Tomatoes</h3>
          <p>Vegetables</p>
          <span>$3.50 / kg</span>
        </div>

        <div className="product-card">
          <img src="https://masseysofsaintfield.co.uk/wp-content/uploads/2020/09/Potatoes.jpg" alt="Potatoes"/>
          <h3>Fresh Potatoes</h3>
          <p>Vegetables</p>
          <span>$1.20 / kg</span>
        </div>

        <div className="product-card">
          <img src="https://www.compo-expert.com/sites/default/files/2020-02/vegetables-carrots-title.jpg" alt="Carrots"/>
          <h3>Carrots</h3>
          <p>Vegetables</p>
          <span>$2.10 / kg</span>
        </div>

        <div className="product-card">
          <img src="https://media.istockphoto.com/id/187420397/photo/red-apples.jpg?s=612x612&w=0&k=20&c=2gP5VblBy8wBB1aMuB9godHm_QYuKOdvb1U_f9h4Kjk=" alt="Apples"/>
          <h3>Red Apples</h3>
          <p>Fruits</p>
          <span>$3.90 / kg</span>
        </div>

        <div className="product-card">
          <img src="https://5.imimg.com/data5/DU/KL/SW/GLADMIN-29366844/fresh-banana.jpg" alt="Bananas"/>
          <h3>Bananas</h3>
          <p>Fruits</p>
          <span>$1.60 / kg</span>
        </div>

        <div className="product-card">
          <img src="https://www.foodandwine.com/thmb/AJ3n6lDkc-KQcve9FW5jdQgJNBM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Onion-Explainer-FT-BLOG0822-2000-97f10a001c9943d8b61c6c6b2095a076.jpg" alt="Onions"/>
          <h3>Onions</h3>
          <p>Vegetables</p>
          <span>$1.10 / kg</span>
        </div>

      </div>

      {/* CTA BANNER */}
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

   
  <button className="shop-btn">Explore</button>


  </div>
</section>

      {/* FOOTER */}
      <footer>
        <h3>AgriConnect</h3>
        <p>Connecting Farmers and Consumers</p>
        <small>© 2026 AgriConnect Marketplace</small>
      </footer>

    </div>
  );
};

export default ShopPage;
