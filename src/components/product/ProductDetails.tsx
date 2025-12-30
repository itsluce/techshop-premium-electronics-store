'use client';

import dynamic from 'next/dynamic';
import { Product, Review } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReviewSection } from '@/components/reviews/ReviewSection';

const ProductMediaViewer = dynamic(
  () => import('./ProductMediaViewer').then(mod => ({ default: mod.ProductMediaViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading product viewer...</p>
      </div>
    ),
  }
);

type ProductDetailsProps = {
  product: Product;
  reviews: Review[];
};

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const { addItem } = useCart();

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ProductMediaViewer product={product} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            {product.featured && (
              <Badge>Featured Product</Badge>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-3xl font-bold gradient-text-rainbow"
          >
            ${product.price.toLocaleString()}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-muted-foreground leading-relaxed"
          >
            {product.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="space-y-3 border-t pt-6"
          >
            <h2 className="font-semibold text-lg">Specifications</h2>
            <dl className="space-y-2">
              {Object.entries(product.specs).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                  className="flex gap-4"
                >
                  <dt className="font-medium min-w-[120px] text-muted-foreground">
                    {key}:
                  </dt>
                  <dd>{value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="flex items-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="flex-1"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </motion.div>

          {!product.inStock && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="text-sm text-muted-foreground"
            >
              This item is currently out of stock. Check back soon!
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <ReviewSection reviews={reviews} averageRating={product.rating} />
        </motion.div>
      )}
    </div>
  );
}
