import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Input } from '../components/atoms/Input';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqs = [
    {
      category: 'AI Studio',
      questions: [
        {
          question: 'How does the AI Studio work?',
          answer: 'Our AI Studio uses advanced machine learning algorithms to generate unique fashion designs based on your text prompts and style preferences. Simply describe what you want, choose a style, and our AI will create original designs for you.',
        },
        {
          question: 'Can I use AI-generated designs commercially?',
          answer: 'Yes! All designs generated through our AI Studio come with full commercial usage rights. You can use them for personal wear, sell them, or incorporate them into your own fashion line.',
        },
        {
          question: 'How long does it take to generate a design?',
          answer: 'Most designs are generated within 30-60 seconds. Complex designs with multiple elements may take up to 2-3 minutes to complete.',
        },
      ],
    },
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days within the US. Express shipping (2-3 days) and overnight options are available. International shipping varies by location.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by destination. All international orders include tracking.',
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for all items in original condition. AI-generated custom pieces have a 14-day return window. Return shipping is free for defective items.',
        },
      ],
    },
    {
      category: 'Membership',
      questions: [
        {
          question: 'What are the membership benefits?',
          answer: 'Members enjoy free shipping, exclusive discounts (10-20% based on tier), early access to new collections, priority customer support, and bonus loyalty points.',
        },
        {
          question: 'How do I earn loyalty points?',
          answer: 'Earn 1 point per $1 spent, bonus points for reviews, referrals, and social media engagement. Points can be redeemed for discounts, exclusive items, or upgraded shipping.',
        },
        {
          question: 'Can I change my membership tier?',
          answer: 'Membership tiers are automatically upgraded based on your annual spending and loyalty points. You can also purchase higher tiers directly for additional benefits.',
        },
      ],
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="text-primary-gold" size={32} />
            <h1 className="text-4xl font-bold font-montserrat text-gray-900">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-poppins">
            Find answers to common questions about our AI-powered fashion platform
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Input
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
            className="max-w-md mx-auto"
          />
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-luxury overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-bold font-montserrat text-gray-900">
                  {category.category}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isExpanded = expandedItems.includes(globalIndex);

                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleExpand(globalIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-montserrat font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isExpanded ? (
                            <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-700 font-poppins leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 font-poppins">
              No FAQ found matching your search. Try different keywords or{' '}
              <a href="/contact" className="text-primary-gold hover:underline">
                contact us
              </a>{' '}
              for help.
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-gold/10 to-primary-gold/5 rounded-2xl p-8 text-center mt-12"
        >
          <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 font-poppins mb-4">
            Our support team is here to help you with any questions or concerns.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-black text-white px-6 py-3 rounded-2xl font-montserrat font-semibold hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
};
