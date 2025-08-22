import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Gem, Crown, Star } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../../utils/constants';
import { useApp } from '../../context/AppContext';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export const LoyaltyTiers: React.FC = () => {
  const { state } = useApp();
  const userTier = state.user?.membershipTier || 'Bronze';

  const tierIcons = {
    Bronze: <Gem size={28} />,
    Silver: <Star size={28} />,
    Gold: <Trophy size={28} />,
    Platinum: <Crown size={28} />,
  };

  const tierColors = {
    Bronze: 'from-yellow-700 to-yellow-900',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-purple-400 to-pink-600',
  }

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold font-montserrat mb-4">Loyalty Tiers</h2>
        <p className="text-gray-300 font-poppins max-w-2xl mx-auto">
          The more you play and shop, the more you're rewarded. Climb the ranks to unlock exclusive perks.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(MEMBERSHIP_TIERS).map(([tierName, tierData], index) => {
          const isUserTier = tierName === userTier;
          return (
            <motion.div
              key={tierName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-800 rounded-2xl p-8 border ${
                isUserTier ? 'border-primary-gold ring-2 ring-primary-gold/50' : 'border-white/10'
              }`}
            >
              {isUserTier && <Badge variant="gold" className="absolute -top-3 left-1/2 -translate-x-1/2">Your Tier</Badge>}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${tierColors[tierName as keyof typeof tierColors]} flex items-center justify-center text-white`}>
                  {tierIcons[tierName as keyof typeof tierIcons]}
                </div>
                <h3 className="text-2xl font-bold font-montserrat">{tierName}</h3>
                <p className="text-gray-400 font-poppins text-sm">
                  {tierData.minPoints.toLocaleString()}+ Points
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {tierData.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm font-poppins">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={isUserTier ? 'gold' : 'outline'}
                className="w-full mt-auto"
                disabled={isUserTier}
              >
                {isUserTier ? 'Current Tier' : 'Reach for More'}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
