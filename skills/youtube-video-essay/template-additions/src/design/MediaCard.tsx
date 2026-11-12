// Film frame card: how borrowed film stills, clips and memes are quoted (references/memes-fair-use.md).
// Always in a frame, always with a credit line, never full-bleed.
//   <MediaCard credit="THE MATRIX · 1999 · DIR. THE WACHOWSKIS · WARNER BROS." width={900}>
//     <OffthreadVideo src={staticFile('clips/matrix_spoon.mp4')} muted />
//   </MediaCard>
// With no children it draws a labelled placeholder slot.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Micro} from './Type';
import {bone, ink} from './tokens';

type Props = {
  credit: string;
  width?: number;
  aspect?: number; // 16/9, 2.39, 4/3, 1
  color?: string; // frame and text colour
  seconds?: boolean; // show a small running counter (keeps us honest about clip length)
  placeholder?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const MediaCard: React.FC<Props> = ({credit, width = 900, aspect = 16 / 9, color = bone, seconds = true, placeholder = 'FILM STILL', children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const h = width / aspect;
  const holes = Math.floor(width / 46);
  const strip = (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 14px', height: 26, alignItems: 'center'}}>
      {Array.from({length: holes}, (_, i) => (
        <div key={i} style={{width: 18, height: 12, borderRadius: 3, background: color, opacity: 0.55}} />
      ))}
    </div>
  );
  return (
    <div style={{width, ...style}}>
      <div style={{background: ink, borderRadius: 10, padding: '6px 0', boxShadow: '0 30px 80px rgba(0,0,0,0.45)'}}>
        {strip}
        <div style={{position: 'relative', width, height: h, overflow: 'hidden', background: '#17171a'}}>
          {children ?? (
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(135deg, #1c1c20 0 22px, #222227 22px 44px)'}}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25}}>
                <line x1="0" y1="0" x2="100" y2="100" stroke={color} strokeWidth="0.3" />
                <line x1="100" y1="0" x2="0" y2="100" stroke={color} strokeWidth="0.3" />
              </svg>
              <Micro size={24} color={color} style={{opacity: 0.8, textAlign: 'center'}}>{placeholder}</Micro>
            </div>
          )}
        </div>
        {strip}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, gap: 24}}>
        <Micro size={20} color={color}>{credit}</Micro>
        {seconds && (
          <Micro size={20} color={color} style={{opacity: 0.7, whiteSpace: 'nowrap'}}>
            {(frame / fps).toFixed(1)} s
          </Micro>
        )}
      </div>
    </div>
  );
};
