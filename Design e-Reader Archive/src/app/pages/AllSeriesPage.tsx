import { Link } from 'react-router';
import { useState } from 'react';
import { ChevronRight, ArrowRight, Globe } from 'lucide-react';


const font = {
  display: 'Zilla Slab, Bitter, serif',
  body: 'DM Sans, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

const color = {
  rust: '#E35336',
  cream: '#F5F5DC',
  sand: '#F4A460',
  sienna: '#A0522D',
  sandBg: '#F8EDD8',
};

interface SubSeries {
  name: string;
  cards: number;
  region?: string;
}

interface SeriesEntry {
  id: string;
  name: string;
  franchise: string;
  regions: string[];
  dates: string;
  totalCards: string;
  excerpt: string;
  subSeries: SubSeries[];
  relatedSets?: string[];
  accentColor: string;
  accentBg: string;
  logo?: string;
  boosterImages?: string[];
  imageCaption?: string;
}

const ALL_SERIES: SeriesEntry[] = [
  {
    id: 'ac-e',
    name: 'Animal Crossing-e',
    franchise: 'Animal Crossing',
    regions: ['US', 'JP', 'AU'],
    dates: 'October 2002 – May 2003',
    totalCards: '328 cards',
    excerpt: `In North America, Animal Crossing-e, consisting of a total of 328 cards, was released shortly after Animal Crossing from October 2002 to May 2003 in four series of booster packs. In the United States, each booster pack retailed for US$2.99. Two of these cards are promotional cards, with one being included with the e-Reader and one being included with issue 163 of Nintendo Power magazine. The Animal Crossing cards can be scanned either on the Game Boy Advance by itself, or in-game while the GBA is connected to the GameCube. All e-Reader functionality was removed from the European version of Animal Crossing, as the e-Reader was never released in the region.\n\nAll non-promotional cards from Doubutsu no Mori+ Card-e except one — 252 Katrina (Shrine Maiden) — were localized and released as part of Animal Crossing-e, in addition to 21 new cards: all 15 Design Cards, Character Cards for Farley, Franklin, and Mr. Resetti in his Groundhog Day outfit, both Classic Game Cards, and the Animal Crossing-e sample card.`,
    subSeries: [
      { name: 'Series 1', cards: 82 },
      { name: 'Series 2', cards: 82 },
      { name: 'Series 3', cards: 82 },
      { name: 'Series 4', cards: 82 },
      { name: 'Promotional', cards: 2 },
    ],
    relatedSets: ['Doubutsu no Mori+ Card-e', 'Doubutsu no Mori Card-e+ (108 cards, JP only)'],
    accentColor: '#4A7C59',
    accentBg: '#D5E8D4',
    logo: '/images/pack-art/250px-AC-e_Logo.png',
    boosterImages: [
      '/images/pack-art/132px-Animal_Crossing-e_Series_3_Package.jpg',
      '/images/pack-art/129px-Animal_Crossing-e_Series_4_Package.jpg',
    ],
    imageCaption: 'Animal Crossing-e Series 3 & 4 booster packs (US, 2002–2003)',
  },
  {
    id: 'poke-battle',
    name: 'Pokémon Battle-e',
    franchise: 'Pokémon',
    regions: ['US', 'JP'],
    dates: 'June 2003 – December 2003',
    totalCards: '54 cards',
    excerpt: `Pokémon Battle-e was the first Pokémon e-Reader card set released in North America, allowing players to scan cards to unlock special trainer battles in Pokémon Ruby and Sapphire. Each card contained encoded battle data including trainer teams, AI behavior, and prize money — creating an expandable postgame challenge system distributed through collectible cards.\n\nThe set was split across two series of booster packs. When scanned, these cards added new Trainer opponents to the Trainer Hill facility in Ruby and Sapphire, effectively providing DLC content years before downloadable content became standard in gaming.`,
    subSeries: [
      { name: 'Series 1', cards: 27 },
      { name: 'Series 2', cards: 27 },
    ],
    accentColor: '#C62828',
    accentBg: '#FFCDD2',
  },
  {
    id: 'poke-emerald',
    name: 'Pokémon Battle-e+',
    franchise: 'Pokémon',
    regions: ['JP'],
    dates: 'March 2004 – August 2004',
    totalCards: '76 cards',
    excerpt: `Pokémon Battle-e+ was a Japan-exclusive expansion that worked with Pokémon Emerald, taking full advantage of the enhanced hardware connectivity between the GBA and the e-Reader+. The set featured more complex trainer battles and team compositions than its predecessor, with some cards encoding full teams of six Pokémon with competitive movesets.\n\nThis set represented the pinnacle of the Pokémon e-Reader card experience, with the most sophisticated encoded data of any Pokémon card set. The cards were distributed in booster packs exclusive to Japanese retail.`,
    subSeries: [
      { name: 'Set A', cards: 38 },
      { name: 'Set B', cards: 38 },
    ],
    accentColor: '#2E7D32',
    accentBg: '#C8E6C9',
  },
  {
    id: 'nes-classics',
    name: 'NES Classics',
    franchise: 'NES',
    regions: ['US', 'JP'],
    dates: 'November 2002 – March 2003',
    totalCards: '40 cards',
    excerpt: `The NES Classics e-Reader card series brought full classic NES games to the Game Boy Advance through a set of scannable cards. Each game required scanning a strip of 5 cards in sequence, with the dot-code strips containing the entire ROM data of classic titles like Donkey Kong, Excitebike, and Balloon Fight.\n\nThis was perhaps the most technically impressive use of the e-Reader technology — encoding complete, playable NES games onto printed cards. The series demonstrated the remarkable data density of the dot-code format and served as a preview of the Virtual Console concept Nintendo would later develop for the Wii.`,
    subSeries: [
      { name: 'Series 1', cards: 20 },
      { name: 'Series 2', cards: 20 },
    ],
    accentColor: '#1565C0',
    accentBg: '#BBDEFB',
  },
  {
    id: 'super-mario',
    name: 'Super Mario Advance 4',
    franchise: 'Mario',
    regions: ['US', 'JP', 'AU'],
    dates: 'October 2003 – October 2004',
    totalCards: '38 cards (US) · 68 cards (JP)',
    excerpt: `The Super Mario Advance 4: Super Mario Bros. 3 e-Reader cards unlocked entirely new levels, power-ups, and gameplay modifications in what was essentially the first official Mario level DLC. By scanning cards, players could access the "World-e" area containing brand-new courses designed specifically for the card expansion.\n\nJapan received significantly more cards than North America, including additional level cards that were never officially released outside Japan. These Japan-exclusive levels became legendary among Mario fans and were eventually made available to all players in the Wii U Virtual Console re-release decades later.`,
    subSeries: [
      { name: 'Power-Up Cards', cards: 12 },
      { name: 'Level Cards', cards: 18, region: 'US' },
      { name: 'Level Cards (JP Extra)', cards: 30, region: 'JP' },
      { name: 'Demo Cards', cards: 8 },
    ],
    accentColor: '#E53935',
    accentBg: '#FFCDD2',
  },
  {
    id: 'kirby',
    name: 'Kirby Slide',
    franchise: 'Kirby',
    regions: ['US'],
    dates: 'November 2003',
    totalCards: '12 cards',
    excerpt: `Kirby Slide was a simple but charming sliding puzzle mini-game distributed as an e-Reader card set. Scanning the cards loaded a tile-sliding puzzle game featuring Kirby artwork, offering a quick portable diversion that showcased the e-Reader's ability to deliver small standalone games.\n\nThe set was notable for being one of the smallest e-Reader releases and one of the few that functioned entirely as a standalone GBA game without needing a separate game cartridge connected.`,
    subSeries: [
      { name: 'Puzzle Set', cards: 12 },
    ],
    accentColor: '#E91E90',
    accentBg: '#FCE4EC',
  },
  {
    id: 'manhole',
    name: 'Game & Watch-e',
    franchise: 'Game & Watch',
    regions: ['US', 'JP'],
    dates: 'November 2002 – 2003',
    totalCards: '20 cards',
    excerpt: `Game & Watch-e recreated classic Game & Watch handheld titles as e-Reader card games. Each set of cards encoded a complete Game & Watch title, bringing Manhole, Flagman, and other LCD classics to the GBA with faithful recreations of the original gameplay and visual style.\n\nThe series was a nostalgic celebration of Nintendo's earliest portable gaming history, encoded onto cards using the same dot-code technology. Each game maintained the distinctive dual-screen LCD aesthetic of the original Game & Watch hardware.`,
    subSeries: [
      { name: 'Collection 1', cards: 10 },
      { name: 'Collection 2', cards: 10 },
    ],
    accentColor: '#795548',
    accentBg: '#D7CCC8',
  },
  {
    id: 'pokemon-ruby',
    name: 'Pokémon Ruby & Sapphire',
    franchise: 'Pokémon',
    regions: ['JP'],
    dates: 'March 2003',
    totalCards: '48 cards',
    excerpt: `The original Japanese Pokémon e-Reader card set for Ruby & Sapphire introduced trainer battles and Berry data distribution through scannable cards. This set laid the groundwork for the later Pokémon Battle-e series released in North America, though with different card compositions and trainer configurations.\n\nAs a Japan-exclusive release, these cards took advantage of the e-Reader+'s enhanced scanning capabilities and featured packaging and card designs distinct from the later international versions.`,
    subSeries: [
      { name: 'Trainer Battle', cards: 32 },
      { name: 'Berry Cards', cards: 16 },
    ],
    accentColor: '#D32F2F',
    accentBg: '#FFEBEE',
  },
  {
    id: 'doubutsu-plus',
    name: 'Doubutsu no Mori+ Card-e',
    franchise: 'Animal Crossing',
    regions: ['JP'],
    dates: 'December 2001 – March 2002',
    totalCards: '307 cards',
    excerpt: `Doubutsu no Mori+ Card-e was the original Japanese Animal Crossing e-Reader card series, preceding the North American Animal Crossing-e by nearly a year. The set featured villager cards, design pattern cards, and NES game unlock cards that worked with the Japanese GameCube title Doubutsu no Mori+.\n\nNearly all cards from this set were later localized for the North American Animal Crossing-e release, with the notable exception of card 252 — Katrina in her shrine maiden outfit, which was deemed too culturally specific for localization.`,
    subSeries: [
      { name: 'Series 1', cards: 72 },
      { name: 'Series 2', cards: 72 },
      { name: 'Series 3', cards: 72 },
      { name: 'Series 4', cards: 72 },
      { name: 'Promotional', cards: 19 },
    ],
    accentColor: '#388E3C',
    accentBg: '#C8E6C9',
  },
  {
    id: 'air-hockey',
    name: 'Air Hockey-e',
    franchise: 'Sports',
    regions: ['US'],
    dates: 'November 2002',
    totalCards: '6 cards',
    excerpt: `Air Hockey-e was one of the simplest e-Reader card sets, encoding a basic but fun air hockey game playable entirely on the GBA. The complete game could be loaded by scanning just a few cards, making it one of the most accessible e-Reader experiences for newcomers to the peripheral.\n\nDespite its simplicity, Air Hockey-e demonstrated the potential of card-based game distribution and was often bundled with the e-Reader hardware as an introductory experience.`,
    subSeries: [
      { name: 'Complete Set', cards: 6 },
    ],
    accentColor: '#0277BD',
    accentBg: '#B3E5FC',
  },
  {
    id: 'mario-party',
    name: 'Mario Party-e',
    franchise: 'Mario',
    regions: ['US'],
    dates: 'February 2003',
    totalCards: '64 cards',
    excerpt: `Mario Party-e was a unique physical card game that used the e-Reader to enhance a traditional tabletop Mario Party experience. Players would physically play cards from their hand, then scan them on the e-Reader to trigger GBA-based mini-games that determined the winner of each round.\n\nThis hybrid physical-digital format was one of the most creative uses of the e-Reader technology, essentially creating a board-game-meets-video-game experience that presaged modern toys-to-life concepts like Skylanders and Amiibo.`,
    subSeries: [
      { name: 'Character Cards', cards: 16 },
      { name: 'Mini-Game Cards', cards: 32 },
      { name: 'Item Cards', cards: 16 },
    ],
    accentColor: '#F57F17',
    accentBg: '#FFF9C4',
  },
];

const FILTER_TABS = ['All', 'Animal Crossing', 'Pokémon', 'Mario', 'NES Classics', 'Japan Exclusive'];

function RegionBadge({ region }: { region: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    US: { bg: '#1565C0', text: '#fff' },
    JP: { bg: '#C62828', text: '#fff' },
    AU: { bg: '#2E7D32', text: '#fff' },
  };
  const c = colors[region] || { bg: '#888', text: '#fff' };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5"
      style={{ backgroundColor: c.bg, color: c.text, fontFamily: font.mono, fontSize: '11px' }}
    >
      {region}
    </span>
  );
}

function SeriesLogoPlaceholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="h-20 flex items-center justify-center rounded-lg px-6"
      style={{ backgroundColor: accent + '33', border: `2px solid ${accent}55` }}
    >
      <span style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 700, color: accent }}>
        {name}
      </span>
    </div>
  );
}

function BoosterPlaceholder({ accent, label }: { accent: string; label: string }) {
  return (
    <div
      className="rounded-lg flex items-end justify-center overflow-hidden"
      style={{
        backgroundColor: accent + '22',
        border: `1.5px solid ${accent}44`,
        width: '120px',
        height: '180px',
      }}
    >
      <span
        className="pb-3 text-center px-2"
        style={{ fontFamily: font.body, fontSize: '11px', color: accent, opacity: 0.7 }}
      >
        {label}
      </span>
    </div>
  );
}

function SeriesSection({ series, index }: { series: SeriesEntry; index: number }) {
  const bgColor = index % 2 === 0 ? color.cream : color.sandBg;

  return (
    <section className="py-14 px-4 md:px-0" style={{ backgroundColor: bgColor }}>
      <div className="max-w-6xl mx-auto">
        {/* Top row — Identity */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex-1">
            {series.logo ? (
              <img src={series.logo} alt={series.name} className="h-20 object-contain mb-3" />
            ) : (
              <div className="mb-3">
                <SeriesLogoPlaceholder name={series.name} accent={series.accentColor} />
              </div>
            )}
            <h2 className="mb-2" style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 700, color: color.sienna }}>
              {series.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {series.regions.map(r => (
                <RegionBadge key={r} region={r} />
              ))}
              <span style={{ fontFamily: font.mono, fontSize: '13px', color: '#8B7355' }}>
                {series.dates}
              </span>
            </div>
            <span
              className="inline-block rounded-full px-3 py-1"
              style={{ backgroundColor: color.rust, color: '#fff', fontFamily: font.mono, fontSize: '13px' }}
            >
              {series.totalCards}
            </span>
          </div>
        </div>

        {/* Middle row — two columns */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-[55%]">
            {series.excerpt.split('\n\n').map((p, i) => (
              <p
                key={i}
                className="mb-4"
                style={{ fontFamily: font.body, fontSize: '16px', lineHeight: 1.7, color: color.sienna }}
              >
                {p}
              </p>
            ))}
            {series.relatedSets && (
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: series.accentBg + '88', border: `1px solid ${series.accentColor}33` }}>
                <span style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: series.accentColor }}>
                  Related JP Sets:
                </span>
                <span style={{ fontFamily: font.body, fontSize: '13px', color: color.sienna }}>
                  {' '}{series.relatedSets.join(' · ')}
                </span>
              </div>
            )}
          </div>
          <div className="lg:w-[45%]">
            <div className="flex gap-4 flex-wrap justify-center lg:justify-end">
              {series.boosterImages ? (
                series.boosterImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${series.name} booster pack ${i + 1}`}
                    className="h-56 object-contain rounded-lg shadow-md"
                  />
                ))
              ) : (
                <>
                  <BoosterPlaceholder accent={series.accentColor} label={`${series.name} Pack`} />
                  <BoosterPlaceholder accent={series.accentColor} label="Variant" />
                </>
              )}
            </div>
            {series.imageCaption && (
              <p className="text-center mt-3" style={{ fontFamily: font.body, fontSize: '12px', color: '#8B7355' }}>
                {series.imageCaption}
              </p>
            )}
          </div>
        </div>

        {/* Bottom row — sub-series chips + view button */}
        <div className="flex flex-wrap items-center gap-3">
          {series.subSeries.map(sub => (
            <span
              key={sub.name}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border"
              style={{
                borderColor: series.accentColor + '44',
                backgroundColor: series.accentBg + '66',
                fontFamily: font.body,
                fontSize: '13px',
                color: color.sienna,
              }}
            >
              {sub.name}
              <span style={{ fontFamily: font.mono, fontSize: '11px', opacity: 0.7 }}>
                {sub.cards}
              </span>
              {sub.region && <RegionBadge region={sub.region} />}
            </span>
          ))}
          <Link
            to={`/series/${series.id}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-5 py-2 no-underline transition-opacity hover:opacity-80"
            style={{ backgroundColor: color.rust, color: '#fff', fontFamily: font.body, fontSize: '14px', fontWeight: 600 }}
          >
            View all cards <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AllSeriesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? ALL_SERIES
    : activeFilter === 'Japan Exclusive'
      ? ALL_SERIES.filter(s => s.regions.length === 1 && s.regions[0] === 'JP')
      : ALL_SERIES.filter(s => s.franchise === activeFilter || s.name.includes(activeFilter));

  return (
    <div className="min-h-screen" style={{ backgroundColor: color.cream }}>
      {/* Page Header */}
      <header className="border-b" style={{ borderColor: color.sienna + '22' }}>
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-4">
            <Link to="/" className="no-underline" style={{ fontFamily: font.body, fontSize: '13px', color: '#8B7355' }}>
              e-Reader Archive
            </Link>
            <ChevronRight size={13} color="#8B7355" />
            <span style={{ fontFamily: font.body, fontSize: '13px', color: color.sienna, fontWeight: 600 }}>
              All Series
            </span>
          </div>

          <h1 className="mb-2" style={{ fontFamily: font.display, fontSize: '42px', fontWeight: 700, color: color.sienna }}>
            All Series
          </h1>
          <p className="mb-6" style={{ fontFamily: font.body, fontSize: '18px', color: '#8B7355', lineHeight: 1.5 }}>
            Every card series released for the Nintendo e-Reader, 2001–2008
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { label: '11 Series', icon: null },
              { label: '1,000+ Cards', icon: null },
              { label: 'US · JP · AU', icon: <Globe size={13} /> },
            ].map(stat => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 border"
                style={{
                  borderColor: color.sienna + '33',
                  fontFamily: font.mono,
                  fontSize: '13px',
                  color: color.sienna,
                  backgroundColor: '#fff8',
                }}
              >
                {stat.icon}
                {stat.label}
              </span>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="rounded-full px-4 py-1.5 border transition-colors cursor-pointer"
                style={{
                  fontFamily: font.body,
                  fontSize: '13px',
                  fontWeight: 500,
                  backgroundColor: activeFilter === tab ? color.rust : 'transparent',
                  color: activeFilter === tab ? '#fff' : color.sienna,
                  borderColor: activeFilter === tab ? color.rust : color.sienna + '33',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Series Sections */}
      {filtered.map((series, i) => (
        <SeriesSection key={series.id} series={series} index={i} />
      ))}

      {/* Footer spacer */}
      <div className="h-20" style={{ backgroundColor: color.cream }} />
    </div>
  );
}
