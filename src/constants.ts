// Timing Constants (milliseconds)
export const CART_POLL_INTERVAL = 3000;
export const ADDED_TO_CART_DISPLAY_TIME = 3000;
export const FADE_OUT_DURATION = 600;

// Scroll & UI Constants
export const SCROLL_THRESHOLD_PERCENTAGE = 0.15;
export const NAV_SCROLL_OFFSET = 120; // pixels from top for active section

// API & Pagination Constants
export const ARCHIVE_IMAGES_LIMIT = 50;

// Pricing Configuration
export const GRILLZ_PRICING = {
  PER_TOOTH: '900 DKK',
  MATERIAL: '925 STERLING ONLY',
  CUSTOM_DESCRIPTION: 'from 1 tooth to full mouth, the choice is yours.',
} as const;

// Session Storage Keys
export const SESSION_KEYS = {
  HAS_SEEN_HERO: 'hasSeenHero',
  CART_ID: 'cartId',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  TIKTOK: 'https://tiktok.com',
  INSTAGRAM: 'https://instagram.com',
} as const;
