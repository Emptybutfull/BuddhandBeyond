// Slow, procedural sacred-geometry backgrounds (no image files needed).
// Use behind the presenter (side / cutout / triptych modes), under chapter cards,
// question cards and diagrams. Keep them dim: they are wallpaper, not the subject.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {colors} from './theme';

export type PatternKind = 'mandala' | 'wheel' | 'rays' | 'flower' | 'lotus' | 'mist' | 'none';

type Props = {
  kind: PatternKind;
  bg?: string; // any CSS background
  color?: string;
  opacity?: number;
  speed?: number; // degrees per second
  size?: number; // radius as a fraction of frame height
  center?: [number, number]; // fractions of width / height
  drawOn?: number; // seconds for lines to draw themselves in (0 = already drawn)
  glow?: boolean;
  strokeWidth?: number;
  children?: React.ReactNode;
};

export const defaultBg = `radial-gradient(ellipse at 50% 45%, #1a2036 0%, ${colors.night} 55%, #07090f 100%)`;

// A petal pointing "up" (negative y) from radius r0 to r1.
const petal = (r0: number, r1: number, w: number) => {
  const a = r0 + (r1 - r0) * 0.25;
  const b = r0 + (r1 - r0) * 0.7;
  return `M 0 ${-r0} C ${w / 2} ${-a} ${w / 2} ${-b} 0 ${-r1} C ${-w / 2} ${-b} ${-w / 2} ${-a} 0 ${-r0} Z`;
};

const ring = (n: number, render: (k: number) => React.ReactNode) =>
  Array.from({length: n}, (_, k) => <g key={k} transform={`rotate(${(k * 360) / n})`}>{render(k)}</g>);

export const PatternBg: React.FC<Props> = ({
  kind,
  bg = defaultBg,
  color = colors.gold,
  opacity = 0.32,
  speed = 2,
  size = 0.62,
  center = [0.5, 0.5],
  drawOn = 0,
  glow = true,
  strokeWidth = 1.6,
  children,
}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const t = frame / fps;
  const rot = t * speed;
  const R = size * height; // pixel radius; designs are drawn on a 500-unit radius
  const p = drawOn > 0 ? interpolate(t, [0, drawOn], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)}) : 1;

  // Every stroked element gets these, so drawOn works everywhere.
  const s = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    vectorEffect: 'non-scaling-stroke' as const,
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - p,
  };

  let art: React.ReactNode = null;
  if (kind === 'mandala') {
    art = (
      <>
        <circle r={470} {...s} />
        <circle r={455} {...s} />
        <g transform={`rotate(${rot})`}>{ring(24, () => <path d={petal(330, 450, 60)} {...s} />)}</g>
        <g transform={`rotate(${-rot * 0.5})`}>{ring(48, () => <circle cy={-310} r={4} {...s} />)}</g>
        <g transform={`rotate(${-rot})`}>{ring(16, () => <path d={petal(200, 300, 70)} {...s} />)}</g>
        <circle r={190} {...s} />
        <g transform={`rotate(${rot * 1.5})`}>{ring(8, () => <path d={petal(80, 185, 90)} {...s} />)}</g>
        <circle r={60} {...s} />
        <circle r={20} {...s} />
      </>
    );
  } else if (kind === 'wheel') {
    art = (
      <g transform={`rotate(${rot})`}>
        <circle r={430} {...s} />
        <circle r={400} {...s} />
        <circle r={300} {...s} strokeDasharray={p < 1 ? 1 : '0.004 0.008'} />
        {ring(8, () => (
          <>
            <path d="M -10 -95 L -4 -395 L 4 -395 L 10 -95 Z" {...s} />
            <path d="M 0 -232 L 14 -250 L 0 -268 L -14 -250 Z" {...s} />
            <circle cy={-455} r={18} {...s} />
          </>
        ))}
        <circle r={90} {...s} />
        <circle r={60} {...s} />
        <circle r={25} {...s} />
      </g>
    );
  } else if (kind === 'rays') {
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.2);
    art = (
      <>
        <circle r={260} fill={color} opacity={0.06 + 0.05 * pulse} stroke="none" />
        <g transform={`rotate(${rot})`}>
          {ring(72, (k) => <line y1={-120} y2={k % 2 ? -380 : -480} {...s} />)}
        </g>
        <circle r={115} {...s} />
      </>
    );
  } else if (kind === 'flower') {
    const pts: [number, number][] = [[0, 0]];
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3;
      pts.push([100 * Math.cos(a), 100 * Math.sin(a)]);
      pts.push([200 * Math.cos(a), 200 * Math.sin(a)]);
      pts.push([173.2 * Math.cos(a + Math.PI / 6), 173.2 * Math.sin(a + Math.PI / 6)]);
    }
    art = (
      <g transform={`rotate(${rot}) scale(1.45)`}>
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={100} {...s} />)}
        <circle r={300} {...s} />
        <circle r={310} {...s} />
      </g>
    );
  } else if (kind === 'lotus') {
    const breathe = 1 + 0.04 * Math.sin((t * 2 * Math.PI) / 6);
    const layer = (n: number, spread: number, len: number, w: number) =>
      Array.from({length: n}, (_, k) => {
        const a = (-spread + (2 * spread * k) / (n - 1)) * breathe;
        return <path key={k} d={petal(0, len, w)} transform={`rotate(${a})`} {...s} />;
      });
    art = (
      <g transform="translate(0 260)">
        {layer(9, 80, 420, 120)}
        {layer(7, 58, 340, 130)}
        {layer(5, 34, 260, 140)}
        <path d="M -260 20 Q 0 70 260 20" {...s} />
      </g>
    );
  }

  return (
    <AbsoluteFill style={{background: bg}}>
      {kind === 'mist' ? (
        <Mist color={color} opacity={opacity} t={t} speed={speed} />
      ) : kind === 'none' ? null : (
        <svg
          width={width}
          height={height}
          style={{position: 'absolute', opacity, filter: glow ? `drop-shadow(0 0 6px ${color})` : undefined}}
        >
          <g transform={`translate(${center[0] * width} ${center[1] * height}) scale(${R / 500})`}>{art}</g>
        </svg>
      )}
      {children}
    </AbsoluteFill>
  );
};

// Drifting ink-smoke / cloud layer. Cheap enough for long shots.
const Mist: React.FC<{color: string; opacity: number; t: number; speed: number}> = ({color, opacity, t, speed}) => {
  const {width, height} = useVideoConfig();
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={width} height={height} style={{position: 'absolute', opacity: opacity * 1.6}}>
      <defs>
        <filter id={`${id}f`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.0045" numOctaves={4} seed={7} />
          <feColorMatrix type="matrix" values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.35`} />
        </filter>
        <mask id={`${id}m`}>
          <rect x={-t * speed * 12} width={width * 2} height={height} filter={`url(#${id}f)`} />
        </mask>
      </defs>
      <rect width={width} height={height} fill={color} mask={`url(#${id}m)`} />
    </svg>
  );
};
