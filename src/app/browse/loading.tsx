export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-6">
        <div className="h-7 w-48 bg-white/[0.06] rounded animate-pulse" />
        <div className="h-4 w-32 bg-white/[0.04] rounded mt-2 animate-pulse" />
      </div>
      <div className="flex gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-56 shrink-0 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/[0.04] rounded-xl animate-pulse" />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-[#151B2B] border border-white/[0.06] animate-pulse">
              <div className="aspect-[3/4] bg-white/[0.06]" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-white/[0.06] rounded w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded w-1/2" />
                <div className="h-4 bg-white/[0.08] rounded w-1/3 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
