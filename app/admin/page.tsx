"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Video, Play, Upload } from "lucide-react";

const BRAND_COLOR = "#ff9800";
const AVAILABLE_BADGES = [
  { id: "4K", label: "4K", color: "bg-[#ff9800] text-black" },
  { id: "DV", label: "DV", color: "bg-black text-white border border-zinc-700" },
  { id: "HDR", label: "HDR", color: "bg-red-600 text-white" },
  { id: "1080p", label: "1080p", color: "bg-blue-600 text-white" },
  { id: "720p", label: "720p", color: "bg-zinc-600 text-white" },
  { id: "CAM", label: "CAM", color: "bg-purple-600 text-white" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Movie Form State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailMode, setThumbnailMode] = useState<"link" | "upload">("link");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [watchUrl, setWatchUrl] = useState("");
  
  // OMDB State
  const [omdbTitle, setOmdbTitle] = useState("");
  const [isFetchingOmdb, setIsFetchingOmdb] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastPublishedMovie, setLastPublishedMovie] = useState<any>(null);

  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movies");
      const data = await res.json();
      if (res.ok) setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ADMINTOTT") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Galat password bhai!");
    }
  };

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges(prev => 
      prev.includes(badgeId) ? prev.filter(id => id !== badgeId) : [...prev, badgeId]
    );
  };

  const fetchOMDBDetails = async () => {
    if (!omdbTitle) return alert("Bhai, Movie ka naam dalo pehle!");

    setIsFetchingOmdb(true);
    try {
      // Netlify server se fetch hoga
      const res = await fetch(`/api/omdb?title=${omdbTitle}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Movie not found");
      
      setTitle(data.Title || "");
      setYear(data.Year || "");
      setDescription(data.Plot || "");
      
      if (data.Poster && data.Poster !== "N/A") {
        setThumbnailUrl(data.Poster);
        setThumbnailMode("link");
      }
    } catch (err) {
      console.error(err);
      alert("OMDB data fetch failed! Naam check karo.");
    } finally {
      setIsFetchingOmdb(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Bhai image ka size 2MB se kam rakho warna database bhar jayega jaldi!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result as string);
        setThumbnailMode("upload");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!title) return alert("Movie Title is required!");
    if (!thumbnailUrl) return alert("Thumbnail Image is required!");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          year,
          description,
          tags: [], 
          qualityBadges: selectedBadges,
          trailerUrl,
          watchUrl,
          thumbnailType: thumbnailMode,
          thumbnailUrl,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setLastPublishedMovie({ title, year, thumbnailUrl, qualityBadges: selectedBadges });
        setShowSuccessModal(true);
        setTitle("");
        setYear("");
        setDescription("");
        setThumbnailUrl("");
        setSelectedBadges([]);
        setTrailerUrl("");
        setWatchUrl("");
        setThumbnailMode("link");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchMovies();
      } else {
        alert("Database Error: \nDetail: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to publish movie. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (movies.length <= 1) {
      alert("Minimum 1 movie is required in the latest release! Aap isko delete nahi kar sakte.");
      return;
    }
    if (!confirm("Are you sure you want to delete this movie?")) return;
    
    try {
      const res = await fetch(`/api/movies?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMovies();
      } else {
        alert("Failed to delete movie.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2 mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${BRAND_COLOR}20` }}>
              <Lock className="w-8 h-8" style={{ color: BRAND_COLOR }} />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
              style={{ outlineColor: BRAND_COLOR }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full font-bold py-3 px-4 rounded-lg text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: BRAND_COLOR }}>TOTT Admin Studio</h1>
            <p className="text-zinc-400 mt-1">Publish and manage movies</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-zinc-400 hover:text-white">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-2 space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            
            {/* OMDB AUTO FETCH SECTION */}
            <div className="p-4 bg-[#ff9800]/10 border border-[#ff9800]/20 rounded-lg mb-6">
              <h3 className="text-sm font-bold text-[#ff9800] mb-3 flex items-center gap-2">
                ⚡ Auto-Fetch from OMDB
              </h3>
              <div className="flex gap-3">
                <input 
                  type="text" value={omdbTitle} onChange={(e) => setOmdbTitle(e.target.value)}
                  placeholder="Movie Name (e.g. Inception)"
                  className="flex-1 bg-black/50 border border-[#ff9800]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff9800]"
                />
                <button 
                  onClick={fetchOMDBDetails} disabled={isFetchingOmdb}
                  className={`bg-[#ff9800] text-black font-bold py-2 px-6 rounded-lg text-sm transition-all ${isFetchingOmdb ? 'opacity-50' : 'hover:scale-105'}`}
                >
                  {isFetchingOmdb ? 'Fetching...' : 'Fetch Details'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Movie Title *</label>
                <input 
                  type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pyaar Ka Punchnama"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                  style={{ outlineColor: BRAND_COLOR }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Release Year</label>
                <input 
                  type="text" value={year} onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2011"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                  style={{ outlineColor: BRAND_COLOR }}
                />
              </div>
            </div>

            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-white">Poster Image *</label>
                <div className="flex bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                  <button 
                    onClick={() => setThumbnailMode("upload")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${thumbnailMode === "upload" ? "bg-[#ff9800] text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    Upload File
                  </button>
                  <button 
                    onClick={() => setThumbnailMode("link")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${thumbnailMode === "link" ? "bg-[#ff9800] text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    Paste Link
                  </button>
                </div>
              </div>

              {thumbnailMode === "upload" ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-900/50 hover:bg-zinc-800 hover:border-[#ff9800] transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 mb-2 text-zinc-500" />
                      <p className="mb-1 text-sm text-zinc-400"><span className="font-bold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-zinc-500">PNG, JPG or WEBP (Max 2MB)</p>
                    </div>
                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              ) : (
                <input 
                  type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Paste direct image URL here..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                  style={{ outlineColor: BRAND_COLOR }}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Quality & Format Badges</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_BADGES.map(badge => (
                  <button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                      selectedBadges.includes(badge.id) 
                        ? badge.color + ' ring-2 ring-white ring-offset-2 ring-offset-zinc-900' 
                        : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                    }`}
                    style={selectedBadges.includes(badge.id) && badge.id === '4K' ? { backgroundColor: BRAND_COLOR } : {}}
                  >
                    {badge.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-1"><Video className="w-4 h-4 text-red-500"/> Trailer Link</label>
                <input 
                  type="url" value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)}
                  placeholder="YouTube URL"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                  style={{ outlineColor: BRAND_COLOR }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-1"><Play className="w-4 h-4 text-blue-500"/> Watch Online Link</label>
                <input 
                  type="url" value={watchUrl} onChange={(e) => setWatchUrl(e.target.value)}
                  placeholder="Streaming URL"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                  style={{ outlineColor: BRAND_COLOR }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">TMDB Description (Optional)</label>
              <textarea 
                rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Details..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none resize-none"
                style={{ outlineColor: BRAND_COLOR }}
              />
            </div>

            <button 
              onClick={handlePublish} disabled={isSubmitting}
              className={`w-full text-black font-bold py-4 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
              style={{ backgroundColor: BRAND_COLOR }}
            >
              <Plus className="w-6 h-6" />
              <span className="text-lg">{isSubmitting ? 'Publishing...' : 'Publish Movie to Site'}</span>
            </button>
          </div>

          {/* RIGHT: LIVE PREVIEW CARD */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Live Card Preview
              <span className="text-[10px] text-zinc-600 bg-zinc-800 px-2 py-1 rounded">Desktop View</span>
            </h2>
            
            <div className="w-[200px] flex flex-col gap-2 mx-auto lg:mx-0">
              <div className="relative w-full aspect-[2/3] bg-zinc-800 rounded shadow-lg overflow-hidden border border-zinc-800">
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-xs font-medium text-center px-4">Upload image or paste link to preview</span>
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                  {AVAILABLE_BADGES.filter(b => selectedBadges.includes(b.id)).map((badge) => (
                    <span 
                      key={badge.id} 
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${badge.color}`}
                      style={badge.id === '4K' ? { backgroundColor: BRAND_COLOR, color: 'black' } : {}}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-1">
                <h3 className="font-bold text-white text-[15px] truncate leading-tight">
                  {title || "Movie Title"}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {year || "2024"}
                </p>
              </div>
            </div>
            
            <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed bg-zinc-900/50 p-3 rounded border border-zinc-800">
              <strong className="text-zinc-300">TMDB Details:</strong> Hum ye data URL me ya movie player page me pass karenge. 
              Details directly movie page par fetch hongi jaise hi user card par click karega.
            </p>
          </div>
        </div>

        {/* Manage Movies Section */}
        <div className="mt-12 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-bold mb-6">Manage Latest Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie._id} className="bg-zinc-800 p-2 rounded-lg border border-zinc-700 flex flex-col gap-2 group relative">
                <div className="w-full aspect-[2/3] bg-black rounded overflow-hidden relative">
                  {movie.thumbnailUrl && <img src={movie.thumbnailUrl} className="w-full h-full object-cover" />}
                  <div className="absolute top-1 right-1 flex gap-0.5">
                    {movie.qualityBadges?.slice(0,2).map((badge: string) => (
                      <span key={badge} className="text-[8px] font-bold px-1 py-[1px] rounded-sm bg-black/80 text-white">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-1 pb-1">
                  <h3 className="font-bold text-xs text-white truncate">{movie.title}</h3>
                  <p className="text-[10px] text-zinc-400">{movie.year}</p>
                </div>
                <button 
                  onClick={() => handleDelete(movie._id)}
                  className="absolute top-1 left-1 p-1.5 bg-red-600/90 text-white hover:bg-red-500 rounded transition-all opacity-0 group-hover:opacity-100"
                  title="Delete Movie"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            {movies.length === 0 && <p className="text-zinc-500 text-sm col-span-full">No movies found in database.</p>}
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && lastPublishedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-[#ff9800] rounded-2xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(255,152,0,0.2)] flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#ff9800]/20 text-[#ff9800] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Published Live!</h2>
            <p className="text-zinc-400 mb-6">Your movie has been added to the database and homepage.</p>
            
            <div className="relative aspect-[2/3] w-32 rounded shadow-lg overflow-hidden border border-zinc-700 mb-6">
              <img src={lastPublishedMovie.thumbnailUrl} alt="Poster" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">{lastPublishedMovie.title}</h3>
            
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="mt-8 w-full bg-[#ff9800] text-black font-bold py-3 rounded-lg hover:bg-[#ff9800]/90 transition-colors"
            >
              Continue Publishing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
