import { useNavigate } from "react-router-dom";

function Navbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  wishlistCount,
  setShowLogin,
  loggedInUser,
  setLoggedInUser,
}) {

  const navigate = useNavigate();


  // =========================
  // SCROLL TO SECTION
  // =========================

  function scrollToSection(id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      });

    }

  }


  // =========================
  // MY ORDERS
  // =========================

  function handleMyOrders() {

    if (!loggedInUser) {

      setShowLogin(true);

      return;

    }

    navigate("/my-orders");

  }


  // =========================
  // RETURN
  // =========================

  return (

    <nav className="navbar">


      {/* =========================
          LOGO
      ========================= */}

      <div className="navbar-logo">

        <span>
          🛍️
        </span>

        <h1>
          ShopSphere
        </h1>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="navbar-links">

        <a
          href="#home"
          onClick={(e) => {

            e.preventDefault();

            navigate("/");

            setTimeout(() => {
              scrollToSection("home");
            }, 100);

          }}
        >
          Home
        </a>


        <a
          href="#products"
          onClick={(e) => {

            e.preventDefault();

            navigate("/");

            setTimeout(() => {
              scrollToSection("products");
            }, 100);

          }}
        >
          Products
        </a>


        <a
          href="#about"
          onClick={(e) => {

            e.preventDefault();

            navigate("/");

            setTimeout(() => {
              scrollToSection("about");
            }, 100);

          }}
        >
          About
        </a>


        <a
          href="#contact"
          onClick={(e) => {

            e.preventDefault();

            navigate("/");

            setTimeout(() => {
              scrollToSection("contact");
            }, 100);

          }}
        >
          Contact
        </a>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="navbar-search">

        🔍

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>


      {/* =========================
          ACTIONS
      ========================= */}

      <div className="navbar-actions">

{loggedInUser ? (
  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("loggedInUser");
      setLoggedInUser(null);
    }}
  >
    🚪 Logout
  </button>
) : (
  <button onClick={() => setShowLogin(true)}>
    🔐 Login
  </button>
)}


        {/* =========================
            MY ORDERS
        ========================= */}

        <button
          className="nav-icon-btn my-orders-btn"
          onClick={handleMyOrders}
        >

          📦

          <span>
            My Orders
          </span>

        </button>


        {/* =========================
            CART
        ========================= */}

        <button
          className="nav-icon-btn"
          onClick={() =>
            scrollToSection("cart")
          }
        >

          🛒

          <span>
            Cart
          </span>


          {cartCount > 0 && (

            <b className="nav-badge">
              {cartCount}
            </b>

          )}

        </button>


        {/* =========================
            WISHLIST
        ========================= */}

        <button
          className="nav-icon-btn"
          onClick={() =>
            scrollToSection("wishlist")
          }
        >

          ❤️

          <span>
            Wishlist
          </span>


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