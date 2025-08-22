import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { generateMockProducts } from '../../utils/mockData';
import { Button } from '../atoms/Button';
import { ArrowRight } from 'lucide-react';

export const MiniCart: React.FC = () => {
  const { state } = useApp();
  const mockProducts = generateMockProducts(20); // Generate a pool of products to pull from

  const cartItemsDetails = state.cart.map(cartItem => {
    const product = mockProducts.find(p => p.id === cartItem.productId);
    return product ? { ...cartItem, product } : null;
  }).filter(Boolean).slice(0, 3); // Show max 3 items

  const subtotal = cartItemsDetails.reduce((acc, item) => {
    return acc + (item?.product?.price || 0) * item!.quantity;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-luxury p-4 z-20"
    >
      <h3 className="font-montserrat font-semibold text-lg mb-4 px-2">Your Cart</h3>
      
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {cartItemsDetails.map(item => (
          <div key={item?.product.id} className="flex gap-4">
            <img src={item?.product.image} alt={item?.product.name} className="w-16 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-poppins font-semibold text-sm line-clamp-2">{item?.product.name}</p>
              <p className="text-xs text-gray-500">Qty: {item?.quantity}</p>
              <p className="font-montserrat font-bold text-sm mt-1">${item?.product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {state.cart.length > 3 && (
        <p className="text-center text-xs text-gray-500 mt-2">
          + {state.cart.length - 3} more items
        </p>
      )}

      <div className="border-t mt-4 pt-4 space-y-3">
        <div className="flex justify-between font-poppins font-semibold">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <Link to="/cart">
          <Button variant="primary" size="md" className="w-full group">
            View Cart & Checkout
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
