Design a rich, editorial-style informational page called **"The e-Reader"** for the Nintendo e-Reader Archive web platform. This page explains the hardware, how it technically works with the Game Boy Advance and GameCube, and tells the full story of the device through an interactive visual timeline. It should feel like a beautifully designed museum exhibit — authoritative, warm, and deeply detailed. Think longform editorial design meets Nintendo product retrospective.

---

## Brand & Visual Identity

**Color Palette:**
- Rust `#E35336` — section accents, timeline nodes, pull quotes
- Cream `#F5F5DC` — primary background
- Sand `#F4A460` — secondary sections, highlight bands
- Sienna `#A0522D` — headings, body text, borders

**Mood:** Warm archival editorial. Like a well-designed coffee table book about a forgotten piece of Nintendo history. Generous whitespace, large typography moments, full-bleed image sections, and precise technical diagrams balanced with human storytelling.

**Typography:**
- Display / Hero: Very large slab serif (Zilla Slab or Bitter, bold) — used for the hero headline and section titles
- Body: Comfortable readable sans-serif (Inter or DM Sans, 16–18px, generous line height 1.7)
- Technical labels: Monospace — for dot code specs, memory sizes, card dimensions
- Pull quotes: Large italic serif, rust colored

---

## Page Structure — Top to Bottom

---

### Section 1 — Hero

Full-width hero section, cream background.

**Left half:**
- Eyebrow label: "Hardware" in uppercase rust, 12px, letter-spaced
- Giant display headline across two lines:
  ```
  The Nintendo
  e-Reader
  ```
  Slab serif, ~72px, sienna. Very bold.
- Subheadline below: "The Game Boy Advance peripheral that turned paper cards into playable content — and changed how Nintendo thought about downloadable content forever."
- Two metadata pills below the subhead:
  - "Released: 2001 – 2008"
  - "Regions: JP · US · AU"
- A subtle dotted grid texture behind the text (referencing actual dot code technology)

**Right half:**
- Large product photo of the e-Reader hardware (placeholder: a warm-toned silhouette illustration of the e-Reader plugged into a GBA, side view)
- Below the main image: three small thumbnail images in a row — the original JP Card-e Reader, the US e-Reader, the Card-e Reader+ — each labeled with name and release year

---

### Section 2 — What Is the e-Reader?

Two-column text section, cream background.

**Left column (body copy):**
"The Nintendo e-Reader is a Game Boy Advance accessory developed jointly by HAL Laboratory, Creatures Inc., and Olympus Corporation. It plugs directly into the GBA cartridge slot and contains an LED optical scanner capable of reading specially printed paper cards called e-Reader cards — or e-Cards.

Unlike conventional game cartridges, e-Reader cards store actual executable data encoded as a proprietary dot code format developed by Olympus. When a card is swiped through the e-Reader's scanner slot, the device reads and temporarily stores the data in its onboard 8 MB flash memory. This data can then be used to run standalone minigames directly on the GBA, or — using a Game Link Cable — transfer content to a connected GBA game cartridge or a Nintendo GameCube game."

**Right column:**
A clean technical spec card (card component, cream background, sienna border):

```
Hardware Specifications
────────────────────────────
Developer     HAL Laboratory + Olympus
Released      December 1, 2001 (JP)
              September 16, 2002 (US)
              October 31, 2003 (AU)
Flash Memory  8 MB
Mask ROM      64 MB
Dot Code      Olympus Dot Code Technology
Card Data     1.4 KB (short strip)
              2.2 KB (long strip)
NES Storage   9–10 cards per full NES game
Interface     GBA cartridge slot
Link          GBA Link Cable passthrough
```

---

### Section 3 — How Dot Code Technology Works

Full-width sand-background section. This is the technical deep-dive.

**Section label:** "Dot Code Technology" in uppercase rust

**Large section title:** "How a paper card becomes a playable game"

**Three-column layout:**

**Column 1 — The Card**
Illustration placeholder: a close-up diagram of an e-Reader card showing the dot code strip(s) on the edges and back. Annotated with labels:
- "Long strip (side) — 2.2 KB"
- "Short strip (bottom) — 1.4 KB"
- "Cards can have strips on both sides for more data"
- "Card dimensions: 2.5 × 3.5 inches"
- "9–10 cards required to store one full NES game"

Body text below:
"Each e-Reader card carries its data in Olympus's proprietary Dot Code format — a specialized barcode-like grid of microscopic dots printed on the card edge. Unlike a standard barcode which encodes only a reference number, Dot Code stores actual compressed and encrypted executable data. A single long strip holds 2.2 KB; a short strip holds 1.4 KB. Cards can use both sides, effectively doubling capacity."

**Column 2 — The Scanner**
Illustration placeholder: a cross-section diagram of the e-Reader's LED scanner slot — showing the card being swiped, the LED light source, the optical sensor, and the data path to flash memory. Annotated:
- "LED light source"
- "Optical sensor array"
- "8 MB onboard flash storage"
- "Card swiped right-to-left"

Body text below:
"Swiping a card through the e-Reader's scanner slot passes the dot code strip across an LED optical sensor. The sensor reads the dot pattern at high speed and decodes it into binary data, which is then written to the e-Reader's 8 MB flash memory. The process takes roughly one to two seconds per swipe. Multi-card data — like a full NES game requiring 10 cards — must be scanned sequentially, with each card adding to the stored data until the full program is assembled."

**Column 3 — The Transfer**
Illustration placeholder: diagram showing two GBA units connected by a Link Cable — one with e-Reader, one with a game cartridge — with an arrow showing data flowing from the e-Reader GBA to the game GBA.

Body text below:
"Once data is stored in flash memory, it can be used in three ways: run standalone on the e-Reader itself, transferred via Game Link Cable to a second GBA running a compatible game cartridge, or sent via GBA–GameCube Cable to a compatible GameCube game. The Link Cable transfer uses the GBA's standard serial communication protocol. The e-Reader's passthrough connector preserves the link port on the original GBA model, allowing the cable to connect normally."

---

### Section 4 — GBA Connectivity

Full-width cream section with a large annotated diagram.

**Section label:** "GBA Integration" in uppercase rust

**Large title:** "Two Game Boy Advances, one link cable"

**Full-width connection diagram (illustration placeholder):**
A clean technical schematic showing:
- GBA Unit 1 (left): e-Reader plugged in, card being swiped. Label: "Player 1 — e-Reader GBA"
- Link Cable connecting the two units in the center
- GBA Unit 2 (right): Game cartridge inserted (Pokémon Ruby illustrated). Label: "Player 2 — Game GBA"
- Arrows showing: Card data → flash memory → link cable → game cartridge save data
- A callout bubble: "Gray end of Link Cable = e-Reader GBA (P1). Purple end = Game GBA (P2)"

**Below the diagram — two-column text:**

**Left:**
"To transfer e-Card data to a game like Super Mario Advance 4 or Pokémon Ruby, two Game Boy Advance systems and a Game Link Cable are required. The e-Reader GBA connects via the Player 1 (gray) end of the Link Cable; the game GBA uses the Player 2 (purple) end.

After navigating to the e-Reader menu within the compatible game on the second GBA, cards can be swiped one at a time on the first GBA. Data transfers instantly after each scan. For level cards in Super Mario Advance 4, the new level data is written directly to the game cartridge's save file — permanently adding it to the game even after the e-Reader is disconnected."

**Right:**
Pull quote in large rust italic serif:
*"Level card data was written directly to the game save — the content became a permanent part of the cartridge."*

Below the pull quote — a compatibility note box (sand background, sienna border):
"⚠ Nintendo DS Incompatible: The DS and DS Lite lack Game Link Cable support, making GBA-to-GBA e-Reader transfers impossible on those systems. The e-Reader can fit into a DS Lite but cannot transfer data."

---

### Section 5 — GameCube Connectivity

Full-width sand-background section.

**Section label:** "GameCube Integration" in uppercase rust

**Large title:** "From a paper card to your GameCube village"

**Full-width connection diagram (illustration placeholder):**
A clean schematic showing:
- GBA with e-Reader (left side) connected via GBA–GameCube Link Cable to a GameCube (right side)
- GameCube connected to a TV showing Animal Crossing
- Labels: "GBA–GameCube Cable", "Game Boy Player (alternative path)", data flow arrows
- A note: "The GameCube running the game acts as the host — the GBA with e-Reader is the peripheral"
- Second path shown below: Game Boy Player connected to GameCube underside, e-Reader plugged into it

**Three feature cards below (cream cards on sand background):**

Card 1 — Animal Crossing
"The deepest e-Reader integration on GameCube. Scan Character Cards at the Post Office to receive items, Town Tune Cards at the tune board to set your village song, Design Cards at Able Sisters for custom clothing patterns, and Classic Game Cards to receive NES items (Ice Climber, Mario Bros.) for your house."

Card 2 — Pokémon Channel
"Three promotional cards bundled with the game — The Pikachu Star, The Kyogre Constellation (US) / Jirachi (AU), and Poké A la Card. Scanning unlocks Smeargle paint line art within the game."

Card 3 — Pikmin 2 (JP only)
"Six packs of Pikmin Puzzle Cards released exclusively in Japan. Requires a Japanese GameCube, Japanese e-Reader+, and Japanese copy of Pikmin 2. Minigames challenge players to guide Pikmin under specific conditions."

---

### Section 6 — Hardware Versions

Cream background. Three-column card layout showing each hardware version side by side.

**Section label:** "Hardware Versions" in uppercase rust
**Section title:** "Three releases, two generations"

**Card 1 — Card-e Reader (JP