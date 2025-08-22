import React from 'react';
import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../atoms/Button';
import { PRODUCT_CATEGORIES, FILTER_COLORS } from '../../utils/constants';

interface Filters {
  category: string;
  priceRange: [number, number];
  brand: string;
  color: string;
  isAI: boolean;
  isLimited: boolean;
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  onClose,
}) => {
  const brands = ['DORODOStyle', 'LuxeAI', 'EliteWear', 'PremiumCraft', 'ArtisanLux'];

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      priceRange: [0, 2000],
      brand: '',
      color: '',
      isAI: false,
      isLimited: false,
      inStock: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-luxury p-6 sticky top-8 lg:top-24 h-fit"
    >
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <h3 className="font-montserrat font-semibold text-lg">Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <h4 className="font-montserrat font-medium mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={() => handleFilterChange('category', '')}
                className="w-4 h-4 text-primary-gold focus:ring-primary-gold"
              />
              <span className="text-sm font-poppins">All</span>
            </label>
            {PRODUCT_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-4 h-4 text-primary-gold focus:ring-primary-gold"
                />
                <span className="text-sm font-poppins">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-montserrat font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.priceRange[1]}
              onChange={(e) => 
                handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-gold"
            />
            <div className="flex justify-between text-sm font-poppins text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div>
          <h4 className="font-montserrat font-medium mb-3">Brand</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                value=""
                checked={filters.brand === ''}
                onChange={() => handleFilterChange('brand', '')}
                className="w-4 h-4 text-primary-gold focus:ring-primary-gold"
              />
              <span className="text-sm font-poppins">All</span>
            </label>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-4 h-4 text-primary-gold focus:ring-primary-gold"
                />
                <span className="text-sm font-poppins">{brand}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Color */}
        <div>
          <h4 className="font-montserrat font-medium mb-3">Color</h4>
          <div className="flex flex-wrap gap-3">
            {FILTER_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleFilterChange('color', filters.color === color.name ? '' : color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.color === color.name
                    ? 'ring-2 ring-offset-2 ring-primary-black'
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* Special Filters */}
        <div>
          <h4 className="font-montserrat font-medium mb-3">Special</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isAI}
                onChange={(e) => handleFilterChange('isAI', e.target.checked)}
                className="w-4 h-4 text-primary-gold rounded focus:ring-primary-gold"
              />
              <span className="text-sm font-poppins">AI Generated</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isLimited}
                onChange={(e) => handleFilterChange('isLimited', e.target.checked)}
                className="w-4 h-4 text-primary-gold rounded focus:ring-primary-gold"
              />
              <span className="text-sm font-poppins">Limited Edition</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="w-4 h-4 text-primary-gold rounded focus:ring-primary-gold"
              />
              <span className="text-sm font-poppins">In Stock</span>
            </label>
          </div>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full mt-4">
          Clear All Filters
        </Button>
      </div>
    </motion.div>
  );
};
