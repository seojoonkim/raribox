'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Item } from '@/types';
import { formatPrice } from '@/lib/constants';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const primaryImage = item.images?.[0];
  const displayPrice = item.is_sale && item.sale_price ? item.sale_price : item.price;

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
      <Link href={`/item/${item.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
          <Image
            src={primaryImage?.url || '/placeholder-card.svg'}
            alt={primaryImage?.alt_text || item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {item.is_sale && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white border-none">
              SALE
            </Badge>
          )}
          {item.is_graded && (
            <Badge className="absolute top-2 right-2 bg-gold text-black border-none font-bold">
              {item.grade_company} {item.grade_score}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // TODO: toggle wishlist
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <CardContent className="p-3">
        <Link href={`/item/${item.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-gold transition-colors">
            {item.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          {item.condition && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {item.condition}
            </Badge>
          )}
          {item.set_name && (
            <span className="text-[10px] text-muted-foreground truncate">
              {item.set_name}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-lg">{formatPrice(displayPrice)}</span>
          {item.is_sale && item.sale_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(item.price)}
            </span>
          )}
        </div>
        {item.vendor && (
          <Link
            href={`/vendor/${item.vendor.slug}`}
            className="mt-1 text-[11px] text-muted-foreground hover:text-gold transition-colors block truncate"
          >
            {item.vendor.shop_name}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export function ItemCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] bg-secondary/30 animate-pulse" />
      <CardContent className="p-3 space-y-2">
        <div className="h-4 bg-secondary/50 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-secondary/50 rounded animate-pulse" />
        <div className="h-6 w-1/3 bg-secondary/50 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
