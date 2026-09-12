"use client";
import { useState, useEffect, useMemo } from "react";
import { OwnerBadge, PlayerFooter } from "@/app/components/OwnerBadge";
type Track = { id:string, title:string, band:string, sub:string, year:number, yt:string };
const FALLBACK: Track[] = [
  {"id":"J5yta7KG4Rg","title":"Kampfar - Tornekratt","band":"Kampfar","sub":"NEGRO","year":2015,"yt":"J5yta7KG4Rg"},
  {"id":"AIeVnN9cFmw","title":"Bloodbath - Eaten","band":"Bloodbath","sub":"MUERTE","year":2004,"yt":"AIeVnN9cFmw"},
  {"id":"s2EJ1AqPIPg","title":"Death - Voice of the Soul","band":"Death","sub":"MUERTE","year":1998,"yt":"s2EJ1AqPIPg"},
];
export default function Page(){
  const [tracks,setTracks]=useState(FALLBACK);
  const [filter,setFilter]=useState("TODO");
  const [idx,setIdx]=useState(0);
  const [play,setPlay]=useState(false);
  const [hasInteracted,setHasInteracted]=useState(false);
  const [search,setSearch]=useState("");
  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>{if(d.length>10)setTracks(d.map((t:any)=>({...t,sub:t.sub.toUpperCase().replace("MOVIMIENTO DE PIERNAS","DOOM").replace("CONDENAR","MUERTE")})))})},[]);
  const filtered=useMemo(()=>{let l=tracks; if(filter!=="TODO") l=l.filter(t=>t.sub.includes(filter)); if(search){const s=search.toLowerCase(); l=l.filter(t=>t.title.toLowerCase().includes(s));} return l;},[tracks,filter,search]);
  const cur=filtered[idx % (filtered.length||1)] || tracks[0];
  const handlePlay=()=>{try{const ac=new (window.AudioContext||(window as any).webkitAudioContext)(); if(ac.state==="suspended") ac.resume();}catch{} setHasInteracted(true); setPlay(true);};
  const embed=`https://www.youtube.com/embed/${cur?.yt}?autoplay=${play&&hasInteracted?1:0}&modestbranding=1&rel=0&enablejsapi=1&playsinline=1&controls=1`;
  const FILTS=["TODO","NEGRO","DOOM","MUERTE","EPIC","POWER","JOYAS","INFERNAL"];
  return(
    <div style={{background:"#000",color:"#e0e0e0",minHeight:"100vh",fontFamily:"JetBrains Mono, monospace"}}>
      <OwnerBadge/>
      <div style={{background:"linear-gradient(180deg,#0a0000 0%,#000 100%)",borderBottom:"2px solid #8B0000",padding:"12px"}}><div style={{fontWeight:900}}><span style={{color:"#FF2A2A"}}>IA</span>ABISMAL HELLFIRE / INFERNAL</div><div style={{fontSize:"0.55rem",color:"#666"}}>{tracks.length} tracks • Oscuridad Total • Motor Abismal • Sin aerobic</div></div>
      <div style={{padding:"12px",display:"flex",gap:"8px",overflowX:"auto",background:"#050000"}}>{FILTS.map(f=>{const a=filter===f; return <button key={f} onClick={()=>{setFilter(f);setIdx(0);}} style={{background:a?"#8B0000":"#0a0a0a",color:a?"#fff":"#777",border:a?"1px solid #FF2A2A":"1px solid #222",padding:"10px 16px",fontWeight:"bold",fontSize:"0.7rem"}}>{f}</button>})}</div>
      <div style={{padding:"12px"}}><input placeholder="Buscar en el abismo..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",background:"#050505",border:"1px solid #220000",color:"#aaa",padding:"12px"}}/><div style={{marginTop:"8px",color:"#8B0000",fontSize:"0.65rem"}}>• LIVE • {filtered.length} EN COLA • {hasInteracted?"SONIDO DESBLOQUEADO":"CLICK PLAY PARA SONIDO"}</div></div>
      <div style={{margin:"12px",background:"radial-gradient(circle at center,#1a0000 0%,#000 70%)",border:"2px solid #220000",padding:"16px"}}>
        <div style={{display:"flex",gap:"16px"}}><img src={`https://img.youtube.com/vi/${cur?.yt}/hqdefault.jpg`} style={{width:"140px",height:"100px",objectFit:"cover",filter:"brightness(0.6) contrast(1.2)"}} alt=""/><div><div style={{fontWeight:900}}>{cur?.title}</div><div style={{color:"#8B0000",fontSize:"0.75rem"}}>{cur?.band} • {cur?.year}</div><button onClick={handlePlay} style={{marginTop:"10px",background:"#FF2A2A",color:"#000",border:"none",padding:"10px 20px",fontWeight:900}}>{play?"SONANDO INFERNAL":"DESATAR INFIERNO ▶"}</button></div></div>
        <div style={{height:play?"320px":"0",overflow:"hidden",marginTop:"12px"}}><iframe key={cur?.yt+String(play)+String(hasInteracted)} src={hasInteracted?embed:`https://www.youtube.com/embed/${cur?.yt}?modestbranding=1&rel=0&controls=1`} style={{width:"100%",height:"320px",border:"none"}} allow="autoplay; encrypted-media; fullscreen" allowFullScreen/></div>
      </div>
      <div style={{padding:"0 12px"}}>{filtered.slice(0,100).map((t,i)=>(<div key={i} onClick={()=>{handlePlay(); setIdx(i);}} style={{padding:"14px 0",borderBottom:"1px solid #0a0000",background:i===idx?"#110000":"transparent"}}>{t.title} - {t.band} • {t.sub}</div>))}</div>
      <PlayerFooter/><div style={{height:"60px"}}/>
    </div>
  );
}
