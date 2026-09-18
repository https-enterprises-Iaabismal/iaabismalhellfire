'use client';
import { useEffect, useState, useMemo } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filter, setFilter] = useState('TODO');
  const [access, setAccess] = useState('ALL'); // ALL, free, pro
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[])).catch(()=>setTracks([]))},[]);

  const filtered = useMemo(()=> tracks.filter(t=>{
    const f = filter==='TODO' || t.sub===filter;
    const a = access==='ALL' || t.tier===access;
    const q = search.toLowerCase();
    return f && a && (!q || `${t.band} ${t.title}`.toLowerCase().includes(q));
  }), [tracks, filter, access, search]);

  const t = filtered[current] || filtered[0];

  if(!tracks.length) return <div style={{background:'#000',color:'#dc2626',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace'}}>INVOCANDO LEGIÓN ABISMAL DE ARMANDO...</div>;

  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'16px',fontFamily:'monospace',maxWidth:'800px',margin:'0 auto'}}>
      {/* HEADER DE AUTOR */}
      <div style={{borderBottom:'1px solid #7f1d1d',paddingBottom:'12px',marginBottom:'16px'}}>
        <h1 style={{fontSize:'18px',fontWeight:900,color:'#dc2626',letterSpacing:'1px'}}>IAABISMAL HELLFIRE ENGINE</h1>
        <p style={{fontSize:'10px',color:'#888',marginTop:'2px'}}>ARQUITECTURA EXTREMA • CREADO POR ARMANDO ADÁN CAMPOS VELÁZQUEZ</p>
      </div>

      {/* FILTROS DE ACCESO (LIBRE / PRO) */}
      <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
        {[['ALL','TODOS LOS ACCESOS'],['free','🔓 LIBRE (FREE)'],['pro','🔒 PRO (PAGO)']].map(([k,label])=>(
          <button key={k} onClick={()=>{setAccess(k); setCurrent(0)}} style={{padding:'6px 12px',fontSize:'10px',fontWeight:900,background:access===k?'#dc2626':'#111',color:access===k?'#000':'#aaa',border:'1px solid #333'}}>{label}</button>
        ))}
      </div>

      {/* FILTROS DE SUBGENEROS */}
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
        {['TODO','BLACK','DEATH','THRASH','POWER','VIKINGOS','DOOM'].map(f=>(
          <button key={f} onClick={()=>{setFilter(f); setCurrent(0)}} style={{padding:'6px 10px',fontSize:'11px',fontWeight:900,border:'1px solid',background:filter===f?'#991b1b':'#0a0a0a',color:filter===f?'#fff':'#777',borderColor:filter===f?'#ef4444':'#222'}}>{f}</button>
        ))}
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar banda o ritual..." style={{width:'100%',marginTop:'12px',background:'#080808',border:'1px solid #333',padding:'10px',color:'#fff',outline:'none',fontSize:'12px'}} />
      <div style={{marginTop:'6px',fontSize:'10px',color:'#dc2626',letterSpacing:'1px'}}>• MODO ACTIVO • {filtered.length} ROLAS EN COLA</div>

      {/* REPRODUCTOR DIRECTO / TARJETA NATIVA */}
      {t && (
        <div style={{marginTop:'16px',border:'1px solid #7f1d1d',background:'#050505',padding:'16px',display:'flex',gap:'16px',flexWrap:'wrap',alignItems:'center'}}>
          <div style={{width:'140px',height:'140px',background:'#111',border:'1px solid #333',overflow:'hidden',flexShrink:0}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${t.yt}/hqdefault.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e:any)=>e.target.src='https://via.placeholder.com/140?text=HELLFIRE'} />
          </div>
          <div style={{flex:1,minWidth:'220px'}}>
            <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'4px'}}>
              <span style={{fontSize:'9px',background:t.tier==='pro'?'#b91c1c':'#15803d',color:'#fff',padding:'2px 6px',fontWeight:900}}>{t.tier.toUpperCase()}</span>
              <span style={{fontSize:'9px',color:'#888'}}>{t.sub}</span>
            </div>
            <h2 style={{fontSize:'16px',fontWeight:900,color:'#fff'}}>{t.band}</h2>
            <p style={{fontSize:'12px',color:'#fca5a5'}}>{t.title}</p>

            {/* BOTONES DE NAVEGACIÓN Y ACCIÓN */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginTop:'12px'}}>
              <button onClick={()=>setCurrent(p=>Math.max(0,p-1))} style={{background:'#1a1a1a',border:'1px solid #444',color:'#fff',padding:'8px',fontSize:'11px',fontWeight:900,cursor:'pointer'}}>◀ ATRÁS</button>
              <button onClick={()=>setCurrent(p=>Math.min(filtered.length-1,p+1))} style={{background:'#1a1a1a',border:'1px solid #444',color:'#fff',padding:'8px',fontSize:'11px',fontWeight:900,cursor:'pointer'}}>ADELANTE ▶</button>
            </div>
            <button onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} style={{marginTop:'6px',background:'#dc2626',color:'#000',fontWeight:900,padding:'10px',width:'100%',fontSize:'11px',cursor:'pointer',border:'none',letterSpacing:'1px'}}>▶ REPRODUCIR EN YOUTUBE OFICIAL</button>
          </div>
        </div>
      )}

      {/* LISTA DE PISTAS */}
      <div style={{marginTop:'20px',fontSize:'11px',color:'#7f1d1d',borderBottom:'1px solid #222',paddingBottom:'4px'}}>COLA DE REPRODUCCIÓN ({filtered.length})</div>
      <div style={{marginTop:'6px',maxHeight:'400px',overflowY:'auto'}}>
        {filtered.slice(0,150).map((tr:any,i:number)=>(
          <div key={tr.id} onClick={()=>setCurrent(i)} style={{padding:'10px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',background:i===current?'#581c8733':'transparent',borderBottom:'1px solid #111'}}>
            <div>
              <span style={{color:'#dc2626',fontSize:'11px',marginRight:'8px'}}>#{i+1}</span>
              <span style={{color:'#f87171',fontSize:'12px',fontWeight:700}}>{tr.band} - {tr.title}</span>
            </div>
            <span style={{fontSize:'9px',color:tr.tier==='pro'?'#f87171':'#4ade80'}}>{tr.tier.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
