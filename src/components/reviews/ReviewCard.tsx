'use client';

import { Review } from '@/types/product';
import { StarRating } from './StarRating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 space-y-4">
          {/* Header: User Info and Rating */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-base">{review.userName}</h4>
                {review.verifiedPurchase && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(review.date)}
              </p>
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>

          {/* Review Comment */}
          <p className="text-sm leading-relaxed text-foreground">
            {review.comment}
          </p>

          {/* Footer: Helpful Button */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
