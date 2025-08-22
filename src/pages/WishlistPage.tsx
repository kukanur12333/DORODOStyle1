import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/molecules/ProductCard';
import { Button } from '../components/atoms/Button';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';

export const WishlistPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const mockProducts = generateMockProducts(10);
  
  const wishlistProducts = mockProducts.filter(product => 
    state.wishlist.includes(product.id)
  );

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 font-poppins mb-6">
            Save items you love for later by clicking the heart icon.
          </p>
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-montserrat text-gray-900">
              My Wishlist
            </h1>
            <p className="text-gray-600 font-poppins mt-2">
              {wishlistProducts.length} items saved for later
            </p>
          </div>
          
          <Button variant="outline">
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
