import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products({
  products: backendProducts,
  addToCart,
  selectedCategory,
  searchTerm,
  setSelectedProduct,
  addToWishlist,
  wishlist
}) {
  const [visibleCount, setVisibleCount] = useState(8);

  // Products backend se aa rahe hain
  const products = backendProducts || [];

  // Category + Search filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sirf visible products show karo
  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  // Load More
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // Category ya search change hone par 8 se start
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory, searchTerm]);

  return (
    <section id="products">

      <h2>Featured Products</h2>

      <div className="products-grid">

        {visibleProducts.length > 0 ? (

          visibleProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              setSelectedProduct={setSelectedProduct}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          ))

        ) : (

          <p>No products found.</p>

        )}

      </div>

      {/* Load More button */}
      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">

          <button
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            Load More Products ⬇
          </button>

        </div>
      )}

    </section>
  );
}

export default Products;