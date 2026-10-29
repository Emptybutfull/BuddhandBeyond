// 14 s check of the collage engine. The "cut-outs" here are drawn in code; on a real video each one
// is a Midjourney / Nano Banana PNG with the background removed.
//   <Composition id="CollageDemo" component={CollageDemo} durationInFrames={14 * 30} fps={30} width={1920} height={1080} />
import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {Camera, Cutout, Paper, Particles, QuoteScroll} from './Collage';
import {Enso} from './Enso';
import {PatternBg} from './PatternBg';
import {PresenterPlaceholder} from './Placeholders';
import {Grain} from './Stings';

export const CollageDemo: React.FC<{paper?: string}> = ({paper = '#16233f'}) => {
  const {fps} = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);
  return (
    <AbsoluteFill>
      {/* 1. figure rises in, a moon drops behind, snow — "he returned a different man" */}
      <Sequence durationInFrames={s(4.5)}>
        <Camera to={1.08}>
          <Paper color={paper} />
          <Cutout x={0.5} y={0.36} h={0.5} enter="drop" at={s(0.8)} shadow={false}>
            <Enso size={540} color="#e8dcc0" drawFrames={1} />
          </Cutout>
          <Cutout x={0.5} y={0.56} h={0.86} enter="up" dur={18}>
            <div style={{width: 760, height: '100%'}}>
              <PresenterPlaceholder transparent label="" />
            </div>
          </Cutout>
          <Particles kind="snow" count={90} />
        </Camera>
      </Sequence>
      {/* 2. vortex behind the head, embers — "his focus turned inward" */}
      <Sequence from={s(4.5)} durationInFrames={s(4.5)}>
        <Camera from={1.04} to={1.12}>
          <Paper color="#3a1a12" />
          <Cutout x={0.5} y={0.45} h={1.1} enter="fade" spin={-12} shadow={false} opacity={0.7}>
            <div style={{width: 1188, height: '100%'}}>
              <PatternBg kind="rays" bg="transparent" color="#e8c27a" opacity={0.9} speed={0} glow={false} />
            </div>
          </Cutout>
          <Cutout x={0.5} y={0.64} h={0.84} enter="none">
            <div style={{width: 740, height: '100%'}}>
              <PresenterPlaceholder transparent label="" />
            </div>
          </Cutout>
          <Particles kind="embers" count={40} />
        </Camera>
      </Sequence>
      {/* 3. a long quote, read in full, scrolling with the voice */}
      <Sequence from={s(9)} durationInFrames={s(5)}>
        <QuoteScroll
          source="Dhammapada 1 · tr. Max Müller, 1881"
          text={
            'All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts. ' +
            'If a man speaks or acts with an evil thought, pain follows him, as the wheel follows the foot of the ox that draws the carriage.'
          }
        />
      </Sequence>
      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
