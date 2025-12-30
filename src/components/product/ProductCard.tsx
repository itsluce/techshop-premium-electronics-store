'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Laptop, Headphones, Camera } from 'lucide-react';
import { useCardTilt3D } from '@/hooks/useCardTilt3D';
import { ImageSkeleton } from '@/components/loading/ImageSkeleton';
import { StarRating } from '@/components/reviews/StarRating';
import { useState } from 'react';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
};

const getCategoryGradient = (category: string) => {
  switch (category) {
    case 'phones':
      return 'from-blue-500 via-blue-600 to-indigo-700';
    case 'laptops':
      return 'from-foreground via-muted-foreground to-foreground dark:from-blue-500 dark:via-purple-500 dark:to-purple-600';
    case 'headphones':
      return 'from-emerald-500 via-teal-600 to-cyan-700';
    case 'cameras':
      return 'from-orange-500 via-red-600 to-rose-700';
    default:
      return 'from-gray-500 via-gray-600 to-slate-700';
  }
};

const getCategoryIcon = (category: string) => {
  const iconClass = "w-32 h-32 text-white/10";
  switch (category) {
    case 'phones':
      return <Smartphone className={iconClass} strokeWidth={1} />;
    case 'laptops':
      return <Laptop className={iconClass} strokeWidth={1} />;
    case 'headphones':
      return <Headphones className={iconClass} strokeWidth={1} />;
    case 'cameras':
      return <Camera className={iconClass} strokeWidth={1} />;
    default:
      return null;
  }
};

const getCategoryGlow = (category: string) => {
  switch (category) {
    case 'phones':
      return 'shadow-blue-500/30';
    case 'laptops':
      return 'shadow-foreground/20 dark:shadow-purple-500/30';
    case 'headphones':
      return 'shadow-teal-500/30';
    case 'cameras':
      return 'shadow-orange-500/30';
    default:
      return 'shadow-gray-500/30';
  }
};

export function ProductCard({ product }: ProductCardProps) {
  const { ref, style, onMouseMove, onMouseEnter, onMouseLeave, getLayerStyle, glareStyle } = useCardTilt3D({
    maxTiltX: 15,
    maxTiltY: 15,
    scale: 1.05,
    glareEffect: true,
    disableOnMobile: true,
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  // Use images array if available, fallback to single image
  const imageUrl = product.images?.[0] || product.image;

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="h-full"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={`group overflow-hidden transition-all duration-300 h-full preserve-3d glass-card glass-card-dark hover:shadow-2xl ${getCategoryGlow(product.category)} contain-layout border-2 border-border/50 hover:border-foreground/50 dark:hover:border-blue-500/50 hover:shadow-foreground/20 dark:hover:shadow-blue-500/20`}>
          {/* Glare effect overlay */}
          <div style={glareStyle} />

          {/* Background Layer - Product Image (Parallax depth: -20px) */}
          <div
            className="relative aspect-square overflow-hidden"
            style={getLayerStyle(-20, 0.5)}
          >
            {/* Product Image */}
            <div className="absolute inset-0">
              {!imageLoaded && <ImageSkeleton />}
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={product.featured}
              />
            </div>

            {/* Gradient Overlay (subtle, for visual depth) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(product.category)} opacity-10 pointer-events-none transition-opacity duration-300`} />

            {/* Dark gradient at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Middle Layer - Product Name (Parallax depth: 0px) */}
          <div
            className="absolute top-0 left-0 right-0 aspect-square pointer-events-none"
            style={getLayerStyle(0, 1)}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-2xl font-bold drop-shadow-lg line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Foreground Layer - Badges (Parallax depth: 20px) */}
          <div
            className="absolute top-0 left-0 right-0 aspect-square pointer-events-none"
            style={getLayerStyle(20, 1.5)}
          >
            {product.featured && (
              <Badge variant="secondary" className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg pointer-events-auto">
                Featured
              </Badge>
            )}
          </div>

          {/* Out of Stock Overlay (No parallax, always on top) */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
              <Badge variant="secondary" className="text-base px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}

          <CardContent className="p-6 relative space-y-3" style={getLayerStyle(10, 1.2)}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold line-clamp-1">{product.name}</h3>
              <Badge variant="outline" className="shrink-0 capitalize">
                {product.category}
              </Badge>
            </div>
            <StarRating
              rating={product.rating}
              size="sm"
              reviewCount={product.reviewCount}
            />
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </CardContent>

          <CardFooter className="p-6 pt-0 relative" style={getLayerStyle(15, 1.3)}>
            <p className="text-3xl font-bold gradient-text-rainbow">
              ${product.price.toLocaleString()}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
