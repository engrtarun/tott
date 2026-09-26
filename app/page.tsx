import React from 'react';
import movies from '@/data/youtube-movies.json';
import { Play, Clapperboard, Star } from 'lucide-react';
import Image from 'next/image';

export default function YouTubeGoldmine() {
  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-[#08070b]/95 backdrop-blur-sm border-b border-[#18151b]">
        <div className="flex items-center gap-2">
          <Clapperboard className="text-[var(--color-netflix-red)] w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wider text-white">TOTT <span className="font-normal text-[var(--color-text-muted)]">Goldmine</span></h1>
        </div>
        <div className="text-sm font-medium px-4 py-1.5 bg-[var(--color-netflix-red)] text-white rounded cursor-pointer hover:bg-red-700 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#08070b] via-[#08070b]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[var(--color-netflix-red)] text-white text-xs font-bold px-2 py-1 rounded-sm">FEATURED</span>
            <span className="text-[var(--color-text-main)] text-sm flex items-center gap-1"><Star className="w-3 h-3 text-[#ff9800] fill-[#ff9800]" /> 8.1</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">Hera Pheri (2000)</h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-2">Three unemployed men find the answer to all their money problems when they receive a call from a kidnapper. Classic Bollywood comedy free on YouTube!</p>
          <button className="flex items-center justify-center gap-2 bg-[var(--color-text-main)] text-black px-8 py-3 rounded hover:bg-white/90 transition-colors font-bold text-lg">
            <Play className="w-6 h-6 fill-black" /> Play Now
          </button>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="px-4 md:px-8 mt-8">
        <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#ff9800] pl-3">Top Shemaroo & Goldmines Hits</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {movies.map((movie) => (
            <a key={movie.id} href={`https://youtube.com/watch?v=${movie.id}`} target="_blank" rel="noopener noreferrer" className="group relative bg-[#18151b] rounded-lg overflow-hidden movie-card block cursor-pointer border border-transparent hover:border-[#211a20]">
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
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="border-2 border-[var(--color-text-main)] rounded-full p-3 hover:bg-[var(--color-text-main)] hover:text-black transition-colors">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  <span className="bg-[#15803d] px-1.5 py-0.5 rounded text-[10px] font-bold text-white">{movie.quality}</span>
                  <span className="bg-[#ea580c] px-1.5 py-0.5 rounded text-[10px] font-bold text-white">{movie.runtime}</span>
                </div>
              </div>
              
              <div className="p-3">
                <h4 className="text-[#f7f7f8] font-bold text-sm md:text-base line-clamp-1 mb-1 group-hover:text-[#ff9800] transition-colors">{movie.title}</h4>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[#aaa4af] text-[11px]">{movie.year}</span>
                  <span className="bg-[#0d9488]/20 text-[#0d9488] px-1.5 py-0.5 rounded text-[10px] font-bold">{movie.genre}</span>
                </div>
                <div className="text-[10px] font-bold text-[#ff9800] uppercase tracking-wider truncate">
                  {movie.studio}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
