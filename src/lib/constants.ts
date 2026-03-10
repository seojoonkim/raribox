export const FRANCHISES = [
  { name: 'Pokemon', slug: 'pokemon', image: 'https://placehold.co/200x200/FFCB05/1A1A2E?text=Pokemon' },
  { name: 'One Piece', slug: 'one-piece', image: 'https://placehold.co/200x200/CC0000/FFFFFF?text=One+Piece' },
  { name: 'Sports', slug: 'sports-cards', image: 'https://placehold.co/200x200/1B3A5C/FFFFFF?text=Sports' },
  { name: 'Funko', slug: 'funko', image: 'https://placehold.co/200x200/00B4D8/FFFFFF?text=Funko' },
  { name: 'Gundam', slug: 'gundam', image: 'https://placehold.co/200x200/2D3436/FFFFFF?text=Gundam' },
  { name: 'Marvel', slug: 'marvel', image: 'https://placehold.co/200x200/EC1D24/FFFFFF?text=Marvel' },
  { name: 'Dragon Ball', slug: 'dragon-ball', image: 'https://placehold.co/200x200/FF6B00/FFFFFF?text=Dragon+Ball' },
  { name: 'Star Wars', slug: 'star-wars', image: 'https://placehold.co/200x200/1A1A2E/FFE81F?text=Star+Wars' },
  { name: 'MTG', slug: 'mtg', image: 'https://placehold.co/200x200/7B2D8B/FFFFFF?text=MTG' },
  { name: 'Weiss Schwarz', slug: 'weiss-schwarz', image: 'https://placehold.co/200x200/FF69B4/FFFFFF?text=Weiss' },
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
