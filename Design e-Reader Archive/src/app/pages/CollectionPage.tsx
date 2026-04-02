import { useState, useMemo } from 'react';
import { CARDS, SERIES } from '../data/mockData';
import { CardComponent } from '../components/CardComponent';
import { Download } from 'lucide-react';

export function CollectionPage() {
  const [tab, setTab] = useState<'owned' | 'wanted' | 'trade'>('owned');

  const owned = useMemo(() => CARDS.filter(c => c.status === 'owned'), []);
  const wanted = useMemo(() => CARDS.filter(c => c.status === 'wanted'), []);
  const trade = useMemo(() => CARDS.filter(c => c.status === 'trade'), []);
  const totalOwned = owned.length;
  const totalCards = CARDS.length;
  const pct = Math.round((totalOwned / totalCards) * 100);

  const tabCards = tab === 'owned' ? owned : tab === 'wanted' ? wanted : trade;

  // Per-series completion
  const seriesStats = SERIES.map(s => {
    const total = CARDS.filter(c => c.seriesId === s.id).length;
    const have = CARDS.filter(c => c.seriesId === s.id && c.status === 'owned').length;
    return { ...s, total, have, pct: total > 0 ? Math.round((have / total) * 100) : 0 };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: 'Bitter', fontSize: '28px', fontWeight: 700, color: '#A0522D' }}>My Collection</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors" style={{ fontSize: '13px', fontWeight: 500 }}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="bg-[#FFFDF5] rounded-xl border border-[rgba(160,82,45,0.2)] p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Overall ring */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EDE8D5" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#E35336" strokeWidth="3" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span style={{ fontFamily: 'Bitter', fontSize: '16px', fontWeight: 700, color: '#E35336' }}>{pct}%</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Bitter', fontSize: '18px', fontWeight: 600, color: '#3D2B1F' }}>Overall Completion</p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#8B7355' }}>{totalOwned} / {totalCards} cards</p>
            </div>
          </div>
        </div>

        {/* Per-series rings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {seriesStats.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF5E8]">
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EDE8D5" strokeWidth="3.5" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke={s.accentColor} strokeWidth="3.5" strokeDasharray={`${s.pct}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '8px', fontWeight: 600, color: s.accentColor }}>{s.pct}%</span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate" style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 600, color: '#3D2B1F' }}>{s.name}</p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#8B7355' }}>{s.have}/{s.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#EDE8D5] rounded-lg p-1 w-fit">
        {[
          { key: 'owned' as const, label: 'Owned', count: owned.length },
          { key: 'wanted' as const, label: 'Wanted', count: wanted.length },
          { key: 'trade' as const, label: 'Trade', count: trade.length },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-md transition-all"
            style={{
              backgroundColor: tab === t.key ? '#FFFDF5' : 'transparent',
              color: tab === t.key ? '#E35336' : '#8B7355',
              fontSize: '14px',
              fontWeight: tab === t.key ? 600 : 400,
              boxShadow: tab === t.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tabCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tabCards.map(c => <CardComponent key={c.id} card={c} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <p style={{ fontFamily: 'DM Sans', fontSize: '16px', color: '#8B7355' }}>No cards in this category yet.</p>
        </div>
      )}
    </div>
  );
}
