import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ShieldIcon, TruckIcon, StarIcon, CalendarIcon, MapPinIcon } from '@/components/ui/icons';
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
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-12 xl:px-16 py-20 md:py-28">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-indigo-300 border border-primary/20 backdrop-blur-sm text-sm px-3 py-1">
              Trusted by 10,000+ Collectors
            </Badge>
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Discover <span className="text-amber-400">Rare</span> Collectibles
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-lg">
              The premier marketplace for trading cards, graded slabs, figures, and rare collectibles.
              From Pokemon to One Piece, find your next treasure.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
              <Link href="/browse" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-indigo-500 text-white font-semibold text-base px-6 py-6">
                  Browse Marketplace
                </Button>
              </Link>
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-base px-6 py-6">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Quick Nav */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Franchise</h2>
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {FRANCHISES.map((f) => (
            <Link key={f.slug} href={`/browse/${f.slug}`}>
              <Card className="overflow-hidden rounded-xl bg-[#131929] border-white/[0.06] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all group cursor-pointer pt-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="py-1.5 text-center">
                  <span className="text-[10px] md:text-xs font-semibold text-white/80">
                    {f.name}
                  </span>
                </div>
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
            <Link href="/browse?featured=true" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
            <Link href="/browse?sort=newest" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              <span className="text-red-400">Sale</span>
            </h2>
            <Link href="/browse?sale=true" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {saleItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link href="/events" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 1, tag: 'Tournament', date: 'Apr 15, 2026', title: 'Pokemon TCG Regional Tournament', location: 'Dubai Mall, Level 2 · Dubai, UAE', price: '50 AED', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80' },
            { id: 2, tag: 'Release', date: 'Apr 20, 2026', title: 'One Piece OP-10 Release Party', location: 'Times Square Center, Dubai', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80' },
            { id: 3, tag: 'Grading', date: 'May 1, 2026', title: 'Grading Submission Drop-off Day', location: 'Times Square Center, Dubai', price: 'From 49.5 AED', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80' },
          ].map((ev) => (
            <Link key={ev.id} href="/events">
              <Card className="overflow-hidden rounded-xl bg-[#131929] border-white/[0.06] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all group cursor-pointer pt-0">
                <div className="relative h-40 overflow-hidden">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  <div className="absolute inset-0 bg-black/30" />
                  <Badge className="absolute top-3 left-3 bg-black/50 text-white/90 text-xs">{ev.tag}</Badge>
                </div>
                <CardContent className="p-4">
                  <p className="font-semibold text-sm leading-snug mb-2">{ev.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <CalendarIcon className="h-3 w-3 shrink-0" />{ev.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPinIcon className="h-3 w-3 shrink-0" />{ev.location}
                  </div>
                  <p className="text-xs font-semibold text-amber-400 mt-2">{ev.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center rounded-xl bg-[#131929] border-white/[0.06]">
            <CardContent className="p-6">
              <ShieldIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Buyer Protection</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Every purchase is backed by our buyer protection guarantee.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center rounded-xl bg-[#131929] border-white/[0.06]">
            <CardContent className="p-6">
              <TruckIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Worldwide Shipping</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Secure shipping to 100+ countries with tracking.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center rounded-xl bg-[#131929] border-white/[0.06]">
            <CardContent className="p-6">
              <StarIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
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
