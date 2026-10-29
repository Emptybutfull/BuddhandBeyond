# Motion kit (Remotion) — `template-additions/src/hybrid`

Self-contained components for the hybrid format. No image files needed (patterns, ensō, ink
landscape are drawn in code), so they render the same on any machine.

## Install once into the template
1. Copy `template-additions/src/hybrid/` to `D:\open\spiritual-short\src\hybrid\` (new_project.ps1
   then copies it into every new project with the rest of the template).
2. In the template folder: `npm i @remotion/google-fonts@<same version as remotion>` (check
   `npx remotion versions`). If style.md already fixes fonts, change `theme.ts` instead.
3. Register the demo in Root.tsx and render it once to check the look on the PC:
   `<Composition id="HybridDemo" component={HybridDemo} durationInFrames={74 * 30} fps={30} width={1920} height={1080} />`
   `npx remotion render HybridDemo out/hybrid_demo.mp4` (≈ 2–5 min). With footage:
   `defaultProps={{cam: staticFile('camera_cut.mp4'), cutout: staticFile('cutouts/cutout_123.webm')}}`.
Collage check: `<Composition id="CollageDemo" component={CollageDemo} durationInFrames={14 * 30} fps={30} width={1920} height={1080} />`.
Written against Remotion 4.0.x / React 18. Uses React.useId, so React ≥ 18.

## Components (import from `./hybrid`)
| Component | What it is | Key props | Where in the blueprint |
|---|---|---|---|
| `PresenterShot` | Steven on camera, 5 layouts | `mode` full/side/corner/cutout/triptych · `src` · `startFrom` · `side` · `pattern` · `duotone` · `punchIn` · `focus` · children = art/diagram | every on-camera stretch |
| `PatternBg` | slow sacred geometry wallpaper | `kind` mandala/wheel/rays/flower/lotus/mist · `opacity` · `speed`°/s · `center` · `size` · `drawOn` s | behind side/cutout/triptych, cards, thought-experiment pauses |
| `ChapterCard` | one huge word, smash-cut + gold rule | `word` · `index` · `sub` · children = art behind | chapter starts, 2–3 s |
| `QuestionCard` | thesis question word-by-word over a faint ensō | `text` · `highlight` · `wordFrames` (from word timings) | beat 2, reopen beats |
| `EnsoSting` | brush ensō draws + EMPTY BUT FULL | `title` · `sub` | after the cold open, 4–5 s |
| `WheelDiagram` | rotating dial, segments light as named | `segments` ("\n" for 2 lines) · `schedule` [{at, index}] · `center` · `title` | six realms, 12 links, 4 truths, 8-fold path |
| `CompareTable` | two-column "Rosetta stone", rows reveal | `leftTitle` · `rightTitle` · `rows` · `startAt` · `every` | "what we say ≈ what it points to" |
| `QuoteCard` | sutra/teacher quote, paper or dark | `quote` · `source` · `variant` | quotes (instead of Steven reading on camera) |
| `LowerThird` | name + dates with a drawn gold line | `title` · `sub` | first mention of a teacher/text/place |
| `EndCard` | ensō + line, two end-screen slots right | `line` · `guides` (preview only) | last 12–20 s |
| `InkLandscape` | sumi-e mountains with parallax | `drift` · `seal` | fallback plate only — real art first |
| `Grain` | animated grain | `opacity` | previews only; the template's texture wins |
| `Paper` | textured wall (plaster / rice paper) in one colour | `color` · `fibers` | collage: bottom layer of every shot |
| `Cutout` | one PNG-with-alpha layer (or children) | `src` · `x` `y` · `h`/`w` · `enter`/`exit` left/right/up/down/drop/pop/fade · `at` (keyword frame) · `drift` · `spin` · `filter` (shared grade) | collage: backdrop, figure, props |
| `Camera` | one slow move over the whole shot | `from` · `to` · `pan` · `tilt` | wrap every collage shot |
| `Particles` | snow / dust / embers, deterministic | `kind` · `count` · `seed` | atmosphere |
| `LoopOverlay` | a Flow/Veo loop on black, screen-blended | `src` · `frames` · `opacity` | smoke, fire, ink, lamp flame |
| `QuoteScroll` | parchment page that scrolls with the reading | `text` · `source` | long quotes read in full |

## Snippets
```tsx
// side mode: Steven left, diagram right, segments lit on the words (frames from word timings)
<Sequence from={f0} durationInFrames={f1 - f0}>
  <PresenterShot mode="side" side="left" src={staticFile('camera_cut.mp4')} startFrom={f0}>
    <WheelDiagram segments={['Gods','Titans','Humans','Animals','Hungry\nghosts','Hells']}
      center="Craving" schedule={[{at: 24, index: 0}, {at: 61, index: 1}]} />
  </PresenterShot>
</Sequence>

// corner: the art keeps playing, Steven in the circle
<PresenterShot mode="corner" side="right" src={cam} startFrom={f0}><ArtShot k="T12" /></PresenterShot>

// chapter card over the chapter's best art (darkened automatically)
<ChapterCard word="Craving" index="II" sub="why wanting never ends"><Img src={staticFile('art/T12.png')} /></ChapterCard>
```
(`ArtShot`/`Img` = whatever the template already uses to show an art key with a push-in.)

## Sound cues that go with the pieces
EnsoSting → singing bowl on frame 4. ChapterCard → low boom on frame 0, music out for ~1 s.
QuestionCard → music dips 4–6 dB. Thought-experiment pauses → music almost out. No whooshes.

## Tuning
- Colours/fonts: `theme.ts` only. Duotone pairs: `duotones` (goldOnLacquer default for triptych).
- Pattern too busy → lower `opacity` (0.2) or `speed` (1). Patterns must never compete with the face.
- Face cropped badly in side/corner/triptych → adjust `focus` (fractions of the camera frame).
