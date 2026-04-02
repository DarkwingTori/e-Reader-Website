# DESIGN_SYSTEM.md

## Core Palette

These are the global brand colors for the platform.

| Name | Hex | CSS Variable | Usage |
|---|---|---|---|
| Rust | `#E35336` | `--color-rust` | Primary accent, CTAs |
| Cream | `#F5F5DC` | `--color-cream` | Background surfaces |
| Sand | `#F4A460` | `--color-sand` | Secondary accent, highlights |
| Sienna | `#A0522D` | `--color-sienna` | Text on light, borders |

---

## Typography

- Body font: TBD in Figma — import via Tokens Studio
- All font decisions originate in Figma — do not introduce new fonts in code
- Per-series fonts are scoped via `data-series` CSS custom properties

---

## Per-Series Theming

Each card series has its own color scheme and typography applied via a `data-series` attribute on the nearest wrapper element. The token sets are defined in Figma, exported via Tokens Studio, and compiled by Style Dictionary.

### How to apply a series theme
```tsx
<div data-series="animal-crossing">
  <CardGrid /> // inherits series CSS variables
</div>
```

### Series theme structure
Each series defines these CSS variables at minimum:
```css
[data-series="<id>"] {
  --series-primary: ;
  --series-secondary: ;
  --series-accent: ;
  --series-background: ;
  --series-text: ;
  --series-font: ;
  --series-font-heading: ;
}
```

### Known series IDs
| Series ID | Name |
|---|---|
| `animal-crossing` | Animal Crossing-e |
| `pokemon-battle` | Pokémon Battle-e |
| `nes-classics` | NES Classic Game series |
| `super-mario` | Super Mario Advance 4 |
| `mario-party` | Mario Party-e |
| `promo` | Promotional cards |

---

## Component Patterns

### Card Binder View
- Mimics a physical card binder — rows of card sleeves, sortable by series/number
- Skeuomorphic detail: binder ring texture, page dividers per series
- On mobile: single column. On desktop: 3–4 cards per row
- Switching between grid and binder view is a UI toggle, no page reload

### Card Grid View
- Standard masonry or fixed-grid layout
- Card art is the focus — minimal UI chrome
- Hover state reveals card details overlay

### Series Landing Page
- Hero section uses promotional photos/art from Supabase Storage
- Full series color scheme and typography applied via `data-series`
- Lists all cards in the series with filter/sort controls

---

## Assets and Media

All assets are stored in Supabase Storage. See `docs/DATABASE_SCHEMA.md` for bucket structure.

### Asset naming conventions
```
cards/front/[series-id]-[card-number].webp
cards/back/[series-id]-[card-number]-back.webp
cards/dotcode/[series-id]-[card-number]-dotcode.webp
media/promo-photos/[series-id]-[descriptor].webp
media/art/[series-id]-[descriptor].webp
```

### Format
- All card and media images: `.webp` (convert on upload)
- Dot code images: `.bmp` source, `.webp` for display
- Generated files: `.raw`, `.bmp`, `.pdf` (original formats preserved)