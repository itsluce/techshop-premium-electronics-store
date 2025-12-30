'use client';

import { createContext, useContext, useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/types/product';
import { FilterState, PriceRange } from '@/types/filter';
import { getPriceRange } from '@/lib/products';

type FilterContextType = FilterState & {
  setSearchQuery: (query: string) => void;
  setCategory: (category: Category | null) => void;
  setPriceRange: (range: PriceRange) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function FilterProviderContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultPriceRange = getPriceRange();

  const [searchQuery, setSearchQueryState] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState<Category | null>(null);
  const [priceRange, setPriceRangeState] = useState<PriceRange>([
    defaultPriceRange.min,
    defaultPriceRange.max,
  ]);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const category = searchParams.get('category') as Category | null;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    setSearchQueryState(query);
    setSelectedCategoryState(category);

    if (minPrice && maxPrice) {
      setPriceRangeState([Number(minPrice), Number(maxPrice)]);
    }
  }, []);

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  }, [pathname, router]);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    updateURL({ search: query || null });
  }, [updateURL]);

  const setCategory = useCallback((category: Category | null) => {
    setSelectedCategoryState(category);
    updateURL({ category });
  }, [updateURL]);

  const setPriceRange = useCallback((range: PriceRange) => {
    setPriceRangeState(range);
    updateURL({
      minPrice: range[0].toString(),
      maxPrice: range[1].toString(),
    });
  }, [updateURL]);

  const resetFilters = useCallback(() => {
    setSearchQueryState('');
    setSelectedCategoryState(null);
    setPriceRangeState([defaultPriceRange.min, defaultPriceRange.max]);
    router.push(pathname, { scroll: false });
  }, [defaultPriceRange, pathname, router]);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        selectedCategory,
        priceRange,
        setSearchQuery,
        setCategory,
        setPriceRange,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FilterProviderFallback>{children}</FilterProviderFallback>}>
      <FilterProviderContent>{children}</FilterProviderContent>
    </Suspense>
  );
}

function FilterProviderFallback({ children }: { children: React.ReactNode }) {
  const defaultPriceRange = getPriceRange();

  return (
    <FilterContext.Provider
      value={{
        searchQuery: '',
        selectedCategory: null,
        priceRange: [defaultPriceRange.min, defaultPriceRange.max],
        setSearchQuery: () => {},
        setCategory: () => {},
        setPriceRange: () => {},
        resetFilters: () => {},
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
}
