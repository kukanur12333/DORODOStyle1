import React from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';

export const PromotionsPage: React.FC = () => {
  const hotDeals = [
    {
      title: 'AI-Generated Silk Scarves',
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=400&fit=crop',
      category: 'Accessories',
    },
    {
      title: 'Luxe Leather Handbags',
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1590732821259-a83146b6c153?w=500&h=400&fit=crop',
      category: 'Bags',
    },
    {
      title: 'Limited Edition Sneakers',
      discount: '$50 OFF',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop',
      category: 'Shoes',
    },
  ];

  const categoryDeals = [
    { name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=400&fit=crop', offer: 'Up to 30% Off' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=400&fit=crop', offer: 'Buy 1 Get 1 50% Off' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop', offer: 'Free Gift with Purchase' },
    { name: 'Home & Lifestyle', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=400&fit=crop', offer: '20% Off Home Collection' },
  ];
  
  const memberDeals = [
    { title: 'Early Access to AI Drops', tier: 'Gold & Up' },
    { title: 'Exclusive 25% Off All Outerwear', tier: 'Platinum & Up' },
    { title: 'Free Personal Styling Session', tier: 'Elite Only' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-red/80 to-primary-gold/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Tag className="mx-auto mb-4" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              Exclusive Offers
            </h1>
            <p className="text-lg font-poppins max-w-2xl mx-auto">
              Discover limited-time deals on luxury fashion and AI-generated collections.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hot Deals Section */}
        <section className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-montserrat text-center mb-12"
          >
            Hot Deals
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotDeals.map((deal, index) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img src={deal.image} alt={deal.title} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="sale" size="lg">{deal.discount}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 font-poppins mb-1">{deal.category}</p>
                  <h3 className="text-xl font-bold font-montserrat mb-4">{deal.title}</h3>
                  <Button variant="primary" className="w-full">Shop Now</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category-based Carousel */}
        <section className="mb-20">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-montserrat text-center mb-12"
          >
            Shop by Category Offer
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryDeals.map((deal, index) => (
              <motion.div
                key={deal.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden h-80 group"
              >
                <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="text-2xl font-bold font-montserrat">{deal.name}</h3>
                  <p className="text-lg font-poppins mt-2">{deal.offer}</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-black">
                    Explore
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Member-Only Promotions */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-white text-center"
          >
            <Star className="mx-auto mb-4 text-primary-gold" size={32} />
            <h2 className="text-3xl font-bold font-montserrat mb-4">
              Member-Only Promotions
            </h2>
            <p className="text-lg text-gray-300 font-poppins max-w-2xl mx-auto mb-8">
              Join our elite membership to unlock these exclusive deals and more.
            </p>
            <div className="space-y-4 max-w-md mx-auto mb-8">
              {memberDeals.map(deal => (
                <div key={deal.title} className="bg-white/10 rounded-lg p-4 text-left flex items-center justify-between">
                  <span className="font-poppins">{deal.title}</span>
                  <Badge variant="membership" size="sm">{deal.tier}</Badge>
                </div>
              ))}
            </div>
            <Button variant="gold" size="lg" className="group">
              Join Membership <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
