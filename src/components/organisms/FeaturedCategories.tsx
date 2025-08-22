import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export const FeaturedCategories: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
      description: 'Modern essentials for him',
      productCount: 312,
    },
    {
      id: '2',
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
      description: 'Elegant styles for her',
      productCount: 489,
    },
    {
      id: '3',
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6a121093?w=400&h=500&fit=crop',
      description: 'Playful and stylish outfits',
      productCount: 124,
    },
    {
      id: '4',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1576426863848-c21f68c6aa98?w=400&h=500&fit=crop',
      description: 'Finish your look with flair',
      productCount: 257,
    },
    {
      id: '5',
      name: 'Trading',
      image: 'https://images.unsplash.com/photo-1642060281817-8d5933d57a2f?w=400&h=500&fit=crop',
      description: 'Crypto-inspired luxury goods',
      productCount: 88,
    },
  ];

  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);

    return () => window.removeEventListener('resize', calculateWidth);
  }, []);


  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover our curated collections featuring AI-generated exclusives and luxury essentials
          </p>
        </motion.div>

        {/* Categories Carousel */}
        <motion.div ref={carousel} className="cursor-grab" whileTap={{ cursor: "grabbing" }}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8 mb-12"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="group relative bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-500 overflow-hidden cursor-pointer min-w-[300px] md:min-w-[350px]"
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold font-montserrat mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-poppins">{category.productCount} items</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
