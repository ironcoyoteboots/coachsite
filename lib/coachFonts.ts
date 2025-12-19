// lib/coachFonts.ts

export const HERO_TITLE_FONT_OPTIONS = [
  { id: 'coach-hero-font-inter', label: 'Inter (Modern)' },
  { id: 'coach-hero-font-montserrat', label: 'Montserrat (Clean)' },

  { id: 'coach-hero-font-anton', label: 'Anton (Dense)' },
  { id: 'coach-hero-font-ultra', label: 'Ultra (Retro Serif)' },
  { id: 'coach-hero-font-wendy-one', label: 'Wendy One (Rounded)' },

  { id: 'coach-hero-font-knewave', label: 'Knewave (Playful)' },
  { id: 'coach-hero-font-chango', label: 'Chango (Bold Fun)' },
  { id: 'coach-hero-font-chewy', label: 'Chewy (Casual)' },

  { id: 'coach-hero-font-bungee-shade', label: 'Bungee Shade (Display)' },
  { id: 'coach-hero-font-bungee-spice', label: 'Bungee Spice (Display)' },
  { id: 'coach-hero-font-honk', label: 'Honk (Weird)' },

  { id: 'coach-hero-font-rubik-dirt', label: 'Rubik Dirt (Grunge)' },
  { id: 'coach-hero-font-rubik-glitch', label: 'Rubik Glitch (Glitch)' },
  { id: 'coach-hero-font-rubik-wet-paint', label: 'Rubik Wet Paint (Paint)' },
] as const;

export type CoachNameFontClass =
  (typeof HERO_TITLE_FONT_OPTIONS)[number]['id'];

export const DEFAULT_HERO_TITLE_FONT: CoachNameFontClass =
  'coach-hero-font-inter';
