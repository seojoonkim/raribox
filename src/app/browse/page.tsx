import { fetchAllActiveItems } from '@/lib/supabase/queries';
import { BrowseClient } from './browse-client';

export default async function BrowsePage() {
  const items = await fetchAllActiveItems();

  return <BrowseClient items={items} />;
}
