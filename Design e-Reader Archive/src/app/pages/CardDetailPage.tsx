import { useParams, Link } from 'react-router';
import { CARDS } from '../data/mockData';
import { RarityBadge, RegionBadge, CardComponent } from '../components/CardComponent';
import { ArrowLeft, RotateCcw, Bookmark, Heart, Repeat } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CardDetailPage() {
  const { id } = useParams();
  const card = CARDS.find(c => c.id === id);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState(card?.status || null);

  useEffect(() => {
    setFlipped(false);
  }, [id]);

  if (!card) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p style={{ color: '#8B7355' }}>Card not found.</p>
      <Link to="/database" className="text-[#E35336] mt-4 inline-block">Back to Database</Link>
    </div>
  );

  const relatedCards = CARDS.filter(c => c.seriesId === card.seriesId && c.id !== card.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/database" className="inline-flex items-center gap-1 no-underline text-[#A0522D] hover:text-[#E35336] mb-6" style={{ fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Database
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card image */}
        <div>
          <div
            className="aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer border border-[rgba(160,82,45,0.3)]"
            onClick={() => setFlipped(!flipped)}
            style={{
              background: `linear-gradient(135deg, ${card.color}22, ${card.color}55)`,
              transition: 'all 0.5s',
            }}
          >
            <div className="h-full flex flex-col items-center justify-center p-8">
              {flipped ? (
                card.imageBack ? (
                  <img
                    src={card.imageBack}
                    alt={`${card.name} - back`}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      objectFit: 'contain',
                      transform: card.backHorizontal ? 'rotate(90deg)' : 'none',
                    }}
                  />
                ) : (
                  <>
                    <p className="text-white/80 mb-2" style={{ fontFamily: 'DM Sans', fontSize: '14px' }}>Dot Code Strip</p>
                    <div className="w-full max-w-xs h-12 rounded bg-black/30 flex items-center justify-center gap-0.5">
                      {Array.from({ length: 40 }, (_, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ height: `${8 + Math.random() * 20}px`, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                      ))}
                    </div>
                    <p className="text-white/50 mt-4" style={{ fontFamily: 'JetBrains Mono', fontSize: '11px' }}>{card.cardNumber}</p>
                  </>
                )
              ) : card.image ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="w-24 h-24 rounded-2xl border-2 flex items-center justify-center mb-4" style={{ borderColor: `${card.color}44`, background: `${card.color}22` }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', color: card.color, fontWeight: 700 }}>{card.cardNumber}</span>
                  </div>
                  <p style={{ fontFamily: 'Bitter', fontSize: '20px', fontWeight: 600, color: '#3D2B1F' }}>{card.name}</p>
                </>
              )}
            </div>
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/80 text-[#A0522D] hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}>
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div>
          <h1 style={{ fontFamily: 'Bitter', fontSize: '32px', fontWeight: 700, color: '#A0522D' }}>{card.name}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <RegionBadge region={card.region} />
            <RarityBadge rarity={card.rarity} />
            <span className="px-2 py-0.5 rounded bg-[#EDE8D5] text-[#8B7355]" style={{ fontSize: '11px', fontWeight: 500 }}>{card.cardType}</span>
          </div>

          <div className="mt-6 space-y-3">
            {[
              ['Series', card.series],
              ['Card Number', card.cardNumber],
              ['Game', card.game],
              ['Region Lock', card.regionLocked ? 'Yes' : 'No'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start gap-4">
                <span className="w-28 flex-shrink-0" style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B7355', fontWeight: 500 }}>{label}</span>
                <span style={{ fontFamily: label === 'Card Number' ? 'JetBrains Mono' : 'DM Sans', fontSize: '14px', color: '#3D2B1F' }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-[#FAF5E8] border border-[rgba(160,82,45,0.15)]">
            <p style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#8B7355', fontWeight: 500 }}>What it unlocks</p>
            <p className="mt-1" style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#3D2B1F' }}>{card.unlocks}</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { key: 'owned' as const, icon: Bookmark, label: 'Owned', color: '#4A7C59' },
              { key: 'wanted' as const, icon: Heart, label: 'Wanted', color: '#E35336' },
              { key: 'trade' as const, icon: Repeat, label: 'Trade', color: '#F4A460' },
            ].map(a => (
              <button
                key={a.key}
                onClick={() => setStatus(status === a.key ? null : a.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all"
                style={{
                  backgroundColor: status === a.key ? a.color : '#FFFDF5',
                  color: status === a.key ? 'white' : '#A0522D',
                  borderColor: status === a.key ? a.color : 'rgba(160,82,45,0.3)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <a.icon size={16} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Related cards */}
      {relatedCards.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-4" style={{ fontFamily: 'Bitter', fontSize: '20px', fontWeight: 600, color: '#A0522D' }}>Related Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedCards.map(c => <CardComponent key={c.id} card={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}