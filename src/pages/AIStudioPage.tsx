import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Download, Heart, Share2, Wand2 } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Badge } from '../components/atoms/Badge';
import { AIPromptCard } from '../components/molecules/AIPromptCard';
import { AI_STYLES } from '../utils/constants';

export const AIStudioPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(AI_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'generate' | 'gallery' | 'community'>('generate');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImages([]);
    setError(null);

    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey === 'API_KEY_ADDED') {
      const errorMessage =
        'AI API Key is not configured. Please add your actual key to the .env file and restart the development server.';
      console.error(errorMessage);
      setError(errorMessage);
      setIsGenerating(false);
      return;
    }

    // NOTE: This is a hypothetical API endpoint and request structure.
    // You will need to replace this with your actual AI provider's API details.
    const API_URL = 'https://api.openai.com/v1/images/generations'; // Example: OpenAI DALL-E

    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: `A luxury fashion piece: ${prompt}, in a ${selectedStyle} style.`,
          n: 4,
          size: "512x512",
          response_format: 'url',
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // NOTE: Adjust this based on your API's response structure.
      // This example assumes an OpenAI-like response: { data: [{ url: '...' }, ...] }
      const imageUrls = response.data.data.map((image: { url: string }) => image.url);
      setGeneratedImages(imageUrls);

    } catch (err) {
      console.error("Error generating AI images:", err);
      setError("Failed to generate images. Please check your API key and the console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const communityCreations = [
    {
      id: '1',
      prompt: 'Futuristic metallic dress with LED accents',
      style: 'Futuristic',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      author: 'Sarah Kim',
      likes: 234,
      isLiked: false,
    },
    {
      id: '2',
      prompt: 'Minimalist white outfit with gold details',
      style: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      author: 'Alex Chen',
      likes: 189,
      isLiked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={32} />
              <h1 className="text-4xl md:text-5xl font-bold font-montserrat">
                AI Studio
              </h1>
            </div>
            <p className="text-xl font-poppins max-w-2xl mx-auto">
              Create unique fashion designs with the power of artificial intelligence.
              Turn your imagination into luxury fashion pieces.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'generate', label: 'Generate', icon: <Wand2 size={18} /> },
              { id: 'gallery', label: 'My Gallery', icon: <Upload size={18} /> },
              { id: 'community', label: 'Community', icon: <Share2 size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-montserrat font-medium ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-luxury p-6 sticky top-8">
                <h2 className="text-xl font-bold font-montserrat mb-6">
                  Create Your Design
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                      Describe your design
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A flowing evening gown with golden embroidery and crystal details..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
                      Style
                    </label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value as any)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins"
                    >
                      {AI_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleGenerate}
                    loading={isGenerating}
                    disabled={!prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles size={18} />
                    {isGenerating ? 'Generating...' : 'Generate Design'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                  <h3 className="font-bold">Error</h3>
                  <p>{error}</p>
                </div>
              )}
              {isGenerating ? (
                <div className="bg-white rounded-2xl shadow-luxury p-12 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="w-full h-full border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <Sparkles size={24} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                    Creating Your Design
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    Our AI is working on your unique fashion piece...
                  </p>
                </div>
              ) : generatedImages.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-montserrat">Generated Designs</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {generatedImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-luxury overflow-hidden group"
                      >
                        <div className="relative">
                          <img
                            src={image}
                            alt={`Generated design ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                              <Button variant="primary" size="sm">
                                <Heart size={16} />
                              </Button>
                              <Button variant="primary" size="sm">
                                <Download size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="ai" size="sm">AI Generated</Badge>
                            <Button variant="gold" size="sm">
                              Create Product
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-luxury p-12 text-center">
                  <Sparkles size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                    Ready to Create?
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    Enter a prompt and style to generate your unique fashion design.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold font-montserrat">Community Creations</h2>
                <p className="text-gray-600 font-poppins">
                  Discover amazing AI-generated designs from our community
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communityCreations.map((creation) => (
                <AIPromptCard
                  key={creation.id}
                  creation={creation}
                  onLike={() => {}}
                  onShare={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
