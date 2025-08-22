import React from 'react';
import { Phone } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-primary-black text-white text-sm hidden md:block">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>Support (406) 555-0120</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Sign up and GET 25% OFF for your first order.</span>
          <a href="#" className="font-semibold underline hover:text-gray-300">
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};
