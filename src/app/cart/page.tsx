'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2Icon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/constants';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  // Group by vendor
  const grouped = items.reduce<Record<string, typeof items>>((acc, ci) => {
    const vendorName = ci.item.vendor?.shop_name || 'Unknown';
    if (!acc[vendorName]) acc[vendorName] = [];
    acc[vendorName].push(ci);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 text-center">
        <ShoppingBagIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Start shopping to add items to your cart.</p>
        <Link href="/browse">
          <Button className="mt-6 bg-primary hover:bg-indigo-500 text-white">Browse Marketplace</Button>
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shippingEstimate = Object.keys(grouped).length * 5.99;
  const grandTotal = subtotal + shippingEstimate;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(grouped).map(([vendorName, vendorItems]) => (
            <Card key={vendorName}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Sold by {vendorName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vendorItems.map((ci) => {
                  const price = ci.item.is_sale && ci.item.sale_price ? ci.item.sale_price : ci.item.price;
                  return (
                    <div key={ci.item.id} className="flex gap-4">
                      <div className="relative h-24 w-20 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                        <Image
                          src={ci.item.images?.[0]?.url || '/placeholder-card.svg'}
                          alt={ci.item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/item/${ci.item.id}`} className="text-sm font-medium hover:text-primary line-clamp-2">
                          {ci.item.title}
                        </Link>
                        <p className="text-sm font-bold mt-1">{formatPrice(price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                            >
                              <MinusIcon className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{ci.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                            >
                              <PlusIcon className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeItem(ci.item.id)}
                          >
                            <Trash2Icon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(price * ci.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Shipping ({Object.keys(grouped).length} vendor{Object.keys(grouped).length > 1 ? 's' : ''})
                </span>
                <span>{formatPrice(shippingEstimate)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(grandTotal)}</span>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary hover:bg-indigo-500 text-white font-semibold mt-2">
                  Proceed to Checkout
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
