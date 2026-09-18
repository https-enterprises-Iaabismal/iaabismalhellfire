'use client';
import { useEffect, useState, useMemo } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filter, setFilter] = useState('TODO');
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[]))},[]);

  const filtered = useMemo(()=> tracks.filter(t=>{
    const matchFilter = filter==='TODO' || t.sub===filter;
    const q = search.toLowerCase();
    const matchSearch =!q || `${t.band} ${t.title} ${t.sub}`.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  }), [tracks, filter, search]);

  const t = filtered[current] || tracks[0];

  if(!tracks.length) return <div className="bg-black text-white min-h-screen p-6">Invocando los 1000 del abismo...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-4 font-mono">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['TODO','MUERTE','SANGRE','DIABLO','BLACK','DEATH','THRASH','POWER','VIKINGOS'].map(f=>(
          <button key={f} onClick={()=>{setFilter(f); setCurrent(0)}} className={`px-4 py-2 text-xs font-bold uppercase border ${filter===f?'bg-red-600 text-black border-red-600':'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>{f} {f==='TODO'?`(${filtered.length})`:''}</button>
        ))}
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar muerte sangre diablo amor..." className="w-full mt-4 bg-zinc-900 border border-zinc-800 p-3 text-sm placeholder-zinc-600 outline-none" />

      <div className="mt-2 text- text-red-900">• LIVE • {filtered.length} EN COLA • CLICK PLAY</div>

      {t && (
        <div className="mt-6 border border-red-900/30 bg-zinc-950 p-6 flex flex-col md:flex-row gap-6">
          <div className="w-48 h-48 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-600">COVER</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{t.band} - {t.title}</h2>
            <p className="text-xs text-red-800 mt-1">{t.band} • {t.sub}, RITUALES, INFIERNO</p>
            <div className="flex flex-col gap-2 mt-6 max-w-">
              <button onClick={()=>setCurrent(p=>Math.max(0,p-1))} className="bg-zinc-900 border border-zinc-700 py-2 text-sm">◀ ATRÁS</button>
              <button className="bg-red-600 text-black font-black py-3 text-sm">▶ DESATAR</button>
              <button onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} className="bg-zinc-900 border border-zinc-700 py-2 text-sm">ADELANTE ▶</button>
              <button className="border border-red-900/30 text-red-900 py-2 text-sm">🔀 DISRUPCIÓN</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-red-900">BLOQUE: {filter} • {filtered.length} ROLAS</div>
      <div className="mt-2 divide-y divide-zinc-900 border-t border-zinc-900">
        {filtered.slice(0,100).map((tr:any,i:number)=>(
          <div key={tr.id} onClick={()=>setCurrent(i)} className={`p-3 cursor-pointer flex justify-between ${i===current?'bg-red-950/20 border-l-2 border-red-600':''}`}>
            <div><div className="text-red-500">{tr.band} - {tr.title} - {tr.band}</div><div className="text- text-zinc-600">{tr.sub} • RITUALES • INFIERNO</div></div>
            <div className="text- text-zinc-700">{tr.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 text- text-center text-zinc-600">IAABISMAL • Curaduría Abismal por Armando Adán Campos Velázquez • AeroCore-X • 1000 tracks • 2026 • Sin algoritmo</div>
    </div>
  );
}
