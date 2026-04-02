import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  joinDate: string;
  bio: string;
  favoritesSeries: string;
  cardsOwned: number;
  cardsWanted: number;
  completionPct: number;
  badges: { name: string; icon: string; date: string }[];
  recentActivity: { action: string; card: string; date: string }[];
}

function buildProfile(session: Session, userData: UserRow | null): UserProfile {
  return {
    id: session.user.id,
    username: userData?.username ?? session.user.email?.split('@')[0] ?? 'collector',
    email: session.user.email ?? '',
    displayName: userData?.display_name ?? session.user.email?.split('@')[0] ?? 'Collector',
    avatar: userData?.avatar_url ?? '',
    joinDate: userData?.created_at
      ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : '',
    bio: userData?.bio ?? '',
    favoritesSeries: userData?.favorite_series ?? '',
    cardsOwned: 0,
    cardsWanted: 0,
    completionPct: 0,
    badges: [],
    recentActivity: [],
  };
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(buildProfile(session, userData));
      }
    });

    // Keep in sync with auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(buildProfile(session, userData));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signup = async (email: string, username: string, password: string): Promise<string | null> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    if (data.user) {
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        username,
        display_name: username,
      });
      if (insertError) return insertError.message;
    }
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
