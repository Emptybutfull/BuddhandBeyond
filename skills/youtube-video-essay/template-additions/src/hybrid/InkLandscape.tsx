// Procedural sumi-e mountains with slow parallax. A fallback B-roll plate and the
// placeholder "art" in HybridDemo. Real Midjourney/Envato art always wins over this.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  paper?: string;
  ink?: string;
  seal?: string | null; // red hanko stamp colour, null to hide
  drift?: number; // px per second for the nearest ridge
};

const ridge = (w: number, h: number, base: number, amp: number, seed: number) => {
  const pts: string[] = [];
  const step = 12;
  for (let x = -200; x <= w + 400; x += step) {
    const y =
      base -
      amp *
        (0.55 * Math.sin(x * 0.0021 + seed) +
          0.3 * Math.sin(x * 0.0057 + seed * 2.3) +
          0.15 * Math.sin(x * 0.019 + seed * 5.1));
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M -200,${h} L ${pts.join(' L ')} L ${w + 400},${h} Z`;
};

export const InkLandscape: React.FC<Props> = ({paper = '#e8dfca', ink = '#151515', seal = '#a3231b', drift = 6}) => {
  const frame = useCurrentFrame();
  const {width: w, height: h, fps} = useVideoConfig();
  const t = frame / fps;
  const layers = [
    {base: h * 0.55, amp: h * 0.16, seed: 1.3, op: 0.18, depth: 0.15},
    {base: h * 0.66, amp: h * 0.13, seed: 4.1, op: 0.32, depth: 0.35},
    {base: h * 0.78, amp: h * 0.1, seed: 7.7, op: 0.55, depth: 0.65},
    {base: h * 0.92, amp: h * 0.07, seed: 2.9, op: 0.85, depth: 1},
  ];
  return (
    <AbsoluteFill style={{background: `linear-gradient(${paper}, #d9cfb8)`}}>
      <svg width={w} height={h} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="il-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={paper} stopOpacity={0} />
            <stop offset="1" stopColor={paper} stopOpacity={0.85} />
          </linearGradient>
        </defs>
        <circle cx={w * 0.72} cy={h * 0.26} r={h * 0.09} fill={ink} opacity={0.08} />
        {layers.map((l, i) => (
          <g key={i} transform={`translate(${-t * drift * l.depth} 0)`}>
            <path d={ridge(w, h, l.base, l.amp, l.seed)} fill={ink} opacity={l.op} />
            <rect x={-200} y={l.base - l.amp * 0.2} width={w + 600} height={h * 0.14} fill="url(#il-mist)" />
          </g>
        ))}
        {seal && <rect x={w * 0.08} y={h * 0.12} width={46} height={58} rx={4} fill={seal} opacity={0.85} />}
      </svg>
    </AbsoluteFill>
  );
};
