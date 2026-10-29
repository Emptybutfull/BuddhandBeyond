// Paper-collage engine (the Pursuit-of-Wonder grammar, see references/style-collage.md):
// a textured paper wall, 3–5 cut-out layers that slide/drop/pop in, one slow camera move,
// a looping atmosphere (snow, dust, embers, or a Flow smoke/fire clip in screen blend), grain on top.
//
// <Sequence from={f0} durationInFrames={n}>
//   <Camera to={1.08}>
//     <Paper color="#14213d" />
//     <Cutout src={staticFile('cut/monk.png')} x={0.5} y={0.58} h={0.8} enter="up" />
//     <Cutout src={staticFile('cut/handcuffs.png')} x={0.5} y={0.3} h={0.25} enter="drop" at={20} />
//     <Particles kind="snow" />
//   </Camera>
// </Sequence>
import React from 'react';
import {AbsoluteFill, Easing, Img, Loop, OffthreadVideo, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Painted plaster / rice-paper wall in any colour. Pick ONE per video and keep it.
export const Paper: React.FC<{color?: string; fibers?: boolean}> = ({color = '#3b1418', fibers = true}) => {
  const {width, height} = useVideoConfig();
  const id = React.useId().replace(/:/g, '');
  return (
    <AbsoluteFill style={{background: color}}>
      <svg width={width} height={height} style={{position: 'absolute', mixBlendMode: 'multiply', opacity: 0.55}}>
        <filter id={`${id}a`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves={4} seed={11} />
          <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 0.1" />
        </filter>
        <rect width={width} height={height} filter={`url(#${id}a)`} />
      </svg>
      {fibers && (
        <svg width={width} height={height} style={{position: 'absolute', mixBlendMode: 'overlay', opacity: 0.35}}>
          <filter id={`${id}b`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9 0.04" numOctaves={2} seed={4} />
          </filter>
          <rect width={width} height={height} filter={`url(#${id}b)`} />
        </svg>
      )}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)'}} />
    </AbsoluteFill>
  );
};

type Move = 'none' | 'fade' | 'left' | 'right' | 'up' | 'down' | 'drop' | 'pop';

const motion = (kind: Move, p: number, W: number, H: number) => {
  // p: 0 = off / invisible, 1 = in place
  const o = kind === 'none' ? 1 : Math.min(1, p * 1.6);
  switch (kind) {
    case 'left':
      return {x: -(1 - p) * W * 0.6, y: 0, s: 1, o};
    case 'right':
      return {x: (1 - p) * W * 0.6, y: 0, s: 1, o};
    case 'up':
      return {x: 0, y: (1 - p) * H * 0.7, s: 1, o};
    case 'down':
      return {x: 0, y: -(1 - p) * H * 0.7, s: 1, o};
    case 'drop':
      return {x: 0, y: -(1 - p) * H * 0.9, s: 1, o: 1};
    case 'pop':
      return {x: 0, y: 0, s: 0.6 + 0.4 * p, o};
    default:
      return {x: 0, y: 0, s: 1, o: kind === 'fade' ? p : 1};
  }
};

// One cut-out layer: a PNG with alpha (or any children). Positions are fractions of the frame.
export const Cutout: React.FC<{
  src?: string;
  children?: React.ReactNode;
  x?: number;
  y?: number;
  h?: number; // height as a fraction of frame height
  w?: number; // or width as a fraction of frame width
  enter?: Move;
  at?: number; // frame the entrance starts
  dur?: number;
  exit?: Move;
  exitAt?: number; // frame the exit starts
  drift?: [number, number]; // px per second, for parallax (near layers drift more)
  spin?: number; // deg per second (vortex backdrops, clock hands)
  rotate?: number; // static tilt, deg
  shadow?: boolean; // paper-cutout drop shadow
  blend?: React.CSSProperties['mixBlendMode'];
  opacity?: number;
  filter?: string; // e.g. 'grayscale(1) contrast(1.2)' to unify mixed sources
}> = ({src, children, x = 0.5, y = 0.5, h, w, enter = 'fade', at = 0, dur = 14, exit, exitAt, drift = [0, 0], spin = 0, rotate = 0, shadow = true, blend, opacity = 1, filter}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const pin = enter === 'drop' || enter === 'pop'
    ? spring({frame: frame - at, fps, config: {damping: enter === 'drop' ? 14 : 18, stiffness: 120}, durationInFrames: dur + 6})
    : interpolate(frame, [at, at + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const a = motion(enter, pin, W, H);
  const pout = exit && exitAt !== undefined ? interpolate(frame, [exitAt, exitAt + dur], [1, 0], {...clamp, easing: Easing.in(Easing.cubic)}) : 1;
  const b = exit ? motion(exit, pout, W, H) : {x: 0, y: 0, s: 1, o: 1};
  const t = frame / fps;
  const size: React.CSSProperties = h ? {height: H * h} : w ? {width: W * w} : {height: H * 0.6};
  return (
    <div
      style={{
        position: 'absolute',
        left: x * W,
        top: y * H,
        transform: `translate(-50%, -50%) translate(${a.x + b.x + drift[0] * t}px, ${a.y + b.y + drift[1] * t}px) scale(${a.s * b.s}) rotate(${rotate + spin * t}deg)`,
        opacity: a.o * b.o * opacity,
        mixBlendMode: blend,
        filter: [shadow ? 'drop-shadow(6px 10px 10px rgba(0,0,0,0.55))' : '', filter ?? ''].join(' ').trim() || undefined,
      }}
    >
      {src ? <Img src={src} style={{...size, display: 'block'}} /> : <div style={size}>{children}</div>}
    </div>
  );
};

// One slow camera move over the whole Sequence (push-in by default). Wrap every collage shot.
export const Camera: React.FC<{from?: number; to?: number; pan?: [number, number]; tilt?: number; children: React.ReactNode}> = ({
  from = 1,
  to = 1.07,
  pan = [0, 0],
  tilt = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: dur, width: W, height: H} = useVideoConfig();
  const p = interpolate(frame, [0, dur], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${pan[0] * W * p}px, ${pan[1] * H * p}px) scale(${from + (to - from) * p}) rotate(${tilt * p}deg)`,
        overflow: 'hidden',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Deterministic atmosphere. Snow falls, dust floats, embers rise.
export const Particles: React.FC<{kind?: 'snow' | 'dust' | 'embers'; count?: number; seed?: string}> = ({kind = 'dust', count = 70, seed = 'p'}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const t = frame / fps;
  const cfg = {
    snow: {vy: 60, vx: 12, size: [2, 6], color: '#f4efe6', op: 0.8},
    dust: {vy: -6, vx: 8, size: [1, 3], color: '#f1dcb0', op: 0.45},
    embers: {vy: -70, vx: 10, size: [2, 4], color: '#ff9a3c', op: 0.85},
  }[kind];
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: count}, (_, i) => {
        const r = (k: string) => random(`${seed}${i}${k}`);
        const sz = cfg.size[0] + r('s') * (cfg.size[1] - cfg.size[0]);
        const speed = 0.5 + r('v');
        const x = (r('x') * W + t * cfg.vx * speed + Math.sin(t * (0.5 + r('w')) + i) * 14) % W;
        const y = (((r('y') * H + t * cfg.vy * speed) % H) + H) % H;
        const flicker = kind === 'embers' ? 0.5 + 0.5 * Math.sin(t * 6 + i) : 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: sz,
              height: sz,
              borderRadius: '50%',
              background: cfg.color,
              opacity: cfg.op * flicker * (0.4 + 0.6 * r('o')),
              boxShadow: kind === 'embers' ? `0 0 ${sz * 3}px ${cfg.color}` : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// A Flow/Veo loop shot on black (smoke, fire, ink in water, candle) laid over the scene in screen blend.
export const LoopOverlay: React.FC<{src: string; frames: number; opacity?: number; blend?: React.CSSProperties['mixBlendMode']}> = ({
  src,
  frames,
  opacity = 0.8,
  blend = 'screen',
}) => (
  <AbsoluteFill style={{mixBlendMode: blend, opacity}}>
    <Loop durationInFrames={frames}>
      <OffthreadVideo src={src} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </Loop>
  </AbsoluteFill>
);

// Long quotes read in full: a page that scrolls steadily so the last line lands ~1 s before the cut.
export const QuoteScroll: React.FC<{text: string; source?: string; paper?: string; ink?: string}> = ({
  text,
  source,
  paper = '#e9dfc9',
  ink = '#1a1512',
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: dur, height: H, width: W, fps} = useVideoConfig();
  const ref = React.useRef<HTMLDivElement>(null);
  const [textH, setTextH] = React.useState(H);
  React.useLayoutEffect(() => {
    if (ref.current) setTextH(ref.current.offsetHeight);
  }, [text]);
  const travel = Math.max(0, textH - H * 0.62);
  const y = interpolate(frame, [fps * 1.2, dur - fps * 1.2], [0, -travel], clamp);
  const fade = interpolate(frame, [0, 12], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, ${paper} 0%, #d6c8a8 100%)`, opacity: fade}}>
      <div style={{position: 'absolute', top: H * 0.19, left: (W - W * 0.56) / 2, width: W * 0.56, transform: `translateY(${y}px)`}}>
        <div ref={ref} style={{fontFamily: fonts.serif, fontSize: 52, lineHeight: 1.45, color: ink, textAlign: 'left', whiteSpace: 'pre-wrap'}}>
          {text}
          {source && (
            <div style={{fontFamily: fonts.sans, fontSize: 26, letterSpacing: '0.24em', textTransform: 'uppercase', color: colors.lacquer, marginTop: 36}}>
              — {source}
            </div>
          )}
        </div>
      </div>
      <AbsoluteFill style={{background: `linear-gradient(${paper} 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 82%, #d6c8a8 100%)`}} />
    </AbsoluteFill>
  );
};
