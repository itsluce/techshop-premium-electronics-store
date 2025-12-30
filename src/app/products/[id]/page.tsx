import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getProductById, getProductReviews } from '@/lib/products';
import { ProductDetails } from '@/components/product/ProductDetails';
import { PageTransition } from '@/components/transitions/PageTransition';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | TechShop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const reviews = await getProductReviews(id);

  return (
    <PageTransition>
      <div className="relative">
        <AnimatedBackground />
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 relative z-10">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <ProductDetails product={product} reviews={reviews} />
        </div>
      </div>
    </PageTransition>
  );
}
