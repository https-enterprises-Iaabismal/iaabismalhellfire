"use client";
import { useState, useEffect, useMemo } from "react";
import { OwnerBadge, PlayerFooter } from "@/app/components/OwnerBadge";
type Track = { id:string, title:string, band:string, sub:string, year:number, yt:string };
const FALLBACK: Track[] = [
  {"id":"J5yta7KG4Rg","title":"Kampfar - Tornekratt - Kampfar","band":"Kampfar","sub":"NEGRO","year":2015,"yt":"J5yta7KG4Rg"},
  {"id":"xgdUlhnuz18","title":"Shores Of Lunacy - Arsonist","band":"Shores Of Lunacy","sub":"NEGRO","year":2024,"yt":"xgdUlhnuz18"},
  {"id":"E6UOwBZKmXg","title":"Morbid Angel - Dawn of the Angry","band":"Morbid Angel","sub":"CONDENAR","year":1993,"yt":"E6UOwBZKmXg"},
  {"id":"AIeVnN9cFmw","title":"Bloodbath - Eaten","band":"Bloodbath","sub":"CONDENAR","year":2004,"yt":"AIeVnN9cFmw"},
  {"id":"s2EJ1AqPIPg","title":"Death - Voice of the Soul","band":"Death","sub":"CONDENAR","year":1998,"yt":"s2EJ1AqPIPg"},
];
export default function Page(){
  const [tracks,setTracks]=useState<Track[]>(FALLBACK);
  const [filter,setFilter]=useState("TODO");
  const [idx,setIdx]=useState(0);
  const [play,setPlay]=useState(false);
  const [audioOnly,setAudioOnly]=useState(true);
  const [search,setSearch]=useState("");
  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>{if(d.length>20)setTracks(d.map((t:any)=>({...t,sub:t.sub.toUpperCase()})))}).catch(()=>{});},[]);
  const filtered=useMemo(()=>{
    let l=tracks;
    if(filter!=="TODO") l=l.filter(t=>t.sub.includes(filter));
    if(search){const s=search.toLowerCase(); l=l.filter(t=>t.title.toLowerCase().includes(s)||t.band.toLowerCase().includes(s));}
    return l;
  },[tracks,filter,search]);
  const cur=filtered[idx % (filtered.length||1)] || tracks[0];
  useEffect(()=>{if("mediaSession" in navigator && cur){try{ // @ts-ignore
    navigator.mediaSession.metadata=new window.MediaMetadata({title:cur.title,artist:cur.band,album:"IAABISMAL 300 JOYAS",artwork:[{src:`https://img.youtube.com/vi/${cur.yt}/hqdefault.jpg`,sizes:"480x360",type:"image/jpeg"}]}); }catch{}}},[cur]);
  const embed=`https://www.youtube-nocookie.com/embed/${cur?.yt}?autoplay=${play?1:0}&modestbranding=1&rel=0&enablejsapi=1&playsinline=1&controls=1`;
  const FILTS=["TODO","NEGRO","MOVIMIENTO DE PIERNAS","CONDENAR","EPIC","POWER","JOYAS"];
  return(
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"JetBrains Mono, monospace"}}>
      <OwnerBadge/>
      <div style={{padding:"8px 12px",background:"#111",borderBottom:"1px solid #222",fontSize:"0.65rem"}}>IAABISMAL HELLFIRE / INFINITE • {tracks.length} tracks • Motor Abismal • Owner Armando Adán Campos Velázquez</div>
      <div style={{padding:"10px",display:"flex",gap:"8px",overflowX:"auto"}}>{FILTS.map(f=>{const a=filter===f; return <button key={f} onClick={()=>{setFilter(f);setIdx(0);}} style={{background:a?"#FF2A2A":"#1a1a1a",color:a?"#000":"#ccc",border:"1px solid #222",padding:"8px 14px",fontWeight:"bold",fontSize:"0.7rem",whiteSpace:"nowrap"}}>{f} {f==="TODO"?tracks.length:""}</button>})}</div>
      <div style={{padding:"0 12px"}}><input placeholder="Buscar título / banda / año..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",background:"#111",border:"1px solid #222",color:"#fff",padding:"10px",fontFamily:"monospace"}}/><div style={{marginTop:"8px",color:"#0f0",fontSize:"0.7rem"}}>• LIVE • {filtered.length} EN COLA • {tracks.length}+∞ • MODO {audioOnly?"MUSICA SEGUNDO PLANO":"VIDEO"} • YT LIMPIO SIN ext/hash</div></div>
      <div style={{margin:"12px",background:"#0a0a0a",border:"1px solid #222",padding:"12px"}}>
        {audioOnly?(
          <div style={{display:"flex",gap:"12px",alignItems:"center"}}><img src={`https://img.youtube.com/vi/${cur?.yt}/hqdefault.jpg`} style={{width:"120px",height:"90px",objectFit:"cover"}} alt=""/><div><div style={{fontWeight:"bold"}}>{cur?.title}</div><div style={{color:"#888",fontSize:"0.7rem"}}>{cur?.band} • {cur?.year} • YT:{cur?.yt} • Abismal Recs</div><button onClick={()=>setPlay(!play)} style={{marginTop:"8px",background:"#FF2A2A",color:"#000",border:"none",padding:"8px 16px",fontWeight:"bold"}}>{play?"PAUSAR":"PLAY AUDIO"}</button><button onClick={()=>setAudioOnly(false)} style={{marginLeft:"8px",background:"#222",color:"#fff",border:"1px solid #333",padding:"8px 12px"}}>VER VIDEO</button></div></div>
        ):(
          <div style={{aspectRatio:"16/9"}}><iframe key={cur?.yt+String(play)} src={embed} style={{width:"100%",height:"100%",border:"none"}} allow="autoplay; encrypted-media" allowFullScreen/></div>
        )}
        {audioOnly && play && <iframe src={embed} style={{width:"1px",height:"1px",position:"absolute",left:"-9999px"}} allow="autoplay"/>}
      </div>
      <div style={{padding:"0 12px",borderTop:"1px solid #111"}}>{filtered.slice(0,120).map((t,i)=>(<div key={i+t.yt} onClick={()=>{setIdx(i);setPlay(true);window.scrollTo({top:0,behavior:"smooth"})}} style={{padding:"12px 0",borderBottom:"1px solid #111",cursor:"pointer",background:i===idx?"#111":"transparent"}}>{t.title} - {t.band} • {t.sub} {i===idx?"▶":""}</div>))}</div>
      <PlayerFooter/>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0a0a0a",borderTop:"1px solid #FF2A2A",padding:"8px 12px",display:"flex",justifyContent:"space-between"}}><div style={{fontSize:"0.65rem"}}>▶ {cur?.title}</div><div style={{display:"flex",gap:"6px"}}><button onClick={()=>setIdx(i=>Math.max(0,i-1))} style={{background:"#222",color:"#fff",border:"1px solid #333",padding:"6px 10px"}}>PREV</button><button onClick={()=>setPlay(!play)} style={{background:"#FF2A2A",color:"#000",border:"none",padding:"6px 14px",fontWeight:"bold"}}>{play?"PAUSE":"PLAY"}</button><button onClick={()=>setIdx(i=>i+1)} style={{background:"#222",color:"#fff",border:"1px solid #333",padding:"6px 10px"}}>NEXT</button></div></div><div style={{height:"60px"}}/>
    </div>
  );
}
