import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { supabase, toEReaderCard, toSeries } from '../../lib/supabase';
import type { EReaderCard, Series } from '../data/mockData';
import { CardComponent } from '../components/CardComponent';
import { ArrowLeft } from 'lucide-react';

export function SeriesPage() {
  const { id } = useParams();
  const [series, setSeries] = useState<Series | null>(null);
  const [seriesCards, setSeriesCards] = useState<EReaderCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      supabase.from('series').select('*').eq('id', id).single(),
      supabase.from('cards').select('*').eq('series_id', id).order('card_number'),
    ]).then(([{ data: seriesData }, { data: cardsData }]) => {
      setSeries(seriesData ? toSeries(seriesData) : null);
      setSeriesCards(cardsData?.map(toEReaderCard) ?? []);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p style={{ color: '#8B7355' }}>Loading series…</p>
    </div>
  );

  if (!series) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p style={{ color: '#8B7355' }}>Series not found.</p>
      <Link to="/database" className="text-[#E35336] mt-4 inline-block">Back to Database</Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16" style={{ background: `linear-gradient(135deg, ${series.accentColor}, ${series.accentColor}CC)` }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #FFF 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <Link to="/database" className="inline-flex items-center gap-1 no-underline text-white/80 hover:text-white mb-4" style={{ fontSize: '14px' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="text-white" style={{ fontFamily: 'Bitter', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700 }}>{series.name}</h1>
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              ['Game', series.game],
              ['Region', series.region],
              ['Released', series.releaseDate],
              ['Cards', `${series.totalCards}`],
            ].map(([l, v]) => (
              <div key={l}>
                <span className="text-white/60" style={{ fontSize: '11px', fontWeight: 500 }}>{l}</span>
                <p className="text-white" style={{ fontFamily: l === 'Cards' ? 'JetBrains Mono' : 'DM Sans', fontSize: '14px', fontWeight: 500 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="mb-4" style={{ fontSize: '13px', color: '#8B7355' }}>{seriesCards.length} cards in this series</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {seriesCards.map(c => <CardComponent key={c.id} card={c} />)}
        </div>
      </div>
    </div>
  );
}
