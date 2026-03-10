import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  confirmed: 'bg-blue-500/10 text-blue-500',
  shipped: 'bg-purple-500/10 text-purple-500',
  delivered: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
};

const orders = [
  { id: 'RB-001', buyer: 'Ahmed K.', vendor: 'CardMaster Dubai', total: 399, status: 'delivered', date: '2024-03-05' },
  { id: 'RB-002', buyer: 'Sarah M.', vendor: 'CardMaster Dubai', total: 85, status: 'shipped', date: '2024-03-07' },
  { id: 'RB-003', buyer: 'Omar R.', vendor: 'Rarity Vault', total: 120, status: 'pending', date: '2024-03-09' },
  { id: 'RB-004', buyer: 'Fatima A.', vendor: 'Rarity Vault', total: 1200, status: 'confirmed', date: '2024-03-09' },
  { id: 'RB-005', buyer: 'John D.', vendor: 'CardMaster Dubai', total: 28, status: 'cancelled', date: '2024-03-01' },
];

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">All Orders ({orders.length})</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-sm">{order.id}</TableCell>
                  <TableCell className="text-sm">{order.buyer}</TableCell>
                  <TableCell className="text-sm">{order.vendor}</TableCell>
                  <TableCell className="font-medium">${order.total}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status] || ''}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
