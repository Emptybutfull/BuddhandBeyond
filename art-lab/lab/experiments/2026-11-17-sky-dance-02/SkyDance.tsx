// Sky Dance, second pass: the figure is now the design kit's Buddha (seated in S04, DancingBuddha in
// S01 and S05), with a halo; S01 and S04 move.
//
// Needs in public/skydance/ (from blender/sky_dance.py):
//   S01_bg.png, S04_bg.png (--no-clouds), S04_peaks.png (--no-clouds --objects-only), S05.png,
//   cloud_big_{1,2,3,5,7}.png and cloud_small_{1,2,3,5,7}.png (--shot cloud)
// Register:
//   <Composition id="SkyDanceS01" component={SkyDanceS01} durationInFrames={168} fps={24} width={1920} height={1080} />
//   <Composition id="SkyDanceS04" component={SkyDanceS04} durationInFrames={144} fps={24} width={1920} height={1080} />
//   <Composition id="SkyDanceS05" component={SkyDanceS05} durationInFrames={24} fps={24} width={1920} height={1080} />
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Grain} from '../design/GrainGradient';
import {Buddha, DANCES, Dance, DancingBuddha, LOOKS, Look, danceHand, mixDance} from '../design/awakening/Buddha';

const FPS = 24;
const ACCENT = '#ffb347', LINE = '#1c2550', HALO = '#ffffff';
const look = (scale: number): Look => ({...LOOKS.dawn, skin: '#f2d9bd', skinSh: '#b79bb8', skinHi: '#ffffff', robe: ACCENT, robeSh: '#e07f2a', robe2: ACCENT, trim: '#f6f3e7', hair: LINE, hairHi: '#2b3f78', line: LINE, lw: 2.5 / scale, sh: 20, rim: 0, ush: 1, curl: 0.5, ear: 1, urna: 1, urnaCol: '#f6f3e7', lotus: 0});

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], {...clamp, easing: e});
const twos = (frame: number) => Math.floor(frame / 2) * 2; // drawn things move every second frame

const Bg: React.FC<{file: string}> = ({file}) => <Img src={staticFile(`skydance/${file}`)} style={{position: 'absolute', width: 1920, height: 1080}} />;
const Layer: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', overflow: 'visible'}}>
    <defs>
      <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
    </defs>
    {children}
  </svg>
);

// A cloud sprite. x, y = centre; w = width on screen. Sprites are 2:1.
const Cloud: React.FC<{file: string; x: number; y: number; w: number}> = ({file, x, y, w}) => (
  <Img src={staticFile(`skydance/${file}`)} style={{position: 'absolute', left: x - w / 2, top: y - w / 4, width: w, height: w / 2}} />
);
type Drift = {file: string; x: number; y: number; w: number; v: number};
// clouds drifting sideways, wrapping round; stepped on twos
const Clouds: React.FC<{list: Drift[]; frame: number}> = ({list, frame}) => {
  const t = twos(frame) / FPS;
  return (
    <>
      {list.map((c, i) => {
        const span = 1920 + c.w;
        const x = ((((c.x + c.v * t + c.w / 2) % span) + span) % span) - c.w / 2;
        return <Cloud key={i} file={c.file} x={x} y={c.y} w={c.w} />;
      })}
    </>
  );
};

// The line of light. `draw` 0..1 draws it from its start; the glow is the one soft thing in the frame.
const LightLine: React.FC<{d: string; width?: number; draw?: number; fill?: boolean}> = ({d, width = 6, draw = 1, fill}) => {
  if (draw <= 0) return null;
  const dash = fill ? {} : {pathLength: 1, strokeDasharray: `${Math.min(1, draw)} 1`};
  return (
    <g>
      <path d={d} fill={fill ? ACCENT : 'none'} stroke={ACCENT} strokeWidth={fill ? 8 : width * 2.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} filter="url(#sd-glow)" {...dash} />
      <path d={d} fill={fill ? ACCENT : 'none'} stroke={ACCENT} strokeWidth={fill ? 0 : width} strokeLinecap="round" strokeLinejoin="round" {...dash} />
    </g>
  );
};

// ---------- S01: he rises out of the cloud deck and begins to dance ----------
const s01Dance = (t: number): Dance => {
  const a = mixDance(DANCES.float, DANCES.rise, ease(t, 2.8, 3.5));
  const b = mixDance(a, DANCES.turn, ease(t, 4.4, 5.2));
  const d = mixDance(b, DANCES.ocean, ease(t, 5.9, 6.6));
  // even in a held pose the hands keep moving a little, so the line keeps being drawn
  const w = 2 * Math.PI * 0.45 * t;
  return {...d, armL: [d.armL[0] + 5 * Math.sin(w), d.armL[1] + 10 * Math.sin(w + 1)], armR: [d.armR[0] + 4 * Math.sin(w + 2), d.armR[1] + 8 * Math.sin(w + 3)]};
};
const S01_SCALE = 0.3;
const s01At = (t: number): [number, number] => [1050 - 30 * ease(t, 1.2, 6.5), interpolate(t, [1.2, 3.0], [1040, 440], {...clamp, easing: Easing.out(Easing.cubic)}) + 7 * Math.sin((t * Math.PI * 2) / 3.2)];
const s01Hand = (t: number): [number, number] => {
  const at = s01At(t), h = danceHand(s01Dance(t), 'L');
  return [at[0] + h[0] * S01_SCALE, at[1] + h[1] * S01_SCALE];
};

export const SkyDanceS01: React.FC = () => {
  const frame = useCurrentFrame();
  const t = twos(frame) / FPS;
  const at = s01At(t);
  // the line of light: everywhere his hand has been in the last four and a half seconds. It stays where
  // it was drawn, sinks a little, thins and fades, like ink in the air.
  const LIFE = 4.5;
  const trail: {p: [number, number]; age: number}[] = [];
  for (let k = 0; k <= (LIFE * FPS) / 2; k++) {
    const tk = t - (k * 2) / FPS;
    if (tk < 2.9) break;
    const age = (t - tk) / LIFE, h = s01Hand(tk);
    trail.push({p: [h[0] - 10 * age, h[1] + 70 * age * age], age});
  }
  const half = (a: [number, number], b: [number, number]) => `${((a[0] + b[0]) / 2).toFixed(1)} ${((a[1] + b[1]) / 2).toFixed(1)}`;
  const segs = trail.length > 2 ? trail.slice(1, -1).map((q, i) => ({d: `M ${half(trail[i].p, q.p)} Q ${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)} ${half(q.p, trail[i + 2].p)}`, age: q.age})) : [];
  const far: Drift[] = [
    {file: 'cloud_small_3.png', x: 300, y: 560, w: 520, v: 9},
    {file: 'cloud_small_5.png', x: 1120, y: 600, w: 440, v: 7},
    {file: 'cloud_small_1.png', x: 1620, y: 540, w: 560, v: 10},
  ];
  const mid: Drift[] = [
    {file: 'cloud_small_2.png', x: 520, y: 720, w: 900, v: 18},
    {file: 'cloud_small_7.png', x: 1480, y: 760, w: 980, v: 21},
  ];
  const near: Drift[] = [
    {file: 'cloud_big_1.png', x: 260, y: 1010, w: 1500, v: 34},
    {file: 'cloud_big_2.png', x: 1420, y: 1040, w: 1700, v: 40},
  ];
  return (
    <AbsoluteFill style={{background: '#c4e2ee'}}>
      <Bg file="S01_bg.png" />
      <Clouds list={far} frame={frame} />
      <Clouds list={mid} frame={frame} />
      <Layer>
        {segs.map((g, i) => <path key={'g' + i} d={g.d} fill="none" stroke={ACCENT} strokeWidth={(7.5 - 5.5 * g.age) * 2.6} strokeLinecap="round" opacity={0.42 * (1 - g.age)} filter="url(#sd-glow)" />)}
        {segs.map((g, i) => <path key={i} d={g.d} fill="none" stroke={ACCENT} strokeWidth={7.5 - 5.5 * g.age} strokeLinecap="round" opacity={1 - g.age * g.age} />)}
        {t >= 1.1 && <g transform={`translate(${at[0].toFixed(1)} ${at[1].toFixed(1)}) scale(${S01_SCALE})`}><DancingBuddha look={look(S01_SCALE)} dance={s01Dance(t)} halo={HALO} /></g>}
      </Layer>
      <Clouds list={near} frame={frame} />
      <Grain amount={0.08} />
    </AbsoluteFill>
  );
};

// ---------- S04: still as the mountain ----------
export const SkyDanceS04: React.FC = () => {
  const frame = useCurrentFrame();
  const tSmooth = frame / FPS, t = twos(frame) / FPS;
  const s = 0.5;
  // he glides in and comes to rest; after that he does not move at all
  const k = interpolate(t, [0, 1.3], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const at: [number, number] = [520 - 190 * (1 - k), 600 - 120 * (1 - k)];
  const cx = 1075, cy = 400, rx = 470, ry = 96;
  const front = ease(tSmooth, 1.7, 3.2), back = ease(tSmooth, 3.1, 4.4);
  const high: Drift[] = [{file: 'cloud_small_3.png', x: 420, y: 250, w: 420, v: 70}];
  const mid: Drift[] = [
    {file: 'cloud_small_1.png', x: 100, y: 800, w: 760, v: 210},
    {file: 'cloud_small_5.png', x: 1150, y: 760, w: 640, v: 180},
    {file: 'cloud_small_7.png', x: 1900, y: 830, w: 820, v: 240},
  ];
  const near: Drift[] = [
    {file: 'cloud_big_2.png', x: 200, y: 1040, w: 1500, v: 460},
    {file: 'cloud_big_3.png', x: 1300, y: 1070, w: 1700, v: 520},
    {file: 'cloud_big_5.png', x: 2500, y: 1050, w: 1400, v: 430},
  ];
  return (
    <AbsoluteFill style={{background: '#c4e2ee'}}>
      <Bg file="S04_bg.png" />
      <Clouds list={high} frame={frame} />
      {/* the far side of the ring, behind the peak; it is drawn second */}
      <Layer><LightLine d={`M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx - rx} ${cy}`} draw={back} /></Layer>
      <Bg file="S04_peaks.png" />
      <Clouds list={mid} frame={frame} />
      <Layer>
        <LightLine d={`M ${at[0] + 150} ${at[1] - 60} C ${at[0] + 190} ${at[1] - 150} ${cx - rx - 20} ${cy + 90} ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`} draw={front} />
        <g transform={`translate(${at[0].toFixed(1)} ${at[1].toFixed(1)})`}>
          <circle cx={0} cy={-300 * s} r={176 * s} fill={HALO} stroke={LINE} strokeWidth={2.5} />
          <g transform={`scale(${s})`}><Buddha look={look(s)} pose={{mudra: 'dhyana', eye: 0}} seat={false} /></g>
        </g>
      </Layer>
      <Clouds list={near} frame={frame} />
      <Grain amount={0.08} />
    </AbsoluteFill>
  );
};

// ---------- S05: vast as the ocean (still for now) ----------
export const SkyDanceS05: React.FC = () => {
  const s = 0.3;
  const at: [number, number] = [640, 420];
  const horizon = 508; // where the sea meets the sky in S05.png
  const h = danceHand(DANCES.ocean, 'R');
  const hx = at[0] + h[0] * s, hy = at[1] + h[1] * s;
  const wx = 520, wy = 800; // where the line meets the water
  const vx = 1330; // and where it reaches the horizon
  return (
    <AbsoluteFill>
      <Bg file="S05.png" />
      <Layer>
        {/* the line drops from his hand to the sea and runs out to the horizon, narrowing with distance */}
        <LightLine fill d={`M ${wx - 20} ${wy + 4} L ${wx + 22} ${wy - 6} L ${vx + 1.5} ${horizon} L ${vx - 1.5} ${horizon} Z`} />
        <LightLine d={`M ${hx} ${hy} C ${hx - 150} ${hy + 40} ${wx - 190} ${wy - 170} ${wx - 60} ${wy - 30} Q ${wx - 20} ${wy + 6} ${wx + 30} ${wy - 6}`} width={5} />
        {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={at[0] + (i % 2 ? 22 : -16)} cy={840 + i * 42} rx={84 - i * 14} ry={8 - i} fill={ACCENT} opacity={0.85 - i * 0.14} />)}
        <g transform={`translate(${at[0]} ${at[1]}) scale(${s})`}><DancingBuddha look={look(s)} dance={DANCES.ocean} halo={HALO} /></g>
      </Layer>
      <Grain amount={0.08} />
    </AbsoluteFill>
  );
};
