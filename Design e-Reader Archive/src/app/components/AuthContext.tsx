import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
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

const MOCK_USER: UserProfile = {
  username: 'dotcode_collector',
  email: 'collector@ereader.archive',
  displayName: 'DotCode Collector',
  avatar: '',
  joinDate: 'March 2024',
  bio: 'Passionate e-Reader card collector since 2002. Specializing in Animal Crossing-e and NES Classics series. Always looking to trade!',
  favoritesSeries: 'Animal Crossing-e',
  cardsOwned: 247,
  cardsWanted: 81,
  completionPct: 68,
  badges: [
    { name: 'Early Adopter', icon: '🎮', date: 'Mar 2024' },
    { name: 'AC Enthusiast', icon: '🍃', date: 'Apr 2024' },
    { name: '100 Cards Club', icon: '💯', date: 'Jun 2024' },
    { name: 'NES Master', icon: '🕹️', date: 'Sep 2024' },
    { name: 'Trade Pioneer', icon: '🤝', date: 'Nov 2024' },
  ],
  recentActivity: [
    { action: 'Added to collection', card: 'K.K. Slider (#001)', date: '2 hours ago' },
    { action: 'Marked as wanted', card: 'Donkey Kong NES (#012)', date: '5 hours ago' },
    { action: 'Added to collection', card: 'Portia (#045)', date: '1 day ago' },
    { action: 'Updated trade list', card: 'Bliss (#089)', date: '2 days ago' },
    { action: 'Added to collection', card: 'Excitebike (#003)', date: '3 days ago' },
  ],
};

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, username: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (_email: string, _password: string) => {
    setUser(MOCK_USER);
  };

  const signup = (email: string, username: string, _password: string) => {
    setUser({ ...MOCK_USER, email, username, displayName: username });
  };

  const logout = () => setUser(null);

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
