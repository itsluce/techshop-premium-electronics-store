import productsData from '@/data/products.json';
import reviewsData from '@/data/reviews.json';
import { Product, Category, Review } from '@/types/product';
import { FilterState } from '@/types/filter';

export async function getProducts(): Promise<Product[]> {
  return productsData.products as unknown as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = (productsData.products as unknown as Product[]).find((p) => p.id === id);
  return product || null;
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    const matchesSearch = filters.searchQuery === '' ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCategory = !filters.selectedCategory ||
      product.category === filters.selectedCategory;

    const matchesPrice = product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

export function getCategories() {
  return productsData.categories;
}

export function getPriceRange() {
  return productsData.priceRange;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const reviews = (reviewsData as Record<string, Review[]>)[productId];
  return reviews || [];
}
