'use client';

import { useState } from 'react';
import { CheckCircle2Icon, XCircleIcon, EyeIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockItems } from '@/lib/mock-data';
import { formatPrice } from '@/lib/constants';
import { toast } from 'sonner';

export default function AdminProducts() {
  const [products, setProducts] = useState(
    mockItems.map((item) => ({ ...item }))
  );

  const toggleStatus = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'inactive' as const : 'active' as const }
          : p
      )
    );
    toast.success('Product status updated');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Product Management ({products.length})</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.set_name}</p>
                  </TableCell>
                  <TableCell className="text-sm">{product.vendor?.shop_name}</TableCell>
                  <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/item/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${product.status === 'active' ? 'text-red-500' : 'text-green-500'}`}
                        onClick={() => toggleStatus(product.id)}
                      >
                        {product.status === 'active' ? (
                          <XCircleIcon className="h-4 w-4" />
                        ) : (
                          <CheckCircle2Icon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
