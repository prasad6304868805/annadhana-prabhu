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
7. **Transition (3.2s)**: Seamless cross-fade to the post-splash placeholder screen (`/map-placeholder`).

---

## Project Structure

```
annadhana-prabhu/
├── app/
│   ├── _layout.tsx           # Root layout: font loading, splash prevention, dark theme
│   ├── index.tsx             # Entry route: launches animated splash experience
│   ├── splash.tsx            # Dedicated /splash route (supports replaying)
│   └── map-placeholder.tsx   # Temporary post-splash verification screen
├── assets/
│   ├── images/               # App icons & native splash fallbacks
│   ├── fonts/                # Fonts directory
│   └── splash/               # High-res sanctum backdrop composite
├── components/
│   └── splash/
│       ├── AnimatedSplashScreen.tsx  # Master choreographed motion orchestrator
│       ├── SacredCrest.tsx           # Antique gold vector SVG crest
│       ├── DiyaFlameHalo.tsx         # Volumetric flame breathing glow
│       └── EmberParticles.tsx        # Rising incense ember particles
├── constants/
│   └── theme.ts              # Sacred sanctum colors & timing constants
├── types/
│   └── index.ts              # TypeScript interfaces
├── docs/
│   └── ARCHITECTURE.md       # Architectural overview
└── _legacy_flask_reference/  # Archived old Flask/Jinja reference files (unmodified)
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
Runs on an Android device or emulator via Expo Go. (No Android Studio required for standard workflow).

### 3. iOS
```bash
npm run ios
```
Runs on iOS Simulator or Expo Go app on an iPhone.

---

## Verification & Status

- [x] Clean Expo + React Native + TypeScript project established
- [x] Expo Router configured
- [x] Web runs successfully
- [x] Zero TypeScript errors (`npx tsc --noEmit`)
- [x] Production web bundle verified (`npx expo export -p web`)
- [x] Responsive layout verified at 390×844, 393×852, 412×915, and desktop
- [x] Replay splash feature on placeholder screen
