import { DollarSign, Users, Store, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$48,250', icon: DollarSign, trend: '+12%' },
    { label: 'Total Users', value: '1,234', icon: Users, trend: '+8%' },
    { label: 'Active Vendors', value: '56', icon: Store, trend: '+3' },
    { label: 'Total Products', value: '892', icon: Package, trend: '+24' },
    { label: 'Total Orders', value: '2,145', icon: ShoppingCart, trend: '+15%' },
    { label: 'Pending Approvals', value: '7', icon: TrendingUp, trend: '' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-gold" />
                  {stat.trend && (
                    <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
                  )}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'New vendor registration', detail: 'Tokyo Cards Co.', time: '5 min ago' },
              { action: 'Order completed', detail: 'RB-XYZ123 - $399', time: '1 hour ago' },
              { action: 'Product flagged', detail: 'Suspicious listing #456', time: '3 hours ago' },
              { action: 'Vendor approved', detail: 'Gulf Collectibles', time: '1 day ago' },
              { action: 'New user registered', detail: 'john@example.com', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
