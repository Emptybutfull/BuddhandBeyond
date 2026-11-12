// The house look in 13 scenes, no voice: one of every layout, palette and trick in design-system.md.
// Render it to see the look on the PC, or lift single scenes as starting points for real shots.
//   <Composition id="DesignShowcase" component={DesignShowcase} durationInFrames={showcaseFrames} fps={30} width={1920} height={1080} />
// Needs public/indra/0001.png… (scripts/blender/indras_net.py) and public/cat.png (any CC0 photo) —
// pass indra={false} / meme={false} to skip those scenes.
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {EmptinessScene, ImpermanenceScene, IndraScene, TitleScene} from './ScenesA';
import {FilmCardScene, MemeScene, MiddleWayScene, NoSelfScene, TwelveLinksScene} from './ScenesB';
import {LotusScene, LuminousScene, PaletteScene, TalkFrameScene} from './ScenesC';

const FPS = 30;
export const showcaseScenes: [string, React.FC<any>, number][] = [
  ['Title', TitleScene, 5],
  ['Emptiness', EmptinessScene, 7.4],
  ['Impermanence', ImpermanenceScene, 7.4],
  ['Indra', IndraScene, 4.4],
  ['TwelveLinks', TwelveLinksScene, 6.6],
  ['MiddleWay', MiddleWayScene, 6.4],
  ['NoSelf', NoSelfScene, 4],
  ['Meme', MemeScene, 4.6],
  ['FilmCard', FilmCardScene, 5.6],
  ['TalkFrame', TalkFrameScene, 6.4],
  ['Luminous', LuminousScene, 5.6],
  ['Lotus', LotusScene, 5],
  ['Palette', PaletteScene, 5.4],
];
export const showcaseFrames = showcaseScenes.reduce((n, s) => n + Math.round(s[2] * FPS), 0);

export const DesignShowcase: React.FC<{indra?: boolean; meme?: boolean}> = ({indra = true, meme = true}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0b0a0c'}}>
      {showcaseScenes.map(([id, Scene, sec]) => {
        const dur = Math.round(sec * FPS);
        const start = from;
        from += dur;
        if ((id === 'Indra' && !indra) || (id === 'Meme' && !meme)) return null;
        return (
          <Sequence key={id} from={start} durationInFrames={dur} name={id}>
            <Scene />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
