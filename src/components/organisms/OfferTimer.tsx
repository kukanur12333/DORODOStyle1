import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../atoms/Button';
import { CountdownCard } from '../molecules/CountdownCard';

export const OfferTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    // Set timer for next 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    const difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as { days: number; hours: number; minutes: number; seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = timeLeft.hours !== undefined ? (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      <CountdownCard value={timeLeft.hours} label="Hours" />
      <CountdownCard value={timeLeft.minutes} label="Minutes" />
      <CountdownCard value={timeLeft.seconds} label="Seconds" />
    </div>
  ) : (
    <span className="text-2xl font-bold text-white">Offer has ended!</span>
  );

  return (
    <section className="py-20 bg-gradient-to-r from-red-500 via-primary-red to-yellow-400 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9e?w=1200&fit=crop')" }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-6">
            <Zap size={16} className="text-white" />
            <span className="text-sm font-montserrat text-white">Flash Sale</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-white mb-6">
            Flat 30% Off + Free NFT with Every Hoodie
          </h2>
          <p className="text-lg text-gray-200 font-poppins max-w-2xl mx-auto mb-12">
            This is not a drill! For the next 24 hours, get a massive discount and a unique digital collectible.
          </p>

          <div className="mb-12">
            {timerComponents}
          </div>

          <Button variant="gold" size="xl" className="group">
            Grab The Deal
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
