import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Award } from 'lucide-react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const NewsletterSignup: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="text-primary-gold" size={24} />
            <h2 className="text-3xl font-bold font-montserrat">
              Join the Inner Circle
            </h2>
          </div>
          <p className="text-lg text-gray-300 font-poppins max-w-2xl mx-auto mb-6">
            Sign up for exclusive access to new drops, member-only offers, and style inspiration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4">
            <Input
              placeholder="Enter your email address"
              type="email"
              className="flex-1"
              icon={<Mail size={18} />}
            />
            <Button variant="gold" size="lg" className="flex-shrink-0">
              Subscribe
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-yellow-300 font-poppins">
            <Award size={16} />
            <span>Bonus: Earn 100 loyalty points instantly upon signup!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
