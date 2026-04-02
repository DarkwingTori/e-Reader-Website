import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../components/AuthContext';
import {
  ChevronRight, Settings, Edit3, Camera, BookOpen, Heart, ArrowRightLeft,
  Award, Clock, Shield, Bell, Palette, LogOut, Star, TrendingUp,
} from 'lucide-react';

const font = {
  display: 'Zilla Slab, Bitter, serif',
  body: 'DM Sans, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

const c = {
  rust: '#E35336',
  cream: '#F5F5DC',
  sienna: '#A0522D',
  sand: '#F4A460',
  sandBg: '#F8EDD8',
};

type Tab = 'overview' | 'collection' | 'settings';

function CompletionRing({ pct, size = 120, stroke = 8 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c.sienna + '18'} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c.rust} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl p-5 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: c.rust + '12' }}>{icon}</div>
      </div>
      <div style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 700, color: c.sienna }}>{value}</div>
      <div style={{ fontFamily: font.body, fontSize: '13px', color: '#8B7355' }}>{label}</div>
      {sub && <div style={{ fontFamily: font.mono, fontSize: '11px', color: c.rust, marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

export function ProfilePage() {
  const { user, isLoggedIn, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');
  const [notifSettings, setNotifSettings] = useState({ newCards: true, trades: true, newsletter: false });

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: c.cream }}>
        <div className="text-center">
          <span className="text-5xl mb-4 block">🔒</span>
          <h2 style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 700, color: c.sienna }}>
            Sign in to view your profile
          </h2>
          <p className="mt-2" style={{ fontFamily: font.body, fontSize: '15px', color: '#8B7355' }}>
            Click the profile icon in the header to get started.
          </p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BookOpen size={15} /> },
    { key: 'collection', label: 'Collection Stats', icon: <Star size={15} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={15} /> },
  ];

  const seriesBreakdown = [
    { name: 'Animal Crossing-e', owned: 89, total: 328, color: '#4A7C59' },
    { name: 'Pokémon Battle-e', owned: 42, total: 54, color: '#C62828' },
    { name: 'NES Classics', owned: 31, total: 40, color: '#1565C0' },
    { name: 'Super Mario Advance 4', owned: 28, total: 38, color: '#E53935' },
    { name: 'Mario Party-e', owned: 34, total: 64, color: '#F57F17' },
    { name: 'Game & Watch-e', owned: 15, total: 20, color: '#795548' },
    { name: 'Kirby Slide', owned: 8, total: 12, color: '#E91E90' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: c.cream }}>
      {/* Profile Header */}
      <div style={{ backgroundColor: c.sandBg, borderBottom: `1px solid ${c.sienna}18` }}>
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-6">
            <Link to="/" className="no-underline" style={{ fontFamily: font.body, fontSize: '13px', color: '#8B7355' }}>
              e-Reader Archive
            </Link>
            <ChevronRight size={13} color="#8B7355" />
            <span style={{ fontFamily: font.body, fontSize: '13px', color: c.sienna, fontWeight: 600 }}>Profile</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: c.rust + '18', border: `3px solid ${c.rust}44` }}
              >
                <span className="text-4xl">🎴</span>
              </div>
              <button
                className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                <Camera size={20} color="#fff" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 style={{ fontFamily: font.display, fontSize: '32px', fontWeight: 700, color: c.sienna }}>
                  {user.displayName}
                </h1>
                <span
                  className="rounded-full px-3 py-0.5"
                  style={{ fontFamily: font.mono, fontSize: '12px', color: '#8B7355', backgroundColor: c.sienna + '12' }}
                >
                  @{user.username}
                </span>
              </div>
              <p className="mt-1 mb-3" style={{ fontFamily: font.body, fontSize: '14px', color: '#8B7355' }}>
                Member since {user.joinDate} · Favorite series: {user.favoritesSeries}
              </p>
              {/* Mini stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'Cards Owned', value: user.cardsOwned, icon: <BookOpen size={13} /> },
                  { label: 'Wanted', value: user.cardsWanted, icon: <Heart size={13} /> },
                  { label: 'Completion', value: `${user.completionPct}%`, icon: <TrendingUp size={13} /> },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span style={{ color: c.rust }}>{s.icon}</span>
                    <span style={{ fontFamily: font.mono, fontSize: '14px', fontWeight: 600, color: c.sienna }}>{s.value}</span>
                    <span style={{ fontFamily: font.body, fontSize: '12px', color: '#8B7355' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 -mb-[1px]">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-t-lg border border-b-0 cursor-pointer transition-colors"
                style={{
                  fontFamily: font.body,
                  fontSize: '14px',
                  fontWeight: activeTab === t.key ? 600 : 400,
                  backgroundColor: activeTab === t.key ? c.cream : 'transparent',
                  color: activeTab === t.key ? c.sienna : '#8B7355',
                  borderColor: activeTab === t.key ? c.sienna + '22' : 'transparent',
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<BookOpen size={18} color={c.rust} />} label="Cards Owned" value={String(user.cardsOwned)} sub="+12 this month" />
              <StatCard icon={<Heart size={18} color={c.rust} />} label="Wanted" value={String(user.cardsWanted)} />
              <StatCard icon={<ArrowRightLeft size={18} color={c.rust} />} label="For Trade" value="34" />
              <StatCard icon={<Award size={18} color={c.rust} />} label="Badges" value={String(user.badges.length)} />
            </div>

            {/* Bio + Completion ring */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>About</h3>
                  <button
                    onClick={() => {
                      if (editingBio) updateProfile({ bio: bioText });
                      setEditingBio(!editingBio);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg cursor-pointer border"
                    style={{ fontFamily: font.body, fontSize: '12px', color: c.rust, borderColor: c.rust + '33', backgroundColor: 'transparent' }}
                  >
                    <Edit3 size={12} /> {editingBio ? 'Save' : 'Edit'}
                  </button>
                </div>
                {editingBio ? (
                  <textarea
                    value={bioText}
                    onChange={e => setBioText(e.target.value)}
                    className="w-full p-3 rounded-lg border outline-none resize-none"
                    rows={4}
                    style={{ fontFamily: font.body, fontSize: '15px', color: c.sienna, borderColor: c.sienna + '33', lineHeight: 1.7 }}
                  />
                ) : (
                  <p style={{ fontFamily: font.body, fontSize: '15px', color: c.sienna, lineHeight: 1.7 }}>{user.bio}</p>
                )}
              </div>

              <div className="rounded-xl p-6 border flex flex-col items-center justify-center" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
                <div className="relative">
                  <CompletionRing pct={user.completionPct} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 700, color: c.sienna }}>{user.completionPct}%</span>
                    <span style={{ fontFamily: font.body, fontSize: '11px', color: '#8B7355' }}>Complete</span>
                  </div>
                </div>
                <p className="mt-3 text-center" style={{ fontFamily: font.body, fontSize: '13px', color: '#8B7355' }}>
                  {user.cardsOwned} of ~1,000 cards
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
              <h3 className="mb-4" style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>Badges</h3>
              <div className="flex flex-wrap gap-3">
                {user.badges.map(b => (
                  <div
                    key={b.name}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 border"
                    style={{ borderColor: c.sand + '55', backgroundColor: c.sandBg }}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <div style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: c.sienna }}>{b.name}</div>
                      <div style={{ fontFamily: font.mono, fontSize: '10px', color: '#8B7355' }}>{b.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
              <h3 className="mb-4" style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>Recent Activity</h3>
              <div className="space-y-0">
                {user.recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: i < user.recentActivity.length - 1 ? `1px solid ${c.sienna}10` : 'none' }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.rust }} />
                    <div className="flex-1 min-w-0">
                      <span style={{ fontFamily: font.body, fontSize: '14px', color: c.sienna }}>
                        {a.action} — <strong>{a.card}</strong>
                      </span>
                    </div>
                    <span className="shrink-0" style={{ fontFamily: font.mono, fontSize: '11px', color: '#8B7355' }}>{a.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collection' && (
          <div className="space-y-6">
            <h3 style={{ fontFamily: font.display, fontSize: '22px', fontWeight: 700, color: c.sienna }}>Collection by Series</h3>
            <div className="space-y-4">
              {seriesBreakdown.map(s => {
                const pct = Math.round((s.owned / s.total) * 100);
                return (
                  <div key={s.name} className="rounded-xl p-5 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontFamily: font.body, fontSize: '15px', fontWeight: 600, color: c.sienna }}>{s.name}</span>
                      <span style={{ fontFamily: font.mono, fontSize: '13px', color: '#8B7355' }}>
                        {s.owned}/{s.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: s.color + '18' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile settings */}
            <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
              <div className="flex items-center gap-2 mb-5">
                <Shield size={18} style={{ color: c.rust }} />
                <h3 style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>Account Settings</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Display Name', value: user.displayName },
                  { label: 'Email', value: user.email },
                  { label: 'Username', value: `@${user.username}` },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${c.sienna}10` }}>
                    <div>
                      <div style={{ fontFamily: font.body, fontSize: '13px', color: '#8B7355' }}>{field.label}</div>
                      <div style={{ fontFamily: font.body, fontSize: '15px', color: c.sienna }}>{field.value}</div>
                    </div>
                    <button
                      className="px-3 py-1 rounded-lg cursor-pointer border bg-transparent"
                      style={{ fontFamily: font.body, fontSize: '12px', color: c.rust, borderColor: c.rust + '33' }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
              <div className="flex items-center gap-2 mb-5">
                <Bell size={18} style={{ color: c.rust }} />
                <h3 style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>Notifications</h3>
              </div>
              {[
                { key: 'newCards' as const, label: 'New card additions', desc: 'Get notified when new cards are added to the database' },
                { key: 'trades' as const, label: 'Trade requests', desc: 'Receive alerts for incoming trade proposals' },
                { key: 'newsletter' as const, label: 'Newsletter', desc: 'Monthly e-Reader Archive digest' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${c.sienna}10` }}>
                  <div>
                    <div style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: c.sienna }}>{n.label}</div>
                    <div style={{ fontFamily: font.body, fontSize: '12px', color: '#8B7355' }}>{n.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifSettings(p => ({ ...p, [n.key]: !p[n.key] }))}
                    className="w-11 h-6 rounded-full cursor-pointer border-none transition-colors relative"
                    style={{ backgroundColor: notifSettings[n.key] ? c.rust : c.sienna + '22' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm"
                      style={{ left: notifSettings[n.key] ? '22px' : '2px' }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Theme */}
            <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fff', borderColor: c.sienna + '18' }}>
              <div className="flex items-center gap-2 mb-5">
                <Palette size={18} style={{ color: c.rust }} />
                <h3 style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 700, color: c.sienna }}>Appearance</h3>
              </div>
              <div className="flex gap-3">
                {['Cream (Default)', 'Dark Archive', 'Game Boy Green'].map((theme, i) => (
                  <button
                    key={theme}
                    className="flex-1 py-3 rounded-xl border cursor-pointer transition-colors"
                    style={{
                      fontFamily: font.body,
                      fontSize: '13px',
                      backgroundColor: i === 0 ? c.rust + '12' : '#fff',
                      color: i === 0 ? c.rust : '#8B7355',
                      borderColor: i === 0 ? c.rust : c.sienna + '22',
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <Link to="/" onClick={logout}>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border cursor-pointer transition-colors hover:bg-red-50"
                style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: '#C62828', borderColor: '#C6282833', backgroundColor: 'transparent' }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
