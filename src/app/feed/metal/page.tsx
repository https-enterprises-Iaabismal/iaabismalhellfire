'use client';
import { useEffect, useState, useMemo } from "react";
export default function Feed(){
  const [tracks,setTracks]=useState<any[]>([]);
  const [filter,setFilter]=useState('TODO');
  const [cur,setCur]=useState(0);
  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[]))},[]);
  const filtered = useMemo(()=> tracks.filter(t=> filter==='TODO' || t.sub===filter), [tracks,filter]);
  const t = filtered[cur];
  if(!tracks.length) return <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'20px'}}>Invocando 1000...</div>;
  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'16px',fontFamily:'monospace'}}>
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
        {['TODO','BLACK','DEATH','THRASH','POWER','VIKINGOS','DOOM'].map(f=>(
          <button key={f} onClick={()=>{setFilter(f); setCur(0)}} style={{padding:'8px 12px',fontSize:'12px',fontWeight:900,border:'1px solid #222',background:filter===f?'#dc2626':'#111',color:filter===f?'#000':'#888'}}>{f} {f==='TODO'?`(${filtered.length})`:''}</button>
        ))}
      </div>
      <div style={{marginTop:'16px',border:'1px solid #7f1d1d33',background:'#080808',padding:'20px',display:'flex',gap:'20px',flexWrap:'wrap'}}>
        {t && <>
          <div style={{width:'192px',height:'192px',background:'#111',border:'1px solid #222'}}>
            <img src={`https://img.youtube.com/vi/${t.yt}/hqdefault.jpg`} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e:any)=>e.target.src=`https://picsum.photos/seed/${t.yt}/192`} alt="" />
          </div>
          <div style={{flex:1}}>
            <h2 style={{fontSize:'22px',fontWeight:900}}>{t.band} - {t.title}</h2>
            <p style={{fontSize:'11px',color:'#991b1b',marginTop:'4px'}}>{t.band} • INFIERNO</p>
            <button onClick={()=>window.open(`https://www.youtube.com/watch?v=${t.yt}`,'_blank')} style={{marginTop:'16px',background:'#dc2626',color:'#000',fontWeight:900,padding:'12px 24px',width:'100%',maxWidth:'220px'}}>▶ DESATAR EN YT</button>
            <div style={{marginTop:'12px'}}>
              <iframe width="100%" height="180" src={`https://www.youtube.com/embed/${t.yt}?rel=0&modestbranding=1`} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </>}
      </div>
      <div style={{marginTop:'16px',fontSize:'11px',color:'#7f1d1d'}}>BLOQUE: {filter} • {filtered.length} ROLAS</div>
      {filtered.slice(0,150).map((tr:any,i:number)=>(
        <div key={tr.id} onClick={()=>setCur(i)} style={{padding:'10px',cursor:'pointer',borderLeft:i===cur?'2px solid #dc2626':'2px solid transparent',background:i===cur?'#7f1d1d22':'transparent'}}>
          <div style={{color:'#f87171'}}>{tr.band} - {tr.title}</div>
          <div style={{fontSize:'10px',color:'#555'}}>{tr.sub}</div>
        </div>
      ))}
    </div>
  );
}
