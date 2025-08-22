import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../atoms/Button';
import { Lock } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  backgroundImage: string;
  isLocked?: boolean;
  unlockTier?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  cta,
  backgroundImage,
  isLocked = false,
  unlockTier,
}) => {
  return (
    <motion.div
      className="relative bg-gray-800 rounded-2xl shadow-lg overflow-hidden group aspect-square flex flex-col justify-end"
      whileHover={{ y: -5 }}
    >
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="relative p-6 text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
          <h3 className="text-2xl font-bold font-montserrat">{title}</h3>
        </div>
        <p className="font-poppins text-gray-300 line-clamp-2">{description}</p>
        <Button variant="outline" className="w-full border-white/50 text-white hover:bg-white hover:text-black" disabled={isLocked}>
          {isLocked ? <Lock size={16} /> : null}
          {cta}
        </Button>
        {isLocked && unlockTier && (
          <p className="text-xs text-center text-primary-gold">Unlock at {unlockTier} Tier</p>
        )}
      </div>
    </motion.div>
  );
};
