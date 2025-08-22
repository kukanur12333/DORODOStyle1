import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Have questions about our AI fashion platform? We're here to help you create your perfect luxury experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-luxury p-8"
          >
            <h2 className="text-2xl font-bold font-montserrat mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              
              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none font-poppins"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <Button variant="primary" size="lg" type="submit" className="w-full group">
                <Send size={18} />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="text-primary-gold" size={24} />,
                  title: 'Email Us',
                  description: 'Get in touch via email',
                  contact: 'support@dorodostyle.com',
                },
                {
                  icon: <Phone className="text-primary-gold" size={24} />,
                  title: 'Call Us',
                  description: 'Speak with our team',
                  contact: '+1 (555) 123-4567',
                },
                {
                  icon: <MapPin className="text-primary-gold" size={24} />,
                  title: 'Visit Us',
                  description: 'Our headquarters',
                  contact: '123 Fashion Ave, New York, NY 10001',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-luxury p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-montserrat font-bold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-poppins text-sm mb-2">
                        {item.description}
                      </p>
                      <p className="font-montserrat font-medium text-gray-900">
                        {item.contact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-primary-black text-white rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-primary-gold" size={24} />
                <h3 className="font-montserrat font-bold text-lg">Business Hours</h3>
              </div>
              <div className="space-y-2 font-poppins">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
