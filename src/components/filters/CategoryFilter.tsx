'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFilters } from '@/contexts/FilterContext';
import { getCategories } from '@/lib/products';
import { Category } from '@/types/product';

export function CategoryFilter() {
  const { selectedCategory, setCategory } = useFilters();
  const categories = getCategories();

  return (
    <Select
      value={selectedCategory || 'all'}
      onValueChange={(value) => setCategory(value === 'all' ? null : value as Category)}
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
