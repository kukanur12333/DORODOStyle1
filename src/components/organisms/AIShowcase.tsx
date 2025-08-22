import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export const AIShowcase: React.FC = () => {
  const aiFeatures = [
    {
      title: 'Generate Unique Designs',
      description: 'Create one-of-a-kind fashion pieces with AI prompts',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
    },
    {
      title: 'Style Recommendations',
      description: 'Get personalized styling suggestions based on your preferences',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
    },
    {
      title: 'Virtual Try-On',
      description: 'See how AI-generated pieces look on you virtually',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-purple-600" size={24} />
            <h2 className="text-4xl font-bold font-montserrat text-gray-900">
              AI-Powered Fashion
            </h2>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Experience the future of fashion with our revolutionary AI technology that brings your wildest design dreams to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 items-center"
              >
                <div className="flex-shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <Badge variant="ai" className="mb-4">
                  <Zap size={12} />
                  AI Powered
                </Badge>
                
                <h3 className="text-2xl font-bold font-montserrat mb-4">
                  Create Your Dream Design
                </h3>
                
                <p className="text-purple-100 font-poppins mb-6 leading-relaxed">
                  From concept to creation in seconds. Our AI understands fashion trends, 
                  color theory, and design principles to bring your vision to life.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                    <span className="text-sm">Unlimited design iterations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                    <span className="text-sm">Commercial usage rights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                    <span className="text-sm">Professional manufacturing</span>
                  </div>
                </div>
                
                <Button variant="gold" size="lg" className="group">
                  Try AI Studio
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
