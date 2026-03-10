import { createClient } from './server';
import type { Item } from '@/types';

// Map Supabase row to Item type
function mapItem(row: any): Item {
  const franchise = row.franchises;
  const category = row.categories;
  const vendor = row.vendors;
  const images = row.item_images;

  return {
    id: row.id,
    vendor_id: row.vendor_id,
    category_id: row.category_id,
    franchise_id: row.franchise_id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    price: Number(row.price),
    compare_price: row.compare_price ? Number(row.compare_price) : null,
    currency: row.currency,
    condition: row.condition,
    year: row.year,
    rarity: row.rarity,
    edition: row.edition,
    set_name: row.set_name,
    card_number: row.card_number,
    language: row.language,
    is_graded: row.is_graded,
    grade_company: row.grade_company,
    grade_score: row.grade_score ? Number(row.grade_score) : null,
    grade_cert_no: row.grade_cert_no,
    status: row.status,
    stock: row.stock,
    is_featured: row.is_featured,
    is_sale: row.is_sale,
    sale_price: row.sale_price ? Number(row.sale_price) : null,
    created_at: row.created_at,
    updated_at: row.updated_at,
    images: images?.map((img: any) => ({
      id: img.id || '',
      item_id: row.id,
      url: img.url,
      alt_text: img.alt_text || null,
      sort_order: img.sort_order || 0,
      is_primary: img.is_primary || false,
      created_at: img.created_at || '',
    })) || [],
    vendor: vendor ? {
      id: vendor.id || row.vendor_id,
      user_id: vendor.user_id || '',
      shop_name: vendor.shop_name || '',
      slug: vendor.slug || '',
      description: vendor.description || null,
      logo_url: vendor.logo_url || null,
      banner_url: vendor.banner_url || null,
      status: vendor.status || 'active',
      tier: vendor.tier || 'sprout',
      rating_avg: Number(vendor.rating_avg || 0),
      rating_count: vendor.rating_count || 0,
      total_sales: vendor.total_sales || 0,
      response_rate: Number(vendor.response_rate || 100),
      created_at: vendor.created_at || '',
      updated_at: vendor.updated_at || '',
    } : undefined,
    franchise: franchise ? {
      id: franchise.id || row.franchise_id,
      name: franchise.name || '',
      slug: franchise.slug || '',
      logo_url: franchise.logo_url || null,
      banner_url: franchise.banner_url || null,
      sort_order: franchise.sort_order || 0,
      created_at: franchise.created_at || '',
    } : undefined,
    category: category ? {
      id: category.id || row.category_id,
      name: category.name || '',
      slug: category.slug || '',
      parent_id: category.parent_id || null,
      icon_url: category.icon_url || null,
      sort_order: category.sort_order || 0,
      created_at: category.created_at || '',
    } : undefined,
  };
}

const ITEM_SELECT = '*, item_images(id, url, alt_text, sort_order, is_primary), franchises(id, name, slug, sort_order), categories(id, name, slug), vendors(id, user_id, shop_name, slug, status, tier, rating_avg, rating_count, total_sales)';

export async function fetchAllActiveItems(): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select(ITEM_SELECT)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchAllActiveItems error:', error.message);
    return [];
  }

  return (data || []).map(mapItem);
}

export async function fetchFeaturedItems(): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select(ITEM_SELECT)
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('fetchFeaturedItems error:', error.message);
    return [];
  }

  return (data || []).map(mapItem);
}

export async function fetchNewArrivals(): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select(ITEM_SELECT)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('fetchNewArrivals error:', error.message);
    return [];
  }

  return (data || []).map(mapItem);
}

export async function fetchSaleItems(): Promise<Item[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select(ITEM_SELECT)
    .eq('status', 'active')
    .eq('is_sale', true)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('fetchSaleItems error:', error.message);
    return [];
  }

  return (data || []).map(mapItem);
}
