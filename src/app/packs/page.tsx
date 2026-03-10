'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCartIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/constants';
import { toast } from 'sonner';

type PackCategory = 'all' | 'pokemon' | 'one-piece' | 'other-tcg' | 'accessories';

interface PackProduct {
  id: string;
  name: string;
  price: number;
  category: PackCategory;
  image: string;
  badge?: 'limited' | 'sold-out';
  description: string;
}

const PACK_PRODUCTS: PackProduct[] = [
  {
    id: 'pack-1',
    name: 'Pokemon 151 Booster Box (JP)',
    price: 120,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=Pokemon+151',
    badge: 'limited',
    description: 'Japanese booster box — 20 packs, 7 cards per pack',
  },
  {
    id: 'pack-2',
    name: 'One Piece OP-05 Booster Box',
    price: 90,
    category: 'one-piece',
    image: 'https://placehold.co/300x300/f02020/ffffff?text=OP-05+Box',
    description: '24 packs per box, 12 cards per pack',
  },
  {
    id: 'pack-3',
    name: 'Pokemon 151 Mini Tin 4-Pack',
    price: 35,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=151+Tins',
    description: '4 mini tins with 2 booster packs each',
  },
  {
    id: 'pack-4',
    name: 'Pokemon 25th Anniversary Blastoise Box',
    price: 200,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=25th+Blastoise',
    badge: 'sold-out',
    description: 'Celebration collection box with exclusive promo',
  },
  {
    id: 'pack-5',
    name: 'Scarlet & Violet Booster Box',
    price: 140,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=SV+Box',
    description: '36 packs, 10 cards per pack',
  },
  {
    id: 'pack-6',
    name: 'One Piece Destined Rivals Booster Box',
    price: 95,
    category: 'one-piece',
    image: 'https://placehold.co/300x300/f02020/ffffff?text=Destined+Rivals',
    badge: 'limited',
    description: '24 packs per box, the latest OP TCG expansion',
  },
  {
    id: 'pack-7',
    name: 'Pokemon 151 Korean Booster Box',
    price: 110,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=151+Korean',
    description: 'Korean edition — 20 packs, exclusive art variants',
  },
  {
    id: 'pack-8',
    name: 'Spiritforged Booster Display (24 packs)',
    price: 180,
    category: 'other-tcg',
    image: 'https://placehold.co/300x300/2d3436/ffffff?text=Spiritforged',
    badge: 'sold-out',
    description: 'MTG latest set display box — 24 draft boosters',
  },
  {
    id: 'pack-9',
    name: 'Acrylic Card Display Stand',
    price: 15,
    category: 'accessories',
    image: 'https://placehold.co/300x300/2d3436/ffffff?text=Display+Stand',
    description: 'Premium acrylic stand for slabbed cards',
  },
  {
    id: 'pack-10',
    name: 'Card Sleeve Pack (100ct)',
    price: 8,
    category: 'accessories',
    image: 'https://placehold.co/300x300/2d3436/ffffff?text=Sleeves',
    description: 'Premium clear sleeves — fits standard TCG cards',
  },
  {
    id: 'pack-11',
    name: 'One Piece OP-07 Booster Box',
    price: 85,
    category: 'one-piece',
    image: 'https://placehold.co/300x300/f02020/ffffff?text=OP-07+Box',
    badge: 'limited',
    description: '500 Years in the Future — 24 packs per box',
  },
  {
    id: 'pack-12',
    name: 'Pokemon Destined Rivals Booster Bundle',
    price: 45,
    category: 'pokemon',
    image: 'https://placehold.co/300x300/ffcb05/1a1a2e?text=Destined+Rivals',
    description: '6 booster packs + 1 promo card',
  },
];

const CATEGORIES: { label: string; value: PackCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pokemon', value: 'pokemon' },
  { label: 'One Piece', value: 'one-piece' },
  { label: 'Other TCG', value: 'other-tcg' },
  { label: 'Accessories', value: 'accessories' },
];

export default function PacksPage() {
  const [activeCategory, setActiveCategory] = useState<PackCategory>('all');

  const filtered = activeCategory === 'all'
    ? PACK_PRODUCTS
    : PACK_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: PackProduct) => {
    if (product.badge === 'sold-out') return;
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      {/* Hero Banner */}
      <div className="rounded-xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent p-8 md:p-12 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Open Packs. Find Grails.
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg">
          Browse booster boxes, sealed packs, and accessories from the top TCG franchises.
          Powered by{' '}
          <a
            href="https://hitgrading.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline font-medium"
          >
            HIT Grading
          </a>
          .
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
                ? 'bg-gold text-black'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="relative aspect-square bg-secondary/30">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                unoptimized
              />
              {product.badge && (
                <Badge
                  className={`absolute top-2 right-2 text-xs ${
                    product.badge === 'sold-out'
                      ? 'bg-red-500/90 text-white'
                      : 'bg-gold/90 text-black'
                  }`}
                >
                  {product.badge === 'sold-out' ? 'Sold Out' : 'Limited Stock'}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                <Button
                  size="sm"
                  className={`h-8 text-xs ${
                    product.badge === 'sold-out'
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                      : 'bg-gold text-black hover:bg-gold/90'
                  }`}
                  disabled={product.badge === 'sold-out'}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCartIcon className="h-3.5 w-3.5 mr-1" />
                  {product.badge === 'sold-out' ? 'Sold Out' : 'Add to Cart'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
