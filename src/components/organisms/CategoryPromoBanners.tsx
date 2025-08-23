import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: "Men's Streetwear",
    subtitle: "From ₹1,499",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ccfb6e1a?w=600&q=80",
    link: "/shop"
  },
  {
    title: "Women's AI-Designed Dresses",
    subtitle: "Shop Now",
    image: "https://images.unsplash.com/photo-1595954402439-99a4954f0445?w=600&q=80",
    link: "/shop"
  },
  {
    title: "Accessories with Digital Collectibles",
    subtitle: "Explore",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    link: "/shop"
  }
];

export const CategoryPromoBanners: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.link}>
                <div className="relative rounded-2xl overflow-hidden shadow-luxury group h-96">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold font-montserrat mb-2">{category.title}</h3>
                    <div className="flex items-center gap-2 text-primary-gold font-semibold group-hover:underline">
                      <span>{category.subtitle}</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
