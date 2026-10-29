// Shared look for the hybrid (on-camera + essay) kit.
// If style.md already fixes fonts/colours for the channel, change them HERE only.
import {loadFont as loadSerif} from '@remotion/google-fonts/CormorantGaramond';
import {loadFont as loadSans} from '@remotion/google-fonts/Jost';

const serif = loadSerif('normal', {weights: ['500', '600', '700'], subsets: ['latin']});
const serifItalic = loadSerif('italic', {weights: ['500'], subsets: ['latin']});
const sans = loadSans('normal', {weights: ['400', '500'], subsets: ['latin']});

export const fonts = {
  serif: serif.fontFamily, // chapter words, quotes, questions
  serifItalic: serifItalic.fontFamily,
  sans: sans.fontFamily, // labels, lower thirds, diagram text
};

export const colors = {
  ink: '#0d0b0a',
  night: '#0f1424', // indigo night sky
  lacquer: '#4a1410', // thangka red
  gold: '#c9a24a',
  goldSoft: 'rgba(201,162,74,0.55)',
  bone: '#efe6d2', // parchment / text on dark
  saffron: '#d9822b',
  jade: '#2f5d50',
};

// Two-colour pairs for duotone / posterised presenter shots (Scipio-style, but on-brand).
export const duotones = {
  goldOnLacquer: ['#2a0b08', '#e8c77a'] as [string, string],
  boneOnIndigo: ['#0b1020', '#efe6d2'] as [string, string],
  saffronOnInk: ['#120c08', '#e59a4a'] as [string, string],
  jadeOnInk: ['#07120f', '#a9d3c0'] as [string, string],
};

// Warm grade so camera footage sits with museum art (keep subtle).
export const cameraGrade = 'sepia(0.14) saturate(0.82) contrast(1.06) brightness(0.96)';

export const vignette =
  'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)';
