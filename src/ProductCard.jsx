import { useState } from "react";

// Unsplash URL ko optimized size/quality me convert karta hai
function getOptimizedImage(url, width = 400) {
  if (!url) return "";
  return `${url}?auto=format&fit=crop&w=${width}&q=60`;
}

function ProductCard({
  product,
  addToCart,
  setSelectedProduct,
  addToWishlist,
  wishlist
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-container">

        {!loaded && !errored && (
          <div className="image-skeleton"></div>
        )}

        {!errored ? (
          <img
            src={getOptimizedImage(product.image)}
            alt={product.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`product-img ${loaded ? "loaded" : ""}`}
          />
        ) : (
          <div className="image-fallback">
            <span>📦</span>
          </div>
        )}

        <button
  className={`wishlist-button ${
    wishlist.some((item) => item.id === product.id)
      ? "active"
      : ""
  }`}
  onClick={() => addToWishlist(product)}
>
  {wishlist.some((item) => item.id === product.id) ? "♥" : "♡"}
</button>

      </div>


      {/* Product Information */}
      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        <div className="product-bottom">

          <p className="price">
            ${product.price}
          </p>

          <span className="stock">
            {product.stock} left
          </span>

        </div>


        {/* Buttons */}
        <div className="product-actions">

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>

          <button
            className="details-btn"
            onClick={() => setSelectedProduct(product)}
          >
            👁️ View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;