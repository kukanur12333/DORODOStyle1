import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Globe, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Redefining Fashion with AI
            </h1>
            <p className="text-xl text-gray-300 font-poppins max-w-3xl mx-auto">
              DORODOStyle pioneered the fusion of artificial intelligence and luxury fashion, 
              creating unique, personalized experiences for the modern style enthusiast.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="text-primary-gold" size={32} />
            <h2 className="text-3xl font-bold font-montserrat">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-3xl mx-auto leading-relaxed">
            We believe that fashion should be as unique as you are. By harnessing the power of artificial intelligence, 
            we create personalized luxury experiences that push the boundaries of creativity and craftsmanship.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Users size={32} />, value: '50K+', label: 'Happy Customers' },
            { icon: <Sparkles size={32} />, value: '100K+', label: 'AI Designs Created' },
            { icon: <Globe size={32} />, value: '25+', label: 'Countries Served' },
            { icon: <Award size={32} />, value: '15+', label: 'Design Awards' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-primary-gold mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-poppins">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold font-montserrat text-center mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 font-poppins">
            <p className="mb-6">
              Founded in 2023, DORODOStyle emerged from a simple yet revolutionary idea: what if artificial intelligence 
              could democratize luxury fashion design? Our founders, coming from backgrounds in fashion design, technology, 
              and luxury retail, saw an opportunity to bridge the gap between haute couture exclusivity and personal expression.
            </p>
            <p className="mb-6">
              Today, we're proud to be at the forefront of the AI fashion revolution, helping thousands of customers 
              create unique pieces that reflect their individual style. Our AI Studio has generated over 100,000 unique 
              designs, each one telling a different story.
            </p>
            <p>
              As we look to the future, we remain committed to pushing the boundaries of what's possible when technology 
              meets creativity, always with sustainability and ethical practices at our core.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold font-montserrat mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing the boundaries of fashion technology to create tomorrow\'s luxury experiences today.',
              },
              {
                title: 'Sustainability',
                description: 'Committed to ethical practices and sustainable fashion that respects our planet.',
              },
              {
                title: 'Individuality',
                description: 'Celebrating the unique style of every customer through personalized AI-generated designs.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-luxury p-8"
              >
                <h3 className="text-xl font-bold font-montserrat mb-4">{value.title}</h3>
                <p className="text-gray-600 font-poppins">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
