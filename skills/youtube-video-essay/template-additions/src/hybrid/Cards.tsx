// Title-type cards: chapter word, thesis question, quote, lower third.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Enso} from './Enso';
import {PatternBg, PatternKind} from './PatternBg';
import {colors, fonts} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// One huge word, smash-cut in (Scipio). Sound: sub-boom or bell on frame 0, music drops out ~1 s.
// Hold 2–3 s. `children` = darkened art behind; else a mandala draws itself in.
export const ChapterCard: React.FC<{
  word: string;
  index?: string; // "I", "II" … or "01"
  sub?: string;
  pattern?: PatternKind;
  children?: React.ReactNode;
}> = ({word, index, sub, pattern = 'mandala', children}) => {
  const frame = useCurrentFrame();
  const {width: W, fps} = useVideoConfig();
  const settle = interpolate(frame, [0, 10], [1.08, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const track = interpolate(frame, [0, 14], [0.32, 0.22], {...clamp, easing: Easing.out(Easing.cubic)});
  const rule = interpolate(frame, [3, 20], [0, W * 0.38], {...clamp, easing: Easing.out(Easing.cubic)});
  const size = Math.min(210, (W * 0.68) / (word.length * 0.84));
  return (
    <AbsoluteFill style={{background: colors.ink}}>
      {children ? (
        <AbsoluteFill style={{filter: 'brightness(0.32) saturate(0.7)', transform: `scale(${1.04 + frame / fps / 200})`}}>{children}</AbsoluteFill>
      ) : (
        <PatternBg kind={pattern} drawOn={1.2} opacity={0.22} speed={1.5} />
      )}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        {index && (
          <div style={{fontFamily: fonts.sans, color: colors.gold, fontSize: 30, letterSpacing: '0.5em', marginBottom: 18, opacity: interpolate(frame, [4, 14], [0, 1], clamp)}}>
            {index}
          </div>
        )}
        <div
          style={{
            fontFamily: fonts.serif,
            fontWeight: 600,
            fontSize: size,
            lineHeight: 1,
            color: colors.bone,
            letterSpacing: `${track}em`,
            marginRight: `-${track}em`, // keep optical centre with tracking
            textTransform: 'uppercase',
            transform: `scale(${settle})`,
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          {word}
        </div>
        <div style={{height: 2, width: rule, background: colors.gold, marginTop: 34}} />
        {sub && (
          <div style={{fontFamily: fonts.serifItalic, fontStyle: 'italic', fontSize: 40, color: colors.bone, marginTop: 24, opacity: interpolate(frame, [10, 22], [0, 0.85], clamp)}}>
            {sub}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The thesis question, word by word, over a faint ensō (AmuraKa's "So here's the question").
// Pass `wordFrames` (frame per word, from the transcript's word timings) to sync with the voice.
export const QuestionCard: React.FC<{
  text: string;
  highlight?: string[];
  wordFrames?: number[];
  perWord?: number;
  pattern?: PatternKind;
}> = ({text, highlight = [], wordFrames, perWord = 5, pattern = 'none'}) => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const words = text.split(' ');
  const hl = new Set(highlight.map((w) => w.toLowerCase()));
  return (
    <PatternBg kind={pattern} opacity={0.15}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <Enso size={760} drawFrames={40} opacity={0.14} color={colors.gold} />
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{maxWidth: W * 0.7, textAlign: 'center', fontFamily: fonts.serif, fontWeight: 500, fontSize: 84, lineHeight: 1.18, color: colors.bone}}>
          {words.map((w, i) => {
            const at = wordFrames?.[i] ?? 8 + i * perWord;
            const o = interpolate(frame, [at, at + 6], [0, 1], clamp);
            const key = w.toLowerCase().replace(/[^a-z']/g, '');
            return (
              <span key={i} style={{opacity: o, display: 'inline-block', transform: `translateY(${(1 - o) * 8}px)`, color: hl.has(key) ? colors.gold : undefined, marginRight: '0.25em'}}>
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </PatternBg>
  );
};

// Scripture / teacher quote. `paper` reads as a page from a sutra; `dark` sits in night scenes.
export const QuoteCard: React.FC<{quote: string; source: string; variant?: 'paper' | 'dark'}> = ({quote, source, variant = 'paper'}) => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const paper = variant === 'paper';
  const ink = paper ? '#1b1612' : colors.bone;
  const o = interpolate(frame, [0, 15], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        background: paper
          ? 'radial-gradient(ellipse at 50% 45%, #f1e8d4 0%, #e2d6bb 70%, #c9b994 100%)'
          : `radial-gradient(ellipse at 50% 45%, #1a2036 0%, ${colors.night} 60%, #07090f 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{maxWidth: W * 0.62, textAlign: 'center', opacity: o, transform: `translateY(${(1 - o) * 10}px)`}}>
        <div style={{fontFamily: fonts.serif, fontSize: 200, lineHeight: 0.6, color: paper ? colors.lacquer : colors.gold, opacity: 0.8}}>“</div>
        <div style={{fontFamily: fonts.serif, fontWeight: 500, fontSize: 74, lineHeight: 1.28, color: ink}}>{quote}</div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: paper ? colors.lacquer : colors.gold,
            marginTop: 40,
            opacity: interpolate(frame, [18, 30], [0, 1], clamp),
          }}
        >
          — {source}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Name of a teacher, text or place. Overlay it on art; 4–6 s.
export const LowerThird: React.FC<{title: string; sub?: string}> = ({title, sub}) => {
  const frame = useCurrentFrame();
  const {width: W, height: H, durationInFrames: dur} = useVideoConfig();
  const out = interpolate(frame, [dur - 10, dur], [1, 0], clamp);
  const line = interpolate(frame, [0, 14], [0, 420], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: H * 0.4, background: 'linear-gradient(transparent, rgba(0,0,0,0.78))'}} />
      <div style={{position: 'absolute', left: W * 0.06, bottom: H * 0.1, textShadow: '0 2px 14px rgba(0,0,0,0.85)'}}>
        <div style={{fontFamily: fonts.serif, fontWeight: 600, fontSize: 58, color: colors.bone, opacity: interpolate(frame, [6, 18], [0, 1], clamp)}}>{title}</div>
        <div style={{height: 2, width: line, background: colors.gold, margin: '10px 0 14px'}} />
        {sub && (
          <div style={{fontFamily: fonts.sans, fontSize: 26, letterSpacing: '0.24em', textTransform: 'uppercase', color: colors.gold, opacity: interpolate(frame, [12, 24], [0, 1], clamp)}}>
            {sub}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
