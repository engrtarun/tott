# 🗺️ TOTT — Step-by-Step Engineering Roadmap (Kab, Kaha, Kaise, Kitna)

> **Golden Rule of Tott Development:**  
> *"Koi bhi kaam ek sath nahi hoga, sab chote-chote chunks (phases) me hoga. Har chunk pura banega, test hoga, verify hoga, tabhi agle chunk par move karenge."*

---

## 🏗️ Architecture & Tech Stack Summary
- **Framework**: Next.js 15 (App Router, Server Actions)
- **Language**: TypeScript 5+ (Strict mode)
- **Styling**: Tailwind CSS (Dark Cinematic Theme + Glassmorphism tokens)
- **Icons**: Lucide React
- **Animations**: Framer Motion + Canvas Confetti
- **State**: Zustand + React Query / Server State
- **Realtime**: WebSockets / Supabase Realtime (for group rooms)
- **APIs**: TMDB API, YouTube Data API, Reddit Sentiment Parser, Web Speech API

---

## 📋 Chunk-By-Chunk Execution Matrix

```
[Chunk 0: Foundation & Setup]
             ↓
[Chunk 1: Design System & Core Shell]
             ↓
[Chunk 2: Movie Data Layer & Cinema Diet]
             ↓
[Chunk 3: Tinder for Movies (Swipe Deck & Match)]
             ↓
[Chunk 4: Free YouTube Goldmine]
             ↓
[Chunk 5: AI Family-Cringe Radar + Reddit Reality Check]
             ↓
[Chunk 6: Reels-Style Micro-Trailers + AI Voice Search]
             ↓
[Chunk 7: Social Decision Toolkit (Wheel, Taste %, Khana Sync, Blind Box)]
             ↓
[Chunk 8: OTT Paisa-Bachao Calculator]
             ↓
[Chunk 9: Performance, PWA, Final Polish & Push to GitHub]
```

---

## 🧩 CHUNK 0: Foundation & Environment Setup

* **Kab (When)**: Step 1 (Day 1)
* **Kaha (Where)**:
  * Root folder (`package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`, `.gitignore`)
  * `app/layout.tsx`, `app/globals.css`
* **Kaise (How)**:
  * Initialize Next.js 15 with TypeScript and Tailwind CSS.
  * Setup Lucide React for consistent icons.
  * Setup Git repository & clean `.gitignore` (ignoring node_modules, `.next`, `.env`).
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Git init & initial commit with `README.md` & `DEVELOPMENT_PLAN.md`.
  - [ ] Next.js app scaffolding with modern directory structure.
  - [ ] Tailwind CSS configuration with custom cinematic colors (Deep pitch black `#0A0A0C`, Cyber Neon Pink `#FF2A6D`, Electric Cyan `#05D9E8`, Gold `#FFD700`).
  - [ ] Basic "Hello Tott" landing verification.
* **✅ Verification**: Server runs cleanly on `http://localhost:3000` with 0 console errors.

---

## 🎨 CHUNK 1: Cinematic Design System & App Shell

* **Kab (When)**: Step 2
* **Kaha (Where)**:
  * `app/globals.css` (Glassmorphism, Neon borders, Glow utilities)
  * `components/layout/Navbar.tsx` (Top branding, room indicator, search icon)
  * `components/layout/BottomNav.tsx` (Mobile-first bottom navigation dock: Discover, Swipe Room, Reels, YouTube Gold, Profile)
  * `components/ui/` (Reusable Button, Card, Badge, Modal, GlowEffect)
* **Kaise (How)**:
  * Mobile-first responsive container (`max-w-md mx-auto` on mobile, fluid on desktop).
  * Backdrop-blur navigation docks with tactile active-tab animations using Framer Motion.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Global styling with custom typography and CSS variables.
  - [ ] Top status bar with live user count and active room indicator.
  - [ ] Bottom mobile navigation dock with smooth switching tabs.
  - [ ] Theme showcase screen with test cards and buttons.
* **✅ Verification**: Responsive on all screen sizes (iPhone SE to 4K desktop), smooth transitions, bottom dock locks cleanly on mobile screens.

---

## 🎬 CHUNK 2: Movie Data Layer & Cinema Diet Engine (Feature #7)

* **Kab (When)**: Step 3
* **Kaha (Where)**:
  * `lib/tmdb.ts` (TMDB API client with caching and fallback mock data)
  * `types/movie.ts` (Movie, Room, User, Filter type definitions)
  * `components/filters/CinemaDietSlider.tsx` (Interactive runtime slider)
  * `app/(main)/page.tsx` (Discovery feed with trending, top rated, and runtime filter)
* **Kaise (How)**:
  * TMDB API integration (`/discover/movie`, `/movie/{id}`, `/trending/movie/week`).
  * If API key is missing, automatically fallback to a rich local JSON dataset so the app always works seamlessly out-of-the-box.
  * **Cinema Diet Feature**: Runtime slider (e.g. 45 min – 180 min). Live-filters titles so busy users only see movies that fit their available bedtime window.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] TMDB API connector & typed responses.
  - [ ] Fallback dataset with 50+ hand-picked Bollywood and Hollywood blockbusters.
  - [ ] Cinema Diet interactive slider with dynamic tags ("Quick Bite: <75m", "Standard: 90-120m", "Epic: >150m").
  - [ ] Movie Card component with poster, rating, genres, and runtime badge.
* **✅ Verification**: Moving the slider instantly updates the movie feed. No layout shift or flickering.

---

## 💖 CHUNK 3: "Tinder for Movies" Swipe Room (Feature #1)

* **Kab (When)**: Step 4
* **Kaha (Where)**:
  * `app/room/create/page.tsx` & `app/room/[id]/page.tsx`
  * `components/swipe/SwipeCard.tsx` (Framer Motion drag gestures)
  * `components/swipe/SwipeDeck.tsx` (Stack of draggable cards with swipe triggers)
  * `components/swipe/MatchModal.tsx` (Full-screen confetti explosion when match is detected)
  * `lib/room-store.ts` (Zustand room state / Realtime sync logic)
* **Kaise (How)**:
  * `framer-motion` `drag="x"` with threshold physics (swipe right = green glow & like, swipe left = red glow & skip).
  * Room URL generation with easy WhatsApp share button (`tott.app/room/xyz123`).
  * Local/Realtime state tracks friends' votes. The second two or more participants like the same movie, trigger `canvas-confetti` and display the **"IT'S A MATCH! 🍿"** victory popup.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Room generator modal with 6-digit room code or shareable link.
  - [ ] Interactive 3D stack cards with smooth swipe animations and undo button.
  - [ ] Match calculation engine.
  - [ ] Confetti celebration modal with "Where to Watch" direct link.
* **✅ Verification**: Card can be swiped via touch or mouse. Matching card triggers instant confetti celebration.

---

## 💎 CHUNK 4: Free YouTube Goldmine (Feature #2)

* **Kab (When)**: Step 5
* **Kaha (Where)**:
  * `app/youtube/page.tsx`
  * `data/youtube-movies.json` (Curated catalog of official YouTube full movies)
  * `components/youtube/GoldmineGrid.tsx` (Categorized sections: Classic 90s, Action Dhamaka, South Hindi Dubbed, Cult Comedy)
  * `components/youtube/TheaterModal.tsx` (Custom embedded theater player)
* **Kaise (How)**:
  * Curated database of 100% legal, officially uploaded movies from channels like Shemaroo, Goldmines, Ultra Movie Parlour, YRF, Rajshri, Sony PAL.
  * Embedded YouTube player with zero distractions, custom dark theater ambient glow, and verified channel badge.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Curated dataset with YouTube video IDs, official studio names, and thumbnail URLs.
  - [ ] Filter chips: "South Hindi Dubbed", "Classic 90s Bollywood", "World Cinema", "Comedy Hits".
  - [ ] One-click Theater Player modal with fullscreen support.
* **✅ Verification**: Clicking any movie opens the embedded YouTube player directly with zero broken links.

---

## 🚨 CHUNK 5: AI Family-Cringe Radar & Reddit Reality Check (Features #3 & #5)

* **Kab (When)**: Step 6
* **Kaha (Where)**:
  * `components/movie/CringeRadar.tsx` (Interactive timeline bar with warning timestamps)
  * `components/movie/RedditSentiment.tsx` (Real community sentiment badges)
  * `app/api/cringe-radar/route.ts` & `app/api/reddit-mood/route.ts`
  * `data/cringe-database.json` & `data/reddit-sentiments.json`
* **Kaise (How)**:
  * **Family-Cringe Radar**: Visual timeline scrubber showing exact alert timestamps (e.g. `⚠️ 42:15 - 43:30 [Awkward intimate scene]`). Includes "Safe for Parents" certification badge.
  * **Reddit Reality Check**: Scrapes/summarizes real Reddit threads (`r/movies`, `r/bollywood`). Displays honest breakdown: "First Half Verdict", "Climax Verdict", "Overhyped / Underrated meter".
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Interactive Cringe Radar timeline bar on movie details page.
  - [ ] "Izzat Safe" / "Watch Alone" safety badges.
  - [ ] Reddit Reality Check component showing unfiltered quotes and sentiment graph.
* **✅ Verification**: Movie detail view displays the radar timeline with clickable timestamps and Reddit honesty badge.

---

## 📱 CHUNK 6: Reels-Style Micro-Trailers & AI Voice/Mood Search (Features #6 & #4)

* **Kab (When)**: Step 7
* **Kaha (Where)**:
  * `app/reels/page.tsx`
  * `components/reels/ReelViewer.tsx` (Vertical snap-scroll video feed)
  * `components/search/VoiceMoodSearch.tsx` (Audio microphone input + semantic search)
  * `app/api/ai-search/route.ts` (Natural prompt to movie matcher)
* **Kaise (How)**:
  * **Micro-Trailers**: CSS `scroll-snap-type: y mandatory` full-screen vertical feed with 15-second hook clips, tap-to-mute, like counter, and instant "Add to Watchlist" button.
  * **AI Mood Search**: Web Speech API (`webkitSpeechRecognition`) for Hindi/Hinglish/English voice input. Connects to LLM prompt analyzer to extract mood, era, and twist requirements.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Full-screen vertical scrolling reels player with swipe gestures.
  - [ ] Animated microphone button with soundwave visualizer.
  - [ ] Voice-to-text integration with fallback text prompt input.
  - [ ] Natural mood query processor (e.g. "barish ka scene aur dimag hila dene wala twist").
* **✅ Verification**: Microphone captures speech, parses query, and returns matching movies. Reels snap smoothly on vertical drag.

---

## 🎡 CHUNK 7: Social Decision Toolkit (Features #9, #10, #11, #12)

* **Kab (When)**: Step 8
* **Kaha (Where)**:
  * `app/wheel/page.tsx` & `components/wheel/SpinWheel.tsx` (Tie-Breaker Wheel)
  * `components/social/TasteMatchModal.tsx` (Spotify-style 88% Match % calculation)
  * `components/tools/FoodDeliverySync.tsx` (Swiggy / Zomato arrival timer buffer)
  * `components/tools/MysteryBlindBox.tsx` (Countdown reveal lock box)
* **Kaise (How)**:
  * **Tie-Breaker Wheel**: HTML5 Canvas / SVG interactive spin wheel with physics deceleration, sound effects, and winner announcement.
  * **Friend Taste Match %**: Jaccard similarity / cosine score between two users' liked genres and ratings.
  * **Khana Delivery Sync**: Set timer (e.g., 30 mins) -> plays curated short trivia/teasers until food arrives.
  * **Mystery Blind Box**: 3D gift box with shaking animation that pops open after a 3.. 2.. 1 countdown.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Fully functional spin wheel with custom movie slice inputs.
  - [ ] Taste Match comparison screen with visual compatibility meter.
  - [ ] Food delivery countdown timer with buffer mini-trailers.
  - [ ] Mystery Blind box unlock animation.
* **✅ Verification**: Wheel spins with realistic friction. Blind box reveals mystery movie with sound effects.

---

## 💰 CHUNK 8: OTT Paisa-Bachao Calculator (Feature #8)

* **Kab (When)**: Step 9
* **Kaha (Where)**:
  * `app/calculator/page.tsx`
  * `components/calculator/OttOptimizer.tsx`
  * `lib/ott-calculator.ts` (Aggregator algorithms)
* **Kaise (How)**:
  * Users import/select their watchlist.
  * Algorithm calculates which platform holds the highest percentage of movies (e.g. Netflix: 15%, Prime: 75%, Hotstar: 10%).
  * Generates smart recommendation: *"Sirf Prime Video renew karo, ₹1200 bachao!"*
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Watchlist platform breakdown chart.
  - [ ] Money savings calculator with customizable monthly subscription rates.
  - [ ] One-click export / share summary card for WhatsApp.
* **✅ Verification**: Adding/removing movies recalculates platform dominance and estimated monthly savings dynamically.

---

## 🚀 CHUNK 9: Final Polish, PWA, SEO & Deployment

* **Kab (When)**: Step 10
* **Kaha (Where)**:
  * `public/manifest.json`, `app/sitemap.ts`, `app/robots.ts`
  * Production build optimization (`next build`)
  * GitHub repo push and Vercel / Netlify deployment
* **Kaise (How)**:
  * PWA configuration (installable on iOS/Android home screens).
  * OpenGraph meta tags, Twitter card tags, rich snippets.
  * End-to-end bug review and final GitHub repository release.
* **Kitna Kaam (Scope of Chunk)**:
  - [ ] Zero lint/build errors on `next build`.
  - [ ] PWA offline fallback and mobile app icon.
  - [ ] GitHub README and repo sync.
* **✅ Verification**: Lighthouse score > 90 across Performance, Accessibility, and SEO.

---

## 🎯 Abhi Agla Kadam (What To Do Next)

1. **GitHub Setup**: System par `git` verify ya install karke repository initialize karna.
2. **Chunk 0 Start**: Next.js 15, TypeScript, Tailwind setup shuru karna.
3. Har step par confirmation aur testing!
