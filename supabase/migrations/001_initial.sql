-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (Supabase Auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'buyer',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Franchises
CREATE TABLE public.franchises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  banner_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(id),
  icon_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vendors
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  shop_name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  tier TEXT NOT NULL DEFAULT 'sprout',
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INT DEFAULT 0,
  total_sales INT DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Items
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  franchise_id UUID REFERENCES public.franchises(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  compare_price DECIMAL(12,2),
  currency TEXT DEFAULT 'USD',
  condition TEXT,
  year INT,
  rarity TEXT,
  edition TEXT,
  set_name TEXT,
  card_number TEXT,
  language TEXT DEFAULT 'EN',
  is_graded BOOLEAN DEFAULT false,
  grade_company TEXT,
  grade_score DECIMAL(4,2),
  grade_cert_no TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  stock INT DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false,
  sale_price DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vendor_id, slug)
);

CREATE INDEX idx_items_category ON public.items(category_id);
CREATE INDEX idx_items_franchise ON public.items(franchise_id);
CREATE INDEX idx_items_vendor ON public.items(vendor_id);
CREATE INDEX idx_items_status ON public.items(status);
CREATE INDEX idx_items_price ON public.items(price);
CREATE INDEX idx_items_created ON public.items(created_at DESC);
CREATE INDEX idx_items_search ON public.items USING GIN(
  to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(set_name,''))
);

-- Item Images
CREATE TABLE public.item_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  shipping_total DECIMAL(12,2) DEFAULT 0,
  discount_total DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) NOT NULL,
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT,
  shipping_addr1 TEXT NOT NULL,
  shipping_addr2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_postal TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'AE',
  payment_method TEXT,
  payment_id TEXT,
  paid_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) NOT NULL,
  item_id UUID REFERENCES public.items(id) NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(12,2) NOT NULL,
  shipping_status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  tracking_carrier TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  item_id UUID REFERENCES public.items(id),
  vendor_id UUID REFERENCES public.vendors(id),
  order_id UUID REFERENCES public.orders(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  images TEXT[],
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Wishlists
CREATE TABLE public.wishlists (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, item_id)
);

-- Collections
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  item_id UUID REFERENCES public.items(id),
  title TEXT,
  category_id UUID REFERENCES public.categories(id),
  condition TEXT,
  grade_score DECIMAL(4,2),
  est_value DECIMAL(12,2),
  image_url TEXT,
  note TEXT,
  acquired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Price History
CREATE TABLE public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.items(id),
  card_key TEXT,
  price DECIMAL(12,2) NOT NULL,
  source TEXT DEFAULT 'raribox',
  recorded_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_price_history_card ON public.price_history(card_key, recorded_at DESC);
CREATE INDEX idx_price_history_item ON public.price_history(item_id, recorded_at DESC);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gift Cards
CREATE TABLE public.gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  balance DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  purchased_by UUID REFERENCES public.users(id),
  redeemed_by UUID REFERENCES public.users(id),
  status TEXT DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed: Franchises
INSERT INTO public.franchises (name, slug, sort_order) VALUES
('Pokemon', 'pokemon', 1),
('One Piece', 'one-piece', 2),
('Sports Cards', 'sports-cards', 3),
('Funko Pop', 'funko', 4),
('Gundam', 'gundam', 5),
('Marvel', 'marvel', 6),
('Dragon Ball', 'dragon-ball', 7),
('Star Wars', 'star-wars', 8),
('MTG', 'mtg', 9),
('Weiss Schwarz', 'weiss-schwarz', 10);

-- Seed: Categories
INSERT INTO public.categories (name, slug, sort_order) VALUES
('Trading Cards', 'trading-cards', 1),
('Graded Cards', 'graded-cards', 2),
('Sealed Products', 'sealed-products', 3),
('Figures', 'figures', 4),
('Watches', 'watches', 5),
('Comics & Manga', 'comics', 6),
('Memorabilia', 'memorabilia', 7);

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "items_read_active" ON public.items FOR SELECT USING (status = 'active');
CREATE POLICY "reviews_read_all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wishlists_own" ON public.wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "collections_own" ON public.collections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "notifications_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_own" ON public.orders FOR SELECT USING (auth.uid() = user_id);
