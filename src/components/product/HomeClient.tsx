'use client';

import { useMemo } from 'react';
import { Product } from '@/types/product';
import { ProductGrid } from './ProductGrid';
import { FilterBar } from '@/components/filters/FilterBar';
import { useFilters } from '@/contexts/FilterContext';
import { filterProducts } from '@/lib/products';
import { motion } from 'framer-motion';

type HomeClientProps = {
  products: Product[];
};

export function HomeClient({ products }: HomeClientProps) {
  const filters = useFilters();

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <FilterBar />
      </motion.div>
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-6 text-sm text-muted-foreground"
        >
          Showing {filteredProducts.length} of {products.length} products
        </motion.div>
        <ProductGrid products={filteredProducts} />
      </div>
    </>
  );
}
