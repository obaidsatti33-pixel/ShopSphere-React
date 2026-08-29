import { useState } from "react";

function Checkout({ cart, clearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const total = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  }

  async function handlePlaceOrder() {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,

        products: cart.map((product) => ({
          productId: product.id || product._id,
          name: product.name,
          price: Number(product.price),
          quantity: product.quantity,
          image: product.image,
        })),

        totalAmount: total,
      };

      const response = await fetch(
        "http://localhost:3001/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      console.log("Order saved:", data);

      // MongoDB generated Order ID
      setOrderId(data.order._id);

      setError("");
      setOrderPlaced(true);

      // Cart clear
      clearCart();

    } catch (error) {
      console.error("Place Order Error:", error);

      setError(
        "Something went wrong while placing your order."
      );
    }
  }

  /* =========================
     ORDER SUCCESS
  ========================= */

  if (orderPlaced) {
    return (
      <section className="checkout-section">

        <div className="order-success-card">

          <div className="success-icon">
            ✓
          </div>

          <span className="success-label">
            ORDER CONFIRMED
          </span>

          <h2>
            Order Placed Successfully! 🎉
          </h2>

          <p>
            Thank you for shopping with ShopSphere.
          </p>

          <p>
            Your order has been received and is being processed.
          </p>

          <div className="order-id-box">
            <span>Order ID</span>

            <strong>
              {orderId}
            </strong>
          </div>

        </div>

      </section>
    );
  }

  return (
    <section
      className="checkout-section"
      id="checkout"
    >

      <div className="checkout-heading">

        <span>SECURE CHECKOUT</span>

        <h2>
          Checkout 🛒
        </h2>

        <p>
          Complete your order securely and easily.
        </p>

      </div>


      <div className="checkout-container">

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="order-summary">

          <div className="checkout-card-title">

            <span>🧾</span>

            <div>
              <h3>Order Summary</h3>

              <p>
                {cart.length} product
                {cart.length !== 1 && "s"}
              </p>
            </div>

          </div>


          {cart.length === 0 ? (

            <div className="checkout-empty">

              <span>🛒</span>

              <p>
                Your cart is empty.
              </p>

            </div>

          ) : (

            <>

              <div className="checkout-products">

                {cart.map((product) => (

                  <div
                    className="checkout-item"
                    key={product.id}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <div className="checkout-product-info">

                      <h4>
                        {product.name}
                      </h4>

                      <p>
                        Qty: {product.quantity}
                      </p>

                    </div>

                    <strong>
                      $
                      {product.price *
                        product.quantity}
                    </strong>

                  </div>

                ))}

              </div>


              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ${total}
                </strong>

              </div>

            </>

          )}

        </div>


        {/* =========================
            CUSTOMER INFORMATION
        ========================= */}

        <div className="customer-info">

          <div className="checkout-card-title">

            <span>👤</span>

            <div>

              <h3>
                Customer Information
              </h3>

              <p>
                Enter your delivery details
              </p>

            </div>

          </div>


          <div className="checkout-form">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />


            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />


            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              placeholder="Enter your delivery address"
              value={formData.address}
              onChange={handleChange}
            />


            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>


          {error && (
            <p className="checkout-error">
              ⚠️ {error}
            </p>
          )}


          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
          >
            🔒 Place Order
          </button>

        </div>

      </div>

    </section>
  );
}

export default Checkout;