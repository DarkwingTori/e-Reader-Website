# DATABASE_SCHEMA.md

## Supabase Postgres Schema

### `series`
Represents a card set release.
```sql
create table series (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,        -- e.g. "animal-crossing-e-series-1"
  name         text not null,
  game         text not null,
  region       text not null,               -- 'US' | 'JP' | 'AU'
  release_date date,
  total_cards  integer,
  is_complete  boolean default false,       -- is the full set documented?
  notes        text,
  created_at   timestamptz default now()
);
```

### `cards`
Every individual e-Reader card.
```sql
create table cards (
  id                  uuid primary key default gen_random_uuid(),
  series_id           uuid references series(id),
  card_number         text not null,         -- e.g. "A01", "K03", "N01"
  name                text not null,
  card_type           text not null,         -- 'trainer' | 'nes_classic' | 'level' | 'gift' | 'promo' | 'event' | 'berry' | 'design' | 'character'
  region              text not null,         -- 'US' | 'JP' | 'AU'
  region_locked       boolean default false,
  associated_game     text,
  unlocks_description text,
  rarity              text not null,         -- 'common' | 'uncommon' | 'rare' | 'ultra_rare'
  front_image_url     text,                  -- Supabase Storage path
  back_image_url      text,
  dotcode_image_url   text,
  notes               text,
  created_at          timestamptz default now()
);
```

### `users`
Extended user profile (supplements Supabase auth.users).
```sql
create table users (
  id           uuid primary key references auth.users(id),
  username     text unique not null,
  avatar_url   text,
  is_public    boolean default false,
  created_at   timestamptz default now()
);
```

### `collections`
User card collection tracking.
```sql
create table collections (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references users(id) on delete cascade,
  card_id    uuid references cards(id) on delete cascade,
  status     text not null,               -- 'owned' | 'wanted' | 'trade'
  added_at   timestamptz default now(),
  unique(user_id, card_id)
);
```

### `generated_cards`
Records of user-generated e-cards from the replication tool.
```sql
create table generated_cards (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references users(id) on delete cascade,
  card_type        text not null,         -- 'trainer' | 'gift_pokemon' | 'event' | 'berry'
  parameters       jsonb not null,        -- full input config used to generate the card
  raw_file_url     text,                  -- Supabase Storage path
  bmp_file_url     text,
  pdf_file_url     text,
  build_status     text default 'pending', -- 'pending' | 'success' | 'failed'
  error_message    text,
  created_at       timestamptz default now()
);
```

---

## Row Level Security Policies

### `cards` and `series` — public read
```sql
create policy "Public read access"
  on cards for select using (true);

create policy "Public read access"
  on series for select using (true);
```

### `collections` — owner only
```sql
create policy "Users manage own collection"
  on collections for all
  using (auth.uid() = user_id);
```

### `generated_cards` — owner only
```sql
create policy "Users manage own generated cards"
  on generated_cards for all
  using (auth.uid() = user_id);
```

---

## Supabase Storage Structure

```
Bucket: ereader-assets (public)
├── cards/
│   ├── front/        → [series-slug]-[card-number].webp
│   ├── back/         → [series-slug]-[card-number]-back.webp
│   └── dotcode/      → [series-slug]-[card-number]-dotcode.webp
├── media/
│   ├── promo-photos/ → promotional photography
│   ├── promo-videos/ → promotional video assets
│   └── art/          → official and fan art

Bucket: generated-cards (private, authenticated)
├── raw/              → [user-id]/[generated-card-id].raw
├── bmp/              → [user-id]/[generated-card-id].bmp
└── pdf/              → [user-id]/[generated-card-id].pdf
```

---

## Indexes

```sql
create index on cards(series_id);
create index on cards(card_type);
create index on cards(region);
create index on cards(rarity);
create index on collections(user_id);
create index on generated_cards(user_id);
```