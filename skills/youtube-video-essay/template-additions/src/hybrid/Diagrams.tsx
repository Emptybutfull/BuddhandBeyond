// Explainer graphics. Both fill whatever box they are given, so they work full screen
// or as the `children` of a side-mode PresenterShot.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Rotating dial whose segments light up as they are named (Scipio's Yuga wheel).
// Six realms, twelve links, four truths, eightfold path, five aggregates …
// `schedule`: [{at: frame, index}] — take the frames from the word timings of voice.wav.
export const WheelDiagram: React.FC<{
  segments: string[];
  weights?: number[];
  schedule?: {at: number; index: number}[];
  center?: string;
  title?: string;
  speed?: number; // deg per second
}> = ({segments, weights, schedule = [], center, title, speed = 3}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rot = (frame / fps) * speed;
  const draw = interpolate(frame, [0, 28], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const w = weights ?? segments.map(() => 1);
  const total = w.reduce((a, b) => a + b, 0);
  const cur = [...schedule].reverse().find((e) => e.at <= frame);
  const prev = cur ? [...schedule].reverse().find((e) => e.at < cur.at) : undefined;
  const fadeIn = cur ? interpolate(frame, [cur.at, cur.at + 8], [0, 1], clamp) : 0;
  const level = (k: number) => (cur?.index === k ? fadeIn : prev?.index === k ? 1 - fadeIn : 0);

  const r0 = 170;
  const r1 = 380;
  const pt = (r: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [500 + r * Math.cos(a), 500 + r * Math.sin(a)];
  };
  let acc = 0;
  const arcs = segments.map((label, k) => {
    const a0 = (acc / total) * 360 + 0.8;
    acc += w[k];
    const a1 = (acc / total) * 360 - 0.8;
    const large = a1 - a0 > 180 ? 1 : 0;
    const [x0, y0] = pt(r1, a0);
    const [x1, y1] = pt(r1, a1);
    const [x2, y2] = pt(r0, a1);
    const [x3, y3] = pt(r0, a0);
    const d = `M ${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
    return {label, d, mid: (a0 + a1) / 2};
  });

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, #1a2036 0%, ${colors.night} 70%)`}}>
      <svg viewBox="0 0 1000 1000" style={{width: '100%', height: '100%'}}>
        {title && (
          <text x={500} y={62} textAnchor="middle" fill={colors.gold} fontFamily={fonts.sans} fontSize={30} letterSpacing={8} opacity={draw}>
            {title.toUpperCase()}
          </text>
        )}
        <g transform={`rotate(${rot} 500 500)`}>
          <circle cx={500} cy={500} r={r1 + 26} fill="none" stroke={colors.goldSoft} strokeWidth={1.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          {arcs.map((a, k) => {
            const L = level(k);
            const [lx, ly] = pt((r0 + r1) / 2, a.mid);
            const lines = a.label.split('\n');
            return (
              <g key={k}>
                <path
                  d={a.d}
                  fill={colors.gold}
                  fillOpacity={0.05 + 0.3 * L}
                  stroke={L > 0 ? colors.gold : colors.goldSoft}
                  strokeWidth={1.5 + 2 * L}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - draw}
                  style={{filter: L > 0 ? `drop-shadow(0 0 ${12 * L}px ${colors.gold})` : undefined}}
                />
                <g transform={`rotate(${-rot} ${lx} ${ly})`} opacity={draw}>
                  {lines.map((ln, i) => (
                    <text
                      key={i}
                      x={lx}
                      y={ly + (i - (lines.length - 1) / 2) * 30 + 9}
                      textAnchor="middle"
                      fill={L > 0.5 ? colors.bone : 'rgba(239,230,210,0.62)'}
                      fontFamily={fonts.sans}
                      fontSize={segments.length > 8 ? 20 : 26}
                      letterSpacing={2}
                    >
                      {ln.toUpperCase()}
                    </text>
                  ))}
                </g>
              </g>
            );
          })}
        </g>
        <circle cx={500} cy={500} r={r0 - 22} fill={colors.ink} stroke={colors.gold} strokeWidth={1.5} opacity={draw} />
        {center && (
          <text x={500} y={512} textAnchor="middle" fill={colors.bone} fontFamily={fonts.serif} fontWeight={600} fontSize={40} letterSpacing={4} opacity={draw}>
            {center.toUpperCase()}
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};

// Two-column "Rosetta stone" (AmuraKa): what we say ↔ what the teaching means.
// Rows reveal one at a time; time `startAt`/`every` to the voice.
export const CompareTable: React.FC<{
  leftTitle: string;
  rightTitle: string;
  rows: [string, string][];
  joiner?: string;
  startAt?: number;
  every?: number;
}> = ({leftTitle, rightTitle, rows, joiner = '≈', startAt = 10, every = 24}) => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [0, 10], [0, 1], clamp);
  const cell: React.CSSProperties = {fontFamily: fonts.serif, fontWeight: 500, fontSize: '3.6cqw', color: colors.bone, flex: 1};
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, #1a2036 0%, ${colors.night} 70%)`, containerType: 'inline-size', justifyContent: 'center', padding: '0 7cqw'}}>
      <div style={{display: 'flex', opacity: head, fontFamily: fonts.sans, fontSize: '1.7cqw', letterSpacing: '0.3em', color: colors.gold, textTransform: 'uppercase', marginBottom: '2.4cqw'}}>
        <div style={{flex: 1, textAlign: 'right'}}>{leftTitle}</div>
        <div style={{width: '9cqw'}} />
        <div style={{flex: 1}}>{rightTitle}</div>
      </div>
      {rows.map(([l, r], i) => {
        const at = startAt + i * every;
        const o = interpolate(frame, [at, at + 10], [0, 1], clamp);
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', opacity: o, transform: `translateY(${(1 - o) * 10}px)`, borderTop: `1px solid ${colors.goldSoft}`, padding: '1.5cqw 0'}}>
            <div style={{...cell, textAlign: 'right'}}>{l}</div>
            <div style={{width: '9cqw', textAlign: 'center', color: colors.gold, fontFamily: fonts.serif, fontSize: '3.6cqw'}}>{joiner}</div>
            <div style={{...cell, fontStyle: 'italic'}}>{r}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
