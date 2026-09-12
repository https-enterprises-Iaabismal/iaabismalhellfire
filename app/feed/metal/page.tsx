'use client';
import { useState, useEffect, useMemo } from 'react';
export default function MetalFeed(){
  const [tracks,setTracks]=useState<any[]>([]);
  const [sub,setSub]=useState('all');
  const [current,setCurrent]=useState<any>(null);
  useEffect(()=>{fetch('/data/metal-tracks.json').then(r=>r.json()).then(d=>{setTracks(d); setCurrent(d[0])})},[]);
  const filtered=useMemo(()=>tracks.filter((t:any)=>sub==='all'||t.sub===sub),[tracks,sub]);
  return(
    <main style={{background:'#000',color:'#fff',minHeight:'100vh',fontFamily:'monospace'}}>
      <div style={{padding:'1rem',borderBottom:'1px solid #222',display:'flex',gap:'1rem'}}>
        {['all','black','thrash','doom','death'].map(s=>(
          <button key={s} onClick={()=>setSub(s)} style={{background:sub===s?'#FF2A2A':'#111',color:'#fff',border:'1px solid #222',padding:'0.3rem 0.6rem'}}>{s.toUpperCase()}</button>
        ))}
      </div>
      {current && <iframe width="100%" height="360" src={`https://www.youtube.com/embed/${current.yt}?autoplay=1`} frameBorder={0} allow="autoplay" allowFullScreen />}
      <div>{filtered.map((t:any)=>(<div key={t.id} onClick={()=>setCurrent(t)} style={{padding:'0.6rem',borderBottom:'1px solid #111',cursor:'pointer',background:current?.id===t.id?'#111':'transparent'}}>{t.title} - {t.band}</div>))}</div>
    </main>
  );
}
