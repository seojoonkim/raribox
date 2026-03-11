import { DollarSignIcon, UsersIcon, StoreIcon, PackageIcon, ShoppingCartIcon, TrendingUpIcon } from '@/components/ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createAdminClient } from '@/lib/supabase/admin';

async function getDashboardData() {
  const supabase = createAdminClient();

  const [
    { count: totalVendors },
    { count: activeVendors },
    { count: totalProducts },
    { count: totalOrders },
    { count: pendingVendors },
    revenueResult,
    recentVendors,
    recentItems,
  ] = await Promise.all([
    supabase.from('vendors').select('*', { count: 'exact', head: true }),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('items').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('total'),
    supabase.from('vendors').select('shop_name, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('items').select('title, status, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  const revenue = revenueResult.data?.reduce((sum: number, o: { total: number }) => sum + (o.total || 0), 0) ?? 0;

  return {
    totalVendors: totalVendors ?? 0,
    activeVendors: activeVendors ?? 0,
    totalProducts: totalProducts ?? 0,
    totalOrders: totalOrders ?? 0,
    pendingVendors: pendingVendors ?? 0,
    revenue,
    recentVendors: recentVendors.data ?? [],
    recentItems: recentItems.data ?? [],
  };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { label: 'Total Revenue', value: `$${data.revenue.toLocaleString()}`, icon: DollarSignIcon },
    { label: 'Total Vendors', value: data.totalVendors.toLocaleString(), icon: StoreIcon },
    { label: 'Active Vendors', value: data.activeVendors.toLocaleString(), icon: UsersIcon },
    { label: 'Total Products', value: data.totalProducts.toLocaleString(), icon: PackageIcon },
    { label: 'Total Orders', value: data.totalOrders.toLocaleString(), icon: ShoppingCartIcon },
    { label: 'Pending Approvals', value: data.pendingVendors.toLocaleString(), icon: TrendingUpIcon },
  ];

  const activities = [
    ...data.recentVendors.map((v: { shop_name: string; status: string; created_at: string }) => ({
      action: v.status === 'pending' ? 'New vendor registration' : 'Vendor update',
      detail: v.shop_name,
      time: timeAgo(v.created_at),
      sortDate: v.created_at,
    })),
    ...data.recentItems.map((i: { title: string; status: string; created_at: string }) => ({
      action: 'New product listed',
      detail: i.title,
      time: timeAgo(i.created_at),
      sortDate: i.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-xl hover:border-rari-accent/30 hover:shadow-lg hover:shadow-rari-accent/10 transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No recent activity</p>
            ) : (
              activities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
