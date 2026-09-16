'use client';
import { useEffect, useRef } from 'react';

export default function ReproductorPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaElementSource(audioRef.current);
      
      const bqLow = audioCtx.createBiquadFilter();
      bqLow.type = 'lowshelf';
      bqLow.frequency.value = 250;
      bqLow.gain.value = 6;

      source.connect(bqLow);
      bqLow.connect(audioCtx.destination);
    } catch (e) {
      console.log('AudioContext initialized on interaction');
    }
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Abyssal Player Engine</h1>
      <p style={{ color: '#666' }}>Motor DSP activo para ecualización extrema.</p>
      
      <div style={{ margin: '3rem auto', maxWidth: '400px', background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #222' }}>
        <audio ref={audioRef} controls style={{ width: '100%' }} src="" />
      </div>
    </div>
  );
}
