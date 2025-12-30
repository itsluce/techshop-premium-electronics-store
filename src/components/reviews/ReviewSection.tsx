'use client';

import { useState, useMemo } from 'react';
import { Review } from '@/types/product';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

type ReviewSectionProps = {
  reviews: Review[];
  averageRating: number;
};

type SortOption = 'most-helpful' | 'most-recent' | 'highest-rating' | 'lowest-rating';

export function ReviewSection({ reviews, averageRating }: ReviewSectionProps) {
  const [showCount, setShowCount] = useState(3);
  const [sortBy, setSortBy] = useState<SortOption>('most-helpful');

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Math.floor(review.rating) as 1 | 2 | 3 | 4 | 5;
      distribution[rating]++;
    });

    return Object.entries(distribution)
      .reverse()
      .map(([stars, count]) => ({
        stars: parseInt(stars),
        count,
        percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0,
      }));
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case 'most-helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful);
      case 'most-recent':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'highest-rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest-rating':
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const visibleReviews = sortedReviews.slice(0, showCount);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
        <p className="text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Overall Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-muted/30 rounded-lg">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-6xl font-bold">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} size="lg" />
          <p className="text-sm text-muted-foreground">
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{stars} star{stars !== 1 && 's'}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: (5 - stars) * 0.1 }}
                  className="h-full bg-yellow-400"
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Control */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-helpful">Most Helpful</SelectItem>
            <SelectItem value="most-recent">Most Recent</SelectItem>
            <SelectItem value="highest-rating">Highest Rating</SelectItem>
            <SelectItem value="lowest-rating">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {showCount < sortedReviews.length && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowCount((prev) => Math.min(prev + 3, sortedReviews.length))}
          >
            Show More Reviews ({sortedReviews.length - showCount} remaining)
          </Button>
        </div>
      )}

      {showCount > 3 && showCount >= sortedReviews.length && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => setShowCount(3)}>
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
}
