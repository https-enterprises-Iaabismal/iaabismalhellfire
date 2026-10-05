"use client"
import { useRef } from "react"
export default function MetalFeed(){
  const audioRef=useRef<HTMLAudioElement>(null)
  const chafa=()=>{
    const a=audioRef.current!
    const ctx=new (window as any).AudioContext()
    const src=ctx.createMediaElementSource(a)
    const f=ctx.createBiquadFilter()
    f.type='lowpass'; f.frequency.value=500
    src.connect(f); f.connect(ctx.destination)
    a.volume=0.1; a.play()
  }
  return(
    <div className="bg-black min-h-screen text-white p-6">
      <h1>ABISMAL HELLFIRE - FIX</h1>
      <button onClick={chafa} className="bg-zinc-800 px-4 py-2 rounded-full mt-4">SONAR CHAFA</button>
      <button onClick={()=>location.reload()} className="bg-red-700 px-4 py-2 rounded-full mt-4 ml-2">NORMAL</button>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />
      <div className="border border-zinc-800 p-4 mt-6">KAMPFAR - Tornekratt [OK]</div>
      <div className="border border-zinc-800 p-4 mt-4">MAYHEM - De Mysteriis [OK]</div>
    </div>
  )
}
