'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { StarIcon, MessageCircleIcon, PackageIcon, ClockIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemCard } from '@/components/items/ItemCard';
import { mockVendors, mockItems, mockReviews } from '@/lib/mock-data';
import { getVendorTier } from '@/lib/constants';

export default function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const vendor = mockVendors.find((v) => v.slug === slug);

  if (!vendor) return notFound();

  const items = mockItems.filter((i) => i.vendor_id === vendor.id);
  const reviews = mockReviews.filter((r) => r.vendor_id === vendor.id);
  const tier = getVendorTier(vendor.total_sales);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      {/* Vendor Header */}
      <Card className="overflow-hidden">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary/20 to-primary/5" />
        <CardContent className="p-6 -mt-12">
          <div className="flex items-end gap-4">
            <div className="h-24 w-24 rounded-xl bg-card border-4 border-background flex items-center justify-center text-3xl shadow-lg">
              {tier.icon}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{vendor.shop_name}</h1>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {tier.icon} {tier.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {vendor.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <StarIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold">{vendor.rating_avg}</p>
              <p className="text-xs text-muted-foreground">{vendor.rating_count} ratings</p>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <PackageIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold">{vendor.total_sales}</p>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <MessageCircleIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold">{vendor.response_rate}%</p>
              <p className="text-xs text-muted-foreground">Response Rate</p>
            </div>
            <div className="text-center p-3 bg-secondary/50 rounded-lg">
              <ClockIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold">
                {new Date(vendor.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-xs text-muted-foreground">Member Since</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products ({items.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            {items.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                No products listed yet.
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                          {review.user?.name?.[0] || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.user?.name}</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <StarIcon
                                key={s}
                                className={`h-3 w-3 ${
                                  s <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && <p className="text-sm font-medium">{review.title}</p>}
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                No reviews yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
