'use client';

import Image from 'next/image';
import {Minus, Plus, Trash, X} from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b dark:border-white/20">
      <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
        <Image
          src={item.product.images?.[0] || item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mr-2"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <Trash  className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        <p className="text-sm font-semibold">${item.product.price.toLocaleString()}</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
