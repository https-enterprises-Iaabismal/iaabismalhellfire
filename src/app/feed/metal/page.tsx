'use client';

import React, { useEffect, useState } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/metal-tracks.json")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando el abismo:", err));
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-extrabold text-red-600 mb-4">FEED METAL ABYSMAL ({tracks.length} Tracks)</h1>
      {loading ? (
        <p className="text-gray-400">Invocando los 1,000 tracks del inframundo...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.slice(0, 50).map((track: any) => (
            <div key={track.id} className="p-4 border border-red-900 bg-zinc-900 rounded-lg">
              <span className="text-xs text-red-500 font-bold uppercase">[{track.subgenre}]</span>
              <h3 className="font-bold text-lg">{track.title}</h3>
              <p className="text-sm text-gray-400">{track.artist}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${track.tier === 'free' ? 'bg-green-800' : 'bg-red-800'}`}>
                {track.tier.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
