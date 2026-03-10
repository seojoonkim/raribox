import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vwqjquuexxgkowkdftfb.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cWpxdXVleHhna293a2RmdGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0MDIwMSwiZXhwIjoyMDg4NzE2MjAxfQ.Wd8Yf3xsDg7RBfk1Lrnlb2gDA3_9CLuPR-CnQ2f6myE'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
})

const log = (msg) => console.log(`[seed] ${msg}`)
const err = (msg, e) => console.error(`[ERR] ${msg}`, e?.message || e)

// ─── Step 1: Check / create test auth user ───────────────────────────────────
async function ensureAuthUser() {
  const testEmail = 'archive-stop@raribox.test'
  log('Checking auth user...')

  // Try to create via admin API
  const { data: existing, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) {
    err('listUsers failed', listErr)
  } else {
    const found = existing?.users?.find(u => u.email === testEmail)
    if (found) {
      log(`Auth user already exists: ${found.id}`)
      return found.id
    }
  }

  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email: testEmail,
    password: 'raribox-test-2026',
    email_confirm: true,
    user_metadata: { name: 'Archive Stop', role: 'vendor' }
  })

  if (createErr) {
    err('createUser failed', createErr)
    // Fallback: use fixed UUID if we can't create
    return '00000000-0000-0000-0000-000000000001'
  }

  log(`Auth user created: ${created.user.id}`)
  return created.user.id
}

// ─── Step 2: Ensure public.users row ────────────────────────────────────────
async function ensurePublicUser(userId) {
  log(`Ensuring public.users row for ${userId}...`)
  const { error } = await supabase.from('users').upsert({
    id: userId,
    email: 'archive-stop@raribox.test',
    name: 'Archive Stop',
    role: 'vendor'
  }, { onConflict: 'id' })
  if (error) err('upsert public.users', error)
  else log('public.users OK')
}

// ─── Step 3: Ensure vendor ───────────────────────────────────────────────────
async function ensureVendor(userId) {
  log('Ensuring vendor...')
  const { data: existing } = await supabase.from('vendors').select('id').eq('slug', 'archive-stop').maybeSingle()
  if (existing) {
    log(`Vendor already exists: ${existing.id}`)
    return existing.id
  }

  const { data, error } = await supabase.from('vendors').insert({
    user_id: userId,
    shop_name: 'Archive Stop',
    slug: 'archive-stop',
    description: 'Premium collectibles marketplace — Pokemon, One Piece, Sports Cards & more',
    status: 'approved',
    tier: 'gold',
    rating_avg: 4.8,
    rating_count: 156,
    total_sales: 342
  }).select('id').single()

  if (error) { err('insert vendor', error); return null }
  log(`Vendor created: ${data.id}`)
  return data.id
}

// ─── Step 4: Get franchise/category IDs ─────────────────────────────────────
async function getFranchiseMap() {
  const { data, error } = await supabase.from('franchises').select('id, slug')
  if (error) { err('get franchises', error); return {} }
  return Object.fromEntries(data.map(f => [f.slug, f.id]))
}

async function getCategoryMap() {
  const { data, error } = await supabase.from('categories').select('id, slug')
  if (error) { err('get categories', error); return {} }
  return Object.fromEntries(data.map(c => [c.slug, c.id]))
}

// ─── Step 5: Build 100 items ─────────────────────────────────────────────────
function buildItems(vendorId, franchiseMap, categoryMap) {
  const tcg = categoryMap['trading-cards']
  const graded = categoryMap['graded-cards']
  const figures = categoryMap['figures']
  const watches = categoryMap['watches']

  const pokemon = franchiseMap['pokemon']
  const onePiece = franchiseMap['one-piece']
  const sports = franchiseMap['sports-cards']
  const funko = franchiseMap['funko']

  const items = []

  // Helper
  const slug = (title, i) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + `-${i}`

  // ── Pokemon 25개 ──────────────────────────────────────────────────────────
  const pokemonCards = [
    { title: 'Charizard Holo Base Set', price: 250, condition: 'LP', set_name: 'Base Set', card_number: '4/102', img: 'https://images.pokemontcg.io/base1/4_hires.png' },
    { title: 'Pikachu Base Set', price: 18, condition: 'NM', set_name: 'Base Set', card_number: '58/102', img: 'https://images.pokemontcg.io/base1/58_hires.png' },
    { title: 'Mewtwo Base Set PSA 10', price: 180, condition: 'NM', set_name: 'Base Set', card_number: '10/102', is_graded: true, grade_company: 'PSA', grade_score: 10, img: 'https://images.pokemontcg.io/base1/10_hires.png' },
    { title: 'Blastoise Holo Base Set', price: 120, condition: 'LP', set_name: 'Base Set', card_number: '2/102', img: 'https://images.pokemontcg.io/base1/2_hires.png' },
    { title: 'Venusaur Holo Base Set', price: 90, condition: 'MP', set_name: 'Base Set', card_number: '15/102', img: 'https://images.pokemontcg.io/base1/15_hires.png' },
    { title: 'Charizard VSTAR NM', price: 35, condition: 'NM', set_name: 'Brilliant Stars', card_number: '18/172', img: 'https://images.pokemontcg.io/swsh9/18_hires.png' },
    { title: 'Umbreon VMAX Alt Art NM', price: 150, condition: 'NM', set_name: 'Evolving Skies', card_number: '214/203', img: 'https://images.pokemontcg.io/swsh7/214_hires.png' },
    { title: 'Pikachu VMAX NM', price: 45, condition: 'NM', set_name: 'Vivid Voltage', card_number: '44/185', img: 'https://images.pokemontcg.io/swsh4/44_hires.png' },
    { title: 'Charizard ex Scarlet & Violet NM', price: 40, condition: 'NM', set_name: 'Scarlet & Violet', card_number: '6/198', img: 'https://images.pokemontcg.io/sv1/6_hires.png' },
    { title: 'Miraidon ex NM', price: 25, condition: 'NM', set_name: 'Scarlet & Violet', card_number: '81/198', img: 'https://images.pokemontcg.io/sv1/81_hires.png' },
    { title: 'Mewtwo EX PSA 9', price: 95, condition: 'NM', set_name: 'Next Destinies', card_number: '54/99', is_graded: true, grade_company: 'PSA', grade_score: 9, img: 'https://images.pokemontcg.io/base4/10_hires.png' },
    { title: 'Lugia Neo Genesis LP', price: 200, condition: 'LP', set_name: 'Neo Genesis', card_number: '9/111', img: 'https://images.pokemontcg.io/neo1/9_hires.png' },
    { title: 'Ho-Oh Neo Revelation NM', price: 85, condition: 'NM', set_name: 'Neo Revelation', card_number: '7/64', img: 'https://images.pokemontcg.io/neo3/7_hires.png' },
    { title: 'Espeon GX Full Art NM', price: 60, condition: 'NM', set_name: 'Sun & Moon Promo', card_number: 'SM83', img: 'https://images.pokemontcg.io/smp/SM83_hires.png' },
    { title: 'Gengar VMAX Alt Art NM', price: 110, condition: 'NM', set_name: 'Fusion Strike', card_number: '271/264', img: 'https://images.pokemontcg.io/swsh8/271_hires.png' },
    { title: 'Rayquaza VMAX Alt Art NM', price: 120, condition: 'NM', set_name: 'Evolving Skies', card_number: '218/203', img: 'https://images.pokemontcg.io/swsh7/218_hires.png' },
    { title: 'Alakazam Base Set LP', price: 30, condition: 'LP', set_name: 'Base Set', card_number: '1/102', img: 'https://images.pokemontcg.io/base1/1_hires.png' },
    { title: 'Nidoking Base Set NM', price: 22, condition: 'NM', set_name: 'Base Set', card_number: '11/102', img: 'https://images.pokemontcg.io/base1/11_hires.png' },
    { title: 'Hitmonchan Base Set NM', price: 15, condition: 'NM', set_name: 'Base Set', card_number: '7/102', img: 'https://images.pokemontcg.io/base1/7_hires.png' },
    { title: 'Zapdos Base Set NM', price: 28, condition: 'NM', set_name: 'Base Set', card_number: '16/102', img: 'https://images.pokemontcg.io/base1/16_hires.png' },
    { title: 'Moltres Base Set LP', price: 20, condition: 'LP', set_name: 'Base Set', card_number: '12/102', img: 'https://images.pokemontcg.io/base1/12_hires.png' },
    { title: 'Articuno Base Set NM', price: 25, condition: 'NM', set_name: 'Base Set', card_number: '17/102', img: 'https://images.pokemontcg.io/base1/17_hires.png' },
    { title: 'Raichu Base Set MP', price: 35, condition: 'MP', set_name: 'Base Set', card_number: '14/102', img: 'https://images.pokemontcg.io/base1/14_hires.png' },
    { title: 'Gyarados Base Set NM', price: 45, condition: 'NM', set_name: 'Base Set', card_number: '6/102', img: 'https://images.pokemontcg.io/base1/6_hires.png' },
    { title: 'Charizard Holo Base Set PSA 8', price: 500, condition: 'LP', set_name: 'Base Set', card_number: '4/102', is_graded: true, grade_company: 'PSA', grade_score: 8, img: 'https://images.pokemontcg.io/base1/4_hires.png' },
  ]

  pokemonCards.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: c.is_graded ? graded : tcg,
      franchise_id: pokemon,
      title: c.title,
      slug: slug(c.title, i + 1),
      description: `${c.title} - ${c.condition} condition. ${c.set_name} #${c.card_number}`,
      price: c.price,
      currency: 'USD',
      condition: c.condition,
      set_name: c.set_name,
      card_number: c.card_number,
      language: 'EN',
      is_graded: c.is_graded || false,
      grade_company: c.grade_company || null,
      grade_score: c.grade_score || null,
      status: 'active',
      stock: Math.floor(Math.random() * 3) + 1,
      is_featured: i < 5,
      _img: c.img,
    })
  })

  // ── One Piece 15개 ────────────────────────────────────────────────────────
  const opCards = [
    { title: 'Monkey D. Luffy OP01-001 NM', price: 80, card_number: 'OP01-001', condition: 'NM' },
    { title: 'Roronoa Zoro Alt Art NM', price: 120, card_number: 'OP01-002', condition: 'NM' },
    { title: 'Nami OP01-016 LP', price: 15, card_number: 'OP01-016', condition: 'LP' },
    { title: 'Shanks Secret Rare NM', price: 200, card_number: 'OP01-118', condition: 'NM' },
    { title: 'Trafalgar Law OP02-093 NM', price: 45, card_number: 'OP02-093', condition: 'NM' },
    { title: 'Boa Hancock OP03-040 NM', price: 35, card_number: 'OP03-040', condition: 'NM' },
    { title: 'Whitebeard OP02-115 NM', price: 90, card_number: 'OP02-115', condition: 'NM' },
    { title: 'Portgas D. Ace OP04-018 NM', price: 55, card_number: 'OP04-018', condition: 'NM' },
    { title: 'Yamato OP03-121 Alt Art NM', price: 150, card_number: 'OP03-121', condition: 'NM' },
    { title: 'Kaido OP04-058 NM', price: 60, card_number: 'OP04-058', condition: 'NM' },
    { title: 'Big Mom OP02-099 LP', price: 25, card_number: 'OP02-099', condition: 'LP' },
    { title: 'Sanji OP01-013 NM', price: 20, card_number: 'OP01-013', condition: 'NM' },
    { title: 'Chopper OP01-017 NM', price: 12, card_number: 'OP01-017', condition: 'NM' },
    { title: 'Robin OP01-021 NM', price: 18, card_number: 'OP01-021', condition: 'NM' },
    { title: 'Luffy Gear 5 OP05-119 NM', price: 180, card_number: 'OP05-119', condition: 'NM' },
  ]

  opCards.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: tcg,
      franchise_id: onePiece,
      title: c.title,
      slug: slug(c.title, 100 + i),
      description: `${c.title} - One Piece Card Game. ${c.condition} condition.`,
      price: c.price,
      currency: 'USD',
      condition: c.condition,
      card_number: c.card_number,
      language: 'EN',
      is_graded: false,
      status: 'active',
      stock: Math.floor(Math.random() * 3) + 1,
      _img: `https://placehold.co/400x560/1a1a2e/ffffff?text=${encodeURIComponent(c.title.substring(0, 20))}`,
    })
  })

  // ── Sports Cards 15개 ─────────────────────────────────────────────────────
  const sportsCards = [
    { title: 'LeBron James 2003 Topps Chrome Rookie PSA 9', price: 800, condition: 'NM', is_graded: true, grade_company: 'PSA', grade_score: 9 },
    { title: 'Kobe Bryant 1996 Topps Chrome Rookie SP', price: 450, condition: 'LP' },
    { title: 'Stephen Curry 2009 Panini Prizm NM', price: 90, condition: 'NM' },
    { title: 'Michael Jordan 1986 Fleer Rookie NM', price: 1200, condition: 'NM' },
    { title: 'Luka Doncic 2018 Panini Prizm Silver NM', price: 200, condition: 'NM' },
    { title: 'Tom Brady 2000 Bowman Chrome Rookie LP', price: 350, condition: 'LP' },
    { title: 'Patrick Mahomes 2017 Panini Prizm PSA 10', price: 500, condition: 'NM', is_graded: true, grade_company: 'PSA', grade_score: 10 },
    { title: 'Shohei Ohtani 2018 Topps Chrome Rookie NM', price: 280, condition: 'NM' },
    { title: 'Mike Trout 2011 Topps Update Rookie NM', price: 150, condition: 'NM' },
    { title: 'Giannis Antetokounmpo 2013 Panini NM', price: 75, condition: 'NM' },
    { title: 'Ja Morant 2019 Panini Prizm NM', price: 65, condition: 'NM' },
    { title: 'Zion Williamson 2019 Panini Prizm NM', price: 55, condition: 'NM' },
    { title: 'Wayne Gretzky 1979 OPC Rookie LP', price: 600, condition: 'LP' },
    { title: 'Lionel Messi 2004 Panini Mega Cracks LP', price: 400, condition: 'LP' },
    { title: 'Cristiano Ronaldo 2004 Panini NM', price: 350, condition: 'NM' },
  ]

  sportsCards.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: c.is_graded ? graded : tcg,
      franchise_id: sports,
      title: c.title,
      slug: slug(c.title, 200 + i),
      description: `${c.title} - ${c.condition} condition. Premium sports card.`,
      price: c.price,
      currency: 'USD',
      condition: c.condition,
      language: 'EN',
      is_graded: c.is_graded || false,
      grade_company: c.grade_company || null,
      grade_score: c.grade_score || null,
      status: 'active',
      stock: 1,
      is_featured: i < 3,
      _img: `https://placehold.co/400x560/0f4c75/ffffff?text=${encodeURIComponent(c.title.substring(0, 20))}`,
    })
  })

  // ── Funko Pop 15개 ────────────────────────────────────────────────────────
  const funkos = [
    { title: 'Spider-Man #03 Funko Pop NM', price: 25 },
    { title: 'Iron Man Metallic #66 NM', price: 45 },
    { title: 'Venom Chase #363 NM', price: 80 },
    { title: 'Thanos Infinity Gauntlet #289 NM', price: 35 },
    { title: 'Batman Black Chrome #01 NM', price: 55 },
    { title: 'Goku Super Saiyan #14 NM', price: 40 },
    { title: 'Naruto Running #823 NM', price: 30 },
    { title: 'Darth Vader #01 NM', price: 60 },
    { title: 'Grogu The Child #369 NM', price: 20 },
    { title: 'Captain America #07 NM', price: 28 },
    { title: 'Deadpool with Unicorn #320 NM', price: 45 },
    { title: 'Wolverine Retro #526 NM', price: 35 },
    { title: 'Pikachu Sitting #553 NM', price: 22 },
    { title: 'Luffy Gear 4 #1263 NM', price: 38 },
    { title: 'Saitama One Punch #096 NM', price: 50 },
  ]

  funkos.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: figures,
      franchise_id: funko,
      title: c.title,
      slug: slug(c.title, 300 + i),
      description: `${c.title} - Funko Pop Vinyl Figure. Mint condition in box.`,
      price: c.price,
      currency: 'USD',
      condition: 'NM',
      is_graded: false,
      status: 'active',
      stock: Math.floor(Math.random() * 5) + 1,
      _img: `https://placehold.co/400x400/6a0572/ffffff?text=${encodeURIComponent(c.title.substring(0, 20))}`,
    })
  })

  // ── Graded Cards PSA/CGC 15개 ─────────────────────────────────────────────
  const gradedCards = [
    { title: 'Charizard Base Set CGC 8 Blue Label', price: 320, grade_company: 'CGC', grade_score: 8, franchise: pokemon, card_number: '4/102', img: 'https://images.pokemontcg.io/base1/4_hires.png' },
    { title: 'Pikachu Illustrator PSA 7', price: 2500, grade_company: 'PSA', grade_score: 7, franchise: pokemon, img: 'https://images.pokemontcg.io/base1/58_hires.png' },
    { title: 'Black Lotus MTG PSA 6', price: 5000, grade_company: 'PSA', grade_score: 6, franchise: franchiseMap['mtg'] },
    { title: 'Charizard 1st Edition Base PSA 9', price: 1800, grade_company: 'PSA', grade_score: 9, franchise: pokemon, card_number: '4/102', img: 'https://images.pokemontcg.io/base1/4_hires.png' },
    { title: 'Umbreon 151 PSA 10', price: 280, grade_company: 'PSA', grade_score: 10, franchise: pokemon, img: 'https://images.pokemontcg.io/sv3pt5/95_hires.png' },
    { title: 'Charizard ex SV PSA 10', price: 120, grade_company: 'PSA', grade_score: 10, franchise: pokemon, img: 'https://images.pokemontcg.io/sv1/6_hires.png' },
    { title: 'LeBron James Topps Chrome Rookie CGC 9', price: 700, grade_company: 'CGC', grade_score: 9, franchise: sports },
    { title: 'Michael Jordan Fleer 86 CGC 8', price: 900, grade_company: 'CGC', grade_score: 8, franchise: sports },
    { title: 'Luffy OP01-001 PSA 10', price: 350, grade_company: 'PSA', grade_score: 10, franchise: onePiece },
    { title: 'Shanks OP01-118 PSA 9', price: 180, grade_company: 'PSA', grade_score: 9, franchise: onePiece },
    { title: 'Mewtwo Base 2 CGC 9', price: 140, grade_company: 'CGC', grade_score: 9, franchise: pokemon, img: 'https://images.pokemontcg.io/base1/10_hires.png' },
    { title: 'Blastoise Shadowless PSA 8', price: 200, grade_company: 'PSA', grade_score: 8, franchise: pokemon, img: 'https://images.pokemontcg.io/base1/2_hires.png' },
    { title: 'Tom Brady Bowman Rookie CGC 8.5', price: 280, grade_company: 'CGC', grade_score: 8.5, franchise: sports },
    { title: 'Messi 2004 Panini CGC 7', price: 300, grade_company: 'CGC', grade_score: 7, franchise: sports },
    { title: 'Rayquaza Gold Star PSA 9', price: 650, grade_company: 'PSA', grade_score: 9, franchise: pokemon, img: 'https://images.pokemontcg.io/ex7/107_hires.png' },
  ]

  gradedCards.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: graded,
      franchise_id: c.franchise || pokemon,
      title: c.title,
      slug: slug(c.title, 400 + i),
      description: `${c.title} - Professionally graded by ${c.grade_company}. Grade: ${c.grade_score}.`,
      price: c.price,
      currency: 'USD',
      condition: 'NM',
      card_number: c.card_number || null,
      is_graded: true,
      grade_company: c.grade_company,
      grade_score: c.grade_score,
      status: 'active',
      stock: 1,
      is_featured: i < 4,
      _img: c.img || `https://placehold.co/400x560/1a1a2e/ffffff?text=${encodeURIComponent(c.grade_company)}+${c.grade_score}`,
    })
  })

  // ── Watches & Figures 15개 ────────────────────────────────────────────────
  const collectibles = [
    { title: 'Rolex Submariner 116610LN 2020', price: 12000, category: watches },
    { title: 'Rolex Datejust 41 126334 NM', price: 9500, category: watches },
    { title: 'Audemars Piguet Royal Oak 15500ST', price: 35000, category: watches },
    { title: 'Patek Philippe Nautilus 5711 LP', price: 80000, category: watches },
    { title: 'IWC Pilot Mark XVIII NM', price: 3200, category: watches },
    { title: 'Omega Speedmaster Professional Moonwatch', price: 4500, category: watches },
    { title: 'Seiko Prospex Diver SBDC101 NM', price: 650, category: watches },
    { title: 'G-Shock DW-5600 Black NM', price: 80, category: watches },
    { title: 'MG Unicorn Gundam Ver Ka NM', price: 150, category: figures },
    { title: 'PG Evangelion Unit-01 NM', price: 280, category: figures },
    { title: 'S.H. Figuarts Goku Ultra Instinct NM', price: 95, category: figures },
    { title: 'Nendoroid Rem Re:Zero NM', price: 65, category: figures },
    { title: 'First 4 Figures Samus Aran Exclusive NM', price: 450, category: figures },
    { title: 'Revoltech Amazing Yamaguchi Spider-Man NM', price: 75, category: figures },
    { title: 'ARTFX+ Darth Vader 1/10 NM', price: 120, category: figures },
  ]

  collectibles.forEach((c, i) => {
    items.push({
      vendor_id: vendorId,
      category_id: c.category,
      franchise_id: null,
      title: c.title,
      slug: slug(c.title, 500 + i),
      description: `${c.title} - Premium collectible. Near mint condition.`,
      price: c.price,
      currency: 'USD',
      condition: 'NM',
      is_graded: false,
      status: 'active',
      stock: 1,
      _img: `https://placehold.co/400x400/2d3436/ffffff?text=${encodeURIComponent(c.title.substring(0, 20))}`,
    })
  })

  return items
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  log('Starting seed...')

  // 1. Auth user
  const userId = await ensureAuthUser()
  log(`Using userId: ${userId}`)

  // 2. Public user
  await ensurePublicUser(userId)

  // 3. Vendor
  const vendorId = await ensureVendor(userId)
  if (!vendorId) { log('FATAL: no vendorId'); process.exit(1) }
  log(`Using vendorId: ${vendorId}`)

  // 4. Get franchise/category maps
  const franchiseMap = await getFranchiseMap()
  const categoryMap = await getCategoryMap()
  log(`Franchises: ${Object.keys(franchiseMap).join(', ')}`)
  log(`Categories: ${Object.keys(categoryMap).join(', ')}`)

  if (!franchiseMap['pokemon']) {
    log('No franchises found — inserting seeds...')
    await supabase.from('franchises').insert([
      { name: 'Pokemon', slug: 'pokemon', sort_order: 1 },
      { name: 'One Piece', slug: 'one-piece', sort_order: 2 },
      { name: 'Sports Cards', slug: 'sports-cards', sort_order: 3 },
      { name: 'Funko Pop', slug: 'funko', sort_order: 4 },
      { name: 'Gundam', slug: 'gundam', sort_order: 5 },
      { name: 'Marvel', slug: 'marvel', sort_order: 6 },
      { name: 'Dragon Ball', slug: 'dragon-ball', sort_order: 7 },
      { name: 'Star Wars', slug: 'star-wars', sort_order: 8 },
      { name: 'MTG', slug: 'mtg', sort_order: 9 },
      { name: 'Weiss Schwarz', slug: 'weiss-schwarz', sort_order: 10 },
    ])
    const { data } = await supabase.from('franchises').select('id, slug')
    data.forEach(f => { franchiseMap[f.slug] = f.id })
    log(`Franchises inserted: ${Object.keys(franchiseMap).join(', ')}`)
  }

  if (!categoryMap['trading-cards']) {
    log('No categories found — inserting seeds...')
    await supabase.from('categories').insert([
      { name: 'Trading Cards', slug: 'trading-cards', sort_order: 1 },
      { name: 'Graded Cards', slug: 'graded-cards', sort_order: 2 },
      { name: 'Sealed Products', slug: 'sealed-products', sort_order: 3 },
      { name: 'Figures', slug: 'figures', sort_order: 4 },
      { name: 'Watches', slug: 'watches', sort_order: 5 },
      { name: 'Comics & Manga', slug: 'comics', sort_order: 6 },
      { name: 'Memorabilia', slug: 'memorabilia', sort_order: 7 },
    ])
    const { data } = await supabase.from('categories').select('id, slug')
    data.forEach(c => { categoryMap[c.slug] = c.id })
    log(`Categories inserted: ${Object.keys(categoryMap).join(', ')}`)
  }

  // 5. Build & insert items
  const allItems = buildItems(vendorId, franchiseMap, categoryMap)
  log(`Total items to insert: ${allItems.length}`)

  // Extract image URLs, strip _img from insert payload
  const itemImages = {}
  const itemsToInsert = allItems.map(item => {
    const { _img, ...rest } = item
    itemImages[item.slug] = _img
    return rest
  })

  // Insert in batches of 25
  const BATCH = 25
  let insertedCount = 0
  for (let i = 0; i < itemsToInsert.length; i += BATCH) {
    const batch = itemsToInsert.slice(i, i + BATCH)
    const { data, error } = await supabase.from('items').upsert(batch, { onConflict: 'vendor_id,slug' }).select('id, slug')
    if (error) {
      err(`batch ${i}-${i + BATCH} insert error`, error)
    } else {
      insertedCount += data.length
      log(`Inserted batch ${i / BATCH + 1}: ${data.length} items`)

      // Insert item_images
      const imageRows = data.map(item => ({
        item_id: item.id,
        url: itemImages[item.slug] || 'https://placehold.co/400x560/333/fff?text=No+Image',
        sort_order: 0,
        is_primary: true,
      }))
      // Delete existing images for these items first, then insert
      const itemIds = data.map(item => item.id)
      await supabase.from('item_images').delete().in('item_id', itemIds)
      const { error: imgErr } = await supabase.from('item_images').insert(imageRows)
      if (imgErr) err('item_images insert', imgErr)
      else log(`  → images inserted for batch`)
    }
  }

  log(`\n✅ Seed complete! Total items inserted: ${insertedCount}`)

  // 6. Verify
  const { count, error: cntErr } = await supabase.from('items').select('*', { count: 'exact', head: true })
  if (cntErr) err('count check', cntErr)
  else log(`DB items count: ${count}`)
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})
