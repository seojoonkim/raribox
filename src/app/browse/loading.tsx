import { ItemCardSkeleton } from '@/components/items/ItemCard';

export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-6">
        <div className="h-8 w-56 bg-secondary/50 rounded animate-pulse" />
        <div className="h-4 w-24 bg-secondary/50 rounded animate-pulse mt-2" />
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-secondary/50 rounded animate-pulse" />
            ))}
          </div>
        </aside>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
