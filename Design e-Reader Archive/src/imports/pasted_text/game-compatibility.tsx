Design a single page called **Game Compatibility** for the Nintendo e-Reader Archive web platform. This page displays every GBA and GameCube game that was compatible with the Nintendo e-Reader, using a visually striking reverse-scrolling column layout to showcase cover art. Clicking any game opens a detailed side panel explaining what the e-Reader does for that game and which card series work with it.

---

## Brand & Visual Identity

**Color Palette:**
- Rust `#E35336` — primary accent, active states, selected game highlight
- Cream `#F5F5DC` — main background
- Sand `#F4A460` — hover states, secondary accents
- Sienna `#A0522D` — headings, borders, text on light

**Mood:** Warm, archival, collector-focused. Feels like flipping through a physical game library. The cover art does the visual heavy lifting — the UI chrome stays minimal and lets the games breathe.

**Typography:**
- Headings: Bold slab serif (Zilla Slab or Bitter) — used for game titles and section labels
- Body / metadata: Clean sans-serif (Inter or DM Sans)
- Monospace: Card series codes, card numbers, technical details

---

## Page Layout

The page is divided into two zones:

**Left zone (60% width):** The reverse-scrolling cover art columns — this is the hero visual of the page.

**Right zone (40% width):** Sticky detail panel — shows game information when a cover is selected, or a default prompt state when nothing is selected.

---

## Left Zone — Reverse Scrolling Cover Art Columns

Four vertical columns of game cover art, each column scrolling in alternating directions on an infinite auto-scroll loop:
- Column 1: scrolls **upward** (slow — ~40s loop)
- Column 2: scrolls **downward** (medium — ~55s loop)
- Column 3: scrolls **upward** (fast — ~30s loop)
- Column 4: scrolls **downward** (slow — ~50s loop)

All columns scroll simultaneously and continuously — no user input required. Scrolling pauses on hover across the entire column zone.

**Cover card component:**
- Fixed size: 160px wide × 210px tall
- Rounded corners: 10px
- Game cover art fills the card (placeholder art in warm rust/sand tones for the mockup)
- A small platform badge in the bottom right corner of each card:
  - **GBA** badge: indigo/purple pill
  - **GCN** badge: purple/violet pill
  - **JP** badge: red pill (Japan exclusive)
- On hover: card lifts slightly with a sand-toned border glow, cursor becomes pointer
- On selected/active: card gets a 2px rust border and a subtle rust overlay tint at 15% opacity

**Columns contain these games (distribute evenly across 4 columns):**

GBA games: Pokémon Ruby, Pokémon Sapphire, Super Mario Advance 4, Mario Party-e, Mario vs. Donkey Kong, Pokémon FireRed (JP), Pokémon LeafGreen (JP), Pokémon Emerald (JP), Pokémon Pinball Ruby & Sapphire (JP), Mega Man Battle Network 4 (JP), Mega Man Battle Network 5 (JP), Mega Man Battle Network 6 (JP), Mega Man Zero 3 (JP), F-Zero Climax (JP), Hamtaro Ham-Ham Heartbreak (JP), Domo-kun no Fushigi Terebi (JP)

NES Classics (standalone on e-Reader): Balloon Fight, Clu Clu Land, Donkey Kong, Donkey Kong Jr., Donkey Kong 3, Excitebike, Golf, Ice Climber, Manhole, Mario Bros., Pinball, Tennis, Urban Champion

GameCube games: Animal Crossing, Pokémon Channel, Doubutsu no Mori+ (JP), Doubutsu no Mori e+ (JP), Pikmin 2 (JP)

---

## Right Zone — Game Detail Panel

### Default state (no game selected)
- Large faint dotted grid pattern in the background (referencing dot code technology)
- Centered text: "Select a game to see e-Reader compatibility details"
- Below that: two small stat pills showing total game count — "26 GBA games" and "5 GameCube games" and "13 NES Classics"
- Small animated arrow pointing left toward the columns

### Selected state (game clicked)
The panel animates in from the right (slide + fade, 200ms).

**Panel anatomy top to bottom:**

1. **Game header**
   - Large cover art image: 120px × 160px, rounded 8px, floated left
   - To the right of the cover:
     - Game title (slab serif, 20px, sienna)
     - Platform badge (GBA / GCN / NES Classic) + Region badge (US / JP / AU / US+AU)
     - Developer and year in muted 12px sans
     - "Japan Exclusive" warning banner in rust if applicable — "⚠ JP e-Reader+ required. Cards and game must be Japanese versions."

2. **Divider line** (1px, sand)

3. **What e-Reader does for this game** section
   - Section label: "e-Reader functionality" in uppercase 11px sienna, letter-spaced
   - Bullet list of what scanning cards does in this game — e.g. for Animal Crossing: "Receive items via post office (Character Cards)", "Set village town tune (Town Tune Cards)", "Add clothing designs at Able Sisters (Design Cards)", "Unlock NES Classic items (Classic Game Cards)"
   - If functionality was removed in Western localization, show a warning block: rust-tinted info box with text like "e-Reader support was removed from the US and EU versions of this game. JP version only."

4. **Divider line** (1px, sand)

5. **Compatible card series** section
   - Section label: "Compatible card series" in uppercase 11px sienna, letter-spaced
   - Each compatible series displayed as a horizontal card/chip row:
     - Series name (e.g. "Pokémon Battle-e Series 1")
     - Card count pill (e.g. "64 cards")
     - Region badge
     - A small "View cards →" link in rust that would navigate to the filtered card database

   Example series chips for Pokémon Ruby:
   - Pokémon Battle-e Series 1 — 64 cards — US
   - Pokémon Battle-e Series 2 — 64 cards — US  
   - Pokémon-e TCG: EX Ruby & Sapphire — 65 dot-code cards — US
   - Berry Program Update — 2 cards — JP only
   - EON Ticket — Promo — US

6. **Divider line** (1px, sand)

7. **Hardware requirements** section
   - Small icon row showing required hardware to use e-Reader with this game:
     - "2× GBA required" (for GBA game linking)
     - "Game Link Cable required"
     - "GBA–GameCube Cable required" (for GCN games)
     - "e-Reader+ required" (for JP e-Reader+ exclusive games)
   - Each shown as a small pill with a relevant icon placeholder

8. **Bottom action row**
   - "View all compatible cards →" button (rust, filled)
   - "Add game to watchlist" button (outlined, sienna)

---

## Page Header

Above the two-zone layout, a slim full-width header bar:
- Left: breadcrumb — "e-Reader Archive / Game Compatibility"
- Center: page title "Game Compatibility" in slab serif
- Right: two toggle buttons — "All" / "GBA" / "GameCube" / "NES Classics" — filters which games appear in the columns
- Below the title: subtitle text — "Every game that supported the Nintendo e-Reader (2001–2008)"

---

## Responsive Notes

On tablet (≤1024px): columns reduce to 3, detail panel becomes a bottom drawer that slides up on card select.
On mobile (≤768px): columns reduce to 2, detail panel is a full-screen modal overlay.

---

## Motion & Interaction Details

- Column scroll is CSS-driven infinite animation — smooth, no jank
- Hovering anywhere in the column zone pauses all scroll animations
- Clicking a cover: brief scale-down (0.97) tap feedback, then panel slides in
- Panel transition: 200ms ease-out slide from right + opacity 0→1
- Series chips in the panel have a hover state — sand background fill
- "View cards →" links have an underline slide animation on hover