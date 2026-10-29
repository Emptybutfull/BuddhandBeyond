// Brush-drawn ensō circle: the channel's signature mark ("empty but full").
// Used by EnsoSting, QuestionCard and EndCard; can also sit alone behind any text.
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {colors} from './theme';

type Props = {
  size?: number; // px diameter
  color?: string;
  drawStart?: number; // frame (relative to parent Sequence) the brush starts
  drawFrames?: number; // how long the stroke takes
  thickness?: number; // px
  opacity?: number;
  style?: React.CSSProperties;
};

const arc = (r: number, a0: number, sweep: number) => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x0 = r * Math.cos(rad(a0));
  const y0 = r * Math.sin(rad(a0));
  const x1 = r * Math.cos(rad(a0 + sweep));
  const y1 = r * Math.sin(rad(a0 + sweep));
  return `M ${x0} ${y0} A ${r} ${r} 0 1 1 ${x1} ${y1}`;
};

export const Enso: React.FC<Props> = ({
  size = 620,
  color = colors.bone,
  drawStart = 0,
  drawFrames = 36,
  thickness = 34,
  opacity = 0.92,
  style,
}) => {
  const frame = useCurrentFrame();
  const id = React.useId().replace(/:/g, '');
  const p = interpolate(frame, [drawStart, drawStart + drawFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.55, 0.05, 0.35, 1), // slow press, fast sweep, slow lift
  });
  const r = 400;
  const common = {fill: 'none', pathLength: 1, strokeDasharray: 1, strokeLinecap: 'round' as const};
  return (
    <svg width={size} height={size} viewBox="-500 -500 1000 1000" style={{opacity, ...style}}>
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={3} seed={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={18} />
        </filter>
      </defs>
      <g filter={`url(#${id})`} transform="rotate(-8)">
        {/* body of the stroke */}
        <path d={arc(r, -100, 328)} stroke={color} strokeWidth={thickness * 2.2} {...common} strokeDashoffset={1 - p} />
        {/* dry-brush outer hairs */}
        <path d={arc(r + 34, -96, 300)} stroke={color} strokeWidth={6} opacity={0.5} {...common} strokeDashoffset={1 - p} />
        <path d={arc(r - 36, -104, 318)} stroke={color} strokeWidth={5} opacity={0.45} {...common} strokeDashoffset={1 - p} />
      </g>
    </svg>
  );
};
