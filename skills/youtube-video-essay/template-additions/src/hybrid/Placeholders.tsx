// Stand-ins so every layout can be previewed before real footage exists.
// PresenterShot falls back to <PresenterPlaceholder> whenever `src` is missing.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from './theme';

// Warm, out-of-focus "shrine corner" behind the speaker.
export const Room: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 30% 40%, #3a2a1f 0%, #1a120d 60%, #0c0806 100%)'}}>
    {[
      [0.18, 0.62, 0.07, '#f2b25a'],
      [0.82, 0.3, 0.05, '#e8a24a'],
      [0.74, 0.7, 0.09, '#6a4a2a'],
    ].map(([x, y, r, c], i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${(x as number) * 100}%`,
          top: `${(y as number) * 100}%`,
          width: `${(r as number) * 200}%`,
          aspectRatio: '1',
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          background: c as string,
          filter: 'blur(40px)',
          opacity: 0.35,
        }}
      />
    ))}
  </AbsoluteFill>
);

export const PresenterPlaceholder: React.FC<{transparent?: boolean; label?: string}> = ({transparent, label = 'YOU'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const breathe = Math.sin((frame / fps) * 1.3) * 4;
  return (
    <AbsoluteFill>
      {!transparent && <Room />}
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax meet" style={{position: 'absolute', width: '100%', height: '100%'}}>
        <defs>
          <linearGradient id="ph-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6e5340" />
            <stop offset="0.65" stopColor="#2a201a" />
            <stop offset="1" stopColor="#8a6a48" />
          </linearGradient>
          {/* key light from the left, like a window */}
          <linearGradient id="ph-face" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d2a983" />
            <stop offset="0.6" stopColor="#8a674c" />
            <stop offset="1" stopColor="#4a372a" />
          </linearGradient>
        </defs>
        <g transform={`translate(0 ${breathe})`}>
          <path d="M 150 1000 C 170 800, 320 720, 440 700 L 560 700 C 680 720, 830 800, 850 1000 Z" fill="url(#ph-body)" />
          <path d="M 445 590 L 445 712 L 555 712 L 555 590 Z" fill="url(#ph-face)" opacity={0.8} />
          <ellipse cx={500} cy={470} rx={118} ry={148} fill="url(#ph-face)" />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.sans,
          letterSpacing: '0.3em',
          fontSize: 26,
          color: colors.bone,
          opacity: 0.55,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};
