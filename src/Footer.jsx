function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2>ShopSphere</h2>

          <p>
            Your simple and reliable destination
            for quality products at great prices.
          </p>

        </div>


        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>

          <a href="#products">Products</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

        </div>


        {/* Customer Service */}

        <div className="footer-links">

          <h3>Customer Service</h3>

          <a href="#cart">Shopping Cart</a>

          <a href="#wishlist">Wishlist</a>

          <a href="#checkout">Checkout</a>

          <a href="#contact">Help & Support</a>

        </div>


        {/* Social */}

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">Facebook</a>

            <a href="#">Instagram</a>

            <a href="#">Twitter</a>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 ShopSphere. All rights reserved.
        </p>

        <p>
          Built with React ⚛️
        </p>

      </div>

    </footer>
  );
}

export default Footer;