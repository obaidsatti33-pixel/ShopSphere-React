function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <div id="wishlist">

      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>Category: {product.category}</p>

              <p className="price">${product.price}</p>

              <p>⭐ {product.rating}</p>

              <button
                onClick={() => removeFromWishlist(product.id)}
              >
                ❌ Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;