# Directing — the harness that makes code-made video look designed

Every creator who gets premium results from Claude says the same thing: the prompt is 10%, the
harness is 90%. The harness is: a brief, references that are measured, a beat grid, a look test
with Steven, and a critique loop on rendered frames. This file is that harness.

## 1. Ask Steven first (he has the eye)
Steven steers taste and likes being asked. Before a look test, ask 2–4 questions with
AskUserQuestion, each with named options that point at things he has seen ("like your NO IDEA
pigeon poster"). Good questions: which chapter palette for which chapter; how loud the type;
where a meme fits; which shot deserves Blender. Never ask what the design system already answers.
When he sends reference images, describe what each one teaches in one line and add it to
design-system.md § reference board.

## 2. Director's brief (write `brief.md` in the project before any shot code)
1. **Film in one line** — "A 14-minute talk on craving that heats from blue to red and ends in still air."
2. **References** — which rows of the reference board and which outside videos; what to take from each.
3. **Chapter map** — chapter → palette row → layout types → one hero visual each.
4. **Recurring elements** — the motif that returns (wheel, string, moon), the header/footer microtext.
5. **Beat sheet** — from format-blueprint.md, with times.
6. **Text on screen** — every word that appears, in order (titles, punch words, quotes, labels).
7. **Borrowed material** — memes/films/art with the line that comments on each (memes-fair-use.md).
8. **Blender shots** — which, why, how long.
9. **Sound** — music mood per chapter, the three or four signature sounds.
10. **Gates** — stills approved → 90 s preview approved → full render.
11. **Deliverables** — 16:9 master, Shorts, thumbnail options.

## 3. References are measured, not admired
For any video Steven likes: pull frames every 0.5 s onto contact sheets, then write numbers into a
`style-guide.md`: palette hexes, type sizes as % of frame height, shot lengths, how many frames an
entrance takes, how far the camera moves, grain strength, how text enters and leaves. Take the
grammar, never the content, characters or logos. "You can't recreate an opinion; you can recreate
a number."

## 4. Beat grid
Choose the music before animating. Mark beats and downbeats (`beats.json`: bpm, beat times), lay
the voice phrases over it, then place cuts, type hits and prop entrances on the grid. Show Steven
the grid as a table (time · words · picture · sound) before writing shot code.

## 5. Stills before motion
Render 6–10 stills (one per layout in use) and look at them as posters. Fix composition, colour
and type here; motion cannot rescue a weak still. Check stills again before any long render —
most failures (camera inside an object, wrong colour, text off the safe area) show in one frame.

## 6. Critique loop (after the first preview render)
Pull a frame every 2 s into contact sheets and score each dimension 1–10. Fix everything under 7,
re-render that range, re-score. Two rounds is normal; stop at "all ≥ 8" or when a fix makes
something else worse.

| Dimension | 10 looks like |
|---|---|
| Focal point | one clear subject in every frame |
| Colour | on the chapter's palette row; ground deep; accent ≤ 10% |
| Type | huge or tiny; two families; nothing medium; nothing over a face |
| Space | a third of the frame at rest; margins respected |
| Depth | three layers; subject sharp |
| Finish | grain visible on gradients; no flat grey; no smooth plastic |
| Motion | eased, staggered, one event at a time, rests after dense passages |
| Pacing | events every 5–7 s in talk; tempo follows meaning |
| Consistency | AI art, code, Blender and camera look like one film |
| Idea | the picture says the line without the caption |

For big videos give one reviewer subagent per two or three dimensions (`model: "sonnet"`), each
comparing our sheets with the reference sheets and returning numbers, not adjectives.

## 7. Tools worth knowing (Nov 2026)
- **Remotion** — our renderer. Useful add-ons, all at the same version as `remotion`:
  `@remotion/transitions`, `@remotion/motion-blur`, `@remotion/noise`, `@remotion/paths`,
  `@remotion/shapes`, `@remotion/light-leaks`, `@remotion/effects`, `@remotion/three` (3D in the
  browser), `@remotion/lottie`, `@remotion/rive`, `@remotion/captions`, `@remotion/sfx`,
  `@remotion/google-fonts`, `@remotion/layout-utils`.
- **Remotion's official agent skills** — `npx skills add remotion-dev/skills` on the PC (best
  practices, captions, maps, render). Worth installing once beside this skill.
- **HyperFrames** (HeyGen, Apache-2.0) — HTML + GSAP video framework aimed at agents; an
  alternative if Remotion's licence ever becomes a problem (Remotion is free for individuals and
  teams of up to three).
- **Claude Motion** — animated explainers inside claude.ai (beta on Team/Enterprise plans only);
  not needed while we render with Remotion.
- **three.js / shaders** — for fields, tunnels and particles beyond canvas 2D; render with
  `--gl=angle` on the PC.
- **Blender** — blender.md.
- **Fable 5.2** (released Nov 2026; the model this skill was upgraded on): people are making
  whole films in code with it — Remotion, three.js, Blender, single-file HTML — and public
  galleries list hundreds of examples. What matters for us: it can hold a long build in one
  session, it reads its own rendered frames closely (crop, zoom, compare), and it follows a
  concrete design spec exactly. So give it the palette row, fonts and layout by name, and make it
  check stills. Left without a spec, any model drifts to a generic look.

## 8. Where to look for ideas (on the PC, with Chrome)
- **Pinterest / Behance / Savee / Are.na** searches: "grainy gradient poster", "thermal gradient
  type", "risograph poster two colour", "halftone portrait poster", "swiss poster typography",
  "japanese graphic design poster 1960s", "ikko tanaka", "tadanori yokoo", "ethereal poster design",
  "editorial motion design", "kinetic typography film titles", "thangka detail", "tibetan
  woodblock print".
- **Motion**: Ben Marriott's yearly "Best Motion Design" round-ups; studios Giant Ant,
  ManVsMachine, The Line, Buck; title-sequence sites (Art of the Title).
- **Channels**: Pursuit of Wonder, Scipio, Broken Ruune, Hidden AmuraKa (already decoded), tppo
  (graphic-design editing), Johnny Harris / Vox (documentary devices).
- **Instagram / TikTok** in our niche (via vidIQ): most spiritual reels are slow AI slideshows;
  the outliers are the designed ones — line-art geometry that morphs from one law to the next,
  pacing that acts out the idea, three colours per scene.
Save finds to `refs/` in the project with one line each on what to take.

## 9. Prompt shapes for the house look (image and video tools)
- Grainy gradient plate: `abstract thermal gradient, flowing heat-map bands from deep blue through
  cyan and green to orange and red on near-black, heavy film grain, soft glow, no text, no objects
  --ar 16:9 --style raw`
- Halftone source (photo to be reprinted): `[subject], studio photo, hard side light, plain white
  background, high contrast, full figure, no text --ar 2:3` → then `Halftone` in code.
- Japanese poster art: `vintage botanical illustration of [lotus], detailed engraving with flat
  colour, isolated on white, no text --ar 2:3`
- Ethereal figure: `silhouette of a seated meditator made of pure white light, bloom, soft
  chromatic prism flare, dark blue-black field, film grain, no face --ar 16:9`
- Speed-line field: `one-colour screen print, ultramarine ink on white, radial speed lines, tiny
  walking figure in the distance, coarse grain, no text --ar 16:9`
- Video (Flow/Veo) for a gradient in motion: `slow flowing thermal gradient, liquid heat-map
  colours, heavy grain, static camera, seamless, no objects, 8 seconds`
- Deity recreation in ChatGPT: paste the full iconography spec from design-system.md § Sacred art.
