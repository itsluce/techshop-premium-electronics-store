'use client';

import { Slider } from '@/components/ui/slider';
import { useFilters } from '@/contexts/FilterContext';
import { getPriceRange } from '@/lib/products';

export function PriceRangeFilter() {
  const { priceRange, setPriceRange } = useFilters();
  const defaultRange = getPriceRange();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Price Range
        </label>
        <span className="text-sm text-muted-foreground">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        min={defaultRange.min}
        max={defaultRange.max}
        step={50}
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        className="w-full"
      />
    </div>
  );
}
