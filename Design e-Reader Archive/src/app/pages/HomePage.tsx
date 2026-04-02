import { Link } from 'react-router';
import { Search, Database, Bookmark, PenTool, ChevronRight } from 'lucide-react';
import { SERIES } from '../data/mockData';
import { useState } from 'react';

export function HomePage() {
  const [heroSearch, setHeroSearch] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #A0522D 0%, #E35336 50%, #F4A460 100%)' }}>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #FFF 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-white mb-4" style={{ fontFamily: 'Bitter, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}>
            e-Reader Archive
          </h1>
          <p className="text-white/90 max-w-xl mx-auto mb-8" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px' }}>
            The complete Nintendo e-Reader card archive. Browse, collect, and build.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]" />
            <input
              type="text"
              value={heroSearch}
              onChange={e => setHeroSearch(e.target.value)}
              placeholder="Search cards, series, games..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 border-none shadow-lg focus:outline-none text-[#3D2B1F] placeholder:text-[#8B7355]"
              style={{ fontSize: '16px' }}
            />
          </div>
          {/* Decorative cards */}
          <div className="flex justify-center gap-4 mt-12 opacity-60">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="w-16 h-22 md:w-20 md:h-28 rounded-lg bg-white/20 border border-white/30 backdrop-blur-sm"
                style={{ transform: `rotate(${(i - 2) * 8}deg) translateY(${Math.abs(i - 2) * 8}px)` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Database, title: 'Card Database', desc: 'Browse the complete e-Reader card catalog with grid and binder views.', to: '/database', color: '#E35336' },
            { icon: Bookmark, title: 'Collection Tracker', desc: 'Track your collection, mark wanted cards, and manage trades.', to: '/collection', color: '#F4A460' },
            { icon: PenTool, title: 'Card Builder', desc: 'Create custom Trainer Cards with our visual card builder.', to: '/builder', color: '#A0522D' },
          ].map(f => (
            <Link key={f.to} to={f.to} className="no-underline">
              <div className="bg-[#FFFDF5] rounded-xl border border-[rgba(160,82,45,0.2)] p-6 hover:shadow-lg hover:border-[#F4A460] transition-all group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${f.color}15` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontFamily: 'Bitter, serif', fontSize: '18px', fontWeight: 600, color: '#3D2B1F' }}>{f.title}</h3>
                <p className="mt-1" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#8B7355' }}>{f.desc}</p>
                <span className="inline-flex items-center gap-1 mt-3 group-hover:gap-2 transition-all" style={{ fontSize: '13px', color: f.color, fontWeight: 500 }}>
                  Explore <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Series */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: 'Bitter, serif', fontSize: '24px', fontWeight: 700, color: '#A0522D' }}>Featured Series</h2>
          <Link to="/series" className="no-underline text-[#E35336] hover:underline" style={{ fontSize: '14px', fontWeight: 500 }}>View All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {SERIES.map(s => (
            <Link key={s.id} to={`/series/${s.id}`} className="no-underline flex-shrink-0 w-64">
              <div
                className="rounded-xl p-5 h-full border border-transparent hover:border-[#F4A460] hover:shadow-md transition-all group"
                style={{ backgroundColor: s.accentBg }}
              >
                <span className="px-2 py-0.5 rounded text-white" style={{ fontSize: '10px', fontWeight: 600, backgroundColor: s.accentColor }}>
                  {s.region}
                </span>
                <h3 className="mt-3" style={{ fontFamily: 'Bitter, serif', fontSize: '16px', fontWeight: 600, color: s.accentColor }}>{s.name}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#8B7355' }}>{s.game}</p>
                <div className="flex items-center justify-between mt-3">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#8B7355' }}>{s.totalCards} cards</span>
                  <ChevronRight size={14} className="text-[#8B7355] group-hover:text-[#E35336] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(160,82,45,0.2)] bg-[#EDE8D5] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#8B7355' }}>
            e-Reader Archive is a fan project. Nintendo, Game Boy Advance, and e-Reader are trademarks of Nintendo.
          </p>
        </div>
      </footer>
    </div>
  );
}