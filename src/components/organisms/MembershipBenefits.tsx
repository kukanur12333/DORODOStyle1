import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, Gift } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { MEMBERSHIP_TIERS } from '../../utils/constants';

export const MembershipBenefits: React.FC = () => {
  const tiers = [
    {
      name: 'Silver',
      icon: <Star size={24} />,
      price: 'Free',
      color: 'from-gray-400 to-gray-600',
      benefits: ['Free shipping over $100', 'Birthday discount', 'Member-only sales'],
    },
    {
      name: 'Gold',
      icon: <Crown size={24} />,
      price: '$49/year',
      color: 'from-yellow-400 to-yellow-600',
      benefits: ['Free shipping on all orders', '10% member discount', 'Early access to sales', 'Priority support'],
      popular: true,
    },
    {
      name: 'Platinum',
      icon: <Zap size={24} />,
      price: '$99/year',
      color: 'from-gray-300 to-gray-500',
      benefits: ['15% member discount', 'Free express shipping', 'Exclusive AI features', 'Personal stylist chat'],
    },
    {
      name: 'Elite',
      icon: <Gift size={24} />,
      price: '$199/year',
      color: 'from-purple-400 to-pink-600',
      benefits: ['20% member discount', 'VIP customer service', 'Limited edition access', 'Free styling sessions'],
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-montserrat mb-4">
            Join the Elite Circle
          </h2>
          <p className="text-lg text-gray-300 font-poppins max-w-2xl mx-auto">
            Unlock exclusive benefits, early access to AI collections, and personalized luxury experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white text-gray-900 rounded-2xl p-6 ${
                tier.popular ? 'ring-2 ring-primary-gold shadow-gold' : 'shadow-luxury'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="gold" size="sm">Most Popular</Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-white`}>
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold text-primary-gold">{tier.price}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center gap-2 text-sm font-poppins">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? 'gold' : 'outline'}
                size="lg"
                className="w-full"
              >
                {tier.name === 'Silver' ? 'Current Plan' : 'Upgrade Now'}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 font-poppins">
            All memberships include access to our AI Studio and exclusive member events
          </p>
        </motion.div>
      </div>
    </section>
  );
};
