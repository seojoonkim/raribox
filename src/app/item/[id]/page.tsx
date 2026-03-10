'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {
  HeartIcon, ShoppingCartIcon, StarIcon, ShieldIcon, ChevronRightIcon,
  MinusIcon, PlusIcon, StoreIcon, ShareIcon, TruckIcon, RotateCcwIcon,
  AwardIcon, CopyIcon, GlobeIcon, MapPinIcon, CheckCircle2Icon,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemCard } from '@/components/items/ItemCard';
import { PriceChart } from '@/components/items/PriceChart';
import { mockItems, mockReviews } from '@/lib/mock-data';
import { formatPrice, getVendorTier, CONDITIONS } from '@/lib/constants';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

/* ── helpers ─────────────────────────────────────────────── */

function getGradeLabel(score: number | null): string {
  if (!score) return '';
  if (score === 10) return 'Gem Mint';
  if (score >= 9) return 'Mint';
  if (score >= 8) return 'Near Mint-Mint';
  if (score >= 7) return 'Near Mint';
  if (score >= 6) return 'Excellent-Mint';
  if (score >= 5) return 'Excellent';
  return 'Good';
}

function getConditionLabel(condition: string | null): string {
  const found = CONDITIONS.find((c) => c.value === condition);
  return found ? found.label : condition || '';
}

function getStockLabel(stock: number): string {
  if (stock === 0) return 'Out of stock';
  if (stock === 1) return '1 in stock — last one!';
  if (stock <= 3) return `Only ${stock} left`;
  return `${stock} in stock`;
}

/* ── Recently Viewed (localStorage) ──────────────────────── */

function useRecentlyViewed(currentId: string) {
  const [recentItems, setRecentItems] = useState<typeof mockItems>([]);

  useEffect(() => {
    const key = 'raribox_recently_viewed';
    const stored: string[] = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [currentId, ...stored.filter((id) => id !== currentId)].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(updated));

    const items = updated
      .filter((id) => id !== currentId)
      .map((id) => mockItems.find((i) => i.id === id))
      .filter(Boolean) as typeof mockItems;
    setRecentItems(items.slice(0, 4));
  }, [currentId]);

  return recentItems;
}

/* ── Star Rating Component ───────────────────────────────── */

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'h-4 w-4' : 'h-3 w-3';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`${cls} ${s <= Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground/40'}`}
        />
      ))}
    </div>
  );
}

/* ── Rating Bar ──────────────────────────────────────────── */

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-4 text-right text-muted-foreground">{star}</span>
      <StarIcon className="h-3 w-3 fill-primary text-primary" />
      <div className="flex-1 h-2 rounded-full bg-rari-elevated overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right text-xs text-muted-foreground">{count}</span>
    </div>
  );
}

/* ── Info Tag ────────────────────────────────────────────── */

function InfoTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-rari-elevated px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────── */

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = mockItems.find((i) => i.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const addItem = useCartStore((s) => s.addItem);
  const recentlyViewed = useRecentlyViewed(id);

  if (!item) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 text-center">
        <h1 className="text-2xl font-bold">Item not found</h1>
        <p className="text-muted-foreground mt-2">This item may have been removed or is no longer available.</p>
        <Link href="/browse">
          <Button className="mt-4 bg-primary hover:bg-indigo-500 text-white">Browse Items</Button>
        </Link>
      </div>
    );
  }

  const displayPrice = item.is_sale && item.sale_price ? item.sale_price : item.price;
  const vendor = item.vendor;
  const vendorTier = vendor ? getVendorTier(vendor.total_sales) : null;
  const reviews = mockReviews.filter((r) => r.item_id === item.id || r.vendor_id === vendor?.id);
  const relatedItems = mockItems.filter((i) => i.franchise_id === item.franchise_id && i.id !== item.id).slice(0, 6);
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleAddToCart = () => {
    addItem(item, quantity);
    toast.success('Added to cart', { description: `${item.title} x${quantity}` });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRightIcon className="h-3 w-3" />
        <Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
        {item.franchise && (
          <>
            <ChevronRightIcon className="h-3 w-3" />
            <Link href={`/browse/${item.franchise.slug}`} className="hover:text-foreground transition-colors">
              {item.franchise.name}
            </Link>
          </>
        )}
        <ChevronRightIcon className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[200px]">{item.title}</span>
      </nav>

      {/* ── Main Grid: Image + Info ────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

        {/* ── LEFT: Image Gallery ──────────────────────────── */}
        <div className="space-y-3">
          <div
            className="relative aspect-square rounded-xl overflow-hidden bg-rari-elevated border border-rari-border cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={item.images?.[selectedImage]?.url || '/placeholder-card.svg'}
              alt={item.title}
              fill
              className={`object-contain p-4 transition-transform duration-200 ${isZoomed ? 'scale-[2]' : ''}`}
              style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
              priority
            />
            {item.is_sale && (
              <Badge className="absolute top-3 left-3 bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm">
                SALE
              </Badge>
            )}
            {item.is_graded && (
              <Badge className="absolute top-3 right-3 bg-primary/20 text-indigo-300 border border-primary/30 backdrop-blur-sm font-bold text-sm px-2.5 py-1">
                {item.grade_company} {item.grade_score}
              </Badge>
            )}
          </div>
          {item.images && item.images.length > 1 && (
            <div className="flex gap-2">
              {item.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedImage
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-rari-border hover:border-rari-border-hover'
                  }`}
                >
                  <Image src={img.url} alt={img.alt_text || ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Product Info ──────────────────────────── */}
        <div className="space-y-5">

          {/* 1. Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {item.franchise && (
              <Badge className="bg-primary/10 text-indigo-300 border border-primary/20">
                {item.franchise.name}
              </Badge>
            )}
            {item.category && (
              <Badge variant="outline" className="text-muted-foreground">
                {item.category.name}
              </Badge>
            )}
            {item.rarity && (
              <Badge className="bg-rari-warning/10 text-amber-300 border border-rari-warning/20">
                {item.rarity}
              </Badge>
            )}
            {item.language && (
              <Badge variant="outline" className="text-muted-foreground">
                {item.language === 'EN' ? 'English' : item.language === 'JP' ? 'Japanese' : item.language === 'KR' ? 'Korean' : item.language}
              </Badge>
            )}
          </div>

          {/* 2. Title */}
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{item.title}</h1>

          {/* 3. Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
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
              {item.is_sale && item.sale_price && (
                <Badge className="bg-red-500/20 text-red-300 border border-red-500/30">
                  {Math.round((1 - item.sale_price / item.price) * 100)}% OFF
                </Badge>
              )}
            </div>
            <p className={`text-sm font-medium ${item.stock <= 3 && item.stock > 0 ? 'text-rari-warning' : item.stock === 0 ? 'text-rari-danger' : 'text-muted-foreground'}`}>
              {getStockLabel(item.stock)}
            </p>
          </div>

          <Separator className="border-rari-border" />

          {/* 4. Card Key Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {item.condition && <InfoTag label="Condition" value={`${item.condition} — ${getConditionLabel(item.condition)}`} />}
            {item.year && <InfoTag label="Year" value={String(item.year)} />}
            {item.set_name && <InfoTag label="Set" value={item.set_name} />}
            {item.card_number && <InfoTag label="Card #" value={item.card_number} />}
            {item.edition && <InfoTag label="Edition" value={item.edition} />}
            {item.language && <InfoTag label="Language" value={item.language === 'EN' ? 'English' : item.language === 'JP' ? 'Japanese' : item.language === 'KR' ? 'Korean' : item.language} />}
          </div>

          {/* 5. Grading Info (if graded) */}
          {item.is_graded && (
            <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-rari-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <AwardIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Certified Grade</p>
                    <p className="text-2xl font-bold">
                      {item.grade_company} <span className="text-primary">{item.grade_score}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{getGradeLabel(item.grade_score)}</p>
                  </div>
                  {item.grade_cert_no && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Cert #</p>
                      <p className="text-sm font-mono">{item.grade_cert_no}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 6. Purchase Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-rari-border rounded-lg">
                <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Add to Cart */}
              <Button
                className="flex-1 bg-primary hover:bg-indigo-500 text-white font-semibold h-11 text-base"
                onClick={handleAddToCart}
                disabled={item.stock === 0}
              >
                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-11 border-rari-border hover:bg-rari-elevated" disabled={item.stock === 0}>
                Make an Offer
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 border-rari-border hover:bg-rari-elevated hover:text-red-400">
                <HeartIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 border-rari-border hover:bg-rari-elevated" onClick={handleShare}>
                <ShareIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="border-rari-border" />

          {/* 7. Vendor Info Card */}
          {vendor && (
            <Card className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-rari-elevated border border-rari-border flex items-center justify-center">
                    <StoreIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/vendor/${vendor.slug}`} className="font-semibold hover:text-primary transition-colors">
                      {vendor.shop_name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs">
                        <Stars rating={vendor.rating_avg} />
                        <span className="text-muted-foreground">{vendor.rating_avg} ({vendor.rating_count})</span>
                      </span>
                      {vendorTier && (
                        <Badge className="bg-primary/10 text-indigo-300 border border-primary/20 text-[10px]">
                          {vendorTier.icon} {vendorTier.label} Seller
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Response Rate: {vendor.response_rate}%</span>
                      <span>{vendor.total_sales} sales</span>
                    </div>
                  </div>
                  <Link href={`/vendor/${vendor.slug}`}>
                    <Button variant="outline" size="sm" className="border-rari-border hover:bg-rari-elevated whitespace-nowrap">
                      View Shop
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 8. Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-rari-elevated p-3">
              <TruckIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs font-medium">Delivery</p>
                <p className="text-[10px] text-muted-foreground">3-7 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-rari-elevated p-3">
              <RotateCcwIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs font-medium">Returns</p>
                <p className="text-[10px] text-muted-foreground">14-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-rari-elevated p-3">
              <ShieldIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs font-medium">Protected</p>
                <p className="text-[10px] text-muted-foreground">Buyer guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs Section ───────────────────────────────────── */}
      <div className="mt-12">
        <Tabs defaultValue="price-history">
          <TabsList className="w-full justify-start bg-rari-elevated rounded-xl p-1 h-auto flex-wrap">
            <TabsTrigger value="price-history" className="rounded-lg">Price History</TabsTrigger>
            <TabsTrigger value="details" className="rounded-lg">Card Details</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-lg">Shipping & Returns</TabsTrigger>
          </TabsList>

          {/* Tab 1: Price History */}
          <TabsContent value="price-history" className="mt-4">
            <PriceChart basePrice={item.price} />
          </TabsContent>

          {/* Tab 2: Card Details */}
          <TabsContent value="details" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Common Card Info */}
              <Card className="rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Card Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.set_name && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Set</span>
                        <span className="font-medium">{item.set_name}</span>
                      </div>
                    )}
                    {item.card_number && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Card Number</span>
                        <span className="font-medium">{item.card_number}</span>
                      </div>
                    )}
                    {item.rarity && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rarity</span>
                        <span className="font-medium">{item.rarity}</span>
                      </div>
                    )}
                    {item.edition && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Edition</span>
                        <span className="font-medium">{item.edition}</span>
                      </div>
                    )}
                    {item.year && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">{item.year}</span>
                      </div>
                    )}
                    {item.condition && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Condition</span>
                        <span className="font-medium">{item.condition} — {getConditionLabel(item.condition)}</span>
                      </div>
                    )}
                    {item.language && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Language</span>
                        <span className="font-medium">{item.language === 'EN' ? 'English' : item.language === 'JP' ? 'Japanese' : item.language === 'KR' ? 'Korean' : item.language}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Grading Info (if graded) */}
              {item.is_graded ? (
                <Card className="rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Grading Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grading Company</span>
                        <span className="font-bold">{item.grade_company}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grade Score</span>
                        <span className="font-bold text-primary text-lg">{item.grade_score}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grade Description</span>
                        <span className="font-medium">{getGradeLabel(item.grade_score)}</span>
                      </div>
                      {item.grade_cert_no && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cert Number</span>
                          <span className="font-mono text-sm">{item.grade_cert_no}</span>
                        </div>
                      )}
                      <Separator className="border-rari-border" />
                      <div className="rounded-lg bg-rari-elevated p-3">
                        <p className="text-xs text-muted-foreground">
                          {item.grade_company} Grade Scale: 10 = Gem Mint, 9 = Mint, 8 = NM-MT, 7 = NM, 6 = EX-MT, 5 = EX
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description || 'No description provided for this item.'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tab 3: Reviews */}
          <TabsContent value="reviews" className="mt-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Rating Summary */}
              <Card className="rounded-xl md:col-span-1">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-5xl font-bold">{avgRating.toFixed(1)}</p>
                    <Stars rating={avgRating} size="md" />
                    <p className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</p>
                  </div>
                  <div className="space-y-2">
                    {ratingDist.map((rd) => (
                      <RatingBar key={rd.star} star={rd.star} count={rd.count} total={reviews.length} />
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-rari-border hover:bg-rari-elevated">
                    Write a Review
                  </Button>
                </CardContent>
              </Card>

              {/* Review List */}
              <div className="md:col-span-2 space-y-3">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review.id} className="rounded-xl">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-rari-elevated border border-rari-border flex items-center justify-center text-sm font-bold">
                              {review.user?.name?.[0] || '?'}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{review.user?.name}</p>
                              <div className="flex items-center gap-2">
                                <Stars rating={review.rating} />
                                {review.is_verified && (
                                  <span className="flex items-center gap-0.5 text-[10px] text-rari-success">
                                    <CheckCircle2Icon className="h-3 w-3" /> Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        {review.title && (
                          <p className="text-sm font-semibold mt-3">{review.title}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="rounded-xl">
                    <CardContent className="p-8 text-center">
                      <StarIcon className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this item!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Shipping & Returns */}
          <TabsContent value="shipping" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <TruckIcon className="h-4 w-4" /> Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Standard Shipping</span>
                      <span>3-7 business days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Express Shipping</span>
                      <span>1-3 business days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Free Shipping</span>
                      <span>Orders over $100</span>
                    </div>
                    <Separator className="border-rari-border" />
                    <div className="rounded-lg bg-rari-elevated p-3">
                      <p className="text-xs text-muted-foreground">
                        All items are carefully packaged with protective materials. Graded cards are shipped in slab-safe packaging.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <ShieldIcon className="h-4 w-4" /> Returns & Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Return Window</span>
                      <span>14 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Return Shipping</span>
                      <span>Buyer pays</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Authenticity</span>
                      <span className="text-rari-success flex items-center gap-1">
                        <CheckCircle2Icon className="h-3 w-3" /> Guaranteed
                      </span>
                    </div>
                    <Separator className="border-rari-border" />
                    <div className="rounded-lg bg-rari-elevated p-3">
                      <p className="text-xs text-muted-foreground">
                        Every purchase on RariBox is backed by our Buyer Protection guarantee. Items not as described? Get a full refund.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Related Items ──────────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Related Items</h2>
            <Link href={`/browse/${item.franchise?.slug || ''}`} className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedItems.map((ri) => (
              <ItemCard key={ri.id} item={ri} />
            ))}
          </div>
        </section>
      )}

      {/* ── Recently Viewed ────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map((ri) => (
              <ItemCard key={ri.id} item={ri} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
