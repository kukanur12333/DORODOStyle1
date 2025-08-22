import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-start gap-4">
        <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="font-montserrat font-semibold">{review.author}</span>
              {review.isVerified && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md">Verified</span>
              )}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <h4 className="font-montserrat font-medium mb-2">{review.title}</h4>
          <p className="text-gray-700 font-poppins mb-3 leading-relaxed">{review.content}</p>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
            <span className="ml-2 font-semibold text-sm">{review.rating.toFixed(1)}</span>
          </div>
          {review.images && review.images.length > 0 && (
            <div className="flex gap-3">
              {review.images.map((img, index) => (
                <img key={index} src={img} alt={`Review image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
