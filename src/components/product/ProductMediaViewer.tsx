'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { ProductViewer3D } from './ProductViewer3D';
import { ImageGallery } from './ImageGallery';
import { MediaToggle } from './MediaToggle';

type MediaMode = '3d' | 'gallery';

type ProductMediaViewerProps = {
  product: Product;
};

export function ProductMediaViewer({ product }: ProductMediaViewerProps) {
  const [mode, setMode] = useState<MediaMode>('3d');

  return (
    <div className="space-y-4">
      {/* Toggle Control */}
      <MediaToggle mode={mode} onToggle={setMode} />

      {/* Media Content - Keep both mounted for better performance */}
      <div className="relative">
        {/* 3D View */}
        <motion.div
          initial={false}
          animate={{
            opacity: mode === '3d' ? 1 : 0,
            x: mode === '3d' ? 0 : -20,
            display: mode === '3d' ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
        >
          <ProductViewer3D modelPath={product.model3d} />
        </motion.div>

        {/* Gallery View */}
        <motion.div
          initial={false}
          animate={{
            opacity: mode === 'gallery' ? 1 : 0,
            x: mode === 'gallery' ? 0 : 20,
            display: mode === 'gallery' ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
        >
          <ImageGallery
            images={product.images || [product.image]}
            productName={product.name}
          />
        </motion.div>
      </div>
    </div>
  );
}
