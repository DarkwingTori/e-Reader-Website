import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Cpu, Cable, Monitor, Gamepad2, ArrowRight, AlertTriangle, Zap, HardDrive, Scan, Layers, ArrowDown } from 'lucide-react';

/* ─── Shared styles ─── */
const font = {
  display: { fontFamily: 'Bitter, serif', fontWeight: 700 },
  body: { fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7 },
  mono: { fontFamily: 'JetBrains Mono, monospace' },
  label: { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#E35336' },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3" style={font.label}>{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6" style={{ ...font.display, fontSize: 'clamp(28px, 4vw, 42px)', color: '#A0522D', margin: 0, marginBottom: '24px' }}>{children}</h2>;
}

function Divider() {
  return <div className="w-full h-px bg-[#A0522D]/15 my-2" />;
}

/* ─── Timeline data ─── */
const TIMELINE = [
  { year: '2001', month: 'Dec', title: 'Card-e Reader launches in Japan', desc: 'The original Card-e Reader debuts alongside Pokémon Card-e Starter Deck and Animal Crossing card series. Over 1 million units sold in the first month.' },
  { year: '2002', month: 'Sep', title: 'e-Reader launches in North America', desc: 'Nintendo brings the e-Reader to the US bundled with sample cards including an Excitebike NES game. Retail price: $39.99.' },
  { year: '2002', month: 'Nov', title: 'Animal Crossing e-Reader support', desc: 'Animal Crossing-e Series 1 launches with 64 cards featuring character cards, town tunes, designs, and NES game unlock cards.' },
  { year: '2003', month: 'Mar', title: 'Pokémon Battle-e releases', desc: 'Battle-e Series 1 brings 64 cards compatible with Pokémon Ruby & Sapphire, adding exclusive trainer battles via e-Reader scanning.' },
  { year: '2003', month: 'Jun', title: 'Card-e Reader+ launches in Japan', desc: 'The updated e-Reader+ features a faster scanner, larger flash memory buffer, and a folding form factor. Required for all future JP e-Reader games.' },
  { year: '2003', month: 'Oct', title: 'Super Mario Advance 4 e-World', desc: 'SMA4 introduces the most ambitious e-Reader content: scannable level cards that permanently write new stages to the game cartridge\'s save data.' },
  { year: '2003', month: 'Oct', title: 'e-Reader launches in Australia', desc: 'The final Western market to receive the e-Reader. Limited card series availability compared to US and JP.' },
  { year: '2004', month: 'Jan', title: 'Pokémon FireRed/LeafGreen (JP)', desc: 'Japanese versions include e-Reader+ support for Battle-e+ trainer cards. This feature is removed from all Western releases.' },
  { year: '2004', month: 'Sep', title: 'Pokémon Emerald (JP) e-Reader+', desc: 'The final major Pokémon title with e-Reader support. Battle Frontier trainer cards exclusive to Japan.' },
  { year: '2004', month: 'Nov', title: 'Nintendo DS launches', desc: 'The DS lacks a GBA Link Cable port, making e-Reader data transfers impossible. This effectively begins the end of the e-Reader era.' },
  { year: '2008', month: '', title: 'Final e-Reader+ cards in Japan', desc: 'The last e-Reader compatible cards are released in Japan, marking the quiet end of Nintendo\'s paper-to-digital experiment after 7 years.' },
];

/* ─── Section 1: Hero ─── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #A0522D 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="flex-1">
            <SectionLabel>Hardware</SectionLabel>
            <h1 className="mb-6" style={{ ...font.display, fontSize: 'clamp(42px, 6vw, 72px)', color: '#A0522D', lineHeight: 1.05, margin: 0, marginBottom: '24px' }}>
              The Nintendo<br />e-Reader
            </h1>
            <p className="mb-6 max-w-lg" style={{ ...font.body, fontSize: '18px', color: '#5C4033' }}>
              The Game Boy Advance peripheral that turned paper cards into playable content — and changed how Nintendo thought about downloadable content forever.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-white/60 border border-[#A0522D]/15" style={{ ...font.mono, fontSize: '13px', color: '#A0522D' }}>Released: 2001 – 2008</span>
              <span className="px-4 py-2 rounded-full bg-white/60 border border-[#A0522D]/15" style={{ ...font.mono, fontSize: '13px', color: '#A0522D' }}>Regions: JP · US · AU</span>
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg max-w-[380px] w-full">
              <div
                className="w-full flex items-center justify-center rounded-2xl border border-[#A0522D]/20"
                style={{ aspectRatio: '4/3', backgroundColor: 'rgba(160,82,45,0.07)', minHeight: '200px' }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#A0522D', opacity: 0.45 }}>
                  e-Reader packaging image coming soon
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {[
                { label: 'Card-e Reader', year: '2001 (JP)', color: '#1565C0' },
                { label: 'e-Reader', year: '2002 (US)', color: '#A0522D' },
                { label: 'Card-e Reader+', year: '2003 (JP)', color: '#E35336' },
              ].map(v => (
                <div key={v.label} className="text-center px-3 py-2 rounded-lg border border-[#A0522D]/10 bg-white/40">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-1 flex items-center justify-center" style={{ backgroundColor: v.color + '18' }}>
                    <Cpu size={18} style={{ color: v.color }} />
                  </div>
                  <p style={{ ...font.body, fontSize: '11px', fontWeight: 600, color: '#A0522D', margin: 0 }}>{v.label}</p>
                  <p style={{ ...font.mono, fontSize: '10px', color: '#8B7355', margin: 0 }}>{v.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: What Is the e-Reader ─── */
function WhatIsSection() {
  const specs = [
    ['Developer', 'HAL Laboratory + Olympus'],
    ['Released', 'Dec 1, 2001 (JP)'],
    ['', 'Sep 16, 2002 (US)'],
    ['', 'Oct 31, 2003 (AU)'],
    ['Flash Memory', '8 MB'],
    ['Mask ROM', '64 MB'],
    ['Dot Code', 'Olympus Dot Code Technology'],
    ['Card Data', '1.4 KB (short) / 2.2 KB (long)'],
    ['NES Storage', '9–10 cards per full NES game'],
    ['Interface', 'GBA cartridge slot'],
    ['Link', 'GBA Link Cable passthrough'],
  ];
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>Overview</SectionLabel>
        <SectionTitle>What is the e-Reader?</SectionTitle>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <p className="mb-5" style={{ ...font.body, fontSize: '16px', color: '#5C4033' }}>
              The Nintendo e-Reader is a Game Boy Advance accessory developed jointly by HAL Laboratory, Creatures Inc., and Olympus Corporation. It plugs directly into the GBA cartridge slot and contains an LED optical scanner capable of reading specially printed paper cards called e-Reader cards — or e-Cards.
            </p>
            <p style={{ ...font.body, fontSize: '16px', color: '#5C4033' }}>
              Unlike conventional game cartridges, e-Reader cards store actual executable data encoded as a proprietary dot code format developed by Olympus. When a card is swiped through the e-Reader's scanner slot, the device reads and temporarily stores the data in its onboard 8 MB flash memory. This data can then be used to run standalone minigames directly on the GBA, or — using a Game Link Cable — transfer content to a connected GBA game cartridge or a Nintendo GameCube game.
            </p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="rounded-xl border border-[#A0522D]/20 bg-white/50 p-6">
              <h3 className="mb-4" style={{ ...font.display, fontSize: '18px', color: '#A0522D' }}>Hardware Specifications</h3>
              <div className="flex flex-col gap-0">
                {specs.map(([label, value], i) => (
                  <div key={i} className={`flex gap-3 py-1.5 ${label ? 'border-t border-[#A0522D]/8 mt-1 pt-2' : ''}`}>
                    <span className="w-28 flex-shrink-0" style={{ ...font.mono, fontSize: '11px', color: '#8B7355' }}>{label}</span>
                    <span style={{ ...font.mono, fontSize: '12px', color: '#A0522D' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Dot Code Technology ─── */
function DotCodeSection() {
  const columns = [
    {
      icon: <Layers size={28} />,
      title: 'The Card',
      labels: ['Long strip (side) — 2.2 KB', 'Short strip (bottom) — 1.4 KB', 'Card dimensions: 2.5 × 3.5 in', '9–10 cards = one full NES game'],
      text: 'Each e-Reader card carries its data in Olympus\'s proprietary Dot Code format — a specialized barcode-like grid of microscopic dots printed on the card edge. Unlike a standard barcode which encodes only a reference number, Dot Code stores actual compressed and encrypted executable data. A single long strip holds 2.2 KB; a short strip holds 1.4 KB. Cards can use both sides, effectively doubling capacity.',
    },
    {
      icon: <Scan size={28} />,
      title: 'The Scanner',
      labels: ['LED light source', 'Optical sensor array', '8 MB onboard flash storage', 'Card swiped right-to-left'],
      text: 'Swiping a card through the e-Reader\'s scanner slot passes the dot code strip across an LED optical sensor. The sensor reads the dot pattern at high speed and decodes it into binary data, which is then written to the e-Reader\'s 8 MB flash memory. The process takes roughly one to two seconds per swipe. Multi-card data — like a full NES game requiring 10 cards — must be scanned sequentially.',
    },
    {
      icon: <Cable size={28} />,
      title: 'The Transfer',
      labels: ['GBA Link Cable protocol', 'GBA–GameCube Cable support', 'Standalone execution mode', 'Passthrough link port preserved'],
      text: 'Once data is stored in flash memory, it can be used in three ways: run standalone on the e-Reader itself, transferred via Game Link Cable to a second GBA running a compatible game cartridge, or sent via GBA–GameCube Cable to a compatible GameCube game. The e-Reader\'s passthrough connector preserves the link port, allowing the cable to connect normally.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F4A460]/15">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>Dot Code Technology</SectionLabel>
        <SectionTitle>How a paper card becomes a playable game</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col">
              {/* Diagram placeholder */}
              <div className="rounded-xl bg-white/60 border border-[#A0522D]/10 p-6 mb-5 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E35336]/10 flex items-center justify-center mb-4 text-[#E35336]">
                  {col.icon}
                </div>
                <h3 className="mb-4" style={{ ...font.display, fontSize: '20px', color: '#A0522D' }}>{col.title}</h3>
                <div className="flex flex-col gap-2 w-full">
                  {col.labels.map((l, j) => (
                    <div key={j} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#A0522D]/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E35336]" />
                      <span style={{ ...font.mono, fontSize: '11px', color: '#A0522D' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              {i < 2 && (
                <div className="hidden md:flex justify-center -mt-3 mb-3">
                  <ArrowRight size={20} className="text-[#E35336]/40" />
                </div>
              )}
              <p style={{ ...font.body, fontSize: '14px', color: '#5C4033' }}>{col.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: GBA Connectivity ─── */
function GBAConnectivitySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>GBA Integration</SectionLabel>
        <SectionTitle>Two Game Boy Advances, one link cable</SectionTitle>

        {/* Connection diagram */}
        <div className="rounded-2xl bg-white/50 border border-[#A0522D]/12 p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            {/* GBA 1 */}
            <div className="text-center p-5 rounded-xl bg-[#E35336]/5 border border-[#E35336]/15">
              <Gamepad2 size={40} className="mx-auto mb-2 text-[#E35336]" />
              <p style={{ ...font.display, fontSize: '14px', color: '#A0522D', margin: 0 }}>Player 1</p>
              <p style={{ ...font.mono, fontSize: '11px', color: '#8B7355', margin: 0 }}>e-Reader GBA</p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-white" style={{ fontSize: '10px', fontFamily: 'DM Sans', fontWeight: 600, backgroundColor: '#888' }}>Gray end</span>
            </div>

            {/* Cable */}
            <div className="flex flex-col items-center gap-1">
              <div className="hidden md:flex items-center gap-1">
                <div className="w-16 h-0.5 bg-[#A0522D]/30" />
                <Cable size={20} className="text-[#A0522D]/50" />
                <div className="w-16 h-0.5 bg-[#A0522D]/30" />
              </div>
              <ArrowDown size={16} className="md:hidden text-[#A0522D]/30" />
              <p style={{ ...font.mono, fontSize: '10px', color: '#8B7355', margin: 0 }}>Game Link Cable</p>
              <div className="flex items-center gap-1 mt-1">
                <Zap size={10} className="text-[#F4A460]" />
                <span style={{ ...font.mono, fontSize: '9px', color: '#A0522D' }}>Card data → Flash → Link → Save</span>
              </div>
            </div>

            {/* GBA 2 */}
            <div className="text-center p-5 rounded-xl bg-purple-500/5 border border-purple-400/15">
              <Gamepad2 size={40} className="mx-auto mb-2 text-purple-600" />
              <p style={{ ...font.display, fontSize: '14px', color: '#A0522D', margin: 0 }}>Player 2</p>
              <p style={{ ...font.mono, fontSize: '11px', color: '#8B7355', margin: 0 }}>Game GBA</p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-white" style={{ fontSize: '10px', fontFamily: 'DM Sans', fontWeight: 600, backgroundColor: '#7B1FA2' }}>Purple end</span>
            </div>
          </div>
        </div>

        {/* Two column text */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <p className="mb-5" style={{ ...font.body, fontSize: '16px', color: '#5C4033' }}>
              To transfer e-Card data to a game like Super Mario Advance 4 or Pokémon Ruby, two Game Boy Advance systems and a Game Link Cable are required. The e-Reader GBA connects via the Player 1 (gray) end of the Link Cable; the game GBA uses the Player 2 (purple) end.
            </p>
            <p style={{ ...font.body, fontSize: '16px', color: '#5C4033' }}>
              After navigating to the e-Reader menu within the compatible game on the second GBA, cards can be swiped one at a time on the first GBA. Data transfers instantly after each scan. For level cards in Super Mario Advance 4, the new level data is written directly to the game cartridge's save file — permanently adding it to the game even after the e-Reader is disconnected.
            </p>
          </div>
          <div className="flex-1">
            <blockquote className="mb-6 pl-5 border-l-3 border-[#E35336]" style={{ borderLeftWidth: '3px' }}>
              <p style={{ fontFamily: 'Bitter, serif', fontStyle: 'italic', fontSize: '20px', color: '#E35336', lineHeight: 1.5 }}>
                "Level card data was written directly to the game save — the content became a permanent part of the cartridge."
              </p>
            </blockquote>
            <div className="rounded-xl bg-[#F4A460]/15 border border-[#A0522D]/15 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-[#A0522D] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1" style={{ ...font.body, fontSize: '13px', fontWeight: 600, color: '#A0522D' }}>Nintendo DS Incompatible</p>
                  <p style={{ ...font.body, fontSize: '13px', color: '#5C4033', margin: 0 }}>
                    The DS and DS Lite lack Game Link Cable support, making GBA-to-GBA e-Reader transfers impossible on those systems. The e-Reader can fit into a DS Lite but cannot transfer data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: GameCube Connectivity ─── */
function GameCubeSection() {
  const cards = [
    { title: 'Animal Crossing', color: '#4A7C59', desc: 'The deepest e-Reader integration on GameCube. Scan Character Cards at the Post Office to receive items, Town Tune Cards at the tune board to set your village song, Design Cards at Able Sisters for custom clothing patterns, and Classic Game Cards to receive NES items for your house.' },
    { title: 'Pokémon Channel', color: '#F9A825', desc: 'Three promotional cards bundled with the game — The Pikachu Star, The Kyogre Constellation (US) / Jirachi (AU), and Poké A la Card. Scanning unlocks Smeargle paint line art within the game.' },
    { title: 'Pikmin 2 (JP only)', color: '#D32F2F', desc: 'Six packs of Pikmin Puzzle Cards released exclusively in Japan. Requires a Japanese GameCube, Japanese e-Reader+, and Japanese copy of Pikmin 2. Minigames challenge players to guide Pikmin under specific conditions.' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F4A460]/15">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>GameCube Integration</SectionLabel>
        <SectionTitle>From a paper card to your GameCube village</SectionTitle>

        {/* Connection diagram */}
        <div className="rounded-2xl bg-white/50 border border-[#A0522D]/12 p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="text-center p-5 rounded-xl bg-[#E35336]/5 border border-[#E35336]/15">
              <Gamepad2 size={36} className="mx-auto mb-2 text-[#E35336]" />
              <p style={{ ...font.display, fontSize: '13px', color: '#A0522D', margin: 0 }}>GBA + e-Reader</p>
              <p style={{ ...font.mono, fontSize: '10px', color: '#8B7355', margin: 0 }}>Card scanner</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="hidden md:flex items-center gap-1">
                <div className="w-12 h-0.5 bg-[#A0522D]/30" />
                <Cable size={18} className="text-[#A0522D]/50" />
                <div className="w-12 h-0.5 bg-[#A0522D]/30" />
              </div>
              <ArrowDown size={16} className="md:hidden text-[#A0522D]/30" />
              <p style={{ ...font.mono, fontSize: '10px', color: '#8B7355', margin: 0 }}>GBA–GameCube Cable</p>
            </div>
            <div className="text-center p-5 rounded-xl bg-purple-500/5 border border-purple-400/15">
              <Monitor size={36} className="mx-auto mb-2 text-purple-600" />
              <p style={{ ...font.display, fontSize: '13px', color: '#A0522D', margin: 0 }}>Nintendo GameCube</p>
              <p style={{ ...font.mono, fontSize: '10px', color: '#8B7355', margin: 0 }}>Host console</p>
            </div>
          </div>
          <p className="text-center mt-5" style={{ ...font.body, fontSize: '12px', color: '#8B7355' }}>
            The GameCube running the game acts as the host — the GBA with e-Reader is the peripheral.
            <br />Alternative: Game Boy Player plugged into GameCube with e-Reader inserted.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(c => (
            <div key={c.title} className="rounded-xl bg-white/70 border border-[#A0522D]/10 p-6">
              <div className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: c.color + '18' }}>
                <Gamepad2 size={20} style={{ color: c.color }} />
              </div>
              <h3 className="mb-3" style={{ ...font.display, fontSize: '16px', color: '#A0522D' }}>{c.title}</h3>
              <p style={{ ...font.body, fontSize: '14px', color: '#5C4033', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: Hardware Versions ─── */
function HardwareVersionsSection() {
  const versions = [
    {
      name: 'Card-e Reader',
      region: 'Japan',
      year: 'December 2001',
      color: '#1565C0',
      features: ['Original form factor — plugs into GBA cartridge slot', 'LED optical scanner with right-to-left swipe', '8 MB flash memory, 64 MB mask ROM', 'Passthrough link port for Game Link Cable', 'Compatible with all JP Card-e card series', 'Flat, non-folding design'],
      note: 'The original. Launched alongside Pokémon Card-e and Animal Crossing card series in Japan.',
    },
    {
      name: 'e-Reader',
      region: 'US / Australia',
      year: 'Sep 2002 (US) · Oct 2003 (AU)',
      color: '#A0522D',
      features: ['Same core hardware as JP Card-e Reader', 'Region-locked to US/AU e-Reader cards', 'Compatible with GBA and GBA SP', 'Game Link Cable passthrough support', 'Fits in DS Lite slot (but no link transfer)', 'Bundled with Excitebike sample cards'],
      note: 'The Western release. Identical hardware, region-locked card format. Never officially supported on DS.',
    },
    {
      name: 'Card-e Reader+',
      region: 'Japan',
      year: 'June 2003',
      color: '#E35336',
      features: ['Folding form factor — more compact design', 'Improved faster scanner mechanism', 'Larger flash memory buffer for bigger programs', 'Required for all post-2003 JP e-Reader games', 'Backward compatible with original Card-e cards', 'Exclusive to Japan — never released outside JP'],
      note: 'The upgraded model. Required for Pokémon FireRed/LeafGreen, Emerald, and all late-era JP e-Reader titles.',
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>Hardware Versions</SectionLabel>
        <SectionTitle>Three releases, two generations</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {versions.map(v => (
            <div key={v.name} className="rounded-xl border-2 bg-white/50 p-6 flex flex-col" style={{ borderColor: v.color + '30' }}>
              <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: v.color + '12' }}>
                <Cpu size={28} style={{ color: v.color }} />
              </div>
              <h3 style={{ ...font.display, fontSize: '20px', color: v.color, margin: 0, marginBottom: '4px' }}>{v.name}</h3>
              <p className="mb-1" style={{ ...font.body, fontSize: '13px', color: '#A0522D', fontWeight: 600, margin: 0 }}>{v.region}</p>
              <p className="mb-4" style={{ ...font.mono, fontSize: '11px', color: '#8B7355', margin: 0 }}>{v.year}</p>
              <Divider />
              <ul className="mt-4 mb-4 flex flex-col gap-2 list-none p-0 flex-1">
                {v.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: v.color }} />
                    <span style={{ ...font.body, fontSize: '13px', color: '#5C4033' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Divider />
              <p className="mt-3" style={{ ...font.body, fontSize: '12px', color: '#8B7355', fontStyle: 'italic', margin: 0 }}>{v.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: Timeline ─── */
function TimelineSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-[#F4A460]/15">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel>History</SectionLabel>
        <SectionTitle>The complete e-Reader timeline</SectionTitle>
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#A0522D]/15 -translate-x-1/2" />
          {TIMELINE.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex items-start mb-8 cursor-pointer group ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                {/* Node */}
                <div className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#E35336] bg-[#F5F5DC] -translate-x-1/2 z-10 group-hover:bg-[#E35336] transition-colors" />
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-30px)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <span className="inline-block mb-1" style={{ ...font.mono, fontSize: '12px', color: '#E35336' }}>{ev.year}{ev.month ? ` · ${ev.month}` : ''}</span>
                  <h4 className="mb-1" style={{ ...font.display, fontSize: '16px', color: '#A0522D', margin: 0, marginBottom: '4px' }}>{ev.title}</h4>
                  <p
                    className={`transition-all duration-200 overflow-hidden ${expanded === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ ...font.body, fontSize: '13px', color: '#5C4033', margin: 0 }}
                  >
                    {ev.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: Bottom CTA ─── */
function BottomCTA() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="mb-4" style={{ ...font.display, fontSize: 'clamp(24px, 3vw, 36px)', color: '#A0522D' }}>
          Explore the full card archive
        </h2>
        <p className="mb-8 max-w-lg mx-auto" style={{ ...font.body, fontSize: '16px', color: '#5C4033' }}>
          Browse every e-Reader card series, check game compatibility, or start tracking your personal collection.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/database" className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E35336] text-white hover:bg-[#c9442b] transition-colors" style={{ ...font.body, fontWeight: 600, fontSize: '14px' }}>
            Browse Card Database <ChevronRight size={16} />
          </Link>
          <Link to="/compatibility" className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#A0522D] text-[#A0522D] hover:bg-[#A0522D]/10 transition-colors" style={{ ...font.body, fontWeight: 600, fontSize: '14px' }}>
            Game Compatibility <ChevronRight size={16} />
          </Link>
          <Link to="/collection" className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#A0522D] text-[#A0522D] hover:bg-[#A0522D]/10 transition-colors" style={{ ...font.body, fontWeight: 600, fontSize: '14px' }}>
            My Collection <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export function EReaderPage() {
  return (
    <div>
      <HeroSection />
      <WhatIsSection />
      <DotCodeSection />
      <GBAConnectivitySection />
      <GameCubeSection />
      <HardwareVersionsSection />
      <TimelineSection />
      <BottomCTA />
    </div>
  );
}
