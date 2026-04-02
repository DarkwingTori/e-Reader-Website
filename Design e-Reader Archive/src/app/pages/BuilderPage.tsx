import { useState } from 'react';
import { Download, Plus, X } from 'lucide-react';

interface PokemonSlot {
  species: string;
  level: number;
  moves: string[];
  heldItem: string;
}

const inputClass = "w-full bg-[#FAF5E8] border border-[rgba(160,82,45,0.3)] rounded-lg px-3 py-2 text-[#3D2B1F] focus:outline-none focus:border-[#E35336]";

export function BuilderPage() {
  const [trainerClass, setTrainerClass] = useState('Youngster');
  const [trainerName, setTrainerName] = useState('');
  const [prizeMoney, setPrizeMoney] = useState('500');
  const [introText, setIntroText] = useState('');
  const [regionLang, setRegionLang] = useState('EN');
  const [team, setTeam] = useState<PokemonSlot[]>([
    { species: 'Pikachu', level: 25, moves: ['Thunderbolt', 'Quick Attack', '', ''], heldItem: '' },
  ]);
  const [generating, setGenerating] = useState(false);

  const addSlot = () => {
    if (team.length < 6) setTeam([...team, { species: '', level: 5, moves: ['', '', '', ''], heldItem: '' }]);
  };
  const removeSlot = (i: number) => setTeam(team.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, updates: Partial<PokemonSlot>) => {
    const t = [...team];
    t[i] = { ...t[i], ...updates };
    setTeam(t);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="mb-6" style={{ fontFamily: 'Bitter', fontSize: '28px', fontWeight: 700, color: '#A0522D' }}>Card Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-5">
          <div className="bg-[#FFFDF5] rounded-xl border border-[rgba(160,82,45,0.2)] p-5 space-y-4">
            <h3 style={{ fontFamily: 'Bitter', fontSize: '16px', fontWeight: 600, color: '#A0522D' }}>Trainer Info</h3>
            <div>
              <label style={{ fontSize: '13px', color: '#8B7355' }}>Trainer Class</label>
              <select value={trainerClass} onChange={e => setTrainerClass(e.target.value)} className={inputClass} style={{ fontSize: '14px' }}>
                {['Youngster', 'Lass', 'Bug Catcher', 'Hiker', 'Beauty', 'Swimmer', 'Ace Trainer', 'Cooltrainer', 'Psychic'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#8B7355' }}>Trainer Name</label>
              <input value={trainerName} onChange={e => setTrainerName(e.target.value)} placeholder="Enter name" className={inputClass} style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#8B7355' }}>Prize Money</label>
              <input value={prizeMoney} onChange={e => setPrizeMoney(e.target.value)} className={inputClass} style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#8B7355' }}>Intro Text</label>
              <textarea value={introText} onChange={e => setIntroText(e.target.value)} placeholder="Battle intro text..." className={`${inputClass} resize-none h-20`} style={{ fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#8B7355' }}>Region</label>
              <div className="flex gap-2 mt-1">
                {['EN', 'JP'].map(r => (
                  <button key={r} onClick={() => setRegionLang(r)} className="px-4 py-1.5 rounded-lg border transition-all"
                    style={{ backgroundColor: regionLang === r ? '#E35336' : '#FFFDF5', color: regionLang === r ? 'white' : '#A0522D', borderColor: regionLang === r ? '#E35336' : 'rgba(160,82,45,0.3)', fontSize: '13px', fontWeight: 500 }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-[#FFFDF5] rounded-xl border border-[rgba(160,82,45,0.2)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: 'Bitter', fontSize: '16px', fontWeight: 600, color: '#A0522D' }}>Pokemon Team ({team.length}/6)</h3>
              {team.length < 6 && (
                <button onClick={addSlot} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E35336] text-white hover:bg-[#C94430] transition-colors" style={{ fontSize: '13px' }}>
                  <Plus size={14} /> Add
                </button>
              )}
            </div>
            <div className="space-y-3">
              {team.map((slot, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#FAF5E8] border border-[rgba(160,82,45,0.15)] relative">
                  {team.length > 1 && (
                    <button onClick={() => removeSlot(i)} className="absolute top-2 right-2 p-1 rounded hover:bg-[rgba(160,82,45,0.1)] text-[#8B7355]">
                      <X size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input value={slot.species} onChange={e => updateSlot(i, { species: e.target.value })} placeholder="Species" className={inputClass} style={{ fontSize: '13px' }} />
                    <input type="number" value={slot.level} onChange={e => updateSlot(i, { level: Number(e.target.value) })} placeholder="Lv" className={inputClass} style={{ fontSize: '13px' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slot.moves.map((m, mi) => (
                      <input key={mi} value={m} onChange={e => { const moves = [...slot.moves]; moves[mi] = e.target.value; updateSlot(i, { moves }); }}
                        placeholder={`Move ${mi + 1}`} className={inputClass} style={{ fontSize: '12px' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <h3 className="mb-3" style={{ fontFamily: 'Bitter', fontSize: '16px', fontWeight: 600, color: '#A0522D' }}>Live Preview</h3>
          <div className="rounded-xl overflow-hidden border-2 border-[#A0522D]" style={{ background: 'linear-gradient(135deg, #F4A460, #E35336)' }}>
            <div className="p-5 text-center">
              <span className="text-white/70 uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: 600 }}>Trainer Card</span>
              <p className="text-white mt-1" style={{ fontFamily: 'Bitter', fontSize: '11px' }}>{trainerClass}</p>
              <h2 className="text-white mt-2" style={{ fontFamily: 'Bitter', fontSize: '22px', fontWeight: 700 }}>{trainerName || 'Your Name'}</h2>
            </div>
            <div className="bg-[#FFFDF5] p-4">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {Array.from({ length: 6 }, (_, i) => {
                  const slot = team[i];
                  return (
                    <div key={i} className="aspect-square rounded-lg flex flex-col items-center justify-center" style={{ background: slot ? 'linear-gradient(135deg, #FAF5E8, #EDE8D5)' : '#FAF5E8', border: '1px solid rgba(160,82,45,0.2)' }}>
                      {slot ? (
                        <>
                          <span style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 600, color: '#3D2B1F' }}>{slot.species || '???'}</span>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#8B7355' }}>Lv.{slot.level}</span>
                        </>
                      ) : (
                        <span style={{ fontSize: '20px', color: 'rgba(160,82,45,0.15)' }}>+</span>
                      )}
                    </div>
                  );
                })}
              </div>
              {introText && <p className="italic" style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#8B7355' }}>"{introText}"</p>}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(160,82,45,0.15)]">
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#8B7355' }}>Prize: ¥{prizeMoney}</span>
                <span className="px-2 py-0.5 rounded text-white" style={{ fontSize: '10px', fontWeight: 600, backgroundColor: regionLang === 'EN' ? '#1565C0' : '#C62828' }}>{regionLang}</span>
              </div>
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            {['.raw', '.bmp', '.pdf'].map(ext => (
              <button key={ext} onClick={handleGenerate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors" style={{ fontSize: '13px', fontWeight: 500 }}>
                <Download size={14} /> Download {ext}
              </button>
            ))}
          </div>
          {generating && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-1">
                {['Parse', 'Encode', 'Render'].map((stage, i) => (
                  <div key={stage} className="px-2 py-1 rounded text-white" style={{ fontSize: '11px', backgroundColor: '#E35336', opacity: 0.4 + i * 0.3 }}>{stage}</div>
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#8B7355' }}>Generating...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
