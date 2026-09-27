"use client";

import { useState } from "react";
import { Lock, Upload, Plus } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check as requested
    if (password === "ADMINTOTT") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Galat password bhai!");
    }
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form 
          onSubmit={handleLogin} 
          className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md space-y-6 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center space-y-2 mb-8">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-zinc-400 text-sm">Enter password to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (Hint: ADMINTOTT)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  // If authenticated, show movie addition form
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Add New Movie</h1>
            <p className="text-zinc-400 mt-1">Upload directly to database and GitHub</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-zinc-400 hover:text-white"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2 space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Movie Title</label>
              <input 
                type="text" 
                placeholder="e.g. Inception (2010)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              <textarea 
                rows={4}
                placeholder="Movie plot..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Tags (Comma separated)</label>
              <input 
                type="text" 
                placeholder="Action, Sci-Fi, Thriller"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Publish Movie</span>
            </button>
          </div>

          {/* Thumbnail Section */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-fit">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Thumbnail Image</h3>
            
            <div className="border-2 border-dashed border-zinc-700 rounded-lg h-64 flex flex-col items-center justify-center hover:border-red-500 hover:bg-zinc-800/50 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-zinc-500 mb-2" />
              <p className="text-sm text-zinc-400">Click to upload poster</p>
              <p className="text-xs text-zinc-600 mt-1">Will be saved to GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
