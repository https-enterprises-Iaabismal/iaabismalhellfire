'use client';
import { useEffect, useRef, useState } from 'react';

export default function ReproductorPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [preset, setPreset] = useState('abismal');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/abyssal-processor.js';
    script.onload = () => {
      if (!audioRef.current) return;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = ctx.createMediaElementSource(audioRef.current);
      // @ts-ignore
      const engine = new window.AbyssalMetalEngine(ctx);
      engine.setPreset(preset);
      source.connect(engine.getInput());
      engine.connect(ctx.destination);
    };
    document.body.appendChild(script);
  }, [preset]);

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#FF2A2A', fontSize: '2rem' }}>IAABISMAL HELLFIRE - METAL MODE</h1>
      <p style={{ color: '#00FF88' }}>Motor: {preset.toUpperCase()} | Sub 60Hz + Scoop 800Hz + Presence 3kHz</p>
      <div style={{ margin: '2rem auto', maxWidth: '500px', background: '#111', padding: '1rem', borderRadius: '12px', border: '1px solid #222' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
          {['metal','doom','thrash','abismal'].map(p => (
            <button key={p} onClick={() => setPreset(p)} style={{ padding: '0.5rem 1rem', background: preset===p?'#FF2A2A':'#222', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{p}</button>
          ))}
        </div>
        <audio ref={audioRef} controls style={{ width: '100%' }} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      </div>
      <p style={{ color: '#666', fontSize: '0.8rem' }}>Nicho: Metal Poderoso - Sin algoritmo, solo riffs abismales</p>
    </main>
  );
}
