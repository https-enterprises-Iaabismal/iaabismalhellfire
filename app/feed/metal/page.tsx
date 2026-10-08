'use client';

import { useEffect, useState } from 'react';

interface Track {
  id: string;
  band: string;
  title: string;
  sub: string;
  year: number;
  yt: string;
  themes: string[];
  tier: string;
}

const SUBGENRES = ['TODO', 'BLACK', 'DEATH', 'THRASH', 'DOOM', 'GRIND'];

export default function MetalFeed() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filter, setFilter] = useState('TODO');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/metal-tracks.json');
        const data = await res.json();
        setTracks(data.tracks || []);
      } catch (error) {
        console.error('Error loading tracks:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = tracks.filter((t) => filter === 'TODO' || t.sub === filter);
  const current = filtered[currentIdx] || filtered[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 font-mono text-center">
          <p className="text-2xl font-bold">⚡ INVOCANDO ABYSSAL CORE</p>
          <p className="text-sm mt-2">Cargando 1000 pistas de metal extremo...</p>
        </div>
      </div>
    );
  }

  if (!tracks.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 font-mono">
          ⚠️ Catálogo no disponible
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-mono p-4">
      {/* Header */}
      <header className="border-b border-red-900 pb-4 mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-red-600 tracking-wider">
            IAABISMAL HELLFIRE
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Motor AeroCore-X • {tracks.length} Pistas • Tier Access Control
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Filter Buttons */}
        <nav className="flex gap-2 flex-wrap mb-6">
          {SUBGENRES.map((sg) => (
            <button
              key={sg}
              onClick={() => {
                setFilter(sg);
                setCurrentIdx(0);
              }}
              className={`px-3 py-1 text-xs font-bold transition-all ${
                filter === sg
                  ? 'bg-red-600 text-black border border-red-600'
                  : 'bg-gray-900 border border-gray-700 text-gray-300 hover:border-red-600'
              }`}
            >
              {sg}
              {sg === 'TODO' && ` (${tracks.length})`}
            </button>
          ))}
        </nav>

        {/* Now Playing */}
        {current && (
          <section className="border border-red-900 bg-gray-950 p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Thumbnail */}
              <div className="md:col-span-1">
                <img
                  src={`https://img.youtube.com/vi/${current.yt}/hqdefault.jpg`}
                  alt={current.band}
                  className="w-full aspect-video object-cover bg-gray-800"
                  onError={(e: any) => {
                    e.target.src = `https://picsum.photos/seed/${current.yt}/480/360`;
                  }}
                />
              </div>

              {/* Metadata & Controls */}
              <div className="md:col-span-2">
                <span className="inline-block bg-red-900 text-white px-2 py-1 text-xs font-bold mb-2">
                  {current.sub}
                </span>

                <h2 className="text-2xl font-black mb-1">
                  {current.band}
                </h2>
                <p className="text-red-400 text-lg font-bold mb-3">
                  {current.title}
                </p>

                <div className="text-xs text-gray-400 mb-4 space-y-1">
                  <p>📅 Año: {current.year}</p>
                  <p>🎯 Tier: {current.tier.toUpperCase()}</p>
                  <p>🏷️ {current.themes.join(' • ')}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`https://www.youtube.com/watch?v=${current.yt}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-black font-bold px-4 py-2 text-sm"
                  >
                    ▶ PLAY EN YOUTUBE
                  </a>
                  <button
                    onClick={() =>
                      setCurrentIdx((prev) => (prev + 1) % filtered.length)
                    }
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-2 text-sm border border-gray-600"
                  >
                    ➜ SIGUIENTE
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Grid de Tracks */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase">
            {filter === 'TODO' ? `Todas (${filtered.length})` : `${filter} (${filtered.length})`}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.slice(0, 50).map((track, idx) => (
              <div
                key={track.id}
                onClick={() => setCurrentIdx(idx)}
                className={`cursor-pointer border transition-all ${
                  idx === currentIdx
                    ? 'border-red-600 bg-red-950'
                    : 'border-gray-700 bg-gray-900 hover:border-red-600'
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${track.yt}/default.jpg`}
                  alt={track.band}
                  className="w-full aspect-square object-cover bg-gray-800"
                />
                <div className="p-2">
                  <p className="text-xs font-bold truncate">{track.band}</p>
                  <p className="text-xs text-gray-400 truncate">{track.title}</p>
                  <p className="text-xs text-red-500 mt-1">{track.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
