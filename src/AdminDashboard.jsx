import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // =========================
  // FETCH PRODUCTS & ORDERS
  // =========================

  useEffect(() => {

    // Products
    fetch("http://localhost:3001/api/products")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();

      })

      .then((data) => {

        setProducts(
          data.value || data || []
        );

      })

      .catch((error) => {

        console.error(
          "Products Error:",
          error
        );

      });


    // Orders
    fetch("http://localhost:3001/api/orders")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        return res.json();

      })

      .then((data) => {

        setOrders(
          data.value || data || []
        );

      })

      .catch((error) => {

        console.error(
          "Orders Error:",
          error
        );

      });

  }, []);


  // =========================
  // TOTAL SALES
  // =========================

  const totalSales = orders.reduce(

    (total, order) => {

      return (
        total +
        Number(order.totalAmount || 0)
      );

    },

    0

  );


  // =========================
  // PENDING ORDERS
  // =========================

  const pendingOrders =
    orders.filter(

      (order) =>
        order.status?.toLowerCase() ===
        "pending"

    ).length;


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem(
      "isAdmin"
    );

    window.location.href = "/admin";

  };


  // =========================
  // RETURN
  // =========================

  return (

    <section className="admin-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>

          <h1>
            📊 Admin Dashboard
          </h1>

          <p>
            Welcome to ShopSphere Admin Panel
          </p>

        </div>


        <div className="dashboard-actions">

          <button
            onClick={() =>
              navigate("/admin/products")
            }
          >
            📦 Manage Products
          </button>


          <button
            onClick={() =>
              navigate("/admin/orders")
            }
          >
            🛒 Manage Orders
          </button>


          <button
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="dashboard-stats">


        {/* PRODUCTS */}

        <div className="stat-card">

          <span>📦</span>

          <div>

            <h3>
              Total Products
            </h3>

            <strong>
              {products.length}
            </strong>

          </div>

        </div>


        {/* ORDERS */}

        <div className="stat-card">

          <span>🛒</span>

          <div>

            <h3>
              Total Orders
            </h3>

            <strong>
              {orders.length}
            </strong>

          </div>

        </div>


        {/* SALES */}

        <div className="stat-card">

          <span>💰</span>

          <div>

            <h3>
              Total Sales
            </h3>

            <strong>
              ${totalSales.toFixed(2)}
            </strong>

          </div>

        </div>


        {/* PENDING */}

        <div className="stat-card">

          <span>⏳</span>

          <div>

            <h3>
              Pending Orders
            </h3>

            <strong>
              {pendingOrders}
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="recent-orders">

        <h2>
          📋 Recent Orders
        </h2>


        {orders.length === 0 ? (

          <p>
            No orders found.
          </p>

        ) : (

          orders
            .slice(0, 5)
            .map((order) => (

              <div
                className="dashboard-order"
                key={order._id}
              >


                {/* CUSTOMER */}

                <div>

                  <strong>

                    Order #
                    {order._id
                      ? order._id.slice(-6)
                      : "N/A"}

                  </strong>

                  <p>
                    👤{" "}
                    {order.customerName ||
                      "Unknown Customer"}
                  </p>

                </div>


                {/* ORDER INFO */}

                <div>

                  <strong>

                    $
                    {Number(
                      order.totalAmount || 0
                    ).toFixed(2)}

                  </strong>

                  <p>

                    Status:{" "}
                    {order.status ||
                      "Pending"}

                  </p>

                </div>


              </div>

            ))

        )}

      </div>

    </section>

  );

}

export default AdminDashboard;