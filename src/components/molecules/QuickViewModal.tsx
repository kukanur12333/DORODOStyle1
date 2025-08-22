import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
    }
  }, [product]);

  if (!product) return null;

  const isWishlisted = state.wishlist.includes(product.id);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      }
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-luxury w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 text-right sticky top-0 bg-white z-10">
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
                <X size={20} />
              </Button>
            </div>
            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="w-full">
                <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-xl" />
              </div>
              
              {/* Details */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold font-montserrat">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 font-poppins line-clamp-3">{product.description}</p>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900 font-montserrat">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through font-poppins">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-montserrat font-semibold mb-2">Size: <span className="font-normal">{selectedSize}</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-1 border rounded-lg text-sm transition-colors ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="font-montserrat font-semibold mb-2">Color: <span className="font-normal">{selectedColor}</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-black scale-110' : 'border-transparent'}`} style={{backgroundColor: color.toLowerCase()}} />
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2"><Minus size={16} /></button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-2"><Plus size={16} /></button>
                  </div>
                  <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
                    <ShoppingBag size={18} /> Add to Cart
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                    <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
