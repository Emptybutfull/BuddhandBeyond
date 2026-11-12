// A seated figure drawn in code: stand-in for Steven, a monk, or any cut-out, in three finishes.
//   shaded — tonal, lit from the left (feed it to <Halftone>)
//   light  — pure white with bloom (the "glow figure" layout)
//   flat   — one colour silhouette (tiny figure in a huge field)
import React from 'react';

type Props = {mode?: 'shaded' | 'light' | 'flat'; color?: string; height?: number | string; style?: React.CSSProperties};

const body = (
  <>
    {/* crossed legs */}
    <path d="M 120 900 C 150 770, 330 730, 500 730 C 670 730, 850 770, 880 900 C 840 965, 160 965, 120 900 Z" />
    {/* torso + shoulders */}
    <path d="M 300 760 C 280 600, 300 470, 400 440 L 600 440 C 700 470, 720 600, 700 760 Z" />
    {/* neck and head */}
    <path d="M 455 360 L 455 450 L 545 450 L 545 360 Z" />
    <ellipse cx={500} cy={270} rx={98} ry={120} />
    {/* hands resting in the lap */}
    <ellipse cx={500} cy={770} rx={130} ry={44} />
  </>
);

export const Figure: React.FC<Props> = ({mode = 'shaded', color = '#ffffff', height = '100%', style}) => {
  const id = React.useId().replace(/:/g, '');
  if (mode === 'light') {
    return (
      <div style={{position: 'relative', height, aspectRatio: '1', ...style}}>
        {[90, 34, 10, 0].map((blur, i) => (
          <svg key={i} viewBox="0 0 1000 1000" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', filter: blur ? `blur(${blur}px)` : undefined, opacity: i === 0 ? 0.9 : 1}} fill={color}>
            {body}
          </svg>
        ))}
      </div>
    );
  }
  return (
    <svg viewBox="0 0 1000 1000" style={{height, aspectRatio: '1', display: 'block', ...style}} fill={mode === 'flat' ? color : `url(#${id})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="#d8d8d8" />
          <stop offset="0.38" stopColor="#8a8a8a" />
          <stop offset="0.7" stopColor="#2e2e2e" />
          <stop offset="1" stopColor="#101010" />
        </linearGradient>
      </defs>
      {body}
    </svg>
  );
};
