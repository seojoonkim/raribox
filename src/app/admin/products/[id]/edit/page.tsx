import { createAdminClient } from '@/lib/supabase/admin';
import { updateItem } from '../../../actions';
import ItemForm from '../../item-form';
import { notFound } from 'next/navigation';

async function getItem(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.from('items').select('*').eq('id', id).single();
  return data;
}

async function getActiveVendors() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('vendors')
    .select('id, shop_name')
    .eq('status', 'active')
    .order('shop_name');
  return data ?? [];
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, vendors] = await Promise.all([getItem(id), getActiveVendors()]);
  if (!item) notFound();

  const boundAction = updateItem.bind(null, id);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Edit Product</h2>
      <ItemForm vendors={vendors} action={boundAction} defaultValues={item} />
    </div>
  );
}
