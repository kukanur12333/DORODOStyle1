import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Download } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface AICreation {
  id: string;
  prompt: string;
  style: string;
  image: string;
  author: string;
  likes: number;
  isLiked: boolean;
}

interface AIPromptCardProps {
  creation: AICreation;
  onLike: (id: string) => void;
  onShare: (id: string) => void;
  className?: string;
}

export const AIPromptCard: React.FC<AIPromptCardProps> = ({
  creation,
  onLike,
  onShare,
  className,
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 overflow-hidden group ${className}`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <img
          src={creation.image}
          alt="AI Generated Design"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3">
          <Badge variant="ai" size="sm">AI</Badge>
        </div>
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <motion.button
              onClick={() => onLike(creation.id)}
              className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={16}
                className={creation.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </motion.button>
            
            <motion.button
              onClick={() => onShare(creation.id)}
              className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={16} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <Badge variant="default" size="sm" className="mb-2">
            {creation.style}
          </Badge>
          <p className="text-sm text-gray-800 font-poppins line-clamp-2">
            "{creation.prompt}"
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-poppins">by {creation.author}</p>
            <div className="flex items-center gap-1 mt-1">
              <Heart size={12} className="text-red-500" />
              <span className="text-xs text-gray-600 font-poppins">{creation.likes}</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Download size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
