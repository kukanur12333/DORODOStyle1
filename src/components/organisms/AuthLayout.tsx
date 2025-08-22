import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 bg-white rounded-2xl shadow-luxury overflow-hidden">
        {/* Form Panel (Left) */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {children}
          </div>
        </div>
        
        {/* Branding/Advertisement Panel (Right) */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-brand-light-green p-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6d5f9650d?w=800&q=80"
              alt="AI Fashion Concept"
              className="w-full max-w-sm mx-auto mb-8"
            />
            <h2 className="font-montserrat font-bold text-3xl text-gray-800 mb-4">
              Make Your Style Your Own
            </h2>
            <p className="font-poppins text-lg text-gray-600 max-w-xs mx-auto">
              Discover, create, and wear unique AI-powered fashion with DORODOStyle.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
