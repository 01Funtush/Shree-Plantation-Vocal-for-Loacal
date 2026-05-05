import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Lazy load modals since they only appear on interaction
const ProductDetailModal = lazy(() => import('./ProductDetailModal'));
const OrderModal = lazy(() => import('./OrderModal'));

const categories = ["All", "Wood Plant", "Ayurved Plant", "Food Plant", "Fruit Plant", "Flower Plant", "Homemade Product"];

const ProductList = ({ content, searchQuery, onCategorySelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderingProduct, setOrderingProduct] = useState(null);
  
  const scrollContainerRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = new URL(`${baseUrl}/api/products`);
      if (activeCategory !== 'All') url.searchParams.append('category', activeCategory);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // We don't setProducts([]) on error so we don't clear the grid if the network blips
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, [activeCategory]); // Refetch on category change, and keep polling

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (onCategorySelect) onCategorySelect();
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!searchQuery) return true;
      
      const rawQuery = searchQuery.toLowerCase().trim();
      const synonyms = {
        'pickle': 'achar',
        'tree': 'plant',
        'dawa': 'ayurved',
        'aachar': 'achar',
        'plants': 'plant'
      };
      
      let processedQuery = rawQuery;
      Object.keys(synonyms).forEach(key => {
        processedQuery = processedQuery.replace(new RegExp(key, 'g'), synonyms[key]);
      });
      
      const queryParts = processedQuery.split(/\s+/);
      const name = (product.name || '').toLowerCase();
      const desc = (product.description || '').toLowerCase();
      const searchableText = name + ' ' + desc;
      
      // Fuzzy matching: remove spaces and check if the continuous string contains the query
      const fuzzyText = searchableText.replace(/\s+/g, '');
      const fuzzyQuery = processedQuery.replace(/\s+/g, '');
      
      return queryParts.every(part => searchableText.includes(part)) || fuzzyText.includes(fuzzyQuery);
    });
  }, [products, searchQuery]);

  return (
    <section id="products" className="py-16 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Scroll Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6">
          <h2 className="text-3xl font-sans font-extrabold text-brand-dark sm:text-4xl tracking-tight">
            {content?.productsHeadline || "Nature’s Favorites"}
          </h2>
          
          <div className="flex items-center gap-2 mt-4 sm:mt-0 hidden sm:flex">
            <button onClick={scrollLeft} className="p-2.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5 text-brand-dark" />
            </button>
            <button onClick={scrollRight} className="p-2.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5 text-brand-dark" />
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2.5 mb-8 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2 shrink-0 snap-start ${
                activeCategory === cat
                  ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                  : 'bg-white text-brand-dark border-gray-200 hover:border-brand-forest hover:text-brand-forest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Display */}
        {searchQuery && (
          <p className="mb-6 text-gray-600">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        )}

        {/* Product Horizontal Carousel */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div 
            ref={scrollContainerRef} 
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onClick={() => setSelectedProduct(product)}
                onOrderClick={(p) => setOrderingProduct(p)}
                className="w-72 sm:w-[320px] md:w-full shrink-0 md:shrink snap-start"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm mx-auto max-w-2xl">
            <p className="text-gray-500 text-xl font-medium mb-2">Oops! No plants found for "{searchQuery}".</p>
            <p className="text-gray-400">Try searching for Achar or Wood plants, or click a category above.</p>
          </div>
        )}
      </div>
      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onOrderClick={() => {
              setOrderingProduct(selectedProduct);
              setSelectedProduct(null);
            }}
          />
        )}

        {/* Order Modal */}
        {orderingProduct && (
          <OrderModal 
            product={orderingProduct} 
            onClose={() => setOrderingProduct(null)} 
          />
        )}
      </Suspense>
    </section>
  );
};

export default ProductList;
