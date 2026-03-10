import { ItemCardSkeleton } from '@/components/items/ItemCard';

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-background via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <div className="h-6 w-48 bg-secondary/50 rounded animate-pulse" />
            <div className="h-12 w-96 bg-secondary/50 rounded animate-pulse" />
            <div className="h-5 w-80 bg-secondary/50 rounded animate-pulse" />
          </div>
        </div>
      </section>
      {/* Items skeleton */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
        <div className="h-8 w-32 bg-secondary/50 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
