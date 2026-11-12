// Design tokens for the house look (references/design-system.md). Change colours and fonts HERE only.

// <fonts>
import {loadFont as loadWide} from '@remotion/google-fonts/Unbounded';
import {loadFont as loadHeavy} from '@remotion/google-fonts/Jost';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadKanji} from '@remotion/google-fonts/ShipporiMincho';
import {loadFont as loadTibetan} from '@remotion/google-fonts/NotoSerifTibetan';
import {loadFont as loadDeva} from '@remotion/google-fonts/NotoSerifDevanagari';

const wide = loadWide('normal', {weights: ['800'], subsets: ['latin']});
const heavy = loadHeavy('normal', {weights: ['800', '900'], subsets: ['latin']});
const mono = loadMono('normal', {weights: ['400', '500'], subsets: ['latin', 'latin-ext']}); // latin-ext: ā ṭ ṅ ś for Pali and Sanskrit
const serif = loadSerif('normal', {weights: ['400'], subsets: ['latin']});
loadSerif('italic', {weights: ['400'], subsets: ['latin']});
// CJK fonts are split into ~120 small files; this loads them all once (a few seconds at render start).
const kanji = loadKanji('normal', {weights: ['800'], ignoreTooManyRequestsWarning: true});
const tibetan = loadTibetan('normal', {weights: ['600'], subsets: ['tibetan']});
const deva = loadDeva('normal', {weights: ['600'], subsets: ['devanagari']});

export const fonts = {
  wide: wide.fontFamily, // THERMAL-style titles
  heavy: heavy.fontFamily, // Futura-family statements ("THIS IS IT")
  mono: mono.fontFamily, // microtext, indices, credits
  serif: serif.fontFamily, // quotes and sutras (use italic)
  kanji: kanji.fontFamily,
  tibetan: tibetan.fontFamily,
  deva: deva.fontFamily,
};
// </fonts>

export type Ramp = string[]; // dark → light colour stops a field is mapped through

export const ramps = {
  thermal: ['#0b0a0c', '#16307a', '#12a5c9', '#3fbf6a', '#f08a1c', '#e3261c'],
  lapisFire: ['#0b0a10', '#14235e', '#2747c7', '#c0261d', '#e9a23b'],
  jadeAura: ['#08100e', '#0f4a45', '#22a58c', '#a8e3c3', '#f2e6b1'],
  plumEmber: ['#0e0810', '#3b1247', '#a01f6b', '#ee5a2f', '#f6c98a'],
  dawn: ['#0a0c1c', '#2a2a7c', '#8a4fb0', '#ef7f6a', '#f8d77a'],
  ash: ['#0c0c0c', '#2a2a2c', '#6d6a66', '#d9d2c5'],
} satisfies Record<string, Ramp>;

export const flats = {
  cobalt: {ground: '#2440b3', ink: '#e9e2d2', accent: '#e2512a'},
  signalRed: {ground: '#c8161a', ink: '#0d0d0d', accent: '#e9e2d2'},
  cyanPoster: {ground: '#0aa3d6', ink: '#0d0d0d', accent: '#e2512a'},
  bonePaper: {ground: '#e9e2d2', ink: '#2440b3', accent: '#e2512a'},
};

export const ink = '#0d0d0d';
export const bone = '#e9e2d2';
export const vermilion = '#e2512a';
export const cobalt = '#2440b3';
export const gold = '#d9a441';

// The five traditional colours (thangka pigments): use all together once per video at most.
export const fiveColours = ['#2747c7', '#f1ece0', '#c0261d', '#1f8a63', '#e9b53b'];

export const hexToRgb = (hex: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

// 256-entry lookup table for a ramp (r,g,b triplets).
export const rampLut = (ramp: Ramp): Uint8ClampedArray => {
  const lut = new Uint8ClampedArray(256 * 3);
  const stops = ramp.map(hexToRgb);
  for (let i = 0; i < 256; i++) {
    const t = (i / 255) * (stops.length - 1);
    const k = Math.min(stops.length - 2, Math.floor(t));
    const f = t - k;
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = stops[k][c] + (stops[k + 1][c] - stops[k][c]) * f;
  }
  return lut;
};
