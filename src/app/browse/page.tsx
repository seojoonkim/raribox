import { fetchAllActiveItems } from '@/lib/supabase/queries';
import { BrowseClient } from './browse-client';

export const revalidate = 60; // 60초 캐싱

export default async function BrowsePage() {
  const items = await fetchAllActiveItems();

  return <BrowseClient items={items} />;
}
