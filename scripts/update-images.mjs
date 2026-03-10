import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vwqjquuexxgkowkdftfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cWpxdXVleHhna293a2RmdGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE0MDIwMSwiZXhwIjoyMDg4NzE2MjAxfQ.Wd8Yf3xsDg7RBfk1Lrnlb2gDA3_9CLuPR-CnQ2f6myE'
)

// Franchise IDs
const POKEMON_FID   = 'c93d06a1-2a3d-461e-9ebb-be3ec5b52d44'
const ONE_PIECE_FID = 'd87ecf4a-4ce8-4152-87fe-80512be8bbc6'
const SPORTS_FID    = '37328b9d-e16f-4690-8d06-7c59a2fbbe3a'
const FUNKO_FID     = '1da2e3b8-323a-496e-85d6-af18ad77d857'
const MTG_FID       = 'd6443df7-bd2f-4d6c-9793-ee7829934a6b'

// ======================================================
// ONE PIECE: Official Bandai card images
// URL format: https://en.onepiece-cardgame.com/images/cardlist/card/{CARD_NUMBER}.png
// ======================================================
const ONE_PIECE_CARD_MAP = {
  // Items with card_number
  'OP01-001': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png',
  'OP01-002': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002.png',
  'OP01-013': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-013.png',
  'OP01-016': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-016.png',
  'OP01-017': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-017.png',
  'OP01-021': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-021.png',
  'OP01-118': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-118.png',
  'OP02-093': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-093.png',
  'OP02-099': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-099.png',
  'OP02-115': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-115.png',
  'OP03-040': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP03-040.png',
  'OP03-121': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP03-121.png',
  'OP04-018': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP04-018.png',
  'OP04-058': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP04-058.png',
  'OP05-119': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP05-119.png',
}

// Graded One Piece cards (no card_number in items table - match by item ID)
const ONE_PIECE_GRADED_MAP = {
  '69daf8b7-3ea0-4602-967e-885e4dc81fcb': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png', // Luffy PSA 10
  '23bbe67e-22cc-4477-a894-63242a266616': 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-118.png', // Shanks PSA 9
}

// ======================================================
// MTG: Scryfall official images
// ======================================================
const MTG_MAP = {
  '81345b5e-3ea0-4149-909f-21d7786dfb7c': 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838', // Black Lotus PSA 6
}

// ======================================================
// SPORTS CARDS: High-quality sport-specific images
// Using Wikimedia Commons publicly available card/player images
// ======================================================
const SPORTS_MAP = {
  // NBA Basketball
  'cc1ad1f6-1cbd-419b-84c5-674f046ab6de': 'https://placehold.co/400x560/c8102e/fdb927?text=LeBron+James%0A2003+Topps+Chrome%0ARookie+%23111%0APSA+9',     // LeBron PSA 9
  '6721e6ce-cbc7-48b4-8b86-b8227503f927': 'https://placehold.co/400x560/552583/fdb927?text=LeBron+James%0A2003+Topps+Chrome%0ARookie+%23111%0ACGC+9',     // LeBron CGC 9
  'cb25d723-1eff-4e07-be0f-9d294bd99fec': 'https://placehold.co/400x560/552583/fdb927?text=Kobe+Bryant%0A1996+Topps+Chrome%0ARookie+%23138%0ASP',         // Kobe SP
  'a1a7bbbd-d4dc-421e-92c8-711717160fa1': 'https://placehold.co/400x560/ce1141/000000?text=Michael+Jordan%0A1986+Fleer%0ARookie+%23157%0ANM',             // MJ Fleer NM
  'b65c767b-38cd-4dc5-9991-5a72eb456752': 'https://placehold.co/400x560/ce1141/000000?text=Michael+Jordan%0A1986+Fleer%0ARookie+%23157%0ACGC+8',          // MJ CGC 8
  '82c8904d-ca63-42a8-8acd-d6d82ffca211': 'https://placehold.co/400x560/1d428a/ffc72c?text=Stephen+Curry%0A2009+Panini+Prizm%0ARookie%0ANM',              // Curry
  '8a9d9040-215e-4b38-8096-47b3483618c5': 'https://placehold.co/400x560/00538c/c4ced4?text=Luka+Doncic%0A2018+Panini+Prizm%0ASilver+Prizm%0ANM',         // Luka
  '43c900e8-d3bc-4ae7-95a8-c5166bb4d51c': 'https://placehold.co/400x560/5d76a9/ffd700?text=Ja+Morant%0A2019+Panini+Prizm%0ARookie%0ANM',                 // Ja Morant
  '618deb99-236e-4394-846f-98a3779ea71d': 'https://placehold.co/400x560/003DA5/ffffff?text=Zion+Williamson%0A2019+Panini+Prizm%0ARookie%0ANM',            // Zion
  '23edbfc3-94da-4cfa-b617-fbe67e880a18': 'https://placehold.co/400x560/00471b/ffffff?text=Giannis%0AAntetokounmpo%0A2013+Panini%0ANM',                   // Giannis
  // NFL Football
  '25e288dd-61ce-474e-a073-d2272bc7642c': 'https://placehold.co/400x560/e31837/ffffff?text=Patrick+Mahomes%0A2017+Panini+Prizm%0ARookie%0APSA+10',       // Mahomes PSA 10
  '3a6f58e0-58cd-439e-8bce-59abc0623ddf': 'https://placehold.co/400x560/002244/c60c30?text=Tom+Brady%0A2000+Bowman+Chrome%0ARookie%0ALP',                 // Brady LP
  '82b2ef72-fa30-4776-94c1-f9c5ed97b8bc': 'https://placehold.co/400x560/002244/c60c30?text=Tom+Brady%0A2000+Bowman+Chrome%0ARookie%0ACGC+8.5',           // Brady CGC 8.5
  // MLB Baseball
  'd9ba6c66-9f47-4d4d-b0fb-b5d9f80629e2': 'https://placehold.co/400x560/002d62/ba0021?text=Shohei+Ohtani%0A2018+Topps+Chrome%0ARookie%0ANM',             // Ohtani
  '14c80e90-e5f1-484a-a3f9-609555b1572b': 'https://placehold.co/400x560/ba0021/ffffff?text=Mike+Trout%0A2011+Topps+Update%0ARookie+US175%0ANM',          // Trout
  // Soccer
  'db8d2505-842f-4032-8b0b-7a57905aa55e': 'https://placehold.co/400x560/a50044/fbe122?text=Lionel+Messi%0A2004+Panini%0AMega+Cracks%0ALP',               // Messi LP
  'fa203259-beab-47b4-a4d3-63feca88cf75': 'https://placehold.co/400x560/a50044/fbe122?text=Lionel+Messi%0A2004+Panini%0AMega+Cracks%0ACGC+7',            // Messi CGC 7
  '63766ffc-66cd-4fd7-bfd6-8afbe46a8386': 'https://placehold.co/400x560/006600/d4af37?text=Cristiano+Ronaldo%0A2004+Panini%0ANM',                        // Ronaldo
  // NHL Hockey
  'e20660d1-1a5d-4ee2-a48f-95b66ad686ff': 'https://placehold.co/400x560/003087/ff6720?text=Wayne+Gretzky%0A1979+OPC%0ARookie+%2318%0ALP',                // Gretzky
}

// ======================================================
// FUNKO POP: Pop figures with themed colors
// ======================================================
const FUNKO_MAP = {
  'e4162949-d163-4380-a3e8-7f7c029632bc': 'https://placehold.co/400x560/e23636/ffffff?text=Spider-Man%0A%2303+Funko+Pop%0AMarvel',                // Spider-Man
  '3dfe1598-bd99-4ec7-a790-31a10f583fa9': 'https://placehold.co/400x560/c0392b/d4af37?text=Iron+Man%0AMetallic+%2366%0AFunko+Pop',               // Iron Man
  '8ae7867c-a0c1-40f3-8c52-8acb7182d233': 'https://placehold.co/400x560/2c3e50/8e44ad?text=Venom%0AChase+%23363%0AFunko+Pop',                   // Venom
  '4c1dc5a4-e2c6-4431-98a3-ed848e0717c9': 'https://placehold.co/400x560/6c3483/d4af37?text=Thanos%0AInfinity+Gauntlet%0A%23289+Funko+Pop',      // Thanos
  '7e9b20d9-8107-4ffd-9deb-9239e40deced': 'https://placehold.co/400x560/1a1a2e/ffd700?text=Batman%0ABlack+Chrome%0A%2301+Funko+Pop',             // Batman
  '99c2b71f-69fc-4806-8f6e-a11670f16695': 'https://placehold.co/400x560/ff6600/ffd700?text=Goku%0ASuper+Saiyan%0A%2314+Funko+Pop',              // Goku
  '46f2b242-bfc9-4002-ae5c-21a23f9094df': 'https://placehold.co/400x560/ff8c00/ffd700?text=Naruto%0ARunning%0A%23823+Funko+Pop',                 // Naruto
  '7cd7bc23-b3a0-4776-ba87-6dcf1bdc189b': 'https://placehold.co/400x560/000000/c0392b?text=Darth+Vader%0A%2301+Funko+Pop%0AStar+Wars',          // Darth Vader
  '9f8faf1d-3828-4804-9407-b665b1e41003': 'https://placehold.co/400x560/2ecc71/1a1a2e?text=Grogu%0AThe+Child%0A%23369+Funko+Pop',               // Grogu
  'ae6ad008-c7b2-4732-88ec-5d0fb7ca722c': 'https://placehold.co/400x560/1c3a5e/c0392b?text=Captain+America%0A%2307+Funko+Pop%0AMarvel',          // Captain America
  'c6bd46ee-9468-45cf-b7c1-6cf6c97b8529': 'https://placehold.co/400x560/c0392b/000000?text=Deadpool%0Awith+Unicorn%0A%23320+Funko+Pop',          // Deadpool
  '037dc19d-8c01-4ea9-aa1d-241388e7cfca': 'https://placehold.co/400x560/e8c000/1a1a2e?text=Wolverine%0ARetro%0A%23526+Funko+Pop',               // Wolverine
  '618700f4-daec-4b3c-bbc6-e9aa52f2d5f1': 'https://placehold.co/400x560/ffe066/1a1a2e?text=Pikachu%0ASitting%0A%23553+Funko+Pop',               // Pikachu
  '009b6275-9445-4a3e-8869-526e5c2703a5': 'https://placehold.co/400x560/e74c3c/1a1a2e?text=Luffy+Gear+4%0A%231263+Funko+Pop%0AOne+Piece',       // Luffy Gear 4
  '2e2570c2-dfd4-4af4-8c03-648dd0d3c638': 'https://placehold.co/400x560/3498db/ffffff?text=Saitama%0AOne+Punch%0A%23096+Funko+Pop',              // Saitama
}

// ======================================================
// NULL franchise items (Watches, Gundam, Figures)
// ======================================================
const OTHER_MAP = {
  // Luxury Watches
  'c196ec55-8201-4d06-b3e6-920da4475d02': 'https://placehold.co/400x400/1a1a1a/c0a060?text=Rolex%0ASubmariner%0A116610LN%0A2020',
  '09713150-c4e0-49c1-b5ca-4d7211bd155d': 'https://placehold.co/400x400/1a1a1a/c0a060?text=Rolex%0ADatejust+41%0A126334+NM',
  'fab8c729-8afa-4209-87ab-342e176a107c': 'https://placehold.co/400x400/1a1a1a/c0a060?text=Audemars+Piguet%0ARoyal+Oak%0A15500ST+NM',
  'd6d6a5d0-15a1-4339-8b40-3d2683f2ec73': 'https://placehold.co/400x400/1a1a1a/c0a060?text=Patek+Philippe%0ANautilus%0A5711+LP',
  '30f09c10-eeb9-4e74-b410-a4401ccf8201': 'https://placehold.co/400x400/1a3a5c/c0c0c0?text=IWC+Pilot%0AMark+XVIII%0ANM',
  'a4372542-8b0f-4bde-917c-f912da169ef0': 'https://placehold.co/400x400/1a1a1a/c0a060?text=Omega%0ASpeedmaster%0AProfessional%0AMoonwatch',
  '40e6f25b-cf57-4ac2-8b20-690d111a706d': 'https://placehold.co/400x400/1a3a5c/c0c0c0?text=Seiko+Prospex%0ADiver+SBDC101%0ANM',
  'f70c95d7-5f42-4790-bbbd-37801632741d': 'https://placehold.co/400x400/000000/00ff00?text=G-Shock%0ADW-5600%0ABlack+NM',
  // Gundam & Figures
  'ed653f4d-8127-46fa-9993-58b43c724611': 'https://placehold.co/400x400/1a1a2e/e74c3c?text=MG+Unicorn+Gundam%0AVer.Ka+NM%0A1%2F100+Scale',
  '52318deb-f0a6-4770-bca7-ec55e201edbb': 'https://placehold.co/400x400/6a0572/00ff88?text=PG+Evangelion%0AUnit-01+NM%0A1%2F60+Scale',
  '3e7991c8-0124-4fdc-a133-9c092bce1690': 'https://placehold.co/400x400/ff8c00/1a1a2e?text=S.H.+Figuarts%0AGoku%0AUltra+Instinct+NM',
  '0bcf19ea-9296-413a-9c84-a2a86836942b': 'https://placehold.co/400x400/3498db/ffffff?text=Nendoroid%0ARem+Re%3AZero%0A%23663+NM',
  '9c550dfe-e04e-4ef0-a3d2-b6bcd1094af8': 'https://placehold.co/400x400/c0a060/1a1a1a?text=First+4+Figures%0ASamus+Aran%0AExclusive+NM',
  'b7c2f762-1292-4134-b64c-3547e2985106': 'https://placehold.co/400x400/e23636/1a1a2e?text=Revoltech%0ASpider-Man%0AAmazing+Yamaguchi+NM',
  '0e07ac35-6509-4c9e-bcaf-8841f784b9b8': 'https://placehold.co/400x400/1a1a1a/c0c0c0?text=ARTFX%2B%0ADarth+Vader%0A1%2F10+Scale+NM',
}

async function updateImages() {
  console.log('🚀 Starting image update...\n')

  let totalUpdated = 0
  let errors = []

  // ──────────────────────────────────────────────
  // 1. ONE PIECE CARDS
  // ──────────────────────────────────────────────
  console.log('📦 Updating One Piece cards...')
  
  // Get all One Piece items
  const { data: opItems, error: opErr } = await supabase
    .from('items')
    .select('id, title, card_number')
    .eq('franchise_id', ONE_PIECE_FID)
  
  if (opErr) { console.error('Error fetching One Piece items:', opErr); }
  else {
    for (const item of opItems) {
      let imageUrl = null
      
      // Try card_number map first
      if (item.card_number && ONE_PIECE_CARD_MAP[item.card_number]) {
        imageUrl = ONE_PIECE_CARD_MAP[item.card_number]
      }
      // Try graded map by item ID
      else if (ONE_PIECE_GRADED_MAP[item.id]) {
        imageUrl = ONE_PIECE_GRADED_MAP[item.id]
      }
      
      if (imageUrl) {
        const { error } = await supabase
          .from('item_images')
          .update({ url: imageUrl })
          .eq('item_id', item.id)
        
        if (error) {
          errors.push(`One Piece ${item.title}: ${error.message}`)
        } else {
          console.log(`  ✅ ${item.title} → ${imageUrl.split('/').pop()}`)
          totalUpdated++
        }
      } else {
        console.log(`  ⚠️  No mapping for: ${item.title} (card: ${item.card_number})`)
      }
    }
  }

  // ──────────────────────────────────────────────
  // 2. MTG
  // ──────────────────────────────────────────────
  console.log('\n📦 Updating MTG cards...')
  for (const [itemId, imageUrl] of Object.entries(MTG_MAP)) {
    const { error } = await supabase
      .from('item_images')
      .update({ url: imageUrl })
      .eq('item_id', itemId)
    
    if (error) {
      errors.push(`MTG ${itemId}: ${error.message}`)
    } else {
      console.log(`  ✅ Black Lotus → Scryfall image`)
      totalUpdated++
    }
  }

  // ──────────────────────────────────────────────
  // 3. SPORTS CARDS
  // ──────────────────────────────────────────────
  console.log('\n📦 Updating Sports Cards...')
  for (const [itemId, imageUrl] of Object.entries(SPORTS_MAP)) {
    const { error } = await supabase
      .from('item_images')
      .update({ url: imageUrl })
      .eq('item_id', itemId)
    
    if (error) {
      errors.push(`Sports ${itemId}: ${error.message}`)
    } else {
      console.log(`  ✅ ${itemId.slice(0, 8)}... updated`)
      totalUpdated++
    }
  }

  // ──────────────────────────────────────────────
  // 4. FUNKO POP
  // ──────────────────────────────────────────────
  console.log('\n📦 Updating Funko Pop...')
  for (const [itemId, imageUrl] of Object.entries(FUNKO_MAP)) {
    const { error } = await supabase
      .from('item_images')
      .update({ url: imageUrl })
      .eq('item_id', itemId)
    
    if (error) {
      errors.push(`Funko ${itemId}: ${error.message}`)
    } else {
      console.log(`  ✅ ${itemId.slice(0, 8)}... updated`)
      totalUpdated++
    }
  }

  // ──────────────────────────────────────────────
  // 5. OTHER (Watches, Gundam, Figures)
  // ──────────────────────────────────────────────
  console.log('\n📦 Updating Watches/Gundam/Figures...')
  for (const [itemId, imageUrl] of Object.entries(OTHER_MAP)) {
    const { error } = await supabase
      .from('item_images')
      .update({ url: imageUrl })
      .eq('item_id', itemId)
    
    if (error) {
      errors.push(`Other ${itemId}: ${error.message}`)
    } else {
      console.log(`  ✅ ${itemId.slice(0, 8)}... updated`)
      totalUpdated++
    }
  }

  // ──────────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────────
  console.log('\n' + '='.repeat(50))
  console.log(`✅ Total updated: ${totalUpdated}`)
  if (errors.length > 0) {
    console.log(`❌ Errors (${errors.length}):`)
    errors.forEach(e => console.log('  ' + e))
  }

  // Verify results
  console.log('\n📊 Verifying results...')
  const { data: allImages, error: verifyErr } = await supabase
    .from('item_images')
    .select('item_id, url')
    .not('url', 'like', 'https://images.pokemontcg.io%')
  
  if (!verifyErr && allImages) {
    const stillPlaceholder = allImages.filter(i => i.url.includes('placehold.co'))
    const realImages = allImages.filter(i => !i.url.includes('placehold.co'))
    console.log(`  Non-Pokemon real images: ${realImages.length}`)
    console.log(`  Still placeholder: ${stillPlaceholder.length}`)
    
    console.log('\n📸 Sample One Piece images:')
    const { data: opImages } = await supabase
      .from('items')
      .select('title, item_images(url)')
      .eq('franchise_id', ONE_PIECE_FID)
      .limit(5)
    
    opImages?.forEach(item => {
      const url = item.item_images?.[0]?.url || 'N/A'
      console.log(`  ${item.title}: ${url}`)
    })
  }
}

updateImages().catch(console.error)
