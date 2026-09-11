'use client';
import { useEffect, useRef } from 'react';

export default function ReproductorPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('iaabismal_admin');
    if (!isAdmin) {
      // Si no es admin, lo mandamos al inicio a pagar
      window.location.href = '/';
    }
  }, []);

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ffcc', fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Abyssal Player Engine
      </h1>
      <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '2rem' }}>
        Motor DSP activo para ecualización extrema.
      </p>

      <div style={{ margin: '3rem auto', maxWidth: '400px', width: '100%', background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #222', textAlign: 'center' }}>
        <p style={{ color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem' }}>STREAMING ACTIVO - 100% EXTREMO</p>
        <audio 
          ref={audioRef} 
          controls 
          style={{ width: '100%' }} 
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        />
      </div>
    </main>
  );
}
