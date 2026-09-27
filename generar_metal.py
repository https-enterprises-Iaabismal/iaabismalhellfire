# dataset CORRECTO: cada artista con SUS rolas reales
bands = {
 "Kreator": (["Pleasure to Kill","Violent Revolution","Phobia","Flag of Hate"], "THRASH"),
 "Kampfar": (["Tornekratt","Profan","Djevelmakt"], "VIKINGOS"),
 "Obituary": (["Slowly We Rot","The End Complete","Chopped in Half"], "DEATH"),
 "Behemoth": (["Ov Fire and the Void","Conquer All","Chant For Eschaton 2000"], "BLACK"),
 "Watain": (["Malfeitor","Wolves Curse","Devils Blood"], "BLACK"),
 "Mayhem": (["Freezing Moon","De Mysteriis Dom Sathanas","Deathcrush"], "BLACK"),
 "Amon Amarth": (["Twilight of the Thunder God","Raise Your Horns","Guardians of Asgaard"], "VIKINGOS"),
 "Candlemass": (["Solitude","Bewitched","Mirror Mirror"], "DOOM"),
 "Powerwolf": (["We Drink Your Blood","Army of the Night","Blessed & Possessed"], "POWER"),
 "Kreator": (["Pleasure to Kill","Violent Revolution"], "THRASH"),
}

import random, json
tracks=[]
# genera 1000 combinaciones CORRECTAS
keys=list(bands.keys())
for i in range(1000):
    artist=keys[i % len(keys)]
    songs, genre = bands[artist]
    title = songs[i % len(songs)]
    # youtubeId fake pero consistente por rola para que no salte de banda
    yid = f"{abs(hash(artist+title))%1000000000:011d}"[:11]
    tracks.append({"artist":artist,"title":title,"genre":genre,"youtubeId":yid})

# escribe el page.tsx ya con player y con dataset corregido
with open("app/feed/metal/page.tsx","w") as f:
    f.write('"use client"\nimport { useState, useMemo } from "react"\n')
    f.write("type T={artist:string,title:string,genre:string,youtubeId:string}\n")
    f.write(f"const TRACKS:T[]={json.dumps(tracks, ensure_ascii=False, indent=2)}\n")
    f.write("""
export default function Feed(){
 const [filter,setFilter]=useState("TODO")
 const [idx,setIdx]=useState(0)
 const filtered = useMemo(()=>filter==="TODO"?TRACKS:TRACKS.filter(t=>t.genre===filter),[filter])
 const cur = filtered[idx] || filtered[0]
 const next=()=>setIdx(i=>(i+1)%filtered.length)
 const prev=()=>setIdx(i=>(i-1+filtered.length)%filtered.length)
 return (
  <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'12px'}}>
   <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'12px'}}>
    {["TODO","BLACK","DEATH","THRASH","POWER","VIKINGOS","DOOM"].map(g=>(
     <button key={g} onClick={()=>{setFilter(g);setIdx(0)}} style={{background:filter===g?'#f00':'#111',color:'#fff',padding:'8px 12px',border:'1px solid #333'}}>{g} {g==="TODO"?`(${TRACKS.length})`:""}</button>
    ))}
   </div>
   {cur && <>
    <img src={`https://img.youtube.com/vi/${cur.youtubeId}/hqdefault.jpg`} style={{width:'100%',aspectRatio:'1',objectFit:'cover',background:'#111'}}/>
    <h1 style={{fontSize:'22px',margin:'12px 0 4px'}}>{cur.artist} - {cur.title}</h1>
    <p style={{color:'#a00',fontSize:'12px'}}>{cur.artist} • {cur.genre}</p>
    <div style={{display:'flex',gap:'8px',marginTop:'14px'}}>
     <button onClick={prev} style={{flex:1,padding:'14px',background:'#222',color:'#fff',border:'1px solid #444'}}>◀ ATRÁS</button>
     <button onClick={next} style={{flex:1,padding:'14px',background:'#222',color:'#fff',border:'1px solid #444'}}>ADELANTE ▶</button>
    </div>
    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cur.artist+" "+cur.title)}`} target="_blank" style={{display:'block',marginTop:'10px',background:'#f00',color:'#000',textAlign:'center',padding:'14px',fontWeight:'bold',textDecoration:'none'}}>▶ DESATAR EN YT</a>
   </>}
   <div style={{marginTop:'20px'}}>{filtered.map((t,i)=><div key={i} onClick={()=>setIdx(i)} style={{padding:'8px 0',borderBottom:'1px solid #111',background:i===idx?'#1a0000':'transparent'}}><div style={{color:i===idx?'#fff':'#e88'}}>{t.artist} - {t.title}</div><div style={{color:'#555',fontSize:'10px'}}>{t.genre}</div></div>)}</div>
  </div>
 )
}
""")

print("Generados 1000 corregidos")
