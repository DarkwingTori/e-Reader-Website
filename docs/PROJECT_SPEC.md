# PROJECT_SPEC.md — Nintendo e-Reader Platform

## Vision

A fullstack web platform serving as the definitive modern resource for Nintendo e-Reader cards. Combines a complete card database, user collection tracker, and an interactive e-card replication tool that generates functional dot code cards using the open-source Pokémon Card-e toolchain.

---

## Features

### Card Database
- Fully searchable and filterable database of every e-Reader card ever released
- Two view modes: card grid view and binder list view
- Per-series color scheme and typography theming
- Filter by: game, region (US/JP/AU), card type, series, rarity
- Each card entry includes:
  - Card number and series
  - Associated game
  - Card type (Trainer, NES Classic, Level, Gift, Promo, Event, Berry, etc.)
  - Region (US / JP / AU) and region lock status
  - What it unlocks in-game
  - Rarity tier
  - Card image (front + back)
  - Dot code strip image

### Collection Tracker
- User auth via Supabase
- Mark cards as Owned / Wanted / For Trade
- Completion percentage per series
- Rarity-weighted completion score
- Export collection as PDF or CSV
- Public shareable collection page

### Region Comparison View
- Side-by-side US vs JP vs AU release comparison per series
- Highlights Japan-exclusive cards
- Flags planned-but-canceled sets (Game & Watch series, etc.)

### Rarity Index
| Tier | Examples |
|---|---|
| Ultra Rare | Mario vs. DK contest cards (1,000 JP winners), E3 2002 Promo Pack |
| Rare | Walmart-exclusive SMA4 cards, EON Ticket variants |
| Uncommon | Nintendo Power exclusives, Pokémon Channel cards |
| Common | Standard Animal Crossing-e booster packs |

### Dot Code Visualizer
- Interactive explainer of Olympus Dot Code Technology
- Animated scan simulation showing how the LED reader interprets dot patterns

### e-Card Replication Feature
Integrates the pokecarde toolchain server-side to generate functional dot code cards.

**Supported card types:**
| Type | Description |
|---|---|
| Trainer Battle Cards | Battle-e series trainers |
| Promo Cards | Promotional trainer cards |
| Berry Cards | Custom berry delivery |
| Gift Pokémon | Mystery Event Pokémon (ME3 injectable) |
| Event Cards | Special events (Eon Ticket style) |

**Custom Card Builder inputs:**
- Trainer class, name, team (species/level/moves/held item), prize money, intro text
- Gift Pokémon: species, level, moves, OT name, ribbon
- Event card: custom event text, target version (Ruby / Sapphire)

**Output formats:**
- `.raw` — use in mGBA link mode with e-Reader ROM
- `.bmp` — printable dot code via Firefly Dot Code Print
- Save injection file — inject via Mystery Event 3 tool
- In-browser preview mockup

### Media Section
- Promotional photos, videos, and official art for the e-Reader hardware and card sets
- Used in hero sections, series landing pages, and the interactive timeline

### Stretch Features
- Fan Card Generator — cosmetic custom card designer, print-ready PNG download
- Interactive timeline — Dec 2001 JP launch → 2008 JP end of support, with card drops and regional events
- mGBA WebAssembly integration — simulate a card scan entirely in-browser

---

## References
- Base toolchain repo: https://github.com/Artrios/pokecarde
- Dev tools: https://www.caitsith2.com/ereader/devtools.htm
- Build from source: https://www.pokecommunity.com/showthread.php?t=455241
- ME3 tool: https://digiex.net/threads/pokemon-gen-3-mystery-gift-tool-download-inject-nintendo-events-wondercards-more.14863/
- Printing guide: https://docs.google.com/document/d/10RraYTTzzivAPC-yVt82ENmBjryv4VX8Rw-eoNLW44k/edit
- Wikipedia: https://en.wikipedia.org/wiki/Nintendo_e-Reader
- Animal Crossing cards: https://nookipedia.com/wiki/E-Reader_card
- Full application list: https://niwanetwork.org/wiki/List_of_e-Reader_applications