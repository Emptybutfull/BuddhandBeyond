// title-card-01: type plus one geometric motif.
// Three moves, overlapping: (1) one ring comes apart into five, (2) the title arrives word by word,
// (3) the accent leaves the empty centre and lands on the question mark. Then everything holds.
//
// To render: copy into a Remotion project that has the design kit, as src/experiments/TitleCard.tsx, and add
//   <Composition id="TitleCard01" component={TitleCard01} {...TITLE_CARD_01} />
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Grain} from '../design/GrainGradient';
import {fonts} from '../design/tokens';

export const TITLE_CARD_01 = {width: 1920, height: 1080, fps: 24, durationInFrames: 144};

const BG = '#0a0c10', BONE = '#e9e2d2', RING = '#7f8b9b', ACCENT = '#ffb060', LABEL = '#6f7a88';
const WORDS = ['Where', 'is', 'your', 'self'];
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const inOut = Easing.inOut(Easing.cubic), out = Easing.out(Easing.cubic), into = Easing.in(Easing.cubic);

// five rings: where each one ends up (direction in degrees, distance in px, final radius)
const RINGS = [
  {dir: -78, dist: 36, r: 150},
  {dir: -6, dist: 50, r: 158},
  {dir: 66, dist: 32, r: 144},
  {dir: 138, dist: 56, r: 162},
  {dir: 210, dist: 42, r: 140},
];
const CX = 960, CY = 392, R0 = 150;

export const TitleCard01: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const seg = (a: number, b: number, e = inOut) => interpolate(t, [a, b], [0, 1], {...clamp, easing: e});

  const ringIn = seg(0.05, 0.7, out);
  const dotIn = seg(0.25, 0.8, out), dotOut = seg(2.9, 3.7, into);
  const dot = dotIn * (1 - dotOut);
  const mark = seg(3.15, 3.95, out); // the question mark

  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 36%, rgba(58,72,90,0.26), rgba(58,72,90,0) 46%)'}} />
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <radialGradient id="tc-glow">
            <stop offset="0" stopColor={ACCENT} stopOpacity={0.5} />
            <stop offset="1" stopColor={ACCENT} stopOpacity={0} />
          </radialGradient>
        </defs>
        {RINGS.map((ring, i) => {
          const k = seg(0.55 + 0.11 * i, 2.95 + 0.11 * i); // each ring leaves a little after the last
          const drift = 1 + 0.045 * Math.sin((t / 9) * Math.PI * 2 + i * 1.3) * k; // barely alive while it holds
          const a = (ring.dir * Math.PI) / 180;
          return (
            <circle key={i} cx={CX + Math.cos(a) * ring.dist * k * drift} cy={CY + Math.sin(a) * ring.dist * k * drift} r={R0 + (ring.r - R0) * k} fill="none" stroke={RING} strokeWidth={1.7} opacity={0.78 * ringIn} />
          );
        })}
        <circle cx={CX} cy={CY} r={44} fill="url(#tc-glow)" opacity={dot} />
        <circle cx={CX} cy={CY} r={6.5} fill={ACCENT} opacity={dot} />
      </svg>

      <div style={{position: 'absolute', left: 0, right: 0, top: 648, textAlign: 'center', fontFamily: fonts.serif, fontWeight: 400, fontSize: 138, lineHeight: 1, letterSpacing: '-0.012em', color: BONE, whiteSpace: 'nowrap'}}>
        {WORDS.map((w, i) => {
          const p = seg(1.5 + 0.16 * i, 2.3 + 0.16 * i, out);
          return (
            <span key={w} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 14}px)`, marginRight: i < WORDS.length - 1 ? '0.24em' : 0}}>
              {w}
            </span>
          );
        })}
        <span style={{display: 'inline-block', color: ACCENT, opacity: mark, transform: `translateY(${(1 - mark) * 14}px)`, textShadow: `0 0 26px rgba(255,176,96,${0.42 * mark})`}}>?</span>
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: 862, textAlign: 'center', fontFamily: fonts.mono, fontWeight: 500, fontSize: 20, letterSpacing: '0.34em', color: LABEL, opacity: seg(0.3, 1.1, out)}}>A VIDEO ESSAY</div>
      <Grain amount={0.1} />
    </AbsoluteFill>
  );
};
