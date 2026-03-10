export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  phone: string | null;
  role: 'buyer' | 'vendor' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Franchise {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon_url: string | null;
  sort_order: number;
  created_at: string;
}

export type VendorTier = 'sprout' | 'silver' | 'gold' | 'diamond';
export type VendorStatus = 'pending' | 'active' | 'suspended';

export interface Vendor {
  id: string;
  user_id: string;
  shop_name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  status: VendorStatus;
  tier: VendorTier;
  rating_avg: number;
  rating_count: number;
  total_sales: number;
  response_rate: number;
  created_at: string;
  updated_at: string;
}

export type ItemCondition = 'NM' | 'LP' | 'MP' | 'HP' | 'D';
export type ItemStatus = 'draft' | 'active' | 'sold' | 'inactive';

export interface Item {
  id: string;
  vendor_id: string;
  category_id: string | null;
  franchise_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  currency: string;
  condition: ItemCondition | null;
  year: number | null;
  rarity: string | null;
  edition: string | null;
  set_name: string | null;
  card_number: string | null;
  language: string;
  is_graded: boolean;
  grade_company: string | null;
  grade_score: number | null;
  grade_cert_no: string | null;
  status: ItemStatus;
  stock: number;
  is_featured: boolean;
  is_sale: boolean;
  sale_price: number | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  images?: ItemImage[];
  vendor?: Vendor;
  category?: Category;
  franchise?: Franchise;
}

export interface ItemImage {
  id: string;
  item_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  subtotal: number;
  shipping_total: number;
  discount_total: number;
  total: number;
  shipping_name: string;
  shipping_phone: string | null;
  shipping_addr1: string;
  shipping_addr2: string | null;
  shipping_city: string;
  shipping_postal: string;
  shipping_country: string;
  payment_method: string | null;
  payment_id: string | null;
  paid_at: string | null;
  status: OrderStatus;
  note: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_id: string;
  vendor_id: string;
  quantity: number;
  price: number;
  shipping_status: string;
  tracking_number: string | null;
  tracking_carrier: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  created_at: string;
  item?: Item;
  vendor?: Vendor;
}

export interface Review {
  id: string;
  user_id: string;
  item_id: string | null;
  vendor_id: string | null;
  order_id: string | null;
  rating: number;
  title: string | null;
  content: string | null;
  images: string[] | null;
  is_verified: boolean;
  created_at: string;
  user?: User;
}

export interface Wishlist {
  user_id: string;
  item_id: string;
  created_at: string;
  item?: Item;
}

export interface Collection {
  id: string;
  user_id: string;
  item_id: string | null;
  title: string | null;
  category_id: string | null;
  condition: string | null;
  grade_score: number | null;
  est_value: number | null;
  image_url: string | null;
  note: string | null;
  acquired_at: string | null;
  created_at: string;
}

export interface PriceHistory {
  id: string;
  item_id: string | null;
  card_key: string | null;
  price: number;
  source: string;
  recorded_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  currency: string;
  purchased_by: string | null;
  redeemed_by: string | null;
  status: string;
  expires_at: string | null;
  created_at: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}
