import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Gift, Star, X } from 'lucide-react';
import { Button } from '../atoms/Button';

interface DailyRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  streak: number;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ isOpen, onClose, points, streak }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-gradient-to-br from-gray-800 to-black border border-primary-gold/50 text-white rounded-2xl shadow-2xl w-full max-w-md text-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-gold to-yellow-500 flex items-center justify-center shadow-gold">
              <Gift size={48} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold font-montserrat mb-2">Daily Reward!</h2>
            <p className="text-gray-300 font-poppins mb-6">Thanks for logging in today.</p>
            
            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <p className="text-lg font-poppins">You've earned</p>
              <p className="text-5xl font-bold font-montserrat text-primary-gold my-2">{points}</p>
              <p className="text-lg font-poppins">Loyalty Points</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-lg font-semibold">
              <Star className="text-yellow-400" />
              <span>{streak} Day Streak!</span>
              <Star className="text-yellow-400" />
            </div>

            <Button onClick={onClose} variant="gold" size="lg" className="w-full mt-8">
              Awesome!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
