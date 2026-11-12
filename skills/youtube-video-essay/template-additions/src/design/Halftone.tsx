// Print effects that work on anything: images, video (Steven on camera), SVG, Blender frames.
//
// <Halftone ink="#2440b3">…</Halftone>     one-ink halftone "reprint" (the NO IDEA pigeon): ink dots on a
//                                           transparent ground, so it sits on any flat colour.
// <GradientMap ramp={ramps.lapisFire}>…</GradientMap>   re-colour by brightness through a chapter ramp
//                                           (makes a Blender render or footage belong to the chapter).
import React from 'react';
import {Ramp, hexToRgb} from './tokens';

type HalftoneProps = {
  ink?: string;
  cell?: number; // dot pitch in px (6–12 looks like print at 1080p)
  angle?: number; // screen angle; 45° is the classic
  contrast?: number; // tone of the source before screening (1 = as is)
  brightness?: number; // >1 opens the highlights (fewer dots)
  invert?: boolean; // dots where the source is LIGHT (light ink on a dark ground)
  style?: React.CSSProperties;
  children: React.ReactNode;
};

// Output is ink-coloured dots on a transparent ground, so it can sit on any colour, under any
// transform or opacity, and be overprinted by type with mixBlendMode: 'multiply'.
export const Halftone: React.FC<HalftoneProps> = ({ink = '#0d0d0d', cell = 9, angle = 45, contrast = 1.15, brightness = 1.05, invert = false, style, children}) => {
  const id = React.useId().replace(/:/g, '');
  const [r, g, b] = hexToRgb(ink).map((v) => (v / 255).toFixed(4));
  return (
    <div style={{position: 'relative', ...style}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        {/* black → ink colour, white → transparent. The region is pinned to the box: the default 10%
            margin would be read as "black" and print a solid frame. */}
        <filter id={id} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={`0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  -0.3333 -0.3333 -0.3333 0 1`} />
        </filter>
      </svg>
      {/* source in grey + dot screen at 50%, then a hard threshold: dot size follows the tone */}
      <div style={{position: 'relative', background: '#fff', overflow: 'hidden', clipPath: 'inset(1px)', filter: `contrast(60)${invert ? ' invert(1)' : ''} url(#${id})`}}>
        <div style={{filter: `grayscale(1) contrast(${contrast}) brightness(${brightness})`}}>{children}</div>
        <div
          style={{
            position: 'absolute',
            inset: '-50%',
            opacity: 0.5,
            backgroundImage: 'radial-gradient(circle farthest-corner at center, #000 0%, #fff 100%)',
            backgroundSize: `${cell}px ${cell}px`,
            transform: `rotate(${angle}deg)`,
          }}
        />
      </div>
    </div>
  );
};

export const GradientMap: React.FC<{ramp: Ramp; style?: React.CSSProperties; children: React.ReactNode}> = ({ramp, style, children}) => {
  const id = React.useId().replace(/:/g, '');
  const stops = ramp.map(hexToRgb);
  const table = (c: number) => stops.map((s) => (s[c] / 255).toFixed(4)).join(' ');
  return (
    <div style={{position: 'relative', ...style}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={table(0)} />
            <feFuncG type="table" tableValues={table(1)} />
            <feFuncB type="table" tableValues={table(2)} />
          </feComponentTransfer>
        </filter>
      </svg>
      <div style={{filter: `url(#${id})`, width: '100%', height: '100%'}}>{children}</div>
    </div>
  );
};
