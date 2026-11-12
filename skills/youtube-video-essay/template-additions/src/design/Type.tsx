// Type voices of the house look and the two entrances we allow ourselves.
//   <Wide>   Unbounded 800 — chapter and video titles (THERMAL)
//   <Heavy>  Jost 900 caps — statements and punch words (THIS IS IT / NO IDEA)
//   <Micro>  mono caps — indices, credits, labels in the corners
//   <Soft>   Instrument Serif italic — quotes, sutras, anything said quietly
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {bone, fonts} from './tokens';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
type P = {children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties};

export const Wide: React.FC<P> = ({children, size = 120, color = bone, style}) => (
  <div style={{fontFamily: fonts.wide, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: '-0.01em', color, textTransform: 'uppercase', ...style}}>{children}</div>
);

export const Heavy: React.FC<P> = ({children, size = 200, color = bone, style}) => (
  <div style={{fontFamily: fonts.heavy, fontWeight: 900, fontSize: size, lineHeight: 0.86, letterSpacing: '-0.025em', color, textTransform: 'uppercase', ...style}}>{children}</div>
);

export const Micro: React.FC<P> = ({children, size = 22, color = bone, style}) => (
  <div style={{fontFamily: fonts.mono, fontWeight: 500, fontSize: size, lineHeight: 1.35, letterSpacing: '0.08em', color, textTransform: 'uppercase', whiteSpace: 'pre-line', ...style}}>{children}</div>
);

export const Soft: React.FC<P> = ({children, size = 84, color = bone, style}) => (
  <div style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, fontSize: size, lineHeight: 1.08, letterSpacing: '-0.01em', color, ...style}}>{children}</div>
);

// Entrance 1: rise + unblur + fade. `at` in frames; use for whole blocks.
export const Rise: React.FC<{at?: number; dur?: number; dist?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, dur = 14, dist = 28, children, style}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * dist}px)`, filter: p < 1 ? `blur(${(1 - p) * 10}px)` : undefined, ...style}}>{children}</div>;
};

// Entrance 2: pieces (words or letters) arrive one after another. Pass `frames` to pin each piece
// to a spoken word's frame instead of an even stagger.
export const Stagger: React.FC<{text: string; by?: 'word' | 'letter'; at?: number; every?: number; dur?: number; frames?: number[]; style?: React.CSSProperties}> = ({
  text,
  by = 'word',
  at = 0,
  every = 3,
  dur = 12,
  frames,
  style,
}) => {
  const frame = useCurrentFrame();
  const parts = by === 'word' ? text.split(' ') : Array.from(text);
  return (
    <span style={style}>
      {parts.map((part, i) => {
        const start = frames?.[i] ?? at + i * every;
        const p = interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
        return (
          <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: p, transform: `translateY(${(1 - p) * 0.35}em)`, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined}}>
            {part}
            {by === 'word' && i < parts.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
};

// Hard cut-in for punch words (no easing): invisible before `at`, optional 2-frame overshoot.
export const Slam: React.FC<{at?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, children, style}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const s = interpolate(frame, [at, at + 3], [1.06, 1], clamp);
  return <div style={{transform: `scale(${s})`, transformOrigin: 'left bottom', ...style}}>{children}</div>;
};

// Print-style corner marks: index, source, date. One per corner at most.
export const Corner: React.FC<{pos: 'tl' | 'tr' | 'bl' | 'br'; children: React.ReactNode; color?: string; margin?: number; size?: number; align?: 'left' | 'right'}> = ({
  pos,
  children,
  color = bone,
  margin = 64,
  size = 22,
  align,
}) => (
  <div
    style={{
      position: 'absolute',
      [pos[0] === 't' ? 'top' : 'bottom']: margin,
      [pos[1] === 'l' ? 'left' : 'right']: margin,
      textAlign: align ?? (pos[1] === 'l' ? 'left' : 'right'),
    }}
  >
    <Micro size={size} color={color}>
      {children}
    </Micro>
  </div>
);
