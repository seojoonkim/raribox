import { DollarSignIcon, PackageIcon, ShoppingCartIcon, StarIcon, TrendingUpIcon } from '@/components/ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <Badge className="bg-primary/10 text-primary border-primary/20">🥇 Gold Seller</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <DollarSignIcon className="h-5 w-5 text-primary" />
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2">$12,450</p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <ShoppingCartIcon className="h-5 w-5 text-primary" />
            <p className="text-2xl font-bold mt-2">342</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <PackageIcon className="h-5 w-5 text-primary" />
            <p className="text-2xl font-bold mt-2">24</p>
            <p className="text-xs text-muted-foreground">Active Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <StarIcon className="h-5 w-5 text-primary" />
            <p className="text-2xl font-bold mt-2">4.8</p>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'RB-001', buyer: 'Ahmed K.', item: 'Charizard VMAX PSA 10', price: '$399', status: 'pending' },
              { id: 'RB-002', buyer: 'Sarah M.', item: 'Pikachu VMAX', price: '$85', status: 'shipped' },
              { id: 'RB-003', buyer: 'Omar R.', item: 'Goku Ultra Instinct SCR', price: '$159', status: 'delivered' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{order.item}</p>
                  <p className="text-xs text-muted-foreground">{order.buyer} · {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{order.price}</p>
                  <Badge variant="outline" className="text-[10px]">{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
