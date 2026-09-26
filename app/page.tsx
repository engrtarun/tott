import React from 'react';
import movies from '@/data/youtube-movies.json';
import { Play, Clapperboard, Star } from 'lucide-react';
import Image from 'next/image';

export default function YouTubeGoldmine() {
  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clapperboard className="text-[var(--color-tott-cyan)] w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wider text-white">TOTT <span className="text-[var(--color-tott-primary)]">Goldmine</span></h1>
        </div>
        <div className="text-sm font-medium px-3 py-1 bg-white/10 rounded-full border border-white/10">
          Free Movies
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] md:h-[60vh] flex flex-col justify-end p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* using Hera Pheri poster as Hero banner */}
          <Image 
            src={`https://img.youtube.com/vi/J1r5hG9Z91E/maxresdefault.jpg`} 
            alt="Hero Banner"
            fill
            className="object-cover opacity-40 blur-sm scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-tott-bg)] via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[var(--color-tott-primary)] text-white text-xs font-bold px-2 py-1 rounded">FEATURED</span>
            <span className="text-gray-300 text-sm flex items-center gap-1"><Star className="w-3 h-3 text-[var(--color-tott-gold)] fill-[var(--color-tott-gold)]" /> 8.1</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">Hera Pheri (2000)</h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-2">Three unemployed men find the answer to all their money problems when they receive a call from a kidnapper. Classic Bollywood comedy free on YouTube!</p>
          <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            <Play className="w-5 h-5 fill-black" /> Play Now
          </button>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="px-6 md:px-12 mt-8">
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[var(--color-tott-cyan)] pl-3">Top Shemaroo & Goldmines Hits</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative rounded-xl overflow-hidden glass-card cursor-pointer hover:glow-cyan transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative aspect-video w-full">
                {/* MAGIC TRICK: High Quality YouTube Thumbnail extraction */}
                <Image 
                  src={`https://img.youtube.com/vi/${movie.id}/maxresdefault.jpg`}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[var(--color-tott-primary)] p-3 rounded-full shadow-lg glow-primary">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-white">
                  {movie.runtime}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-white font-bold line-clamp-1 mb-1">{movie.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{movie.year} • {movie.genre}</span>
                </div>
                <div className="mt-3 text-[10px] font-bold text-[var(--color-tott-cyan)] uppercase tracking-wider">
                  {movie.studio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
