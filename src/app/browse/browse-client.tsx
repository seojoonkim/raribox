'use client';

import { useState, useMemo } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ItemCard } from '@/components/items/ItemCard';
import { CONDITIONS, FRANCHISES } from '@/lib/constants';
import type { Item } from '@/types';

const CATEGORIES = [
  { id: 'trading-cards', name: 'Trading Cards' },
  { id: 'graded-cards', name: 'Graded Cards' },
  { id: 'sealed-products', name: 'Sealed Products' },
  { id: 'figures', name: 'Figures' },
  { id: 'watches', name: 'Watches' },
  { id: 'comics', name: 'Comics & Manga' },
  { id: 'memorabilia', name: 'Memorabilia' },
];

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

function FilterPanel({
  selectedFranchises,
  toggleFranchise,
  selectedCategories,
  toggleCategory,
  selectedConditions,
  toggleCondition,
  gradedOnly,
  setGradedOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  selectedFranchises: string[];
  toggleFranchise: (slug: string) => void;
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
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
        <h3 className="font-semibold text-sm mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
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
        <div className="flex items-center gap-2">
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

export function BrowseClient({ items }: { items: Item[] }) {
  const [sort, setSort] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFranchises, setSelectedFranchises] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [gradedOnly, setGradedOnly] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const toggleCategory = (slug: string) =>
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
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
    let result = [...items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.set_name?.toLowerCase().includes(q) ||
          i.franchise?.name.toLowerCase().includes(q)
      );
    }
    if (selectedCategories.length > 0)
      result = result.filter((i) => i.category && selectedCategories.includes(i.category.slug));
    if (selectedFranchises.length > 0)
      result = result.filter((i) => i.franchise && selectedFranchises.includes(i.franchise.slug));
    if (selectedConditions.length > 0)
      result = result.filter((i) => i.condition && selectedConditions.includes(i.condition));
    if (gradedOnly)
      result = result.filter((i) => i.is_graded);
    if (minPrice)
      result = result.filter((i) => i.price >= Number(minPrice));
    if (maxPrice)
      result = result.filter((i) => i.price <= Number(maxPrice));

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        break;
    }

    return result;
  }, [items, sort, searchQuery, selectedCategories, selectedFranchises, selectedConditions, gradedOnly, minPrice, maxPrice]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedFranchises([]);
    setSelectedConditions([]);
    setGradedOnly(false);
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
  };

  const hasFilters = selectedCategories.length > 0 || selectedFranchises.length > 0 ||
    selectedConditions.length > 0 || gradedOnly || minPrice || maxPrice || searchQuery;

  const filterPanel = (
    <FilterPanel
      selectedFranchises={selectedFranchises}
      toggleFranchise={toggleFranchise}
      selectedCategories={selectedCategories}
      toggleCategory={toggleCategory}
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
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Browse Collectibles</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredItems.length} items found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="sm" className="lg:hidden h-9" />}
            >
              <SlidersHorizontalIcon className="h-4 w-4 mr-2" /> Filters
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
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32">
            {filterPanel}
            {hasFilters && (
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={clearAll}>
                Clear All Filters
              </Button>
            )}
          </div>
        </aside>

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
              <Button variant="outline" className="mt-4" onClick={clearAll}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
