// Channel bookends: the ensō title sting (after the cold open) and the end card.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Enso} from './Enso';
import {PatternBg} from './PatternBg';
import {colors, fonts} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// 4–5 s. Sound: one singing-bowl strike on frame 4, let it ring under the next line.
export const EnsoSting: React.FC<{title?: string; sub?: string}> = ({title = 'EMPTY BUT FULL', sub}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: dur} = useVideoConfig();
  const out = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  return (
    <PatternBg kind="mist" bg={`radial-gradient(ellipse at 50% 50%, #17130f 0%, ${colors.ink} 70%)`} color={colors.bone} opacity={0.08} speed={3}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
        <Enso size={760} drawStart={4} drawFrames={34} />
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', opacity: out}}>
        <div style={{fontFamily: fonts.sans, fontWeight: 500, fontSize: 36, letterSpacing: '0.32em', marginRight: '-0.32em', color: colors.bone, opacity: interpolate(frame, [30, 50], [0, 1], clamp)}}>
          {title}
        </div>
        {sub && (
          <div style={{fontFamily: fonts.serifItalic, fontStyle: 'italic', fontSize: 34, color: colors.gold, marginTop: 18, opacity: interpolate(frame, [42, 60], [0, 1], clamp)}}>
            {sub}
          </div>
        )}
      </AbsoluteFill>
    </PatternBg>
  );
};

// Last 12–20 s. YouTube end-screen elements go on the right; keep that area calm.
// `guides` draws where the elements will sit — preview only, never in the final render.
export const EndCard: React.FC<{line?: string; guides?: boolean}> = ({line = 'Thank you for sitting with me.', guides = false}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const box = (top: number): React.CSSProperties => ({
    position: 'absolute',
    right: W * 0.06,
    top: H * top,
    width: W * 0.36,
    height: W * 0.36 * (9 / 16),
    border: guides ? `2px dashed ${colors.goldSoft}` : undefined,
    borderRadius: 10,
    color: colors.goldSoft,
    fontFamily: fonts.sans,
    fontSize: 22,
    letterSpacing: '0.2em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  return (
    <PatternBg kind="wheel" opacity={0.12} speed={1} center={[0.27, 0.5]} size={0.5}>
      <div style={{position: 'absolute', left: W * 0.27 - 230, top: H / 2 - 230}}>
        <Enso size={460} drawFrames={40} opacity={0.85} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: W * 0.06,
          width: W * 0.42,
          top: H * 0.8,
          textAlign: 'center',
          fontFamily: fonts.serifItalic,
          fontStyle: 'italic',
          fontSize: 40,
          color: colors.bone,
          opacity: interpolate(frame, [30, 50], [0, 1], clamp),
        }}
      >
        {line}
      </div>
      <div style={box(0.1)}>{guides && 'END SCREEN · VIDEO'}</div>
      <div style={box(0.52)}>{guides && 'END SCREEN · VIDEO'}</div>
    </PatternBg>
  );
};

// Animated grain. Only for previews / projects without the template's own texture layer.
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={width} height={height} style={{position: 'absolute', inset: 0, opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 12} />
      </filter>
      <rect width={width} height={height} filter={`url(#${id})`} />
    </svg>
  );
};
