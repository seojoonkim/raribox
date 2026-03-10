'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { formatPrice, generateOrderNumber } from '@/lib/constants';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addr1: '',
    addr2: '',
    city: '',
    postal: '',
    country: 'AE',
  });

  const subtotal = total();
  const shipping = 5.99;
  const grandTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Nothing to checkout</h1>
        <Link href="/browse">
          <Button className="mt-4">Browse Items</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.addr1 || !formData.city || !formData.postal) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    // Simulate order creation
    await new Promise((r) => setTimeout(r, 1500));
    const orderNumber = generateOrderNumber();
    clearCart();
    toast.success('Order placed!', { description: `Order #${orderNumber}` });
    router.push(`/account/orders`);
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => update('name', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="addr1">Address Line 1 *</Label>
                  <Input id="addr1" value={formData.addr1} onChange={(e) => update('addr1', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="addr2">Address Line 2</Label>
                  <Input id="addr2" value={formData.addr2} onChange={(e) => update('addr2', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={formData.city} onChange={(e) => update('city', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="postal">Postal Code *</Label>
                    <Input id="postal" value={formData.postal} onChange={(e) => update('postal', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={formData.country} onChange={(e) => update('country', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                    paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-border'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Credit / Debit Card</span>
                  {paymentMethod === 'card' && <CheckCircle2 className="h-5 w-5 ml-auto text-gold" />}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                    paymentMethod === 'wallet' ? 'border-gold bg-gold/5' : 'border-border'
                  }`}
                >
                  <Wallet className="h-5 w-5" />
                  <span className="font-medium">Digital Wallet</span>
                  {paymentMethod === 'wallet' && <CheckCircle2 className="h-5 w-5 ml-auto text-gold" />}
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  Payment integration coming soon. Orders will be created with pending payment status.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((ci) => (
                  <div key={ci.item.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{ci.item.title} x{ci.quantity}</span>
                    <span className="shrink-0">
                      {formatPrice((ci.item.is_sale && ci.item.sale_price ? ci.item.sale_price : ci.item.price) * ci.quantity)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold">{formatPrice(grandTotal)}</span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold text-black hover:bg-gold/90 font-semibold mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
