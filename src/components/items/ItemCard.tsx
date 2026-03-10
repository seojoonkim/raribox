'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Item } from '@/types';
import { formatPrice } from '@/lib/constants';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const primaryImage = item.images?.find((img) => img.is_primary) || item.images?.[0];
  const displayPrice = item.is_sale && item.sale_price ? item.sale_price : item.price;
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="group overflow-hidden rounded-xl bg-[#131929] border-white/[0.06] hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 pt-0">
      <Link href={`/item/${item.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#161B2E]">
          {primaryImage?.url && !imgError ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text || item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#161B2E] to-[#131929] flex items-center justify-center p-4">
              <span className="text-sm font-medium text-muted-foreground text-center line-clamp-3">
                {item.title}
              </span>
            </div>
          )}
          {item.is_sale && (
            <Badge className="absolute top-2 left-2 bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm">
              SALE
            </Badge>
          )}
          {item.is_graded && (
            <Badge className="absolute top-2 right-2 bg-primary/20 text-indigo-300 border border-primary/30 backdrop-blur-sm font-bold">
              {item.grade_company} {item.grade_score}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm text-white/60 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <HeartIcon className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <CardContent className="p-3">
        <Link href={`/item/${item.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 text-foreground hover:text-primary transition-colors">
            {item.title}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
          {item.condition && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-muted-foreground border border-white/[0.04] leading-none">
              {item.condition}
            </span>
          )}
          {item.set_name && (
            <span className="text-[10px] text-muted-foreground truncate max-w-[100px]">
              {item.set_name}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-base md:text-lg text-primary">{formatPrice(displayPrice)}</span>
          {item.is_sale && item.sale_price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(item.price)}
            </span>
          )}
        </div>
        {item.vendor && (
          <Link
            href={`/vendor/${item.vendor.slug}`}
            className="mt-1 text-[11px] text-muted-foreground hover:text-primary transition-colors block truncate"
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
    <Card className="overflow-hidden rounded-xl bg-[#131929] border-white/[0.06]">
      <div className="aspect-[3/4] bg-[#161B2E] animate-pulse" />
      <CardContent className="p-3 space-y-2">
        <div className="h-4 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-6 w-1/3 bg-white/[0.06] rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
