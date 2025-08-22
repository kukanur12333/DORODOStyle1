import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../molecules/ProductCard';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Flame } from 'lucide-react';

export const Bestsellers: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(generateMockProducts(8));
  }, []);

  const handleAddToCart = (productId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId, quantity: 1 } });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="text-orange-500" size={24} />
          <h2 className="text-3xl font-bold font-montserrat text-gray-900">
            Customer Favorites
          </h2>
        </div>
        <p className="text-lg text-gray-600 font-poppins">
          The most loved pieces, chosen by our community.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={state.wishlist.includes(product.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
