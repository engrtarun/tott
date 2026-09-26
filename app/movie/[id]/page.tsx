import React from 'react';
import movies from '@/data/youtube-movies.json';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronLeft, Film } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function MovieDetails({ params }: { params: { id: string } }) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const movie = movies.find((m) => m.id === resolvedParams.id);
  
  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08070b] text-[#f7f7f8] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-[#08070b]/95 backdrop-blur-sm border-b border-[#18151b]">
        <Link href="/" className="flex items-center gap-2 hover:text-[var(--color-netflix-red)] transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Home / Movies</span>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl border border-white/5">
              <Image 
                src={movie.poster || `https://img.youtube.com/vi/${movie.id}/maxresdefault.jpg`}
                alt={movie.title}
                fill
                className={`object-cover ${!movie.poster && 'object-center'}`}
                priority
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col pt-2">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title} ({movie.year})</h1>
            
            <p className="text-[#ff9800] italic text-lg mb-6">
              {movie.tagline}
            </p>

            {/* Pill Tags Row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {movie.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-[#211a20] text-xs font-semibold text-[#d7d3dc] bg-transparent hover:border-[#aaa4af] transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a href={`https://youtube.com/watch?v=${movie.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#ff9800] text-black px-6 py-2.5 rounded font-bold hover:bg-[#e68a00] transition-colors">
                <Play className="w-5 h-5 fill-black" /> Watch Online
              </a>
              <a href={`https://youtube.com/watch?v=${movie.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#ff9800] text-black px-6 py-2.5 rounded font-bold hover:bg-[#e68a00] transition-colors">
                <Film className="w-5 h-5 fill-black" /> Trailer
              </a>
            </div>

            {/* Description */}
            <p className="text-[#aaa4af] text-sm md:text-base leading-relaxed mb-8 max-w-4xl">
              {movie.description}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-[100px_1fr] gap-y-4 text-sm">
              <div className="text-gray-500 font-semibold text-xs tracking-wider">DIRECTOR:</div>
              <div className="text-[#d7d3dc]">{movie.director}</div>

              <div className="text-gray-500 font-semibold text-xs tracking-wider">STARS:</div>
              <div className="text-[#d7d3dc]">{movie.stars}</div>

              <div className="text-gray-500 font-semibold text-xs tracking-wider">RELEASE:</div>
              <div className="text-[#d7d3dc]">{movie.year}</div>

              <div className="text-gray-500 font-semibold text-xs tracking-wider">PRINTS:</div>
              <div className="flex gap-2">
                <span className="border border-[#ff9800] text-[#ff9800] px-2 py-0.5 rounded text-[10px] font-bold">{movie.quality === '4K' ? '2160p' : '1080p'}</span>
                <span className="border border-[#ff9800] text-[#ff9800] px-2 py-0.5 rounded text-[10px] font-bold">WEB-DL</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
