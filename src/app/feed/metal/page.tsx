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

  const t = filtered[current];

  if(!tracks.length) return <div className="bg-zinc-950 text-red-500 min-h-screen flex items-center justify-center font-mono text-xl tracking-widest animate-pulse">INVOCANDO 1000 LEGIONES DEL ABISMO...</div>;

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-4 md:p-8 font-mono selection:bg-red-600 selection:text-white">
      {/* HEADER / TITULO */}
      <div className="mb-6 border-b border-red-900/40 pb-4">
        <h1 className="text-3xl md:text-4xl font-black tracking-wider bg-gradient-to-r from-red-500 via-rose-600 to-red-700 bg-clip-text text-transparent uppercase drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          IAABISMAL HELLFIRE ENGINE
        </h1>
        <p className="text-xs text-red-400/80 tracking-widest mt-1">CURADURÍA SUPREMA • AUDIO EXTREMO • SIN ALGORITMO</p>
      </div>

      {/* FILTROS CON COLOR VIBRANTE */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {['TODO','MUERTE','SANGRE','DIABLO','BLACK','DEATH','THRASH','POWER','VIKINGOS','DOOM'].map(f=>(
          <button 
            key={f} 
            onClick={()=>{setFilter(f); setCurrent(0)}} 
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border transition-all whitespace-nowrap ${
              filter===f 
                ? 'bg-red-600 text-zinc-950 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] scale-105' 
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-red-800 hover:text-red-300'
            }`}
          >
            {f} {f==='TODO'?`(${filtered.length})`:''}
          </button>
        ))}
      </div>

      {/* BUSCADOR */}
      <input 
        value={search} 
        onChange={e=>setSearch(e.target.value)} 
        placeholder="Buscar banda, muerte, sangre, ritual..." 
        className="w-full mt-4 bg-zinc-900/90 border border-zinc-800 p-3.5 text-sm text-red-100 placeholder-zinc-600 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all shadow-inner" 
      />
      
      <div className="mt-3 text-xs text-red-500 font-bold tracking-widest flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
        LIVE • {filtered.length} ROLAS EN COLA • AUDIO CORE-X
      </div>

      {/* REPRODUCTOR DESTACADO */}
      {t && (
        <div className="mt-6 border border-red-900/40 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-red-950/30 p-6 shadow-[0_0_30px_rgba(153,27,27,0.15)] flex flex-col md:flex-row gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-zinc-950 text-[10px] font-black px-3 py-1 uppercase tracking-widest">
            {t.sub}
          </div>
          
          <div className="w-full md:w-52 h-52 bg-zinc-950 border border-red-900/40 flex items-center justify-center relative group">
            <img 
              src={`https://i.ytimg.com/vi/${t.yt}/hqdefault.jpg`} 
              alt={t.title} 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" 
              onError={(e:any)=>e.target.style.display='none'} 
            />
            <div className="absolute inset-0 bg-red-950/20 mix-blend-overlay"></div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Banda Activa</span>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mt-0.5">{t.band}</h2>
              <p className="text-lg text-red-500 font-bold mt-1">{t.title}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {t.themes?.map((th:string)=>(
                  <span key={th} className="text-[10px] bg-red-950/60 border border-red-800/50 text-red-300 px-2 py-0.5 uppercase tracking-wider font-bold">
                    {th}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
              <button 
                onClick={()=>setCurrent(p=>Math.max(0,p-1))} 
                className="bg-zinc-900 border border-zinc-700 py-2.5 text-xs font-bold text-zinc-300 hover:border-red-500 hover:text-white transition-all"
              >
                ◀ ATRÁS
              </button>
              
              <button 
                onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} 
                className="bg-gradient-to-r from-red-600 to-rose-700 text-zinc-950 font-black py-2.5 text-xs tracking-widest hover:brightness-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-1"
              >
                ▶ DESATAR
              </button>
              
              <button 
                onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} 
                className="bg-zinc-900 border border-zinc-700 py-2.5 text-xs font-bold text-zinc-300 hover:border-red-500 hover:text-white transition-all"
              >
                ADELANTE ▶
              </button>
              
              <button 
                onClick={()=>setCurrent(Math.floor(Math.random()*filtered.length))} 
                className="border border-red-900/60 bg-red-950/30 text-red-400 py-2.5 text-xs font-bold hover:bg-red-900 hover:text-white transition-all"
              >
                🔀 DISRUPCIÓN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTA DE ROLAS */}
      <div className="mt-8 flex justify-between items-center text-xs text-red-500 font-bold tracking-widest border-b border-zinc-900 pb-2">
        <span>BLOQUE: {filter}</span>
        <span>{filtered.length} ROLAS DISPONIBLES</span>
      </div>

      <div className="mt-2 divide-y divide-zinc-900/80">
        {filtered.slice(0, 150).map((tr:any, i:number)=>(
          <div 
            key={tr.id} 
            onClick={()=>setCurrent(i)} 
            className={`p-3.5 cursor-pointer flex justify-between items-center transition-all ${
              i===current 
                ? 'bg-red-950/40 border-l-4 border-red-600 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                : 'hover:bg-zinc-900/60'
            }`}
          >
            <div>
              <div className="text-zinc-100 text-sm font-bold flex items-center gap-2">
                <span className="text-red-500 font-mono text-xs">#{i+1}</span> 
                <span>{tr.band}</span> 
                <span className="text-zinc-500">-</span> 
                <span className="text-zinc-300 font-normal">{tr.title}</span>
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                {tr.sub} • {tr.themes?.join(' • ')}
              </div>
            </div>
            <div className="text-[10px] bg-zinc-900 border border-zinc-800 text-red-400 px-2 py-1 uppercase font-bold tracking-wider">
              {tr.sub}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-12 text-center text-zinc-600 text-[11px] pb-10 tracking-widest border-t border-zinc-900 pt-6">
        IAABISMAL • Curaduría Abismal por Armando Adán Campos Velázquez • Especialista Audio & Crítico Pro • 2026 • {tracks.length} tracks AeroCore-X
      </div>
    </div>
  );
}
