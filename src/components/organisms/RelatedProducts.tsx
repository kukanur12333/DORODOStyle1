import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../molecules/ProductCard';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
}) => {
  const { state, dispatch } = useApp();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = generateMockProducts(4).filter(p => p.id !== currentProductId);
    setRelatedProducts(products);
  }, [currentProductId]);

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold font-montserrat text-gray-900">
          You Might Also Like
        </h2>
        <p className="text-gray-600 font-poppins mt-2">
          Similar products from the {category} collection
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
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
