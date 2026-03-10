export const FRANCHISES = [
  { name: 'Pokemon', slug: 'pokemon', icon: '⚡' },
  { name: 'One Piece', slug: 'one-piece', icon: '🏴‍☠️' },
  { name: 'Sports', slug: 'sports-cards', icon: '⚽' },
  { name: 'Funko', slug: 'funko', icon: '🎭' },
  { name: 'Gundam', slug: 'gundam', icon: '🤖' },
  { name: 'Marvel', slug: 'marvel', icon: '🦸' },
  { name: 'Dragon Ball', slug: 'dragon-ball', icon: '🐉' },
  { name: 'Star Wars', slug: 'star-wars', icon: '⭐' },
  { name: 'MTG', slug: 'mtg', icon: '🧙' },
  { name: 'Weiss Schwarz', slug: 'weiss-schwarz', icon: '🃏' },
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
