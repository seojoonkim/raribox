'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { ItemCard } from '@/components/items/ItemCard';
import { FRANCHISES } from '@/lib/constants';
import { mockItems } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function FranchisePage({ params }: { params: Promise<{ franchise: string }> }) {
  const { franchise: slug } = use(params);
  const franchise = FRANCHISES.find((f) => f.slug === slug);

  if (!franchise) return notFound();

  const items = mockItems.filter((i) => i.franchise?.slug === slug);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Image src={franchise.image} alt={franchise.name} width={48} height={48} className="rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold">{franchise.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {items.length} items available
            </p>
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No {franchise.name} items listed yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
