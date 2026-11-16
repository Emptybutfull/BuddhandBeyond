// The Buddha for "Sky Dance": a flat cel cut-out drawn in SVG, posed by a handful of angles.
// Look spec (CEL_LOOK.md): thin even ink line in a dark tint, flat fill, exactly one hard shadow tone.
//
//   <g transform="translate(960 520)"><SkyDancer pose={POSES.wing} look={look} scale={0.8} /></g>
//
// Origin = the pelvis. Angles are screen directions in degrees: 0 = right, 90 = down, -90 = up.
// "A" limbs are on the viewer's left (his bare right arm), "B" on the viewer's right (the robed side).
// Blend poses with mixPose(a, b, t) and step t on twos for the hand-drawn cadence.
import React from 'react';

export type DancerPose = {
  lean: number; // spine tilt from upright, + = toward the viewer's right
  head: number; // head tilt relative to the spine
  armA: [number, number]; // direction of upper arm, forearm
  armB: [number, number];
  legA: [number, number]; // direction of thigh, shin
  legB: [number, number];
  flow: [number, number]; // where the hem of the robe trails, in px
};
export type DancerLook = {skin: string; skinSh: string; robe: string; robeSh: string; hair: string; hairSh: string; line: string};

export const POSES: Record<'rise' | 'turn' | 'wing' | 'mountain' | 'ocean', DancerPose> = {
  rise: {lean: -7, head: -10, armA: [156, 176], armB: [-66, -102], legA: [104, 142], legB: [84, 92], flow: [-46, 44]},
  turn: {lean: -8, head: 8, armA: [152, 186], armB: [-58, -118], legA: [102, 150], legB: [86, 88], flow: [-62, 22]},
  wing: {lean: 30, head: -12, armA: [204, 192], armB: [-24, -8], legA: [150, 162], legB: [138, 152], flow: [-84, 6]},
  mountain: {lean: 0, head: 0, armA: [130, 100], armB: [50, 80], legA: [106, 92], legB: [74, 88], flow: [0, 28]},
  ocean: {lean: -9, head: -16, armA: [194, 172], armB: [-14, 8], legA: [112, 128], legB: [98, 118], flow: [-78, 46]},
};

export const mixPose = (a: DancerPose, b: DancerPose, t: number): DancerPose => {
  const m = (x: number, y: number) => x + (y - x) * t;
  const m2 = (x: [number, number], y: [number, number]): [number, number] => [m(x[0], y[0]), m(x[1], y[1])];
  return {lean: m(a.lean, b.lean), head: m(a.head, b.head), armA: m2(a.armA, b.armA), armB: m2(a.armB, b.armB), legA: m2(a.legA, b.legA), legB: m2(a.legB, b.legB), flow: m2(a.flow, b.flow)};
};

type V = [number, number];
const n = (v: number) => v.toFixed(1);
const dir = (deg: number): V => [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
const add = (p: V, d: V, k = 1): V => [p[0] + d[0] * k, p[1] + d[1] * k];

const capsule = (p: V, r1: number, q: V, r2: number): string => {
  const dx = q[0] - p[0], dy = q[1] - p[1];
  const d = Math.max(1e-3, Math.hypot(dx, dy));
  const th = Math.atan2(dy, dx);
  const al = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
  const pt = (c: V, r: number, a: number) => `${n(c[0] + r * Math.cos(a))} ${n(c[1] + r * Math.sin(a))}`;
  const big = 2 * al > Math.PI ? 1 : 0;
  return `M ${pt(p, r1, th + al)} L ${pt(q, r2, th + al)} A ${n(r2)} ${n(r2)} 0 ${big} 0 ${pt(q, r2, th - al)} L ${pt(p, r1, th - al)} A ${n(r1)} ${n(r1)} 0 ${1 - big} 0 ${pt(p, r1, th + al)} Z`;
};
const ring = (c: V, r: number, k = 14): V[] => Array.from({length: k}, (_, i) => add(c, dir((i / k) * 360), r));
// convex hull (monotone chain): the simple, readable outline of a set of blobs
const hull = (pts: V[]): string => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: V, a: V, b: V) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: V[] = [], upper: V[] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  for (const q of [...p].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  const h = lower.slice(0, -1).concat(upper.slice(0, -1));
  return 'M ' + h.map((q) => `${n(q[0])} ${n(q[1])}`).join(' L ') + ' Z';
};

const LIGHT: V = [-0.72, -0.7]; // light from the upper left, like the Blender sun

// One part: outline behind, shadow tone, then the base tone shifted toward the light and clipped.
const Part: React.FC<{d: string | string[]; base: string; shade: string; line: string; lw: number; sh: number; children?: React.ReactNode}> = ({d, base, shade, line, lw, sh, children}) => {
  const id = React.useId().replace(/:/g, '');
  const ds = Array.isArray(d) ? d : [d];
  return (
    <g>
      {ds.map((p, i) => <path key={'o' + i} d={p} fill={line} stroke={line} strokeWidth={lw * 2} strokeLinejoin="round" />)}
      <clipPath id={id + '_c'}>{ds.map((p, i) => <path key={i} d={p} />)}</clipPath>
      <g clipPath={`url(#${id}_c)`}>
        {ds.map((p, i) => <path key={'s' + i} d={p} fill={shade} />)}
        {ds.map((p, i) => <path key={'b' + i} d={p} fill={base} transform={`translate(${n(LIGHT[0] * sh)} ${n(LIGHT[1] * sh)})`} />)}
        {children}
      </g>
    </g>
  );
};

export const SkyDancer: React.FC<{pose: DancerPose; look: DancerLook; scale?: number; linePx?: number}> = ({pose, look: L, scale = 1, linePx = 2.5}) => {
  const id = React.useId().replace(/:/g, '');
  const lw = linePx / scale; // the line stays linePx wide on screen at any size
  const sh = 10;
  const P: V = [0, 0];
  const up = dir(-90 + pose.lean), perp = dir(pose.lean);
  const SC = add(P, up, 128), N = add(P, up, 146);
  const headRot = pose.lean + pose.head;
  const Hc = add(N, dir(-90 + headRot), 44);
  const SA = add(SC, perp, -44), SB = add(SC, perp, 44);
  const EA = add(SA, dir(pose.armA[0]), 84), WA = add(EA, dir(pose.armA[1]), 78), TA = add(WA, dir(pose.armA[1]), 28);
  const EB = add(SB, dir(pose.armB[0]), 84), WB = add(EB, dir(pose.armB[1]), 78), TB = add(WB, dir(pose.armB[1]), 28);
  const HA = add(P, perp, -22), HB = add(P, perp, 22);
  const KA = add(HA, dir(pose.legA[0]), 110), AA = add(KA, dir(pose.legA[1]), 104), FA = add(AA, dir(pose.legA[1] + 28), 34);
  const KB = add(HB, dir(pose.legB[0]), 110), AB = add(KB, dir(pose.legB[1]), 104), FB = add(AB, dir(pose.legB[1] - 28), 34);
  const hemA = add(KA, dir(pose.legA[1]), 70), hemB = add(KB, dir(pose.legB[1]), 70);
  const mid: V = [(hemA[0] + hemB[0]) / 2, (hemA[1] + hemB[1]) / 2];
  const tail: V = [mid[0] + pose.flow[0], mid[1] + pose.flow[1]];
  const waistA = add(add(P, up, 40), perp, -29), waistB = add(add(P, up, 40), perp, 29);

  const fl = Math.max(1, Math.hypot(pose.flow[0], pose.flow[1]));
  const fd: V = [pose.flow[0] / fl, pose.flow[1] / fl], fp: V = [-fd[1], fd[0]];
  const tail2 = add(add(mid, pose.flow, 0.72), fp, 30);
  const skirt = hull([...ring(waistA, 20), ...ring(waistB, 20), ...ring(add(HA, perp, -14), 28), ...ring(add(HB, perp, 14), 28), ...ring(KA, 27), ...ring(KB, 27), ...ring(hemA, 25), ...ring(hemB, 25), tail, tail2]);
  // the loose end of the robe, thrown over his left shoulder and trailing behind
  const shawl = hull([...ring(add(SB, up, 4), 13), ...ring(add(add(SB, fd, 58), [0, 14]), 9), add(add(SB, fd, 60 + fl * 0.9), [0, 30]), add(add(add(SB, fd, 44 + fl * 0.7), fp, 16), [0, 40])]);
  const torso = hull([...ring(SA, 20), ...ring(SB, 20), ...ring(waistA, 20), ...ring(waistB, 20)]);
  // the robe crosses the chest from his left shoulder (viewer's right) to the opposite hip
  const q1 = add(N, perp, 12), q2 = add(waistA, perp, -26);
  const dl = Math.hypot(q2[0] - q1[0], q2[1] - q1[1]);
  const d: V = [(q2[0] - q1[0]) / dl, (q2[1] - q1[1]) / dl];
  let nn: V = [-d[1], d[0]];
  if (nn[0] * (SB[0] - q1[0]) + nn[1] * (SB[1] - q1[1]) < 0) nn = [-nn[0], -nn[1]];
  const a0 = add(q1, d, -400), a1 = add(q2, d, 400);
  const half = `M ${n(a0[0])} ${n(a0[1])} L ${n(a1[0])} ${n(a1[1])} L ${n(a1[0] + nn[0] * 600)} ${n(a1[1] + nn[1] * 600)} L ${n(a0[0] + nn[0] * 600)} ${n(a0[1] + nn[1] * 600)} Z`;
  const p = {line: L.line, lw, sh};

  return (
    <g transform={`scale(${scale})`} strokeLinecap="round">
      {/* shins and feet show below the hem */}
      <Part d={[capsule(KA, 20, AA, 13), capsule(AA, 12, FA, 8)]} base={L.skin} shade={L.skinSh} {...p} sh={6} />
      <Part d={[capsule(KB, 20, AB, 13), capsule(AB, 12, FB, 8)]} base={L.skin} shade={L.skinSh} {...p} sh={6} />
      <Part d={shawl} base={L.robe} shade={L.robeSh} {...p} sh={8} />
      {/* the robe below the waist: one simple shape around hips, knees and hem, with a tail where the cloth trails */}
      <Part d={skirt} base={L.robe} shade={L.robeSh} {...p} sh={16}>
        <path d={`M ${n(P[0])} ${n(P[1] + 6)} L ${n(tail[0])} ${n(tail[1])}`} stroke={L.line} strokeWidth={lw * 0.8} fill="none" opacity={0.75} />
        <path d={`M ${n(waistB[0])} ${n(waistB[1])} L ${n((hemB[0] + tail[0]) / 2)} ${n((hemB[1] + tail[1]) / 2)}`} stroke={L.line} strokeWidth={lw * 0.8} fill="none" opacity={0.55} />
      </Part>
      {/* torso: skin, with the robe over his left shoulder */}
      <clipPath id={id + '_lit'}><path d={torso} transform={`translate(${n(LIGHT[0] * sh)} ${n(LIGHT[1] * sh)})`} /></clipPath>
      <Part d={torso} base={L.skin} shade={L.skinSh} {...p}>
        <path d={half} fill={L.robeSh} />
        <g clipPath={`url(#${id}_lit)`}><path d={half} fill={L.robe} /></g>
        <path d={`M ${n(a0[0])} ${n(a0[1])} L ${n(a1[0])} ${n(a1[1])}`} stroke={L.line} strokeWidth={lw} fill="none" />
      </Part>
      <Part d={capsule(add(SC, up, 4), 15, Hc, 14)} base={L.skin} shade={L.skinSh} {...p} sh={7} />
      {/* head */}
      <g transform={`translate(${n(Hc[0])} ${n(Hc[1])}) rotate(${n(headRot)})`}>
        <Part d={[capsule([-33, -4], 8, [-33, 22], 5.5), capsule([33, -4], 8, [33, 22], 5.5)]} base={L.skin} shade={L.skinSh} {...p} sh={4} />
        <Part d="M 0 -37 C 22 -37 32 -20 32 0 C 32 24 16 38 0 38 C -16 38 -32 24 -32 0 C -32 -20 -22 -37 0 -37 Z" base={L.skin} shade={L.skinSh} {...p} sh={8} />
        <Part d={['M -34 -2 C -40 -46 40 -46 34 -2 C 24 -17 -24 -17 -34 -2 Z', 'M -15 -41 a 15 14 0 1 0 30 0 a 15 14 0 1 0 -30 0 Z']} base={L.hair} shade={L.hairSh} {...p} sh={6} />
        <g stroke={L.line} strokeWidth={lw} fill="none">
          <path d="M -21 5 Q -13.5 10 -6 5" />
          <path d="M 6 5 Q 13.5 10 21 5" />
          <path d="M -22 -5 Q -13 -10 -5 -6" strokeWidth={lw * 0.8} />
          <path d="M 5 -6 Q 13 -10 22 -5" strokeWidth={lw * 0.8} />
          <path d="M -3 16 Q 0 18 3 16" strokeWidth={lw * 0.8} />
          <path d="M -8 24 Q 0 28 8 24" />
        </g>
        <circle cx={0} cy={-9} r={2.2} fill={L.line} />
      </g>
      {/* arms last, so a raised arm passes in front */}
      <Part d={[capsule(SB, 18, EB, 17), capsule(EB, 17, WB, 14)]} base={L.robe} shade={L.robeSh} {...p} sh={8} />
      <Part d={capsule(WB, 13, TB, 9)} base={L.skin} shade={L.skinSh} {...p} sh={5} />
      <Part d={[capsule(SA, 17, EA, 15), capsule(EA, 15, WA, 12)]} base={L.skin} shade={L.skinSh} {...p} sh={7} />
      <Part d={capsule(WA, 13, TA, 9)} base={L.skin} shade={L.skinSh} {...p} sh={5} />
    </g>
  );
};

// Where his hands are, in the same local units (multiply by scale), for attaching the line of light.
export const handTips = (pose: DancerPose): {A: V; B: V} => {
  const up = dir(-90 + pose.lean), perp = dir(pose.lean);
  const SC = add([0, 0], up, 128);
  const tip = (S: V, arm: [number, number]) => add(add(add(S, dir(arm[0]), 84), dir(arm[1]), 78), dir(arm[1]), 28);
  return {A: tip(add(SC, perp, -44), pose.armA), B: tip(add(SC, perp, 44), pose.armB)};
};
