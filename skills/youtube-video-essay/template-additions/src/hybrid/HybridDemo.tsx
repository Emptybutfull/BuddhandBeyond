// A 74-second "film" of the format blueprint in miniature: one of every piece, in running order.
// Render it to check the look on the PC, or pass `cam` (and `cutout`) to see it with real footage.
//   <Composition id="HybridDemo" component={HybridDemo} durationInFrames={74 * 30} fps={30} width={1920} height={1080} />
import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {ChapterCard, LowerThird, QuestionCard, QuoteCard} from './Cards';
import {CompareTable, WheelDiagram} from './Diagrams';
import {InkLandscape} from './InkLandscape';
import {PresenterShot} from './PresenterShot';
import {EndCard, EnsoSting, Grain} from './Stings';
import {colors, fonts} from './theme';

const Label: React.FC<{text: string}> = ({text}) => (
  <div
    style={{
      position: 'absolute',
      top: 28,
      left: 28,
      padding: '8px 16px',
      background: 'rgba(0,0,0,0.55)',
      border: `1px solid ${colors.goldSoft}`,
      borderRadius: 6,
      fontFamily: fonts.sans,
      fontSize: 22,
      letterSpacing: '0.18em',
      color: colors.bone,
    }}
  >
    {text}
  </div>
);

export const HybridDemo: React.FC<{cam?: string; cutout?: string; showLabels?: boolean}> = ({cam, cutout, showLabels = true}) => {
  const {fps} = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);
  const realms = ['Gods', 'Titans', 'Humans', 'Animals', 'Hungry\nghosts', 'Hells'];
  const shots: [number, number, string, React.ReactNode][] = [
    [0, 4, 'COLD OPEN · full', <PresenterShot mode="full" src={cam} startFrom={0} />],
    [4, 9.5, 'THE QUESTION', <QuestionCard text="What if the self you are protecting was never there?" highlight={['self', 'never']} />],
    [9.5, 14, 'TITLE STING', <EnsoSting sub="dharma for the modern mind" />],
    [14, 17, 'CHAPTER CARD', <ChapterCard word="Craving" index="I" sub="why wanting never ends" />],
    [17, 23, 'CHAPTER ANCHOR · triptych', <PresenterShot mode="triptych" src={cam} startFrom={s(17)} />],
    [
      23,
      33,
      'EXPLAIN · side + diagram',
      <PresenterShot mode="side" side="left" src={cam} startFrom={s(23)}>
        <WheelDiagram segments={realms} center="Craving" title="The six realms" schedule={realms.map((_, i) => ({at: s(1.2 + i * 1.3), index: i}))} />
      </PresenterShot>,
    ],
    [
      33,
      39,
      'ASIDE · corner',
      <PresenterShot mode="corner" side="right" src={cam} startFrom={s(33)}>
        <InkLandscape />
      </PresenterShot>,
    ],
    [39, 45, 'BIG LINE · cutout + halo', <PresenterShot mode="cutout" src={cutout} startFrom={0} />],
    [
      45,
      51,
      'ROSETTA TABLE',
      <CompareTable
        leftTitle="What we say"
        rightTitle="What it points to"
        rows={[
          ['the self', 'a process, not a thing'],
          ['letting go', 'not adding anything'],
          ['emptiness', 'full of everything else'],
        ]}
        every={s(1.2)}
      />,
    ],
    [51, 55, 'QUOTE', <QuoteCard quote="Form is emptiness, emptiness is form." source="The Heart Sutra" />],
    [
      55,
      60,
      'STORY · art + lower third',
      <AbsoluteFill>
        <InkLandscape drift={14} />
        <LowerThird title="Ryōkan" sub="Zen monk · 1758–1831" />
      </AbsoluteFill>,
    ],
    [60, 66, 'CTA · full, punched in', <PresenterShot mode="full" src={cam} startFrom={s(60)} punchIn />],
    [66, 74, 'END CARD', <EndCard guides />],
  ];
  return (
    <AbsoluteFill style={{background: colors.ink}}>
      {shots.map(([a, b, label, node]) => (
        <Sequence key={label} from={s(a)} durationInFrames={s(b) - s(a)}>
          {node}
          {showLabels && <Label text={label} />}
        </Sequence>
      ))}
      <Grain />
    </AbsoluteFill>
  );
};
