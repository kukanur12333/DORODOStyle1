import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, Rotate3d } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageRotation, setImageRotation] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handle360View = () => {
    setImageRotation(prev => prev + 90);
  };

  return (
    <div className="space-y-4 sticky top-24">
      <div className="relative group overflow-hidden rounded-2xl shadow-luxury">
        <motion.div
          key={selectedImage}
          className="aspect-[4/5] bg-gray-100 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            <motion.img
              key={`${selectedImage}-${imageRotation}`}
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, rotate: imageRotation }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
            <ZoomIn size={20} />
          </button>
          <button onClick={handle360View} className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
            <Rotate3d size={20} />
          </button>
        </div>
        
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-primary-black ring-2 ring-primary-black'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
