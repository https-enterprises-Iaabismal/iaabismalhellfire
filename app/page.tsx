'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handlePago = async (titulo: string, precioMXN: number, videoId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/pagos/mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, precioMXN, videoId }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al generar el pago: ' + (data.error || 'Desconocido'));
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con la pasarela.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '2px', color: '#ff2a2a' }}>IAABISMAL HELLFIRE</h1>
        <p style={{ color: '#888' }}>Motor de Audio Extremo & Streaming Service</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Plan 1 */}
        <div style={{ background: '#141414', border: '1px solid #333', padding: '2rem', borderRadius: '8px', width: '300px' }}>
          <h2>Acceso Mensual</h2>
          <p style={{ fontSize: '2rem', color: '#00ffcc', margin: '1rem 0' }}>$100 MXN</p>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Acceso completo al streaming y motor abismal.</p>
          <button 
            onClick={() => handlePago('TRUE - 100 al mes', 100, 'true_mensual')}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', background: '#ff2a2a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.5rem' }}
          >
            {loading ? 'Procesando...' : 'Obtener Acceso'}
          </button>
        </div>

        {/* Plan 2 */}
        <div style={{ background: '#141414', border: '1px solid #333', padding: '2rem', borderRadius: '8px', width: '300px' }}>
          <h2>Pack Audiófilo</h2>
          <p style={{ fontSize: '2rem', color: '#00ffcc', margin: '1rem 0' }}>$200 MXN</p>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Presets avanzados de ecualización extrema y alta fidelidad.</p>
          <button 
            onClick={() => handlePago('Audiofilo Pack', 200, 'audiofilo')}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', background: '#00ffcc', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.5rem' }}
          >
            {loading ? 'Procesando...' : 'Comprar Pack'}
          </button>
        </div>
      </div>
    </main>
  );
}
