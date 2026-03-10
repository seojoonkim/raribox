'use client';

import { useState } from 'react';
import { CheckCircle2Icon, XCircleIcon, BanIcon, EyeIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { getVendorTier } from '@/lib/constants';

interface AdminVendor {
  id: string;
  shopName: string;
  email: string;
  status: string;
  totalSales: number;
  rating: number;
  date: string;
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState<AdminVendor[]>([
    { id: '1', shopName: 'CardMaster Dubai', email: 'card@master.ae', status: 'active', totalSales: 342, rating: 4.8, date: '2024-01-15' },
    { id: '2', shopName: 'Rarity Vault', email: 'info@rarityvault.com', status: 'active', totalSales: 1203, rating: 4.95, date: '2023-06-20' },
    { id: '3', shopName: 'Tokyo Cards Co.', email: 'tokyo@cards.jp', status: 'pending', totalSales: 0, rating: 0, date: '2024-03-08' },
    { id: '4', shopName: 'Gulf Collectibles', email: 'gulf@collect.ae', status: 'suspended', totalSales: 45, rating: 3.2, date: '2024-02-10' },
  ]);

  const updateStatus = (id: string, status: string) => {
    setVendors(vendors.map((v) => v.id === id ? { ...v, status } : v));
    toast.success(`Vendor ${status}`);
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-500/10 text-green-500',
      pending: 'bg-yellow-500/10 text-yellow-500',
      suspended: 'bg-red-500/10 text-red-500',
    };
    return <Badge className={colors[status] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Vendor Management</h2>

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
              {vendors.map((vendor) => {
                const tier = getVendorTier(vendor.totalSales);
                return (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <p className="font-medium text-sm">{vendor.shopName}</p>
                      <p className="text-xs text-muted-foreground">{vendor.email}</p>
                    </TableCell>
                    <TableCell>{tier.icon} {tier.label}</TableCell>
                    <TableCell>{vendor.totalSales}</TableCell>
                    <TableCell>{vendor.rating > 0 ? vendor.rating : '—'}</TableCell>
                    <TableCell>{statusBadge(vendor.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {vendor.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-500"
                              onClick={() => updateStatus(vendor.id, 'active')}
                            >
                              <CheckCircle2Icon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => updateStatus(vendor.id, 'suspended')}
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {vendor.status === 'active' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => updateStatus(vendor.id, 'suspended')}
                          >
                            <BanIcon className="h-4 w-4" />
                          </Button>
                        )}
                        {vendor.status === 'suspended' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-500"
                            onClick={() => updateStatus(vendor.id, 'active')}
                          >
                            <CheckCircle2Icon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
