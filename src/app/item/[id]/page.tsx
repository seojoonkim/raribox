'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  HeartIcon, ShoppingCartIcon, StarIcon, ShieldIcon, ChevronRightIcon, MinusIcon, PlusIcon, StoreIcon
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemCard } from '@/components/items/ItemCard';
import { PriceChart } from '@/components/items/PriceChart';
import { mockItems, mockReviews } from '@/lib/mock-data';
import { formatPrice, getVendorTier } from '@/lib/constants';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = mockItems.find((i) => i.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (!item) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 text-center">
        <h1 className="text-2xl font-bold">Item not found</h1>
        <p className="text-muted-foreground mt-2">This item may have been removed or is no longer available.</p>
        <Link href="/browse">
          <Button className="mt-4">Browse Items</Button>
        </Link>
      </div>
    );
  }

  const displayPrice = item.is_sale && item.sale_price ? item.sale_price : item.price;
  const vendor = item.vendor;
  const vendorTier = vendor ? getVendorTier(vendor.total_sales) : null;
  const reviews = mockReviews.filter((r) => r.item_id === item.id || r.vendor_id === vendor?.id);
  const relatedItems = mockItems.filter((i) => i.franchise_id === item.franchise_id && i.id !== item.id);

  const handleAddToCart = () => {
    addItem(item, quantity);
    toast.success('Added to cart', { description: `${item.title} x${quantity}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRightIcon className="h-3 w-3" />
        <Link href="/browse" className="hover:text-foreground">Browse</Link>
        <ChevronRightIcon className="h-3 w-3" />
        <span className="text-foreground truncate">{item.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/30 border border-border">
            <Image
              src={item.images?.[selectedImage]?.url || '/placeholder-card.svg'}
              alt={item.title}
              fill
              className="object-contain p-4"
              priority
            />
            {item.is_sale && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white border-none text-sm">
                SALE
              </Badge>
            )}
          </div>
          {item.images && item.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {item.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-primary' : 'border-border'
                  }`}
                >
                  <Image src={img.url} alt={img.alt_text || ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.condition && <Badge variant="outline">{item.condition}</Badge>}
            {item.is_graded && (
              <Badge className="bg-primary text-white border-none font-bold">
                {item.grade_company} {item.grade_score}
              </Badge>
            )}
            {item.rarity && <Badge variant="secondary">{item.rarity}</Badge>}
            {item.language && item.language !== 'EN' && <Badge variant="outline">{item.language}</Badge>}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{item.title}</h1>

          {item.set_name && (
            <p className="text-sm text-muted-foreground mt-1">
              {item.set_name} {item.card_number && `· ${item.card_number}`}
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatPrice(displayPrice)}</span>
            {item.is_sale && item.sale_price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(item.price)}
              </span>
            )}
            {item.compare_price && !item.is_sale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(item.compare_price)}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
          </p>

          <Separator className="my-4" />

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="flex-1 bg-primary hover:bg-indigo-500 text-white font-semibold h-10"
              onClick={handleAddToCart}
              disabled={item.stock === 0}
            >
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <HeartIcon className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full mt-3 h-10"
            onClick={handleAddToCart}
            disabled={item.stock === 0}
          >
            Buy Now
          </Button>

          <Separator className="my-4" />

          {/* Vendor Info Card */}
          {vendor && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-lg">
                    <StoreIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/vendor/${vendor.slug}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {vendor.shop_name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      {vendorTier && (
                        <span className="text-xs">
                          {vendorTier.icon} {vendorTier.label}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <StarIcon className="h-3 w-3 fill-primary text-primary" />
                        {vendor.rating_avg} ({vendor.rating_count})
                      </span>
                    </div>
                  </div>
                  <Link href={`/vendor/${vendor.slug}`}>
                    <Button variant="outline" size="sm">Visit Shop</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldIcon className="h-3 w-3" /> Buyer Protection
            </span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="mt-8">
        <PriceChart basePrice={item.price} />
      </div>

      {/* Tabs: Description, Reviews */}
      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description || 'No description provided.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold">
                          {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
                        </div>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon
                              key={s}
                              className={`h-4 w-4 ${
                                s <= Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reviews.length} reviews
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                            {review.user?.name?.[0] || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{review.user?.name}</p>
                            <div className="flex items-center gap-1">
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
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <p className="text-sm font-medium mt-3">{review.title}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                      {review.is_verified && (
                        <Badge variant="outline" className="mt-2 text-[10px]">
                          <ShieldIcon className="h-3 w-3 mr-1" /> Verified Purchase
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No reviews yet. Be the first to review this item!
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {item.set_name && (
                    <>
                      <span className="text-muted-foreground">Set</span>
                      <span>{item.set_name}</span>
                    </>
                  )}
                  {item.card_number && (
                    <>
                      <span className="text-muted-foreground">Card Number</span>
                      <span>{item.card_number}</span>
                    </>
                  )}
                  {item.condition && (
                    <>
                      <span className="text-muted-foreground">Condition</span>
                      <span>{item.condition}</span>
                    </>
                  )}
                  {item.year && (
                    <>
                      <span className="text-muted-foreground">Year</span>
                      <span>{item.year}</span>
                    </>
                  )}
                  {item.rarity && (
                    <>
                      <span className="text-muted-foreground">Rarity</span>
                      <span>{item.rarity}</span>
                    </>
                  )}
                  {item.language && (
                    <>
                      <span className="text-muted-foreground">Language</span>
                      <span>{item.language}</span>
                    </>
                  )}
                  {item.is_graded && (
                    <>
                      <span className="text-muted-foreground">Grade</span>
                      <span>{item.grade_company} {item.grade_score}</span>
                      <span className="text-muted-foreground">Cert #</span>
                      <span>{item.grade_cert_no}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
