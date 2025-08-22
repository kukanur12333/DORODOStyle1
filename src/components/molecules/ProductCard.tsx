import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isWishlisted = false,
  className,
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 overflow-hidden group ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isAIGenerated && <Badge variant="ai" size="sm">AI</Badge>}
          {product.isLimited && <Badge variant="limited" size="sm">Limited</Badge>}
          {product.originalPrice && (
            <Badge variant="sale" size="sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
        
        {/* Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={() => onToggleWishlist?.(product.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-primary-red text-primary-red' : 'text-gray-600'}
            />
          </motion.button>
          
          <motion.button
            onClick={() => onQuickView?.(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye size={18} className="text-gray-600" />
          </motion.button>
        </div>
        
        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart?.(product.id)}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500 font-poppins">{product.brand}</p>
          <h3 className="font-montserrat font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 font-poppins">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 font-montserrat">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-poppins">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="limited" size="sm">
              Only {product.stock} left
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
};
