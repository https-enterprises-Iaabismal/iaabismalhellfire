'use client';
import { useEffect, useState, useMemo } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filter, setFilter] = useState('TODO');
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[])).catch(()=>setTracks([]))},[]);

  const filtered = useMemo(()=> tracks.filter(t=>{
    const f = filter==='TODO' || t.sub===filter || t.themes?.includes(filter);
    const q = search.toLowerCase();
    return f && (!q || `${t.band} ${t.title}`.toLowerCase().includes(q));
  }), [tracks, filter, search]);

  const t = filtered[current];

  if(!tracks.length) return <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'20px'}}>Invocando 1000 del abismo...</div>;

  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'16px',fontFamily:'monospace'}}>
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
        {['TODO','MUERTE','SANGRE','DIABLO','BLACK','DEATH','THRASH','POWER','VIKINGOS','DOOM'].map(f=>(
          <button key={f} onClick={()=>{setFilter(f); setCurrent(0)}} style={{padding:'8px 12px',fontSize:'12px',fontWeight:900,border:'1px solid',background:filter===f?'#dc2626':'#111',color:filter===f?'#000':'#888',borderColor:filter===f?'#dc2626':'#222'}}>{f} {f==='TODO'?`(${filtered.length})`:''}</button>
        ))}
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar muerte sangre diablo..." style={{width:'100%',marginTop:'16px',background:'#0a0a0a',border:'1px solid #222',padding:'12px',color:'#fff',outline:'none'}} />
      <div style={{marginTop:'8px',fontSize:'10px',color:'#7f1d1d',letterSpacing:'2px'}}>• LIVE • {filtered.length} EN COLA • CLICK PLAY</div>

      {t && (
        <div style={{marginTop:'24px',border:'1px solid #7f1d1d33',background:'#080808',padding:'24px',display:'flex',gap:'24px',flexWrap:'wrap'}}>
          <div style={{width:'192px',height:'192px',background:'#111',border:'1px solid #222',overflow:'hidden'}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${t.yt}/hqdefault.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e:any)=>e.target.src='https://via.placeholder.com/192?text=ABISMAL'} />
          </div>
          <div style={{flex:1,minWidth:'260px'}}>
            <h2 style={{fontSize:'22px',fontWeight:900}}>{t.band} - {t.title}</h2>
            <p style={{fontSize:'11px',color:'#991b1b',marginTop:'4px',textTransform:'uppercase'}}>{t.band} • {(t.themes||[]).join(', ')}</p>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'20px',maxWidth:'220px'}}>
              <button onClick={()=>setCurrent(p=>Math.max(0,p-1))} style={{background:'#111',border:'1px solid #333',padding:'8px'}}>◀ ATRÁS</button>
              <button onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} style={{background:'#dc2626',color:'#000',fontWeight:900,padding:'12px',letterSpacing:'1px'}}>▶ DESATAR EN YT</button>
              <button onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} style={{background:'#111',border:'1px solid #333',padding:'8px'}}>ADELANTE ▶</button>
              <button onClick={()=>setCurrent(Math.floor(Math.random()*filtered.length))} style={{border:'1px solid #7f1d1d33',color:'#7f1d1d',padding:'8px'}}>🔀 DISRUPCIÓN</button>
            </div>
            {/* Player embebido que no da "no disponible" */}
            <div style={{marginTop:'20px',border:'1px solid #222'}}>
              <iframe width="100%" height="200" src={`https://www.youtube-nocookie.com/embed/${t.yt}?rel=0`} title="player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}

      <div style={{marginTop:'24px',fontSize:'11px',color:'#7f1d1d',letterSpacing:'2px'}}>BLOQUE: {filter} • {filtered.length} ROLAS</div>
      <div style={{borderTop:'1px solid #111',marginTop:'8px'}}>
        {filtered.slice(0,200).map((tr:any,i:number)=>(
          <div key={tr.id} onClick={()=>setCurrent(i)} style={{padding:'10px',cursor:'pointer',display:'flex',justifyContent:'space-between',background:i===current?'#7f1d1d22':'transparent',borderLeft:i===current?'2px solid #dc2626':'2px solid transparent'}}>
            <div><div style={{color:'#f87171',fontSize:'14px'}}>{tr.band} - {tr.title}</div><div style={{fontSize:'10px',color:'#555',textTransform:'uppercase'}}>{tr.sub} • RITUALES • INFIERNO</div></div>
            <div style={{fontSize:'10px',color:'#333'}}>{tr.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
