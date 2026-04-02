import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Cable, Gamepad2, Monitor, Cpu, ChevronRight, X } from 'lucide-react';

type Platform = 'GBA' | 'GCN' | 'NES';
type Region = 'US' | 'JP' | 'US+JP';
type Filter = 'All' | 'GBA' | 'GameCube' | 'NES Classics';

interface CardSeries {
  name: string;
  cardCount: string;
  region: string;
}

interface Game {
  id: string;
  title: string;
  platform: Platform;
  region: Region;
  year: string;
  developer: string;
  jpOnly: boolean;
  image?: string;
  color: string;
  functionality: string[];
  removedInWest?: string;
  series: CardSeries[];
  hardware: string[];
}

const GAMES: Game[] = [
  {
    id: 'pokemon-ruby', title: 'Pokémon Ruby', platform: 'GBA', region: 'US+JP', year: '2002', developer: 'Game Freak',
    jpOnly: false, color: '#C62828', image: undefined,
    functionality: ['Scan Battle-e cards to fight special trainers', 'EON Ticket distribution for Southern Island', 'Berry Program Update fix via e-Reader'],
    series: [
      { name: 'Pokémon Battle-e Series 1', cardCount: '64 cards', region: 'US' },
      { name: 'Pokémon Battle-e Series 2', cardCount: '64 cards', region: 'US' },
      { name: 'EON Ticket', cardCount: 'Promo', region: 'US' },
    ],
    hardware: ['2× GBA required', 'Game Link Cable required'],
  },
  {
    id: 'pokemon-sapphire', title: 'Pokémon Sapphire', platform: 'GBA', region: 'US+JP', year: '2002', developer: 'Game Freak',
    jpOnly: false, color: '#1565C0', image: undefined,
    functionality: ['Scan Battle-e cards to fight special trainers', 'EON Ticket distribution for Southern Island', 'Berry Program Update fix via e-Reader'],
    series: [
      { name: 'Pokémon Battle-e Series 1', cardCount: '64 cards', region: 'US' },
      { name: 'Pokémon Battle-e Series 2', cardCount: '64 cards', region: 'US' },
      { name: 'EON Ticket', cardCount: 'Promo', region: 'US' },
    ],
    hardware: ['2× GBA required', 'Game Link Cable required'],
  },
  {
    id: 'sma4', title: 'Super Mario Advance 4', platform: 'GBA', region: 'US+JP', year: '2003', developer: 'Nintendo',
    jpOnly: false, color: '#E53935', image: undefined,
    functionality: ['Unlock new e-World levels via card scanning', 'Add power-ups and items to inventory', 'Unlock demo movies and bonus content'],
    series: [
      { name: 'Super Mario Advance 4 Series 1', cardCount: '18 cards', region: 'US' },
      { name: 'Super Mario Advance 4 Series 2', cardCount: '18 cards', region: 'JP' },
    ],
    hardware: ['e-Reader required'],
  },
  {
    id: 'mario-party-e', title: 'Mario Party-e', platform: 'GBA', region: 'US', year: '2003', developer: 'Nintendo',
    jpOnly: false, color: '#F57C00', image: undefined,
    functionality: ['Standalone e-Reader card game', 'Scan cards to play minigames directly', 'Supports 1-4 players with card sharing'],
    series: [{ name: 'Mario Party-e', cardCount: '64 cards', region: 'US' }],
    hardware: ['e-Reader required'],
  },
  {
    id: 'pokemon-emerald-jp', title: 'Pokémon Emerald', platform: 'GBA', region: 'JP', year: '2004', developer: 'Game Freak',
    jpOnly: true, color: '#2E7D32', image: undefined,
    functionality: ['Scan special trainer cards for Battle Frontier', 'Access exclusive Battle Frontier trainers', 'Unlock Altering Cave Pokémon encounters'],
    removedInWest: 'e-Reader support was removed from the US and EU versions of this game. JP version only.',
    series: [{ name: 'Pokémon Battle-e+ Series', cardCount: '16 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'pokemon-firered-jp', title: 'Pokémon FireRed', platform: 'GBA', region: 'JP', year: '2004', developer: 'Game Freak',
    jpOnly: true, color: '#D32F2F', image: undefined,
    functionality: ['Scan Battle-e+ cards for trainer battles', 'Access exclusive trainer configurations'],
    removedInWest: 'e-Reader support was removed from the US and EU versions.',
    series: [{ name: 'Pokémon Battle-e+ FireRed', cardCount: '12 cards', region: 'JP' }],
    hardware: ['e-Reader+ required', '2× GBA required', 'Game Link Cable required'],
  },
  {
    id: 'pokemon-leafgreen-jp', title: 'Pokémon LeafGreen', platform: 'GBA', region: 'JP', year: '2004', developer: 'Game Freak',
    jpOnly: true, color: '#388E3C', image: undefined,
    functionality: ['Scan Battle-e+ cards for trainer battles', 'Access exclusive trainer configurations'],
    removedInWest: 'e-Reader support was removed from the US and EU versions.',
    series: [{ name: 'Pokémon Battle-e+ LeafGreen', cardCount: '12 cards', region: 'JP' }],
    hardware: ['e-Reader+ required', '2× GBA required', 'Game Link Cable required'],
  },
  {
    id: 'megaman-bn4', title: 'Mega Man Battle Network 4', platform: 'GBA', region: 'JP', year: '2003', developer: 'Capcom',
    jpOnly: true, color: '#0D47A1', image: undefined,
    functionality: ['Scan Navi cards to add Battle Chips', 'Unlock special NetNavi encounters'],
    series: [{ name: 'Rockman EXE 4 Modification Cards', cardCount: '48 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'megaman-bn5', title: 'Mega Man Battle Network 5', platform: 'GBA', region: 'JP', year: '2004', developer: 'Capcom',
    jpOnly: true, color: '#1A237E', image: undefined,
    functionality: ['Scan cards to modify Liberation missions', 'Unlock special Battle Chips and Navis'],
    series: [{ name: 'Rockman EXE 5 Cards', cardCount: '36 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'megaman-bn6', title: 'Mega Man Battle Network 6', platform: 'GBA', region: 'JP', year: '2005', developer: 'Capcom',
    jpOnly: true, color: '#311B92', image: undefined,
    functionality: ['Scan Link Navi cards for Cross System', 'Unlock exclusive Beast Link Gate content'],
    series: [{ name: 'Rockman EXE 6 Modification Cards', cardCount: '24 cards', region: 'JP' }],
    hardware: ['e-Reader+ required', 'Beast Link Gate required'],
  },
  {
    id: 'megaman-zero3', title: 'Mega Man Zero 3', platform: 'GBA', region: 'JP', year: '2004', developer: 'Capcom / Inti Creates',
    jpOnly: true, color: '#B71C1C', image: undefined,
    functionality: ['Scan cards to modify Zero\'s abilities', 'Unlock secret Cyber Elf enhancements'],
    series: [{ name: 'Rockman Zero 3 e-Cards', cardCount: '12 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'fzero-climax', title: 'F-Zero Climax', platform: 'GBA', region: 'JP', year: '2004', developer: 'Suzak',
    jpOnly: true, color: '#E65100', image: undefined,
    functionality: ['Scan cards to unlock custom tracks', 'Share track data via e-Reader cards'],
    series: [{ name: 'F-Zero Climax e-Cards', cardCount: '8 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'mario-vs-dk', title: 'Mario vs. Donkey Kong', platform: 'GBA', region: 'US', year: '2004', developer: 'Nintendo',
    jpOnly: false, color: '#FF6F00', image: undefined,
    functionality: ['Scan e-Reader cards to unlock bonus levels', 'Access additional puzzle stages'],
    series: [{ name: 'Mario vs. Donkey Kong e-Cards', cardCount: '16 cards', region: 'US' }],
    hardware: ['e-Reader required'],
  },
  {
    id: 'pokemon-pinball', title: 'Pokémon Pinball R&S', platform: 'GBA', region: 'JP', year: '2003', developer: 'Jupiter',
    jpOnly: true, color: '#AD1457', image: undefined,
    functionality: ['Scan cards to access bonus stages', 'Unlock special Pokémon encounters on tables'],
    series: [{ name: 'Pokémon Pinball e-Cards', cardCount: '8 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'hamtaro', title: 'Hamtaro: Ham-Ham Heartbreak', platform: 'GBA', region: 'JP', year: '2002', developer: 'Pax Softnica',
    jpOnly: true, color: '#FF8F00', image: undefined,
    functionality: ['Scan cards to receive in-game items', 'Unlock special Ham-Chat words'],
    series: [{ name: 'Hamtaro e-Cards', cardCount: '6 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  {
    id: 'domokun', title: 'Domo-kun no Fushigi Terebi', platform: 'GBA', region: 'JP', year: '2003', developer: 'Iwill',
    jpOnly: true, color: '#4E342E', image: undefined,
    functionality: ['Scan cards to unlock minigames', 'Access special Domo-kun episodes'],
    series: [{ name: 'Domo-kun e-Cards', cardCount: '8 cards', region: 'JP' }],
    hardware: ['e-Reader+ required'],
  },
  // NES Classics
  ...['Balloon Fight', 'Clu Clu Land', 'Donkey Kong', 'Donkey Kong Jr.', 'Donkey Kong 3', 'Excitebike', 'Golf', 'Ice Climber', 'Manhole', 'Mario Bros.', 'Pinball', 'Tennis', 'Urban Champion'].map((name, i) => ({
    id: `nes-${name.toLowerCase().replace(/[\s.]+/g, '-')}`,
    title: name,
    platform: 'NES' as Platform,
    region: 'US' as Region,
    year: '2002',
    developer: 'Nintendo',
    jpOnly: false,
    color: ['#1565C0', '#C62828', '#E53935', '#D84315', '#6A1B9A', '#2E7D32', '#00838F', '#1565C0', '#795548', '#E53935', '#AD1457', '#00695C', '#F57C00'][i],
    image: undefined,
    functionality: [`Scan ${name} e-Reader cards to play the full NES game`, 'Each game requires 5 card scans (10 dot-code strips)', 'Game runs directly on GBA via e-Reader hardware'],
    series: [{ name: `NES Classics - ${name}`, cardCount: '5 cards', region: 'US' }],
    hardware: ['e-Reader required'],
  })),
  // GameCube
  {
    id: 'animal-crossing', title: 'Animal Crossing', platform: 'GCN', region: 'US', year: '2002', developer: 'Nintendo',
    jpOnly: false, color: '#4A7C59', image: undefined,
    functionality: ['Receive items via post office (Character Cards)', 'Set village town tune (Town Tune Cards)', 'Add clothing designs at Able Sisters (Design Cards)', 'Unlock NES Classic games (Classic Game Cards)'],
    series: [
      { name: 'Animal Crossing-e Series 1', cardCount: '64 cards', region: 'US' },
      { name: 'Animal Crossing-e Series 2', cardCount: '64 cards', region: 'US' },
      { name: 'Animal Crossing-e Series 3', cardCount: '64 cards', region: 'US' },
      { name: 'Animal Crossing-e Series 4', cardCount: '64 cards', region: 'US' },
    ],
    hardware: ['GBA–GameCube Cable required', 'e-Reader required', 'GBA required'],
  },
  {
    id: 'pokemon-channel', title: 'Pokémon Channel', platform: 'GCN', region: 'US', year: '2003', developer: 'Ambrella',
    jpOnly: false, color: '#F9A825', image: undefined,
    functionality: ['Scan e-Reader cards to unlock Pokémon mini games', 'Access special TV channels and episodes'],
    series: [{ name: 'Pokémon Channel e-Cards', cardCount: '4 cards', region: 'US' }],
    hardware: ['GBA–GameCube Cable required', 'e-Reader required', 'GBA required'],
  },
  {
    id: 'doubutsu-plus', title: 'Doubutsu no Mori+', platform: 'GCN', region: 'JP', year: '2001', developer: 'Nintendo',
    jpOnly: true, color: '#2E7D32', image: undefined,
    functionality: ['Original JP Animal Crossing with full e-Reader+ support', 'Scan character cards for villager interactions', 'Town tune and design pattern cards'],
    series: [{ name: 'Doubutsu no Mori+ Card-e', cardCount: '48 cards', region: 'JP' }],
    hardware: ['GBA–GameCube Cable required', 'e-Reader+ required', 'GBA required'],
  },
  {
    id: 'doubutsu-eplus', title: 'Doubutsu no Mori e+', platform: 'GCN', region: 'JP', year: '2003', developer: 'Nintendo',
    jpOnly: true, color: '#1B5E20', image: undefined,
    functionality: ['Enhanced JP Animal Crossing with expanded e-Reader+ features', 'Scan cards to invite villagers to your town', 'Over 400 e-Reader card patterns supported'],
    series: [
      { name: 'Doubutsu no Mori e+ Card-e Series 1', cardCount: '64 cards', region: 'JP' },
      { name: 'Doubutsu no Mori e+ Card-e Series 2', cardCount: '64 cards', region: 'JP' },
      { name: 'Doubutsu no Mori e+ Card-e Series 3', cardCount: '64 cards', region: 'JP' },
      { name: 'Doubutsu no Mori e+ Card-e Series 4', cardCount: '64 cards', region: 'JP' },
    ],
    hardware: ['GBA–GameCube Cable required', 'e-Reader+ required', 'GBA required'],
  },
  {
    id: 'pikmin2-jp', title: 'Pikmin 2', platform: 'GCN', region: 'JP', year: '2004', developer: 'Nintendo',
    jpOnly: true, color: '#D32F2F', image: undefined,
    functionality: ['Scan e-Reader cards to unlock treasure hints', 'Access special challenge stages'],
    removedInWest: 'e-Reader support was removed from the US and EU versions.',
    series: [{ name: 'Pikmin 2 e-Cards', cardCount: '6 cards', region: 'JP' }],
    hardware: ['GBA–GameCube Cable required', 'e-Reader+ required', 'GBA required'],
  },
];

const platformBadge = (p: Platform) => {
  const styles: Record<Platform, string> = {
    GBA: 'bg-indigo-600 text-white',
    GCN: 'bg-purple-600 text-white',
    NES: 'bg-blue-700 text-white',
  };
  const labels: Record<Platform, string> = { GBA: 'GBA', GCN: 'GameCube', NES: 'NES Classic' };
  return <span className={`px-2 py-0.5 rounded-full ${styles[p]}`} style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>{labels[p]}</span>;
};

const regionBadge = (r: Region, jpOnly: boolean) => {
  if (jpOnly) return <span className="px-2 py-0.5 rounded-full bg-red-600 text-white" style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>JP</span>;
  return <span className="px-2 py-0.5 rounded-full bg-[#A0522D] text-white" style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>{r}</span>;
};

function CoverCard({ game, selected, onClick }: { game: Game; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-[160px] h-[210px] rounded-[10px] overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_16px_rgba(244,164,96,0.4)] active:scale-[0.97] ${selected ? 'ring-2 ring-[#E35336]' : ''}`}
      style={{ border: 'none', padding: 0 }}
    >
      {game.image ? (
        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center" style={{ backgroundColor: game.color + '22', border: `1px solid ${game.color}44` }}>
          <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: game.color + '33' }}>
            <Gamepad2 size={24} style={{ color: game.color }} />
          </div>
          <span style={{ fontFamily: 'Bitter, serif', fontSize: '12px', fontWeight: 700, color: game.color }}>{game.title}</span>
        </div>
      )}
      {selected && <div className="absolute inset-0 bg-[#E35336] opacity-15 pointer-events-none" />}
      <div className="absolute bottom-2 right-2">{platformBadge(game.platform)}</div>
      {game.jpOnly && <div className="absolute top-2 right-2"><span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white" style={{ fontSize: '9px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>JP</span></div>}
    </button>
  );
}

function ScrollColumn({ games, direction, duration, selectedId, onSelect, paused }: {
  games: Game[]; direction: 'up' | 'down'; duration: number; selectedId: string | null; onSelect: (id: string) => void; paused: boolean;
}) {
  const doubled = [...games, ...games];
  return (
    <div className="flex-1 overflow-hidden h-full relative">
      <div
        className={`flex flex-col gap-4 ${paused ? '' : ''}`}
        style={{
          animation: `scroll-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((g, i) => (
          <div key={`${g.id}-${i}`} className="flex justify-center">
            <CoverCard game={g} selected={selectedId === g.id} onClick={() => onSelect(g.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailPanel({ game, onClose }: { game: Game | null; onClose: () => void }) {
  if (!game) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-full h-full absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #A0522D 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />
        <div className="relative z-10">
          <p className="mb-4" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#A0522D' }}>
            Select a game to see e-Reader compatibility details
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <span className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700" style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>16 GBA games</span>
            <span className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700" style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>5 GameCube games</span>
            <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700" style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>13 NES Classics</span>
          </div>
          <div className="mt-6 animate-pulse">
            <ArrowLeft size={24} className="text-[#A0522D] opacity-40 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6" key={game.id} style={{ animation: 'slideIn 200ms ease-out' }}>
      {/* Close button for mobile */}
      <button onClick={onClose} className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-[#EDE8D5] text-[#A0522D]">
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex gap-4 mb-5">
        <div className="w-[120px] h-[160px] rounded-lg overflow-hidden flex-shrink-0">
          {game.image ? (
            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: game.color + '22' }}>
              <Gamepad2 size={32} style={{ color: game.color }} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 style={{ fontFamily: 'Bitter, serif', fontSize: '20px', fontWeight: 700, color: '#A0522D', margin: 0 }}>{game.title}</h2>
          <div className="flex gap-2 flex-wrap">
            {platformBadge(game.platform)}
            {regionBadge(game.region, game.jpOnly)}
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8B7355', margin: 0 }}>
            {game.developer} · {game.year}
          </p>
          {game.jpOnly && (
            <div className="px-3 py-2 rounded-lg bg-[#E35336]/10 border border-[#E35336]/20 mt-1">
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#E35336', margin: 0 }}>
                ⚠ JP e-Reader+ required. Cards and game must be Japanese versions.
              </p>
            </div>
          )}
        </div>
      </div>

      <hr className="border-[#F4A460]/30 my-4" />

      {/* Functionality */}
      <div className="mb-4">
        <p className="mb-3 tracking-wider uppercase" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#A0522D', fontWeight: 600 }}>
          e-Reader functionality
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          {game.functionality.map((f, i) => (
            <li key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#5C4033' }}>{f}</li>
          ))}
        </ul>
        {game.removedInWest && (
          <div className="mt-3 px-3 py-2 rounded-lg bg-[#E35336]/8 border border-[#E35336]/15">
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#E35336', margin: 0 }}>{game.removedInWest}</p>
          </div>
        )}
      </div>

      <hr className="border-[#F4A460]/30 my-4" />

      {/* Compatible card series */}
      <div className="mb-4">
        <p className="mb-3 tracking-wider uppercase" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#A0522D', fontWeight: 600 }}>
          Compatible card series
        </p>
        <div className="flex flex-col gap-2">
          {game.series.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-wrap p-2.5 rounded-lg border border-[rgba(160,82,45,0.12)] hover:bg-[#F4A460]/10 transition-colors">
              <span className="flex-1" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#5C4033', fontWeight: 500 }}>{s.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#A0522D]/10" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#A0522D' }}>{s.cardCount}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#8B7355]/10" style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif', color: '#8B7355' }}>{s.region}</span>
              <Link to="/database" className="no-underline text-[#E35336] hover:underline flex items-center gap-0.5" style={{ fontSize: '11px', fontFamily: 'DM Sans, sans-serif' }}>
                View cards <ChevronRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-[#F4A460]/30 my-4" />

      {/* Hardware */}
      <div className="mb-6">
        <p className="mb-3 tracking-wider uppercase" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#A0522D', fontWeight: 600 }}>
          Hardware requirements
        </p>
        <div className="flex gap-2 flex-wrap">
          {game.hardware.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5DC] border border-[rgba(160,82,45,0.15)]" style={{ fontSize: '11px', fontFamily: 'DM Sans, sans-serif', color: '#5C4033' }}>
              {h.includes('Cable') ? <Cable size={12} /> : h.includes('GBA') ? <Gamepad2 size={12} /> : h.includes('e-Reader') ? <Cpu size={12} /> : <Monitor size={12} />}
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link to="/database" className="no-underline px-5 py-2.5 rounded-lg bg-[#E35336] text-white hover:bg-[#c9442b] transition-colors" style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
          View all compatible cards →
        </Link>
        <button className="px-5 py-2.5 rounded-lg border-2 border-[#A0522D] text-[#A0522D] hover:bg-[#A0522D]/10 transition-colors cursor-pointer bg-transparent" style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
          Add game to watchlist
        </button>
      </div>
    </div>
  );
}

export function GameCompatibilityPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [paused, setPaused] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const selectedGame = GAMES.find(g => g.id === selectedId) || null;

  const filtered = GAMES.filter(g => {
    if (filter === 'All') return true;
    if (filter === 'GBA') return g.platform === 'GBA';
    if (filter === 'GameCube') return g.platform === 'GCN';
    if (filter === 'NES Classics') return g.platform === 'NES';
    return true;
  });

  // Split into 4 columns
  const cols: Game[][] = [[], [], [], []];
  filtered.forEach((g, i) => cols[i % 4].push(g));

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileDetailOpen(true);
  };

  const filters: Filter[] = ['All', 'GBA', 'GameCube', 'NES Classics'];

  return (
    <>
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="py-6 border-b border-[rgba(160,82,45,0.15)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="mb-1" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#8B7355' }}>
                <Link to="/" className="no-underline text-[#8B7355] hover:text-[#A0522D]">e-Reader Archive</Link> / Game Compatibility
              </p>
              <h1 style={{ fontFamily: 'Bitter, serif', fontSize: '24px', fontWeight: 700, color: '#A0522D', margin: 0 }}>
                Game Compatibility
              </h1>
              <p className="mt-1" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#8B7355' }}>
                Every game that supported the Nintendo e-Reader (2001–2008)
              </p>
            </div>
            <div className="flex gap-1 bg-white/60 rounded-lg p-1 border border-[rgba(160,82,45,0.15)]">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer border-none ${filter === f ? 'bg-[#E35336] text-white' : 'bg-transparent text-[#A0522D] hover:bg-[#F4A460]/20'}`}
                  style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-6 mt-6" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Left: Scrolling columns */}
          <div
            className="flex-[3] flex gap-3 overflow-hidden rounded-xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {cols.map((colGames, i) => (
              <ScrollColumn
                key={`${filter}-${i}`}
                games={colGames}
                direction={i % 2 === 0 ? 'up' : 'down'}
                duration={[40, 55, 30, 50][i]}
                selectedId={selectedId}
                onSelect={handleSelect}
                paused={paused}
              />
            ))}
          </div>

          {/* Right: Detail panel (desktop) */}
          <div className="hidden lg:block flex-[2] bg-white/60 rounded-xl border border-[rgba(160,82,45,0.15)] relative overflow-hidden">
            <DetailPanel game={selectedGame} onClose={() => { setSelectedId(null); setMobileDetailOpen(false); }} />
          </div>
        </div>

        {/* Mobile/tablet detail overlay */}
        {mobileDetailOpen && selectedGame && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileDetailOpen(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-[#F5F5DC] rounded-t-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ animation: 'slideIn 200ms ease-out' }}
            >
              <div className="w-12 h-1 rounded-full bg-[#A0522D]/30 mx-auto mt-3 mb-1" />
              <DetailPanel game={selectedGame} onClose={() => setMobileDetailOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
