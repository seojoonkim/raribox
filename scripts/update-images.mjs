import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vwqjquuexxgkowkdftfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cWpxdXVleHhna293a2RmdGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0MDIwMSwiZXhwIjoyMDg4NzE2MjAxfQ.Wd8Yf3xsDg7RBfk1Lrnlb2gDA3_9CLuPR-CnQ2f6myE'
);

// 특정 타이틀별 이미지 매핑
const titleImageMap = [
  { title: 'Audemars Piguet Royal Oak 15500ST', url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80' },
  { title: 'Omega Speedmaster Professional Moonwatch', url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80' },
  { title: 'S.H. Figuarts Goku Ultra Instinct NM', url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80' },
  { title: 'LeBron James Topps Chrome Rookie CGC 9', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
  { title: 'Michael Jordan Fleer 86 CGC 8', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
  { title: 'LeBron James 2003 Topps Chrome Rookie PSA 9', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
  { title: 'Michael Jordan 1986 Fleer Rookie NM', url: 'https://images.unsplash.com/photo-1562077981-4d7eafd44932?w=600&q=80' },
  { title: 'Goku Super Saiyan #14 NM', url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80' },
  { title: 'AC-01 Vinsmoke Reiju card sleeves', url: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&q=80' },
  { title: 'Acrylic Trading Card Display Stand', url: 'https://images.unsplash.com/photo-1568667256549-094345857aad?w=600&q=80' },
];

// placehold.co 카테고리별 이미지 매핑 (키워드 기반)
function getImageForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes('pokemon') || t.includes('pikachu') || t.includes('charizard')) {
    return 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&q=80';
  }
  if (t.includes('one piece') || t.includes('luffy') || t.includes('zoro') || t.includes('nami') || t.includes('vinsmoke') || t.includes('reiju')) {
    return 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&q=80';
  }
  if (t.includes('jordan') || t.includes('lebron') || t.includes('basketball') || t.includes('sports') || t.includes('topps') || t.includes('fleer') || t.includes('rookie') || t.includes('card')) {
    return 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80';
  }
  if (t.includes('watch') || t.includes('rolex') || t.includes('omega') || t.includes('audemars') || t.includes('speedmaster') || t.includes('royal oak')) {
    return 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80';
  }
  if (t.includes('figure') || t.includes('figuarts') || t.includes('goku') || t.includes('dragon ball') || t.includes('anime')) {
    return 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80';
  }
  // 기본값
  return 'https://images.unsplash.com/photo-1568667256549-094345857aad?w=600&q=80';
}

async function main() {
  console.log('=== RariBox 이미지 업데이트 시작 ===\n');

  let totalUpdated = 0;
  let totalErrors = 0;

  // 1단계: 특정 타이틀별 이미지 업데이트
  console.log('--- 1단계: 특정 아이템 이미지 업데이트 ---');
  for (const { title, url } of titleImageMap) {
    // items 테이블에서 해당 title의 item_id 찾기
    const { data: items, error: itemErr } = await supabase
      .from('items')
      .select('id')
      .eq('title', title);

    if (itemErr) {
      console.error(`[ERROR] 아이템 조회 실패 (${title}):`, itemErr.message);
      totalErrors++;
      continue;
    }

    if (!items || items.length === 0) {
      console.warn(`[WARN] 아이템 없음: "${title}"`);
      continue;
    }

    for (const item of items) {
      // item_images 테이블 확인
      const { data: existing, error: imgErr } = await supabase
        .from('item_images')
        .select('id, url')
        .eq('item_id', item.id);

      if (imgErr) {
        console.error(`[ERROR] item_images 조회 실패 (item_id=${item.id}):`, imgErr.message);
        totalErrors++;
        continue;
      }

      if (existing && existing.length > 0) {
        // 기존 이미지 업데이트
        const { error: updateErr } = await supabase
          .from('item_images')
          .update({ url, updated_at: new Date().toISOString() })
          .eq('item_id', item.id);

        if (updateErr) {
          console.error(`[ERROR] 업데이트 실패 (${title}):`, updateErr.message);
          totalErrors++;
        } else {
          console.log(`[OK] 업데이트: "${title}" → ${url}`);
          totalUpdated++;
        }
      } else {
        // 이미지 없으면 insert
        const { error: insertErr } = await supabase
          .from('item_images')
          .insert({ item_id: item.id, url, sort_order: 0 });

        if (insertErr) {
          console.error(`[ERROR] 삽입 실패 (${title}):`, insertErr.message);
          totalErrors++;
        } else {
          console.log(`[INSERT] 추가: "${title}" → ${url}`);
          totalUpdated++;
        }
      }
    }
  }

  // 2단계: placehold.co URL 전수 교체
  console.log('\n--- 2단계: placehold.co URL 전수 교체 ---');

  const { data: placeholdImages, error: placeholdErr } = await supabase
    .from('item_images')
    .select('id, item_id, url')
    .like('url', 'https://placehold.co%');

  if (placeholdErr) {
    console.error('[ERROR] placehold.co 이미지 조회 실패:', placeholdErr.message);
    totalErrors++;
  } else if (!placeholdImages || placeholdImages.length === 0) {
    console.log('[INFO] placehold.co 이미지 없음 (이미 처리됨)');
  } else {
    console.log(`[INFO] placehold.co 이미지 ${placeholdImages.length}개 발견`);

    for (const img of placeholdImages) {
      // 해당 item의 title 가져오기
      const { data: itemData, error: itemErr2 } = await supabase
        .from('items')
        .select('title')
        .eq('id', img.item_id)
        .single();

      if (itemErr2 || !itemData) {
        console.warn(`[WARN] item_id=${img.item_id} title 조회 실패, 기본 이미지 사용`);
        const fallbackUrl = 'https://images.unsplash.com/photo-1568667256549-094345857aad?w=600&q=80';
        await supabase.from('item_images').update({ url: fallbackUrl }).eq('id', img.id);
        totalUpdated++;
        continue;
      }

      const newUrl = getImageForTitle(itemData.title);
      const { error: updateErr2 } = await supabase
        .from('item_images')
        .update({ url: newUrl })
        .eq('id', img.id);

      if (updateErr2) {
        console.error(`[ERROR] placehold.co 교체 실패 (${itemData.title}):`, updateErr2.message);
        totalErrors++;
      } else {
        console.log(`[OK] placehold 교체: "${itemData.title}" → ${newUrl}`);
        totalUpdated++;
      }
    }
  }

  console.log('\n=== 완료 ===');
  console.log(`✅ 업데이트/삽입: ${totalUpdated}개`);
  console.log(`❌ 오류: ${totalErrors}개`);
}

main().catch(console.error);
