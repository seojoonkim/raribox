import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getVendorTier } from '@/lib/constants';
import VendorActions from './vendor-actions';

async function getVendors() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-500',
    pending: 'bg-yellow-500/10 text-yellow-500',
    suspended: 'bg-red-500/10 text-red-500',
    banned: 'bg-red-500/10 text-red-500',
  };
  return <Badge className={colors[status] || ''}>{status}</Badge>;
}

export default async function AdminVendors() {
  const vendors = await getVendors();
  const pending = vendors.filter((v) => v.status === 'pending');
  const rest = vendors.filter((v) => v.status !== 'pending');
  const sorted = [...pending, ...rest];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        Vendor Management ({vendors.length})
        {pending.length > 0 && (
          <span className="ml-2 text-sm text-yellow-500">({pending.length} pending)</span>
        )}
      </h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No vendors found
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((vendor) => {
                  const tier = getVendorTier(vendor.total_sales ?? 0);
                  return (
                    <TableRow key={vendor.id} className={vendor.status === 'pending' ? 'bg-yellow-500/5' : ''}>
                      <TableCell>
                        <p className="font-medium text-sm">{vendor.shop_name}</p>
                        <p className="text-xs text-muted-foreground">{vendor.slug}</p>
                      </TableCell>
                      <TableCell>{tier.icon} {tier.label}</TableCell>
                      <TableCell>{vendor.total_sales ?? 0}</TableCell>
                      <TableCell>{vendor.rating_avg > 0 ? vendor.rating_avg.toFixed(1) : '—'}</TableCell>
                      <TableCell>{statusBadge(vendor.status)}</TableCell>
                      <TableCell className="text-right">
                        <VendorActions id={vendor.id} status={vendor.status} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
