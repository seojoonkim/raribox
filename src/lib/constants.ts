export const FRANCHISES = [
  { name: 'Pokemon', slug: 'pokemon', image: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=300&q=80' },
  { name: 'One Piece', slug: 'one-piece', image: 'https://images.unsplash.com/photo-1764818770400-6979b3fed680?w=300&q=80' },
  { name: 'Sports', slug: 'sports-cards', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&q=80' },
  { name: 'Funko', slug: 'funko', image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=300&q=80' },
  { name: 'Gundam', slug: 'gundam', image: 'https://images.unsplash.com/photo-1626892677323-735dd6b1d94c?w=300&q=80' },
  { name: 'Marvel', slug: 'marvel', image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=300&q=80' },
  { name: 'Dragon Ball', slug: 'dragon-ball', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&q=80' },
  { name: 'Star Wars', slug: 'star-wars', image: 'https://images.unsplash.com/photo-1671664530497-167b6b69bafc?w=300&q=80' },
  { name: 'MTG', slug: 'mtg', image: 'https://images.unsplash.com/photo-1513002433973-e0a181372d60?w=300&q=80' },
  { name: 'Weiss Schwarz', slug: 'weiss-schwarz', image: 'https://images.unsplash.com/photo-1675623262783-1b2081faf118?w=300&q=80' },
] as const;

export const CONDITIONS = [
  { value: 'NM', label: 'Near Mint' },
  { value: 'LP', label: 'Lightly Played' },
  { value: 'MP', label: 'Moderately Played' },
  { value: 'HP', label: 'Heavily Played' },
  { value: 'D', label: 'Damaged' },
] as const;

export const GRADE_COMPANIES = ['PSA', 'CGC', 'BGS'] as const;

export const LANGUAGES = [
  { value: 'EN', label: 'English' },
  { value: 'JP', label: 'Japanese' },
  { value: 'KR', label: 'Korean' },
] as const;

export const VENDOR_TIERS = {
  sprout: { label: 'Sprout', icon: '🌱', minSales: 0 },
  silver: { label: 'Silver', icon: '🥈', minSales: 50 },
  gold: { label: 'Gold', icon: '🥇', minSales: 200 },
  diamond: { label: 'Diamond', icon: '💎', minSales: 500 },
} as const;

export function getVendorTier(totalSales: number) {
  if (totalSales >= 500) return VENDOR_TIERS.diamond;
  if (totalSales >= 200) return VENDOR_TIERS.gold;
  if (totalSales >= 50) return VENDOR_TIERS.silver;
  return VENDOR_TIERS.sprout;
}

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

export function generateOrderNumber() {
  const prefix = 'RB';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
