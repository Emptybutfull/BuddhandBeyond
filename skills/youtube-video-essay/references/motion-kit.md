# Motion kit (Remotion) — `template-additions/src/hybrid` and `src/design`

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

## The design kit — `template-additions/src/design` (house look, Nov 2026)
Install: copy `template-additions/src/design/` to `D:\open\spiritual-short\src\design\` (it imports
`../hybrid/Placeholders`, so `src/hybrid` must be there too). Fonts load through
`@remotion/google-fonts` (Unbounded, Jost, JetBrains Mono, Instrument Serif, Shippori Mincho, Noto Serif
Tibetan/Devanagari). Register and render the showcase once:
`<Composition id="DesignShowcase" component={DesignShowcase} durationInFrames={showcaseFrames} fps={30} width={1920} height={1080} />`
(needs `public/indra/0001.png…` from `scripts/blender/indras_net.py` and any CC0 photo at `public/cat.png`;
or pass `indra={false}` / `meme={false}`). Every scene is also exported on its own (`TitleScene`, `NoSelfScene`, …)
as a starting point for real shots.

| Component | What it is | Key props |
|---|---|---|
| `GrainGradient` | THE ground: a slow field mapped through a chapter ramp, heavy grain on top | `ramp` (tokens `ramps.*`) · `kind` ribbon/aura/flow/horizon/rings · `focus` · `scale` · `heat` (animate it) · `gain` · `grain` · `speed` · `seed` |
| `Grain` | the same heavy grain for flat/print scenes; put it last | `amount` · `blend` ('multiply' on paper, 'overlay' on dark) |
| `Halftone` | one-ink halftone "reprint" of anything (image, video of Steven, SVG): ink dots on transparent | `ink` · `cell` · `angle` · `contrast` · `brightness` · `invert` |
| `GradientMap` | re-colour by brightness through a ramp (Blender renders, footage) | `ramp` |
| `MediaCard` | film-frame card for borrowed clips, stills and memes, with credit line and seconds counter | `credit` · `width` · `aspect` · children = the clip |
| `Wide` / `Heavy` / `Micro` / `Soft` | the four type voices (Unbounded, Jost Black, mono labels, serif italic) | `size` · `color` |
| `Stagger` / `Rise` / `Slam` | the three allowed entrances: pieces one by one, block rise + unblur, hard cut-in | `at` · `every` · `frames` (word timings) |
| `Corner` | print-style microtext in a corner | `pos` tl/tr/bl/br |
| `Figure` | drawn stand-in for a cut-out person | `mode` shaded (feed to Halftone) / light (glow) / flat |
| `tokens.ts` | ramps, flat grounds, five colours, fonts | change look HERE only |

Recipes:
```tsx
// chapter ground that heats up over the shot
<GrainGradient ramp={ramps.thermal} kind="ribbon" heat={interpolate(frame, [0, dur], [-0.2, 0.25])} />

// Steven as a punch cut-out (matted footage → one ink on paper, giant word overprinted)
<AbsoluteFill style={{background: flats.bonePaper.ground}}>
  <Halftone ink={cobalt} cell={10}><OffthreadVideo src={staticFile('cutouts/cutout_123.webm')} transparent muted /></Halftone>
  <div style={{mixBlendMode: 'multiply'}}><Heavy size={470} color={vermilion}>No self</Heavy></div>
  <Grain amount={0.25} blend="multiply" />
</AbsoluteFill>

// a Blender shot re-coloured to the chapter
<GradientMap ramp={ramps.lapisFire}><Img src={staticFile(`indra/${String(f).padStart(4, '0')}.png`)} /></GradientMap>

// a film quote
<MediaCard credit="GROUNDHOG DAY · 1993 · DIR. HAROLD RAMIS · COLUMBIA"><OffthreadVideo src={clip} muted /></MediaCard>
```
Notes: `GrainGradient` computes at 1/4 size and scales up (about 10 ms a frame); canvases draw in
`useLayoutEffect`, so every frame is independent. `Halftone` is pure CSS/SVG, so it works on video.
Particle scenes (`EmptinessScene`, `ImpermanenceScene`) are closed-form: no simulation state.

### Design-kit gotchas (found while testing)
- **Grain makes huge files.** The 74 s showcase at crf 20 was 860 MB. Masters for YouTube: crf 18–20
  and accept the size (or ProRes); previews for Steven's phone: `ffmpeg -i in.mp4 -vf scale=1280:-2
  -c:v libx264 -crf 27 -an out.mp4` (18 MB). YouTube smears fine grain, so keep `grain` ≤ 0.45 and
  export 1440p or 4K when possible for a better bitrate tier.
- **Canvas text needs loaded fonts.** Anything that draws type on a canvas (the 色 → 空 particles)
  must `await fontsReady` from tokens.ts first, or the canvas falls back to a system font without
  any error. HTML text is safe (Remotion waits for the font loaders).
- **Halftone filter region.** The SVG filter in `Halftone` is pinned to the box (`x=0 y=0 width=1
  height=1`) and clipped by 1 px; without that it prints a solid ink frame around the image.
- **Blend modes stop at transforms.** `mixBlendMode` only blends with layers in the same stacking
  context; a parent with `transform`, `opacity` or `filter` cuts it off. `Halftone` therefore outputs
  real transparency; use multiply only for type overprinting it, inside the same wrapper.
- **Kanji font** (Shippori Mincho) arrives as ~120 small files on first render; if the network is
  slow, install the font locally and point `fonts.kanji` at it.
- Render speed here (4 CPU cores, no GPU): about 0.14 s per frame for the whole showcase.

## The cel-shaded kit — `src/design/awakening` (Nov 2026)
Steven's ask: flat colours, gradients, the cel-shaded animation look. Everything is SVG drawn in
code, so it is sharp at any zoom, costs no credits, and nothing in it can be Content-ID matched.
Working example: the 2-minute Reel `Awakening` (1080×1920, 60 BPM).

| Piece | What it is |
|---|---|
| `Buddha` + `LOOKS` + `mixLook` | One seated figure with ~25 parameters (skin, robe, hair, line weight, shadow depth, back-light, ushnisha, curls, ear length, urna, lotus bloom). `mixLook(a, b, t)` blends any two looks, so the figure *morphs*. Poses: `reach` (hands in lap → touching the earth), `eye`, `mudra` (`dhyana`, `earth`, `give`, `fearless`, `teach`). |
| `Silhouette` | The same body as one flat shape. Stroke it wide in flat colours for aura bands, nest scaled copies for a tunnel, use it as a mask for an outline-only figure. |
| `Elements.tsx` | `Stars`, `Moon`, `BodhiTree`, `Earth`, `MaraField` (red field, spikes, arrows that turn to petals), `Tunnel`, `DivineEye`, `Beings`, `Wheel12` (twelve links with Pali labels on the ring), `Flames`, `Rays`, `SpeedLines`, `AuraBands`, `Emanation`, `EnsoStroke`. |
| `GrainGradient bands={7}` | Posterises any field into flat steps: the cel-shaded sky. `<Grain still />` is paper grain that does not move (small files). |
| `Awakening.tsx` | The film: cue sheet (`CUE`), camera, the circle wipe that carries each cycle through the figure, captions inside Instagram's safe area. |

**How the cel look is built** (reuse for any drawn subject): 1) every part is a closed path; 2) fill
it with the *shadow* colour, draw the same path again in the *base* colour shifted toward the light
and clipped to the part: a hard crescent of shadow is left; 3) outlines are drawn *behind* the
fills at double width, so overlapping parts share one clean outer line; 4) cast shadows (chin on
neck, hair on forehead) are hand-placed shapes; 5) the figure moves "on twos" (`Math.floor(frame/2)`)
while the camera stays smooth; 6) big moments get 2–3 **impact frames** (flat ground + speed lines).

**Vertical / Reels rules used:** text between y 230 and 560, left margin 64, nothing important in
the bottom 380 px or under the right-hand buttons; first frame already holds the hook; last frame
equals the first so it loops; 1 beat = 30 frames and every cut sits on a beat.

Render and add sound on the PC:
```
<Composition id="Awakening" component={Awakening} {...AWAKENING} />        (in Root.tsx)
npx remotion render src/index.ts Awakening out/awakening.mp4 --crf 16
python scripts/audio/awakening_score.py --out out                           (numpy only)
ffmpeg -i out/awakening.mp4 -i out/awakening_full.wav -c:v copy -c:a aac -b:a 256k out/awakening_reel.mp4
```
`awakening_score.py` synthesises the score and every sound effect from the same cue sheet (bowl on
each cycle, boom on the touch, dead silence at "IT STOPS."). `--bed track.wav --bed-at 20
--transpose 2` swaps the music for another track and keeps the synced effects. Claude cannot hear:
it checks loudness (−14 LUFS), peaks, and tonal balance against a reference track by numbers, and
Steven judges by ear.

Gotchas found: ids built from `React.useId()` must use a separator that is not a letter or digit
(`id + '_t'`): React's ids are base-32, so `id + 'f'` collides with another component's id and the
wrong clip path is used (parts turn black). Text on a busy ground gets a hard offset copy in a
second ink (`under`), not a soft shadow.

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
