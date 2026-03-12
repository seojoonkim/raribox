import { fetchAllActiveItems } from '@/lib/supabase/queries';
import { BrowseClient } from './browse-client';

export const revalidate = 60; // 60초 캐싱

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ franchise?: string }>;
}) {
  const [items, params] = await Promise.all([
    fetchAllActiveItems(),
    searchParams,
  ]);

  return <BrowseClient items={items} initialFranchise={params.franchise} />;
}
