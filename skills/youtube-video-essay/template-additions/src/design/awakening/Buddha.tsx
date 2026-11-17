// A cel-shaded seated Buddha drawn entirely in SVG: flat fills, hard-edged shadow shapes, bold ink
// outlines. Everything is a parameter, so one figure can morph from "a man under a tree" to a body
// of light by blending two Looks:
//
//   <svg viewBox="0 0 1080 1920"><g transform="translate(540 1060)">
//     <Buddha look={mixLook(LOOKS.man, LOOKS.gold, 0.4)} pose={{reach: 0, eye: 0}} />
//   </g></svg>
//
// Local units: heart at (0,0), top of head about -470, seat about +440, knees at ±392.
// "Right" always means the figure's own right (the viewer's left, negative x).
//
// How the cel shading works: every body part is filled with its shadow colour, then the same shape
// is drawn again in the base colour, shifted toward the light and clipped to the part. What is left
// is a hard crescent of shadow on the far side. `sh` is the shift (0 = flat colour), `rim` adds a
// thin back-light on the shadow edge. Outlines are drawn *behind* fills at double width, so only
// the outer edge of overlapping shapes gets a line.
import React from 'react';

export type Look = {
  skin: string;
  skinSh: string;
  skinHi: string;
  robe: string;
  robeSh: string;
  robe2: string; // lower robe (legs)
  trim: string;
  hair: string;
  hairHi: string;
  line: string;
  lw: number; // outline weight
  sh: number; // shadow depth in px (0 = flat)
  rim: number; // back-light width in px
  eyeWhite: string;
  iris: string;
  ush: number; // 0 = small topknot, 1 = full ushnisha
  curl: number; // 0 = smooth hair, 1 = snail-shell curls
  ear: number; // 0 = ordinary ears, 1 = long lobes
  urna: number; // dot between the brows
  urnaCol: string;
  seat: string;
  seatSh: string;
  lotus: number; // 0 = grass mat, 1 = lotus in full bloom
  lotusA: string;
  lotusB: string;
};

export type Mudra = 'dhyana' | 'earth' | 'give' | 'fearless' | 'teach';
export type Pose = {
  reach?: number; // 0 = hands in the lap, 1 = right hand touching the earth
  eye?: number; // 0 closed … 1 wide open (0.45 is the classic half-open gaze)
  mudra?: Mudra; // fixed hand gesture; overrides reach
  breath?: number; // -1…1, lifts the chest a little
};

const man: Look = {
  skin: '#b9774b', skinSh: '#7a4532', skinHi: '#e0a877',
  robe: '#b98b3d', robeSh: '#7c5a27', robe2: '#a67a33', trim: '#8a6427',
  hair: '#17141d', hairHi: '#3b3552',
  line: '#0d0d0d', lw: 7, sh: 30, rim: 0,
  eyeWhite: '#efe6d2', iris: '#17141d',
  ush: 0.42, curl: 0, ear: 0.12, urna: 0, urnaCol: '#f8d77a',
  seat: '#2f5140', seatSh: '#1b3328', lotus: 0, lotusA: '#d9567c', lotusB: '#f3a8b8',
};

export const LOOKS = {
  man,
  // first watch: the body turns to gold, the marks begin to show
  gold: {...man, skin: '#e3a23f', skinSh: '#a85c2a', skinHi: '#f6c98a', robe: '#c9521f', robeSh: '#8b2d1d', robe2: '#b6431d', trim: '#e9a23b', hair: '#1a1d52', hairHi: '#3a47a0', sh: 26, rim: 5, ush: 0.8, curl: 0.7, ear: 0.7, seat: '#3b1247', seatSh: '#250a2e', lotus: 0.25} as Look,
  // second watch: jade back-light, the urna opens
  jade: {...man, skin: '#f0b93e', skinSh: '#b56f27', skinHi: '#a8e3c3', robe: '#c0261d', robeSh: '#7b1622', robe2: '#a81f1c', trim: '#f2e6b1', hair: '#15245e', hairHi: '#2f6f9a', sh: 22, rim: 9, ush: 1, curl: 1, ear: 1, urna: 0.8, urnaCol: '#f2e6b1', seat: '#0f4a45', seatSh: '#0a302d', lotus: 0.45, lotusA: '#22a58c', lotusB: '#a8e3c3'} as Look,
  // third watch: lit from below by the fire of craving
  fire: {...man, skin: '#f6c453', skinSh: '#d2601c', skinHi: '#fff0b0', robe: '#d5311c', robeSh: '#8a1418', robe2: '#bd2a1b', trim: '#f8d77a', hair: '#1a1438', hairHi: '#7a2a50', sh: 34, rim: 10, ush: 1, curl: 1, ear: 1, urna: 1, urnaCol: '#fff0b0', seat: '#7a1d14', seatSh: '#4a0f0f', lotus: 0.55, lotusA: '#f08a1c', lotusB: '#f8d77a'} as Look,
  // the moment it stops: two inks on bone paper
  paper: {...man, skin: '#e9e2d2', skinSh: '#b9c2dc', skinHi: '#ffffff', robe: '#e2512a', robeSh: '#b53b1c', robe2: '#d94a26', trim: '#e9e2d2', hair: '#2440b3', hairHi: '#4d68d6', line: '#2440b3', lw: 6, sh: 18, rim: 0, eyeWhite: '#ffffff', iris: '#2440b3', ush: 1, curl: 1, ear: 1, urna: 1, urnaCol: '#e2512a', seat: '#2440b3', seatSh: '#1a2f86', lotus: 0.6, lotusA: '#e9e2d2', lotusB: '#cfd6ea'} as Look,
  // before sunrise: cool shadows
  predawn: {...man, skin: '#d9b27a', skinSh: '#5b56a6', skinHi: '#f8d77a', robe: '#a8382c', robeSh: '#4a2a6e', robe2: '#93302a', trim: '#c9a25a', hair: '#141a4a', hairHi: '#3a47a0', line: '#0a0c1c', sh: 30, rim: 4, ush: 1, curl: 1, ear: 1, urna: 1, urnaCol: '#f8d77a', seat: '#2a2a7c', seatSh: '#1a1a52', lotus: 0.65, lotusA: '#8a4fb0', lotusB: '#c9a0dc'} as Look,
  // the Buddha at dawn
  dawn: {...man, skin: '#f7cf6b', skinSh: '#dc8f3a', skinHi: '#fff6cf', robe: '#e0481f', robeSh: '#a6281c', robe2: '#cf3f1d', trim: '#f8d77a', hair: '#1b2a7a', hairHi: '#4a63c9', line: '#2a1408', lw: 6.5, sh: 22, rim: 8, ush: 1, curl: 1, ear: 1, urna: 1, urnaCol: '#ffffff', seat: '#f6c98a', seatSh: '#e39a5a', lotus: 1, lotusA: '#ef5f84', lotusB: '#fbc0c8'} as Look,
  // body of light
  light: {...man, skin: '#fff6dc', skinSh: '#f6dc98', skinHi: '#ffffff', robe: '#fbe5a8', robeSh: '#efc463', robe2: '#f7da92', trim: '#ffffff', hair: '#2747c7', hairHi: '#6f8cf0', line: '#b9771e', lw: 5, sh: 14, rim: 0, eyeWhite: '#ffffff', iris: '#2747c7', ush: 1, curl: 1, ear: 1, urna: 1, urnaCol: '#ffffff', seat: '#ffffff', seatSh: '#f1ece0', lotus: 1, lotusA: '#fbe5a8', lotusB: '#ffffff'} as Look,
};

// One of the five family colours as a body colour (for emanations).
export const bodyLook = (skin: string, skinSh: string, robe = '#e0481f', robeSh = '#a6281c'): Look => ({
  ...LOOKS.dawn, skin, skinSh, skinHi: '#ffffff', robe, robeSh, robe2: robe, hair: '#141a4a', hairHi: '#3a47a0', line: '#0d0d0d', lw: 9, sh: 26, rim: 0, lotusA: '#f1ece0', lotusB: '#ffffff', seat: '#f1ece0', seatSh: '#d9d2c5',
});

const h2 = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mixHex = (a: string, b: string, t: number): string => {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const A = h2(a), B = h2(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
export const mixLook = (a: Look, b: Look, t: number): Look => {
  const o: Record<string, string | number> = {};
  for (const k of Object.keys(a) as (keyof Look)[]) {
    const va = a[k], vb = b[k];
    o[k] = typeof va === 'number' ? va + ((vb as number) - va) * t : mixHex(va as string, vb as string, t);
  }
  return o as unknown as Look;
};

// ---------- geometry ----------
const n = (v: number) => v.toFixed(1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type V = [number, number];
const lerpV = (a: V, b: V, t: number): V => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

// Rounded limb between two points with a radius at each end.
const capsule = (p: V, r1: number, q: V, r2: number): string => {
  const dx = q[0] - p[0], dy = q[1] - p[1];
  const d = Math.max(1e-3, Math.hypot(dx, dy));
  const th = Math.atan2(dy, dx);
  const al = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
  const pt = (c: V, r: number, a: number) => `${n(c[0] + r * Math.cos(a))} ${n(c[1] + r * Math.sin(a))}`;
  const big2 = 2 * al > Math.PI ? 1 : 0;
  return `M ${pt(p, r1, th + al)} L ${pt(q, r2, th + al)} A ${n(r2)} ${n(r2)} 0 ${big2} 0 ${pt(q, r2, th - al)} L ${pt(p, r1, th - al)} A ${n(r1)} ${n(r1)} 0 ${1 - big2} 0 ${pt(p, r1, th + al)} Z`;
};
const circle = (c: V, r: number) => `M ${n(c[0] - r)} ${n(c[1])} a ${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0 a ${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0 Z`;
const ellipse = (c: V, rx: number, ry: number) => `M ${n(c[0] - rx)} ${n(c[1])} a ${n(rx)} ${n(ry)} 0 1 0 ${n(2 * rx)} 0 a ${n(rx)} ${n(ry)} 0 1 0 ${n(-2 * rx)} 0 Z`;

const FACE = 'M 0 -414 C 60 -414 95 -372 93 -318 C 91 -262 50 -186 0 -186 C -50 -186 -91 -262 -93 -318 C -95 -372 -60 -414 0 -414 Z';
const HAIR = 'M -97 -296 C -110 -374 -72 -434 0 -434 C 72 -434 110 -374 97 -296 C 93 -330 80 -356 50 -365 C 30 -370 12 -367 0 -359 C -12 -367 -30 -370 -50 -365 C -80 -356 -93 -330 -97 -296 Z';
const NECK = 'M -41 -222 L -46 -150 C -22 -136 22 -136 46 -150 L 41 -222 Z';
const TORSO = 'M -46 -160 C -100 -152 -160 -142 -178 -108 L -152 0 C -136 60 -120 104 -114 168 L 114 168 C 120 104 136 60 152 0 L 178 -108 C 160 -142 100 -152 46 -160 Z';
const LEGS = 'M -128 146 C -224 148 -352 188 -392 250 C -412 288 -380 320 -330 324 C -200 336 200 336 330 324 C 380 320 412 288 392 250 C 352 188 224 148 128 146 Z';
// where the upper robe sits on the torso (clipped to the torso): over the left shoulder, under the right arm
const ROBE_ON_TORSO = 'M 58 -190 C 24 -110 -80 -8 -210 44 L -210 220 L 260 220 L 260 -190 Z';
const ROBE_EDGE = 'M 58 -190 C 24 -110 -80 -8 -210 44';

const ears = (ear: number): string[] => {
  const yl = -262 + 62 * ear;
  const one = (s: number) =>
    `M ${84 * s} -338 C ${112 * s} -348 ${122 * s} -312 ${112 * s} -288 C ${109 * s} -274 ${111 * s} ${n(yl - 16)} ${101 * s} ${n(yl)} C ${93 * s} ${n(yl + 7)} ${85 * s} ${n(yl - 10)} ${85 * s} ${n(yl - 34)} Z`;
  return [one(-1), one(1)];
};

// the bump on the crown: a small tied topknot that grows into the ushnisha
const crown = (ush: number): {c: V; rx: number; ry: number} => ({c: [0, lerp(-436, -444, ush)], rx: lerp(24, 50, ush), ry: lerp(22, 40, ush)});

const curls = (curl: number, ush: number): string[] => {
  if (curl <= 0.02) return [];
  const out: string[] = [];
  const r = 15 * curl;
  // along the skull
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI * (1.0 + i / 12); // left temple → over the top → right temple
    out.push(circle([Math.cos(a) * 99, -326 + Math.sin(a) * 105], r));
  }
  const cr = crown(ush);
  for (let i = 0; i <= 6; i++) {
    const a = Math.PI * (1.08 + (i / 6) * 0.84);
    out.push(circle([cr.c[0] + Math.cos(a) * cr.rx, cr.c[1] + Math.sin(a) * cr.ry], r * 0.8));
  }
  return out;
};

type Arm = {S: V; E: V; W: V; ang: number};
const D2R = Math.PI / 180;
const RIGHT: Record<Mudra, Arm> = {
  dhyana: {S: [-184, -100], E: [-226, 76], W: [-66, 170], ang: 3},
  earth: {S: [-184, -100], E: [-246, 56], W: [-292, 214], ang: 93},
  give: {S: [-184, -100], E: [-246, 56], W: [-286, 208], ang: 96},
  fearless: {S: [-184, -100], E: [-222, 70], W: [-150, -30], ang: -88},
  teach: {S: [-184, -100], E: [-216, 60], W: [-70, -6], ang: -80},
};
const LEFT: Record<'lap' | 'teach', Arm> = {
  lap: {S: [184, -100], E: [226, 76], W: [66, 182], ang: 180},
  teach: {S: [184, -100], E: [216, 60], W: [66, 14], ang: -100},
};

const hand = (a: Arm, len = 84): {d: string[]; tip: V; dir: V; perp: V} => {
  const dir: V = [Math.cos(a.ang * D2R), Math.sin(a.ang * D2R)];
  const tip: V = [a.W[0] + dir[0] * len, a.W[1] + dir[1] * len];
  // "up" when the hand lies in the lap
  const right = a.S[0] < 0;
  const pa = (a.ang + (right ? -90 : 90)) * D2R;
  const perp: V = [Math.cos(pa), Math.sin(pa)];
  const t0: V = [a.W[0] + dir[0] * 26 + perp[0] * 12, a.W[1] + dir[1] * 26 + perp[1] * 12];
  const t1: V = [a.W[0] + dir[0] * 64 + perp[0] * 27, a.W[1] + dir[1] * 64 + perp[1] * 27];
  return {d: [capsule(a.W, 27, tip, 17), capsule(t0, 11, t1, 8.5)], tip, dir, perp};
};

const petal = (x: number, base: number, w: number, hgt: number): string =>
  `M ${n(x - w / 2)} ${n(base)} C ${n(x - w / 2)} ${n(base - hgt * 0.62)} ${n(x - w * 0.14)} ${n(base - hgt * 0.94)} ${n(x)} ${n(base - hgt)} C ${n(x + w * 0.14)} ${n(base - hgt * 0.94)} ${n(x + w / 2)} ${n(base - hgt * 0.62)} ${n(x + w / 2)} ${n(base)} Z`;

export const rig = (pose: Pose, look: Pick<Look, 'ush' | 'curl' | 'ear' | 'lotus'>) => {
  const reach = pose.reach ?? 0;
  const r0 = RIGHT.dhyana, r1 = RIGHT.earth;
  const rArm: Arm = pose.mudra
    ? RIGHT[pose.mudra]
    : {S: r0.S, E: lerpV(r0.E, r1.E, reach), W: [lerp(r0.W[0], r1.W[0], reach), lerp(r0.W[1], r1.W[1], reach) - 46 * Math.sin(Math.PI * reach)], ang: lerp(r0.ang, r1.ang, reach)};
  const lArm = pose.mudra === 'teach' ? LEFT.teach : LEFT.lap;
  const rHand = hand(rArm, pose.mudra === 'fearless' || pose.mudra === 'teach' ? 78 : 86);
  const lHand = hand(lArm);
  const cr = crown(look.ush);
  return {
    rArm, lArm, rHand, lHand, cr,
    ears: ears(look.ear),
    curls: curls(look.curl, look.ush),
    rArmD: [capsule(rArm.S, 45, rArm.E, 39), capsule(rArm.E, 39, rArm.W, 29)],
    lArmD: [capsule(lArm.S, 49, lArm.E, 43), capsule(lArm.E, 43, lArm.W, 33)],
  };
};

// Everything that makes up the outline of the figure, as flat shapes (no shading, no face).
// Stroke it wide for aura bands, fill it for silhouettes, or use it as a mask.
export const Silhouette: React.FC<{pose?: Pose; look?: Pick<Look, 'ush' | 'curl' | 'ear' | 'lotus'>; fill?: string; stroke?: string; strokeWidth?: number; seat?: boolean; opacity?: number}> = ({
  pose = {},
  look = LOOKS.dawn,
  fill = '#000',
  stroke,
  strokeWidth = 0,
  seat = true,
  opacity,
}) => {
  const g = rig(pose, look);
  return (
    <g fill={fill} stroke={stroke ?? fill} strokeWidth={strokeWidth} strokeLinejoin="round" opacity={opacity}>
      {seat && <path d={ellipse([0, 338], 420, 30)} />}
      {seat && look.lotus > 0.05 && <path d={`M -${n(380 + 40 * look.lotus)} 340 L -${n(330 + 30 * look.lotus)} ${n(340 + 100 * look.lotus)} L ${n(330 + 30 * look.lotus)} ${n(340 + 100 * look.lotus)} L ${n(380 + 40 * look.lotus)} 340 Z`} />}
      {g.ears.map((d, i) => <path key={i} d={d} />)}
      <path d={NECK} />
      <path d={TORSO} />
      <path d={LEGS} />
      {[...g.lArmD, ...g.lHand.d, ...g.rArmD, ...g.rHand.d].map((d, i) => <path key={'a' + i} d={d} />)}
      <path d={FACE} />
      <path d={HAIR} />
      <path d={ellipse(g.cr.c, g.cr.rx, g.cr.ry)} />
      {g.curls.map((d, i) => <path key={'c' + i} d={d} />)}
    </g>
  );
};

// ---------- the cel-shaded part ----------
const LIGHT: V = [-0.72, -0.7]; // the light comes from the upper left

const Cel: React.FC<{d: string | string[]; base: string; shade: string; hi: string; look: Look; depth?: number; noLine?: boolean; children?: React.ReactNode}> = ({d, base, shade, hi, look, depth = 1, noLine, children}) => {
  const id = React.useId().replace(/:/g, '');
  const ds = Array.isArray(d) ? d : [d];
  const sh = look.sh * depth;
  const rim = Math.min(look.rim, sh * 0.6);
  const paths = (fill: string, tr?: string) => ds.map((p, i) => <path key={i} d={p} fill={fill} transform={tr} />);
  return (
    <g>
      {!noLine && ds.map((p, i) => <path key={'o' + i} d={p} fill={look.line} stroke={look.line} strokeWidth={look.lw * 2} strokeLinejoin="round" />)}
      <clipPath id={id}>{ds.map((p, i) => <path key={i} d={p} />)}</clipPath>
      <g clipPath={`url(#${id})`}>
        {sh < 0.5 ? (
          paths(base)
        ) : (
          <>
            {paths(rim > 0.5 ? hi : shade)}
            {rim > 0.5 && paths(shade, `translate(${n(LIGHT[0] * rim)} ${n(LIGHT[1] * rim)})`)}
            {paths(base, `translate(${n(LIGHT[0] * sh)} ${n(LIGHT[1] * sh)})`)}
          </>
        )}
        {children}
      </g>
    </g>
  );
};

type Rig = ReturnType<typeof rig>;

// Ears, neck and torso with the robe over the left shoulder. Shared by the seated and the dancing body.
const Trunk: React.FC<{L: Look; g: Rig; id: string}> = ({L, g, id}) => (
  <>
    {/* ears, neck */}
    <Cel d={g.ears} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.4}>
      {[-1, 1].map((s) => <path key={s} d={`M ${101 * s} ${n(-300)} L ${100 * s} ${n(-262 + 62 * L.ear - 14)}`} stroke={L.skinSh} strokeWidth={5} fill="none" />)}
    </Cel>
    <Cel d={NECK} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.5}>
      {/* the chin's shadow on the neck: the signature cel-shade shape */}
      {L.sh > 1 && <path d={FACE} transform="translate(6 30)" fill={L.skinSh} />}
    </Cel>

    {/* torso: skin, then the robe over the left shoulder */}
    <clipPath id={id + '_t'}><path d={TORSO} /></clipPath>
    <Cel d={TORSO} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L}>
      {/* chest line and shadow under the chest */}
      {L.sh > 1 && <path d="M -150 -6 C -100 30 -30 34 10 6 L 30 60 L -140 60 Z" fill={L.skinSh} opacity={0.55} />}
    </Cel>
    <g clipPath={`url(#${id}_t)`}>
      <path d={ROBE_ON_TORSO} fill={L.robeSh} />
      <path d={ROBE_ON_TORSO} fill={L.robe} transform={`translate(${n(LIGHT[0] * L.sh * 1.4)} ${n(LIGHT[1] * L.sh * 0.5)})`} />
      {/* folds fall from the left shoulder */}
      <path d="M 150 -120 C 120 -40 40 50 -80 96 L -60 110 C 60 66 136 -20 168 -100 Z" fill={L.robeSh} />
      <path d="M 172 -40 C 150 30 90 96 -20 140 L 0 152 C 106 112 164 50 186 -20 Z" fill={L.robeSh} />
      <path d={ROBE_EDGE} stroke={L.line} strokeWidth={22 + L.lw} fill="none" />
      <path d={ROBE_EDGE} stroke={L.trim} strokeWidth={22 - L.lw} fill="none" />
    </g>
  </>
);

// Face, hair, crown and features.
const Head: React.FC<{L: Look; g: Rig; id: string; eye: number; br: number; thin: number}> = ({L, g, id, eye, br, thin}) => {
  const eyeShape = (s: number, open: number) => {
    const y = -298 + br * 0.3;
    const x0 = 17 * s, x1 = 66 * s, c0 = 30 * s, c1 = 54 * s;
    const low = y + 11;
    const up = low - open * 36;
    return {upper: `M ${x1} ${n(y)} C ${c1} ${n(up)} ${c0} ${n(up)} ${x0} ${n(y + 2)}`, lower: `M ${x1} ${n(y)} C ${c1} ${n(low)} ${c0} ${n(low)} ${x0} ${n(y + 2)}`, full: `M ${x1} ${n(y)} C ${c1} ${n(up)} ${c0} ${n(up)} ${x0} ${n(y + 2)} C ${c0} ${n(low)} ${c1} ${n(low)} ${x1} ${n(y)} Z`, cy: y + 2};
  };
  return (
    <>
      <Cel d={FACE} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.75}>
        {/* hair shadow on the forehead, nose shadow, lip shadow */}
        {L.sh > 1 && <path d={HAIR} transform="translate(5 13)" fill={L.skinSh} />}
        {L.sh > 1 && <path d="M 3 -322 C 9 -298 18 -278 15 -264 C 9 -259 3 -259 0 -262 Z" fill={L.skinSh} />}
        {L.sh > 1 && <path d="M -14 -221 C -5 -214 5 -214 14 -221 C 6 -224 -6 -224 -14 -221 Z" fill={L.skinSh} />}
      </Cel>
      {/* crown bump, hair cap, curls */}
      <Cel d={[ellipse(g.cr.c, g.cr.rx, g.cr.ry), HAIR, ...g.curls]} base={L.hair} shade={mixHex(L.hair, '#000000', 0.45)} hi={L.hairHi} look={L} depth={0.5}>
        <path d="M -70 -392 C -40 -420 10 -426 40 -416 C 6 -412 -36 -400 -62 -376 Z" fill={L.hairHi} opacity={0.9} />
      </Cel>
      {/* brows */}
      {[-1, 1].map((s) => <path key={s} d={`M ${74 * s} -322 C ${58 * s} -344 ${30 * s} -344 ${13 * s} -328`} stroke={L.hair} strokeWidth={L.lw * 0.9} fill="none" />)}
      {/* eyes */}
      {[-1, 1].map((s) => {
        const e = eyeShape(s, eye);
        return (
          <g key={s}>
            {eye > 0.04 && (
              <>
                <clipPath id={`${id}_e${s}`}><path d={e.full} /></clipPath>
                <path d={e.full} fill={L.eyeWhite} />
                <g clipPath={`url(#${id}_e${s})`}>
                  <circle cx={41 * s} cy={e.cy - 2 - eye * 3} r={15} fill={L.iris} />
                  <circle cx={41 * s - 5} cy={e.cy - 8 - eye * 3} r={4.2} fill="#ffffff" />
                </g>
                <path d={e.lower} stroke={L.line} strokeWidth={thin} fill="none" />
              </>
            )}
            <path d={e.upper} stroke={L.line} strokeWidth={L.lw * 0.95} fill="none" />
          </g>
        );
      })}
      {/* nose, mouth */}
      <path d="M -10 -266 C -5 -258 5 -258 10 -266" stroke={L.line} strokeWidth={thin} fill="none" />
      <path d="M -24 -234 C -10 -226 10 -226 24 -234" stroke={L.line} strokeWidth={thin * 1.15} fill="none" />
      {/* urna */}
      {L.urna > 0.02 && <circle cx={0} cy={-340} r={7.5 * L.urna} fill={L.urnaCol} stroke={L.line} strokeWidth={thin * 0.8} />}
    </>
  );
};

export const Buddha: React.FC<{look: Look; pose?: Pose; seat?: boolean}> = ({look: L, pose = {}, seat = true}) => {
  const id = React.useId().replace(/:/g, '');
  const g = rig(pose, L);
  const eye = Math.max(0, Math.min(1, pose.eye ?? 0));
  const br = (pose.breath ?? 0) * 3;
  const thin = Math.max(2.5, L.lw * 0.5);
  const lot = L.lotus;

  // seat: a grass mat that becomes a lotus
  const petals = (rows: number, count: number, base: number, hgt: number, w: number, spread: number) =>
    Array.from({length: count}, (_, i) => {
      const u = count === 1 ? 0 : (i / (count - 1)) * 2 - 1;
      const x = u * spread;
      return <g key={`${rows}-${i}`} transform={`rotate(${n(u * 34 * lot)} ${n(x)} ${n(base)})`}>{/* petals lean outward as it opens */}
        <Cel d={petal(x, base, w, hgt * (1 - 0.18 * Math.abs(u)))} base={rows ? L.lotusB : L.lotusA} shade={rows ? L.lotusA : L.seatSh} hi={L.skinHi} look={L} depth={0.6} />
      </g>;
    });

  return (
    <g strokeLinecap="round">
      {/* seat */}
      {seat && (
        <g>
          {lot > 0.04 && <g opacity={Math.min(1, lot * 6)}>{petals(0, 9, lerp(386, 472, lot), 156 * lot, 150, 392)}</g>}
          {lot > 0.04 && <g opacity={Math.min(1, lot * 6)}>{petals(1, 8, lerp(392, 480, lot), 132 * lot, 142, 344)}</g>}
          <Cel d={ellipse([0, 338], 420 - 16 * lot, 30)} base={L.seat} shade={L.seatSh} hi={L.skinHi} look={L} depth={0.5} />
        </g>
      )}

      <g transform={`translate(0 ${n(-br)})`}>
        <Trunk L={L} g={g} id={id} />

        {/* left arm in its sleeve */}
        <Cel d={g.lArmD} base={L.robe} shade={L.robeSh} hi={L.skinHi} look={L} />
      </g>

      {/* legs under the lower robe: thighs, then the left shin, then the right shin crossing over it */}
      <Cel d={LEGS} base={L.robe2} shade={L.robeSh} hi={L.skinHi} look={L}>
        <path d="M -128 146 C -60 178 60 178 128 146 L 128 120 L -128 120 Z" fill={L.robeSh} />
      </Cel>
      <Cel d={capsule([292, 262], 54, [-60, 232], 30)} base={L.robe2} shade={L.robeSh} hi={L.skinHi} look={L} depth={0.7} />
      <Cel d={capsule([-292, 262], 54, [60, 232], 30)} base={L.robe2} shade={L.robeSh} hi={L.skinHi} look={L} depth={0.7} />
      {/* soles of the feet resting on the opposite thighs, toes outward */}
      {[-1, 1].map((s) => {
        const heel: V = [62 * s, 230], toe: V = [160 * s, 206];
        const toes = [-2, -1, 0, 1, 2].map((k) => circle([toe[0] + 17 * s - Math.abs(k) * 3 * s + k * 1.5 * s, toe[1] + k * 8.5 - 2], 8.5 - Math.abs(k) * 0.9));
        return <Cel key={s} d={[capsule(heel, 23, toe, 24), ...toes]} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.35} />;
      })}
      {/* the hem of the robe falls in pleats over the edge of the seat */}
      <Cel d="M -78 300 C -50 314 50 314 78 300 L 100 338 C 50 354 -50 354 -100 338 Z" base={L.robe} shade={L.robeSh} hi={L.skinHi} look={L} depth={0.4}>
        {[-1, 0, 1].map((k) => <path key={k} d={`M ${k * 42} 309 L ${k * 54} 348`} stroke={L.robeSh} strokeWidth={7} fill="none" />)}
      </Cel>

      <g transform={`translate(0 ${n(-br * 0.6)})`}>
        {/* left hand, then right arm and hand on top */}
        <Cel d={g.lHand.d} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.4} />
        <Cel d={g.rArmD} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} />
        <Cel d={g.rHand.d} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.4}>
          {[-0.45, 0, 0.45].map((o) => {
            const a = g.rArm.W, d = g.rHand.dir, p = g.rHand.perp;
            return <path key={o} d={`M ${n(a[0] + d[0] * 44 + p[0] * o * 20)} ${n(a[1] + d[1] * 44 + p[1] * o * 20)} L ${n(a[0] + d[0] * 96 + p[0] * o * 16)} ${n(a[1] + d[1] * 96 + p[1] * o * 16)}`} stroke={L.line} strokeWidth={thin} opacity={0.75} />;
          })}
        </Cel>
      </g>

      {/* head */}
      <g transform={`translate(0 ${n(-br * 1.2)})`}>
        <Head L={L} g={g} id={id} eye={eye} br={br} thin={thin} />
      </g>
    </g>
  );
};

// ---------- the same figure, standing in the air and dancing ----------
// The head, torso, robe and hands are the seated figure's; only the lower body is new. Angles are
// screen directions in degrees: 0 = right, 90 = down, -90 = up. "R" is his right (the viewer's left).
//
//   <g transform="translate(960 420) scale(0.28)"><DancingBuddha look={look} dance={DANCES.rise} halo="#ffffff" /></g>
//
// Local units are the seated rig's: heart at (0,0), top of head about -480, feet near +1000.
export type Dance = {
  lean: number; // tilt of the upper body, + = toward the viewer's right
  head?: number; // extra tilt of the head
  armR: [number, number]; // direction of upper arm, forearm (his right arm, bare)
  armL: [number, number]; // his left arm, in the sleeve
  legR: [number, number]; // direction of thigh, shin
  legL: [number, number];
  flow: [number, number]; // where the hem and the loose end of the robe trail, in local units
  eye?: number;
};

export const DANCES: Record<'float' | 'rise' | 'turn' | 'wing' | 'ocean', Dance> = {
  float: {lean: 0, head: 0, armR: [112, 96], armL: [68, 84], legR: [95, 98], legL: [85, 90], flow: [-20, 110]},
  rise: {lean: -7, head: 7, armR: [160, 184], armL: [-62, -110], legR: [102, 140], legL: [86, 92], flow: [-170, 70]},
  turn: {lean: 8, head: -7, armR: [-120, -68], armL: [22, -4], legR: [94, 88], legL: [78, 40], flow: [170, 70]},
  wing: {lean: 24, head: -10, armR: [206, 196], armL: [-22, -8], legR: [138, 152], legL: [126, 144], flow: [-300, 0]},
  ocean: {lean: -8, head: -10, armR: [197, 174], armL: [-17, 6], legR: [108, 126], legL: [96, 116], flow: [-280, 96]},
};

export const mixDance = (a: Dance, b: Dance, t: number): Dance => {
  const m = (x: number, y: number) => x + (y - x) * t;
  const m2 = (x: [number, number], y: [number, number]): [number, number] => [m(x[0], y[0]), m(x[1], y[1])];
  return {lean: m(a.lean, b.lean), head: m(a.head ?? 0, b.head ?? 0), armR: m2(a.armR, b.armR), armL: m2(a.armL, b.armL), legR: m2(a.legR, b.legR), legL: m2(a.legL, b.legL), flow: m2(a.flow, b.flow), eye: m(a.eye ?? 0, b.eye ?? 0)};
};

const dirv = (deg: number): V => [Math.cos(deg * D2R), Math.sin(deg * D2R)];
const addv = (p: V, d: V, k = 1): V => [p[0] + d[0] * k, p[1] + d[1] * k];
// smooth curves through points (Catmull-Rom), closed or open
const smooth = (pts: V[], closed: boolean): string => {
  const N = pts.length;
  const at = (i: number): V => (closed ? pts[((i % N) + N) % N] : pts[Math.max(0, Math.min(N - 1, i))]);
  let d = `M ${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < (closed ? N : N - 1); i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += ` C ${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return d + (closed ? ' Z' : '');
};

export const DancingBuddha: React.FC<{look: Look; dance: Dance; halo?: string}> = ({look: L, dance: D, halo}) => {
  const id = React.useId().replace(/:/g, '');
  const g = rig({}, L);
  const thin = Math.max(2.5, L.lw * 0.5);
  const pivot: V = [0, 150];
  const rot = (p: V): V => {
    const a = D.lean * D2R, c = Math.cos(a), s = Math.sin(a), x = p[0] - pivot[0], y = p[1] - pivot[1];
    return [pivot[0] + x * c - y * s, pivot[1] + x * s + y * c];
  };
  const turn = `rotate(${n(D.lean)} ${pivot[0]} ${pivot[1]})`;

  const armOf = (S: V, a: [number, number]): Arm => {
    const E = addv(S, dirv(a[0]), 178);
    return {S, E, W: addv(E, dirv(a[1]), 176), ang: a[1]};
  };
  const rArm = armOf([-184, -100], D.armR), lArm = armOf([184, -100], D.armL);
  const rHand = hand(rArm, 90), lHand = hand(lArm, 90);

  // legs hang from the hips; the lower robe is one flowing shape around them
  const leg = (H: V, a: [number, number], side: number) => {
    const K = addv(H, dirv(a[0]), 360), A = addv(K, dirv(a[1]), 350), T = addv(A, dirv(a[1] - 32 * side), 118);
    const out = (p: V, q: V): V => {
      const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1;
      let nx = -dy / l, ny = dx / l;
      if (nx * side < 0) { nx = -nx; ny = -ny; }
      return [nx, ny];
    };
    const mid = lerpV(K, A, 0.62);
    return {K, A, T, hip: addv(addv(H, out(H, K), 66), [0, -10]), knee: addv(K, out(H, K), 78), hem: addv(mid, out(K, A), 98)};
  };
  const R = leg([-64, 196], D.legR, -1), Lg = leg([64, 196], D.legL, 1);
  const fl = Math.hypot(D.flow[0], D.flow[1]);
  const fd: V = fl > 20 ? [D.flow[0] / fl, D.flow[1] / fl] : [-0.97, 0.24];
  const fp: V = [-fd[1], fd[0]];
  const w1 = addv(addv(lerpV(R.hem, Lg.hem, 0.3), D.flow, 0.55), [0, 30]);
  const tail = addv(addv(lerpV(R.hem, Lg.hem, 0.55), D.flow, 1.35), [0, 44]);
  const w2 = addv(addv(lerpV(R.hem, Lg.hem, 0.8), D.flow, 0.5), [0, 26]);
  const skirt = smooth([rot([-116, 118]), R.hip, R.knee, R.hem, w1, tail, w2, Lg.hem, Lg.knee, Lg.hip, rot([116, 118]), rot([0, 96])], true);
  const hemLine = smooth([R.hem, w1, tail, w2, Lg.hem], false);
  const folds: [V, V][] = [[[-52, 214], w1], [[0, 226], tail], [[54, 214], w2]];
  // the loose end of the robe, over his left shoulder and out behind him
  const b0 = rot([118, -170]), b1 = rot([204, -82]), bm = lerpV(b0, b1, 0.5), len = 250 + fl * 0.9;
  const sash = smooth([b0, b1, addv(addv(addv(b1, fd, len * 0.5), fp, 34), [0, 34]), addv(addv(bm, fd, len), [0, 96]), addv(addv(addv(b0, fd, len * 0.5), fp, -30), [0, 30])], true);

  return (
    <g strokeLinecap="round">
      {halo && <circle cx={0} cy={-300} r={176} fill={halo} stroke={L.line} strokeWidth={L.lw} transform={`${turn} rotate(${n(D.head ?? 0)} 0 -190)`} />}
      <Cel d={sash} base={L.robe} shade={L.robeSh} hi={L.skinHi} look={L} depth={0.6} />
      {[R, Lg].map((q, i) => <Cel key={i} d={[capsule(q.K, 52, q.A, 30), capsule(q.A, 30, q.T, 15)]} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.5} />)}
      <Cel d={skirt} base={L.robe2} shade={L.robeSh} hi={L.skinHi} look={L}>
        {folds.map(([a, b], i) => <path key={i} d={`M ${n(a[0])} ${n(a[1])} L ${n(b[0] - fp[0] * 20)} ${n(b[1] - fp[1] * 20)} L ${n(b[0] + fp[0] * 20)} ${n(b[1] + fp[1] * 20)} Z`} fill={L.robeSh} />)}
        {folds.map(([a, b], i) => <path key={'l' + i} d={`M ${n(a[0])} ${n(a[1])} L ${n(b[0] - fp[0] * 20)} ${n(b[1] - fp[1] * 20)}`} stroke={L.line} strokeWidth={thin} fill="none" opacity={0.7} />)}
        <path d={hemLine} stroke={L.line} strokeWidth={52 + L.lw} fill="none" />
        <path d={hemLine} stroke={L.trim} strokeWidth={52 - L.lw} fill="none" />
      </Cel>
      <g transform={turn}>
        <Trunk L={L} g={g} id={id} />
        <g transform={`rotate(${n(D.head ?? 0)} 0 -190)`}><Head L={L} g={g} id={id} eye={Math.max(0, Math.min(1, D.eye ?? 0))} br={0} thin={thin} /></g>
        <Cel d={[capsule(lArm.S, 49, lArm.E, 43), capsule(lArm.E, 43, lArm.W, 33)]} base={L.robe} shade={L.robeSh} hi={L.skinHi} look={L} />
        <Cel d={lHand.d} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.4} />
        <Cel d={[capsule(rArm.S, 45, rArm.E, 39), capsule(rArm.E, 39, rArm.W, 29)]} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} />
        <Cel d={rHand.d} base={L.skin} shade={L.skinSh} hi={L.skinHi} look={L} depth={0.4} />
      </g>
    </g>
  );
};

// Where a hand is, in local units, for attaching things to it (the line of light).
export const danceHand = (D: Dance, which: 'R' | 'L'): V => {
  const S: V = which === 'R' ? [-184, -100] : [184, -100], a = which === 'R' ? D.armR : D.armL;
  const W = addv(addv(S, dirv(a[0]), 178), dirv(a[1]), 176), tip = addv(W, dirv(a[1]), 90);
  const t = D.lean * D2R, c = Math.cos(t), s = Math.sin(t), x = tip[0], y = tip[1] - 150;
  return [x * c - y * s, 150 + x * s + y * c];
};
