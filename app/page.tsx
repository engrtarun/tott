import React from 'react';
import movies from '@/data/youtube-movies.json';
import { Play, Flame, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function YouTubeGoldmine({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search?.toLowerCase() || '';

  const filteredMovies = searchQuery
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery) ||
          m.director?.toLowerCase().includes(searchQuery) ||
          m.stars?.toLowerCase().includes(searchQuery)
      )
    : movies;

  const mhcuMovies = filteredMovies.filter(m => m.tags?.includes('MHCU'));
  const yrfMovies = filteredMovies.filter(m => m.tags?.includes('YRF Spy Universe'));
  const latestMovies = filteredMovies.filter(m => !m.tags?.includes('MHCU') && !m.tags?.includes('YRF Spy Universe'));

  return (
    <main className="min-h-screen pb-20 bg-[var(--background)]">
      <Header />

      {searchQuery && (
        <section className="px-4 md:px-8 mt-10 max-w-[1400px] mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] border-l-[3px] border-[#ff9800] pl-3">
            Search Results for: <span className="text-[#ff9800]">"{searchQuery}"</span>
          </h2>
          {filteredMovies.length === 0 && (
            <p className="text-gray-400 mt-4">No movies found.</p>
          )}
        </section>
      )}

      {/* MHCU Grid */}
      {mhcuMovies.length > 0 && (
      <section className="px-4 md:px-8 mt-10 mb-8 max-w-[1400px] mx-auto">
        <h3 className="text-[22px] font-extrabold text-[var(--foreground)] mb-6 border-l-[3px] border-[#ff9800] pl-3">Maddock Horror Comedy Universe</h3>
        
        <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2">
          {mhcuMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-none w-[150px] md:w-[180px] lg:w-[200px] group relative bg-transparent flex flex-col gap-2 cursor-pointer transition-transform duration-300 hover:-translate-y-1 snap-start">
              <div className="relative aspect-[2/3] w-full rounded shadow-sm overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src={movie.poster!}
                  alt={movie.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex gap-0.5 shadow-lg">
                  {movie.tags?.includes('Upcoming') ? (
                    <span className="bg-[var(--color-netflix-red)] px-2 py-0.5 text-[10px] font-extrabold text-white tracking-widest uppercase rounded-sm shadow-md animate-pulse">Upcoming</span>
                  ) : (
                    <>
                      <span className="bg-[#ff9800] px-1 py-0.5 text-[8px] font-extrabold text-black uppercase">{movie.quality}</span>
                      {movie.quality === '4K' && <span className="bg-[#18151b] px-1 py-0.5 text-[8px] font-bold text-white uppercase">DV</span>}
                      <span className="bg-[#E50914] px-1 py-0.5 text-[8px] font-bold text-white uppercase">HDR</span>
                    </>
                  )}
                </div>
              </div>
              <div className="px-1 flex flex-col gap-0.5 mt-1">
                <h4 className="text-[var(--foreground)] font-bold text-sm line-clamp-1 group-hover:text-[#ff9800] transition-colors">{movie.title}</h4>
                <div className="flex flex-wrap items-center gap-1 text-[var(--text-muted)] text-[11px] font-medium">
                  <span>{movie.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}

      {/* YRF Spy Universe Slider */}
      {yrfMovies.length > 0 && (
      <section className="px-4 md:px-8 mt-4 mb-8 max-w-[1400px] mx-auto">
        <h3 className="text-[22px] font-extrabold text-[var(--foreground)] mb-6 border-l-[3px] border-[#ff9800] pl-3">YRF Spy Universe</h3>
        
        <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2">
          {yrfMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-none w-[150px] md:w-[180px] lg:w-[200px] group relative bg-transparent flex flex-col gap-2 cursor-pointer transition-transform duration-300 hover:-translate-y-1 snap-start">
              <div className="relative aspect-[2/3] w-full rounded shadow-sm overflow-hidden border border-[var(--border-color)]">
                <Image 
                  src={movie.poster || `https://img.youtube.com/vi/${movie.id}/maxresdefault.jpg`}
                  alt={movie.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                
                <div className="absolute top-1.5 right-1.5 flex gap-[3px] flex-wrap justify-end max-w-[85%] z-10">
                  {movie.tags?.includes('Upcoming') ? (
                    <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">Upcoming</span>
                  ) : (
                    <>
                      <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-[#d97706] to-[#f59e0b] text-black border border-amber-400/50 shadow-[0_1px_3px_rgba(217,119,6,0.5)] backdrop-blur-sm">{movie.quality || 'HD'}</span>
                      {movie.quality === '4K' && <span className="inline-flex items-center justify-center px-[4px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-black text-white border border-white/30 backdrop-blur-sm">DV</span>}
                      <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">HDR</span>
                    </>
                  )}
                </div>

                {/* Hover Overlay with Genres */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {movie.genre.split(',').map((g, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded-sm text-xs font-semibold text-white/90 uppercase tracking-wider">{g.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="px-1 flex flex-col gap-0.5 mt-1">
                <h4 className="text-[var(--foreground)] font-bold text-sm line-clamp-1 group-hover:text-[#ff9800] transition-colors">{movie.title}</h4>
                <div className="flex flex-wrap items-center gap-1 text-[var(--text-muted)] text-[11px] font-medium">
                  <span>{movie.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}

      {/* Latest Releases Grid */}
      {latestMovies.length > 0 && (
      <section className="px-4 md:px-8 mt-12 mb-16 max-w-[1400px] mx-auto">
        <h3 className="text-[22px] font-extrabold text-[var(--foreground)] mb-6 border-l-[3px] border-[#ff9800] pl-3 flex items-center gap-2">
          <Flame className="w-6 h-6 text-[#ff9800] fill-[#ff9800]" /> Latest Releases
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {latestMovies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group relative bg-transparent flex flex-col gap-2 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-[2/3] w-full rounded shadow-sm overflow-hidden border border-[var(--border-color)]">
                <Image 
                  // If 'poster' field exists, use it (for local PKP files), otherwise use YouTube vertical crop
                  src={movie.poster || `https://img.youtube.com/vi/${movie.id}/maxresdefault.jpg`}
                  alt={movie.title}
                  fill
                  className={`object-cover ${!movie.poster && 'object-center'} transition-opacity duration-300 group-hover:opacity-80`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                
                <div className="absolute top-1.5 right-1.5 flex gap-[3px] flex-wrap justify-end max-w-[85%] z-10">
                  {movie.tags?.includes('Upcoming') ? (
                    <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">Upcoming</span>
                  ) : (
                    <>
                      <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-[#d97706] to-[#f59e0b] text-black border border-amber-400/50 shadow-[0_1px_3px_rgba(217,119,6,0.5)] backdrop-blur-sm">{movie.quality || 'HD'}</span>
                      {movie.quality === '4K' && <span className="inline-flex items-center justify-center px-[4px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-black text-white border border-white/30 backdrop-blur-sm">DV</span>}
                      <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold tracking-[0.3px] uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">HDR</span>
                    </>
                  )}
                </div>

                {/* Hover Overlay with Genres */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {movie.genre.split(',').map((g, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded-sm text-xs font-semibold text-white/90 uppercase tracking-wider">{g.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="px-1 flex flex-col gap-0.5 mt-1">
                <h4 className="text-[var(--foreground)] font-bold text-sm line-clamp-1 group-hover:text-[#ff9800] transition-colors">{movie.title}</h4>
                <div className="flex flex-wrap items-center gap-1 text-[var(--text-muted)] text-[11px] font-medium">
                  <span>{movie.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded bg-[#ff9800] text-white font-bold shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">394</button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">&gt;</button>
        </div>
      </section>
      )}


      <Footer />
    </main>
  );
}
