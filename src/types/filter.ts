import { Category } from './product';

export type PriceRange = [number, number];

export type FilterState = {
  searchQuery: string;
  selectedCategory: Category | null;
  priceRange: PriceRange;
};
