import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../atoms/Button';

const communityPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ccfb6e1a?w=500&h=600&fit=crop',
    author: '@alex_styles',
    likes: 1250,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop',
    author: '@fashionista_jane',
    likes: 2340,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa6ce670c0?w=500&h=600&fit=crop',
    author: '@dapper_dan',
    likes: 890,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    author: '@style_by_sophia',
    likes: 3120,
  },
];

export const CommunityShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-purple-600" size={24} />
            <h2 className="text-4xl font-bold font-montserrat text-gray-900">
              From Our Community
            </h2>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            See how our members style their DORODOStyle creations and get inspired.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-luxury aspect-[4/5]"
            >
              <img
                src={post.image}
                alt={`Community post by ${post.author}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <p className="font-montserrat font-semibold">{post.author}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Heart size={14} className="fill-white" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="group">
            View Gallery
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
