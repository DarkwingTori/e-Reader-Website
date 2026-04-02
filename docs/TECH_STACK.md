# TECH_STACK.md

## Stack Overview

| Layer | Technology |
|---|---|
| Frontend | Vite + React + TypeScript |
| Styling | CSS Modules + CSS custom properties (theming) |
| Design Tokens | Tokens Studio (Figma) → Style Dictionary → CSS/TS |
| Backend | Supabase (Postgres + Auth + Storage) |
| Server Functions | Supabase Edge Functions (Deno + TypeScript) |
| Card Build Pipeline | Python 3 + RGBDS + NEDC (server-side) |
| Hosting | Vercel (frontend) + Supabase (backend) |

---

## Frontend

### Vite + React + TypeScript
- Use Vite for fast dev server and optimized builds
- React for component-based UI
- TypeScript strict mode enabled — no `any`, explicit types everywhere

### Path Aliases
Configured in both `vite.config.ts` and `tsconfig.json`:
```ts
"@/*" → "src/*"
"@components/*" → "src/components/*"
"@features/*" → "src/features/*"
"@lib/*" → "src/lib/*"
"@tokens/*" → "src/tokens/*"
"@types/*" → "src/types/*"
```

### CSS Modules + Custom Properties
- Each component has a co-located `.module.css` file
- Global CSS custom properties handle theming — defined in `src/styles/globals.css`
- Per-series theming applied via `data-series` attribute on wrapper elements:
```css
[data-series="animal-crossing"] {
  --series-primary: var(--color-ac-green);
  --series-accent: var(--color-ac-tan);
  --series-font: var(--font-ac);
}
```

---

## Figma → VSCode Workflow

### Tools
- **Figma for VS Code** (official extension) — inspect designs, copy CSS, export assets from inside VSCode
- **Tokens Studio** (Figma plugin) — manage design tokens as variables in Figma, export as `tokens.json`
- **Style Dictionary** — transforms `tokens.json` into usable CSS variables and TypeScript constants

### Workflow Steps
1. Define colors, spacing, typography in Figma as Variables
2. Use Tokens Studio to organize and export → `src/tokens/tokens.json`
3. Run `npm run tokens:build` → Style Dictionary compiles to `src/tokens/generated/`
4. Import generated tokens in components — never hardcode design values

### Token Build Script
```json
// package.json
"scripts": {
  "tokens:build": "style-dictionary build --config sd.config.js"
}
```

---

## Backend — Supabase

### Services Used
- **Postgres** — card database, user collections, generated card records
- **Auth** — user accounts for collection tracker and card builder
- **Storage** — card images, dot code images, promotional media, generated files
- **Edge Functions** — server-side card generation pipeline (Deno runtime)

### Type Generation
After any schema change, regenerate types:
```bash
npm run types:supabase
# runs: supabase gen types typescript --local > src/types/supabase.ts
```

### Row Level Security
RLS must be enabled on every table. Default policies:
- `cards`, `series` — public read, no public write
- `collections` — authenticated users read/write their own rows only
- `generated_cards` — authenticated users read/write their own rows only

---

## Card Build Pipeline

Runs server-side inside a Supabase Edge Function. Never runs client-side.

### Dependencies (installed in Edge Function environment)
- **RGBDS v0.6.0 / v0.9.1** — GBA assembly (`rgbasm`, `rgblink`)
- **NEDC v1.4** — e-Reader card tools (`nevpk`, `nedcmake`, `raw2bmp`)
- **Python 3** — processing scripts from the pokecarde toolchain

See `docs/REPLICATION_PIPELINE.md` for full pipeline documentation.

---

## Package Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .ts,.tsx",
  "tokens:build": "style-dictionary build --config sd.config.js",
  "types:supabase": "supabase gen types typescript --local > src/types/supabase.ts"
}
```