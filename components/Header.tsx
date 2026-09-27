'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Moon, Sun, ChevronDown } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="sticky top-0 z-50 px-6 flex items-center justify-between bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border-color)] h-14">
      <div className="flex items-center gap-8 h-full">
        <Link href="/" className="flex items-center gap-0.5" aria-label="TOTT Home">
          <span className="text-[var(--logo-white)] text-3xl font-black tracking-tighter">T</span>
          <span className="text-[#ff9800] text-3xl font-black tracking-tighter">OTT</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--foreground)] h-full">
          <Link href="/" className="hover:text-[#ff9800] transition-colors py-4">Home</Link>
          
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 hover:text-[#ff9800] transition-colors py-4">
              Movies <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
            </button>
            <ul className="absolute top-full left-0 w-48 bg-[#1f1f1f] border border-[#333] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 mt-0">
              <li><Link href="/category/movies/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Latest Movies</Link></li>
              <li><Link href="/category/hindi-movies/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Hindi Movies</Link></li>
              <li><Link href="/category/english-movies/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">English Movies</Link></li>
            </ul>
          </div>
          
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 hover:text-[#ff9800] transition-colors py-4">
              Web Series <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
            </button>
            <ul className="absolute top-full left-0 w-48 bg-[#1f1f1f] border border-[#333] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 mt-0">
              <li><Link href="/category/series/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Latest Episodes</Link></li>
              <li><Link href="/category/korean-series/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Korean</Link></li>
              <li><Link href="/category/drama-series/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Drama</Link></li>
              <li><Link href="/category/hindi-series/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Hindi Series</Link></li>
              <li><Link href="/category/english-series/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">English Series</Link></li>
            </ul>
          </div>
          
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 hover:text-[#ff9800] transition-colors py-4">
              OTT <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
            </button>
            <ul className="absolute top-full left-0 w-48 bg-[#1f1f1f] border border-[#333] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 mt-0">
              <li><Link href="/category/netflix/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Netflix</Link></li>
              <li><Link href="/category/amazon_prime_video/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Amazon Prime Video</Link></li>
              <li><Link href="/category/jiohotstar/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">JioHotstar</Link></li>
              <li><Link href="/category/disney/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Disney+</Link></li>
              <li><Link href="/category/apple_tv/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Apple TV+</Link></li>
              <li><Link href="/category/hbo_max/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">HBO Max</Link></li>
              <li><Link href="/category/hulu/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Hulu</Link></li>
              <li><Link href="/category/crave/index.html" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff9800] hover:text-black transition-colors">Crave</Link></li>
            </ul>
          </div>
          
          <Link href="/category/anime/index.html" className="hover:text-[#ff9800] transition-colors py-4">Anime</Link>
          <Link href="/category/2160p-HDR/index.html" className="hover:text-[#ff9800] transition-colors py-4">4K HDR</Link>
          <Link href="/category/imdb/index.html" className="hover:text-[#ff9800] transition-colors py-4">Top IMDb</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 text-[var(--foreground)] h-full">
        {/* Search Icon */}
        <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#ff9800] transition-colors focus:outline-none py-4">
          <Search className="w-5 h-5" />
        </button>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="hover:text-[#ff9800] transition-colors focus:outline-none py-4">
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Close search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="w-full max-w-2xl px-4 -mt-32">
            <form action="/" method="get" className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input 
                  type="search" 
                  name="search"
                  placeholder="Search Movies & TV-Shows"
                  className="w-full bg-[#1e1e1e] border border-[#333] text-white placeholder-gray-500 rounded-lg py-4 pl-14 pr-4 focus:outline-none focus:border-[#ff9800] transition-colors text-lg"
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#ff9800] hover:bg-[#e68a00] text-black font-bold py-4 rounded-lg transition-colors text-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
