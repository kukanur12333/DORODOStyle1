import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, Gift } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';

export const MembershipPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-gold/20 to-primary-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Crown className="mx-auto mb-4 text-primary-gold" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
              Elite Membership
            </h1>
            <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
              Unlock exclusive benefits, early access to AI collections, and personalized luxury experiences
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Current Membership Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-luxury p-8 mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-montserrat mb-2">Your Current Plan</h2>
              <div className="flex items-center gap-3">
                <Badge variant="membership" size="lg">Gold Member</Badge>
                <span className="text-gray-600 font-poppins">2,450 loyalty points</span>
              </div>
            </div>
            <Button variant="gold">Upgrade Plan</Button>
          </div>
        </motion.div>

        {/* Membership Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Free Shipping',
              description: 'On all orders worldwide',
              icon: <Star className="text-primary-gold" size={24} />,
            },
            {
              title: 'Member Discounts',
              description: 'Up to 20% off everything',
              icon: <Gift className="text-purple-500" size={24} />,
            },
            {
              title: 'Early Access',
              description: 'New AI collections first',
              icon: <Zap className="text-blue-500" size={24} />,
            },
            {
              title: 'VIP Support',
              description: 'Priority customer service',
              icon: <Crown className="text-green-500" size={24} />,
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-luxury p-6 text-center"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="font-montserrat font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 font-poppins">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
