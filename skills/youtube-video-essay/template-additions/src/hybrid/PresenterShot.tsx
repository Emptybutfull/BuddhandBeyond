// Steven on camera, five ways. Put one <PresenterShot> inside each <Sequence> that the
// presenter plan (scripts/plan_presenter.py) marks as on-camera.
//
//   full     – full frame, graded to match the art. Hook, chapter anchors, opinions, CTA.
//   side     – arched "shrine window" on one side + art/diagram (children) on the other. Explainer.
//   corner   – small circle over full-screen art (children). Asides while the picture stays up.
//   cutout   – background removed, big, with a slow mandala halo behind the head. Big statements.
//   triptych – three posterised duotone squares (centre + mirrored sides). 1–2 punch moments per video.
//
// `src` is camera_cut.mp4 (cut with the same EDL as voice.wav, so frame N of the cut = frame N
// of the video). Pass `startFrom` = the frame this Sequence starts at, and lips stay in sync.
// Camera audio is always muted: the voice comes from voice.wav.
import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PatternBg, PatternKind} from './PatternBg';
import {PresenterPlaceholder} from './Placeholders';
import {cameraGrade, colors, duotones, vignette} from './theme';

export type PresenterMode = 'full' | 'side' | 'corner' | 'cutout' | 'triptych';

type Props = {
  mode: PresenterMode;
  src?: string;
  startFrom?: number;
  side?: 'left' | 'right'; // side/corner: which side Steven is on. cutout: omit to centre.
  shape?: 'arch' | 'rounded' | 'circle';
  pattern?: PatternKind;
  patternBg?: string;
  duotone?: [string, string] | null;
  posterize?: boolean;
  punchIn?: boolean; // full mode: tighter crop. Alternate true/false across a jump cut to hide it.
  focus?: [number, number]; // where the face sits in the source frame (fractions)
  children?: React.ReactNode; // art or diagram
  animate?: boolean; // slide/pop panels in and out
};

const Cam: React.FC<{
  src?: string;
  startFrom: number;
  transparent?: boolean;
  focus: [number, number];
  zoom?: number;
  mirror?: boolean;
  filter?: string;
}> = ({src, startFrom, transparent, focus, zoom = 1, mirror, filter}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      transform: `scale(${zoom}) scaleX(${mirror ? -1 : 1})`,
      transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%`,
      filter,
    }}
  >
    {src ? (
      <Sequence from={-startFrom} layout="none">
        <OffthreadVideo
          src={src}
          muted
          transparent={transparent}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${focus[0] * 100}% ${focus[1] * 100}%`}}
        />
      </Sequence>
    ) : (
      <PresenterPlaceholder transparent={transparent} />
    )}
  </div>
);

// Grayscale -> contrast -> two-colour map. Posterize = 4 hard steps (Scipio look).
const DuotoneFilter: React.FC<{id: string; colors: [string, string]; posterize: boolean}> = ({id, colors: [dark, light], posterize}) => {
  const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const d = rgb(dark);
  const l = rgb(light);
  const steps = posterize ? 4 : 2;
  const table = (c: number) =>
    Array.from({length: steps}, (_, k) => (d[c] + ((l[c] - d[c]) * k) / (steps - 1)).toFixed(3)).join(' ');
  const type = posterize ? 'discrete' : 'table';
  return (
    <svg width={0} height={0} style={{position: 'absolute'}}>
      <filter id={id} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={1.35} intercept={-0.16} />
          <feFuncG type="linear" slope={1.35} intercept={-0.16} />
          <feFuncB type="linear" slope={1.35} intercept={-0.16} />
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type={type} tableValues={table(0)} />
          <feFuncG type={type} tableValues={table(1)} />
          <feFuncB type={type} tableValues={table(2)} />
        </feComponentTransfer>
      </filter>
    </svg>
  );
};

export const PresenterShot: React.FC<Props> = ({
  mode,
  src,
  startFrom = 0,
  side,
  shape,
  pattern,
  patternBg,
  duotone,
  posterize = true,
  punchIn = false,
  focus = [0.5, 0.36],
  children,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps, durationInFrames: dur} = useVideoConfig();
  const id = React.useId().replace(/:/g, '');
  const t = frame / fps;
  const inP = animate ? spring({frame, fps, config: {damping: 200}, durationInFrames: 18}) : 1;
  const outP = animate ? interpolate(frame, [dur - 12, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)}) : 0;
  const push = 1 + Math.min(t * 0.004, 0.05); // barely-there push-in keeps a static camera alive
  const tone = duotone === undefined ? (mode === 'triptych' ? duotones.goldOnLacquer : null) : duotone;
  const toneFilter = tone ? `url(#${id})` : cameraGrade;
  const defs = tone ? <DuotoneFilter id={id} colors={tone} posterize={posterize} /> : null;
  const frameRing = `0 0 0 10px rgba(0,0,0,0.35), 0 0 0 12px ${colors.goldSoft}, 0 24px 60px rgba(0,0,0,0.6)`;

  if (mode === 'full') {
    return (
      <AbsoluteFill style={{background: colors.ink}}>
        {defs}
        <Cam src={src} startFrom={startFrom} focus={focus} zoom={(punchIn ? 1.18 : 1) * push} filter={toneFilter} />
        <AbsoluteFill style={{background: vignette}} />
      </AbsoluteFill>
    );
  }

  if (mode === 'side') {
    const s = side ?? 'left';
    const margin = W * 0.06;
    const pw = W * 0.34;
    const ph = H * 0.8;
    const gap = W * 0.05;
    const radius = shape === 'rounded' ? '18px' : `${pw / 2}px ${pw / 2}px 18px 18px`;
    const slide = (1 - inP + outP) * (s === 'left' ? -1 : 1) * (pw + margin);
    const contentX = s === 'left' ? margin + pw + gap : margin;
    return (
      <PatternBg kind={pattern ?? 'mandala'} bg={patternBg} center={[s === 'left' ? 0.25 : 0.75, 0.5]} size={0.55}>
        {defs}
        <div
          style={{
            position: 'absolute',
            top: (H - ph) / 2,
            left: s === 'left' ? margin : W - margin - pw,
            width: pw,
            height: ph,
            borderRadius: radius,
            overflow: 'hidden',
            border: `3px solid ${colors.gold}`,
            boxShadow: frameRing,
            transform: `translateX(${slide}px)`,
          }}
        >
          <Cam src={src} startFrom={startFrom} focus={focus} zoom={1.05 * push} filter={toneFilter} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: (H - ph) / 2,
            left: contentX,
            width: W - 2 * margin - pw - gap,
            height: ph,
            borderRadius: 18,
            overflow: 'hidden',
            border: `1px solid ${colors.goldSoft}`,
            opacity: interpolate(frame, [6, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * (1 - outP),
          }}
        >
          {children}
        </div>
      </PatternBg>
    );
  }

  if (mode === 'corner') {
    const s = side ?? 'right';
    const d = H * 0.3;
    const pop = inP * (1 - outP);
    return (
      <AbsoluteFill>
        {children}
        {defs}
        <div
          style={{
            position: 'absolute',
            bottom: H * 0.07,
            [s === 'right' ? 'right' : 'left']: W * 0.045,
            width: d,
            height: shape === 'arch' ? d * 1.25 : d,
            borderRadius: shape === 'arch' ? `${d / 2}px ${d / 2}px 14px 14px` : '50%',
            overflow: 'hidden',
            border: `3px solid ${colors.gold}`,
            boxShadow: frameRing,
            transform: `scale(${0.6 + 0.4 * pop})`,
            opacity: pop,
          }}
        >
          <Cam src={src} startFrom={startFrom} focus={focus} zoom={1.35} filter={toneFilter} />
        </div>
      </AbsoluteFill>
    );
  }

  if (mode === 'cutout') {
    const shift = side === 'left' ? -0.22 : side === 'right' ? 0.22 : 0;
    const rise = (1 - inP) * H * 0.06;
    return (
      <PatternBg
        kind={pattern ?? 'mandala'}
        bg={patternBg ?? `radial-gradient(ellipse at ${(focus[0] + shift) * 100}% 40%, #6a1d16 0%, ${colors.lacquer} 45%, #1a0605 100%)`}
        center={[focus[0] + shift, focus[1]]}
        size={0.36}
        speed={4}
        opacity={0.5}
      >
        {children}
        {defs}
        <div style={{position: 'absolute', inset: 0, transform: `translate(${shift * W}px, ${rise}px)`, opacity: 1 - outP}}>
          <Cam src={src} startFrom={startFrom} transparent focus={focus} zoom={push} filter={toneFilter} />
        </div>
        <AbsoluteFill style={{background: vignette}} />
      </PatternBg>
    );
  }

  // triptych
  const S = H * 0.5;
  const gap = W * 0.02;
  const x0 = (W - (3 * S + 2 * gap)) / 2;
  return (
    <AbsoluteFill style={{background: colors.ink}}>
      {children ?? <PatternBg kind={pattern ?? 'rays'} bg={patternBg} />}
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.45)'}} />
      {defs}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: (H - S) / 2,
            left: x0 + i * (S + gap),
            width: S,
            height: S,
            overflow: 'hidden',
            border: `2px solid ${colors.goldSoft}`,
            opacity: (i === 1 ? 1 : 0.6) * interpolate(frame, [i === 1 ? 0 : 3, i === 1 ? 3 : 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          <Cam src={src} startFrom={startFrom} focus={focus} zoom={1.25} mirror={i !== 1} filter={toneFilter} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
