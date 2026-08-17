import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import Products from "./Products";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import "./App.css";
import Wishlist from "./Wishlist";
import Checkout from "./Checkout";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Category state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Toast state
  const [toast, setToast] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
  const savedUser = localStorage.getItem("loggedInUser");

  return savedUser ? JSON.parse(savedUser) : null;
});


  // Save cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  // Save wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  // Show Toast
  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  }


  // Add to Cart
  function addToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showToast("✅ Product added to cart!");
  }


  // Add to Wishlist
  function addToWishlist(product) {
    setWishlist((prevWishlist) => {
      const alreadyExists = prevWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return prevWishlist;
      }

      return [...prevWishlist, product];
    });

    showToast("❤️ Added to wishlist!");
  }


  // Remove from Wishlist
  function removeFromWishlist(id) {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );

    showToast("❌ Removed from wishlist!");
  }


  // Remove from Cart
  function removeFromCart(index) {
    setCart(cart.filter((_, i) => i !== index));

    showToast("❌ Product removed from cart!");
  }


  // Clear Cart
  const clearCart = () => {
    setCart([]);

    showToast("🗑️ Cart cleared!");
  };


  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}


      <Navbar
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        wishlistCount={wishlist.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowLogin={setShowLogin}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      {showLogin && (
        <Login
          closeLogin={() => setShowLogin(false)}
          openSignup={() => {
             setShowLogin(false);
             setShowSignup(true);
             }}
              />
              )}

        {showSignup && (
          <Signup

          closeSignup={() => setShowSignup(false)}
           openLogin={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}
                      />
                         )}

      <Hero />


      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />


      <Products
        addToCart={addToCart}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        setSelectedProduct={setSelectedProduct}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
      />

      <About />

      <Contact />


      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />


      <Checkout
        cart={cart}
        clearCart={clearCart}
      />


      <ProductDetails
        product={selectedProduct}
        closeDetails={() => setSelectedProduct(null)}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
      />


      <Wishlist
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
      />

      <Footer />
    </>
  );
}

export default App;