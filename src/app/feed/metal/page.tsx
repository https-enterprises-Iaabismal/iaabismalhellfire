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

  if(!tracks.length) return <div className="bg-black text-white min-h-screen p-6">Invocando 1000 del abismo...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-4 font-mono selection:bg-red-600">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['TODO','MUERTE','SANGRE','DIABLO','BLACK','DEATH','THRASH','POWER','VIKINGOS','DOOM'].map(f=>(
          <button key={f} onClick={()=>{setFilter(f); setCurrent(0)}} className={`px-4 py-2 text-xs font-black uppercase border whitespace-nowrap ${filter===f?'bg-red-600 text-black border-red-600':'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-red-900'}`}>{f} {f==='TODO'?`(${filtered.length})`:''}</button>
        ))}
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar muerte sangre diablo amor..." className="w-full mt-4 bg-[#0a0a0a] border border-zinc-800 p-3 text-sm placeholder-zinc-700 outline-none focus:border-red-900" />
      <div className="mt-2 text- text-red-900 tracking-widest">• LIVE • {filtered.length} EN COLA • CLICK PLAY</div>

      {t && (
        <div className="mt-6 border border-red-900/20 bg-[#080808] p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-48 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <img src={`https://i.ytimg.com/vi/${t.yt}/hqdefault.jpg`} alt={t.title} className="w-full h-full object-cover opacity-80" onError={(e:any)=>e.target.style.display='none'} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold leading-tight">{t.band} - {t.title}</h2>
            <p className="text-xs text-red-800 mt-1 uppercase">{t.band} • {t.themes?.join(', ')}</p>
            <div className="flex flex-col gap-2 mt-6 max-w-">
              <button onClick={()=>setCurrent(p=>Math.max(0,p-1))} className="bg-zinc-900 border border-zinc-700 py-2 text-sm hover:border-white">◀ ATRÁS</button>
              <button onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} className="bg-red-600 text-black font-black py-3 text-sm tracking-widest hover:bg-red-500">▶ DESATAR</button>
              <button onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} className="bg-zinc-900 border border-zinc-700 py-2 text-sm hover:border-white">ADELANTE ▶</button>
              <button onClick={()=>setCurrent(Math.floor(Math.random()*filtered.length))} className="border border-red-900/20 text-red-900 py-2 text-sm hover:bg-red-950/20">🔀 DISRUPCIÓN</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-red-900 tracking-widest">BLOQUE: {filter} • {filtered.length} ROLAS</div>
      <div className="mt-2 border-t border-zinc-900">
        {filtered.slice(0,200).map((tr:any,i:number)=>(
          <div key={tr.id} onClick={()=>setCurrent(i)} className={`p-3 cursor-pointer flex justify-between items-center hover:bg-zinc-900/50 ${i===current?'bg-red-950/20 border-l-2 border-red-600':''}`}>
            <div><div className="text-red-400 text-sm">{tr.band} - {tr.title}</div><div className="text- text-zinc-600 uppercase">{tr.sub} • RITUALES • INFIERNO</div></div>
            <div className="text- text-zinc-700">{tr.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 text- text-center text-zinc-700 pb-10">IAABISMAL • Curaduría Abismal por Armando Adán Campos Velázquez • Especialista Audio & Crítico Pro • 2026 • Sin algoritmo • {tracks.length} tracks AeroCore-X</div>
    </div>
  );
}
