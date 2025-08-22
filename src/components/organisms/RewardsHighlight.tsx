import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export const RewardsHighlight: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-white rounded-2xl shadow-luxury p-8 my-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Award className="text-primary-gold" size={40} />
          <div>
            <h3 className="text-xl font-bold font-montserrat">Play, Earn & Shop Smarter</h3>
            <p className="text-gray-600 font-poppins">Join our rewards program and earn points with every game.</p>
          </div>
        </div>
        <Link to="/#game-zone">
          <Button variant="primary" size="md" className="group flex-shrink-0">
            Play Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
