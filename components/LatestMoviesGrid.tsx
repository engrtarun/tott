"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: string;
  title: string;
  year?: string | number;
  poster?: string;
  tags?: string[];
  quality?: string;
  genre?: string;
  director?: string;
  stars?: string;
};

type ApiMovie = {
  _id: string;
  title?: string;
  year?: string | number;
  thumbnailUrl?: string;
  tags?: string[];
  qualityBadges?: string[];
  director?: string;
  stars?: string;
};

type LatestMoviesGridProps = {
  initialDatabaseMovies: Movie[];
  staticMovies: Movie[];
  searchQuery: string;
};

export default function LatestMoviesGrid({
  initialDatabaseMovies,
  staticMovies,
  searchQuery,
}: LatestMoviesGridProps) {
  const [databaseMovies, setDatabaseMovies] = useState(initialDatabaseMovies);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadMovies = async () => {
      try {
        const response = await fetch("/api/movies", { cache: "no-store" });
        if (!response.ok) throw new Error("Movie list request failed");

        const data: ApiMovie[] = await response.json();
        if (!isActive) return;

        setDatabaseMovies(data.map((movie) => ({
          id: String(movie._id),
          title: movie.title || "Untitled",
          year: movie.year || "",
          poster: movie.thumbnailUrl || "",
          tags: Array.isArray(movie.tags) ? movie.tags : [],
          quality: movie.qualityBadges?.[0] || "HD",
          genre: "TOTT",
          director: movie.director,
          stars: movie.stars,
        })));
        setLoadFailed(false);
      } catch (error) {
        console.error("Failed to load latest movies:", error);
        if (isActive) setLoadFailed(true);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadMovies();
    return () => {
      isActive = false;
    };
  }, []);

  const visibleDatabaseMovies = databaseMovies.filter((movie) => {
    if (movie.tags?.includes("MHCU") || movie.tags?.includes("YRF Spy Universe")) return false;
    if (!searchQuery) return true;

    return movie.title.toLowerCase().includes(searchQuery)
      || movie.director?.toLowerCase().includes(searchQuery)
      || movie.stars?.toLowerCase().includes(searchQuery);
  });
  const movies = [...visibleDatabaseMovies, ...staticMovies];

  return (
    <section className="px-4 md:px-8 mt-12 mb-16 max-w-[1400px] mx-auto">
      <h3 className="text-[22px] font-extrabold text-[var(--foreground)] mb-6 border-l-[3px] border-[#ff9800] pl-3 flex items-center gap-2">
        <Flame className="w-6 h-6 text-[#ff9800] fill-[#ff9800]" /> Latest Releases
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="group relative bg-transparent flex flex-col gap-2 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[2/3] w-full rounded shadow-sm overflow-hidden border border-[var(--border-color)]">
              <Image
                src={movie.poster || `https://img.youtube.com/vi/${movie.id.split('_')[0]}/maxresdefault.jpg`}
                alt={movie.title}
                fill
                className={`object-cover ${!movie.poster && "object-center"} transition-opacity duration-300 group-hover:opacity-80`}
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />

              <div className="absolute top-1.5 right-1.5 flex gap-[3px] flex-wrap justify-end max-w-[85%] z-10">
                {movie.tags?.includes("Upcoming") ? (
                  <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">Upcoming</span>
                ) : (
                  <>
                    <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold uppercase bg-gradient-to-br from-[#d97706] to-[#f59e0b] text-black border border-amber-400/50 shadow-[0_1px_3px_rgba(217,119,6,0.5)] backdrop-blur-sm">{movie.quality || "HD"}</span>
                    {movie.quality === "4K" && <span className="inline-flex items-center justify-center px-[4px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold uppercase bg-black text-white border border-white/30 backdrop-blur-sm">DV</span>}
                    <span className="inline-flex items-center justify-center px-[5px] py-[2px] rounded-[2px] font-[system-ui] text-[9px] font-bold uppercase bg-gradient-to-br from-red-700 to-red-600 text-white border border-red-500/40 shadow-[0_1px_3px_rgba(185,28,28,0.4)] backdrop-blur-sm">HDR</span>
                  </>
                )}
              </div>

              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {movie.genre?.split(",").map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-white/10 rounded-sm text-xs font-semibold text-white/90 uppercase">{genre.trim()}</span>
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

        {isLoading && visibleDatabaseMovies.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]" role="status">Loading latest movies...</p>
        )}
        {!isLoading && loadFailed && visibleDatabaseMovies.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]" role="status">Latest movies could not be loaded.</p>
        )}
      </div>

      <div className="mt-16 flex items-center justify-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded bg-[#ff9800] text-white font-bold shadow-sm">1</button>
        <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">2</button>
        <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">394</button>
        <button className="w-10 h-10 flex items-center justify-center rounded bg-[var(--pagination-bg)] border border-[var(--pagination-border)] text-[var(--foreground)] hover:text-[#ff9800] hover:border-[#ff9800] font-medium transition-colors shadow-sm">&gt;</button>
      </div>
    </section>
  );
}