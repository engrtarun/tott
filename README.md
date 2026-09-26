# 🎬 TOTT — Next-Gen Social Movie Discovery & Stream Hub

<div align="center">

![TOTT Banner](https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80)

**Dosto ke sath movie decide karne ka jhagda khatam. Stream legal free movies, dodge family-cringe scenes, and swipe your next movie night match.**

[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2F4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_Animations-e11d48?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

[Explore Features](#-the-12-superpowers-of-tott) • [Tech Stack](#-modern-tech-stack) • [Roadmap](#-development-roadmap) • [Getting Started](#-getting-started)

</div>

---

## 🌟 What is TOTT?

**TOTT** is a high-octane, mobile-first cinematic web application built to solve the biggest modern dilemma: **"Aaj raat kya dekhein?"** (What should we watch tonight?). 

Forget scrolling Netflix menus for 45 minutes until your dinner gets cold. TOTT combines **real-time social matchmaking**, **AI content filters**, **TikTok-style micro-trailers**, and **OTT financial intelligence** into one ultra-sleek, neon-dark web app.

---

## ⚡ The 12 Superpowers of TOTT

### 1. 💖 Tinder For Movies (No More WhatsApp Ladai)
> Create a private group watch-room, share the link with friends, and swipe on movie cards (**Right = Dekhunga**, **Left = Skip**). The instant everyone right-swipes the same title — **BOOM! Confetti celebration** on all screens and the movie is locked in.

### 2. 💎 Free YouTube Goldmine (Legal Free Movies)
> Thousands of superhit and cult-classic movies are legally hosted across verified studio channels on YouTube (Shemaroo, Goldmines, Ultra, Yash Raj, Sony PAL, etc.) but lost in algorithms. TOTT curates them into a clean **"Free Netflix"** catalog with one-click direct playback.

### 3. 🚨 AI Family-Cringe Radar (Zero Spoilers)
> Watching movies with parents or family? TOTT’s AI acts as your digital shield. It flags awkward/NSFW scenes in advance with exact timestamps: *"Bhai 42nd minute par awkward scene hai, aage badha lo"* — zero storyline spoilers, 100% izzat safe.

### 4. 🎙️ Bolke Movie Dhoondho (AI Mood & Voice Search)
> Generic genre filters are obsolete. Hit the microphone and speak your mind: *"90s ki aisi movie jisme barish ka scene ho aur dimag hila dene wala twist ho"*. Powered by modern LLMs and semantic embeddings to find the exact match.

### 5. 🦊 Reddit Reality Check (Jhoothe Reviews Ka The End)
> Paid PR and bot ratings on IMDb / Rotten Tomatoes ruin expectations. TOTT live-scrapes and summarizes raw community sentiment from Reddit (`r/movies`, `r/bollywood`, `r/cinematography`): *"Dost, first half aag hai, par climax bakwas hai."*

### 6. 📱 Reels-Style "Micro-Trailers" (Fast Vertical Feed)
> Nobody wants to sit through 3-minute spoiler-heavy official trailers. Swipe vertically through rapid 15-second hook scenes with cinematic ambient glow. Like what you see? Tap once to save directly into your Watchlist.

### 7. ⏱️ Cinema Diet (Time Ke Hisaab Se Movie)
> Office or college early tomorrow and you only have 80 minutes before bed? Drag the runtime slider to **"80 Mins"** — TOTT filters out 3-hour epics and delivers only top-tier films that finish right on schedule.

### 8. 💰 OTT Paisa-Bachao Calculator
> Stop burning money on 5 different subscriptions (Netflix, Prime, Hotstar, Zee5, SonyLIV). TOTT analyzes your watchlist and friends' watch history to tell you: *"Tumhari 80% watchlist sirf Prime par hai, baaki OTTs renew mat karo."*

### 9. 🎡 Tie-Breaker Wheel (Kismat Ka Faisla)
> When a group debate turns into a dead end, let destiny decide. Drop the final disputed shortlist onto an interactive **Spin the Wheel**. Jo movie aayi, chupchap popcorn khate hue wahi dekhni padegi.

### 10. 🧬 Spotify-Jaisa "Friend Taste Match %"
> Connect with your friend's profile and get an instant cinematic compatibility score: *"Tera aur tere dost ka taste 88% match karta hai."* Know immediately whose recommendations to trust and whose to ignore.

### 11. 🍕 Khana Delivery Sync (Swiggy / Zomato Timing)
> Food arriving in 35 minutes? Set the delivery timer! TOTT triggers a countdown buffer playing short reviews, micro-teasers, and trivia. The moment the doorbell rings, the movie resumes straight into the high-voltage action.

### 12. 🎁 Mystery Blind Box (Weekend Surprise)
> Brain fried after a hectic week? Let the AI synthesize your taste profile and lock a hidden cinematic gem behind a mystery box. A dramatic 3.. 2.. 1 countdown reveals the pick with zero choice-paralysis.

---

## 🛠 Modern Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions) | Production-ready performance, SEO, hybrid rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safety, robust schema contracts, error prevention |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Design Tokens | Sleek dark UI, cyberpunk/cinema glows, fluid responsive styling |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + Canvas Confetti | Smooth swipe physics, vertical reel transitions, tactile feedback |
| **Realtime Sync** | WebSockets / Supabase Realtime | Millisecond room state synchronization for group swiping |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent, lightweight iconography |
| **Data Sources** | TMDB API, Reddit API, YouTube Data API v3 | Rich movie metadata, posters, casts, and community discussions |
| **State Management**| [Zustand](https://github.com/pmndrs/zustand) | Ultra-light client-side state for rooms, filters, and audio |

---

## 📂 Project Architecture

```
tott/
├── app/
│   ├── (auth)/             # Login, signup, user onboarding
│   ├── (main)/             # Main app shell with bottom nav
│   │   ├── page.tsx        # Homepage / Discover Feed
│   │   ├── room/[id]/      # Tinder for movies (Live swipe room)
│   │   ├── youtube/        # Free YouTube Goldmine catalog
│   │   ├── reels/          # Reels-style micro-trailer vertical feed
│   │   ├── search/         # AI Voice & natural language search
│   │   ├── calculator/     # OTT subscription cost optimizer
│   │   ├── wheel/          # Tie-breaker spin wheel
│   │   └── profile/        # Taste match %, watch history, watchlist
│   ├── api/                # Next.js API route handlers
│   │   ├── ai-cringe/      # Family-cringe timestamp analysis API
│   │   ├── reddit-mood/    # Reddit live sentiment aggregator
│   │   └── movies/         # TMDB & YouTube aggregator endpoints
│   ├── globals.css         # Custom animations, glassmorphism, cinema theme
│   └── layout.tsx          # Root layout & providers
├── components/
│   ├── ui/                 # Reusable atomic UI (buttons, sliders, modals)
│   ├── swipe/              # Tinder swipe card deck & confetti trigger
│   ├── reels/              # Micro-trailer vertical video player
│   ├── radar/              # AI Cringe radar timeline component
│   └── wheel/              # Canvas-based spin the wheel
├── hooks/                  # Custom React hooks (useSpeech, useRoomSync)
├── lib/                    # API clients, utils, TMDB helpers, constants
├── types/                  # TypeScript interface declarations
└── public/                 # Static assets, branding, sound effects
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+)
- [Git](https://git-scm.com/)
- TMDB API Key ([themoviedb.org](https://www.themoviedb.org/documentation/api))

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/tott.git
cd tott

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Detailed Roadmap

For our complete chunk-by-chunk engineering roadmap, see **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)**. Every feature is broken down into manageable phases to ensure zero chaos and rock-solid code quality.

---

## 🤝 Contributing & License

Contributions are welcome! Please open an issue or pull request for any new features or bug fixes.

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <b>Built with ❤️ for every friend group that can never decide what to watch.</b>
</div>
