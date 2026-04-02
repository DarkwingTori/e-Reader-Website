import { EReaderCard } from '../data/mockData';
import { Link } from 'react-router';
import { Star } from 'lucide-react';

const rarityStyles: Record<string, string> = {
  common: 'bg-gray-300 text-gray-700',
  uncommon: 'bg-[#F4A460] text-white',
  rare: 'bg-[#E35336] text-white',
  'ultra-rare': 'bg-[#A0522D] text-white',
};

const regionStyles: Record<string, string> = {
  US: 'bg-blue-500 text-white',
  JP: 'bg-red-500 text-white',
  AU: 'bg-green-600 text-white',
};

export function RarityBadge({ rarity }: { rarity: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${rarityStyles[rarity]}`} style={{ fontSize: '11px', fontWeight: 500 }}>
      {rarity === 'ultra-rare' && <Star size={10} />}
      {rarity.replace('-', ' ')}
    </span>
  );
}

export function RegionBadge({ region }: { region: string }) {
  return (
    <span className={`px-1.5 py-0.5 rounded ${regionStyles[region]}`} style={{ fontSize: '10px', fontWeight: 600 }}>
      {region}
    </span>
  );
}

export function CardComponent({ card }: { card: EReaderCard }) {
  return (
    <Link to={`/card/${card.id}`} className="no-underline group">
      <div className="bg-[#FFFDF5] rounded-lg border border-[rgba(160,82,45,0.3)] overflow-hidden transition-all duration-200 group-hover:scale-[1.03] group-hover:border-[#F4A460] group-hover:shadow-lg cursor-pointer">
        {/* Card image placeholder */}
        <div
          className="aspect-[3/4] flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)` }}
        >
          {card.image ? (
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-xl border-2 border-[rgba(160,82,45,0.2)] flex items-center justify-center" style={{ background: `${card.color}33` }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: card.color, fontWeight: 600 }}>
                {card.cardNumber}
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <RegionBadge region={card.region} />
          </div>
        </div>
        {/* Metadata */}
        <div className="p-3 border-t border-[rgba(160,82,45,0.15)]">
          <p className="truncate" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#3D2B1F' }}>{card.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="truncate" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#8B7355' }}>
              {card.series} · {card.cardNumber}
            </span>
          </div>
          <div className="mt-2">
            <RarityBadge rarity={card.rarity} />
          </div>
        </div>
      </div>
    </Link>
  );
}