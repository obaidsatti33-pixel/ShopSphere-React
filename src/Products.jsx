import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Products({ addToCart, selectedCategory, searchTerm, setSelectedProduct, addToWishlist, wishlist }) {

  const [visibleCount, setVisibleCount] = useState(8); 

  const products = [
    // =========================
    // ELECTRONICS
    // =========================

    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 50,
      description: "High-quality wireless headphones with clear sound.",
      rating: 4.5,
      stock: 10,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 90,
      description: "Smart watch with fitness tracking and notifications.",
      rating: 4.6,
      stock: 8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
      id: 3,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 45,
      description: "Portable Bluetooth speaker with powerful sound.",
      rating: 4.4,
      stock: 12,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },

    {
      id: 4,
      name: "Gaming Mouse",
      category: "Electronics",
      price: 35,
      description: "Responsive gaming mouse with ergonomic design.",
      rating: 4.3,
      stock: 20,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },

    {
      id: 5,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 75,
      description: "Mechanical keyboard designed for gaming and productivity.",
      rating: 4.7,
      stock: 15,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
    },


    // =========================
    // FASHION
    // =========================

    {
      id: 6,
      name: "Leather Jacket",
      category: "Fashion",
      price: 120,
      description: "Premium leather jacket with a stylish modern design.",
      rating: 4.4,
      stock: 5,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    },

    {
      id: 7,
      name: "Casual T-Shirt",
      category: "Fashion",
      price: 25,
      description: "Comfortable cotton t-shirt for everyday wear.",
      rating: 4.2,
      stock: 25,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
      id: 8,
      name: "Denim Jacket",
      category: "Fashion",
      price: 80,
      description: "Classic denim jacket with a comfortable fit.",
      rating: 4.5,
      stock: 9,
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9"
    },

    {
      id: 9,
      name: "Classic Hoodie",
      category: "Fashion",
      price: 55,
      description: "Warm and comfortable hoodie for casual outfits.",
      rating: 4.6,
      stock: 18,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    },

    {
      id: 10,
      name: "Classic Sunglasses",
      category: "Fashion",
      price: 40,
      description: "Stylish sunglasses with a modern classic frame.",
      rating: 4.3,
      stock: 14,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },


    // =========================
    // SHOES
    // =========================

    {
      id: 11,
      name: "Running Shoes",
      category: "Shoes",
      price: 70,
      description: "Comfortable running shoes designed for daily workouts.",
      rating: 4.3,
      stock: 15,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
      id: 12,
      name: "Sports Sneakers",
      category: "Shoes",
      price: 85,
      description: "Lightweight sneakers perfect for sports and outdoor activities.",
      rating: 4.5,
      stock: 12,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
    },

    {
      id: 13,
      name: "Casual Sneakers",
      category: "Shoes",
      price: 65,
      description: "Trendy casual sneakers for everyday comfort.",
      rating: 4.4,
      stock: 16,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
    },

    {
      id: 14,
      name: "Classic Boots",
      category: "Shoes",
      price: 110,
      description: "Durable classic boots with a premium finish.",
      rating: 4.6,
      stock: 7,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },


    // =========================
    // FURNITURE
    // =========================

    {
      id: 15,
      name: "Modern Chair",
      category: "Furniture",
      price: 150,
      description: "Modern comfortable chair for home and office.",
      rating: 4.5,
      stock: 6,
      image: "https://images.unsplash.com/photo-1503602642458-232111445657"
    },

    {
      id: 16,
      name: "Wooden Table",
      category: "Furniture",
      price: 220,
      description: "Elegant wooden table with a minimalist design.",
      rating: 4.7,
      stock: 4,
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc"
    },

    {
      id: 17,
      name: "Comfort Sofa",
      category: "Furniture",
      price: 450,
      description: "Comfortable modern sofa perfect for living rooms.",
      rating: 4.8,
      stock: 3,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
    },


    // =========================
    // BEAUTY
    // =========================

    {
      id: 18,
      name: "Perfume",
      category: "Beauty",
      price: 60,
      description: "Elegant fragrance with a long-lasting fresh scent.",
      rating: 4.5,
      stock: 20,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
    },

    {
      id: 19,
      name: "Makeup Kit",
      category: "Beauty",
      price: 75,
      description: "Complete makeup kit for everyday beauty needs.",
      rating: 4.4,
      stock: 10,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    },

    {
      id: 20,
      name: "Skincare Set",
      category: "Beauty",
      price: 85,
      description: "Daily skincare set for a simple beauty routine.",
      rating: 4.6,
      stock: 12,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },

    {
      id: 21,
      name: "Basketball",
      category: "Sports",
      price: 35,
      description: "Durable basketball suitable for indoor and outdoor games.",
      rating: 4.5,
      stock: 12,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc"
    },

    {
      id: 22,
      name: "Football",
      category: "Sports",
      price: 40,
      description: "High-quality football designed for training and matches.",
      rating: 4.6,
      stock: 15,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55"
    },

    {
      id: 23,
      name: "Badminton Racket",
      category: "Sports",
      price: 55,
      description: "Lightweight badminton racket with a comfortable grip.",
      rating: 4.4,
      stock: 8,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea"
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // sirf visibleCount tak products dikhao (baaki "Load More" pe aayengi)
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // har click pe 8 aur products
  };

  // category ya search badalne par wapas 8 se shuru karo
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory, searchTerm]);

  return (
    <section id="products">
      <h2>Featured Products</h2>

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setSelectedProduct={setSelectedProduct}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>

      {/* Load More button — sirf tab dikhe jab aur products baaki hon */}
      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More Products ⬇
          </button>
        </div>
      )}

    </section>
  );
}

export default Products;