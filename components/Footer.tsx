import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--footer-bg)] py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-0.5 mb-2" aria-label="TOTT Home">
            <span className="text-[var(--logo-white)] text-3xl font-black tracking-tighter">T</span>
            <span className="text-[#ff9800] text-3xl font-black tracking-tighter">OTT</span>
          </Link>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[250px]">
            Your one-stop destination for high-quality movies and TV shows in various formats.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-center gap-4">
          <h4 className="text-[var(--foreground)] font-bold text-[15px]">Quick Links</h4>
          <div className="flex gap-4 text-xs font-semibold text-[var(--text-muted)]">
            <Link href="/about/index.html" className="hover:text-[#ff9800] transition-colors">About Us</Link>
            <Link href="/contact/index.html" className="hover:text-[#ff9800] transition-colors">Contact Us</Link>
            <Link href="/dmca/index.html" className="hover:text-[#ff9800] transition-colors">DMCA</Link>
            <Link href="/privacy-policy/index.html" className="hover:text-[#ff9800] transition-colors">Privacy Policy</Link>
          </div>
        </div>
        
        {/* Connect */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <h4 className="text-[var(--foreground)] font-bold text-[15px]">Connect</h4>
          <p className="text-xs text-[var(--text-muted)] text-center md:text-right max-w-[200px]">
            Stay updated with the latest releases and news.
          </p>
        </div>
      </div>
      
      <div className="text-center text-[11px] font-semibold flex flex-col gap-1.5 pt-6 border-t border-[var(--border-color)] text-[var(--text-muted)]">
        <p>© 2026 TOTT - All rights reserved.</p>
        <p>Made by TOTT Team</p>
      </div>
    </footer>
  );
}
