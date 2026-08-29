import { useEffect, useState } from "react";

function MyOrders({ loggedInUser }) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // FETCH CUSTOMER ORDERS
  // =========================

  useEffect(() => {

    if (!loggedInUser?.email) {
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:3001/api/orders/customer/${encodeURIComponent(
        loggedInUser.email
      )}`
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();

      })

      .then((data) => {

        setOrders(data.value || data || []);
        setError("");

      })

      .catch((error) => {

        console.error(
          "My Orders Error:",
          error
        );

        setError(
          "Unable to load your orders."
        );

      })

      .finally(() => {

        setLoading(false);

      });

  }, [loggedInUser]);


  // =========================
  // NOT LOGGED IN
  // =========================

  if (!loggedInUser) {

    return (

      <section className="my-orders">

        <div className="my-orders-empty">

          <h2>
            📦 My Orders
          </h2>

          <p>
            Please login to view your orders.
          </p>

        </div>

      </section>

    );

  }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <section className="my-orders">

        <h2>
          📦 My Orders
        </h2>

        <p>
          Loading your orders...
        </p>

      </section>

    );

  }


  // =========================
  // RETURN
  // =========================

  return (

    <section className="my-orders">


      {/* =========================
          HEADER
      ========================= */}

      <div className="my-orders-header">

        <span>
          ORDER HISTORY
        </span>

        <h2>
          📦 My Orders
        </h2>

        <p>
          View your orders and track their status.
        </p>

      </div>


      {/* ERROR */}

      {error && (

        <p className="my-orders-error">
          ⚠️ {error}
        </p>

      )}


      {/* =========================
          NO ORDERS
      ========================= */}

      {!error && orders.length === 0 ? (

        <div className="my-orders-empty">

          <div>
            🛒
          </div>

          <h3>
            No Orders Yet
          </h3>

          <p>
            You haven't placed any orders yet.
          </p>

        </div>

      ) : (


        /* =========================
           ORDERS
        ========================= */

        <div className="my-orders-list">

          {orders.map((order) => (

            <div
              className="my-order-card"
              key={order._id}
            >


              {/* =========================
                  ORDER HEADER
              ========================= */}

              <div className="my-order-header">

                <div>

                  <h3>
                    Order #
                    {order._id
                      ? order._id.slice(-6)
                      : "N/A"}
                  </h3>

                  <p>
                    👤 {order.customerName}
                  </p>

                </div>


                <div className="my-order-status">

                  <span>
                    Status
                  </span>

                  <strong>
                    {order.status || "Pending"}
                  </strong>

                </div>

              </div>


              {/* =========================
                  ORDER TRACKING
              ========================= */}

              <div className="order-tracking">

                {[
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Delivered"
                ].map((status, index) => {

                  const statuses = [
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered"
                  ];

                  const currentStatus =
                    order.status || "Pending";

                  const currentIndex =
                    statuses.indexOf(currentStatus);

                  return (

                    <div
                      className={`tracking-step ${
                        index <= currentIndex
                          ? "completed"
                          : ""
                      } ${
                        index === currentIndex
                          ? "active"
                          : ""
                      }`}
                      key={status}
                    >

                      <div className="tracking-circle">

                        {index < currentIndex
                          ? "✓"
                          : index + 1}

                      </div>


                      <span>
                        {status}
                      </span>


                      {index <
                        statuses.length - 1 && (

                        <div
                          className={`tracking-line ${
                            index < currentIndex
                              ? "completed"
                              : ""
                          }`}
                        />

                      )}

                    </div>

                  );

                })}

              </div>


              {/* =========================
                  PRODUCTS
              ========================= */}

              <div className="my-order-products">

                {order.products?.map(
                  (product, index) => (

                    <div
                      className="my-order-product"
                      key={
                        product._id ||
                        `${order._id}-${index}`
                      }
                    >

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={
                          product.name ||
                          "Product"
                        }
                      />


                      <div>

                        <h4>
                          {product.name}
                        </h4>

                        <p>
                          Quantity:{" "}
                          {product.quantity}
                        </p>

                        <p>
                          Price: $
                          {Number(
                            product.price || 0
                          ).toFixed(2)}
                        </p>

                      </div>


                      <strong>

                        $
                        {(
                          Number(
                            product.price || 0
                          ) *
                          Number(
                            product.quantity || 1
                          )
                        ).toFixed(2)}

                      </strong>

                    </div>

                  )
                )}

              </div>


              {/* =========================
                  TOTAL
              ========================= */}

              <div className="my-order-footer">

                <span>
                  Total Amount
                </span>

                <strong>

                  $
                  {Number(
                    order.totalAmount || 0
                  ).toFixed(2)}

                </strong>

              </div>


            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default MyOrders;