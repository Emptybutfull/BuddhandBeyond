// Showcase scenes 5–9: twelve links (print), middle way (diptych), NO SELF (punch cut-out),
// meme reprint, film frame card.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Figure} from './Figure';
import {Grain, GrainGradient} from './GrainGradient';
import {Halftone} from './Halftone';
import {MediaCard} from './MediaCard';
import {Corner, Heavy, Micro, Rise, Slam, Soft, Stagger, Wide} from './Type';
import {easeInOut, easeOut, simplex3} from './noise';
import {bone, cobalt, flats, fonts, gold, ink, ramps, vermilion} from './tokens';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const paper = '#e4ddcd';

// ───────────────────────── 5. Dependent origination: a two-ink data plate ─────────────────────────
const LINKS = ['Ignorance', 'Formations', 'Consciousness', 'Name & form', 'Six senses', 'Contact', 'Feeling', 'Craving', 'Clinging', 'Becoming', 'Birth', 'Aging & death'];

export const TwelveLinksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const cx = W * 0.665, cy = H * 0.52, R = H * 0.31;
  const step = 11; // frames per link
  const head = (frame - 24) / step; // which link is lit (fractional)
  const draw = interpolate(frame, [4, 30], [0, 1], clamp);
  const pos = (k: number, r = R) => {
    const a = (k / 12) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  };
  const spin = frame * 0.05;
  return (
    <AbsoluteFill style={{background: paper}}>
      {/* halftone sun behind the wheel */}
      <div style={{position: 'absolute', left: cx - R * 1.05, top: cy - R * 1.05, width: R * 2.1, height: R * 2.1, opacity: 0.5 * draw}}>
        <Halftone ink={vermilion} cell={13} contrast={1} brightness={1}>
          <div style={{width: R * 2.1, height: R * 2.1, background: 'radial-gradient(circle, #000 0%, #9a9a9a 38%, #fff 68%)'}} />
        </Halftone>
      </div>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <g transform={`rotate(${spin} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={R * 1.18} fill="none" stroke={cobalt} strokeWidth={1.5} strokeDasharray="2 9" opacity={draw} />
        </g>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={cobalt} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform={`rotate(-90 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={R * 0.52} fill={paper} stroke={cobalt} strokeWidth={1.5} opacity={draw} />
        {LINKS.map((name, k) => {
          const [x, y] = pos(k);
          const [lx, ly] = pos(k, R * 1.3);
          const lit = Math.max(0, 1 - Math.abs(((head % 12) + 12) % 12 - k)) * (head >= 0 ? 1 : 0);
          const passed = head >= k ? 1 : 0;
          const right = Math.cos((k / 12) * Math.PI * 2 - Math.PI / 2) > 0.2;
          const left = Math.cos((k / 12) * Math.PI * 2 - Math.PI / 2) < -0.2;
          const show = interpolate(frame, [14 + k * 2, 24 + k * 2], [0, 1], clamp);
          return (
            <g key={k} opacity={show}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={cobalt} strokeWidth={1} opacity={0.25} />
              <circle cx={x} cy={y} r={9 + 13 * lit} fill={lit > 0.05 ? vermilion : passed ? cobalt : paper} stroke={cobalt} strokeWidth={2.5} />
              <text x={lx} y={ly - 6} textAnchor={right ? 'start' : left ? 'end' : 'middle'} fontFamily={fonts.mono} fontWeight={500} fontSize={19} letterSpacing={1.6} fill={lit > 0.3 ? vermilion : cobalt}>
                {String(k + 1).padStart(2, '0')}
              </text>
              <text x={lx} y={ly + 18} textAnchor={right ? 'start' : left ? 'end' : 'middle'} fontFamily={fonts.mono} fontWeight={500} fontSize={19} letterSpacing={1.6} fill={lit > 0.3 ? vermilion : cobalt}>
                {name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{position: 'absolute', left: cx - R * 0.42, top: cy - 48, width: R * 0.84, textAlign: 'center'}}>
        <Rise at={30}>
          <Soft size={46} color={cobalt}>
            when this is,
            <br />
            that is.
          </Soft>
        </Rise>
      </div>
      <Corner pos="tl" color={cobalt}>{'005\nPAṬICCA-SAMUPPĀDA'}</Corner>
      <div style={{position: 'absolute', left: 64, top: 170, padding: '14px 10px', background: vermilion, color: paper, fontFamily: fonts.kanji, fontWeight: 800, fontSize: 64, lineHeight: 1.05, writingMode: 'vertical-rl'}}>縁起</div>
      <div style={{position: 'absolute', left: 64, bottom: 64}}>
        <Wide size={92} color={cobalt}>
          <Stagger text="DEPENDENT" by="letter" at={8} every={1} />
        </Wide>
        <Wide size={92} color={cobalt}>
          <Stagger text="ORIGINATION" by="letter" at={18} every={1} />
        </Wide>
        <Rise at={40}>
          <Micro color={vermilion} style={{marginTop: 18}}>
            {'TWELVE LINKS · EACH ONE LIGHTS THE NEXT'}
          </Micro>
        </Rise>
      </div>
      <Grain amount={0.22} blend="multiply" />
    </AbsoluteFill>
  );
};

// ───────────────────────── 6. The Middle Way: hot | cold, one string ─────────────────────────
const cold = ['#06080f', '#0f2a5e', '#1b6fa8', '#7fd1e0', '#e8f6f2'];

export const MiddleWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H, fps} = useVideoConfig();
  const t = frame / fps;
  // three states of the string: too tight (0–1.8 s), too loose (1.8–3.6 s), tuned (3.6 s →)
  const toLoose = easeInOut((frame - 54) / 16);
  const toTuned = easeInOut((frame - 108) / 18);
  const y0 = 150, y1 = H - 40;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const p = i / 120;
    const y = y0 + (y1 - y0) * p;
    const tight = 5 * Math.sin(p * Math.PI * 9) * Math.sin(t * 95) + 2.5 * simplex3(p * 30, t * 30, 1);
    const loose = 150 * Math.sin(p * Math.PI) * (0.82 + 0.18 * Math.sin(t * 2.2)) + 14 * Math.sin(p * Math.PI * 2 + t * 3);
    const tuned = (46 * Math.sin(p * Math.PI) * Math.cos(t * 22) + 14 * Math.sin(p * Math.PI * 2) * Math.cos(t * 44)) * Math.exp(-Math.max(0, t - 3.8) * 0.5);
    const off = -60 * (1 - toLoose) + 0; // tight string leans into the hot side
    const x = W / 2 + (tight + off) * (1 - toLoose) + loose * toLoose * (1 - toTuned) + tuned * toTuned;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const label = (text: string, show: number, hide: number) => interpolate(frame, [show, show + 10, hide, hide + 10], [0, 1, 1, 0.25], clamp);
  return (
    <AbsoluteFill style={{background: ink}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: W / 2, height: H, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}>
          <GrainGradient ramp={ramps.plumEmber} kind="flow" seed={3} heat={0.12} grain={0} speed={1.4} />
        </div>
      </div>
      <div style={{position: 'absolute', left: W / 2, top: 0, width: W / 2, height: H, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: -W / 2, top: 0, width: W, height: H}}>
          <GrainGradient ramp={cold} kind="flow" seed={8} heat={-0.05} grain={0} speed={0.7} />
        </div>
      </div>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, filter: `drop-shadow(0 0 ${6 + 14 * toTuned}px ${gold})`}}>
        <polyline points={pts.join(' ')} fill="none" stroke="#f6dc9a" strokeWidth={3.5} strokeLinecap="round" />
        <circle cx={W / 2} cy={y0} r={9} fill="#f6dc9a" />
      </svg>
      <div style={{position: 'absolute', top: 34, left: 0, width: W, textAlign: 'center', fontFamily: fonts.kanji, fontWeight: 800, fontSize: 92, color: bone, letterSpacing: '0.3em', marginLeft: '0.15em'}}>中道</div>
      <Corner pos="tl">{'006\nTHE MIDDLE WAY'}</Corner>
      <Corner pos="tr">{'THE LUTE STRING\nSOṆA SUTTA · AN 6.55'}</Corner>
      <div style={{position: 'absolute', left: 64, bottom: 64, opacity: label('', 8, 54)}}>
        <Heavy size={120}>
          Too tight,
          <br />
          it snaps.
        </Heavy>
      </div>
      <div style={{position: 'absolute', right: 64, bottom: 64, textAlign: 'right', opacity: label('', 60, 108)}}>
        <Heavy size={120}>
          Too loose,
          <br />
          no sound.
        </Heavy>
      </div>
      <div style={{position: 'absolute', left: 0, width: W, top: H * 0.44, textAlign: 'center'}}>
        <Rise at={118}>
          <Wide size={84} color="#f6dc9a" style={{textShadow: '0 4px 40px rgba(0,0,0,0.5)'}}>
            Tuned, it sings
          </Wide>
        </Rise>
      </div>
      <Grain amount={0.45} />
    </AbsoluteFill>
  );
};

// ───────────────────────── 7. Punch cut-out: NO SELF ─────────────────────────
export const NoSelfScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const zoom = 1 + frame * 0.00022;
  const jx = frame % 4 < 2 ? 0 : 1.5; // print misregistration, on twos
  return (
    <AbsoluteFill style={{background: paper, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        {frame >= 6 && (
          <div style={{position: 'absolute', left: W * 0.36 + jx, top: H * 0.03, width: H * 1.02, height: H * 1.02}}>
            <Halftone ink={cobalt} cell={10} contrast={1.25} brightness={1.12}>
              <div style={{width: H * 1.02, height: H * 1.02}}>
                <Figure mode="shaded" />
              </div>
            </Halftone>
          </div>
        )}
        <div style={{position: 'absolute', left: 56, top: H * 0.34, mixBlendMode: 'multiply'}}>
          <Slam at={14}>
            <Heavy size={470} color={vermilion} style={{lineHeight: 0.8}}>
              No
            </Heavy>
          </Slam>
          <Slam at={24}>
            <Heavy size={470} color={vermilion} style={{lineHeight: 0.8}}>
              Self
            </Heavy>
          </Slam>
        </div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 56, display: 'flex', gap: 48}}>
        <Micro color={vermilion}>{'EBF\n0007'}</Micro>
        <Micro color={vermilion}>{'ERROR /404\nNO SELF WAS FOUND'}</Micro>
      </div>
      <Corner pos="tr" color={cobalt}>{'007\nANATTĀ'}</Corner>
      <Grain amount={0.25} blend="multiply" />
    </AbsoluteFill>
  );
};

// ───────────────────────── 8. A meme, reprinted ─────────────────────────
export const MemeScene: React.FC<{src?: string}> = ({src = 'cat.png'}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const red = flats.signalRed.ground;
  const w = H * 1.05;
  return (
    <AbsoluteFill style={{background: red, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: W * 0.56 - w / 2, top: H * 0.54 - (w * 0.665) / 2, width: w, transform: `scale(${1 + frame * 0.0004})`}}>
        <Halftone ink={ink} cell={9} contrast={1.35} brightness={1.4}>
          <Img src={staticFile(src)} style={{width: w, display: 'block', WebkitMaskImage: 'radial-gradient(ellipse 50% 52% at 50% 48%, #000 55%, transparent 100%)'}} />
        </Halftone>
      </div>
      <div style={{position: 'absolute', left: 56, top: 44}}>
        <Slam at={8}>
          <Heavy size={176} color={ink}>
            No
            <br />
            thoughts.
          </Heavy>
        </Slam>
      </div>
      <div style={{position: 'absolute', right: 56, bottom: 40, textAlign: 'right'}}>
        <Slam at={34} style={{transformOrigin: 'right bottom'}}>
          <Heavy size={190} color={ink}>
            Head empty
          </Heavy>
        </Slam>
        <Slam at={54} style={{transformOrigin: 'right bottom'}}>
          <Heavy size={190} color={bone}>
            (but full).
          </Heavy>
        </Slam>
      </div>
      <Corner pos="tr" color={ink}>008</Corner>
      <Corner pos="bl" color={ink}>{'A MEME, REPRINTED\nONE INK · OUR WORDS · PHOTO CC0'}</Corner>
      <Grain amount={0.28} blend="multiply" />
    </AbsoluteFill>
  );
};

// ───────────────────────── 9. Quoting a film ─────────────────────────
export const FilmCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width: W, height: H} = useVideoConfig();
  const rules = ['ABOUT IT', 'SHORT', 'MUTED', 'FRAMED', 'CREDITED'];
  const slide = easeOut(frame / 18);
  return (
    <GrainGradient ramp={ramps.dawn} kind="horizon" focus={[0.3, 0.72]} gain={0.8} seed={6}>
      <div style={{position: 'absolute', left: 96, top: H * 0.5 - 300, transform: `translateY(${(1 - slide) * 60}px)`, opacity: slide}}>
        <MediaCard credit={'THE MATRIX · 1999 · DIR. THE WACHOWSKIS · WARNER BROS.'} width={860} placeholder={'FILM CLIP GOES HERE\n3–8 S · PICTURE ONLY'} />
      </div>
      <Corner pos="tr">{'009\nQUOTING A FILM'}</Corner>
      <div style={{position: 'absolute', left: 1040, top: H * 0.5 - 250, width: W - 1040 - 80}}>
        <Heavy size={136}>
          <Stagger text="There is" at={16} every={5} />
          <br />
          <Stagger text="no spoon." at={28} every={5} />
        </Heavy>
        <Rise at={56}>
          <Soft size={58} color="#f8d77a" style={{marginTop: 30}}>
            It is not the spoon that bends.
          </Soft>
        </Rise>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 44}}>
          {rules.map((r, i) => {
            const p = interpolate(frame, [84 + i * 7, 92 + i * 7], [0, 1], clamp);
            return (
              <div key={r} style={{border: `1.5px solid ${bone}`, borderRadius: 999, padding: '8px 16px', opacity: p, transform: `translateY(${(1 - p) * 10}px)`}}>
                <Micro size={19}>{`${r} ✓`}</Micro>
              </div>
            );
          })}
        </div>
      </div>
    </GrainGradient>
  );
};
