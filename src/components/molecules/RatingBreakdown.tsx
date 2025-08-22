import React from 'react';
import { Star } from 'lucide-react';

interface RatingBreakdownProps {
  averageRating: number;
  totalReviews: number;
  distribution: { [key: string]: number };
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  averageRating,
  totalReviews,
  distribution,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-4xl font-bold font-montserrat">{averageRating.toFixed(1)} <span className="text-2xl text-gray-500">out of 5</span></h3>
        <div className="flex justify-center items-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className={i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
          ))}
        </div>
        <p className="text-sm text-gray-500">({totalReviews} Reviews)</p>
      </div>
      <div className="space-y-2">
        {Object.entries(distribution).reverse().map(([stars, percentage]) => (
          <div key={stars} className="flex items-center gap-3">
            <span className="text-sm font-poppins w-12">{stars} Star</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
