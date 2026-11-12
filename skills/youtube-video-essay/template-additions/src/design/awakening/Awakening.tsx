// "Awakening" — a 2-minute vertical film (1080×1920, 30 fps, 60 BPM) of the night of the Buddha's
// awakening told as seven cycles. One cel-shaded figure, drawn in code, changes a little more each
// cycle. No footage, no images: flat colour, banded gradients, type.
//
// Register it:
//   <Composition id="Awakening" component={Awakening} {...AWAKENING} />
// The score that lands on these cues: scripts/audio/awakening_score.py
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Grain, GrainGradient} from '../GrainGradient';
import {clamp01, easeInOut, easeOut, hash, smooth} from '../noise';
import {fonts, ramps} from '../tokens';
import {Buddha, LOOKS, Look, Pose, Silhouette, bodyLook, mixHex, mixLook} from './Buddha';
import {AuraBands, Beings, BodhiTree, DivineEye, Earth, Emanation, EnsoStroke, Flames, MaraField, Moon, Rays, Sparkle, SpeedLines, Stars, Tunnel, Wheel12, chainStep, lerp, seg, wheelSpin} from './Elements';

export const AWAKENING = {width: 1080, height: 1920, fps: 30, durationInFrames: 3600};

// Cue sheet in seconds. 1 beat = 1 s, 1 bar = 4 s. The score uses the same numbers.
export const CUE = {mara: 14, close: 18, touch: 20, first: 24, second: 44, eye: 48, third: 64, stop: 76, dawn: 80, face: 88, open: 92, awake: 94, light: 100, noform: 112, seed: 118, end: 120};

const HX = 540, HY = 1060; // where the figure's heart sits in the frame
const WIPE = 1.25;
const bone = '#e9e2d2', ink = '#0d0d0d', vermilion = '#e2512a', cobalt = '#2440b3';
const NIGHT = ['#06081a', '#0a0f2c', '#101846', '#18246a', '#22338e', '#3148b4'];
const LAPIS = ['#0b0a10', '#0f1640', '#14235e', '#1b3186', '#2747c7'];
const PLUM = ['#160a1c', '#2c0f3a', '#47155a', '#6b1a6e', '#8f1f6c', '#47155a', '#2c0f3a'];
const FIVE = ['#2747c7', '#f1ece0', '#c0261d', '#1f8a63', '#e9b53b'];

type WorldId = 'night' | 'first' | 'second' | 'third' | 'paper' | 'dawn' | 'light' | 'noform';
const WORLDS: {id: WorldId; from: number; to: number; wipe: boolean}[] = [
  {id: 'night', from: 0, to: CUE.first + WIPE, wipe: false},
  {id: 'first', from: CUE.first, to: CUE.second + WIPE, wipe: true},
  {id: 'second', from: CUE.second, to: CUE.third + WIPE, wipe: true},
  {id: 'third', from: CUE.third, to: CUE.stop, wipe: true},
  {id: 'paper', from: CUE.stop, to: CUE.dawn + WIPE, wipe: false},
  {id: 'dawn', from: CUE.dawn, to: CUE.light + WIPE, wipe: true},
  {id: 'light', from: CUE.light, to: CUE.noform + WIPE, wipe: true},
  {id: 'noform', from: CUE.noform, to: CUE.end, wipe: true},
];

const backOut = (v: number) => {
  const t = clamp01(v) - 1;
  return 1 + t * t * (2.7 * t + 1.7);
};

// ---------- what changes over the whole film ----------
// The marks of a Buddha grow in slowly; they are shared by every world so a wipe never shows a seam.
const marks = (t: number) => ({
  ush: lerp(0.42, 1, smooth(seg(t, 26, 40))),
  curl: smooth(seg(t, 28, 40)),
  ear: lerp(0.12, 1, smooth(seg(t, 26, 42))),
  urna: smooth(seg(t, 44.6, 47)),
  lotus: 0.3 * smooth(seg(t, 24.2, 40)) + 0.2 * smooth(seg(t, 48, 60)) + 0.1 * smooth(seg(t, 64, 72)) + 0.4 * easeOut(seg(t, CUE.awake, CUE.awake + 2.6)),
});
const colours = (id: WorldId, t: number): Look => {
  switch (id) {
    case 'night': return LOOKS.man;
    case 'first': return mixLook(LOOKS.man, LOOKS.gold, 0.4 + 0.6 * smooth(seg(t, 25, 38)));
    case 'second': return mixLook(LOOKS.gold, LOOKS.jade, 0.72 + 0.28 * smooth(seg(t, 45, 54)));
    case 'third': return mixLook(LOOKS.jade, LOOKS.fire, 0.4 + 0.6 * smooth(seg(t, 64, 72)));
    case 'paper': return LOOKS.paper;
    case 'dawn': return mixLook(LOOKS.predawn, LOOKS.dawn, smooth(seg(t, 86, 93)));
    case 'light': return mixLook(LOOKS.dawn, LOOKS.light, 0.55 + 0.45 * smooth(seg(t, 100, 103)));
    default: return LOOKS.light;
  }
};
const lookFor = (id: WorldId, t: number): Look => ({...colours(id, t), ...marks(t)});

const poseAt = (t: number, frame: number): Pose => {
  const t2 = (Math.floor(frame / 2) * 2) / 30; // the figure moves "on twos", like drawn animation
  const down = Math.pow(seg(t2, CUE.close + 0.3, CUE.touch), 2.2);
  const back = smooth(seg(t, 22.4, 23.8));
  return {reach: t < CUE.touch ? down : 1 - back, eye: 0.6 * easeOut(seg(t2, CUE.open, CUE.open + 0.4)), breath: Math.sin((t * Math.PI * 2) / 5)};
};

type Cam = {s: number; fx: number; fy: number; ax: number; ay: number};
const camAt = (t: number, frame: number): Cam => {
  const wide = (s: number): Cam => ({s, fx: 0, fy: 0, ax: HX, ay: HY});
  if (t < 8) return wide(0.9);
  if (t < CUE.mara) return wide(lerp(0.9, 1, easeInOut(seg(t, 8, 14))));
  if (t < CUE.close) return wide(1);
  if (t < CUE.touch + 0.1) return {s: lerp(2.1, 2.4, seg(t, 18, 20)), fx: -230, fy: 200, ax: 540, ay: 1010};
  if (t < CUE.first) return wide(lerp(0.9, 0.95, easeOut(seg(t, 20.1, 24))));
  if (t < CUE.second) return wide(lerp(0.95, 1.1, seg(t, 24, 44)));
  if (t < CUE.eye) {
    const k = easeInOut(seg(t, 44.4, 47.4));
    return {s: lerp(1.1, 2.7, k), fx: 0, fy: lerp(0, -326, k), ax: HX, ay: lerp(HY, 940, k)};
  }
  if (t < CUE.third) return wide(lerp(0.9, 0.97, seg(t, 48, 64)));
  if (t < CUE.stop) {
    const k = seg(t, 64, 76), f2 = Math.floor(frame / 2), amp = 10 * k * k;
    return {s: lerp(0.97, 1.2, 0.4 * k + 0.6 * k * k), fx: (hash(f2 * 1.31) - 0.5) * amp, fy: (hash(f2 * 2.93 + 4) - 0.5) * amp, ax: HX, ay: HY};
  }
  if (t < CUE.dawn) return wide(1);
  if (t < CUE.face) return wide(lerp(1, 1.05, seg(t, 80, 88)));
  if (t < CUE.awake) return {s: lerp(2.9, 3.2, seg(t, 88, 94)), fx: 0, fy: -292, ax: 540, ay: 980};
  if (t < CUE.light) return wide(lerp(1.07, 0.96, easeOut(seg(t, 94, 94.4))) + 0.04 * seg(t, 94.4, 100));
  if (t < CUE.noform) return wide(lerp(1, 0.6, easeInOut(seg(t, 100.2, 103))) + 0.04 * seg(t, 103, 112));
  return wide(lerp(0.64, 0.9, easeInOut(seg(t, 112, 117))));
};
const heartOnScreen = (c: Cam): [number, number] => [c.ax - c.s * c.fx, c.ay - c.s * c.fy];

// ---------- the worlds ----------
const World: React.FC<{id: WorldId; t: number; frame: number}> = ({id, t, frame}) => {
  const uid = React.useId().replace(/:/g, '');
  const cam = camAt(t, frame);
  const [hx, hy] = heartOnScreen(cam);
  const focus: [number, number] = [hx / 1080, hy / 1920];
  const L = lookFor(id, t);
  const pose = poseAt(t, frame);
  const f2 = Math.floor(frame / 2);

  let ground: React.ReactNode = null;
  let behind: React.ReactNode = null; // world coordinates, behind the figure
  let localBehind: React.ReactNode = null; // figure coordinates, behind the figure
  let figure: React.ReactNode = <Buddha look={L} pose={pose} />;
  let front: React.ReactNode = null; // world coordinates, in front

  if (id === 'night') {
    const intro = seg(t, 1.5, 5);
    ground = <GrainGradient ramp={NIGHT} kind="aura" bands={7} res={3} blur={1.3} grain={0} focus={focus} scale={1.45 * cam.s} gain={0.8} speed={0.5} />;
    behind = (
      <g>
        <Stars frame={frame} color={bone} show={intro} />
        {intro > 0 && <g opacity={Math.min(1, intro * 3)}><Moon x={910} y={lerp(980, 716, easeOut(seg(t, 1.5, 6)))} r={62} fill={bone} shade="#c9c2b2" /></g>}
        {intro > 0 && (
          <g opacity={Math.min(1, seg(t, 2.2, 3.4))}>
            <BodhiTree frame={frame} c={['#070b1e', '#0a1430', '#0f2142', '#173258']} grow={lerp(0.9, 1, easeOut(seg(t, 2.2, 5.5)))} />
            <Earth c={['#080d24', '#0b1230', '#2a3c98']} />
          </g>
        )}
      </g>
    );
    const born = backOut(seg((f2 * 2) / 30, 5, 6.5));
    localBehind = (
      <g>
        {[-2, -1, 0, 1, 2, 3, 4, 5].map((b) => {
          const age = t - b;
          if (age <= 0 || age >= 1.7 || t > 7) return null;
          const k = age / 1.7;
          return <circle key={b} r={24 + 430 * easeOut(k)} fill="none" stroke={bone} strokeWidth={5 * (1 - k)} />;
        })}
        {t < 6 && <circle r={11 + 3 * Math.cos(t * Math.PI * 2)} fill={bone} />}
      </g>
    );
    figure = born > 0.001 ? <g transform={`scale(${born.toFixed(4)})`}><Buddha look={L} pose={pose} /></g> : null;
    const after = t - CUE.touch - 0.1;
    front = (
      <g>
        {t >= CUE.mara && t < CUE.touch + 4.2 && <MaraField t={t} frame={frame} touch={CUE.touch} red="#c8161a" dark="#7b0e12" ink={ink} bone={bone} petalA="#f3a8b8" petalB="#d9567c" />}
        {after > 0 && [0, 1, 2].map((i) => {
          const k = seg(after - i * 0.16, 0, 1.5);
          if (k <= 0 || k >= 1) return null;
          const rx = 1700 * easeOut(k);
          return <ellipse key={i} cx={HX - 296} cy={HY + 318} rx={rx} ry={rx * 0.24} fill="none" stroke={bone} strokeWidth={14 * (1 - k)} />;
        })}
      </g>
    );
  }

  if (id === 'first') {
    const tau = t - CUE.first;
    const halo = smooth(seg(t, 30, 38));
    ground = <AbsoluteFill style={{background: PLUM[0]}} />;
    localBehind = (
      <g>
        <Tunnel tau={(f2 * 2) / 30 - CUE.first} colors={PLUM} line="#c2478a" look={L} pose={{}} />
        {halo > 0 && <g transform="translate(0 -300)"><circle r={196 * halo} fill="#f6c98a" /><circle r={176 * halo} fill="#ee5a2f" /></g>}
        <Silhouette look={L} pose={pose} fill="#f6c98a" strokeWidth={30 * smooth(seg(tau, 1, 12))} />
      </g>
    );
  }

  if (id === 'second') {
    const open = t < CUE.eye ? 0 : backOut(seg(t, CUE.eye, CUE.eye + 1.3)) * (1 - 0.92 * Math.exp(-Math.pow((t - 57) / 0.16, 2)));
    ground = <GrainGradient ramp={ramps.jadeAura.slice(0, 4)} kind="aura" bands={6} res={3} blur={1.3} grain={0} focus={focus} scale={1.5 * cam.s} gain={0.74} speed={0.6} />;
    localBehind = (
      <g>
        {t >= CUE.eye && <Beings t={t} show={seg(t, CUE.eye + 1.5, CUE.eye + 7)} rise="#f2e6b1" fall="#06201d" />}
        {t >= CUE.eye && <DivineEye open={open} t={t} c={{white: '#f2e6b1', iris: ['#0f4a45', '#22a58c', '#a8e3c3'], pupil: '#06201d', line: '#06201d', lash: '#22a58c'}} />}
        {t < CUE.eye && (
          <g transform="translate(0 -300)">
            <circle r={196} fill="#a8e3c3" /><circle r={176} fill="#0f4a45" />
            {[0, 1, 2, 3].map((i) => {
              const k = (t * 0.55 + i / 4) % 1;
              return <circle key={i} cy={-40} r={14 + k * 150} fill="none" stroke="#f2e6b1" strokeWidth={4} opacity={(1 - k) * marks(t).urna} />;
            })}
          </g>
        )}
        <Silhouette look={L} pose={pose} fill="#a8e3c3" strokeWidth={26} />
      </g>
    );
  }

  if (id === 'third') {
    const tau = t - CUE.third, k = seg(t, CUE.third, CUE.stop);
    ground = <GrainGradient ramp={ramps.thermal} kind="flow" bands={8} res={3} blur={1.3} grain={0} scale={1.1} heat={lerp(-0.3, 0.3, k)} speed={1 + 2.2 * k} gain={0.9} />;
    behind = <Flames frame={frame} heat={k} c={['#5a0d12', '#c0261d', '#f08a1c']} />;
    localBehind = (
      <g>
        <circle cy={-24} r={358} fill="#0b0a0c" opacity={0.62} />
        <Wheel12 rot={wheelSpin(tau) - wheelSpin(12) + 0.7} active={Math.floor(chainStep(tau))} c={{ring: '#f8e9c8', node: '#0b0a0c', on: '#f8d77a', text: '#f8e9c8', dim: '#6d6a66'}} />
        <Silhouette look={L} pose={pose} fill="#c0261d" strokeWidth={44} />
        <Silhouette look={L} pose={pose} fill="#f08a1c" strokeWidth={22} />
      </g>
    );
  }

  if (id === 'paper') {
    const out = clamp01((t - (CUE.stop + 0.9)) / 0.22 / 12) * 12;
    ground = <AbsoluteFill style={{background: bone}} />;
    localBehind = <Wheel12 rot={0.7} active={-1} broken={easeOut(seg(t, CUE.stop, CUE.stop + 0.5))} out={t < CUE.stop + 0.9 ? 0 : Math.min(12, Math.floor(out) + 1)} c={{ring: cobalt, node: cobalt, on: vermilion, text: cobalt, dim: '#b9c2dc'}} />;
  }

  if (id === 'dawn') {
    const sun = backOut(seg(t, CUE.open, CUE.open + 1));
    const day = smooth(seg(t, 81, 95));
    const horizon = hy + cam.s * 300;
    ground = <GrainGradient ramp={ramps.dawn} kind="horizon" bands={9} res={3} blur={1.3} grain={0} focus={[hx / 1080, horizon / 1920]} scale={1.5 * cam.s} heat={lerp(-0.44, 0.14, day)} speed={0.5} />;
    const starY = lerp(700, 452, easeOut(seg(t, 80.6, 85)));
    behind = (
      <g>
        <Stars frame={frame} color="#fbf3e1" show={1 - seg(t, 84, 92)} maxY={1100} />
        <g opacity={1 - seg(t, 93, 95)}>
          <Sparkle x={800} y={starY} r={44 + 8 * Math.sin(t * 5)} fill="#fbf3e1" />
          <Sparkle x={800} y={starY} r={22} fill="#fbf3e1" rot={45} />
          <circle cx={800} cy={starY} r={70} fill="none" stroke="#fbf3e1" strokeWidth={3} opacity={0.5} />
        </g>
        <g opacity={0.92}><BodhiTree frame={frame} c={['#15164a', '#1b1c5c', '#262878', '#34379a']} /></g>
        <Earth c={[mixHex('#1a1a52', '#8a4fb0', day * 0.6), mixHex('#15153f', '#5a3a96', day * 0.7), '#f8d77a']} />
      </g>
    );
    localBehind = (
      <g>
        {t >= CUE.awake && <g transform={`translate(0 -300) rotate(${(t * 2.4).toFixed(2)})`}><Rays count={26} r0={250} r1={2600} fill="#fbf3e1" opacity={0.2} /></g>}
        {sun > 0 && <g transform="translate(0 -300)"><circle r={318 * sun} fill="#f8d77a" opacity={0.35} /><circle r={262 * sun} fill="#fbf3e1" /><circle r={244 * sun} fill="#f8d77a" /></g>}
        {sun > 0 && <Silhouette look={L} pose={pose} fill="#fff6cf" strokeWidth={24 * Math.min(1, sun)} />}
      </g>
    );
    front = t >= CUE.awake ? (
      <g>
        {Array.from({length: 14}, (_, i) => {
          const k = ((t - CUE.awake) * (0.1 + 0.08 * hash(i * 3.1)) + hash(i * 9.7)) % 1;
          return <Sparkle key={i} x={60 + hash(i * 5.3) * 960 + 30 * Math.sin(t + i)} y={1700 - k * 1400} r={10 + 14 * hash(i * 1.9)} fill="#fff6cf" opacity={Math.sin(k * Math.PI) * 0.9} rot={t * 20 + i * 30} />;
        })}
      </g>
    ) : null;
  }

  if (id === 'light') {
    const tau = t - CUE.light;
    const centre: Pose = {mudra: 'teach', eye: 0.6, breath: pose.breath};
    ground = <GrainGradient ramp={LAPIS} kind="aura" bands={6} res={3} blur={1.3} grain={0} focus={focus} scale={2.1 * cam.s} gain={0.9} speed={0.5} />;
    const fam: {x: number; y: number; at: number; look: Look; pose: Pose; disc: string; ring: string}[] = [
      {x: 0, y: 720, at: 102, look: bodyLook('#2747c7', '#14235e'), pose: {mudra: 'earth', eye: 0.5}, disc: '#101a4a', ring: '#2747c7'}, // east (front): blue, earth-touching
      {x: -655, y: 30, at: 103, look: bodyLook('#e9b53b', '#b97324'), pose: {mudra: 'give', eye: 0.5}, disc: '#4a3410', ring: '#e9b53b'}, // south: yellow, giving
      {x: 0, y: -700, at: 104, look: bodyLook('#c0261d', '#7b1622', '#e9a23b', '#b97324'), pose: {mudra: 'dhyana', eye: 0.5}, disc: '#3d0d10', ring: '#c0261d'}, // west: red, meditation
      {x: 655, y: 30, at: 105, look: bodyLook('#1f8a63', '#0f4a45'), pose: {mudra: 'fearless', eye: 0.5}, disc: '#0a2c22', ring: '#1f8a63'}, // north: green, fearlessness
    ];
    localBehind = (
      <g>
        <g transform={`rotate(${(t * 1.6).toFixed(2)})`}><Rays count={32} r0={0} r1={2800} fill="#2747c7" opacity={0.28} /></g>
        <Tunnel out tau={tau * 0.9} colors={FIVE} line={ink} look={L} pose={centre} count={6} ratio={1.19} />
        {fam.map((f, i) => {
          const pop = seg(t, f.at, f.at + 0.5);
          return pop > 0 ? <path key={i} d={`M 0 -40 L ${f.x * pop} ${(f.y - 12) * pop}`} stroke={f.ring} strokeWidth={16} /> : null;
        })}
        <circle cy={-10} r={686} fill="none" stroke="#f1ece0" strokeWidth={4} opacity={0.5 * seg(tau, 1.5, 3)} />
        {fam.map((f, i) => <Emanation key={i} x={f.x} y={f.y} scale={0.33} pop={seg((f2 * 2) / 30, f.at, f.at + 0.5)} look={f.look} pose={f.pose} disc={f.disc} ring={f.ring} />)}
        <Silhouette look={L} pose={centre} fill="#ffffff" strokeWidth={26} />
      </g>
    );
    figure = <Buddha look={L} pose={centre} />;
  }

  if (id === 'noform') {
    const centre: Pose = {mudra: 'teach', eye: 0.6};
    const dark = smooth(seg(t, 116.9, 117.9));
    const body = 1 - smooth(seg(t, 112.5, 114.2));
    const line = smooth(seg(t, 112.4, 113.2)) * (1 - smooth(seg(t, 115, 116.2)));
    const draw = easeInOut(seg(t, 114.4, 116));
    const shrink = easeInOut(seg(t, 116.3, 117.6));
    const dotCol = mixHex(ink, bone, dark);
    ground = (
      <AbsoluteFill style={{background: bone}}>
        {dark > 0 && <AbsoluteFill style={{opacity: dark}}><GrainGradient ramp={NIGHT} kind="aura" bands={7} res={3} blur={1.3} grain={0} focus={focus} scale={1.45 * 0.9} gain={0.8} speed={0.5} time={t - CUE.end} /></AbsoluteFill>}
      </AbsoluteFill>
    );
    localBehind = (
      <g>
        {[CUE.seed, CUE.seed + 1].map((b) => {
          const k = (t - b) / 1.7;
          return k > 0 && k < 1 ? <circle key={b} r={24 + 430 * easeOut(k)} fill="none" stroke={bone} strokeWidth={5 * (1 - k)} /> : null;
        })}
        {line > 0 && (
          <g opacity={line} transform={`translate(0 -40) scale(${lerp(1, 0.86, smooth(seg(t, 114.6, 116.2))).toFixed(4)}) translate(0 40)`}>
            <mask id={uid} maskUnits="userSpaceOnUse" x={-700} y={-700} width={1400} height={1400}>
              <Silhouette look={L} pose={centre} fill="#fff" strokeWidth={15} />
              <Silhouette look={L} pose={centre} fill="#000" strokeWidth={0} />
            </mask>
            <rect x={-700} y={-700} width={1400} height={1400} fill={ink} mask={`url(#${uid})`} />
          </g>
        )}
        {draw > 0 && shrink < 1 && <g transform="translate(0 -40)"><EnsoStroke r={lerp(430, 6, shrink)} draw={draw} color={dotCol} width={lerp(30, 12, shrink)} /></g>}
        {/* the circle closes into the seed, which settles back where the film began */}
        {shrink > 0.9 && <circle cy={lerp(-40, 0, smooth(seg(t, 117.6, 118)))} r={(11 + 3 * Math.cos(t * Math.PI * 2)) * seg(shrink, 0.9, 1)} fill={dotCol} />}
      </g>
    );
    figure = body > 0.01 ? <g opacity={body}><Buddha look={L} pose={centre} /></g> : null;
  }

  return (
    <AbsoluteFill>
      {ground}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, transformOrigin: '0 0', transform: `translate(${(cam.ax - cam.s * (HX + cam.fx)).toFixed(2)}px, ${(cam.ay - cam.s * (HY + cam.fy)).toFixed(2)}px) scale(${cam.s.toFixed(4)})`}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{overflow: 'visible', position: 'absolute'}}>
          {behind}
          <g transform={`translate(${HX} ${HY})`}>
            {localBehind}
            {figure}
          </g>
          {front}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// ---------- type ----------
type Line = string | {text: string; at: number; slam?: boolean};
// `under` prints a hard offset copy of the words in a second ink (misregistered print), for busy grounds.
const Caption: React.FC<{t: number; from: number; to: number; label?: string; lines?: Line[]; soft?: string; color: string; labelColor?: string; size?: number; every?: number; under?: string}> = ({t, from, to, label, lines = [], soft, color, labelColor, size = 132, every = 0.5, under}) => {
  if (t < from || t >= to) return null;
  const out = 1 - seg(t, to - 0.3, to);
  const enter = (at: number, slam?: boolean): React.CSSProperties => {
    if (slam) return t < at ? {opacity: 0} : {transform: `scale(${lerp(1.1, 1, seg(t, at, at + 0.1)).toFixed(3)})`, transformOrigin: 'left center'};
    const p = easeOut(seg(t, at, at + 0.36));
    return {opacity: p, transform: `translateY(${((1 - p) * 34).toFixed(1)}px)`};
  };
  return (
    <div style={{position: 'absolute', left: 64, right: 150, top: 236, opacity: out}}>
      {label && <div style={{fontFamily: fonts.mono, fontWeight: 500, fontSize: 23, lineHeight: 1.45, letterSpacing: '0.08em', color: labelColor ?? color, whiteSpace: 'pre-line', ...enter(from)}}>{label}</div>}
      <div style={{marginTop: 20}}>
        {lines.map((l, i) => {
          const text = typeof l === 'string' ? l : l.text;
          const at = typeof l === 'string' ? from + 0.25 + i * every : l.at;
          return <div key={i} style={{fontFamily: fonts.heavy, fontWeight: 900, fontSize: size, lineHeight: 0.9, letterSpacing: '-0.025em', color, whiteSpace: 'nowrap', textShadow: under ? `${Math.round(size * 0.05)}px ${Math.round(size * 0.05)}px 0 ${under}` : undefined, ...enter(at, typeof l !== 'string' && l.slam)}}>{text}</div>;
        })}
      </div>
      {soft && <div style={{marginTop: 22, fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 58, lineHeight: 1.05, color, maxWidth: 760, ...enter(from + 0.3 + lines.length * every)}}>{soft}</div>}
    </div>
  );
};

const CYCLES = [8, CUE.first, CUE.second, CUE.third, CUE.dawn, CUE.light, CUE.noform, CUE.seed];
const Pips: React.FC<{t: number; color: string}> = ({t, color}) => {
  if (t < CYCLES[0] || t >= CUE.seed) return null;
  const now = CYCLES.findIndex((c, i) => t >= c && t < CYCLES[i + 1]);
  return (
    <div style={{position: 'absolute', right: 64, top: 242, display: 'flex', gap: 11, alignItems: 'center'}}>
      {CYCLES.slice(0, 7).map((_, i) => (
        <div key={i} style={{width: i === now ? 20 : 12, height: i === now ? 20 : 12, borderRadius: 20, background: i <= now ? color : 'transparent', border: `3px solid ${color}`, boxSizing: 'border-box'}} />
      ))}
    </div>
  );
};

const MARA_WORDS: {w: string; at: number; size: number; x: number}[] = [
  {w: 'DESIRE', at: 15, size: 318, x: -14},
  {w: 'FEAR', at: 16, size: 430, x: 40},
  {w: 'DOUBT', at: 17, size: 356, x: -10},
];

// ---------- the film ----------
export const Awakening: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const cam = camAt(t, frame);
  const [hx, hy] = heartOnScreen(cam);
  const live = WORLDS.filter((w) => t >= w.from && t < w.to);
  const impact = frame - CUE.touch * 30; // 0,1,2 = the three impact frames
  const lives = Math.min(100000, Math.round(Math.pow(10, 5 * seg(t, 25.6, 41))));
  const textCol = t < CUE.first ? bone : t < CUE.second ? '#f6c98a' : t < CUE.third ? '#f2e6b1' : t < CUE.stop ? '#f8e9c8' : t < CUE.dawn ? cobalt : t < CUE.light ? '#fbf3e1' : t < CUE.noform ? bone : ink;

  return (
    <AbsoluteFill style={{background: NIGHT[0]}}>
      {live.map((w) => {
        const p = w.wipe ? seg(t, w.from, w.from + WIPE) : 1;
        return (
          <AbsoluteFill key={w.id} style={p < 1 ? {clipPath: `circle(${(2050 * easeOut(p)).toFixed(1)}px at ${hx.toFixed(1)}px ${hy.toFixed(1)}px)`} : undefined}>
            <World id={w.id} t={t} frame={frame} />
          </AbsoluteFill>
        );
      })}
      {/* the ring that carries each cycle through him */}
      {live.filter((w) => w.wipe && t < w.from + WIPE).map((w) => {
        const p = seg(t, w.from, w.from + WIPE), r = 2050 * easeOut(p);
        return (
          <svg key={w.id} width={1080} height={1920} style={{position: 'absolute'}}>
            <circle cx={hx} cy={hy} r={r} fill="none" stroke={bone} strokeWidth={30 * (1 - p) + 2} />
            <circle cx={hx} cy={hy} r={r * 0.86} fill="none" stroke={bone} strokeWidth={8 * (1 - p)} opacity={0.6} />
          </svg>
        );
      })}

      {/* Mara's words */}
      {MARA_WORDS.map((m) => {
        if (t < m.at || t >= m.at + 0.86) return null;
        const j = Math.floor(frame / 3);
        const s = lerp(1.14, 1, seg(t, m.at, m.at + 0.1));
        return (
          <div key={m.w} style={{position: 'absolute', left: m.x + (hash(j * 1.7) - 0.5) * 8, top: 296 + (hash(j * 3.1) - 0.5) * 8, fontFamily: fonts.heavy, fontWeight: 900, fontSize: m.size, lineHeight: 0.86, letterSpacing: '-0.03em', whiteSpace: 'nowrap', transform: `scale(${s.toFixed(3)})`, transformOrigin: 'left top'}}>
            <div style={{position: 'absolute', left: 10, top: 10, color: ink}}>{m.w}</div>
            <div style={{position: 'relative', color: bone}}>{m.w}</div>
          </div>
        );
      })}

      {/* captions (kept inside Instagram's safe area: clear of the top bar, the right-hand buttons, the caption) */}
      <Caption t={t} from={0.3} to={7.5} color={bone} label={'BODH GAYA, INDIA\nABOUT 2,500 YEARS AGO'} lines={[{text: 'THE NIGHT', at: 0.4}, {text: 'A MAN', at: 1}, {text: 'WOKE UP.', at: 2}]} size={150} />
      <Caption t={t} from={8.2} to={13.6} color={bone} label="CYCLE 1 · THE MAN" lines={['HE SITS', 'DOWN.']} soft="and vows not to rise until he understands." />
      <Caption t={t} from={14.2} to={17.95} color={bone} label={'CYCLE 1 · MĀRA COMES WITH HIS ARMY'} />
      <Caption t={t} from={18.3} to={23.6} color={bone} label="BHŪMISPARŚA · THE EARTH IS HIS WITNESS" lines={[{text: 'HE TOUCHES', at: 18.5}, {text: 'THE EARTH.', at: CUE.touch + 0.1, slam: true}]} />
      <Caption t={t} from={24.7} to={43.5} color="#f6c98a" label={'CYCLE 2 · FIRST WATCH OF THE NIGHT\nPUBBENIVĀSĀNUSSATI'} lines={['HE REMEMBERS', 'EVERY LIFE.']} size={110} />
      {t >= 26.2 && t < 43.5 && (
        <div style={{position: 'absolute', left: 64, top: 520, opacity: Math.min(seg(t, 26.2, 26.6), 1 - seg(t, 43.2, 43.5)), fontFamily: fonts.mono, fontWeight: 500, color: '#f6c98a'}}>
          <div style={{fontSize: 66, letterSpacing: '0.02em'}}>{lives.toLocaleString('en-US')}{lives >= 100000 ? '+' : ''}</div>
          <div style={{fontSize: 21, letterSpacing: '0.08em'}}>LIVES RECALLED</div>
        </div>
      )}
      <Caption t={t} from={48.3} to={63.5} color="#f2e6b1" label={'CYCLE 3 · SECOND WATCH\nDIBBACAKKHU — THE DIVINE EYE'} lines={['HE SEES BEINGS', 'FALL AND RISE.']} size={100} under="#06201d" />
      <Caption t={t} from={64.7} to={75.85} color="#f8e9c8" label={'CYCLE 4 · THIRD WATCH\nPAṬICCASAMUPPĀDA — HOW SUFFERING ARISES'} lines={['HE SEES', 'THE CAUSE.']} under={ink} />
      <Caption t={t} from={CUE.stop} to={79.7} color={vermilion} labelColor={cobalt} label="NIRODHA — CESSATION" lines={[{text: 'IT STOPS.', at: CUE.stop, slam: true}]} size={170} />
      <Caption t={t} from={81} to={87.6} color="#fbf3e1" label="CYCLE 5 · DAWN" soft="the morning star rises." />
      <Caption t={t} from={CUE.awake} to={99.6} color="#fbf3e1" label="BUDDHA — “ONE WHO IS AWAKE”" lines={[{text: 'AWAKE.', at: CUE.awake, slam: true}]} size={232} under="#2a2a7c" />
      <Caption t={t} from={100.9} to={111.5} color={bone} label={'CYCLE 6 · SAMBHOGAKĀYA\nTHE BODY OF LIGHT'} lines={['NO LONGER', 'ONLY A MAN.']} size={104} under={ink} />
      <Caption t={t} from={112.8} to={116.8} color={ink} label="CYCLE 7 · DHARMAKĀYA" lines={['NO FORM', 'AT ALL.']} />
      {t >= 118.3 && <div style={{position: 'absolute', left: 0, right: 0, top: HY + 120, textAlign: 'center', fontFamily: fonts.mono, fontWeight: 500, fontSize: 23, letterSpacing: '0.3em', color: bone, opacity: Math.min(seg(t, 118.3, 118.7), 1 - seg(t, 119.5, 119.9))}}>AGAIN</div>}
      <Pips t={t} color={textCol} />

      {/* three impact frames when the hand lands */}
      {impact >= 0 && impact < 3 && (
        <AbsoluteFill style={{background: [bone, ink, '#c8161a'][impact]}}>
          <svg width={1080} height={1920} style={{position: 'absolute'}}>
            <g transform="translate(386 1262)">
              <SpeedLines seed={impact + 3} fill={[ink, bone, ink][impact]} r0={[150, 250, 340][impact]} />
              <circle r={[70, 150, 0][impact]} fill={[ink, bone, ink][impact]} />
            </g>
          </svg>
        </AbsoluteFill>
      )}
      <Grain amount={0.16} still />
    </AbsoluteFill>
  );
};
