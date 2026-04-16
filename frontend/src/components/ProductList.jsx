import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

const categories = ["All", "Wood Plant", "Ayurved Plant", "Food Plant", "Fruit Plant", "Flower Plant", "Homemade Product"];

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/products` : 'http://localhost:5000/api/products');
      if (searchQuery) url.searchParams.append('search', searchQuery);
      if (activeCategory !== 'All') url.searchParams.append('category', activeCategory);

      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Products</h2>
          <div className="mt-2 h-1 w-24 bg-brand-green mx-auto rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Display */}
        {searchQuery && (
          <p className="mb-6 text-gray-600 text-center">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found matching your criteria.
          </div>
        )}
      </div>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
};

export default ProductList;
