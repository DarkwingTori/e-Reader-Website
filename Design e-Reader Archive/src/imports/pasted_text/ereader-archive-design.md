Design a retro-modern web platform called **e-Reader Archive** — a definitive fan database and card replication tool for the Nintendo e-Reader (Game Boy Advance accessory, 2001–2008). The aesthetic blends warm earthy tones from the original GBA hardware era with clean modern web UI patterns. Think vintage Nintendo product packaging meets a well-designed modern collection app.

---

## Brand & Visual Identity

**Color Palette:**
- Rust `#E35336` — primary accent, CTAs, active states
- Cream `#F5F5DC` — main background surface
- Sand `#F4A460` — secondary accent, card hover states, highlights
- Sienna `#A0522D` — headings, borders, text on light backgrounds

**Mood:** Warm, nostalgic, collector-focused. Like a well-curated museum exhibit for a forgotten piece of Nintendo history. Not childish — serious and archival but still approachable.

**Typography:**
- Headings: A bold serif or slab serif that feels era-appropriate (something like Playfair Display, Zilla Slab, or Bitter)
- Body / UI: Clean modern sans-serif (Inter or DM Sans)
- Monospace accents for card numbers, dot code labels, technical data

**Texture & Detail:**
- Subtle dot pattern or grid texture in background sections referencing the dot code technology
- Card components have a slight border and shadow to feel like physical cards lifted off the surface
- Binder page texture on the collection view — feels like a real card binder page

---

## Pages to Design

### 1. Homepage / Hero
- Full-width hero section with the platform name and a tagline like "The complete Nintendo e-Reader card archive"
- Hero background: a stylized arrangement of e-Reader card artwork (use placeholder card art in rust/sand tones)
- Prominent search bar in the hero — "Search cards, series, games..."
- Below the hero: three feature callout cards — Database, Collection Tracker, Card Builder
- Featured series section — horizontal scroll of series tiles (Animal Crossing-e, Pokémon Battle-e, NES Classics, etc.)
- Each series tile uses its own accent color and typography

### 2. Card Database — Grid View
- Top filter bar: dropdowns for Game, Region (US / JP / AU), Card Type, Rarity + a search input
- Toggle in the top right: Grid View / Binder View icons
- Card grid: 4 columns on desktop, each card component shows:
  - Card front image (placeholder)
  - Card name
  - Series name + card number (monospace)
  - Region badge (US / JP / AU) — color coded
  - Rarity indicator (small dot or pill — common through ultra rare)
- Cards have a hover state that lifts them slightly and shows a quick-view overlay with unlock description

### 3. Card Database — Binder View
- Same filter bar as grid view
- Layout mimics a physical card binder:
  - Dark faux-leather or textured binder background
  - Two binder pages side by side (left page + right page)
  - Each page has 9 card sleeves in a 3x3 grid
  - Card sleeves are slightly transparent with a glare effect
  - Cards sit inside the sleeves — empty sleeves show a faint placeholder
  - Binder ring detail in the center spine between the two pages
  - Page navigation arrows at the bottom

### 4. Single Card Detail Page
- Large card image left (front, with a flip interaction showing the back + dot code strip)
- Right side: card metadata
  - Card name (large heading)
  - Series, card number, region, card type badges
  - Rarity tier with visual indicator
  - Associated game
  - What it unlocks (description block)
  - Region lock status
- Dot code strip shown below the card image with a label explaining it
- "Add to Collection" button (Owned / Wanted / Trade options)
- Related cards from the same series shown at the bottom

### 5. Card Builder — Trainer Card
- Left panel: form inputs
  - Trainer Class dropdown
  - Trainer Name text input
  - Pokémon team slots (up to 6) — each slot has species, level, moves, held item
  - Prize Money input
  - Intro Text textarea
  - Region selector (EN / JP)
- Right panel: live card preview mockup updating as the user fills in the form
- Bottom: three output buttons — Download .raw, Download Printable .bmp, Download PDF
- Progress indicator showing the build pipeline stages when generating

### 6. Series Landing Page
- Hero banner using promotional art for the series (placeholder)
- Series name, game, region, release date, total cards
- Full card grid for this series — same grid component as the database page
- Series-specific color scheme applied — Animal Crossing-e gets soft greens, Pokémon Battle-e gets bold reds/yellows
- "Missing from your collection" section if user is logged in

### 7. Collection Tracker
- User's completion stats at the top — overall percentage + per-series breakdown
- Series grid showing completion rings (like Apple Activity rings) per series
- Below: full list of the user's collection with status tabs — Owned / Wanted / Trade
- Export button (PDF / CSV)

---

## Component Patterns

**Card Component (grid view):**
Rounded corners (8px), 1px border in sienna at 30% opacity, cream background, card image top half, metadata bottom half with subtle divider line. Hover: slight scale up (1.03) with sand border color.

**Binder Sleeve:**
Slightly transparent dark sleeve with a plastic sheen. Card sits inside with 4px padding all sides. Empty sleeve shows a faint "?" or series logo watermark.

**Series Tile:**
Wide banner tile with series name, game title, region badge, and total card count. Background uses the series accent color. Hover lifts with a sand underline accent.

**Rarity Badge:**
- Common: gray pill
- Uncommon: sand/amber pill  
- Rare: rust pill
- Ultra Rare: sienna pill with a subtle star icon

**Region Badge:**
- US: blue
- JP: red
- AU: green

**Navigation:**
Sticky top nav — platform logo left, main nav links center (Database, Collection, Builder, Timeline), user avatar / login right. Clean and minimal, cream background, sienna bottom border.