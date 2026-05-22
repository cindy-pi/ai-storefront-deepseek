const PALETTES = {
  good: { glow: '#4ade80', core: '#22c55e', accent: '#86efac', bg: '#052e16' },
  neutral: { glow: '#a78bfa', core: '#7c3aed', accent: '#c4b5fd', bg: '#1e1b4b' },
  evil: { glow: '#f87171', core: '#dc2626', accent: '#fca5a5', bg: '#450a0a' },
};

const RARITY_GLOW = {
  common: 0.4,
  uncommon: 0.6,
  rare: 0.8,
  legendary: 1,
};

function hashName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h) + name.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function wandSvgUrl(name, alignment, rarity) {
  const pal = PALETTES[alignment] || PALETTES.neutral;
  const glowIntensity = RARITY_GLOW[rarity] || 0.5;
  const h = hashName(name);
  const bend = (h % 30) - 15;
  const tipX = 32 + (h % 12) - 6;
  const runeY = 54 + (h % 20) - 10;
  const glowOpacity = 0.3 + glowIntensity * 0.5;
  const blobOffset = (h % 20) - 10;
  const ringY = 48 + (h % 8) - 4;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 120" width="80" height="120">
  <defs>
    <radialGradient id="g-${name.replace(/\s/g,'')}" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${pal.core}" stop-opacity="${glowOpacity}"/>
      <stop offset="100%" stop-color="${pal.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="w-${name.replace(/\s/g,'')}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${pal.core}"/>
      <stop offset="50%" stop-color="${pal.accent}"/>
      <stop offset="100%" stop-color="${pal.core}"/>
    </linearGradient>
  </defs>
  <rect width="80" height="120" rx="8" fill="${pal.bg}"/>
  <ellipse cx="40" cy="40" rx="35" ry="35" fill="url(#g-${name.replace(/\s/g,'')})"/>
  <line x1="40" y1="20" x2="${40 + bend * 0.3}" y2="105"
        stroke="url(#w-${name.replace(/\s/g,'')})" stroke-width="4" stroke-linecap="round"/>
  <line x1="40" y1="20" x2="${40 + bend * 0.3}" y2="105"
        stroke="${pal.glow}" stroke-width="2" stroke-linecap="round" opacity="${glowIntensity * 0.4}"/>
  <circle cx="${tipX}" cy="18" r="5" fill="${pal.accent}" opacity="0.9"/>
  <circle cx="${tipX}" cy="18" r="3" fill="${pal.glow}" opacity="0.6"/>
  <text x="${tipX}" y="22" text-anchor="middle" font-size="6" fill="${pal.bg}" font-weight="bold">✦</text>
  <rect x="34" y="${ringY}" width="12" height="3" rx="1.5" fill="${pal.glow}" opacity="0.8"/>
  <circle cx="40" cy="${runeY}" r="8" fill="none" stroke="${pal.accent}" stroke-width="0.8" opacity="0.5"/>
  <text x="40" y="${runeY + 3}" text-anchor="middle" font-size="7" fill="${pal.accent}" opacity="0.7" font-family="serif">✦</text>
  <circle cx="${40 + blobOffset}" cy="92" r="3" fill="${pal.glow}" opacity="${glowIntensity * 0.3}"/>
  <circle cx="${42 + blobOffset}" cy="88" r="2" fill="${pal.glow}" opacity="${glowIntensity * 0.2}"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
