import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground text-lg">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button asChild>
          <Link href="/">
            Back to Products
          </Link>
        </Button>
      </div>
    </div>
  );
}
