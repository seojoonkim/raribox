import { PackageIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  confirmed: 'bg-blue-500/10 text-blue-500',
  shipped: 'bg-purple-500/10 text-purple-500',
  delivered: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
};

export default function OrdersPage() {
  // Mock orders for demo
  const orders = [
    {
      id: '1',
      order_number: 'RB-XYZ123-ABCD',
      total: 399,
      status: 'delivered',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      items: [{ title: 'Charizard VMAX Rainbow Rare - PSA 10', quantity: 1, price: 399 }],
    },
    {
      id: '2',
      order_number: 'RB-ABC456-EFGH',
      total: 120,
      status: 'shipped',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [{ title: 'Luffy Gear 5 - Paramount War OP02', quantity: 1, price: 120 }],
    },
  ];

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <PackageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">No orders yet</h2>
        <p className="text-sm text-muted-foreground">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Order History</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium">{order.order_number}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
              <Badge className={statusColors[order.status] || ''}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{item.title} x{item.quantity}</span>
                <span className="font-medium">${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-border">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
