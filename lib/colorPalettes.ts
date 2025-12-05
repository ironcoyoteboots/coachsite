// lib/colorPalettes.ts

export type PaletteId =
  | 'darkGray'
  | 'darkBlue'
  | 'lightGray'
  | 'lightSand'
  | 'lightMint'
  | 'sunset'
  | 'classic';

export interface PaletteClasses {
  pageBg: string;           // main page bg
  sectionBg: string;        // default section bg
  sectionAltBg: string;     // alt section bg
  cardBg: string;           // cards
  border: string;           // borders
  textPrimary: string;      // main text
  textMuted: string;        // softer text
  textHero: string;         // text in hero section
  textHeroTagline: string;
  textButton: string;       // button text
  heroOverlay: string;      // overlay over image/video
  heroTaglineBg: string;    // pill behind hero tagline
  buttonBg: string;
  buttonHoverBg: string;
}

// Central palette registry
const palettes: Record<PaletteId, PaletteClasses> = {
  darkGray: {
    pageBg: 'bg-gray-650',
    sectionBg: 'bg-gray-700',
    sectionAltBg: 'bg-gray-800',
    cardBg: 'bg-gray-900/70',
    border: 'border-gray-800',
    textPrimary: 'text-gray-50',
    textMuted: 'text-gray-300',
    textHero: 'text-gray-100',
    textHeroTagline: 'text-white',
    textButton: 'text-white',
    heroOverlay: 'bg-black/45',
    heroTaglineBg: 'bg-black/40',
    buttonBg: 'bg-lime-500',
    buttonHoverBg: 'hover:bg-green-600',
  },
  darkBlue: {
    pageBg: 'bg-slate-950',
    sectionBg: 'bg-slate-950',
    sectionAltBg: 'bg-slate-900/90',
    cardBg: 'bg-slate-900/70',
    border: 'border-slate-700',
    textPrimary: 'text-slate-50',
    textMuted: 'text-slate-300',
    textHero: 'text-slate-50',
    textHeroTagline: 'text-white',
    textButton: 'text-white',
    heroOverlay: 'bg-slate-950/55',
    heroTaglineBg: 'bg-slate-900/70',
    buttonBg: 'bg-sky-500',
    buttonHoverBg: 'hover:bg-sky-600',
  },
  lightGray: {
    pageBg: 'bg-slate-50',
    sectionBg: 'bg-slate-50',
    sectionAltBg: 'bg-white',
    cardBg: 'bg-white',
    border: 'border-slate-200',
    textPrimary: 'text-slate-600',
    textMuted: 'text-slate-600',
    textHero: 'text-slate-900',
    textHeroTagline: 'text-slate-600',
    textButton: 'text-white',
    heroOverlay: 'bg-slate-900/40',
    heroTaglineBg: 'bg-white/90',
    buttonBg: 'bg-lime-500',
    buttonHoverBg: 'hover:bg-green-600',
  },
  lightSand: {
    pageBg: 'bg-amber-50',
    sectionBg: 'bg-amber-50',
    sectionAltBg: 'bg-white',
    cardBg: 'bg-white',
    border: 'border-amber-200',
    textPrimary: 'text-slate-600',
    textMuted: 'text-amber-800',
    textHero: 'text-white',
    textHeroTagline: 'text-slate-600',
    textButton: 'text-white',
    heroOverlay: 'bg-amber-900/35',
    heroTaglineBg: 'bg-white/90',
    buttonBg: 'bg-amber-500',
    buttonHoverBg: 'hover:bg-amber-600',
  },
  lightMint: {
    pageBg: 'bg-emerald-50',
    sectionBg: 'bg-emerald-50',
    sectionAltBg: 'bg-white',
    cardBg: 'bg-white',
    border: 'border-emerald-100',
    textPrimary: 'text-slate-600',
    textMuted: 'text-emerald-800',
    textHero: 'text-white',
    textHeroTagline: 'text-slate-600',
    textButton: 'text-white',
    heroOverlay: 'bg-emerald-900/25',
    heroTaglineBg: 'bg-white/90',
    buttonBg: 'bg-emerald-500',
    buttonHoverBg: 'hover:bg-emerald-600',
  },
  sunset: {
    pageBg: 'bg-slate-950',
    sectionBg: 'bg-slate-950',
    sectionAltBg: 'bg-slate-900/80',
    cardBg: 'bg-slate-900/70',
    border: 'border-slate-800',
    textPrimary: 'text-slate-50',
    textMuted: 'text-slate-300',
    textHero: 'text-slate-50',
    textHeroTagline: 'text-white',
    textButton: 'text-slate-950',
    heroOverlay:
      'bg-gradient-to-br from-purple-950/60 via-slate-950/60 to-orange-900/50',
    heroTaglineBg: 'bg-black/40',
    buttonBg: 'bg-orange-400',
    buttonHoverBg: 'hover:bg-orange-500',
  },
  classic: {
    pageBg: 'bg-white',
    sectionBg: 'bg-slate-100',
    sectionAltBg: 'bg-slate-200',
    cardBg: 'bg-white',
    border: 'border-slate-300',
    textPrimary: 'text-slate-500',
    textMuted: 'text-slate-400',
    textHero: 'text-white',
    textHeroTagline: 'text-white',
    textButton: 'text-white',
    heroOverlay:
      'bg-black/45',
    heroTaglineBg: 'bg-black/40',
    buttonBg: 'bg-lime-500',
    buttonHoverBg: 'hover:bg-lime-400',
  },
};


// Helper to fetch palettes by id
export function getPaletteById(id: PaletteId): PaletteClasses {
  // fallback if someone stores a bad id in DB
  return palettes[id] ?? palettes.sunset;
}

// Optionally export the full list for dropdowns in admin UI later
export const ALL_PALETTES: { id: PaletteId; label: string }[] = [
  { id: 'darkGray', label: 'Dark Gray' },
  { id: 'darkBlue', label: 'Dark Blue' },
  { id: 'lightGray', label: 'Light Gray' },
  { id: 'lightSand', label: 'Light Sand' },
  { id: 'lightMint', label: 'Light Mint' },
  { id: 'sunset', label: 'Sunset' },
];
