import { Heart } from 'lucide-react';
import { ItemCard } from '@/components/items/ItemCard';
import { mockItems } from '@/lib/mock-data';

export default function WishlistPage() {
  // Mock: show first 3 items as wishlist
  const wishlistItems = mockItems.slice(0, 3);

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">Your wishlist is empty</h2>
        <p className="text-sm text-muted-foreground">Save items you love for later.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Wishlist ({wishlistItems.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
