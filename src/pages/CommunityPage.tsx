import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, MessageCircle } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-primary-gold" size={32} />
            <h1 className="text-4xl font-bold font-montserrat text-gray-900">
              DORODOStyle Community
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Connect with fashion enthusiasts, share AI creations, and discover trending styles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-luxury p-6 text-center">
            <TrendingUp className="mx-auto mb-4 text-purple-600" size={32} />
            <h3 className="font-montserrat font-bold text-lg mb-2">Trending Creations</h3>
            <p className="text-gray-600 font-poppins">
              Discover the most popular AI-generated designs
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-luxury p-6 text-center">
            <MessageCircle className="mx-auto mb-4 text-green-600" size={32} />
            <h3 className="font-montserrat font-bold text-lg mb-2">Style Discussions</h3>
            <p className="text-gray-600 font-poppins">
              Join conversations about fashion trends and tips
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-luxury p-6 text-center">
            <Users className="mx-auto mb-4 text-blue-600" size={32} />
            <h3 className="font-montserrat font-bold text-lg mb-2">Designer Network</h3>
            <p className="text-gray-600 font-poppins">
              Connect with fellow designers and creators
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury p-12 text-center">
          <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-4">
            Community Coming Soon
          </h2>
          <p className="text-gray-600 font-poppins max-w-2xl mx-auto">
            We're building an amazing community platform where fashion enthusiasts can share, 
            discover, and collaborate on AI-generated designs. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};
