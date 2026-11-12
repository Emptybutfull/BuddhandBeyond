// The house ground: a slow scalar field mapped through a colour ramp, with heavy film grain.
// (Steven's "Thermal Gradients" reference.) One per chapter, ramp from tokens.ts.
//
//   <GrainGradient ramp={ramps.thermal} kind="ribbon" />
//   <GrainGradient ramp={ramps.jadeAura} kind="aura" focus={[0.3, 0.5]} heat={0.1} />
//
// kinds: ribbon (the reference's flowing band) · aura (glow behind a subject) · flow (liquid field)
//        horizon (a band of light) · rings (tunnel of bands toward a bright point)
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp01, fbm3, hash, simplex3} from './noise';
import {Ramp, rampLut} from './tokens';

export type FieldKind = 'ribbon' | 'aura' | 'flow' | 'horizon' | 'rings';

type Props = {
  ramp: Ramp;
  kind?: FieldKind;
  speed?: number;
  seed?: number;
  focus?: [number, number]; // fractions of the frame
  scale?: number; // size of the main shape
  heat?: number; // shifts the whole field up the ramp (animate it: the mind heating up)
  gain?: number;
  grain?: number; // 0–1, heavy by default
  res?: number; // field is computed at 1/res size and scaled up
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const field = (kind: FieldKind, u: number, v: number, a: number, t: number, seed: number, fx: number, fy: number, sc: number): number => {
  if (kind === 'ribbon') {
    const cx = fx + 0.2 * Math.sin(v * 2.6 + t * 0.22 + seed) + 0.07 * simplex3(v * 1.4, t * 0.08, seed);
    const w = sc * (0.09 + 0.1 * v * v + 0.03 * Math.sin(v * 3.1 + t * 0.17 + seed * 2));
    const d = (u - cx) / w;
    return Math.exp(-d * d * 0.8) * (0.72 + 0.28 * Math.sin(v * 2.2 - t * 0.3)) + 0.07 * simplex3(u * 1.6, v * 1.6, t * 0.12 + seed);
  }
  if (kind === 'aura') {
    const dx = (u - fx) * a, dy = v - fy;
    const r = Math.sqrt(dx * dx + dy * dy);
    const ang = Math.atan2(dy, dx);
    const R = sc * (0.44 + 0.07 * simplex3(Math.cos(ang) * 0.9, Math.sin(ang) * 0.9, t * 0.15 + seed) + 0.025 * Math.sin(t * 1.05));
    const q = r / R;
    return Math.exp(-q * q * 1.6) + 0.05 * simplex3(u * 2, v * 2, t * 0.1 + seed);
  }
  if (kind === 'horizon') {
    const y0 = fy + 0.05 * simplex3(u * 1.2, t * 0.08, seed);
    const d = (v - y0) / (0.16 * sc);
    const glow = Math.exp(-d * d);
    const sun = Math.exp(-(((u - fx) * a) ** 2 + (v - y0) ** 2) / (0.05 * sc));
    return 0.62 * glow + 0.5 * sun + 0.05 * simplex3(u * 2.2, v * 2.2, t * 0.1 + seed);
  }
  if (kind === 'rings') {
    const dx = (u - fx) * a, dy = v - fy;
    const r = Math.sqrt(dx * dx + dy * dy) + 0.004;
    const wob = 0.06 * simplex3(Math.atan2(dy, dx) * 1.3, r * 2, t * 0.2 + seed);
    const band = 0.5 + 0.5 * Math.cos(6.283 * (Math.log(r) * 1.25 * sc - t * 0.28 + wob));
    const core = Math.exp(-r * r * 60);
    return clamp01(band * (0.25 + 0.75 * Math.exp(-r * 1.1)) * 0.9 + core);
  }
  // flow
  const wx = fbm3(u * 1.1 * sc + seed, v * 1.1 * sc, t * 0.06, 2);
  const wy = fbm3(u * 1.1 * sc, v * 1.1 * sc + seed + 9.1, t * 0.06, 2);
  const n = fbm3(u * 1.4 * sc + wx * 1.2, v * 1.4 * sc + wy * 1.2, t * 0.09 + seed, 3);
  return 0.5 + 0.62 * n;
};

export const GrainGradient: React.FC<Props> = ({
  ramp,
  kind = 'ribbon',
  speed = 1,
  seed = 1,
  focus = [0.62, 0.5],
  scale = 1,
  heat = 0,
  gain = 1,
  grain = 0.45,
  res = 4,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const ref = React.useRef<HTMLCanvasElement>(null);
  const w = Math.round(width / res);
  const h = Math.round(height / res);
  const lut = React.useMemo(() => rampLut(ramp), [ramp]);

  React.useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(w, h);
    const d = img.data;
    const t = (frame / fps) * speed;
    const a = width / height;
    let p = 0;
    for (let y = 0; y < h; y++) {
      const v = y / h;
      for (let x = 0; x < w; x++) {
        const f = field(kind, x / w, v, a, t, seed, focus[0], focus[1], scale) * gain + heat;
        // a little dither so 8-bit bands never show as steps
        const i = Math.max(0, Math.min(255, Math.round(f * 255 + (hash(x * 13.1 + y * 71.7 + frame) - 0.5) * 5))) * 3;
        d[p++] = lut[i];
        d[p++] = lut[i + 1];
        d[p++] = lut[i + 2];
        d[p++] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [frame, fps, w, h, width, height, kind, speed, seed, focus, scale, heat, gain, lut]);

  return (
    <AbsoluteFill style={{background: ramp[0], overflow: 'hidden', ...style}}>
      <canvas ref={ref} width={w} height={h} style={{position: 'absolute', width: '100%', height: '100%', filter: `blur(${res * 0.6}px)`, transform: 'scale(1.02)'}} />
      {children}
      {grain > 0 && <Grain amount={grain} />}
    </AbsoluteFill>
  );
};

// Heavy film grain from one cached noise tile, re-seated every frame. Put it LAST in a scene so the
// same grain covers ground, art, type and camera footage alike.
let tileUrl: string | null = null;
const makeTile = (): string => {
  if (tileUrl) return tileUrl;
  const n = 384;
  const c = document.createElement('canvas');
  c.width = c.height = n;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(n, n);
  for (let i = 0; i < n * n; i++) {
    // roughly gaussian around mid-grey
    const g = 128 + (hash(i * 1.37) + hash(i * 2.91 + 7) + hash(i * 0.73 + 3) - 1.5) * 150;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = g;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  tileUrl = c.toDataURL('image/png');
  return tileUrl;
};

export const Grain: React.FC<{amount?: number; size?: number; blend?: React.CSSProperties['mixBlendMode']}> = ({amount = 0.45, size = 384, blend = 'overlay'}) => {
  const frame = useCurrentFrame();
  const url = React.useMemo(makeTile, []);
  const ox = Math.floor(hash(frame * 3.3) * size);
  const oy = Math.floor(hash(frame * 7.7 + 1) * size);
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `${ox}px ${oy}px`,
        mixBlendMode: blend,
        opacity: amount,
        pointerEvents: 'none',
      }}
    />
  );
};
