# REPLICATION_PIPELINE.md

## Overview

The e-card replication feature generates functional Nintendo e-Reader dot code cards server-side, based on the open-source `pokecarde` toolchain. All pipeline logic runs inside a Supabase Edge Function — never on the client.

**Base repo:** https://github.com/Artrios/pokecarde
**Dev tools reference:** https://www.caitsith2.com/ereader/devtools.htm
**Build from source:** https://www.pokecommunity.com/showthread.php?t=455241

---

## Supported Card Types

| Type | File Pattern | Build Target |
|---|---|---|
| Trainer Battle Cards | `card-08-[A\|B][01-48]-EN-01.raw` | `series_1_en`, `series_2_en` |
| Promo Cards | `card-08-[N\|P][01-08]-EN-01.raw` | `n_promos_en`, `p_promos_en` |
| Berry Cards | `card-08-K[01-12]-EN-01.raw` | `berries` |
| Gift Pokémon | `00-G000-EN-01.raw` | `all` |
| Event Cards | `00-C000-EN-01.raw` | `all` |

---

## Toolchain Dependencies

These must be installed in the Edge Function's Docker environment:

| Tool | Version | Purpose |
|---|---|---|
| RGBDS | v0.6.0 / v0.9.1 | GBA assembly — `rgbasm`, `rgblink` |
| NEDC | v1.4 / v1.4.1 | e-Reader card tools — `nevpk`, `nedcmake`, `raw2bmp` |
| Python | 3.x | Processing scripts |

---

## Processing Scripts (from pokecarde)

| Script | Input | Output | Purpose |
|---|---|---|---|
| `regionalize.py` | `.asm` files | `.tx` files | Text localization and region coding |
| `ereadertext.py` | `.asm` files | `.tx` files | e-Reader text formatting |
| `stripgbc.py` | `.gbc` files | `.bin` / `.z80` files | Game Boy header removal |
| `checksum.py` | `.bin` files | `.mev` files | Data integrity validation |
| `gen3text.py` | Text strings | Binary data | Pokémon Gen 3 character encoding |

---

## Build Pipeline

```
User Input (card builder form)
  ↓
Edge Function receives request + validates input
  ↓
Select assembly template (battle-e / giftpokemon / eonticket / ribbons / decoration)
  ↓
Inject parameters into .asm template
  (trainer name via gen3text.py, Pokémon data, move IDs, etc.)
  ↓
rgbasm — compile .asm → .o object file
  ↓
rgblink — link .o → .gbc
  ↓
stripgbc.py — remove GB header → .bin / .z80
  ↓
checksum.py — validate integrity → .mev
  ↓
nevpk / nedcmake — package into e-Reader card format → .raw
  ↓
raw2bmp — generate printable dot code image → .bmp
  ↓
Upload .raw + .bmp to Supabase Storage (/generated/)
  ↓
Update generated_cards table (build_status: 'success')
  ↓
Return signed URLs to client
```

---

## Validation

MD5 checksums are verified at each build stage against reference files:
- `battle-e.md5`
- `eonticket.md5`
- `giftpokemon.md5`
- `ribbons.md5`
- `decoration.md5`

If any checksum fails, the build halts and `generated_cards.build_status` is set to `'failed'` with an error message.

---

## Output Files

| Format | Use |
|---|---|
| `.raw` | Load in mGBA link mode with e-Reader ROM |
| `.bmp` | Print via Firefly Dot Code Print tool |
| `.pdf` | Print-ready export with crop marks and 3.5" alignment guide |

### Printing
- Card dimensions and bleed specs per the printing guide: https://docs.google.com/document/d/10RraYTTzzivAPC-yVt82ENmBjryv4VX8Rw-eoNLW44k/edit
- Align dot code strip to the 3.5" marker
- Print via Firefly Dot Code Print (referenced in dev tools)

### Save Injection
- Gift Pokémon and Event cards are compatible with the Mystery Event 3 tool
- Inject using the `INJECT ME3` option
- Tool: https://digiex.net/threads/pokemon-gen-3-mystery-gift-tool-download-inject-nintendo-events-wondercards-more.14863/

---

## Edge Function Location

```
supabase/functions/generate-card/index.ts
```

### Request shape
```ts
{
  cardType: 'trainer' | 'gift_pokemon' | 'event' | 'berry',
  parameters: {
    // trainer
    trainerClass?: string,
    trainerName?: string,
    team?: PokemonSlot[],
    prizeMoney?: number,
    introText?: string,
    region?: 'EN' | 'JP',

    // gift pokemon
    species?: number,
    level?: number,
    moves?: number[],
    otName?: string,
    ribbon?: string,

    // event
    eventText?: string,
    targetVersion?: 'ruby' | 'sapphire'
  }
}
```

### Response shape
```ts
{
  id: string,            // generated_cards.id
  rawUrl: string,        // signed URL, expires 1hr
  bmpUrl: string,        // signed URL, expires 1hr
  pdfUrl: string         // signed URL, expires 1hr
}
```