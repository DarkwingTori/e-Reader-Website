import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import type { EReaderCard, CardRarity, Region, CardStatus, Series } from '../app/data/mockData';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export type CardRow = Database['public']['Tables']['cards']['Row'];
export type SeriesRow = Database['public']['Tables']['series']['Row'];
export type CollectionStatus = Database['public']['Tables']['collections']['Row']['status'];

export function toEReaderCard(row: CardRow): EReaderCard {
  return {
    id: row.id,
    name: row.name,
    series: row.series_name,
    seriesId: row.series_id,
    cardNumber: row.card_number,
    region: row.region as Region,
    rarity: row.rarity as CardRarity,
    cardType: row.card_type,
    game: row.game,
    unlocks: row.unlocks,
    regionLocked: row.region_locked,
    status: null as CardStatus,
    color: row.color,
    image: row.image_url ?? undefined,
    imageBack: row.image_back_url ?? undefined,
    backHorizontal: row.back_horizontal,
  };
}

export function toSeries(row: SeriesRow): Series {
  return {
    id: row.id,
    name: row.name,
    game: row.franchise,
    region: row.region as Region,
    releaseDate: row.release_date,
    totalCards: row.total_cards,
    accentColor: row.accent_color,
    accentBg: row.accent_bg,
  };
}
