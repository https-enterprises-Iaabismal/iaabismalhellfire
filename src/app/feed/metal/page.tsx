import React from 'react';

export default function MetalFeedPage() {
  return (
    <main className="min-h-screen bg-black text-red-600 p-4 font-mono">
      <header className="border-b border-red-900 pb-4 mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">IAABISMAL HELLFIRE / MOTOR ACTIVO</h1>
        <span className="text-xs bg-red-950 px-2 py-1 border border-red-800">PROD v2.0</span>
      </header>
      <section className="grid gap-4">
        <div className="bg-neutral-950 border border-red-900/50 p-4 rounded">
          <h2 className="text-lg font-semibold text-white mb-2">Catálogo de Metal Extremo (1000 Rolas)</h2>
          <p className="text-sm text-neutral-400 mb-4">Sistema DSP y Motor de Audio Abyssal en línea.</p>
          <div className="flex gap-2 flex-wrap mb-4">
            <button className="bg-red-600 text-black px-3 py-1 font-bold">TODO (1000)</button>
            <button className="bg-neutral-900 border border-red-900 text-white px-3 py-1">MUERTE</button>
            <button className="bg-neutral-900 border border-red-900 text-white px-3 py-1">SANGRE</button>
            <button className="bg-neutral-900 border border-red-900 text-white px-3 py-1">DIABLO</button>
          </div>
          <div className="p-3 bg-black border border-red-900 text-sm text-white">
            ▶ Reproduciendo motor de prueba: Kampfar - Tornekratt
          </div>
        </div>
      </section>
    </main>
  );
}
