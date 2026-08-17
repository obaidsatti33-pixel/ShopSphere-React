function Categories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Furniture",
    "Beauty",
    "Sports"
  ];

  return (
    <section className="categories-section">

      <div className="section-heading">
        <span>EXPLORE</span>
        <h2>Shop by Category</h2>
        <p>Find exactly what you're looking for.</p>
      </div>

      <div className="categories-container">

        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category === "All" && "✨ "}
            {category === "Electronics" && "💻 "}
            {category === "Fashion" && "👕 "}
            {category === "Shoes" && "👟 "}
            {category === "Furniture" && "🪑 "}
            {category === "Beauty" && "💄 "}
            {category === "Sports" && "⚽ "}

            {category}
          </button>
        ))}

      </div>

    </section>
  );
}

export default Categories;