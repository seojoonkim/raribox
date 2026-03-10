import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vwqjquuexxgkowkdftfb.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cWpxdXVleHhna293a2RmdGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0MDIwMSwiZXhwIjoyMDg4NzE2MjAxfQ.Wd8Yf3xsDg7RBfk1Lrnlb2gDA3_9CLuPR-CnQ2f6myE'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
})

const log = (msg) => console.log(`[desc] ${msg}`)

// Also ensure vendors have a public read policy
async function ensureVendorReadPolicy() {
  log('Ensuring vendor public read policy...')
  // Use RPC or raw SQL to add the policy if it doesn't exist
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'vendors' AND policyname = 'vendors_read_public'
        ) THEN
          CREATE POLICY "vendors_read_public" ON public.vendors FOR SELECT USING (true);
        END IF;
      END $$;
    `
  })
  if (error) {
    // RPC might not exist, try direct approach
    log('RPC not available, trying direct policy creation...')
    const { error: err2 } = await supabase.from('vendors').select('id').limit(1)
    if (err2) {
      log(`Warning: vendors table may not be publicly readable: ${err2.message}`)
      log('Please run this SQL in Supabase dashboard:')
      log('  CREATE POLICY "vendors_read_public" ON public.vendors FOR SELECT USING (true);')
    } else {
      log('Vendors table is already readable')
    }
  } else {
    log('Vendor read policy ensured')
  }
}

function generateDescription(item, franchiseSlug) {
  const { title, condition, set_name, year, is_graded, grade_company, grade_score, card_number } = item

  // Graded cards get special description
  if (is_graded && grade_company && grade_score) {
    const gradeName = grade_score >= 10 ? 'Gem Mint' : grade_score >= 9 ? 'Mint' : grade_score >= 8 ? 'Near Mint-Mint' : grade_score >= 7 ? 'Near Mint' : 'Graded'
    return `Professionally graded ${title.replace(/ (PSA|CGC|BGS) \d+(\.\d+)?/i, '')} by ${grade_company}. ${gradeName} grade (${grade_score}) with certified authenticity. Slab-protected and tamper-proof — a premium addition to any serious collection.${set_name ? ` From the ${set_name} set.` : ''}`
  }

  // Pokemon
  if (franchiseSlug === 'pokemon') {
    const condLabel = condition === 'NM' ? 'Near Mint' : condition === 'LP' ? 'Lightly Played' : condition === 'MP' ? 'Moderately Played' : condition || 'excellent'
    return `A ${condLabel.toLowerCase()} condition${year ? ` ${year}` : ''} ${set_name || 'Pokemon'} trading card — ${title.replace(/ (NM|LP|MP|HP)$/i, '')}. ${card_number ? `Card #${card_number}. ` : ''}Perfect for collectors looking to complete their ${set_name || 'Pokemon'} collection.`
  }

  // One Piece
  if (franchiseSlug === 'one-piece') {
    const condLabel = condition === 'NM' ? 'Near Mint' : condition === 'LP' ? 'Lightly Played' : condition || 'excellent'
    return `Official Bandai One Piece Card Game — ${title.replace(/ (NM|LP|MP|HP)$/i, '')}. ${condLabel} condition.${card_number ? ` Card #${card_number}.` : ''} A must-have for any serious One Piece TCG collector.`
  }

  // Sports Cards
  if (franchiseSlug === 'sports-cards') {
    return `Authenticated${year ? ` ${year}` : ''} ${title.replace(/ (NM|LP|MP|HP)$/i, '')} trading card in ${(condition || 'NM').toLowerCase() === 'nm' ? 'near mint' : (condition || '').toLowerCase()} condition.${set_name ? ` From the ${set_name} series.` : ''} A premium sports collectible for serious investors and fans.`
  }

  // Funko Pop
  if (franchiseSlug === 'funko') {
    return `Official Funko Pop! vinyl figure — ${title.replace(/ Funko Pop/i, '').replace(/ (NM|LP)$/i, '')}. ${condition === 'NM' ? 'Mint condition in original box' : 'Near mint condition'}. Standard release with pop protector recommended for display.`
  }

  // Watches
  if (title.toLowerCase().includes('rolex') || title.toLowerCase().includes('omega') || title.toLowerCase().includes('patek') ||
      title.toLowerCase().includes('iwc') || title.toLowerCase().includes('audemars') || title.toLowerCase().includes('seiko') ||
      title.toLowerCase().includes('g-shock')) {
    return `Authentic ${title.replace(/ (NM|LP|MP)$/i, '')} in ${condition === 'NM' ? 'excellent' : 'good'} pre-owned condition. Complete with box and papers where available. A timeless collectible timepiece.`
  }

  // Figures (Gundam, anime figures, etc.)
  if (title.toLowerCase().includes('gundam') || title.toLowerCase().includes('nendoroid') || title.toLowerCase().includes('figuarts') ||
      title.toLowerCase().includes('artfx') || title.toLowerCase().includes('revoltech') || title.toLowerCase().includes('first 4 figures') ||
      title.toLowerCase().includes('evangelion')) {
    return `Premium collectible figure — ${title.replace(/ (NM|LP)$/i, '')}. ${condition === 'NM' ? 'Brand new in sealed packaging' : 'Excellent condition'}. Display-quality piece for collectors and enthusiasts.`
  }

  // MTG
  if (franchiseSlug === 'mtg') {
    return `Magic: The Gathering — ${title.replace(/ (NM|LP|MP)$/i, '')}. ${condition === 'NM' ? 'Near mint' : condition === 'LP' ? 'Lightly played' : condition || 'Good'} condition.${set_name ? ` From ${set_name}.` : ''} A collectible piece of TCG history.`
  }

  // Default
  return `${title} — premium collectible in ${condition === 'NM' ? 'near mint' : condition === 'LP' ? 'lightly played' : condition || 'good'} condition. Authenticated and ready for your collection.`
}

async function main() {
  log('Starting description update...')

  await ensureVendorReadPolicy()

  // Fetch all items with their franchise info
  const { data: items, error } = await supabase
    .from('items')
    .select('id, title, condition, set_name, year, is_graded, grade_company, grade_score, card_number, franchise_id, franchises(slug)')
    .eq('status', 'active')

  if (error) {
    console.error('Failed to fetch items:', error.message)
    process.exit(1)
  }

  log(`Found ${items.length} active items`)

  let updated = 0
  const BATCH = 20

  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH)
    const updates = batch.map(item => {
      const franchiseSlug = item.franchises?.slug || null
      const description = generateDescription(item, franchiseSlug)
      return { id: item.id, description }
    })

    // Update each item
    for (const upd of updates) {
      const { error: updErr } = await supabase
        .from('items')
        .update({ description: upd.description })
        .eq('id', upd.id)

      if (updErr) {
        console.error(`Failed to update ${upd.id}:`, updErr.message)
      } else {
        updated++
      }
    }

    log(`Updated batch ${Math.floor(i / BATCH) + 1}: ${updates.length} items`)
  }

  log(`\n✅ Done! Updated ${updated}/${items.length} item descriptions`)
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})
