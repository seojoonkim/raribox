'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ItemCard } from '@/components/items/ItemCard';
import { mockItems, mockCategories } from '@/lib/mock-data';
import { CONDITIONS, GRADE_COMPANIES, LANGUAGES, FRANCHISES } from '@/lib/constants';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

function FilterPanel({
  selectedCategories,
  toggleCategory,
  selectedFranchises,
  toggleFranchise,
  selectedConditions,
  toggleCondition,
  gradedOnly,
  setGradedOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedFranchises: string[];
  toggleFranchise: (slug: string) => void;
  selectedConditions: string[];
  toggleCondition: (c: string) => void;
  gradedOnly: boolean;
  setGradedOnly: (v: boolean) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3">Category</h3>
        <div className="space-y-2">
          {mockCategories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-sm mb-3">Franchise</h3>
        <div className="space-y-2">
          {FRANCHISES.map((f) => (
            <div key={f.slug} className="flex items-center gap-2">
              <Checkbox
                id={`fran-${f.slug}`}
                checked={selectedFranchises.includes(f.slug)}
                onCheckedChange={() => toggleFranchise(f.slug)}
              />
              <Label htmlFor={`fran-${f.slug}`} className="text-sm cursor-pointer">
                {f.icon} {f.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-sm mb-3">Condition</h3>
        <div className="space-y-2">
          {CONDITIONS.map((c) => (
            <div key={c.value} className="flex items-center gap-2">
              <Checkbox
                id={`cond-${c.value}`}
                checked={selectedConditions.includes(c.value)}
                onCheckedChange={() => toggleCondition(c.value)}
              />
              <Label htmlFor={`cond-${c.value}`} className="text-sm cursor-pointer">
                {c.value} — {c.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            id="graded-only"
            checked={gradedOnly}
            onCheckedChange={(v) => setGradedOnly(!!v)}
          />
          <Label htmlFor="graded-only" className="text-sm font-semibold cursor-pointer">
            Graded Cards Only
          </Label>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-8"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFranchises, setSelectedFranchises] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [gradedOnly, setGradedOnly] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  const toggleFranchise = (slug: string) =>
    setSelectedFranchises((prev) =>
      prev.includes(slug) ? prev.filter((f) => f !== slug) : [...prev, slug]
    );
  const toggleCondition = (c: string) =>
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const filteredItems = useMemo(() => {
    let items = [...mockItems];

    if (selectedCategories.length > 0)
      items = items.filter((i) => i.category_id && selectedCategories.includes(i.category_id));
    if (selectedFranchises.length > 0)
      items = items.filter((i) => {
        const franchise = FRANCHISES.find((f) => f.slug === i.franchise?.slug);
        return franchise && selectedFranchises.includes(franchise.slug);
      });
    if (selectedConditions.length > 0)
      items = items.filter((i) => i.condition && selectedConditions.includes(i.condition));
    if (gradedOnly)
      items = items.filter((i) => i.is_graded);
    if (minPrice)
      items = items.filter((i) => i.price >= Number(minPrice));
    if (maxPrice)
      items = items.filter((i) => i.price <= Number(maxPrice));

    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        break;
    }

    return items;
  }, [sort, selectedCategories, selectedFranchises, selectedConditions, gradedOnly, minPrice, maxPrice]);

  const filterPanel = (
    <FilterPanel
      selectedCategories={selectedCategories}
      toggleCategory={toggleCategory}
      selectedFranchises={selectedFranchises}
      toggleFranchise={toggleFranchise}
      selectedConditions={selectedConditions}
      toggleCondition={toggleCondition}
      gradedOnly={gradedOnly}
      setGradedOnly={setGradedOnly}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Browse Collectibles</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredItems.length} items found
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filter */}
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="sm" className="lg:hidden" />}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetTitle>Filters</SheetTitle>
              <div className="mt-4">{filterPanel}</div>
            </SheetContent>
          </Sheet>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">{filterPanel}</div>
        </aside>

        {/* Items grid */}
        <div className="flex-1">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No items found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedFranchises([]);
                  setSelectedConditions([]);
                  setGradedOnly(false);
                  setMinPrice('');
                  setMaxPrice('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
