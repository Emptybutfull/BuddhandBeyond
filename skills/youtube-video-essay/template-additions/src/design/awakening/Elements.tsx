// Flat-colour scene pieces for the Awakening film. Every piece is a pure function of time, drawn in
// SVG. "World" coordinates are the 1080×1920 frame; "local" coordinates are the figure's own
// (heart at 0,0 — see Buddha.tsx).
import React from 'react';
import {clamp01, easeOut, hash, prng} from '../noise';
import {fonts} from '../tokens';
import {Buddha, Look, Pose, Silhouette} from './Buddha';

const n = (v: number) => v.toFixed(1);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const TAU = Math.PI * 2;

// ---------- small shapes ----------
export const Sparkle: React.FC<{x: number; y: number; r: number; fill: string; opacity?: number; rot?: number}> = ({x, y, r, fill, opacity = 1, rot = 0}) => (
  <path transform={`translate(${n(x)} ${n(y)}) rotate(${n(rot)})`} d={`M 0 ${-r} Q 0 0 ${r} 0 Q 0 0 0 ${r} Q 0 0 ${-r} 0 Q 0 0 0 ${-r} Z`} fill={fill} opacity={opacity} />
);

// Alternating flat wedges around a point: the poster sunburst.
export const Rays: React.FC<{count?: number; r0?: number; r1?: number; rot?: number; fill: string; opacity?: number; duty?: number}> = ({count = 24, r0 = 0, r1 = 2400, rot = 0, fill, opacity = 1, duty = 0.5}) => {
  const d = Array.from({length: count}, (_, i) => {
    const a0 = (i / count) * TAU + rot, a1 = a0 + (TAU / count) * duty;
    return `M ${n(Math.cos(a0) * r0)} ${n(Math.sin(a0) * r0)} L ${n(Math.cos(a0) * r1)} ${n(Math.sin(a0) * r1)} L ${n(Math.cos(a1) * r1)} ${n(Math.sin(a1) * r1)} L ${n(Math.cos(a1) * r0)} ${n(Math.sin(a1) * r0)} Z`;
  }).join(' ');
  return <path d={d} fill={fill} opacity={opacity} />;
};

// Anime speed lines converging on a point (impact frames).
export const SpeedLines: React.FC<{seed?: number; fill: string; r0?: number; count?: number}> = ({seed = 1, fill, r0 = 220, count = 56}) => {
  const d = React.useMemo(() => {
    const r = prng(seed);
    return Array.from({length: count}, () => {
      const a = r() * TAU, w = 0.012 + r() * 0.045, inner = r0 * (0.55 + r() * 1.5);
      return `M ${n(Math.cos(a) * inner)} ${n(Math.sin(a) * inner)} L ${n(Math.cos(a - w) * 2600)} ${n(Math.sin(a - w) * 2600)} L ${n(Math.cos(a + w) * 2600)} ${n(Math.sin(a + w) * 2600)} Z`;
    }).join(' ');
  }, [seed, r0, count]);
  return <path d={d} fill={fill} />;
};

// ---------- the place: night sky, moon, bodhi tree, earth ----------
export const Stars: React.FC<{frame: number; color: string; show?: number; maxY?: number}> = ({frame, color, show = 1, maxY = 1200}) => {
  const stars = React.useMemo(() => {
    const r = prng(11);
    return Array.from({length: 90}, (_, i) => ({x: r() * 1080, y: r() * maxY, s: 1.6 + r() * 3.2, big: i % 9 === 0, o: r()}));
  }, [maxY]);
  return (
    <g>
      {stars.map((s, i) => {
        if (s.o > show) return null;
        const tw = 0.35 + 0.65 * hash(i * 7.13 + Math.floor(frame / 6));
        return s.big ? <Sparkle key={i} x={s.x} y={s.y} r={s.s * 4.2} fill={color} opacity={tw} /> : <circle key={i} cx={s.x} cy={s.y} r={s.s} fill={color} opacity={tw} />;
      })}
    </g>
  );
};

export const Moon: React.FC<{x: number; y: number; r?: number; fill: string; shade: string}> = ({x, y, r = 84, fill, shade}) => (
  <g transform={`translate(${n(x)} ${n(y)})`}>
    <circle r={r * 2.05} fill={fill} opacity={0.05} />
    <circle r={r * 1.5} fill={fill} opacity={0.08} />
    <circle r={r} fill={fill} />
    <circle cx={r * 0.28} cy={-r * 0.2} r={r * 0.2} fill={shade} />
    <circle cx={-r * 0.3} cy={r * 0.34} r={r * 0.13} fill={shade} />
    <circle cx={r * 0.1} cy={r * 0.5} r={r * 0.08} fill={shade} />
  </g>
);

const LEAF = 'M 0 0 C 30 -8 46 20 34 44 C 25 62 7 70 0 104 C -7 70 -25 62 -34 44 C -46 20 -30 -8 0 0 Z';
export const BodhiTree: React.FC<{frame: number; c: [string, string, string, string]; grow?: number}> = ({frame, c, grow = 1}) => {
  const {blobs, leaves} = React.useMemo(() => {
    const r = prng(5);
    const blobs = Array.from({length: 26}, (_, i) => ({x: -120 + ((i % 13) / 12) * 1320 + (r() - 0.5) * 90, y: i < 13 ? 150 + r() * 120 : 330 + r() * 170, r: 120 + r() * 100, hi: r() > 0.45}));
    const leaves = Array.from({length: 30}, (_, i) => ({x: 20 + ((i + r() * 0.8) / 30) * 1040, y: 380 + r() * 250, s: 0.55 + r() * 0.5, ph: r() * 6, k: r() > 0.5 ? 2 : 3}));
    return {blobs, leaves};
  }, []);
  const f3 = Math.floor(frame / 3);
  return (
    <g transform={`translate(540 1430) scale(${n(grow)}) translate(-540 -1430)`}>
      <path d="M 430 1440 C 474 1120 440 800 372 500 L 708 500 C 640 800 606 1120 650 1440 Z" fill={c[0]} />
      <path d="M 470 1440 C 500 1120 470 800 420 500 L 500 500 C 530 800 540 1120 520 1440 Z" fill={c[1]} opacity={0.7} />
      <rect x={-500} y={-900} width={2080} height={1120} fill={c[1]} />
      {blobs.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={c[1]} />)}
      {blobs.map((b, i) => (b.hi ? <circle key={'h' + i} cx={b.x - b.r * 0.2} cy={b.y - b.r * 0.22} r={b.r * 0.62} fill={c[2]} /> : null))}
      {leaves.map((l, i) => (
        <path key={'l' + i} d={LEAF} fill={c[l.k]} transform={`translate(${n(l.x)} ${n(l.y)}) rotate(${n(7 * Math.sin(f3 * 0.21 + l.ph))}) scale(${n(l.s)})`} />
      ))}
    </g>
  );
};

export const Earth: React.FC<{c: [string, string, string]; y?: number}> = ({c, y = 1400}) => (
  <g>
    <path d={`M -400 ${y - 40} C 100 ${y - 130} 500 ${y - 60} 760 ${y - 96} C 1000 ${y - 126} 1300 ${y - 70} 1500 ${y - 40} L 1500 2600 L -400 2600 Z`} fill={c[0]} />
    <path d={`M -400 ${y + 22} C 200 ${y - 34} 880 ${y - 34} 1500 ${y + 22} L 1500 2600 L -400 2600 Z`} fill={c[1]} />
    <path d={`M -400 ${y + 22} C 200 ${y - 34} 880 ${y - 34} 1500 ${y + 22}`} fill="none" stroke={c[2]} strokeWidth={5} />
  </g>
);

// ---------- Mara ----------
// The ellipse of calm around the figure, in world coordinates.
export const calm = (t: number, frame: number, touch: number): {rx: number; ry: number; cx: number; cy: number} => {
  const j = (hash(Math.floor(frame / 3) * 1.7) - 0.5) * 16;
  const close = easeOut(seg(t, 14, 15.3));
  const squeeze = seg(t, 15.3, touch);
  const burst = t >= touch ? easeOut(seg(t, touch + 0.1, touch + 1.0)) : 0;
  const rx = lerp(1500, 478, close) - squeeze * 26 + j + burst * 2400;
  const ry = lerp(1900, 600, close) - squeeze * 30 + j + burst * 2800;
  return {rx, ry, cx: 540, cy: 1036};
};

const perimeter = (u: number): [number, number] => {
  // u in 0..1 around the frame, clockwise from the top-left corner
  const P = 2 * (1080 + 1920), d = u * P;
  if (d < 1080) return [d, 0];
  if (d < 3000) return [1080, d - 1080];
  if (d < 4080) return [1080 - (d - 3000), 1920];
  return [0, 1920 - (d - 4080)];
};

export const MaraField: React.FC<{t: number; frame: number; touch: number; red: string; dark: string; ink: string; bone: string; petalA: string; petalB: string}> = ({t, frame, touch, red, dark, ink, bone, petalA, petalB}) => {
  const id = React.useId().replace(/:/g, '');
  const c = calm(t, frame, touch);
  const f3 = Math.floor(frame / 3);
  const grow = easeOut(seg(t, 14, 14.9)) * (1 - easeOut(seg(t, touch + 0.1, touch + 0.55)));
  const edgeR = (ang: number, rx = 478, ry = 600) => (rx * ry) / Math.hypot(ry * Math.cos(ang), rx * Math.sin(ang));
  const spikes = (layer: number, count: number, reachK: number, fill: string) =>
    Array.from({length: count}, (_, i) => {
      const u = (i + 0.5 * layer + 0.35 * hash(i * 3.7 + layer)) / count;
      const [px, py] = perimeter(u % 1);
      const ang = Math.atan2(py - c.cy, px - c.cx);
      const dist = Math.hypot(px - c.cx, py - c.cy);
      const room = Math.max(40, dist - edgeR(ang));
      const len = room * reachK * (0.62 + 0.4 * hash(i * 5.1 + layer * 9 + f3 * 0.77)) * grow;
      const w = 70 + 120 * hash(i * 2.3 + layer);
      const nx = -Math.sin(ang), ny = Math.cos(ang);
      const tx = px - Math.cos(ang) * len, ty = py - Math.sin(ang) * len;
      const ox = px + Math.cos(ang) * 80, oy = py + Math.sin(ang) * 80;
      return `M ${n(ox + nx * w)} ${n(oy + ny * w)} L ${n(tx)} ${n(ty)} L ${n(ox - nx * w)} ${n(oy - ny * w)} Z`;
    }).join(' ');

  const arrows = React.useMemo(() => {
    const r = prng(31);
    return Array.from({length: 13}, (_, i) => ({ang: -Math.PI * 0.5 + (i % 2 ? 1 : -1) * (0.25 + r() * 2.3), at: 14.7 + i * 0.3 + r() * 0.12, sw: r() * 6, k: r()}));
  }, []);

  const after = t - touch - 0.1;
  return (
    <g>
      <clipPath id={id}>
        <path clipRule="evenodd" d={`M -2000 -2000 H 4000 V 5000 H -2000 Z M ${n(c.cx - c.rx)} ${n(c.cy)} a ${n(c.rx)} ${n(c.ry)} 0 1 0 ${n(2 * c.rx)} 0 a ${n(c.rx)} ${n(c.ry)} 0 1 0 ${n(-2 * c.rx)} 0 Z`} />
      </clipPath>
      {after < 1 && (
        <g clipPath={`url(#${id})`}>
          <rect x={-2000} y={-2000} width={6000} height={7000} fill={red} />
          <path d={spikes(1, 30, 1.0, dark)} fill={dark} />
          <path d={spikes(0, 24, 0.86, ink)} fill={ink} />
        </g>
      )}
      {/* the edge of the calm */}
      {after < 1 && <ellipse cx={c.cx} cy={c.cy} rx={Math.max(0, c.rx)} ry={Math.max(0, c.ry)} fill="none" stroke={ink} strokeWidth={10} />}
      {/* arrows stop at the edge; at the touch they become petals and fall */}
      {arrows.map((a, i) => {
        if (t < a.at) return null;
        const stuck = edgeR(a.ang) + 14;
        const fly = seg(t, a.at, a.at + 0.3);
        const rr = lerp(1700, stuck, fly * fly);
        const x = c.cx + Math.cos(a.ang) * rr, y = c.cy + Math.sin(a.ang) * rr;
        const deg = (a.ang * 180) / Math.PI;
        if (after < 0) {
          const quiver = fly >= 1 ? 3.5 * Math.sin(f3 * 1.9 + i) * Math.max(0, 1 - (t - a.at - 0.3) * 1.2) : 0;
          const hit = seg(t, a.at + 0.3, a.at + 0.55);
          return (
            <g key={i}>
              <g transform={`translate(${n(x)} ${n(y)}) rotate(${n(deg + 180 + quiver)})`}>
                <path d="M 0 0 L -44 -17 L -34 -5 L -230 -5 L -262 -22 L -246 0 L -262 22 L -230 5 L -34 5 L -44 17 Z" fill={ink} />
              </g>
              {fly >= 1 && hit < 1 && <circle cx={x} cy={y} r={10 + hit * 70} fill="none" stroke={bone} strokeWidth={8 * (1 - hit)} />}
            </g>
          );
        }
        const fall = Math.max(0, after);
        const px = x + 46 * Math.sin(fall * 2.2 + a.sw) + Math.cos(a.ang) * 60 * easeOut(fall), py = y + 150 * Math.pow(fall, 1.45) + Math.sin(a.ang) * 60 * easeOut(fall);
        return (
          <g key={i} transform={`translate(${n(px)} ${n(py)}) rotate(${n(deg + fall * (90 + a.k * 120))}) scale(${n(0.9 + a.k * 0.5)})`} opacity={1 - seg(fall, 2.6, 3.7)}>
            <path d="M 0 -30 C 24 -22 26 14 0 34 C -26 14 -24 -22 0 -30 Z" fill={petalA} />
            <path d="M 0 -30 C 24 -22 26 14 0 34 Z" fill={petalB} />
          </g>
        );
      })}
    </g>
  );
};

// ---------- first watch: a tunnel of his own shape, every life flowing back into him ----------
export const lifePhase = (tau: number) => 0.35 * tau + 0.02 * tau * tau;
export const Tunnel: React.FC<{tau: number; colors: string[]; line: string; look: Look; pose?: Pose; count?: number; ratio?: number; out?: boolean}> = ({tau, colors, line, look, pose, count = 13, ratio = 1.4, out = false}) => {
  const ph = lifePhase(Math.max(0, tau));
  const whole = Math.floor(ph), fr = ph - whole;
  return (
    <g>
      {Array.from({length: count}, (_, k) => {
        const j = count - 1 - k;
        const s = Math.pow(ratio, out ? j + fr : j - fr) * (out ? 1 : 1.04);
        const idx = out ? j - whole : j + whole;
        return (
          <g key={idx} transform={`translate(0 -70) scale(${s.toFixed(4)}) translate(0 70)`} opacity={out && j === count - 1 ? 1 - fr : 1}>
            <Silhouette look={look} pose={pose} seat={false} fill={colors[((idx % colors.length) + colors.length) % colors.length]} stroke={line} strokeWidth={5 / s} />
          </g>
        );
      })}
    </g>
  );
};

// ---------- second watch: the divine eye, beings falling and rising ----------
export const DivineEye: React.FC<{open: number; t: number; c: {white: string; iris: string[]; pupil: string; line: string; lash: string}; cy?: number; W?: number}> = ({open, t, c, cy = -300, W = 505}) => {
  const id = React.useId().replace(/:/g, '');
  const H = 250 * open;
  const almond = `M ${-W} 0 Q 0 ${n(-2 * H)} ${W} 0 Q 0 ${n(2 * H)} ${-W} 0 Z`;
  return (
    <g transform={`translate(0 ${cy})`}>
      {open > 0.2 && <Rays count={22} r0={H * 1.05 + 30} r1={H * 1.05 + 30 + 130 * open} rot={-Math.PI + 0.03} fill={c.lash} duty={0.34} />}
      <clipPath id={id}><path d={almond} /></clipPath>
      <path d={almond} fill={c.line} stroke={c.line} strokeWidth={24} strokeLinejoin="round" />
      <g clipPath={`url(#${id})`}>
        <rect x={-W} y={-400} width={2 * W} height={800} fill={c.white} />
        <path d={almond} transform="translate(0 36)" fill="none" stroke={c.iris[1]} strokeWidth={26} opacity={0.5} />
        {c.iris.map((col, i) => <circle key={i} r={236 - i * 40} fill={col} />)}
        <g transform={`rotate(${n(t * 7)})`}><Rays count={40} r0={150} r1={228} fill={c.pupil} opacity={0.35} duty={0.28} /></g>
        <circle r={132} fill={c.pupil} />
        <circle cx={-170} cy={-120} r={30} fill={c.white} />
      </g>
    </g>
  );
};

export const Beings: React.FC<{t: number; show: number; rise: string; fall: string; count?: number}> = ({t, show, rise, fall, count = 64}) => {
  const dots = React.useMemo(() => {
    const r = prng(77);
    return Array.from({length: count}, () => ({a: r() * TAU, w: 0.2 + r() * 0.22, dr: (r() - 0.5) * 110, s: 9 + r() * 11, o: r()}));
  }, [count]);
  return (
    <g>
      {dots.map((d, i) => {
        if (d.o > show) return null;
        return [0, 1, 2, 3].map((k) => {
          const a = d.a + d.w * (t - k * 0.13);
          const x = Math.cos(a) * (458 + d.dr * 0.5), y = -50 + Math.sin(a) * (700 + d.dr);
          const rising = Math.cos(a) < 0;
          return <circle key={`${i}-${k}`} cx={x} cy={y} r={d.s * (1 - k * 0.22)} fill={rising ? rise : fall} opacity={k === 0 ? 1 : 0.5 - k * 0.1} />;
        });
      })}
    </g>
  );
};

// ---------- third watch: the twelve links ----------
export const LINKS = ['AVIJJĀ', 'SAṄKHĀRĀ', 'VIÑÑĀṆA', 'NĀMARŪPA', 'SAḶĀYATANA', 'PHASSA', 'VEDANĀ', 'TAṆHĀ', 'UPĀDĀNA', 'BHAVA', 'JĀTI', 'JARĀMARAṆA'];
export const wheelSpin = (tau: number) => 0.2 * tau + 0.045 * tau * tau; // radians
export const chainStep = (tau: number) => 1.0 * tau + 0.22 * tau * tau; // which link is firing
export const Wheel12: React.FC<{rot: number; active: number; out?: number; broken?: number; c: {ring: string; node: string; on: string; text: string; dim: string}; R?: number; cy?: number}> = ({rot, active, out = 0, broken = 0, c, R = 408, cy = -24}) => {
  const id = React.useId().replace(/:/g, '');
  const gap = broken > 0 ? 10 : 0;
  const arc = (r: number, a0: number, a1: number) => {
    const p = (a: number) => `${n(Math.cos((a * Math.PI) / 180) * r)} ${n(Math.sin((a * Math.PI) / 180) * r)}`;
    return `M ${p(a0)} A ${r} ${r} 0 1 1 ${p(a1)}`;
  };
  return (
    <g transform={`translate(0 ${cy}) rotate(${n((rot * 180) / Math.PI)})`}>
      <path id={id} d={`M 0 ${-(R + 30)} A ${R + 30} ${R + 30} 0 1 1 -0.1 ${-(R + 30)}`} fill="none" />
      <path d={arc(R, -90 + gap, 270 - gap - 0.01)} fill="none" stroke={c.ring} strokeWidth={11} />
      <circle r={R - 50} fill="none" stroke={c.ring} strokeWidth={3} opacity={0.6} />
      {LINKS.map((name, i) => {
        const a = ((-90 + i * 30) * Math.PI) / 180;
        const x = Math.cos(a) * R, y = Math.sin(a) * R;
        const isOut = i < out;
        const on = !isOut && active >= 0 && i === active % 12;
        const split = i === 0 ? broken : 0;
        return (
          <g key={i}>
            <path d={`M ${n(Math.cos(a) * (R - 50))} ${n(Math.sin(a) * (R - 50))} L ${n(Math.cos(a) * (R - 26))} ${n(Math.sin(a) * (R - 26))}`} stroke={c.ring} strokeWidth={3} opacity={0.6} />
            {split > 0 ? (
              <g transform={`translate(${n(x)} ${n(y)})`}>
                <path d="M 0 -27 A 27 27 0 0 0 0 27 Z" fill={c.on} transform={`translate(${n(-9 * split)} ${n(7 * split)}) rotate(${n(-16 * split)})`} />
                <path d="M 0 -27 A 27 27 0 0 1 0 27 Z" fill={c.on} transform={`translate(${n(9 * split)} ${n(-4 * split)}) rotate(${n(13 * split)})`} />
              </g>
            ) : (
              <circle cx={x} cy={y} r={on ? 34 : 25} fill={isOut ? 'none' : on ? c.on : c.node} stroke={isOut ? c.dim : c.ring} strokeWidth={isOut ? 4 : 6} />
            )}
            <text fontFamily={fonts.mono} fontWeight={500} fontSize={21} letterSpacing={3} fill={isOut ? c.dim : on ? c.on : c.text} textAnchor="middle">
              <textPath href={`#${id}`} startOffset={`${((i / 12) * 100).toFixed(3)}%`}>{i === 0 ? '' : name}</textPath>
            </text>
          </g>
        );
      })}
      {/* the first link sits at the seam of the label path, so it gets its own centred label */}
      <text y={-(R + 30)} fontFamily={fonts.mono} fontWeight={500} fontSize={21} letterSpacing={3} fill={out > 0 || broken > 0 ? c.on : c.text} textAnchor="middle">{LINKS[0]}</text>
    </g>
  );
};

export const Flames: React.FC<{frame: number; heat: number; c: [string, string, string]; base?: number}> = ({frame, heat, c, base = 1960}) => {
  const f2 = Math.floor(frame / 2);
  const flame = (x: number, w: number, hgt: number, wob: number) =>
    `M ${n(x - w)} ${base} C ${n(x - w * 1.1)} ${n(base - hgt * 0.45)} ${n(x - w * 0.1 + wob)} ${n(base - hgt * 0.6)} ${n(x + wob * 1.6)} ${n(base - hgt)} C ${n(x + w * 0.5 + wob * 0.4)} ${n(base - hgt * 0.62)} ${n(x + w * 1.1)} ${n(base - hgt * 0.4)} ${n(x + w)} ${base} Z`;
  return (
    <g>
      {[0, 1, 2].map((layer) =>
        Array.from({length: 9}, (_, i) => {
          const x = -40 + ((i + 0.5 * (layer % 2)) / 8) * 1160;
          const edge = Math.abs(x - 540) / 540; // taller at the sides, lower behind the figure
          const hgt = (260 + 900 * heat * (0.45 + 0.75 * edge)) * (1 - layer * 0.26) * (0.72 + 0.4 * hash(i * 3.1 + layer * 7 + f2 * 0.37));
          const wob = 46 * Math.sin(f2 * 0.5 + i * 1.7 + layer);
          return <path key={`${layer}-${i}`} d={flame(x, 104 - layer * 22, hgt, wob)} fill={c[layer]} />;
        }),
      )}
    </g>
  );
};

// ---------- light ----------
// Flat bands of colour following the outline of the body: the cel-shaded aura.
export const AuraBands: React.FC<{colors: string[]; widths: number[]; look: Look; pose?: Pose; opacity?: number}> = ({colors, widths, look, pose, opacity = 1}) => (
  <g opacity={opacity}>
    {widths
      .map((w, i) => ({w, col: colors[i % colors.length]}))
      .sort((a, b) => b.w - a.w)
      .map((b, i) => <Silhouette key={i} look={look} pose={pose} fill={b.col} strokeWidth={b.w} />)}
  </g>
);

export const Emanation: React.FC<{x: number; y: number; scale: number; pop: number; look: Look; pose: Pose; disc: string; ring: string}> = ({x, y, scale, pop, look, pose, disc, ring}) => {
  if (pop <= 0) return null;
  const s = scale * (pop < 1 ? 1 + 0.28 * Math.sin(pop * Math.PI) : 1) * Math.min(1, pop * 2.2);
  return (
    <g transform={`translate(${n(x)} ${n(y)}) scale(${s.toFixed(4)})`}>
      <circle cy={-40} r={560} fill={ring} />
      <circle cy={-40} r={520} fill={disc} />
      <Buddha look={look} pose={pose} />
    </g>
  );
};

// Brush circle that draws itself.
export const EnsoStroke: React.FC<{r: number; draw: number; color: string; width?: number}> = ({r, draw, color, width = 26}) => {
  const len = TAU * r;
  return <circle r={r} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={`${n(len * 0.94 * clamp01(draw))} ${n(len)}`} transform="rotate(-80)" />;
};
