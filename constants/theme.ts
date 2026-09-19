/**
 * Annadhana Prabhuva - Sacred Visual Theme Constants
 * Derived from approved Google Stitch sacred temple visual direction.
 */

export const SANCTUM_COLORS = {
  // Sacred Dark Tones
  background: '#070605',
  sanctumDark: '#080605',
  sanctumMid: '#0c0a09',
  sanctumLight: '#14110e',
  surface: '#151311',
  charcoal: '#1d1b19',
  slate: '#262320',
  border: '#332c25',

  // Devotional Gold & Flame Tones
  gold: '#C5A059',
  goldBright: '#e5c178',
  goldMuted: 'rgba(197, 160, 89, 0.6)',
  goldSubtle: 'rgba(197, 160, 89, 0.25)',
  goldGlow: 'rgba(197, 160, 89, 0.35)',
  flame: '#E6A15C',
  flameWarm: '#FFE5B4',
  flameDeep: '#FFB76B',
  vermilion: '#bf4325',

  // Accent Status Tones
  emerald: '#34d399',
  emeraldBg: 'rgba(6, 78, 59, 0.8)',
  emeraldBorder: 'rgba(16, 185, 129, 0.4)',
  amber: '#f59e0b',
  amberBg: 'rgba(120, 53, 15, 0.8)',
  amberBorder: 'rgba(245, 158, 11, 0.4)',
  indigo: '#818cf8',
  indigoBg: 'rgba(49, 46, 129, 0.8)',
  indigoBorder: 'rgba(99, 102, 241, 0.4)',

  // Typography & Accents
  ivory: '#FBF9F5',
  ivoryMuted: 'rgba(251, 249, 245, 0.85)',
  sand: '#A89276',
  sandMuted: 'rgba(168, 146, 118, 0.7)',
} as const;

export const SPLASH_TIMING = {
  // Phase 1 (0–3s): Master diya shot — unchanged
  sanctumDuration: 2200,      // Diya fade-in & scale settle
  crestDelay: 600,            // Sacred crest descent
  crestDuration: 1200,
  flameGlowDelay: 800,        // Flame aura breathing starts

  // Phase 2 (3–5s): Same shot, subtle camera push into darkness
  cameraPushDelay: 3000,
  cameraPushDuration: 2000,

  // Phase 3 (5–7.5s): Radial light sphere expands from flame position
  ayyappaRevealDelay: 5000,
  ayyappaRevealDuration: 2500,

  // Phase 4 (7.5–8.7s): Hold — no timing constant needed

  // Phase 5 (8.7–9.5s): Rack-focus vignette + title
  rackFocusDelay: 8700,
  rackFocusDuration: 600,
  titleDelay: 8900,
  titleDuration: 800,
  subtitleDelay: 9200,
  subtitleDuration: 600,
  hairlineDelay: 9450,
  hairlineDuration: 450,

  // Exit (10s → map)
  totalDuration: 10000,
  transitionDuration: 700,
} as const;
