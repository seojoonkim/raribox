'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCartIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/constants';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

type PackCategory = 'all' | 'pokemon' | 'one-piece' | 'other-tcg' | 'accessories' | 'sealed';

interface PackProduct {
  id: string;
  name: string;
  price: number;
  category: PackCategory;
  image: string;
  badge?: 'limited' | 'sold-out';
  description: string;
  external_url?: string;
}

const CATEGORIES: { label: string; value: PackCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Sealed Products', value: 'sealed' },
  { label: 'Pokemon', value: 'pokemon' },
  { label: 'One Piece', value: 'one-piece' },
  { label: 'Other TCG', value: 'other-tcg' },
  { label: 'Accessories', value: 'accessories' },
];

export default function PacksPage() {
  const [activeCategory, setActiveCategory] = useState<PackCategory>('all');
  const [products, setProducts] = useState<PackProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      // Sealed Products category ID
      const SEALED_CATEGORY_ID = 'a14eaad5-c342-42a1-9329-4d196d8b519c';
      const { data: items, error } = await supabase
        .from('items')
        .select(`
          id,
          title,
          price,
          description,
          status,
          stock,
          categories!category_id (name, slug),
          item_images (url, is_primary, sort_order)
        `)
        .eq('category_id', SEALED_CATEGORY_ID)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(60);

      if (error) {
        console.error('Failed to fetch packs:', error.message);
        setLoading(false);
        return;
      }

      const mapped: PackProduct[] = (items || [])
        .filter((item: any) => item.categories !== null)
        .map((item: any) => {
          const images = item.item_images || [];
          const primaryImg = images.find((i: any) => i.is_primary) || images[0];
          const imgUrl = primaryImg?.url || 'https://placehold.co/300x300/1a1a2e/ffffff?text=HIT+Product';

          // Extract external URL from description
          const urlMatch = item.description?.match(/Shop at: (https?:\/\/[^\s]+)/);
          const externalUrl = urlMatch?.[1];

          return {
            id: item.id,
            name: item.title,
            price: item.price || 0,
            category: 'sealed' as PackCategory,
            image: imgUrl,
            badge: item.stock === 0 ? 'sold-out' : undefined,
            description: item.description?.replace(/Available through HIT Grading partnership\. Shop at: https?:\/\/[^\s]+/, 'Available through HIT Grading').trim() || '',
            external_url: externalUrl,
          };
        });

      setProducts(mapped);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const filtered = activeCategory === 'all' || activeCategory === 'sealed'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: PackProduct) => {
    if (product.badge === 'sold-out') return;
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Packs</h1>

        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Booster boxes, sealed packs, and accessories from top TCG franchises
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.value
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-[#181D30] overflow-hidden animate-pulse">
              <div className="aspect-square" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-white/[0.06] rounded" />
                <div className="h-4 w-2/3 bg-white/[0.06] rounded" />
                <div className="h-8 bg-white/[0.04] rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <Card key={product.id} className="overflow-hidden group rounded-xl hover:border-rari-accent/30 hover:shadow-lg hover:shadow-rari-accent/10 transition-all">
              <div className="relative aspect-square bg-rari-elevated">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  unoptimized
                />
                {product.badge && (
                  <Badge
                    className={`absolute top-2 right-2 text-xs font-semibold ${
                      product.badge === 'sold-out'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-primary/20 text-indigo-300 border border-primary/30'
                    }`}
                  >
                    {product.badge === 'sold-out' ? 'Sold Out' : 'Limited Stock'}
                  </Badge>
                )}
                {/* HIT Grading badge */}
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-2 py-0.5">
                  <span className="text-[10px] text-primary font-semibold">⚡ HIT Grading</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Available through HIT Grading</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold">
                    {product.price > 0 ? formatPrice(product.price) : 'Contact'}
                  </span>
                  <div className="flex gap-1">
                    {product.external_url && (
                      <a
                        href={product.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-2 text-xs rounded-md border border-primary/50 text-primary hover:bg-primary/10 flex items-center"
                      >
                        View
                      </a>
                    )}
                    <Button
                      size="sm"
                      className={`h-8 text-xs ${
                        product.badge === 'sold-out'
                          ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                          : 'bg-primary hover:bg-indigo-500 text-white'
                      }`}
                      disabled={product.badge === 'sold-out'}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCartIcon className="h-3.5 w-3.5 mr-1" />
                      {product.badge === 'sold-out' ? 'Sold Out' : 'Add'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/[0.08] rounded-xl">
          <p className="text-muted-foreground text-sm">No products found in this category.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Try selecting a different category above.</p>
        </div>
      )}
    </div>
  );
}
