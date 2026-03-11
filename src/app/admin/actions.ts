'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// ── Auth ──────────────────────────────────────────────

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error('Invalid password');
  }
  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  redirect('/admin/dashboard');
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

// ── Vendors ───────────────────────────────────────────

export async function approveVendor(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('vendors')
    .update({ status: 'active', updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/vendors');
  revalidatePath('/admin/dashboard');
}

export async function suspendVendor(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('vendors')
    .update({ status: 'suspended', updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/vendors');
}

export async function banVendor(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('vendors')
    .update({ status: 'banned', updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/vendors');
}

// ── Items ─────────────────────────────────────────────

export async function toggleItemStatus(id: string, status: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('items')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

export async function deleteItem(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('items').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}

export async function createItem(formData: FormData) {
  const supabase = createAdminClient();
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const data: Record<string, unknown> = {
    title,
    slug,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string) || 0,
    currency: (formData.get('currency') as string) || 'AED',
    condition: formData.get('condition') as string || null,
    rarity: formData.get('rarity') as string || null,
    stock: parseInt(formData.get('stock') as string) || 1,
    status: formData.get('status') as string || 'draft',
    is_featured: formData.get('is_featured') === 'on',
    is_sale: formData.get('is_sale') === 'on',
    sale_price: formData.get('sale_price') ? parseFloat(formData.get('sale_price') as string) : null,
    vendor_id: formData.get('vendor_id') as string || null,
  };

  const { error } = await supabase.from('items').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateItem(id: string, formData: FormData) {
  const supabase = createAdminClient();
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const data: Record<string, unknown> = {
    title,
    slug,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string) || 0,
    currency: (formData.get('currency') as string) || 'AED',
    condition: formData.get('condition') as string || null,
    rarity: formData.get('rarity') as string || null,
    stock: parseInt(formData.get('stock') as string) || 1,
    status: formData.get('status') as string || 'draft',
    is_featured: formData.get('is_featured') === 'on',
    is_sale: formData.get('is_sale') === 'on',
    sale_price: formData.get('sale_price') ? parseFloat(formData.get('sale_price') as string) : null,
    vendor_id: formData.get('vendor_id') as string || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('items').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// ── Orders ────────────────────────────────────────────

export async function updateOrderStatus(id: string, status: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/orders');
}

// ── Users ─────────────────────────────────────────────

export async function banUser(id: string) {
  const supabase = createAdminClient();
  // Try public.users first
  const { error } = await supabase
    .from('users')
    .update({ status: 'banned', updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) {
    // Fallback: ban via Supabase auth admin
    const { error: authError } = await supabase.auth.admin.updateUserById(id, {
      ban_duration: '876000h', // ~100 years
    });
    if (authError) throw new Error(authError.message);
  }
  revalidatePath('/admin/users');
}

export async function unbanUser(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('users')
    .update({ status: 'active', updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) {
    const { error: authError } = await supabase.auth.admin.updateUserById(id, {
      ban_duration: 'none',
    });
    if (authError) throw new Error(authError.message);
  }
  revalidatePath('/admin/users');
}
