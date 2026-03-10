import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const packs = [
  { id: '1', name: 'Pokemon Mystery Pack', price: 9.99, image: '⚡', franchise: 'Pokemon', rarity: 'Common to Ultra Rare' },
  { id: '2', name: 'One Piece Starter Bundle', price: 14.99, image: '🏴‍☠️', franchise: 'One Piece', rarity: 'Common to Super Rare' },
  { id: '3', name: 'Sports Premium Pack', price: 24.99, image: '⚽', franchise: 'Sports', rarity: 'Rare to Legendary' },
  { id: '4', name: 'Dragon Ball Ultra Pack', price: 19.99, image: '🐉', franchise: 'Dragon Ball', rarity: 'Uncommon to Secret Rare' },
];

export default function PacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Card Packs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Open digital card packs and add to your collection
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packs.map((pack) => (
          <Card key={pack.id} className="overflow-hidden group">
            <div className="h-48 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent flex items-center justify-center">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-200">
                {pack.image}
              </span>
            </div>
            <CardContent className="p-5">
              <span className="text-xs font-medium text-muted-foreground">{pack.franchise}</span>
              <h3 className="font-semibold mt-1">{pack.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{pack.rarity}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold">${pack.price}</span>
                <Button size="sm" className="bg-gold text-black hover:bg-gold/90" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center py-16 border border-dashed border-border rounded-lg">
        <h2 className="text-xl font-bold mb-2">Pack Opening Coming Soon</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Digital card pack opening with real collectible rewards is under development.
          Stay tuned for launch!
        </p>
      </div>
    </div>
  );
}
