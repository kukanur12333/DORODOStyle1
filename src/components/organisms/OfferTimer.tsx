import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';
import { Button } from '../atoms/Button';
import { CountdownCard } from '../molecules/CountdownCard';

export const OfferTimer: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-12-31T23:59:59') - +new Date();
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

  const timerComponents = timeLeft.days !== undefined ? (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      <CountdownCard value={timeLeft.days} label="Days" />
      <CountdownCard value={timeLeft.hours} label="Hours" />
      <CountdownCard value={timeLeft.minutes} label="Minutes" />
      <CountdownCard value={timeLeft.seconds} label="Seconds" />
    </div>
  ) : (
    <span className="text-2xl font-bold text-white">Offer has ended!</span>
  );

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-primary-red/20 border border-primary-red/30 rounded-full px-4 py-2 mb-6">
            <Tag size={16} className="text-primary-red" />
            <span className="text-sm font-montserrat text-red-300">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-white mb-6">
            Exclusive Winter Collection Drop
          </h2>
          <p className="text-lg text-gray-300 font-poppins max-w-2xl mx-auto mb-12">
            Be the first to own pieces from our AI-curated Winter '25 collection. This offer ends soon!
          </p>

          <div className="mb-12">
            {timerComponents}
          </div>

          <Button variant="gold" size="xl" className="group">
            Shop The Drop
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
