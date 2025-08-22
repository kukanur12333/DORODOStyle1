import React from 'react';
import { motion } from 'framer-motion';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Continue with ${label}`}
    >
      {icon}
    </motion.button>
  );
};
