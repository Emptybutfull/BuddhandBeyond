# Motion, cuts and sound — the craft layer

Numbers are frames at 30 fps unless marked. Companion to design-system.md (what a frame looks like);
this file is how frames move and join. Sources at the bottom.

## Motion principles
1. **Nothing starts or stops instantly.** Ease out on entrances (fast → slow), ease in on exits,
   ease in-out on camera moves. Linear only for constant drifts and rotations.
2. **Durations**: small UI/label 8–12 f · text line 12–18 f · cut-out or card 14–20 f · camera move
   = the whole shot · chapter card settle 10 f · hold after anything lands ≥ 20 f before the next event.
3. **Springs**: `spring({damping: 200})` for clean arrivals (no bounce) — the default.
   `damping: 14–18, stiffness: 120` for one playful overshoot (props dropping in). Never bounce text.
4. **Stagger** 2–4 f between siblings (letters, list rows, tiles); the eye reads it as one gesture.
   Order by reading direction or from the focal point outward.
5. **Offset + blur + fade** together for type: 20–40 px rise, 8–12 px blur → 0, opacity 0 → 1.
   One recipe per video; do not mix five entrance styles.
6. **Transform, don't replace** (flow): the circle becomes the wheel becomes the moon. Carry one
   shape, colour or position across a cut so shots feel related. End a shot's element where the
   next shot's element begins.
7. **Camera**: every shot has one slow move (push 100 → 104–108%, or a 1–2% drift). Glide into a
   new position over ~20–24 f with slow in/out, never snap in 3 f. Background moves less than
   foreground (parallax 0.3–0.6×).
8. **Secondary life**: after the main move, something tiny keeps moving (dust, a flame, a 1°/s
   rotation, breathing scale ±1%). A frozen frame looks like an error; a breathing one looks alive.
9. **Motion blur** on fast moves only (`@remotion/motion-blur` `<Trail>`/`<CameraMotionBlur>`);
   it is what separates "slide" from "whip".
10. **Rest.** After a dense passage, cut to a flat colour, a single word, or an empty frame for
    1–3 s. Intensity only reads against calm.
11. **On twos for the handmade look**: step some layers at 12 fps (`Math.floor(frame/2)*2`) —
    brush shapes, cut-outs, line boil — while camera and type stay at 30.

## Type in motion
| Recipe | How | Where |
|---|---|---|
| Word-by-word reveal | each word rises 8 px + fades over 6 f on its spoken frame | thesis question, key lines |
| Letter stagger | letters rise/unblur, 2 f apart | chapter words, titles |
| Mask wipe | line slides up from behind an invisible edge | editorial captions |
| Highlight sweep | marker bar draws behind 1–3 words (rough edge) | "the one phrase" in a quote |
| Scale slam | small grid words, then ONE word fills the frame on a hard cut | climax word, once per chapter |
| Text behind subject | word sits between background and cut-out figure | hero frames, thumbnails |
| Typewriter mono | characters appear 1 per 1–2 f with a soft tick | labels, dates, sources |
| Count-up | number eases to its value in 20–30 f | "2,500 years", "84,000" |

Captions on talking shots: one line, no punctuation, 1–5 words, key word in the accent colour,
no box, soft spread shadow, placed inside the safe area and never over the face or neck.

## Transitions (use few, with a reason)
A transition must answer "what does this do?" — show time passing, link two ideas, change world.
If it only decorates, cut it. Budget: 95% hard cuts and short dissolves; ≤ 1 showy transition
per chapter.
- **Hard cut** on the end of a phrase or on a beat — the default.
- **Dissolve 12–24 f** for time, memory, quotes, inward turns.
- **Match cut** on shape/position/motion (wheel → moon → eye → ensō). The most "expensive" cut there is.
- **Push / slide** (whole frame moves, next frame follows) for lists and "next point".
- **Morph** (same element changes size, radius, fill; content swaps behind a 4–6 f blur) for diagrams and UI-like scenes.
- **Zoom-through** an object (into the pupil, the moon, a doorway) to change scene or scale.
- **Organic wipe**: ink bleed, brush stroke, sand, smoke, light leak (`@remotion/light-leaks`) for chapter turns only.
- **Whip** with motion blur for energy; once or twice per video.
- **Flash frame / 1-frame white or colour** on a hit — sparingly.

## Cuts (editing vocabulary to use in the shot list)
- **J-cut**: next shot's sound starts before its picture (pulls the viewer forward).
- **L-cut**: voice continues over the next picture (how talking → B-roll should always work).
- **Cut on action / on motion**: cut while something moves; hide jump cuts under it.
- **Jump cut with punch-in**: same camera take, alternate 100% ↔ 115–120% scale at each cut.
- **Cutaway / insert**: 1–3 s of art over a cut in the talk.
- **Smash cut**: loud/dense → silent/still (or reverse). For the turn of an idea.
- **Shot sequence**: 3 clips of one action, equal length, flowing in one direction of motion — a hook device.
- **Montage on the beat**: 0.5–1 s clips cut to the music for "the busy world", then stop dead.
- **Speed ramp**: slow → fast → slow inside a move; in code, ease the time value.

## Pacing
- A visual event every 5–7 s in talk sections (new image, punch-in, text, diagram step);
  2–3 s B-roll shots in energetic passages; 8–15 s holds for quotes and landscapes.
- Tempo follows meaning: agitation = 3–5 cuts/s montage; calm = one held frame.
- Build a **beat grid** before animating: pick the music first, mark beats/downbeats
  (`beats.json`), then place cuts, text hits and prop entrances on beats; voice phrases win when
  they disagree with the grid.
- Use the start of the track for the start of the video, its ending for the ending; change scenes
  on dips in the music.

## Sound design (half the "expensive" feeling)
Five families, layered quietly (−18 to −24 dB under voice): **slide** (soft whoosh for moves),
**shutter/pop** (things appearing), **click/tick** (small UI, typewriter), **riser** (tension before
a reveal), **impact/boom** (chapter cards, one per chapter). Plus **room tone/ambience** per scene
(wind, water, temple, fire) and the channel's **bowl**. Rules: a sound for every visible movement
that matters, none for the rest; hide cuts under a sound; drop the music to near-silence before the
biggest line; duck music −8 to −12 dB under speech. Sounds can be synthesised in code
(`@remotion/sfx`, WebAudio/ffmpeg sine sweeps, filtered noise) so every hit lands on its frame —
see free-assets.md for libraries. Loudness target unchanged: −14 LUFS integrated.

## Steven on camera — making the talk look designed
- **Shoot**: light the face first (more light = more to grade); one or two small warm practical
  lights in the background; one coloured object in frame; shallow depth if the camera allows.
- **Grade once, reuse**: a single LUT/`cameraGrade` for every talking shot (warm skin, cool-tinted
  shadows, lifted blacks to the ground colour). Claude can write a `.cube` LUT.
- **Slow zoom** 100 → 106–110% across every talking shot; punch-in at jump cuts.
- **Frame within frame**: arch/rounded window + header/footer text (the `side` and `corner` modes).
- **Head cut-out over a colour field or art** (matte), text or giant word **behind** the head,
  graphic shapes around it — the 2026 talking-head look.
- **Split and bento**: Steven in one tile, the idea living in the others.
- **Interactive B-roll**: things appear next to him as he names them (list rows, a diagram step,
  a cut-out), entering on the word with a click.
- **Montage breaks**: every 60–90 s leave the room entirely for 5–15 s of full-screen design.
- Never: text over the face, lower thirds that stay for the whole shot, more than one caption style.

## Documentary devices worth having (Johnny Harris / Vox family)
- **Switch focus**: two cut-outs on one plate; rack blur from one to the other while the frame
  slides and scales 125 → 135% (background moves less).
- **On-screen research**: Steven reading/writing, sped up, with sutra pages and notes overlaid in
  multiply/screen blend and a riser underneath.
- **Archival framing**: old photos/art inside a film frame; desaturate, add contrast, fade, dust.
- **Filmed-screen look**: screen recordings under a glass/dust texture at 30–40% so they look shot
  by a camera.
- **Paper map / timeline** with a hand-drawn route line and tape-like labels.

## Sources
Transcripts: jayd3nfx (focus, flow, motion); Herman Huang "Why Your Video Transitions Suck";
Andrew "The Power of Simple Editing"; tppo (transitions, five SFX types, stems, beat sync);
Vlad Sateev "Complete Viral Talking Head Videos Masterclass"; Matt Loui "6 Insane Documentary
Editing Techniques"; Lukas Margerie (beat grid, morphing container, sound in code); Mr omi
(camera glide ~23 f, measure don't guess).
