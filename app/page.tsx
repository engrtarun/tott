import React from 'react';
import movies from '@/data/youtube-movies.json';
import { Play, Clapperboard, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/movie/J1r5hG9Z91E" className="inline-flex items-center justify-center gap-2 bg-[var(--color-text-main)] text-black px-8 py-3 rounded hover:bg-white/90 transition-colors font-bold text-lg">
            <Play className="w-6 h-6 fill-black" /> Play Now
          </Link>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="px-4 md:px-8 mt-8">
        <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#ff9800] pl-3">Latest Releases</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group relative bg-[#08070b] rounded overflow-hidden block cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
              <div className="relative aspect-[2/3] w-full rounded overflow-hidden">
                <Image 
                  // If 'poster' field exists, use it (for local PKP files), otherwise use YouTube vertical crop
                  src={movie.poster || `https://img.youtube.com/vi/${movie.id}/maxresdefault.jpg`}
                  alt={movie.title}
                  fill
                  className={`object-cover ${!movie.poster && 'object-center'} transition-opacity duration-300 group-hover:opacity-80`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* 4KHDHub Style Top-Right Badges */}
                <div className="absolute top-2 right-2 flex gap-0.5 shadow-lg">
                  <span className="bg-[#ff9800] px-1 py-0.5 text-[8px] font-extrabold text-black uppercase">{movie.quality}</span>
                  {movie.quality === '4K' && <span className="bg-[#18151b] px-1 py-0.5 text-[8px] font-bold text-white uppercase">DV</span>}
                  <span className="bg-[#E50914] px-1 py-0.5 text-[8px] font-bold text-white uppercase">HDR</span>
                </div>
              </div>
              
              <div className="pt-3 pb-1">
                <h4 className="text-[#f7f7f8] font-bold text-sm md:text-base line-clamp-1 group-hover:text-[#ff9800] transition-colors">{movie.title}</h4>
                <div className="flex flex-wrap items-center gap-1 mt-1 text-[#aaa4af] text-[11px]">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
