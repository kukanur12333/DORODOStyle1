import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { ShopHero } from '../components/organisms/ShopHero';
import { FeaturedCollectionBanner } from '../components/organisms/FeaturedCollectionBanner';
import { Bestsellers } from '../components/organisms/Bestsellers';
import { AIPromoBanner } from '../components/organisms/AIPromoBanner';
import { RewardsHighlight } from '../components/organisms/RewardsHighlight';
import { Pagination } from '../components/molecules/Pagination';
import { ProductCard } from '../components/molecules/ProductCard';
import { FilterSidebar } from '../components/organisms/FilterSidebar';
import { QuickViewModal } from '../components/molecules/QuickViewModal';
import { Button } from '../components/atoms/Button';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
    setTimeout(() => {
      const mockProducts = generateMockProducts(48);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.color) {
      // This is a mock filter. A real implementation would check product.colors array.
      filtered = filtered.filter(p => p.colors.some(c => c.toLowerCase().includes(filters.color.toLowerCase().substring(0, 3))));
    }
    if (filters.isAI) {
      filtered = filtered.filter(p => p.isAIGenerated);
    }
    if (filters.isLimited) {
      filtered = filtered.filter(p => p.isLimited);
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

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
      default:
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
    window.scrollTo(0, 200); // Scroll to top of shop section
  };

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Best Rating' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          <ShopHero />
          
          <div className="flex gap-8">
            <div className={`lg:block ${showFilters ? 'block fixed inset-0 bg-black/50 z-40 lg:static lg:bg-transparent' : 'hidden'}`}>
              <div className="bg-white lg:bg-transparent w-80 h-full overflow-y-auto lg:w-auto lg:h-auto p-4 lg:p-0">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-luxury p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="font-poppins text-gray-600">Showing {currentProducts.length} of {filteredAndSortedProducts.length} results</p>
                  <div className="flex items-center gap-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 font-poppins bg-white focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <SlidersHorizontal size={18} />
                      Filters
                    </Button>
                  </div>
                </div>
              </div>

              {currentProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        onQuickView={setQuickViewProduct}
                        isWishlisted={state.wishlist.includes(product.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 font-poppins text-lg">
                    Try adjusting your filters or check back later.
                  </p>
                </div>
              )}
              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
            </div>
          </div>

          <FeaturedCollectionBanner />
          <Bestsellers />
          <AIPromoBanner />
          <RewardsHighlight />
        </div>
      </div>
    </>
  );
};
