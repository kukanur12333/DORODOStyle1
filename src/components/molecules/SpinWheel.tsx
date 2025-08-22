import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Gift, RefreshCw, Percent, Award } from 'lucide-react';
import { Button } from '../atoms/Button';

export interface WheelSegment {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

interface SpinWheelProps {
  segments: WheelSegment[];
  onSpinEnd: (result: WheelSegment) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ segments, onSpinEnd }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const totalSegments = segments.length;
    const randomSegmentIndex = Math.floor(Math.random() * totalSegments);
    const segmentAngle = 360 / totalSegments;
    const randomAngleWithinSegment = (Math.random() - 0.5) * segmentAngle * 0.8;
    const targetRotation = 360 * 5 + (randomSegmentIndex * -segmentAngle) + randomAngleWithinSegment;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinEnd(segments[randomSegmentIndex]);
      // Reset rotation for next spin animation
      const finalRotation = targetRotation % 360;
      setRotation(finalRotation);
    }, 5000); // Corresponds to the animation duration
  };

  const segmentAngle = 360 / segments.length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
          <div className="w-0 h-0 border-x-8 border-x-transparent border-b-[16px] border-b-primary-gold"></div>
        </div>

        {/* Wheel */}
        <motion.div
          className="relative w-full h-full rounded-full border-8 border-gray-700 shadow-2xl overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{
            duration: 5,
            ease: [0.22, 1, 0.36, 1], // easeOutQuint
          }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="absolute w-1/2 h-1/2 origin-bottom-right"
              style={{
                transform: `rotate(${index * segmentAngle}deg)`,
                clipPath: `polygon(0 0, 100% 0, 100% 100%)`,
              }}
            >
              <div
                className="absolute w-full h-full flex items-center justify-start text-white"
                style={{
                  transform: `rotate(${segmentAngle / 2}deg) translate(0, -50%)`,
                  backgroundColor: segment.color,
                }}
              >
                <div className="flex items-center gap-2 transform -translate-x-4 md:-translate-x-8 pl-8">
                  {segment.icon}
                  <span className="font-montserrat font-bold text-sm md:text-base">{segment.label}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center">
            <Award size={32} className="text-primary-gold" />
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        variant="gold"
        size="xl"
        className="w-full max-w-xs shadow-neon-gold hover:shadow-neon-gold-hover"
      >
        {isSpinning ? 'Spinning...' : 'Play Now'}
      </Button>
    </div>
  );
};
