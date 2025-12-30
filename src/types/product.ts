export type Category = 'phones' | 'laptops' | 'headphones' | 'cameras';

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpful: number;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  images: string[];
  model3d: string;
  specs: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
};

