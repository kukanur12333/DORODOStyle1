import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export const AIPromoBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 my-16 text-center"
    >
      <Sparkles className="mx-auto text-primary-gold mb-4" size={32} />
      <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
        Unleash Your Creativity
      </h2>
      <p className="font-poppins text-lg text-gray-300 max-w-2xl mx-auto mb-6">
        Step into our AI Studio and bring your unique fashion ideas to life. From prompt to product in minutes.
      </p>
      <Link to="/ai-studio">
        <Button variant="gold" size="lg" className="group">
          Explore AI Studio
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
};
