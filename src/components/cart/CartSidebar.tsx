'use client';

import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';

export function CartSidebar() {
  const { items, isOpen, closeCart, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="border-t dark:border-white/20 p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>

              <Button className="w-full" size="lg">
                Checkout
              </Button>

              <Button
                variant="destructive"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
