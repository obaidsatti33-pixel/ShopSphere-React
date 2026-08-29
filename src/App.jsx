import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import Products from "./Products";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Wishlist from "./Wishlist";
import Checkout from "./Checkout";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";

import AdminProducts from "./AdminProducts";
import AdminLogin from "./AdminLogin";
import AdminOrders from "./AdminOrders";
import AdminDashboard from "./AdminDashboard";
import MyOrders from "./MyOrders";

import "./App.css";

function App() {

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });


  // =========================
  // CATEGORY & SEARCH
  // =========================

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] =
    useState([]);


  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState(() => {

    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  });


  // =========================
  // TOAST
  // =========================

  const [toast, setToast] =
    useState("");


  // =========================
  // LOGIN / SIGNUP
  // =========================

  const [showLogin, setShowLogin] =
    useState(false);

  const [showSignup, setShowSignup] =
    useState(false);

  const [loggedInUser, setLoggedInUser] =
    useState(() => {

      const savedUser =
        localStorage.getItem("loggedInUser");

      return savedUser
        ? JSON.parse(savedUser)
        : null;

    });


  // =========================
  // ADMIN LOGIN
  // =========================

  const [isAdmin, setIsAdmin] =
    useState(() => {

      return (
        localStorage.getItem("isAdmin") === "true"
      );

    });


  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);


  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);


  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {

    fetch("http://localhost:3001/api/products")

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Failed to fetch products"
          );

        }

        return response.json();

      })

      .then((data) => {

        // Backend agar array directly bhej raha hai
        // ya { value: [...] } bhej raha hai
        const productList =
          data.value || data || [];

        const formattedProducts =
          productList.map((product) => ({

            ...product,

            id: product._id

          }));

        setProducts(
          formattedProducts
        );

      })

      .catch((error) => {

        console.error(
          "Error fetching products:",
          error
        );

      });

  }, []);


  // =========================
  // TOAST
  // =========================

  function showToast(message) {

    setToast(message);

    setTimeout(() => {

      setToast("");

    }, 2000);

  }


  // =========================
  // ADD TO CART
  // =========================

  function addToCart(product) {

    const existingProduct =
      cart.find(
        (item) =>
          item.id === product.id
      );


    if (existingProduct) {

      setCart(

        cart.map((item) =>

          item.id === product.id

            ? {
                ...item,

                quantity:
                  item.quantity + 1
              }

            : item

        )

      );

    } else {

      setCart([

        ...cart,

        {
          ...product,
          quantity: 1
        }

      ]);

    }


    showToast(
      "✅ Product added to cart!"
    );

  }


  // =========================
  // ADD TO WISHLIST
  // =========================

  function addToWishlist(product) {

    setWishlist(
      (prevWishlist) => {

        const alreadyExists =
          prevWishlist.some(
            (item) =>
              item.id === product.id
          );


        if (alreadyExists) {

          return prevWishlist;

        }


        return [

          ...prevWishlist,

          product

        ];

      }
    );


    showToast(
      "❤️ Added to wishlist!"
    );

  }


  // =========================
  // REMOVE WISHLIST
  // =========================

  function removeFromWishlist(id) {

    setWishlist(

      (prevWishlist) =>

        prevWishlist.filter(
          (item) =>
            item.id !== id
        )

    );


    showToast(
      "❌ Removed from wishlist!"
    );

  }


  // =========================
  // REMOVE CART
  // =========================

  function removeFromCart(index) {

    setCart(

      cart.filter(
        (_, i) =>
          i !== index
      )

    );


    showToast(
      "❌ Product removed from cart!"
    );

  }


  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {

    setCart([]);

    showToast(
      "🗑️ Cart cleared!"
    );

  };


  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {

    setCart(

      cart.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:
                item.quantity + 1

            }

          : item

      )

    );

  };


  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {

    setCart(

      cart.map((item) =>

        item.id === id &&
        item.quantity > 1

          ? {

              ...item,

              quantity:
                item.quantity - 1

            }

          : item

      )

    );

  };


  // =========================
  // ADMIN LOGIN HANDLER
  // =========================

  const handleAdminLogin = () => {

    localStorage.setItem(
      "isAdmin",
      "true"
    );

    setIsAdmin(true);

  };


  // =========================
  // RETURN
  // =========================

  return (

    <BrowserRouter>

      <Routes>


        {/* =========================
            CUSTOMER WEBSITE
        ========================= */}

        <Route
          path="/"
          element={

            <>

              {/* Toast */}

              {toast && (

                <div className="toast">
                  {toast}
                </div>

              )}


              {/* Navbar */}

              <Navbar

                cartCount={cart.reduce(
                  (total, item) =>
                    total +
                    item.quantity,
                  0
                )}

                wishlistCount={
                  wishlist.length
                }

                searchTerm={
                  searchTerm
                }

                setSearchTerm={
                  setSearchTerm
                }

                setShowLogin={
                  setShowLogin
                }

                loggedInUser={
                  loggedInUser
                }

                setLoggedInUser={
                  setLoggedInUser
                }

              />


              {/* Login */}

              {showLogin && (

                <Login

                  closeLogin={() =>
                    setShowLogin(false)
                  }

                  openSignup={() => {

                    setShowLogin(false);

                    setShowSignup(true);

                  }}

                />

              )}


              {/* Signup */}

              {showSignup && (

                <Signup

                  closeSignup={() =>
                    setShowSignup(false)
                  }

                  openLogin={() => {

                    setShowSignup(false);

                    setShowLogin(true);

                  }}

                />

              )}


              {/* Hero */}

              <Hero />


              {/* Categories */}

              <Categories

                selectedCategory={
                  selectedCategory
                }

                setSelectedCategory={
                  setSelectedCategory
                }

              />


              {/* Products */}

              <Products

                products={products}

                addToCart={
                  addToCart
                }

                selectedCategory={
                  selectedCategory
                }

                searchTerm={
                  searchTerm
                }

                setSelectedProduct={
                  setSelectedProduct
                }

                addToWishlist={
                  addToWishlist
                }

                wishlist={
                  wishlist
                }

              />


              {/* About */}

              <About />


              {/* Contact */}

              <Contact />


              {/* Cart */}

              <Cart

                cart={cart}

                removeFromCart={
                  removeFromCart
                }

                clearCart={
                  clearCart
                }

                increaseQuantity={
                  increaseQuantity
                }

                decreaseQuantity={
                  decreaseQuantity
                }

              />


              {/* Checkout */}

              <Checkout

                cart={cart}

                clearCart={
                  clearCart
                }

              />


              {/* Product Details */}

              <ProductDetails

                product={
                  selectedProduct
                }

                closeDetails={() =>
                  setSelectedProduct(
                    null
                  )
                }

                addToCart={
                  addToCart
                }

                addToWishlist={
                  addToWishlist
                }

              />


              {/* Wishlist */}

              <Wishlist

                wishlist={
                  wishlist
                }

                removeFromWishlist={
                  removeFromWishlist
                }

                addToCart={
                  addToCart
                }

              />


              {/* Footer */}

              <Footer />

            </>

          }

        />


        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route

          path="/admin"

          element={

            isAdmin ? (

              <AdminDashboard />

            ) : (

              <AdminLogin

                onAdminLogin={
                  handleAdminLogin
                }

              />

            )

          }

        />


        <Route
        path="/my-orders"
        element={
        <MyOrders
        loggedInUser={loggedInUser}
        />
        }
        />


        {/* =========================
            ADMIN PRODUCTS
        ========================= */}

        <Route

          path="/admin/products"

          element={

            isAdmin ? (

              <AdminProducts />

            ) : (

              <AdminLogin

                onAdminLogin={
                  handleAdminLogin
                }

              />

            )

          }

        />


        {/* =========================
            ADMIN ORDERS
        ========================= */}

        <Route

          path="/admin/orders"

          element={

            isAdmin ? (

              <AdminOrders />

            ) : (

              <AdminLogin

                onAdminLogin={
                  handleAdminLogin
                }

              />

            )

          }

        />


      </Routes>

    </BrowserRouter>

  );

}

export default App;