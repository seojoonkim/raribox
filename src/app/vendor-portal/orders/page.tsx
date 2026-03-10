'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  shipped: 'bg-blue-500/10 text-blue-500',
  delivered: 'bg-green-500/10 text-green-500',
};

interface Order {
  id: string;
  orderNumber: string;
  buyer: string;
  item: string;
  price: number;
  quantity: number;
  status: string;
  date: string;
}

export default function VendorOrders() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', orderNumber: 'RB-001', buyer: 'Ahmed K.', item: 'Charizard VMAX PSA 10', price: 399, quantity: 1, status: 'pending', date: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', orderNumber: 'RB-002', buyer: 'Sarah M.', item: 'Pikachu VMAX', price: 85, quantity: 1, status: 'shipped', date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: '3', orderNumber: 'RB-003', buyer: 'Omar R.', item: 'Son Goku Ultra Instinct', price: 159, quantity: 1, status: 'delivered', date: new Date(Date.now() - 86400000 * 5).toISOString() },
  ]);

  const handleShip = (orderId: string) => {
    setOrders(orders.map((o) => o.id === orderId ? { ...o, status: 'shipped' } : o));
    toast.success('Order marked as shipped');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Orders ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()} · {order.buyer}
                  </p>
                </div>
                <Badge className={statusColors[order.status] || ''}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{order.item} x{order.quantity}</p>
                  <p className="text-sm font-bold">${order.price}</p>
                </div>
                {order.status === 'pending' && (
                  <Dialog>
                    <DialogTrigger
                      render={<Button size="sm" className="bg-gold text-black hover:bg-gold/90" />}
                    >
                      <Truck className="h-4 w-4 mr-1" /> Ship
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ship Order {order.orderNumber}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Tracking Number</Label>
                          <Input placeholder="Enter tracking number" />
                        </div>
                        <div>
                          <Label>Carrier</Label>
                          <Input placeholder="e.g. Aramex, DHL" />
                        </div>
                        <Button
                          className="w-full bg-gold text-black hover:bg-gold/90"
                          onClick={() => handleShip(order.id)}
                        >
                          Confirm Shipment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {order.status === 'shipped' && (
                  <Badge variant="outline" className="text-blue-500">
                    <Truck className="h-3 w-3 mr-1" /> In Transit
                  </Badge>
                )}
                {order.status === 'delivered' && (
                  <Badge variant="outline" className="text-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Delivered
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
