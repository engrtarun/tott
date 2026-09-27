'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 'maalik-movie',
    title: 'MAALIK',
    badge: 'NEW SERIES',
    genre: 'Hindi | Action, Thriller',
    description: 'A TOTT STUDIOS PRODUCTION',
    videoSrc: '/trailers/maalik.mp4',
    certification: 'U/A 16+',
  },
  {
    id: 'love-aaj-kal-2-movie',
    title: 'LOVE AAJ KAL 2',
    badge: 'ROMANCE',
    genre: 'Hindi | Romance, Drama',
    description: 'A TOTT EXCLUSIVE PRESENTATION',
    videoSrc: '/trailers/loveaajkal.mp4',
    certification: 'U/A 13+',
  },
  {
    id: 'animal-movie',
    title: 'ANIMAL',
    badge: 'BLOCKBUSTER',
    genre: 'Hindi | Action, Drama',
    description: 'A TOTT EXCLUSIVE PRESENTATION',
    videoSrc: '/trailers/animal.mp4',
    certification: 'A',
  },
  {
    id: 'an-action-hero-movie',
    title: 'AN ACTION HERO',
    badge: 'ACTION COMEDY',
    genre: 'Hindi | Action, Comedy, Thriller',
    description: 'A TOTT ORIGINAL PRODUCTION',
    videoSrc: '/trailers/actionhero.mp4',
    certification: 'U/A 13+',
  },
  {
    id: 'mirzapur-movie',
    title: 'MIRZAPUR THE MOVIE',
    badge: 'NEW MOVIE',
    genre: 'Hindi | Action, Crime, Thriller',
    description: 'A TOTT ORIGINAL PRODUCTION',
    videoSrc: '/trailers/mirzapur.mp4',
    logoSrc: '', 
    certification: 'A',
  },
  {
    id: 'ramayana-movie',
    title: 'RAMAYANA',
    badge: 'EPIC SAGA',
    genre: 'Hindi | Mythological, Action',
    description: 'A TOTT GRAND PRESENTATION',
    videoSrc: '/trailers/ramayana.mp4',
    certification: 'U',
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
    <div className="relative w-full flex flex-col md:block md:h-[80vh] lg:h-[85vh] bg-[var(--background)] overflow-hidden group">
      
      {/* Video Container (16:9 on mobile, absolute full-screen on desktop) */}
      <div className="relative w-full aspect-video md:absolute md:inset-0 md:h-full md:aspect-auto z-10 bg-black">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
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
        
        {/* Desktop Gradients inside video container */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/40 to-transparent pointer-events-none hidden md:block" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent pointer-events-none hidden md:block" />
        <div className="absolute top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none hidden md:block" />
        
        {/* Mobile Gradient */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent pointer-events-none md:hidden" />

        {/* U/A Badge */}
        <div className="absolute top-2 left-2 md:top-8 md:left-12 lg:left-20 z-30">
          <div className="border border-[#ff9800]/60 bg-black/60 text-[#ff9800] px-1.5 py-0.5 md:px-2 md:py-0.5 text-[8px] md:text-xs font-bold rounded-sm backdrop-blur-md inline-block shadow-lg">
            {currentItem.certification}
          </div>
        </div>

        {/* Mobile Mute Button */}
        <div className="absolute right-2 bottom-2 md:hidden z-30">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Container (Below video on mobile, absolute over video on desktop) */}
      <div className="relative md:absolute md:inset-0 z-30 flex flex-col justify-end px-4 py-4 md:px-12 lg:px-20 md:pb-24">
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-2 md:gap-4 transition-all duration-700 translate-y-0 opacity-100" key={currentIndex}>
          
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-[#ff9800] text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              {currentItem.badge}
            </span>
            <span className="text-white text-xs md:text-sm font-semibold hidden md:inline-block">TOTT original</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none">
            {currentItem.title}
          </h1>

          {/* Genres */}
          <div className="text-gray-300 text-xs md:text-sm font-medium">
            {currentItem.genre}
          </div>

          {/* Branding (Production) */}
          <div className="text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-widest mt-1">
            {currentItem.description}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 md:mt-4">
            <Link 
              href={`/movie/${currentItem.id}`}
              className="flex items-center justify-center gap-1.5 md:gap-2 bg-[#ff9800] hover:bg-[#e68a00] text-black px-4 md:px-8 py-2 md:py-2.5 rounded text-sm md:text-base font-bold transition-colors shadow-lg"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-black" />
              Play
            </Link>
            <Link
              href={`/movie/${currentItem.id}`}
              className="flex items-center justify-center gap-2 bg-[#2f2f2f]/80 hover:bg-[#404040]/90 text-white px-3 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base font-bold transition-colors backdrop-blur-sm border border-white/10"
            >
              More Info
            </Link>
            <button className="flex items-center justify-center gap-1 text-white/90 hover:text-white px-2 py-2 rounded text-sm md:text-base font-bold transition-colors group">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline-block">Add to My List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Controls (Right Bottom) */}
      <div className="hidden md:flex absolute right-12 lg:right-20 bottom-24 z-30 items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Pagination Dots (Bottom Center on desktop, below content on mobile) */}
      <div className="relative md:absolute md:bottom-6 left-0 w-full flex items-center justify-center gap-2 pb-4 pt-2 md:pb-0 md:pt-0 z-30">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 md:w-10 h-1 md:h-1.5 bg-[#ff9800] md:bg-white rounded-full' 
                : 'w-1 md:w-1.5 h-1 md:h-1.5 bg-gray-600 md:bg-white/40 hover:bg-white/70 rounded-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
