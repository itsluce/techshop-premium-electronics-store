import { getProducts } from '@/lib/products';
import { HomeClient } from '@/components/product/HomeClient';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';
import { PageTransition } from '@/components/transitions/PageTransition';
import { HeroSection } from '@/components/home/HeroSection';

export default async function Home() {
  const products = await getProducts();

  return (
    <PageTransition>
      <div className="relative">
        <AnimatedBackground />
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 relative z-10">
          <HeroSection />
          <HomeClient products={products} />
        </div>
      </div>
    </PageTransition>
  );
}
