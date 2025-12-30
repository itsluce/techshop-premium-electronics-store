'use client';

import { Button } from '@/components/ui/button';
import { SearchInput } from './SearchInput';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { useFilters } from '@/contexts/FilterContext';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export function FilterBar() {
  const { resetFilters, searchQuery, selectedCategory, priceRange } = useFilters();
  const { min, max } = { min: 0, max: 6000 };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== null ||
    priceRange[0] !== min ||
    priceRange[1] !== max;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden space-y-4 p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/50"
    >
      <div className="absolute m-0 inset-0 bg-gradient-to-r from-foreground/2 via-muted-foreground/2 to-foreground/2 pointer-events-none dark:hidden" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-foreground/5 dark:bg-blue-500/10 border border-foreground/10 dark:border-blue-500/20 backdrop-blur-sm">
              <SlidersHorizontal className="h-5 w-5 text-foreground dark:text-blue-500" />
            </div>
            <h2 className="text-xl font-bold gradient-text-rainbow">
              Filters
            </h2>
          </div>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <SearchInput />
          </div>
          <CategoryFilter />
          <div className="sm:col-span-2 lg:col-span-1">
            <PriceRangeFilter />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
