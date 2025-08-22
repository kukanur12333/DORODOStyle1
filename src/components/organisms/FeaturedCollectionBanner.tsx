import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../atoms/Button';

export const FeaturedCollectionBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 md:p-12 overflow-hidden my-16"
    >
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full"></div>
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-montserrat font-semibold text-primary-gold mb-2">Seasonal Collection</p>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Winter '25 AI Exclusives
          </h2>
          <p className="font-poppins text-lg text-purple-100 mb-6">
            Discover unique, AI-crafted pieces designed for the modern winter aesthetic. Limited availability.
          </p>
          <Button variant="gold" size="lg" className="group">
            Shop The Collection
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=500&h=400&fit=crop"
            alt="Winter Collection"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </motion.div>
  );
};
