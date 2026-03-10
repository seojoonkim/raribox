'use client';

import Link from 'next/link';
import { PlusIcon, EditIcon, Trash2Icon, EyeIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockItems } from '@/lib/mock-data';
import { formatPrice } from '@/lib/constants';

export default function VendorProducts() {
  const products = mockItems.filter((i) => i.vendor_id === 'v1');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Products ({products.length})</h2>
        <Link href="/vendor-portal/products/new">
          <Button size="sm" className="bg-gold text-black hover:bg-gold/90">
            <PlusIcon className="h-4 w-4 mr-1" /> Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                      <p className="text-xs text-muted-foreground">{product.set_name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2Icon className="h-4 w-4" />
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
