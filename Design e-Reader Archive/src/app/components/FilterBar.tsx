import { Search, LayoutGrid, BookOpen } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  game: string;
  onGameChange: (v: string) => void;
  region: string;
  onRegionChange: (v: string) => void;
  rarity: string;
  onRarityChange: (v: string) => void;
  view: 'grid' | 'binder';
  onViewChange: (v: 'grid' | 'binder') => void;
}

const selectClass = "bg-[#FAF5E8] border border-[rgba(160,82,45,0.3)] rounded-lg px-3 py-2 text-[#3D2B1F] appearance-none cursor-pointer focus:outline-none focus:border-[#E35336]";

export function FilterBar({ search, onSearchChange, game, onGameChange, region, onRegionChange, rarity, onRarityChange, view, onViewChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[#FFFDF5] rounded-xl border border-[rgba(160,82,45,0.2)] mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355]" />
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search cards..."
          className={`w-full pl-9 pr-3 py-2 ${selectClass}`}
          style={{ fontSize: '14px' }}
        />
      </div>
      <select value={game} onChange={e => onGameChange(e.target.value)} className={selectClass} style={{ fontSize: '14px' }}>
        <option value="">All Games</option>
        <option value="Animal Crossing">Animal Crossing</option>
        <option value="Pokemon Ruby/Sapphire">Pokemon Ruby/Sapphire</option>
        <option value="NES Games">NES Games</option>
        <option value="Super Mario Bros. 3">Super Mario Bros. 3</option>
      </select>
      <select value={region} onChange={e => onRegionChange(e.target.value)} className={selectClass} style={{ fontSize: '14px' }}>
        <option value="">All Regions</option>
        <option value="US">US</option>
        <option value="JP">JP</option>
        <option value="AU">AU</option>
      </select>
      <select value={rarity} onChange={e => onRarityChange(e.target.value)} className={selectClass} style={{ fontSize: '14px' }}>
        <option value="">All Rarities</option>
        <option value="common">Common</option>
        <option value="uncommon">Uncommon</option>
        <option value="rare">Rare</option>
        <option value="ultra-rare">Ultra Rare</option>
      </select>
      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-[#E35336] text-white' : 'bg-[#EDE8D5] text-[#A0522D] hover:bg-[#F4A460] hover:text-white'}`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => onViewChange('binder')}
          className={`p-2 rounded-lg transition-colors ${view === 'binder' ? 'bg-[#E35336] text-white' : 'bg-[#EDE8D5] text-[#A0522D] hover:bg-[#F4A460] hover:text-white'}`}
        >
          <BookOpen size={18} />
        </button>
      </div>
    </div>
  );
}
