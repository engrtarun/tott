'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 'animal-movie',
    title: 'ANIMAL',
    badge: 'BLOCKBUSTER',
    genre: 'Hindi | Action, Drama',
    description: 'A TOTT EXCLUSIVE PRESENTATION',
    videoSrc: '/trailers/animal.mp4',
  },
  {
    id: 'maalik-movie',
    title: 'MAALIK',
    badge: 'NEW SERIES',
    genre: 'Hindi | Action, Thriller',
    description: 'A TOTT STUDIOS PRODUCTION',
    videoSrc: '/trailers/maalik.mp4',
  },
  {
    id: 'mirzapur-movie',
    title: 'MIRZAPUR THE MOVIE',
    badge: 'NEW MOVIE',
    genre: 'Hindi | Action, Crime, Thriller',
    description: 'A TOTT ORIGINAL PRODUCTION',
    videoSrc: '/trailers/mirzapur.mp4',
    logoSrc: '', // We will use text since we don't have images
  },
  {
    id: 'ramayana-movie',
    title: 'RAMAYANA',
    badge: 'EPIC SAGA',
    genre: 'Hindi | Mythological, Action',
    description: 'A TOTT GRAND PRESENTATION',
    videoSrc: '/trailers/ramayana.mp4',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-slide every 30 seconds if muted
  useEffect(() => {
    if (!isMuted) return; // If unmuted, let the user watch the full trailer without interrupting

    const timer = setInterval(() => {
      handleNext();
    }, 30000);
    return () => clearInterval(timer);
  }, [currentIndex, isMuted]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // Play current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0;
          video.play().catch(e => console.log('Autoplay blocked:', e));
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[85vh] bg-black overflow-hidden group">
      {/* Background Videos */}
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={item.videoSrc}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
          />
        </div>
      ))}

      {/* Gradient Overlays (MX Player style dark fades) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent pointer-events-none" />
      
      {/* Top Gradient for header visibility */}
      <div className="absolute top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* U/A Badge (MX Player Style) */}
      <div className="absolute top-6 left-4 md:top-8 md:left-12 lg:left-20 z-30">
        <div className="border border-[#ff9800]/60 bg-black/60 text-[#ff9800] px-2 py-0.5 text-[10px] md:text-xs font-bold rounded-sm backdrop-blur-md inline-block shadow-lg">
          U/A 13+
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end px-4 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-3 md:gap-4 transition-all duration-700 translate-y-0 opacity-100" key={currentIndex}>
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-[#ff9800] text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              {currentItem.badge}
            </span>
            <span className="text-white text-xs md:text-sm font-semibold hidden md:inline-block">TOTT original</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
            {currentItem.title}
          </h1>

          {/* Genres */}
          <div className="text-gray-300 text-xs md:text-sm font-medium">
            {currentItem.genre}
          </div>

          {/* Branding (Production) */}
          <div className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-widest mt-1">
            {currentItem.description}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4">
            <Link 
              href={`/movie/${currentItem.id}`}
              className="flex items-center justify-center gap-2 bg-[#ff9800] hover:bg-[#e68a00] text-black px-5 md:px-8 py-2 md:py-2.5 rounded text-sm md:text-base font-bold transition-colors shadow-lg"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-black" />
              Play
            </Link>
            <Link
              href={`/movie/${currentItem.id}`}
              className="flex items-center justify-center gap-2 bg-[#2f2f2f]/80 hover:bg-[#404040]/90 text-white px-4 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base font-bold transition-colors backdrop-blur-sm border border-white/10"
            >
              More Info
            </Link>
            <button className="flex items-center justify-center gap-1.5 text-white/90 hover:text-white px-3 py-2 rounded text-sm md:text-base font-bold transition-colors group">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline-block">Add to My List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls (Right Bottom) */}
      <div className="absolute right-4 md:right-12 lg:right-20 bottom-16 md:bottom-24 z-30 flex items-center gap-3 md:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 md:w-10 h-1.5 bg-white rounded-full' 
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
