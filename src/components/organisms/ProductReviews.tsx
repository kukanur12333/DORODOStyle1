import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { generateMockReviews } from '../../utils/mockData';
import { Review } from '../../types';
import { ProgressBar } from '../atoms/ProgressBar';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const reviews: Review[] = generateMockReviews(4);
  const totalReviews = 107;
  const averageRating = 4.8;

  const ratingDistribution = [
    { star: 5, percentage: 80, count: 86 },
    { star: 4, percentage: 15, count: 16 },
    { star: 3, percentage: 3, count: 3 },
    { star: 2, percentage: 1, count: 1 },
    { star: 1, percentage: 1, count: 1 },
  ];

  return (
    <div className="space-y-12">
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-5xl font-bold font-montserrat">{averageRating}</p>
          <p className="text-sm text-gray-600">out of 5</p>
          <div className="flex items-center gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <p className="text-gray-500 font-poppins">({totalReviews} Reviews)</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {ratingDistribution.map(item => (
            <div key={item.star} className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{item.star} Star</span>
              <ProgressBar value={item.percentage} />
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-montserrat">Review List</h3>
          <p className="text-sm text-gray-500">Showing 1-4 of 24 results</p>
        </div>
        <div className="space-y-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b pb-8"
            >
              <div className="flex items-start gap-4">
                <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-montserrat font-semibold">{review.author}</span>
                      {review.isVerified && <span className="text-xs text-green-600 ml-2">(Verified)</span>}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <h4 className="font-montserrat font-medium my-2">{review.title}</h4>
                  <p className="text-gray-700 font-poppins leading-relaxed mb-3">{review.content}</p>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-sm font-semibold">{review.rating.toFixed(1)}</span>
                  </div>
                  {review.images.length > 0 && (
                    <div className="flex gap-2">
                      {review.images.map((img, i) => (
                        <img key={i} src={img} alt={`Review image ${i+1}`} className="w-24 h-24 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
