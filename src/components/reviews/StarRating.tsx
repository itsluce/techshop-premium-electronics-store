'use client';

import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
};

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function StarRating({ rating, size = 'md', showNumber = false, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${sizeClass} fill-yellow-400 text-yellow-400`}
          />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${sizeClass} text-yellow-400`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
            </div>
          </div>
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${sizeClass} text-yellow-400/30`}
          />
        ))}
      </div>

      {/* Rating Number */}
      {showNumber && (
        <span className={`${textSizeClass} font-semibold text-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}

      {/* Review Count */}
      {reviewCount !== undefined && (
        <span className={`${textSizeClass} text-muted-foreground`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
