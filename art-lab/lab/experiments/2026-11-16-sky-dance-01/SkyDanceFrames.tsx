// Sky Dance design frames: the Blender backgrounds (type A) with the code-drawn Buddha and his line
// of light laid over them. Stills for the look check; nothing is animated yet.
//
// Needs, in the Remotion project's public/skydance/: S01.png, S04.png, S05.png (blender/sky_dance.py)
// and S01_obj.png, S04_obj.png (the same with --objects-only), so the line can pass behind clouds and
// the peak. Register one composition per shot:
//   <Composition id="SkyDanceS01" component={SkyDanceFrame} defaultProps={{shot: 'S01'}} durationInFrames={1} fps={24} width={1920} height={1080} />
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Grain} from '../design/GrainGradient';
import {Buddha, LOOKS, Look} from '../design/awakening/Buddha';
import {DancerLook, POSES, SkyDancer, handTips} from './SkyDancer';

const ACCENT = '#ffb347';
const LOOK: DancerLook = {skin: '#f2d9bd', skinSh: '#b79bb8', robe: ACCENT, robeSh: '#e07f2a', hair: '#1c2550', hairSh: '#121838', line: '#1c2550'};
// the seated figure from the design kit, recoloured to this palette with the thin clear line
const seatedLook = (scale: number): Look => ({...LOOKS.dawn, skin: LOOK.skin, skinSh: LOOK.skinSh, skinHi: '#ffffff', robe: ACCENT, robeSh: LOOK.robeSh, robe2: ACCENT, trim: '#f6f3e7', hair: LOOK.hair, hairHi: '#2b3f78', line: LOOK.line, lw: 2.5 / scale, sh: 20, rim: 0, ush: 1, curl: 0.5, ear: 1, urna: 1, urnaCol: '#f6f3e7', lotus: 0});

// The line of light: the one soft thing in the frame. A blurred copy underneath, a crisp line on top.
const LightLine: React.FC<{d: string; width?: number; fill?: boolean}> = ({d, width = 7, fill}) => (
  <g>
    <path d={d} fill={fill ? ACCENT : 'none'} stroke={ACCENT} strokeWidth={fill ? 10 : width * 3.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} filter="url(#sd-glow)" />
    <path d={d} fill={fill ? ACCENT : 'none'} stroke={ACCENT} strokeWidth={fill ? 0 : width} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const Defs = () => (
  <defs>
    <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="11" /></filter>
  </defs>
);
const Layer: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute'}}><Defs />{children}</svg>
);
const Bg: React.FC<{file: string}> = ({file}) => <Img src={staticFile(`skydance/${file}`)} style={{position: 'absolute', width: 1920, height: 1080}} />;

export const SkyDanceFrame: React.FC<{shot: 'S01' | 'S04' | 'S05'}> = ({shot}) => {
  if (shot === 'S01') {
    // he has just risen out of the cloud deck, one arm lifted; a short trail of light leads back down into it
    const at: [number, number] = [1010, 440], s = 0.82;
    return (
      <AbsoluteFill>
        <Bg file="S01.png" />
        <Layer><LightLine d={`M ${at[0] - 20} ${at[1] + 170} C ${at[0] - 110} ${at[1] + 290} ${at[0] + 60} ${at[1] + 360} ${at[0] - 70} ${at[1] + 520}`} width={6} /></Layer>
        <Bg file="S01_obj.png" />
        <Layer><g transform={`translate(${at[0]} ${at[1]})`}><SkyDancer pose={POSES.rise} look={LOOK} scale={s} /></g></Layer>
        <Grain amount={0.08} />
      </AbsoluteFill>
    );
  }
  if (shot === 'S04') {
    // still as the mountain: he sits in the air, his outline echoing the peak; the line has gone once around it
    const at: [number, number] = [520, 600], s = 0.5;
    const cx = 1075, cy = 400, rx = 470, ry = 96;
    return (
      <AbsoluteFill>
        <Bg file="S04.png" />
        <Layer><LightLine d={`M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx - rx} ${cy}`} width={6} /></Layer>
        <Bg file="S04_obj.png" />
        <Layer>
          <LightLine d={`M ${at[0] + 20} ${at[1] + 80} C ${at[0] + 150} ${at[1] + 40} ${cx - rx - 30} ${cy + 140} ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`} />
          <g transform={`translate(${at[0]} ${at[1]}) scale(${s})`}><Buddha look={seatedLook(s)} pose={{mudra: 'dhyana', eye: 0}} seat={false} /></g>
        </Layer>
        <Grain amount={0.08} />
      </AbsoluteFill>
    );
  }
  // S05: arms open over the sea; the line runs along the water to the horizon, with his reflection on it
  const at: [number, number] = [960, 470], s = 0.86;
  const horizon = 302;
  return (
    <AbsoluteFill>
      <Bg file="S05.png" />
      <Layer>
        <LightLine fill d={`M 934 1080 L 986 1080 L 962.5 ${horizon} L 957.5 ${horizon} Z`} />
        {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={960 + (i % 2 ? 26 : -22) * (1 - i * 0.12)} cy={800 + i * 46} rx={110 - i * 14} ry={10 - i} fill={ACCENT} opacity={0.9 - i * 0.12} />)}
        <g transform={`translate(${at[0]} ${at[1]})`}><SkyDancer pose={POSES.ocean} look={LOOK} scale={s} /></g>
      </Layer>
      <Grain amount={0.08} />
    </AbsoluteFill>
  );
};
