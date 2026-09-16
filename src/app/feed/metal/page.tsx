'use client'; import { useEffect, useState } from "react";
export default function Feed(){
  const [tracks,setTracks]=useState<any[]>([]);
  useEffect(()=>{fetch("/data/metal-tracks.json").then(r=>r.json()).then(d=>setTracks(d.tracks||[]))},[]);
  return (<div className="p-6 bg-black text-white min-h-screen"><h1 className="text-3xl font-bold text-red-600">FEED ABISMAL ({tracks.length})</h1><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">{tracks.slice(0,100).map((t:any)=>(<div key={t.id} className="p-4 border border-red-900 bg-zinc-900 rounded"><span className="text-xs text-red-500">[{t.sub}]</span><h3 className="font-bold">{t.title}</h3><p className="text-sm text-gray-400">{t.band}</p></div>))}</div></div>);
}
