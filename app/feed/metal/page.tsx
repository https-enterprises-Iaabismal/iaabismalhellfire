"use client";
import { useState, useEffect, useMemo } from "react";
import { OwnerBadge, PlayerFooter } from "@/app/components/OwnerBadge";
type Track = { id:string, title:string, band:string, sub:string, year:number, yt:string, themes:string[] };
const THEMES = ["MUERTE","SANGRE","DIABLO","CONTROL","MENTALIDAD","ASESINOS","ESPIRITU","AMOR","MACHIN","SOCIEDADES","DEPRESION","PLACER","VIKINGOS","MENTIRA","RELIGION","DIOS","PROFECIAS","HISTORIAS","EPICOS","LOBOS","RITUALES","INFIERNO","SINFONICO","CEMENTERIOS","SATANISMO","OCULTISMO","MENTALISMO","CONSPIRACIONES","BLACK","DOOM"];
const FALLBACK: Track[] = [
  {id:"J5yta7KG4Rg",title:"Kampfar - Tornekratt",band:"Kampfar",sub:"BLACK",year:2015,yt:"J5yta7KG4Rg",themes:["BLACK","VIKINGOS","RITUALES","INFIERNO"]},
  {id:"E6UOwBZKmXg",title:"Morbid Angel - Dawn of the Angry",band:"Morbid Angel",sub:"DEATH",year:1993,yt:"E6UOwBZKmXg",themes:["MUERTE","DIABLO","SATANISMO","CEMENTERIOS"]},
  {id:"AIeVnN9cFmw",title:"Bloodbath - Eaten",band:"Bloodbath",sub:"DEATH",year:2004,yt:"AIeVnN9cFmw",themes:["MUERTE","SANGRE","CEMENTERIOS"]},
  {id:"s2EJ1AqPIPg",title:"Death - Voice of the Soul",band:"Death",sub:"DEATH",year:1998,yt:"s2EJ1AqPIPg",themes:["ESPIRITU","MUERTE","DEPRESION"]},
  {id:"JGYnx2m09pQ",title:"Candlemass - Crystal Ball",band:"Candlemass",sub:"DOOM",year:1986,yt:"JGYnx2m09pQ",themes:["DOOM","PROFECIAS","OCULTISMO"]},
  {id:"CODmtogsZSk",title:"Septicflesh - Neuromancer",band:"Septicflesh",sub:"BLACK",year:2022,yt:"CODmtogsZSk",themes:["CONTROL","MENTALISMO","CONSPIRACIONES","SINFONICO"]},
];
export default function Page(){
  const [tracks,setTracks]=useState<Track[]>(FALLBACK);
  const [activeTheme,setActiveTheme]=useState("TODO");
  const [idx,setIdx]=useState(0);
  const [play,setPlay]=useState(false);
  const [hasInteracted,setHasInteracted]=useState(false);
  const [showPlaylist,setShowPlaylist]=useState(false);
  const [search,setSearch]=useState("");
  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>{if(d.length>10){const en=d.map((t:any,i:number)=>{const th=THEMES.filter((_,j)=>(i+j)%7===0).slice(0,3); return {...t,sub:t.sub.toUpperCase(),themes:th.length?th:[THEMES[i%THEMES.length]]};}); setTracks(en);}});},[]);
  const filtered=useMemo(()=>{let l=tracks; if(activeTheme!=="TODO") l=l.filter(t=>t.themes?.includes(activeTheme)||t.sub.includes(activeTheme)); if(search){const s=search.toLowerCase(); l=l.filter(t=>t.title.toLowerCase().includes(s)||t.band.toLowerCase().includes(s));} return l;},[tracks,activeTheme,search]);
  const cur=filtered[idx % (filtered.length||1)] || tracks[0];
  const handlePlay=(i?:number)=>{if(typeof i==="number") setIdx(i); try{const ac=new (window.AudioContext||(window as any).webkitAudioContext)(); if(ac.state==="suspended") ac.resume();}catch{} setHasInteracted(true); setPlay(true);};
  const embedUrl=`https://www.youtube.com/embed/${cur?.yt}?autoplay=${play&&hasInteracted?1:0}&modestbranding=1&rel=0&enablejsapi=1&playsinline=1&controls=1`;
  return(
    <div style={{background:"#000",color:"#ccc",minHeight:"100vh",fontFamily:"JetBrains Mono, monospace"}}>
      <OwnerBadge/>
      <div style={{background:"#050000",borderBottom:"2px solid #8B0000",padding:"10px",display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:900}}><span style={{color:"#FF2A2A"}}>IA</span>ABISMAL / TEMATICO DISRUPCION</div><button onClick={()=>setShowPlaylist(!showPlaylist)} style={{background:"#8B0000",color:"#fff",border:"none",padding:"8px 14px",fontWeight:900}}>☰ PLAYLIST ({filtered.length})</button></div>
      <div style={{display:"flex",gap:"8px",overflowX:"auto",padding:"12px",background:"#000",borderBottom:"1px solid #1a0000"}}>
        <button onClick={()=>setActiveTheme("TODO")} style={{background:activeTheme==="TODO"?"#FF2A2A":"#111",color:activeTheme==="TODO"?"#000":"#888",border:"1px solid #222",padding:"10px 16px",fontWeight:900,whiteSpace:"nowrap"}}>TODO ({tracks.length})</button>
        {THEMES.map(th=>{const a=activeTheme===th; return <button key={th} onClick={()=>{setActiveTheme(th);setIdx(0);}} style={{background:a?"#8B0000":"#0a0a0a",color:a?"#fff":"#666",border:a?"1px solid #FF2A2A":"1px solid #1a1a1a",padding:"10px 16px",fontSize:"0.7rem",whiteSpace:"nowrap"}}>{th} {a?`• ${filtered.length}`:""}</button>})}
      </div>
      <div style={{padding:"10px"}}><input placeholder="Buscar muerte sangre diablo amor..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",background:"#050505",border:"1px solid #220000",color:"#aaa",padding:"12px"}}/></div>
      <div style={{margin:"10px",background:"radial-gradient(circle,#1a0000 0%,#000 80%)",border:"1px solid #330000",padding:"14px"}}>
        <div style={{display:"flex",gap:"14px"}}><img src={`https://img.youtube.com/vi/${cur?.yt}/hqdefault.jpg`} style={{width:"130px",height:"90px",objectFit:"cover",filter:"brightness(0.7)",border:"1px solid #330000"}} alt=""/><div style={{flex:1}}><div style={{fontWeight:900,color:"#fff"}}>{cur?.title}</div><div style={{fontSize:"0.7rem",color:"#8B0000"}}>{cur?.band} • {cur?.year} • {cur?.themes?.join(", ")}</div><div style={{marginTop:"8px",display:"flex",gap:"6px",flexWrap:"wrap"}}><button onClick={()=>setIdx(i=>Math.max(0,i-1))} style={{background:"#111",color:"#fff",border:"1px solid #333",padding:"8px 12px"}}>◀ ATRÁS</button><button onClick={()=>handlePlay()} style={{background:"#FF2A2A",color:"#000",border:"none",padding:"8px 18px",fontWeight:900}}>{play?"▐▐ SONANDO":"▶ DESATAR"}</button><button onClick={()=>{handlePlay(); setIdx(i=>i+1);}} style={{background:"#111",color:"#fff",border:"1px solid #333",padding:"8px 12px"}}>ADELANTE ▶</button><button onClick={()=>{const r=Math.floor(Math.random()*filtered.length); setIdx(r); handlePlay();}} style={{background:"#000",color:"#8B0000",border:"1px solid #330000",padding:"8px 12px"}}>🔀 DISRUPCIÓN</button></div></div></div>
        <div style={{height: hasInteracted&&play?"280px":"0", overflow:"hidden", marginTop:"10px"}}><iframe key={cur?.yt+String(play)+String(hasInteracted)} src={hasInteracted?embedUrl:`https://www.youtube.com/embed/${cur?.yt}?controls=1`} style={{width:"100%",height:"280px",border:"none"}} allow="autoplay; encrypted-media; fullscreen" allowFullScreen/></div>
      </div>
      <div style={{padding:"0 10px"}}><div style={{color:"#8B0000",fontSize:"0.8rem",fontWeight:900,margin:"12px 0"}}>BLOQUE: {activeTheme} • {filtered.length} ROLAS • SCROLL DISRUPCIÓN</div><div style={{display:"grid",gap:"1px",background:"#110000"}}>{filtered.slice(0,200).map((t,i)=>(<div key={i+t.yt} onClick={()=>handlePlay(i)} style={{background:i===idx?"#1a0000":"#0a0a0a",padding:"12px",display:"flex",justifyContent:"space-between",cursor:"pointer",borderLeft:i===idx?"3px solid #FF2A2A":"3px solid transparent"}}><div><div style={{color:i===idx?"#FF2A2A":"#ccc"}}>{t.title} - {t.band}</div><div style={{color:"#444",fontSize:"0.6rem"}}>{t.themes?.join(" • ")} • {t.year}</div></div><div style={{color:"#330000",fontSize:"0.7rem"}}>{t.sub}</div></div>))}</div></div>
      {showPlaylist && (<div style={{position:"fixed",inset:0,zIndex:100,background:"#000c",display:"flex"}}><div style={{width:"85%",maxWidth:"380px",background:"#000",borderRight:"2px solid #8B0000",overflowY:"auto",padding:"12px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>PLAYLIST {activeTheme}</b><button onClick={()=>setShowPlaylist(false)} style={{background:"#222",color:"#fff",border:"none",padding:"6px 10px"}}>X</button></div>{filtered.slice(0,100).map((t,i)=>(<div key={i} onClick={()=>{handlePlay(i); setShowPlaylist(false);}} style={{padding:"10px 0",borderBottom:"1px solid #111",color:i===idx?"#FF2A2A":"#888"}}>{i+1}. {t.title}</div>))}</div><div style={{flex:1}} onClick={()=>setShowPlaylist(false)}/></div>)}
      <PlayerFooter/><div style={{height:"70px"}}/>
    </div>
  );
}
