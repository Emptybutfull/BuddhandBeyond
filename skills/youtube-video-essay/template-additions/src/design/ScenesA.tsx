// Showcase scenes 1–4: title, emptiness, impermanence, Indra's Net.
import React from 'react';
import {AbsoluteFill, Img, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Grain, GrainGradient} from './GrainGradient';
import {GradientMap} from './Halftone';
import {Corner, Heavy, Micro, Rise, Stagger, Wide} from './Type';
import {clamp01, easeInOut, easeOut, hash, prng, simplex3} from './noise';
import {bone, fiveColours, fonts, ramps} from './tokens';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ───────────────────────── 1. Title ─────────────────────────
const FilmEdge: React.FC = () => {
  const {height} = useVideoConfig();
  const cols = ['#e3261c', '#f08a1c', '#16307a', '#12a5c9', '#3fbf6a'];
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 44, height, background: '#0b0a0c', opacity: 0.9}}>
      {Array.from({length: 34}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 8 + (hash(i * 3.1) > 0.6 ? 10 : 0), top: i * 32 + 6, width: 12 + hash(i) * 14, height: 14 + hash(i * 7) * 8, background: cols[Math.floor(hash(i * 5.3) * cols.length)], opacity: 0.55 + 0.4 * hash(i * 9)}} />
      ))}
    </div>
  );
};

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heat = interpolate(frame, [0, 45], [-0.35, 0], clamp);
  return (
    <GrainGradient ramp={ramps.thermal} kind="ribbon" focus={[0.52, 0.5]} seed={2} heat={heat} speed={1.6}>
      <FilmEdge />
      <Corner pos="tr" color="#34c3d9">{'001\nDESIGN STUDIES — NOV 2026'}</Corner>
      <div style={{position: 'absolute', right: 96, bottom: 92, textAlign: 'right'}}>
        <Wide size={148} color="#f25c1e">
          <Stagger text="EMPTY" by="letter" at={14} every={2} />
        </Wide>
        <Wide size={148} color="#f25c1e">
          <Stagger text="BUT FULL" by="letter" at={26} every={2} />
        </Wide>
        <Rise at={50}>
          <Wide size={50} color="#c7a23a" style={{marginTop: 18}}>
            A new ground every chapter
          </Wide>
        </Rise>
        <Rise at={62}>
          <Micro size={24} color={bone} style={{marginTop: 16}}>
            {'GRAINY GRADIENTS · GIANT TYPE · PRINT · LIGHT'}
          </Micro>
        </Rise>
      </div>
    </GrainGradient>
  );
};

// ───────────────────────── 2. Emptiness: 色 → dust → 空 ─────────────────────────
// Points sampled from a glyph, as fractions of a square box.
const useGlyph = (char: string, n: number, seed: number): Float32Array | null => {
  const [pts, setPts] = React.useState<Float32Array | null>(null);
  const [handle] = React.useState(() => delayRender(`glyph ${char}`));
  React.useEffect(() => {
    const S = 420;
    document.fonts.load(`800 300px "${fonts.kanji}"`, char).then(() => {
      const c = document.createElement('canvas');
      c.width = c.height = S;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, S, S);
      ctx.fillStyle = '#fff';
      ctx.font = `800 340px "${fonts.kanji}"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, S / 2, S / 2 + 12);
      const d = ctx.getImageData(0, 0, S, S).data;
      const inside: number[] = [];
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (d[(y * S + x) * 4] > 128) inside.push(x, y);
      const r = prng(seed);
      const out = new Float32Array(n * 2);
      for (let i = 0; i < n; i++) {
        const k = Math.floor(r() * (inside.length / 2));
        out[i * 2] = (inside[k * 2] + r()) / S;
        out[i * 2 + 1] = (inside[k * 2 + 1] + r()) / S;
      }
      setPts(out);
      continueRender(handle);
    });
  }, [char, n, seed, handle]);
  return pts;
};

export const EmptinessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const N = 9000;
  const a = useGlyph('色', N, 11);
  const b = useGlyph('空', N, 23);
  const ref = React.useRef<HTMLCanvasElement>(null);
  const stars = React.useMemo(() => {
    const r = prng(5);
    return Float32Array.from({length: N * 4}, () => r()); // x, y, size, phase
  }, []);

  React.useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx || !a || !b) return;
    ctx.clearRect(0, 0, W, H);
    const box = H * 0.74;
    const bx = W / 2 - box / 2;
    const by = H * 0.47 - box / 2;
    for (let i = 0; i < N; i++) {
      const ph = stars[i * 4 + 3];
      const sx = stars[i * 4] * W;
      const sy = stars[i * 4 + 1] * H;
      const ax = bx + a[i * 2] * box, ay = by + a[i * 2 + 1] * box;
      const tx = bx + b[i * 2] * box, ty = by + b[i * 2 + 1] * box;
      // timeline (frames): gather 色 · hold · scatter · drift · gather 空 · hold
      const g1 = easeOut((frame - ph * 14) / 30);
      const sc = easeInOut((frame - 78 - ph * 22) / 46);
      const g2 = easeInOut((frame - 148 - ph * 20) / 44);
      let x = sx + (ax - sx) * g1;
      let y = sy + (ay - sy) * g1;
      const drift = (frame / 30) * 6;
      const wx = sx + Math.sin(ph * 40 + frame * 0.01) * 10 + drift * (ph - 0.5);
      const wy = sy + Math.cos(ph * 31 + frame * 0.012) * 10;
      x += (wx - x) * sc;
      y += (wy - y) * sc;
      x += (tx - x) * g2;
      y += (ty - y) * g2;
      // swirl while travelling
      const travel = Math.sin(Math.PI * clamp01(sc)) * (1 - g2) + Math.sin(Math.PI * clamp01(g2));
      x += Math.cos(ph * 50) * travel * 26;
      y += Math.sin(ph * 50) * travel * 26;
      const scattered = sc * (1 - g2);
      const tw = 0.55 + 0.45 * Math.sin(frame * 0.2 + ph * 60);
      const size = (1.6 + stars[i * 4 + 2] * 2.6) * (1 - 0.35 * scattered);
      ctx.globalAlpha = (0.5 + 0.5 * tw) * (1 - 0.45 * scattered) * g1;
      ctx.fillStyle = i % 9 === 0 ? '#e9a23b' : bone;
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;
  }, [frame, a, b, stars, W, H]);

  return (
    <GrainGradient ramp={ramps.lapisFire} kind="aura" focus={[0.5, 0.47]} scale={1.15} gain={0.66} seed={4}>
      <canvas ref={ref} width={W} height={H} style={{position: 'absolute', inset: 0}} />
      <Corner pos="tl">{'002\nŚŪNYATĀ — EMPTINESS'}</Corner>
      <div style={{position: 'absolute', top: 64, right: 64, textAlign: 'right'}}>
        <div style={{fontFamily: fonts.kanji, fontWeight: 800, fontSize: 40, letterSpacing: '0.2em', color: bone}}>色即是空　空即是色</div>
        <Micro style={{marginTop: 8}}>THE HEART SUTRA</Micro>
      </div>
      <div style={{position: 'absolute', left: 64, bottom: 64}}>
        <Rise at={20}>
          <Heavy size={118}>
            Form is
            <br />
            emptiness.
          </Heavy>
        </Rise>
      </div>
      <div style={{position: 'absolute', right: 64, bottom: 64, textAlign: 'right'}}>
        <Rise at={168}>
          <Heavy size={118} color="#e9a23b">
            Emptiness
            <br />
            is form.
          </Heavy>
        </Rise>
      </div>
    </GrainGradient>
  );
};

// ───────────────────────── 3. Impermanence: the sand mandala ─────────────────────────
type Grain3 = {x: number; y: number; r: number; c: number; ph: number};
const buildMandala = (n: number): Grain3[] => {
  const rnd = prng(77);
  const out: Grain3[] = [];
  const [BLUE, WHITE, RED, GREEN, YELLOW] = [0, 1, 2, 3, 4];
  const rings = [0.13, 0.3, 0.5, 0.68, 0.82, 1.0];
  let guard = 0;
  while (out.length < n && guard++ < n * 30) {
    const r = Math.sqrt(rnd());
    const th = rnd() * Math.PI * 2;
    if (rings.some((e) => Math.abs(r - e) < 0.009)) continue; // clean lines between rings
    let c = WHITE;
    if (r < rings[0]) {
      c = Math.abs(Math.cos(th * 4)) > 0.55 ? YELLOW : RED;
    } else if (r < rings[1]) {
      const rb = rings[0] + (rings[1] - rings[0]) * Math.pow(Math.abs(Math.cos(th * 4)), 0.55);
      if (Math.abs(r - rb) < 0.008) continue;
      c = r < rb ? RED : YELLOW;
    } else if (r < rings[2]) {
      const rb = rings[1] + (rings[2] - rings[1]) * Math.pow(Math.abs(Math.cos(th * 8)), 0.6);
      if (Math.abs(r - rb) < 0.008) continue;
      c = r < rb ? BLUE : WHITE;
    } else if (r < rings[3]) {
      const rb = rings[2] + (rings[3] - rings[2]) * Math.pow(Math.abs(Math.sin(th * 8)), 0.7);
      if (Math.abs(r - rb) < 0.008) continue;
      c = r < rb ? GREEN : BLUE;
    } else if (r < rings[4]) {
      if (Math.cos(th * 32) < 0.2) continue; // ring of beads
      c = WHITE;
    } else {
      c = [RED, YELLOW, BLUE, GREEN, WHITE][Math.floor(((th / (Math.PI * 2)) * 40) % 5)];
      if (Math.abs(Math.sin(th * 20)) < 0.12) continue;
    }
    out.push({x: r * Math.cos(th), y: r * Math.sin(th), r, c, ph: rnd()});
  }
  return out;
};

export const ImpermanenceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const grains = React.useMemo(() => buildMandala(34000), []);
  const ref = React.useRef<HTMLCanvasElement>(null);
  const cx = W * 0.66, cy = H * 0.5, R = H * 0.42;

  React.useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const windStart = 92, windSpan = 54; // the front crosses the mandala in under 2 s
    for (const g of grains) {
      const born = g.r * 52 + g.ph * 8; // built ring by ring from the centre
      if (frame < born) continue;
      const onset = windStart + ((g.x + 1) / 2) * windSpan + g.ph * 10 - g.r * 6;
      const s = Math.max(0, (frame - onset) / fps);
      let x = cx + g.x * R, y = cy + g.y * R;
      let alpha = Math.min(1, (frame - born) / 5);
      let streak = 0;
      if (s > 0) {
        const gust = 0.6 + 0.9 * g.ph;
        x += 520 * Math.pow(s, 1.45) * gust + 40 * simplex3(g.x * 3, g.y * 3, s * 2) * s;
        y += -150 * Math.pow(s, 1.3) * (g.ph - 0.25) + 60 * simplex3(g.y * 3, g.x * 3, s * 2 + 5) * s;
        alpha *= Math.max(0, 1 - s / (1.2 + g.ph * 1.2));
        streak = Math.min(34, 26 * Math.pow(s, 0.45) * gust); // blown grains draw as short streaks
      }
      if (alpha <= 0.01) continue;
      ctx.globalAlpha = alpha * (0.75 + 0.25 * hash(g.ph * 991)) * (streak > 6 ? 0.7 : 1);
      ctx.fillStyle = fiveColours[g.c];
      const sz = 2.1 + g.ph * 1.5;
      ctx.fillRect(x - streak, y, sz + streak, sz);
    }
    ctx.globalAlpha = 1;
  }, [frame, grains, W, H, fps, cx, cy, R]);

  return (
    <GrainGradient ramp={ramps.ash} kind="flow" gain={0.42} seed={9} speed={0.6}>
      <canvas ref={ref} width={W} height={H} style={{position: 'absolute', inset: 0}} />
      <Corner pos="tl">{'003\nANICCA — IMPERMANENCE'}</Corner>
      <div style={{position: 'absolute', left: 70, top: 190, fontFamily: fonts.kanji, fontWeight: 800, fontSize: 150, lineHeight: 1.05, color: bone, opacity: 0.9, writingMode: 'vertical-rl'}}>
        <Rise at={10}>無常</Rise>
      </div>
      <div style={{position: 'absolute', left: 64, bottom: 64}}>
        <Wide size={132} color="#ff5a36">
          <Stagger text="NOTHING" by="letter" at={118} every={2} />
        </Wide>
        <Wide size={132} color="#ff5a36">
          <Stagger text="STAYS" by="letter" at={134} every={2} />
        </Wide>
      </div>
      <div style={{position: 'absolute', right: 64, bottom: 64, textAlign: 'right'}}>
        <Rise at={150}>
          <Micro>{'DAYS TO MAKE.\nSWEPT AWAY THE SAME AFTERNOON.'}</Micro>
        </Rise>
      </div>
    </GrainGradient>
  );
};

// ───────────────────────── 4. Indra's Net (Blender frames) ─────────────────────────
export const IndraScene: React.FC<{dir?: string; frames?: number}> = ({dir = 'indra', frames = 96}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: dur} = useVideoConfig();
  const f = Math.min(frames, Math.floor((frame / dur) * frames) + 1);
  const jewel = ['#06060c', '#101c52', '#2747c7', '#d98a2b', '#fff1cf'];
  return (
    <AbsoluteFill style={{background: '#06060c'}}>
      <GradientMap ramp={jewel} style={{position: 'absolute', inset: 0}}>
        <Img src={staticFile(`${dir}/${String(f).padStart(4, '0')}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </GradientMap>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 60% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)'}} />
      <Corner pos="tr">{"004\nINDRA'S NET — RAY-TRACED IN BLENDER"}</Corner>
      <div style={{position: 'absolute', left: 64, bottom: 64}}>
        <Heavy size={128}>
          <Stagger text="Every jewel" at={12} every={5} />
          <br />
          <Stagger text="holds every" at={26} every={5} />
          <br />
          <Stagger text="other." at={40} every={5} />
        </Heavy>
      </div>
      <Grain amount={0.4} />
    </AbsoluteFill>
  );
};
