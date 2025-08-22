import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../atoms/Logo';

export const Preloader: React.FC = () => {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary-black"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <Logo className="w-24 h-24 text-white" />
      </motion.div>
      <motion.p 
        className="text-white font-montserrat font-semibold text-xl tracking-widest mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        DORODOStyle
      </motion.p>
    </motion.div>
  );
};
