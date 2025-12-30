'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

export function CartButton() {
  const { totalItems, openCart, isHydrated } = useCart();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={openCart}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {isHydrated && totalItems > 0 && (
        <Badge
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          variant="default"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
}
