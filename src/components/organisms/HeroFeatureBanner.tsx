import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export const HeroFeatureBanner: React.FC = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] bg-black text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=1200&fit=crop&q=80')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-primary-gold" />
            <span className="text-sm font-montserrat">Exclusive AI Drop #07</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight mb-6">
            Cyber Streetwear Collection
          </h1>
          
          <p className="text-xl text-gray-300 font-poppins max-w-2xl mx-auto mb-8">
            Experience the fusion of high-tech aesthetics and urban style. Limited edition hoodies, sneakers, and more.
          </p>

          <Link to="/shop">
            <Button variant="gold" size="xl" className="group">
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
