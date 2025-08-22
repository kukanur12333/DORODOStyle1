import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Gift, RefreshCw, Percent, Award, Gamepad2, Box, Puzzle, Share2 } from 'lucide-react';
import { SpinWheel, WheelSegment } from '../components/molecules/SpinWheel';
import { Button } from '../components/atoms/Button';
import { ProgressBar } from '../components/atoms/ProgressBar';
import { Badge } from '../components/atoms/Badge';
import { useApp } from '../context/AppContext';
import { MEMBERSHIP_TIERS } from '../utils/constants';
import { GameCard } from '../components/molecules/GameCard';
import { Leaderboard } from '../components/organisms/Leaderboard';
import { LoyaltyTiers } from '../components/organisms/LoyaltyTiers';

export const PlayToEarnPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [lastResult, setLastResult] = useState<WheelSegment | null>(null);
  const [showResult, setShowResult] = useState(false);

  const wheelSegments: WheelSegment[] = [
    { label: '50 Points', value: 50, icon: <Star size={20} />, color: '#4f46e5' },
    { label: '10% Off', value: '10% OFF', icon: <Percent size={20} />, color: '#7c3aed' },
    { label: 'Try Again', value: 0, icon: <RefreshCw size={20} />, color: '#64748b' },
    { label: '100 Points', value: 100, icon: <Star size={20} />, color: '#4f46e5' },
    { label: 'Free Gift', value: 'GIFT', icon: <Gift size={20} />, color: '#c026d3' },
    { label: '200 Points', value: 200, icon: <Star size={20} />, color: '#4f46e5' },
    { label: 'Jackpot!', value: 500, icon: <Award size={20} />, color: '#be123c' },
    { label: '20% Off', value: '20% OFF', icon: <Percent size={20} />, color: '#7c3aed' },
  ];

  const handleSpinEnd = (result: WheelSegment) => {
    if (typeof result.value === 'number' && result.value > 0) {
      dispatch({ type: 'ADD_LOYALTY_POINTS', payload: result.value });
    }
    setLastResult(result);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 4000);
  };

  const user = state.user;
  const currentTierName = user?.membershipTier || 'Bronze';
  const currentTier = MEMBERSHIP_TIERS[currentTierName];
  const tierNames = Object.keys(MEMBERSHIP_TIERS) as (keyof typeof MEMBERSHIP_TIERS)[];
  const currentTierIndex = tierNames.indexOf(currentTierName);
  const nextTierName = tierNames[currentTierIndex + 1];
  const nextTier = nextTierName ? MEMBERSHIP_TIERS[nextTierName] : null;

  const pointsForNextTier = nextTier ? nextTier.minPoints - (currentTier?.minPoints || 0) : 0;
  const userProgressPoints = (user?.loyaltyPoints || 0) - (currentTier?.minPoints || 0);
  const progressPercentage = nextTier ? Math.min((userProgressPoints / pointsForNextTier) * 100, 100) : 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary-gold/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary-gold to-yellow-300 bg-clip-text text-transparent">
            Play. Earn. Shop Smarter.
          </h1>
          <p className="text-lg text-gray-300 font-poppins max-w-2xl mx-auto">
            Engage in fun mini-games to earn loyalty points, unlock exclusive discounts, and climb the ranks.
          </p>
        </motion.div>

        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat mb-2">Mini-Games</h2>
            <p className="text-gray-400 font-poppins">More games, more ways to earn rewards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpinWheel segments={wheelSegments} onSpinEnd={handleSpinEnd} />
            <GameCard
              title="Treasure Hunt"
              description="Find hidden gems across our site to unlock surprise rewards and bonus points."
              icon={<Box size={32} />}
              cta="Start Hunting"
              backgroundImage="https://images.unsplash.com/photo-1541344899036-164215a4fb79?w=600&q=80"
              isLocked={true}
              unlockTier="Gold"
            />
            <GameCard
              title="AI Trivia"
              description="Test your fashion and crypto knowledge with our AI-powered trivia game."
              icon={<Puzzle size={32} />}
              cta="Play Trivia"
              backgroundImage="https://images.unsplash.com/photo-1593349480503-64d4d3d23a1e?w=600&q=80"
              isLocked={true}
              unlockTier="Platinum"
            />
          </div>
        </section>

        <section className="mb-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold font-montserrat text-center mb-6">Your Reward Progress</h3>
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-baseline mb-2">
              <Badge variant="membership">{currentTierName} Tier</Badge>
              <p className="font-montserrat font-bold text-primary-gold text-2xl">{user?.loyaltyPoints.toLocaleString()}</p>
            </div>
            <ProgressBar value={progressPercentage} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{currentTier?.minPoints || 0} pts</span>
              <span>{nextTier ? `${nextTier.minPoints.toLocaleString()} pts to ${nextTierName}` : 'Max Tier Reached!'}</span>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/promotions">
                <Button variant="gold">Redeem Rewards</Button>
              </Link>
              <Button variant="outline" className="text-white border-white/50">
                <Share2 size={16} /> Share
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <LoyaltyTiers />
        </section>

        <section>
          <Leaderboard />
        </section>
      </div>

      <AnimatePresence>
        {showResult && lastResult && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-6 z-50 flex items-center gap-4"
          >
            <div className="text-3xl">{lastResult.icon}</div>
            <div>
              <h4 className="font-bold font-montserrat text-lg">You Won!</h4>
              <p className="font-poppins">{lastResult.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
