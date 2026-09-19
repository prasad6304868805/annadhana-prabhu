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
  // Entrance phases (FIRST SHOT — existing, unchanged)
  sanctumDuration: 2200,      // Background fade-in & scale settle
  crestDelay: 600,            // Top Kalasha crest descent & fade
  crestDuration: 1200,
  flameGlowDelay: 800,        // Flame aura breathing starts

  // ── CINEMATIC EXTENSION (9–10s total) ────────────────────────────────────
  // Phase 2 (3–6s): Camera push / darkness deepens
  cameraPushDelay: 3000,      // When the subtle zoom/push begins
  cameraPushDuration: 3000,   // Duration of the slow push

  // Phase 3 (6–8s): Ayyappa light-reveal
  ayyappaRevealDelay: 5500,   // When Ayyappa layer starts becoming visible
  ayyappaRevealDuration: 2500,// Duration of the light-reveal unmask

  // Phase 4 (8–9s): Hold — same temple, diya visible
  // (gap is 1000ms hold before rack-focus)

  // Phase 5 (9–10s): Rack-focus bokeh + title
  titleDelay: 8800,           // "ANNADHANA PRABHUVA" title reveal
  titleDuration: 900,
  subtitleDelay: 9200,        // Devotional Telugu & English subtitle
  subtitleDuration: 700,
  hairlineDelay: 9500,        // Sacred hairline & Kshetram label
  hairlineDuration: 500,
  rackFocusDelay: 8600,       // Bokeh warmth begins
  rackFocusDuration: 700,


  // Transition to map
  totalDuration: 10200,       // Total splash (~10.2s gives a short hold after title)
  transitionDuration: 700,    // Cross-fade to Devotional Map
} as const;
