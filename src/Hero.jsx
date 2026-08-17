function Hero() {
  function scrollToProducts() {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <section id="home" className="hero">

      <div className="hero-content">

        <p className="hero-small-text">
          ✨ Your Favorite Store
        </p>

        <h1>
          Shop Smart.
          <br />
          Live Better.
        </h1>

        <p className="hero-description">
          Discover amazing products, great prices and everything
          you need — all in one place.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-primary-btn"
            onClick={scrollToProducts}
          >
            Shop Now →
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() => {
              document.getElementById("products").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Explore Products
          </button>
        </div>

        <div className="hero-stats">

          <div>
            <strong>20+</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>5</strong>
            <span>Categories</span>
          </div>

          <div>
            <strong>4.5★</strong>
            <span>Average Rating</span>
          </div>

        </div>

      </div>

      <div className="hero-image">
        <div className="hero-image-card">
          🛍️
        </div>

        <div className="floating-card">
          ⭐ 4.5 Rating
        </div>

        <div className="floating-card second">
          🔥 Best Deals
        </div>
      </div>

    </section>
  );
}

export default Hero;