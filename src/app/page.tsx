import Link from 'next/link';
import { ArrowRightIcon, ShieldIcon, TruckIcon, StarIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FRANCHISES } from '@/lib/constants';
import { ItemCard } from '@/components/items/ItemCard';
import { fetchFeaturedItems, fetchNewArrivals, fetchSaleItems } from '@/lib/supabase/queries';

export default async function HomePage() {
  const [featuredItems, newArrivals, saleItems] = await Promise.all([
    fetchFeaturedItems(),
    fetchNewArrivals(),
    fetchSaleItems(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-gold/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-gold/10 text-gold border-gold/20">
              Trusted by 10,000+ Collectors
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Discover <span className="text-gold">Rare</span> Collectibles
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              The premier marketplace for trading cards, graded slabs, figures, and rare collectibles.
              From Pokemon to One Piece, find your next treasure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/browse">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold">
                  Browse Marketplace
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-gold/3 blur-2xl" />
      </section>

      {/* Franchise Quick Nav */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Franchise</h2>
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {FRANCHISES.map((f) => (
            <Link key={f.slug} href={`/browse/${f.slug}`}>
              <Card className="hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all text-center group cursor-pointer">
                <CardContent className="p-3 md:p-4">
                  <span className="text-2xl md:text-3xl block group-hover:scale-110 transition-transform">
                    {f.icon}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium mt-1 block text-muted-foreground group-hover:text-foreground">
                    {f.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured</h2>
            <Link href="/browse?featured=true" className="text-sm text-gold hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link href="/browse?sort=newest" className="text-sm text-gold hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.slice(0, 8).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Sale Section */}
      {saleItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              <span className="text-red-500">Sale</span>
            </h2>
            <Link href="/browse?sale=true" className="text-sm text-gold hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {saleItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <ShieldIcon className="h-10 w-10 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold">Buyer Protection</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Every purchase is backed by our buyer protection guarantee.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TruckIcon className="h-10 w-10 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold">Worldwide Shipping</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Secure shipping to 100+ countries with tracking.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <StarIcon className="h-10 w-10 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold">Verified Sellers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All vendors are verified and rated by the community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
