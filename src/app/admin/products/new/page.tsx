import { createAdminClient } from '@/lib/supabase/admin';
import { createItem } from '../../actions';
import ItemForm from '../item-form';

async function getActiveVendors() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('vendors')
    .select('id, shop_name')
    .eq('status', 'active')
    .order('shop_name');
  return data ?? [];
}

export default async function NewProductPage() {
  const vendors = await getActiveVendors();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Add New Product</h2>
      <ItemForm vendors={vendors} action={createItem} />
    </div>
  );
}
