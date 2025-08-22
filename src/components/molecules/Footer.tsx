import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Share2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'Men', href: '/shop' },
        { label: 'Women', href: '/shop' },
        { label: 'Kids', href: '/shop' },
        { label: 'Accessories', href: '/shop' },
        { label: 'Trading', href: '/shop' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'AI Studio', href: '/ai-studio' },
        { label: 'Membership', href: '/membership' },
        { label: 'Community', href: '/community' },
        { label: 'Gift Cards', href: '#' },
        { label: 'Play & Earn', href: '/#game-zone' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping & Returns', href: '/faq' },
        { label: 'Track Order', href: '/orders' },
        { label: 'Help Center', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Sustainability', href: '/about' },
        { label: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Share2 size={20} />, href: '#', label: 'Instagram' },
    { icon: <Share2 size={20} />, href: '#', label: 'Twitter' },
    { icon: <Share2 size={20} />, href: '#', label: 'Facebook' },
  ];

  const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'];

  return (
    <footer className="bg-primary-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/">
              <motion.div
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-gold to-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-black font-bold text-sm">D</span>
                </div>
                <span className="font-montserrat font-bold text-xl">
                  DORODOStyle
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6 font-poppins">
              Luxury AI-powered fashion platform redefining style with cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 border border-gray-700 rounded-full hover:border-primary-gold hover:text-primary-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-gold transition-colors font-poppins"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="font-poppins mb-4 md:mb-0">
              © 2025 DORODOStyle. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {paymentMethods.map(method => (
                <span key={method} className="font-poppins">{method}</span>
              ))}
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-primary-gold transition-colors">
                Terms & Conditions
              </Link>
              <Link to="#" className="hover:text-primary-gold transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
