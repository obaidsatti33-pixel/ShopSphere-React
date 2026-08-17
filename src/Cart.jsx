function Cart({
  cart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
}) {
  const total = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <section className="cart-section" id="cart">

      <div className="cart-heading">
        <span>SHOPPING CART</span>
        <h2>Your Cart 🛒</h2>
        <p>Review your items before checkout.</p>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart-box">
          <div className="empty-cart-icon">🛒</div>

          <h3>Your cart is empty</h3>

          <p>
            Add some products to your cart and they will appear here.
          </p>
        </div>

      ) : (

        <div className="cart-layout">

          {/* Cart Items */}

          <div className="cart-items">

            {cart.map((product) => (

              <div className="cart-card" key={product.id}>

                {/* Image */}

                <div className="cart-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>


                {/* Product Info */}

                <div className="cart-info">

                  <span className="cart-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="cart-price">
                    ${product.price}
                  </p>

                </div>


                {/* Quantity */}

                <div className="cart-quantity">

                  <span>Quantity</span>

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      −
                    </button>

                    <strong>
                      {product.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* Item Total */}

                <div className="cart-item-total">

                  <span>Total</span>

                  <strong>
                    ${product.price * product.quantity}
                  </strong>

                </div>


                {/* Remove */}

                <button
                  className="remove-cart"
                  onClick={() =>
                    removeFromCart(
                      cart.findIndex(
                        (item) => item.id === product.id
                      )
                    )
                  }
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>


          {/* Summary */}

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>
              <span>
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                document
                  .getElementById("checkout")
                  .scrollIntoView({
                    behavior: "smooth"
                  });
              }}
            >
              Proceed to Checkout →
            </button>

            <button
              className="clear-cart"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </div>

      )}

    </section>
  );
}

export default Cart;