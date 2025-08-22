import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '../molecules/ProductCard';
import { Button } from '../atoms/Button';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export const TrendingProducts: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [animationWidth, setAnimationWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trendingProducts = generateMockProducts(8);
    // Duplicate products for a seamless loop
    setProducts([...trendingProducts, ...trendingProducts]);
  }, []);

  useEffect(() => {
    const calculateWidth = () => {
      if (carouselRef.current) {
        // The animation should move by the width of the original set of products
        const halfScrollWidth = carouselRef.current.scrollWidth / 2;
        setAnimationWidth(halfScrollWidth);
      }
    };

    // Calculate width after products are rendered to ensure accuracy
    const timer = setTimeout(calculateWidth, 100);
    window.addEventListener('resize', calculateWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateWidth);
    };
  }, [products]);

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 },
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="text-orange-500" size={24} />
            <h2 className="text-4xl font-bold font-montserrat text-gray-900">
              Trending Now
            </h2>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover the most coveted pieces from our luxury collection and AI-generated exclusives
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex gap-6 mb-12"
            animate={{
              x: [0, -animationWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 50, // Slower duration for a smoother scroll
                ease: 'linear',
              },
            }}
          >
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={state.wishlist.includes(product.id)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center px-4 sm:px-6 lg:px-8"
        >
          <Button variant="outline" size="lg" className="group">
            View All Trending
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
