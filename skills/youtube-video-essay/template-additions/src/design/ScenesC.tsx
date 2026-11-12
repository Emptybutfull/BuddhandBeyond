// Showcase scenes 10–13: Steven in a window, the glow figure, the lotus poster, the palette board.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {PresenterPlaceholder} from '../hybrid/Placeholders';
import {Figure} from './Figure';
import {Grain, GrainGradient} from './GrainGradient';
import {Corner, Heavy, Micro, Rise, Soft, Stagger, Wide} from './Type';
import {easeInOut, easeOut} from './noise';
import {bone, flats, fonts, ink, ramps, vermilion} from './tokens';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ───────────────────────── 10. Steven, natural, in a window (frame within frame) ─────────────────────────
// Swap <PresenterPlaceholder /> for <OffthreadVideo src={staticFile('camera_cut.mp4')} muted … /> on a real video.
export const TalkFrameScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const t = frame / fps;
  const cycle = 6; // 2.4 s in, 3.6 s out, shortened for the demo
  const ph = (t % cycle) / cycle;
  const breath = ph < 0.4 ? easeInOut(ph / 0.4) : 1 - easeInOut((ph - 0.4) / 0.6);
  const rows = ['IN — FOUR', 'REST — TWO', 'OUT — SIX'];
  const open = easeOut(frame / 20);
  return (
    <GrainGradient ramp={ramps.jadeAura} kind="aura" focus={[0.8, 0.66]} scale={0.9 + 0.22 * breath} gain={0.72} seed={5}>
      <div style={{position: 'absolute', left: 96, top: 150, width: 760, height: 780, borderRadius: 28, overflow: 'hidden', border: `2px solid rgba(233,226,210,0.5)`, boxShadow: '0 40px 100px rgba(0,0,0,0.5)', transform: `translateY(${(1 - open) * 50}px) scale(${0.96 + 0.04 * open})`, opacity: open}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + frame * 0.0005})`, filter: 'sepia(0.14) saturate(0.85) contrast(1.06)'}}>
          <PresenterPlaceholder label="" />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '70px 34px 30px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))'}}>
          <Soft size={44}>
            <Stagger text="you don't have to stop the thoughts" at={40} every={7} />
          </Soft>
        </div>
      </div>
      <Corner pos="tl">{'010 — STEVEN, NATURAL, IN A WINDOW'}</Corner>
      <Corner pos="tr">{'EMPTY BUT FULL\nCH. IV / VII'}</Corner>
      <div style={{position: 'absolute', left: 960, top: 210, width: W - 960 - 96}}>
        <Wide size={104} color="#f2e6b1">
          <Stagger text="JUST" by="letter" at={12} every={2} />
          <br />
          <Stagger text="THIS" by="letter" at={22} every={2} />
          <br />
          <Stagger text="BREATH" by="letter" at={32} every={2} />
        </Wide>
        <div style={{marginTop: 46}}>
          {rows.map((r, i) => {
            const at = 56 + i * 26;
            const p = interpolate(frame, [at, at + 10], [0, 1], clamp);
            return (
              <div key={r} style={{display: 'flex', gap: 28, alignItems: 'baseline', borderTop: '1.5px solid rgba(242,230,177,0.45)', padding: '16px 0', opacity: p, transform: `translateX(${(1 - p) * 24}px)`}}>
                <Micro size={24} color="#a8e3c3">{`0${i + 1}`}</Micro>
                <Micro size={30} color={bone}>{r}</Micro>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 26, height: 6, borderRadius: 3, background: 'rgba(242,230,177,0.2)'}}>
          <div style={{height: 6, borderRadius: 3, width: `${breath * 100}%`, background: '#f2e6b1'}} />
        </div>
      </div>
    </GrainGradient>
  );
};

// ───────────────────────── 11. The glow figure ─────────────────────────
export const LuminousScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const on = easeOut((frame - 6) / 50);
  const pulse = 1 + 0.03 * Math.sin(frame * 0.07);
  const fx = W * 0.64, fy = H * 0.5;
  return (
    <GrainGradient ramp={ramps.dawn} kind="horizon" focus={[0.64, 0.8]} gain={0.55 + 0.25 * on} seed={12} grain={0.5}>
      {/* anamorphic streak and prism ghosts */}
      <div style={{position: 'absolute', left: fx - W * 0.55, top: fy - 3, width: W * 1.1, height: 6, background: 'linear-gradient(90deg, transparent, rgba(160,200,255,0.0) 10%, rgba(255,255,255,0.9) 50%, rgba(255,180,160,0.0) 90%, transparent)', filter: 'blur(3px)', opacity: on}} />
      {[
        [-0.34, 46, '#7fd1ff'],
        [-0.2, 28, '#ffd27a'],
        [0.26, 70, '#ff8fb0'],
        [0.4, 34, '#9affc7'],
      ].map(([dx, r, c], i) => (
        <div key={i} style={{position: 'absolute', left: fx + (dx as number) * W - (r as number), top: fy + (dx as number) * 120 - (r as number), width: (r as number) * 2, height: (r as number) * 2, borderRadius: '50%', border: `3px solid ${c}`, filter: 'blur(5px)', opacity: 0.4 * on, mixBlendMode: 'screen'}} />
      ))}
      <div style={{position: 'absolute', left: fx - H * 0.42, top: H * 0.12, width: H * 0.84, height: H * 0.84, opacity: on, transform: `scale(${pulse})`, mixBlendMode: 'screen'}}>
        <Figure mode="light" />
      </div>
      <Corner pos="tl">{'011\nPABHASSARA — THE LUMINOUS MIND'}</Corner>
      <div style={{position: 'absolute', left: 96, top: H * 0.36, width: W * 0.4}}>
        <Soft size={104}>
          <Stagger text="Luminous, monks," at={30} every={8} dur={18} />
          <br />
          <Stagger text="is the mind." at={62} every={8} dur={18} />
        </Soft>
        <Rise at={100}>
          <Micro style={{marginTop: 30}}>AṄGUTTARA NIKĀYA 1.49–52</Micro>
        </Rise>
      </div>
    </GrainGradient>
  );
};

// ───────────────────────── 12. Poster with band: the lotus ─────────────────────────
const petalPath = (len: number, wid: number) => `M 0 0 C ${wid * 0.55} ${-len * 0.25}, ${wid * 0.6} ${-len * 0.7}, 0 ${-len} C ${-wid * 0.6} ${-len * 0.7}, ${-wid * 0.55} ${-len * 0.25}, 0 0 Z`;

export const LotusScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const cyan = flats.cyanPoster.ground;
  const band = 232;
  const open = easeOut((frame - 16) / 70);
  const bandIn = easeOut(frame / 16);
  const cx = W * 0.54, base = H * 0.74;
  const layers = [
    {n: 9, spread: 78, len: 400, wid: 180, fill: '#f6b3a6'},
    {n: 7, spread: 56, len: 365, wid: 192, fill: '#f08a78'},
    {n: 5, spread: 34, len: 320, wid: 198, fill: '#e2512a'},
    {n: 3, spread: 15, len: 272, wid: 180, fill: '#c9381c'},
  ];
  return (
    <AbsoluteFill style={{background: cyan, overflow: 'hidden'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <line x1="0" y1="0" x2="0" y2="7" stroke={ink} strokeWidth="1.1" opacity="0.28" />
          </pattern>
        </defs>
        {/* stem and leaves */}
        <path d={`M ${cx} ${base} C ${cx - 30} ${base + 120}, ${cx + 40} ${H - 90}, ${cx + 10} ${H + 20}`} stroke="#1f6b3a" strokeWidth={16} fill="none" strokeLinecap="round" />
        {[
          [-330, 150, 210, 64, -8],
          [300, 190, 180, 56, 10],
        ].map(([dx, dy, rx, ry, rot], i) => (
          <g key={i} transform={`translate(${cx + dx} ${base + dy}) rotate(${rot}) scale(${0.6 + 0.4 * open})`}>
            <ellipse rx={rx} ry={ry} fill="#2a8a4a" stroke={ink} strokeWidth={3} />
            <ellipse rx={rx} ry={ry} fill="url(#hatch)" />
            {Array.from({length: 9}, (_, k) => {
              const a = (k / 9) * Math.PI * 2;
              return <line key={k} x1={0} y1={0} x2={Math.cos(a) * rx * 0.92} y2={Math.sin(a) * ry * 0.92} stroke="#14532b" strokeWidth={2} />;
            })}
          </g>
        ))}
        {/* petals, back row first; they open from a closed bud */}
        {layers.map((l, li) => (
          <g key={li} transform={`translate(${cx} ${base})`}>
            {Array.from({length: l.n}, (_, k) => {
              const a = (-l.spread + (2 * l.spread * k) / (l.n - 1)) * (0.12 + 0.88 * open);
              return (
                <g key={k} transform={`rotate(${a})`}>
                  <path d={petalPath(l.len * (0.8 + 0.2 * open), l.wid)} fill={l.fill} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
                  <path d={petalPath(l.len * (0.8 + 0.2 * open), l.wid)} fill="url(#hatch)" />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      {/* header band with heavy kanji, like the reference poster */}
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: band, background: bone, transform: `translateY(${(bandIn - 1) * band}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 72px', boxSizing: 'border-box'}}>
        <div style={{fontFamily: fonts.kanji, fontWeight: 800, fontSize: 176, color: ink, letterSpacing: '0.12em', lineHeight: 1}}>蓮華</div>
        <div style={{textAlign: 'right'}}>
          <Heavy size={92} color={ink}>
            No mud,
            <br />
            no lotus.
          </Heavy>
        </div>
      </div>
      <div style={{position: 'absolute', left: 72, bottom: 64, background: '#fff', padding: '16px 10px', fontFamily: fonts.kanji, fontWeight: 800, fontSize: 40, color: ink, writingMode: 'vertical-rl', letterSpacing: '0.1em', opacity: interpolate(frame, [40, 52], [0, 1], clamp)}}>泥中の蓮</div>
      <Corner pos="br" color={ink}>{'012\nPOSTER WITH BAND'}</Corner>
      <Grain amount={0.22} blend="multiply" />
    </AbsoluteFill>
  );
};

// ───────────────────────── 13. The palette board ─────────────────────────
export const PaletteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const rows: [string, string[], string][] = [
    ['THERMAL', ramps.thermal, 'openers · craving · the mind heating up'],
    ['LAPIS FIRE', ramps.lapisFire, 'emptiness · cosmos · deity sections'],
    ['JADE AURA', ramps.jadeAura, 'compassion · breath · practice'],
    ['PLUM EMBER', ramps.plumEmber, 'attachment · emotion'],
    ['DAWN', ramps.dawn, 'the path · awakening · endings'],
    ['ASH', ramps.ash, 'impermanence · silence'],
  ];
  const chips: [string, string, string][] = [
    ['COBALT PRINT', flats.cobalt.ground, bone],
    ['SIGNAL RED', flats.signalRed.ground, ink],
    ['CYAN POSTER', flats.cyanPoster.ground, ink],
    ['BONE PAPER', flats.bonePaper.ground, flats.bonePaper.ink],
  ];
  return (
    <AbsoluteFill style={{background: '#0b0a0c'}}>
      <Corner pos="tl">{'013\nCHAPTER PALETTES — ONE PER CHAPTER'}</Corner>
      <Corner pos="tr">{'EMPTY BUT FULL\nDESIGN SYSTEM 1.0'}</Corner>
      <div style={{position: 'absolute', left: 96, top: 170, width: W - 192}}>
        {rows.map(([name, ramp, use], i) => {
          const p = easeOut((frame - 6 - i * 5) / 16);
          return (
            <div key={name} style={{display: 'flex', alignItems: 'center', gap: 28, marginBottom: 16, opacity: p, transform: `translateX(${(1 - p) * -40}px)`}}>
              <Micro size={22} style={{width: 190}}>{name}</Micro>
              <div style={{flex: 1, height: 74, borderRadius: 10, background: `linear-gradient(90deg, ${ramp.join(', ')})`, transform: `scaleX(${p})`, transformOrigin: 'left'}} />
              <Micro size={18} style={{width: 420, opacity: 0.75}}>{use}</Micro>
            </div>
          );
        })}
        <div style={{display: 'flex', gap: 18, marginTop: 30}}>
          {chips.map(([name, bg, fg], i) => {
            const p = easeOut((frame - 44 - i * 5) / 14);
            return (
              <div key={name} style={{flex: 1, height: 150, borderRadius: 10, background: bg, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
                <Micro size={18} color={fg}>{name}</Micro>
                <Heavy size={56} color={i === 3 ? vermilion : fg} style={{textTransform: 'none'}}>Aa</Heavy>
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 34, whiteSpace: 'nowrap'}}>
          <Rise at={70}>
            <Wide size={46}>Unbounded</Wide>
          </Rise>
          <Rise at={76}>
            <Heavy size={60}>Jost Black</Heavy>
          </Rise>
          <Rise at={82}>
            <Soft size={56}>Instrument Serif</Soft>
          </Rise>
          <Rise at={88}>
            <Micro size={21}>JETBRAINS MONO 001</Micro>
          </Rise>
          <Rise at={94}>
            <div style={{fontFamily: fonts.kanji, fontWeight: 800, fontSize: 50, color: bone}}>空 無常 中道</div>
          </Rise>
        </div>
      </div>
      <Grain amount={0.4} />
    </AbsoluteFill>
  );
};
