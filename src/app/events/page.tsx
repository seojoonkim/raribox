'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { XIcon, MapPinIcon, CalendarIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EventData {
  id: number;
  type: string;
  date: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  location: string;
  image: string;
  capacity: string;
  price: string;
  tag: string;
}

const events: EventData[] = [
  {
    id: 1,
    type: 'Tournament',
    date: 'Apr 15, 2026',
    title: 'Pokemon TCG Regional Tournament',
    shortDesc: 'Compete in the regional Pokemon Trading Card Game tournament. Prizes include exclusive promo cards.',
    fullDesc: 'Join us for the biggest Pokemon TCG tournament in the UAE! Open to all skill levels — from beginners to competitive players. 3 divisions: Junior (under 15), Senior (15-17), and Masters. Top 8 players win exclusive promo cards, booster boxes, and RariBox store credit. Registration fee: 50 AED. Bring a legal 60-card deck. Swiss rounds + Top Cut format.',
    location: 'Dubai Mall, Level 2 · Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80',
    capacity: '128 players',
    price: '50 AED',
    tag: 'Tournament',
  },
  {
    id: 2,
    type: 'Release',
    date: 'Apr 20, 2026',
    title: 'One Piece OP-10 Release Party',
    shortDesc: 'Celebrate the latest One Piece booster set release with exclusive pack openings and giveaways.',
    fullDesc: 'Be the first to open the brand new One Piece OP-10 set! We will have live pack openings, a pull rate tracker, trading tables, and hourly giveaways. First 50 customers get a free promo pack. Special bundle deals available in-store only. Cosplay contest with prizes for the best One Piece costume. Food and drinks provided.',
    location: 'RariBox Store · Times Square Center, Dubai',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
    capacity: 'Unlimited',
    price: 'Free Entry',
    tag: 'Release',
  },
  {
    id: 3,
    type: 'Grading',
    date: 'May 1, 2026',
    title: 'Grading Submission Drop-off Day',
    shortDesc: 'Bring your cards for bulk grading submission. Special discounted rates for RariBox members.',
    fullDesc: 'Monthly grading submission event in partnership with HiT GCC. Drop off your cards directly with our grading specialists on-site. RariBox members enjoy 10% off standard rates (55 AED → 49.5 AED per card). Our experts will do a quick pre-screening to identify high-value cards. Same-day receipt confirmation. 15 business day turnaround guaranteed.',
    location: 'RariBox Store · Times Square Center, Dubai',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
    capacity: '50 cards max per person',
    price: 'From 49.5 AED',
    tag: 'Grading',
  },
  {
    id: 4,
    type: 'Auction',
    date: 'May 10, 2026',
    title: 'Rare Card Auction Night',
    shortDesc: 'Live auction of PSA 10 graded cards, first edition sets, and exclusive collectibles.',
    fullDesc: 'Our quarterly live auction featuring some of the rarest cards in the GCC market. This edition features: PSA 10 Charizard Base Set 1st Edition, BGS 9.5 Black Lotus Alpha, CGC 10 Luffy OP01-001 Secret Rare, and 20+ more lots. Bidding starts at 10% below market value. Register in advance to receive the full catalog. Online bidding available via our website.',
    location: 'RariBox Store · Times Square Center, Dubai',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    capacity: 'Seats limited to 40',
    price: 'Free to attend',
    tag: 'Auction',
  },
  {
    id: 5,
    type: 'Workshop',
    date: 'May 18, 2026',
    title: 'Card Authentication Workshop',
    shortDesc: 'Learn how to identify fake cards, check centering, and understand grading standards.',
    fullDesc: 'A 2-hour hands-on workshop led by HiT GCC grading experts. Topics covered: How to spot fake Pokemon and One Piece cards, Understanding grading criteria (centering, corners, edges, surface), PSA vs CGC vs HiT grading comparison, How to maximize your card grade before submission, Q&A with professional graders. Includes workshop kit with tools. Limited to 20 participants.',
    location: 'RariBox Store · Times Square Center, Dubai',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&q=80',
    capacity: '20 participants',
    price: '75 AED',
    tag: 'Workshop',
  },
  {
    id: 6,
    type: 'Community',
    date: 'Jun 1, 2026',
    title: 'Summer Collector Meetup',
    shortDesc: 'Free community meetup for collectors. Trade cards, meet others, and win prizes.',
    fullDesc: 'The biggest collector meetup of the summer! Bring your binder, trade with 100+ collectors, and enter our free raffle (1 raffle ticket per 10 AED spent in-store that month). Showcase your best pulls, vote for the best collection, and enjoy exclusive in-store deals only available on this day. Food trucks outside. Open to collectors of all ages.',
    location: 'Dubai Mall Atrium · Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    capacity: 'Open to all',
    price: 'Free',
    tag: 'Community',
  },
];

function getTagColor(tag: string) {
  switch (tag) {
    case 'Tournament': return 'bg-primary/10 text-indigo-300 border-primary/20';
    case 'Release': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    case 'Grading': return 'bg-rari-warning/10 text-amber-300 border-rari-warning/20';
    case 'Auction': return 'bg-red-500/10 text-red-300 border-red-500/20';
    case 'Workshop': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
    case 'Community': return 'bg-pink-500/10 text-pink-300 border-pink-500/20';
    default: return 'bg-primary/10 text-indigo-300 border-primary/20';
  }
}

/* ── Event Detail Modal ──────────────────────────────────── */

function EventModal({ event, onClose }: { event: EventData; onClose: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-rari-surface border border-rari-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors"
        >
          <XIcon className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rari-surface via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 -mt-8 relative">
          <div className="flex items-center gap-2 mb-3">
            <Badge className={`border ${getTagColor(event.tag)}`}>
              {event.tag}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {event.date}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {event.fullDesc}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl bg-rari-elevated p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Location</p>
              <p className="text-xs font-medium flex items-start gap-1">
                <MapPinIcon className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                {event.location}
              </p>
            </div>
            <div className="rounded-xl bg-rari-elevated p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Capacity</p>
              <p className="text-xs font-medium">{event.capacity}</p>
            </div>
            <div className="rounded-xl bg-rari-elevated p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Price</p>
              <p className="text-xs font-medium text-primary">{event.price}</p>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-indigo-500 text-white font-semibold">
            Register / Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Events Page ─────────────────────────────────────────── */

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upcoming tournaments, releases, and community meetups
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden rounded-xl bg-rari-card border-rari-border hover:border-rari-accent/30 hover:shadow-lg hover:shadow-rari-accent/10 transition-all cursor-pointer group pt-0"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className={`absolute top-3 left-3 border backdrop-blur-sm ${getTagColor(event.tag)}`}>
                {event.tag}
              </Badge>
              <span className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/40 backdrop-blur-sm rounded-md px-2 py-0.5">
                {event.price}
              </span>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {event.date}
                </span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{event.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{event.shortDesc}</p>
              <p className="text-xs text-rari-muted mt-2 flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                {event.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center py-12 border border-dashed border-rari-border rounded-xl">
        <p className="text-muted-foreground text-sm">More events coming soon</p>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
