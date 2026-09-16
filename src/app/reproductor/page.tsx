'use client'; import { useRef, useEffect, useState } from 'react';
export default function Player(){
  const ref=useRef<HTMLAudioElement>(null);
  useEffect(()=>{
    if(!ref.current) return;
    try{ const ctx=new (window.AudioContext||(window as any).webkitAudioContext)(); const src=ctx.createMediaElementSource(ref.current); const low=ctx.createBiquadFilter(); low.type='lowshelf'; low.frequency.value=120; low.gain.value=12; const high=ctx.createBiquadFilter(); high.type='highshelf'; high.frequency.value=3000; high.gain.value=-3; src.connect(low); low.connect(high); high.connect(ctx.destination);}catch(e){}
  },[]);
  return (<div className="bg-black text-white min-h-screen p-8 text-center"><h1 className="text-2xl font-bold text-red-600">Abyssal Engine - Infierno</h1><p className="text-zinc-500">Lowshelf +12dB a 120Hz - Patea tímpanos</p><div className="max-w-md mx-auto mt-8 bg-zinc-900 p-6 rounded border border-red-900"><audio ref={ref} controls className="w-full" src=""/><button onClick={()=>ref.current?.play()} style={{marginTop:'1.5rem', background:'#dc2626', color:'white', padding:'12px', borderRadius:'8px', width:'100%'}}>COMPRAR PACK ABISMAL</button></div></div>);
}
