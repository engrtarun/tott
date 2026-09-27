'use client';

import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';

export default function MoviePlayer({ 
  movieId, 
  title, 
  trailerId 
}: { 
  movieId: string; 
  title: string; 
  trailerId?: string; 
}) {
  const [playing, setPlaying] = useState<'movie' | 'trailer' | null>(null);

  return (
    <>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => {
            setPlaying('movie');
            setTimeout(() => document.getElementById('media-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
          }} 
          className="inline-flex items-center gap-2 bg-[#ff9800] text-black px-6 py-2.5 rounded font-bold hover:bg-[#e68a00] transition-colors"
        >
          <Play className="w-5 h-5 fill-black" /> Watch Online
        </button>
        {trailerId && (
          <button 
            onClick={() => {
              setPlaying('trailer');
              setTimeout(() => document.getElementById('media-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
            className="inline-flex items-center gap-2 bg-[#2a2431] text-[#f7f7f8] border border-[#3e3546] px-6 py-2.5 rounded font-bold hover:bg-[#3e3546] transition-colors"
          >
            <Film className="w-5 h-5" /> Trailer
          </button>
        )}
      </div>

      {/* Media Section rendered full width using absolute or just within the flow if we change layout */}
      {playing && (
        <div id="media-section" className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8">
          <button 
            onClick={() => setPlaying(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 font-bold text-xl z-[101]"
          >
            ✕ Close
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
            {playing === 'movie' ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${movieId.split('_')[0]}?autoplay=1&mute=0`} 
                title={`${title} Full Movie`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            ) : (
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0`} 
                title={`${title} Trailer`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
}
