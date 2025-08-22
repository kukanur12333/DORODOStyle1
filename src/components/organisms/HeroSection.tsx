import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Gamepad2, Droplets } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    icon: <Droplets size={20} className="text-blue-300" />,
    badge: 'Exclusive Drops',
    title: (
      <>
        Unveil Limited
        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          {' '}Editions
        </span>
      </>
    ),
    subtitle: 'Discover rare, high-demand pieces from our most exclusive collections. Available for a limited time only.',
    cta: 'Shop The Drop',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=1200&fit=crop&q=80',
  },
  {
    id: 2,
    icon: <Sparkles size={20} className="text-purple-300" />,
    badge: 'AI Studio',
    title: (
      <>
        Design Your
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {' '}Legacy
        </span>
      </>
    ),
    subtitle: 'Become the designer. Use our AI Studio to turn your imagination into wearable art and unique fashion statements.',
    cta: 'Create Your Style',
    link: '/ai-studio',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6d5f9650d?w=1200&fit=crop&q=80',
  },
  {
    id: 3,
    icon: <Gamepad2 size={20} className="text-green-300" />,
    badge: 'Play-to-Earn',
    title: (
      <>
        Game On,
        <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
          {' '}Rewards Up
        </span>
      </>
    ),
    subtitle: 'Engage in fun challenges and games to earn loyalty points, unlock discounts, and get exclusive perks.',
    cta: 'Play & Earn',
    link: '/#game-zone',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&fit=crop&q=80',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const HeroSection: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + slides.length) % slides.length, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, [page]);

  const activeSlide = slides[page];

  return (
    <section className="relative h-[80vh] min-h-[600px] bg-black text-white overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-left">
            <motion.div
              key={`${page}-content`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                    {activeSlide.icon}
                    <span className="text-sm font-montserrat">{activeSlide.badge}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight mb-6">
                    {activeSlide.title}
                </h1>
                
                <p className="text-xl text-gray-300 font-poppins max-w-xl mb-8">
                    {activeSlide.subtitle}
                </p>

                <Link to={activeSlide.link}>
                    <Button variant="gold" size="xl" className="group">
                    {activeSlide.cta}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-colors ${
              page === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
