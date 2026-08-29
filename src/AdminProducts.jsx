import { useEffect, useState } from "react";

function AdminProducts() {

  // Admin Logout
  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin";
  };

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    rating: "",
    stock: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Products
  const fetchProducts = () => {
    fetch("https://shop-sphere-backend-sooty.vercel.app/api/products")
      .then((response) => response.json())
      .then((data) => {

        console.log("Products API Response:", data);

        setProducts(
          Array.isArray(data)
            ? data
            : data.value || []
        );

      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add / Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      rating: Number(form.rating),
      stock: Number(form.stock),
      image: form.image
    };

    try {

      const url = editingId
  ? `https://shop-sphere-backend-sooty.vercel.app/api/products/${editingId}`
  : "https://shop-sphere-backend-sooty.vercel.app/api/products";

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      alert(
        editingId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      resetForm();
      fetchProducts();

    } catch (error) {

      console.error(
        "Error saving product:",
        error
      );

      alert("Something went wrong!");

    }
  };

  // Edit Product
  const handleEdit = (product) => {

    setEditingId(product._id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
      description: product.description || "",
      rating: product.rating || "",
      stock: product.stock || "",
      image: product.image || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Delete Product
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
  `https://shop-sphere-backend-sooty.vercel.app/api/products/${id}`,
  {
    method: "DELETE"
  }
);

      if (!response.ok) {
        throw new Error(
          "Failed to delete product"
        );
      }

      alert(
        "Product deleted successfully!"
      );

      fetchProducts();

    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

      alert("Something went wrong!");

    }
  };

  // Reset Form
  const resetForm = () => {

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      rating: "",
      stock: "",
      image: ""
    });

    setEditingId(null);
  };


  // ==============================
  // ADMIN STATISTICS
  // ==============================

  const totalProducts = products.length;

  const totalProductValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
      Number(product.stock || 0),
    0
  );

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (total, product) =>
              total +
              Number(product.rating || 0),
            0
          ) / products.length
        ).toFixed(1)
      : "0.0";

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) <= 10
  ).length;


  return (

    <section className="admin-products">

      {/* ==============================
          ADMIN HEADER
      ============================== */}

      <div className="admin-header">

        <h2>
          Admin Product Management
        </h2>

        <button
          type="button"
          onClick={handleAdminLogout}
          className="admin-logout"
        >
          🚪 Logout
        </button>

      </div>


      {/* ==============================
          ADMIN STATS
      ============================== */}

      <div className="admin-stats">

        <div className="admin-stat-card">

          <h3>
            📦 Total Products
          </h3>

          <p>
            {totalProducts}
          </p>

        </div>


        <div className="admin-stat-card">

          <h3>
            💰 Product Value
          </h3>

          <p>
            ${totalProductValue.toFixed(2)}
          </p>

        </div>


        <div className="admin-stat-card">

          <h3>
            ⭐ Average Rating
          </h3>

          <p>
            {averageRating}
          </p>

        </div>


        <div className="admin-stat-card">

          <h3>
            ⚠️ Low Stock
          </h3>

          <p>
            {lowStockProducts}
          </p>

        </div>

      </div>


      {/* ==============================
          ADD / EDIT PRODUCT FORM
      ============================== */}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="rating"
          placeholder="Rating"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
        />


        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />


        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />


        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />


        <button type="submit">

          {editingId
            ? "Update Product"
            : "Add Product"}

        </button>


        {editingId && (

          <button
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>

        )}

      </form>


      {/* ==============================
          PRODUCT LIST
      ============================== */}

      <div className="admin-product-list">

        {products.length === 0 ? (

          <p>
            No products found.
          </p>

        ) : (

          products.map((product) => (

            <div
              key={product._id}
              className="admin-product-card"
            >

              <img
                src={product.image}
                alt={product.name}
                width="120"
              />


              <h3>
                {product.name}
              </h3>


              <p>
                Price: ${product.price}
              </p>


              <p>
                Category: {product.category}
              </p>


              <p>
                Rating: ⭐ {product.rating}
              </p>


              <p>
                Stock: {product.stock}
              </p>


              {/* Edit / Delete */}

              <div
                style={{
                  marginTop: "15px"
                }}
              >

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(product)
                  }
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    marginRight: "10px",
                    background: "blue",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default AdminProducts;