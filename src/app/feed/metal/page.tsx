"use client";
import { useEffect, useState } from "react";

export default function MetalFeed() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("/data/metal-tracks.json")
      .then(r => r.json())
      .then(d => setTracks(d.tracks || []))
      .catch(err => console.error("Error cargando el abismo:", err));
  }, []);

  return (
    <div>
      <h1>Feed de Metal Extremo ({tracks.length} pistas)</h1>
    </div>
  );
}
