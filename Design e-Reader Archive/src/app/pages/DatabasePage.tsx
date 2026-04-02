import { useState, useMemo } from 'react';
import { CARDS } from '../data/mockData';
import { CardComponent } from '../components/CardComponent';
import { FilterBar } from '../components/FilterBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function BinderView({ cards }: { cards: typeof CARDS }) {
  const [page, setPage] = useState(0);
  const perPage = 18; // 2 pages x 9 cards
  const totalPages = Math.ceil(cards.length / perPage);
  const pageCards = cards.slice(page * perPage, (page + 1) * perPage);
  const leftCards = pageCards.slice(0, 9);
  const rightCards = pageCards.slice(9, 18);

  const renderSlot = (card: typeof CARDS[0] | undefined, idx: number) => (
    <div
      key={card?.id ?? `empty-${idx}`}
      className="aspect-[3/4] rounded-md relative overflow-hidden"
      style={{
        background: card
          ? `linear-gradient(135deg, ${card.color}22, ${card.color}44)`
          : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
      }}
    >
      {card ? (
        <div className="p-1.5 h-full flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>{card.cardNumber}</span>
          </div>
          <p className="truncate text-center" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{card.name}</p>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.1)' }}>?</span>
        </div>
      )}
      {/* Plastic sheen */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
      }} />
    </div>
  );

  return (
    <div>
      <div className="rounded-2xl p-6 md:p-8" style={{ background: 'linear-gradient(135deg, #2C1810, #3D2B1F)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}>
        <div className="flex gap-2 md:gap-4">
          {/* Left page */}
          <div className="flex-1 bg-[rgba(0,0,0,0.2)] rounded-lg p-3 md:p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {Array.from({ length: 9 }, (_, i) => renderSlot(leftCards[i], i))}
            </div>
          </div>
          {/* Spine */}
          <div className="w-3 md:w-4 flex flex-col justify-around">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="w-full aspect-square rounded-full bg-[#A0522D] border border-[#8B7355]" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }} />
            ))}
          </div>
          {/* Right page */}
          <div className="flex-1 bg-[rgba(0,0,0,0.2)] rounded-lg p-3 md:p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {Array.from({ length: 9 }, (_, i) => renderSlot(rightCards[i], i + 9))}
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg bg-[#FFFDF5] border border-[rgba(160,82,45,0.3)] disabled:opacity-30 hover:bg-[#EDE8D5] transition-colors text-[#A0522D]">
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#8B7355' }}>
          Page {page + 1} of {totalPages}
        </span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg bg-[#FFFDF5] border border-[rgba(160,82,45,0.3)] disabled:opacity-30 hover:bg-[#EDE8D5] transition-colors text-[#A0522D]">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function DatabasePage() {
  const [search, setSearch] = useState('');
  const [game, setGame] = useState('');
  const [region, setRegion] = useState('');
  const [rarity, setRarity] = useState('');
  const [view, setView] = useState<'grid' | 'binder'>('grid');

  const filtered = useMemo(() => {
    return CARDS.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.series.toLowerCase().includes(search.toLowerCase())) return false;
      if (game && c.game !== game) return false;
      if (region && c.region !== region) return false;
      if (rarity && c.rarity !== rarity) return false;
      return true;
    });
  }, [search, game, region, rarity]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-6" style={{ fontFamily: 'Bitter, serif', fontSize: '28px', fontWeight: 700, color: '#A0522D' }}>Card Database</h1>
      <FilterBar
        search={search} onSearchChange={setSearch}
        game={game} onGameChange={setGame}
        region={region} onRegionChange={setRegion}
        rarity={rarity} onRarityChange={setRarity}
        view={view} onViewChange={setView}
      />
      <p className="mb-4" style={{ fontSize: '13px', color: '#8B7355' }}>{filtered.length} cards found</p>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(c => <CardComponent key={c.id} card={c} />)}
        </div>
      ) : (
        <BinderView cards={filtered} />
      )}
    </div>
  );
}
