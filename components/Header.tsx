'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Moon, Sun, ChevronDown } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border-color)]">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-wider flex items-center">
          <span className="text-[var(--logo-white)]">T</span>
          <span className="text-[#ff9800]">OTT</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[var(--foreground)]">
          <Link href="#" className="hover:text-[#ff9800] transition-colors">Home</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#ff9800] transition-colors group">
            Movies <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#ff9800] transition-colors group">
            Web Series <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#ff9800] transition-colors group">
            OTT <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#ff9800] transition-colors" />
          </div>
          <Link href="#" className="hover:text-[#ff9800] transition-colors">Anime</Link>
          <Link href="#" className="hover:text-[#ff9800] transition-colors">4K HDR</Link>
          <Link href="#" className="hover:text-[#ff9800] transition-colors">Top IMDb</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 text-[var(--foreground)]">
        <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#ff9800] transition-colors"><Search className="w-5 h-5" /></button>
        <button onClick={toggleTheme} className="hover:text-[#ff9800] transition-colors">
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">
          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-black font-bold text-xl leading-none">×</span>
          </button>
          
          <div className="w-full max-w-lg px-4 -mt-32">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Movies & TV-Shows"
                  className="w-full bg-[#202020] border border-gray-700 text-white placeholder-gray-400 rounded-md py-3 pl-12 pr-4 focus:outline-none focus:border-gray-500 transition-colors"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#ff9800] hover:bg-[#ffaa26] text-black font-bold py-3 rounded-md transition-colors"
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
