'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePagar = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pagos/mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: 'Acceso Mensual - IAABISMAL HELLFIRE',
          precioMXN: 100,
          videoId: 'true_mensual'
        })
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al generar pasarela: ' + (data.error || 'Desconocido'));
      }
    } catch (e) {
      alert('Error de red al conectar con MercadoPago');
    } finally {
      setLoading(false);
    }
  };

  const handleAccesoAdmin = () => {
    localStorage.setItem('iaabismal_admin', 'true');
    router.push('/reproductor');
  };

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#ff4444', fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        IAABISMAL HELLFIRE
      </h1>
      <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '2rem' }}>
        Motor de Audio Extremo & Streaming Service
      </p>

      <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #222', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 4px 20px rgba(255,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Acceso Mensual</h3>
        <p style={{ fontSize: '2rem', color: '#00ffcc', fontWeight: 'bold', marginBottom: '1rem' }}>$100 MXN</p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>Acceso completo al streaming y motor abismal.</p>
        
        <button 
          onClick={handlePagar}
          disabled={loading}
          style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', width: '100%', cursor: 'pointer', marginBottom: '1rem' }}
        >
          {loading ? 'Conectando con MP...' : 'Obtener Acceso'}
        </button>

        <button 
          onClick={handleAccesoAdmin}
          style={{ background: 'transparent', color: '#00ffcc', border: '1px solid #00ffcc', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem', width: '100%', cursor: 'pointer' }}
        >
          Soy el Creador (Acceso Directo)
        </button>
      </div>
    </main>
  );
}
