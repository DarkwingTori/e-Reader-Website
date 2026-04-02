export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      series: {
        Row: {
          id: string;
          name: string;
          franchise: string;
          region: string;
          release_date: string;
          total_cards: number;
          accent_color: string;
          accent_bg: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          franchise: string;
          region: string;
          release_date: string;
          total_cards: number;
          accent_color: string;
          accent_bg: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          franchise?: string;
          region?: string;
          release_date?: string;
          total_cards?: number;
          accent_color?: string;
          accent_bg?: string;
          created_at?: string;
        };
      };
      cards: {
        Row: {
          id: string;
          series_id: string;
          series_name: string;
          name: string;
          card_number: string;
          region: string;
          rarity: string;
          card_type: string;
          game: string;
          unlocks: string;
          region_locked: boolean;
          color: string;
          image_url: string | null;
          image_back_url: string | null;
          back_horizontal: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          series_id: string;
          series_name: string;
          name: string;
          card_number: string;
          region: string;
          rarity: string;
          card_type: string;
          game: string;
          unlocks: string;
          region_locked?: boolean;
          color: string;
          image_url?: string | null;
          image_back_url?: string | null;
          back_horizontal?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          series_id?: string;
          series_name?: string;
          name?: string;
          card_number?: string;
          region?: string;
          rarity?: string;
          card_type?: string;
          game?: string;
          unlocks?: string;
          region_locked?: boolean;
          color?: string;
          image_url?: string | null;
          image_back_url?: string | null;
          back_horizontal?: boolean;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          favorite_series: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          favorite_series?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          favorite_series?: string | null;
          created_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          status: 'owned' | 'wanted' | 'trade';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          card_id: string;
          status: 'owned' | 'wanted' | 'trade';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_id?: string;
          status?: 'owned' | 'wanted' | 'trade';
          created_at?: string;
        };
      };
      generated_cards: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          file_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          card_id: string;
          file_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_id?: string;
          file_url?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
