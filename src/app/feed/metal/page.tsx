'use client';
import { useEffect, useState, useMemo } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filter, setFilter] = useState('TODO');
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[]))},[]);

  const filtered = useMemo(()=> tracks.filter(t=>{
    const f = filter==='TODO' || t.sub===filter || t.themes?.includes(filter);
    const q = search.toLowerCase();
    return f && (!q || `${t.band} ${t.title}`.toLowerCase().includes(q));
  }), [tracks, filter, search]);

  const t = filtered[current] || tracks[0];

  if(!tracks.length) return <div className="bg-zinc-950 text-red-500 min-h-screen flex items-center justify-center font-mono text-sm tracking-widest animate-pulse">INVOCANDO LEGIÓN ABISMAL...</div>;

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-3 md:p-6 font-mono selection:bg-red-600 selection:text-white max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-4 border-b border-red-900/40 pb-3">
        <h1 className="text-xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-red-500 via-rose-600 to-red-700 bg-clip-text text-transparent uppercase">
          IAABISMAL HELLFIRE ENGINE
        </h1>
        <p className="text-[10px] text-red-400/80 tracking-widest mt-1">AUDIO EXTREMO • 1000 TRACKS CORE-X</p>
      </div>

      {/* FILTROS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide text-xs">
        {['TODO','DEATH','THRASH','BLACK','POWER','VIKINGOS','DOOM','SANGRE','INFIERNO'].map(f=>(
          <button 
            key={f} 
            onClick={()=>{setFilter(f); setCurrent(0)}} 
            className={`px-3 py-1.5 font-bold uppercase tracking-wider border transition-all whitespace-nowrap shrink-0 ${
              filter===f 
                ? 'bg-red-600 text-zinc-950 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* BUSCADOR */}
      <input 
        value={search} 
        onChange={e=>setSearch(e.target.value)} 
        placeholder="Buscar banda o rola..." 
        className="w-full mt-3 bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-red-100 placeholder-zinc-600 outline-none focus:border-red-600" 
      />

      {/* TARJETA DE REPRODUCCIÓN / LANZADOR NATIVO */}
      {t && (
        <div className="mt-4 border border-red-900/50 bg-zinc-900/90 p-4 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] bg-red-600 text-zinc-950 px-2 py-0.5 font-black uppercase">{t.sub}</span>
            <span className="text-[10px] text-zinc-400 font-mono">#{current + 1} / {filtered.length}</span>
          </div>

          <h2 className="text-lg md:text-xl font-black text-white truncate">{t.band}</h2>
          <p className="text-sm text-red-400 font-bold truncate">{t.title}</p>
          <div className="flex gap-1 mt-1 text-[9px] text-zinc-400">
            {t.themes?.map((th:string)=>(<span key={th} className="bg-zinc-950 px-1.5 py-0.5 border border-zinc-800">{th}</span>))}
          </div>

          {/* BANNER CLICKEABLE CON THUMBNAIL (EVITA BLOQUEOS DE EMBED) */}
          <div 
            onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')}
            className="mt-3 aspect-video w-full bg-black border border-red-900/60 relative cursor-pointer group overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.15)]"
          >
            <img 
              src={`https://i.ytimg.com/vi/${t.yt}/hqdefault.jpg`} 
              alt={t.title} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300" 
            />
            <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center group-hover:bg-red-950/20 transition-all">
              <div className="bg-red-600 text-zinc-950 px-5 py-3 font-black text-xs md:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(220,38,38,0.9)] group-hover:scale-110 transition-transform flex items-center gap-2 border border-red-400">
                ▶ DESATAR EN YOUTUBE
              </div>
            </div>
          </div>

          {/* BOTONES DE CONTROL */}
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            <button 
              onClick={()=>setCurrent(p=>Math.max(0,p-1))} 
              className="bg-zinc-800 py-2 text-[10px] font-bold text-zinc-200 hover:bg-red-900 transition-all"
            >
              ◀ ANTES
            </button>
            <button 
              onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} 
              className="bg-red-600 text-zinc-950 font-black py-2 text-[10px] hover:bg-red-500 transition-all flex items-center justify-center"
            >
              ▶ ABRIR
            </button>
            <button 
              onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} 
              className="bg-zinc-800 py-2 text-[10px] font-bold text-zinc-200 hover:bg-red-900 transition-all"
            >
              SIGUE ▶
            </button>
            <button 
              onClick={()=>setCurrent(Math.floor(Math.random()*filtered.length))} 
              className="bg-zinc-950 border border-red-900 text-red-400 py-2 text-[10px] font-bold hover:bg-red-950"
            >
              🔀 RANDOM
            </button>
          </div>
        </div>
      )}

      {/* LISTA DE ROLAS */}
      <div className="mt-6 text-xs text-red-500 font-bold border-b border-zinc-900 pb-1 flex justify-between">
        <span>COLA ACTIVA</span>
        <span>{filtered.length} ROLAS</span>
      </div>

      <div className="mt-2 space-y-1 max-h-96 overflow-y-auto pr-1">
        {filtered.slice(0, 200).map((tr:any, i:number)=>(
          <div 
            key={tr.id} 
            onClick={()=>setCurrent(i)} 
            className={`p-2.5 cursor-pointer flex justify-between items-center text-xs transition-all border ${
              i===current 
                ? 'bg-red-950/50 border-red-600 text-white' 
                : 'bg-zinc-900/40 border-zinc-900 text-zinc-300 hover:bg-zinc-900'
            }`}
          >
            <div className="truncate pr-2">
              <span className="text-red-500 font-bold mr-1">#{i+1}</span>
              <span className="font-bold text-white">{tr.band}</span> - <span className="text-zinc-400">{tr.title}</span>
            </div>
            <span className="text-[9px] bg-zinc-900 px-1.5 py-0.5 border border-zinc-800 shrink-0 text-red-400">{tr.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
