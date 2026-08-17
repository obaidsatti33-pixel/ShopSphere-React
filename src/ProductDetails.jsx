function ProductDetails({
  product,
  closeDetails,
  addToCart,
  addToWishlist
}) {
  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="product-modal">

        {/* Close */}
        <button
          onClick={closeDetails}
          className="close-btn"
        >
          ✕
        </button>


        {/* Product Image */}

        <div className="product-detail-image-box">

          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />

        </div>


        {/* Product Information */}

        <div className="product-detail-info">

          <span className="detail-category">
            {product.category}
          </span>

          <h2>
            {product.name}
          </h2>

          <div className="detail-rating">
            ⭐ {product.rating}
            <span>
              Customer Rating
            </span>
          </div>


          <div className="detail-price">
            ${product.price}
          </div>


          <div className="detail-stock">
            📦 {product.stock} items available
          </div>


          <p className="detail-description">
            {product.description}
          </p>


          {/* Actions */}

          <div className="detail-actions">

            <button
              className="detail-add-cart"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>

            <button
              className="detail-wishlist"
              onClick={() => addToWishlist(product)}
            >
              ❤️ Wishlist
            </button>

          </div>


          <button
            className="detail-close"
            onClick={closeDetails}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;