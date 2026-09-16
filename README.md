# ANNADHANA PRABHUVA (అన్నదాన ప్రభువ)

> Premium mobile-first devotional seva and discovery application.
> Initial launch region: Visakhapatnam, Andhra Pradesh, India.

---

## Architecture & Technology Stack

- **Framework**: React Native + Expo (SDK 57)
- **Language**: TypeScript (Strict)
- **Navigation**: Expo Router (File-based routing)
- **Target Platforms**: Web (Browser-first), Android, iOS
- **Styling & Theme**: Sacred Sanctum design system (`constants/theme.ts`)
- **Typography**: Google Fonts Cinzel (Serif) & Noto Serif Telugu

---

## Step 1: Splash Screen Experience

The splash screen implements the visual direction from Google Stitch as a real runtime animated experience:
1. **Instant Native Startup**: Configured via `expo-splash-screen` to prevent blank or white flashes during initial bundle and font loading.
2. **Atmosphere Emergence (0.2s–0.8s)**: Sanctum darkness subtly fades in to reveal the brass oil diya and incense smoke with subtle depth settle.
3. **Sacred Crest Descent (0.8s–1.5s)**: Antique gold Kalasha & Diya line art crest gently descends at the top with "— విశాఖపట్నం —".
4. **Diya Flame Warmth Halo (1.0s–2.2s)**: Volumetric radial breathing aura centered over the diya wick gently pulses.
5. **Incense Ember Particles (1.5s–2.8s)**: Micro embers float upward with organic drift.
6. **Wordmark & Subtitles (1.8s–2.6s)**: "ANNADHANA PRABHUVA" fades in, followed by Telugu "అన్నదాత సుఖీభవ • సేవా సమర్పణం" and "DIVINE SANCTUM OF ETERNAL GRACE".
7. **Transition (3.2s)**: Seamless cross-fade to the Devotional Map screen (`/map`).

---

## Step 2: Devotional Map Implementation

The Devotional Map (`/map`) delivers an immersive sacred cartography experience centered on Visakhapatnam, Andhra Pradesh:

1. **Visakhapatnam Sacred Cartography**:
   - High-fidelity vector map canvas featuring the Bay of Bengal coastline, Simhachalam sacred hill range, major arterial seva corridors, and coordinate grid markers (`17.6868° N, 83.2185° E`).
   - Smooth gesture-based and touch-based panning and multi-level zoom (1.0x to 2.4x).
   - Recenter control to quickly restore default sanctum focus.
2. **Category Filtering**:
   - Horizontally scrolling sacred filter pills: `ALL`, `POOJA`, `BIKSHA`, `ALPAHARAM`, `SEVA`.
   - Dynamic marker display and counters updating immediately on selection.
3. **Interactive Devotional Markers**:
   - Custom SVG markers with category-specific icon badges (Flame for Pooja, Bowl for Biksha, Kalasha for Alpaharam, Lotus for Seva).
   - Dynamic status badges (`LIVE NOW`, `ONGOING`, `UPCOMING`).
   - Visual focus feedback: selected marker expands with an animated breathing golden halo, while inactive markers gracefully subdue to 0.22 opacity.
4. **Selected Location Preview**:
   - Floating bottom preview card displays thumbnail, sacred kshetram name, verified badge, distance, current seva timing, and batch status.
   - Primary CTA: **VIEW SEVA DETAILS**.
5. **Seva Location Detail Sheet**:
   - Spatial full-height sheet overlay featuring the kshetram backdrop, golden mist gradient, and authentic Telugu Shloka card (*"అన్నదానం పరం దానం విద్యాదానమతః పరమ్"*).
   - Consecrated Maha Prasadam menu with purity tags (Pure Cow Ghee, Sattvic Preparation, 100% Annapoorna Blessing).
   - Batch timings, remaining capacity counters, address, and live seva coordinators.
6. **Strict State Preservation**:
   - Back button (`← SANCTUM DETAILS`) cleanly dismisses the detail sheet while strictly preserving active category filters, selected marker, zoom level, and map position.
7. **Persistent Sacred Navigation**:
   - Bottom bar with `MAP` (active), `SEVA`, `KNOWLEDGE`, and `PROFILE` tabs, accompanied by a live active seva counter badge.

---

## Project Structure

```
annadhana-prabhu/
├── app/
│   ├── _layout.tsx                 # Root layout: font loading, splash prevention, dark theme
│   ├── index.tsx                   # Entry route: launches animated splash experience
│   ├── splash.tsx                  # Dedicated /splash route (supports replaying)
│   ├── map.tsx                     # Step 2: Master Devotional Map screen orchestrator
│   └── map-placeholder.tsx         # Legacy placeholder route
├── assets/
│   ├── images/                     # App icons & native splash fallbacks
│   │   └── locations/              # High-res kshetram photography (Simhachalam, Jagadamba)
│   ├── fonts/                      # Fonts directory
│   └── splash/                     # High-res sanctum backdrop composite
├── components/
│   ├── map/                        # Step 2: Map components
│   │   ├── DevotionalMapCanvas.tsx       # SVG vector sacred cartography of Vizag
│   │   ├── DevotionalMarker.tsx          # Custom animated category markers with halos
│   │   ├── MapCategoryFilters.tsx        # Category selection pill filters
│   │   ├── MapHeader.tsx                 # Sanctum header with Om symbol and recenter CTA
│   │   ├── SelectedLocationPreview.tsx   # Compact floating preview card
│   │   └── BottomNavBar.tsx              # Persistent devotional bottom navigation
│   ├── seva/                       # Step 2: Seva detail components
│   │   └── SevaDetailSheet.tsx           # Full-sheet sacred kshetram details & Shloka
│   └── splash/                     # Step 1: Splash components
│       ├── AnimatedSplashScreen.tsx  # Master choreographed motion orchestrator
│       ├── SacredCrest.tsx           # Antique gold vector SVG crest
│       ├── DiyaFlameHalo.tsx         # Volumetric flame breathing glow
│       └── EmberParticles.tsx        # Rising incense ember particles
├── constants/
│   └── theme.ts                    # Sacred sanctum colors, layout & timing constants
├── data/
│   └── mockLocations.ts            # 5 verified Visakhapatnam devotional locations
├── types/
│   ├── index.ts                    # Root TypeScript interfaces
│   └── location.ts                 # Devotional location, category & seva batch types
├── docs/
│   ├── ARCHITECTURE.md             # Architectural overview
│   └── screenshots/                # Verified browser & mobile test captures
└── _legacy_flask_reference/        # Archived old Flask/Jinja reference files (unmodified)
```

---

## How to Run the Project

### 1. Browser / Expo Web (Recommended)
```bash
npm run web
# or
npx expo start --web
```
Open [http://localhost:8081](http://localhost:8081) in your browser.

### 2. Android
```bash
npm run android
```
Runs on an Android device or emulator via Expo Go.

### 3. iOS
```bash
npm run ios
```
Runs on iOS Simulator or Expo Go app on an iPhone.

---

## Verification & Status

- [x] Clean Expo + React Native + TypeScript project established
- [x] Step 1: Sacred animated splash screen complete & verified
- [x] Step 2: Devotional Map complete & verified
  - [x] Custom vector cartography with Bay of Bengal & Simhachalam hills
  - [x] Category filters (`ALL`, `POOJA`, `BIKSHA`, `ALPAHARAM`, `SEVA`)
  - [x] Custom animated SVG markers with category badges and breathing halos
  - [x] Floating location preview card
  - [x] Full-sheet Seva Details with Shloka card, batch timings, and prasadam menu
  - [x] Complete state preservation upon returning to map
  - [x] Persistent bottom navigation bar
- [x] Zero TypeScript errors (`npx tsc --noEmit`)
- [x] Production web bundle verified (`npx expo export -p web`)
- [x] Responsive layout verified at 390×844, 393×852, 412×915, and desktop (1280×800)

