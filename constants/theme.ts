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
  // Entrance phases
  sanctumDuration: 2200,      // Background fade-in & scale settle
  crestDelay: 600,            // Top Kalasha crest descent & fade
  crestDuration: 1200,
  flameGlowDelay: 800,        // Flame aura breathing starts
  titleDelay: 1800,           // "ANNADHANA PRABHUVA" title reveal
  titleDuration: 1000,
  subtitleDelay: 2100,        // Devotional Telugu & English subtitle
  subtitleDuration: 800,
  hairlineDelay: 2400,        // Sacred hairline & Kshetram label
  hairlineDuration: 600,
  holdDuration: 800,          // Hold before exit
  totalDuration: 3400,        // Total splash duration (~3.4s)
  transitionDuration: 600,    // Cross-fade transition to main screen
} as const;
