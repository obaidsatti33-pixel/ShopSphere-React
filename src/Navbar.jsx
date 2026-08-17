function Navbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  wishlistCount,
  setShowLogin,
  loggedInUser,
  setLoggedInUser,
}) {
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <span>🛍️</span>
        <h1>ShopSphere</h1>
      </div>

      {/* Navigation */}
      <div className="navbar-links">

        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          Home
        </a>

        <a
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("products");
          }}
        >
          Products
        </a>

        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
        >
          About
        </a>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          Contact
        </a>

      </div>

      {/* Search */}
      <div className="navbar-search">
        🔍
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="navbar-actions">

          {loggedInUser ? (
  <>
    <span className="user-welcome">
      👋 Hi, {loggedInUser.name}
    </span>

    <button
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
      }}
    >
      🚪 Logout
    </button>
  </>
) : (
  <button onClick={() => setShowLogin(true)}>
    🔐 Login
  </button>
)}
        

        <button
          className="nav-icon-btn"
          onClick={() => scrollToSection("cart")}
        >
          🛒
          <span>Cart</span>

          {cartCount > 0 && (
            <b className="nav-badge">
              {cartCount}
            </b>
          )}
        </button>

        <button
          className="nav-icon-btn"
          onClick={() => scrollToSection("wishlist")}
        >
          ❤️
          <span>Wishlist</span>

          {wishlistCount > 0 && (
            <b className="nav-badge wishlist-badge">
              {wishlistCount}
            </b>
          )}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;