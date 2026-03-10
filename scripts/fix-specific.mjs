import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vwqjquuexxgkowkdftfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cWpxdXVleHhna293a2RmdGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0MDIwMSwiZXhwIjoyMDg4NzE2MjAxfQ.Wd8Yf3xsDg7RBfk1Lrnlb2gDA3_9CLuPR-CnQ2f6myE'
);

// placehold.co 교체 시 카테고리 기본값으로 잘못 들어간 2개 수정
const fixes = [
  { title: 'Omega Speedmaster Professional Moonwatch', url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80' },
  { title: 'Michael Jordan 1986 Fleer Rookie NM', url: 'https://images.unsplash.com/photo-1562077981-4d7eafd44932?w=600&q=80' },
];

async function main() {
  console.log('=== 특정 URL 수정 ===\n');
  for (const { title, url } of fixes) {
    const { data: items } = await supabase.from('items').select('id').eq('title', title);
    if (!items?.length) { console.warn(`[WARN] 없음: ${title}`); continue; }

    for (const item of items) {
      const { error } = await supabase.from('item_images').update({ url }).eq('item_id', item.id);
      if (error) console.error(`[ERROR] ${title}:`, error.message);
      else console.log(`[OK] 수정: "${title}" → ${url}`);
    }
  }
  console.log('\n=== 수정 완료 ===');
}
main().catch(console.error);
