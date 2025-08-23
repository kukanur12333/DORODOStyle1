import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/molecules/ProductCard';
import { FilterSidebar } from '../components/organisms/FilterSidebar';
import { QuickViewModal } from '../components/molecules/QuickViewModal';
import { Pagination } from '../components/molecules/Pagination';
import { Button } from '../components/atoms/Button';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';
import { Product } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    brand: '',
    color: '',
    isAI: false,
    isLimited: false,
    inStock: true,
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // In a real app, you'd fetch based on the query. Here we just filter the mock data.
      const allProducts = generateMockProducts(100);
      const searchResults = query 
        ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
        : allProducts;
      setProducts(searchResults);
      setLoading(false);
    }, 500);
  }, [query]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    // ... other filters
    
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured' or 'best match'
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleAddToCart = (productId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId, quantity: 1 } });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const sortOptions = [
    { value: 'featured', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Best Rating' },
  ];

  return (
    <>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold font-montserrat">Search Results for "{query}"</h1>
            <p className="text-gray-600 mt-1">{filteredAndSortedProducts.length} results found</p>
          </motion.div>

          <div className="flex gap-8">
            <div className={`lg:block ${showFilters ? 'block fixed inset-0 bg-black/50 z-40 lg:static lg:bg-transparent' : 'hidden'}`}>
              <div className="bg-white lg:bg-transparent w-80 h-full overflow-y-auto lg:w-auto lg:h-auto p-4 lg:p-0">
                <FilterSidebar filters={filters} onFiltersChange={handleFilterChange} onClose={() => setShowFilters(false)} />
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-luxury p-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="font-poppins text-gray-600">Showing {currentProducts.length} of {filteredAndSortedProducts.length} results</p>
                  <div className="flex items-center gap-4">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 font-poppins bg-white focus:ring-2 focus:ring-primary-gold focus:border-transparent">
                      {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                      <SlidersHorizontal size={18} /> Filters
                    </Button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-96"><LoadingSpinner size="lg" /></div>
              ) : currentProducts.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <ProductCard product={product} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} onQuickView={setQuickViewProduct} isWishlisted={state.wishlist.includes(product.id)} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-500 font-poppins text-lg">We couldn't find anything for "{query}". Try a different search.</p>
                </div>
              )}
              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
