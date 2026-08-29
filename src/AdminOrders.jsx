import { useEffect, useState } from "react";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = () => {

    setLoading(true);

    fetch("http://localhost:3001/api/orders")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();

      })

      .then((data) => {

        const orderList =
          data.value || data || [];

        setOrders(orderList);

      })

      .catch((error) => {

        console.error(
          "Error fetching orders:",
          error
        );

      })

      .finally(() => {

        setLoading(false);

      });

  };


  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {

    fetchOrders();

  }, []);


  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const response = await fetch(

        `http://localhost:3001/api/orders/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({
            status
          })

        }

      );


      if (!response.ok) {

        throw new Error(
          "Failed to update status"
        );

      }


      alert(
        "Order status updated!"
      );


      fetchOrders();

    }

    catch (error) {

      console.error(
        "Update Status Error:",
        error
      );

      alert(
        "Something went wrong!"
      );

    }

  };


  // =========================
  // RETURN
  // =========================

  return (

    <section className="admin-orders">


      {/* HEADER */}

      <div className="admin-orders-header">

        <div>

          <h2>
            📦 Admin Orders
          </h2>

          <p>
            Manage customer orders
          </p>

        </div>


        <button
          onClick={fetchOrders}
          disabled={loading}
        >

          🔄{" "}
          {loading
            ? "Loading..."
            : "Refresh Orders"}

        </button>

      </div>


      {/* LOADING */}

      {loading ? (

        <p className="no-orders">
          Loading orders...
        </p>

      ) : orders.length === 0 ? (

        <p className="no-orders">
          No orders found.
        </p>

      ) : (


        /* ORDERS */

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >


              {/* ORDER HEADER */}

              <div className="order-header">


                {/* CUSTOMER INFO */}

                <div>

                  <h3>

                    Order #
                    {order._id
                      ? order._id.slice(-6)
                      : "N/A"}

                  </h3>


                  <p>

                    👤{" "}
                    {order.customerName ||
                      "Unknown Customer"}

                  </p>


                  <p>

                    📧{" "}
                    {order.customerEmail ||
                      "No email"}

                  </p>

                </div>


                {/* STATUS */}

                <div className="order-status">

                  <label>
                    Status
                  </label>


                  <select

                    value={
                      order.status ||
                      "Pending"
                    }

                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }

                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="order-products">

                {order.products?.map(
                  (product, index) => (

                    <div
                      className="order-product"
                      key={
                        product._id ||
                        `${order._id}-${index}`
                      }
                    >


                      {/* IMAGE */}

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


                      {/* PRODUCT INFO */}

                      <div>

                        <h4>
                          {product.name ||
                            "Unknown Product"}
                        </h4>

                        <p>
                          Qty:{" "}
                          {product.quantity ||
                            1}
                        </p>

                        <p>
                          Price: $
                          {Number(
                            product.price || 0
                          ).toFixed(2)}
                        </p>

                      </div>


                      {/* SUBTOTAL */}

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


              {/* ORDER FOOTER */}

              <div className="order-footer">

                <span>
                  Total
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

export default AdminOrders;