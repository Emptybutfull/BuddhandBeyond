# Clear-line cel animation: build brief for Claude Code

You are building short animated story sequences for The Static Self, a channel of calm, cinematic philosophical video essays. The target look is flat, clear-line 2D science-fiction animation in the tradition of European sci-fi comics: thin even ink lines, flat color, one hard shadow tone, tight palettes.

The human supplies the story or voiceover. You build the visuals, ask for the few assets only they can generate, and assemble the result.

Work in the numbered steps below. Stop at each **STOP** and wait for approval. The look test in Step 1 comes before any story work, because every later shot inherits it.

---

## Ground rules

- **Original designs only.** Invent the characters, creatures, costumes and worlds. Do not recreate or trace characters, creatures, costumes, logos or frames from any existing show, film or comic, even if reference stills are in the project. References define line, color and shading language, nothing else. Once the look test is approved, our own approved frames become the style reference for everything after.
- **Check versions before writing code.** Run `blender --version` and read the Python API and release notes for that version. Blender's toon-shading and Grease Pencil tools changed a lot across 4.x and 5.x, so do not rely on remembered identifiers. Blender 5.2 LTS or newer is preferred; work with what is installed and say so.
- **Fix the source, never the render.** Changes go into the .blend, the script, or the edit plan, then re-render.
- **Ask before** installing large packages, downloading models, or spending API credits.
- **Never upload, publish or schedule anything.**
- If `STYLE.md` exists in the project, read it. It governs pacing, sound and typography. This file governs the visual look of animated sequences. If the two conflict, ask.

---

## The look spec

This is what "done" looks like. Check every frame against it.

**Line**
- Thin, even-weight outlines. About 2 to 3 px at 1080p on the main subject, slightly lighter on backgrounds.
- Line color is a very dark tint of the scene palette (deep brown, deep navy), not pure black.
- Lines describe silhouettes and major forms. Interior detail is sparse. No hatching, no sketchy texture.

**Fill**
- Flat color. Each surface gets a base tone plus exactly one hard-edged shadow tone. An optional small highlight shape is allowed on the focal subject.
- No gradients on objects, no soft shadows, no ambient occlusion, no glossy speculars, no subsurface.
- Shadows shift in hue (toward the palette's cool or dark color). They are not just the base color darkened toward grey.

**Palette**
- 5 to 8 colors per scene from one dominant hue family (for example: amber daylight, or charcoal night).
- One accent color, usually luminous or complementary, reserved for the thing the story is about. Nothing else in the frame may use it.
- A soft gradient is allowed in the sky or far background only.

**Light**
- One key light direction per scene. Shadow shapes should read as designed graphic shapes.
- Glow is the only soft element allowed, and only on the accent.

**Camera and staging**
- Locked-off shots or slow moves. Low-angle hero shots; close-ups on faces, hands and objects.
- No shallow depth of field. Depth comes from layering, overlap and parallax.

**Motion**
- Character and effects animation runs "on twos": 12 drawings per second, each held for two frames at 24 fps. This held cadence is what makes it read as hand-drawn. Smooth 24 fps subject motion reads as 3D or AI.
- Camera moves stay smooth (on ones).
- Held poses are welcome. Small secondary motion carries life: drifting particles, a blink, a cloth edge.

**Finish**
- One light, uniform grain over every shot. No lens distortion, chromatic aberration, vignettes or light leaks.

---

## Step 0: Setup check

1. Locate blender, python, ffmpeg and ffprobe, and node if the project uses Remotion. Report versions. If something is missing, give the install command (Windows: `winget`) and wait.
2. Create these folders if absent:

```
look/        palettes, approved look frames, LUTs
story/       script, shotlist.md, prompts.md, character notes
blender/     scenes and scripts (blender/lib for shared code)
keyart/      stills the human generates
clips/       video clips the human generates
layers/      separated layers for 2.5D shots
renders/shots/   one file per finished shot
renders/     assembled cuts
review/      contact sheets and notes
```

---

## Step 1: Look test

Prove the look on one simple scene before anything else: a landscape with a few rock or crystal forms, one man-made object, and sky. Render stills at 1920x1080 in two palettes: a warm daylight palette and a dark palette with one glowing accent.

**Color management.** Set the view transform to Standard with no look applied. Filmic and AgX reshape colors, and this style needs palette colors to arrive exactly as specified.

**Toon material (baseline, EEVEE).** Diffuse shading converted to color (Shader to RGB), through a color ramp with constant interpolation and two stops (shadow color, base color), then to the output. Lighting only decides which side of the threshold a surface falls on; the ramp supplies the actual colors. Newer versions add other routes to the same result (a Raycast shader node from 5.1, material lighting nodes in 5.3). Use whichever gives the cleanest two-tone result in the installed version.

**Lighting.** One sun light with hard shadows (zero angular size). Keep world lighting flat and neutral so it adds no gradients. Turn off ambient occlusion, reflections and engine bloom.

**Outlines.** Try both and compare on the test frame:
- Grease Pencil Line Art on the scene or a collection: contours, creases above an angle threshold, intersections. Gives interior lines. Bake it for animated shots so lines stay stable.
- Inverted hull (solidify with flipped normals, backface culling, dark emission material): silhouettes only, but fast and stable in motion.

Check line weight on screen for near and far objects. Stroke thickness is world-space in recent versions, so distant lines thin out. That is fine for backgrounds; correct it if the main subject's line weight wanders.

**Glow.** Emissive material in the accent color, with glow added in the compositor and masked so nothing else blooms.

**Save as reusable code.** Put the setup in `blender/lib/cel_look.py`: a scene setup function, a toon material factory that takes base and shadow colors, an outline helper, and a palette loader. Palettes live in `look/palettes/<name>.json`.

**Self-check.** Write `tools/look_check.py` to quantize a frame and report how many color clusters cover 95% of pixels (expect roughly a dozen or fewer, plus line color) and to flag smooth gradients inside flat regions. Then open the frames and compare them to the look spec yourself. Numbers catch drift; your eyes judge the design.

**STOP.** Show the human both stills. After approval, save them as `look/approved_day.png` and `look/approved_night.png`.

---

## Step 2: Story to shot list

Input: a script, a voiceover transcript, or a short premise. If none exists, ask for three to six sentences.

Write `story/shotlist.md` as a table: shot id, duration, what happens (one action), framing, source type (A, B or C below), palette, accent element, sound note.

Guidelines:
- One idea per shot, usually 3 to 8 seconds.
- A sequence that works with limited animation: wide establishing shot, approach, close-up, the accent moment, reaction, release.
- Let the accent color be the story thread. Where it appears, grows or goes out is the plot.
- Show cause, then effect. A hand reaches; then the thing responds.

Source types:
- **A. Blender cel render** (you build it): environments, objects, vehicles, simple creatures, particles, camera moves. Prefer this wherever no human face has to act.
- **B. Layered still** (human generates key art, you animate it as 2.5D): character close-ups and held poses.
- **C. AI video clip** (human generates from your frames and prompts): only where a character must visibly act.

For each original character, write a short description in `story/characters.md`: age, build, hair, outfit in palette colors, one distinctive item.

---

## Step 3: Prompts for the human

Write `story/prompts.md` with everything they need to generate, shot by shot.

Style clause to append to every image prompt:

> 2D animation still, clear ink outlines of even weight, flat cel shading with a single hard-edged shadow tone, no gradients, limited palette of [palette words], retro European science-fiction comic look, simple readable shapes, 16:9

Things to exclude: 3D render, photorealism, soft shading, glossy highlights, text.

Include:
- A character sheet prompt per character: front, three-quarter and profile views, neutral expression, flat colors, plain background.
- For B shots: the character on a plain solid background and the empty background as a separate plate. Two clean images beat cutting one image apart.
- For C shots: a start frame, an end frame, and a motion prompt:

> Hand-drawn 2D animation, limited animation with held poses. [One action]. Camera locked. Lines and flat colors stay stable.

Ask for a locked camera in C shots. Camera moves are added afterward so they stay smooth while the animation stays on twos.

Tell them the exact filenames: `keyart/<shot>_char.png`, `keyart/<shot>_bg.png`, `clips/<shot>.mp4`.

**STOP.** Show the shot list and prompts. Build A shots while waiting for assets.

---

## Step 4: Build the shots

**A shots (Blender)**
- Model simply. Silhouette matters more than detail. Generate rocks, crystals and plants procedurally.
- Apply `cel_look`. Key object and character motion with constant interpolation every second frame, or step the curves by 2. Leave the camera on smooth curves with gentle ease in and out.
- Particles: small emissive discs in the accent color, slow drift.
- Render a half-resolution proxy first, look at it, then render the PNG sequence at 1920x1080, 24 fps, unless the project specifies otherwise.

**B shots (layered stills)**
- Place character, midground and background on separate planes at different depths, or do the same with 2D transforms.
- Slow push-in or drift. Keep parallax small (a few percent of scale difference between layers) so edges hold.
- Add particles or glow from A as overlays. Add a blink or breath only if it comes out clean.

**C shots (AI clips)**
- Trim to the usable segment. Scan for style drift (shading turning soft or 3D, a face changing) and cut before it.

---

## Step 5: Unify pass

Shots from three sources only feel like one film if they share cadence, color and finish. Run every shot through the same pass:

1. **Cadence.** For B and C shots, reduce to 12 unique frames per second and hold each for two frames at 24 fps. A shots are already on twos; do not re-time their camera moves.
2. **Palette pull.** Move colors toward the scene palette to flatten the faint gradients AI clips carry. Build this as a 3D LUT (.cube) per palette in `look/` so the identical pull can be applied in ffmpeg or DaVinci Resolve. Start at partial strength and test on a two-second sample: if flat areas flicker between colors, lower the strength.
3. **Glow.** Accent regions only.
4. **Grain.** The same light grain on everything.
5. **Export** each shot to `renders/shots/` in the edit codec the project already uses (ProRes 422 HQ or DNxHR HQ if nothing is set).

---

## Step 6: Assemble

Cut to the voiceover following the shot list. Mostly hard cuts, no decorative transitions, and let held shots hold. Use whatever the project already uses for assembly (edit plan, Remotion, or a Resolve timeline). Render `renders/<name>_proxy.mp4`.

Sound follows `STYLE.md`. Without it: a quiet ambient bed and sparse effects on accent moments.

---

## Step 7: Review

1. Build a contact sheet in `review/`: one frame per shot, plus three frames around each accent moment.
2. Compare against the look spec and the approved look frames. Run `tools/look_check.py` on the sheet's frames.
3. If the project has a `/review-cut` skill, run it on the proxy.
4. Fix at the source and re-render. Stop after two rounds.

---

## When it looks wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| Looks 3D | gradients in shading, speculars, smooth subject motion | constant ramps, Standard view transform, animate on twos |
| Lines busy or noisy | too many crease and intersection lines | raise the crease threshold, drop intersections |
| Lines shimmer in motion | live line art on moving geometry | bake line art, or switch that shot to inverted hull |
| Muddy color | too many hues, grey shadows | cut the palette, hue-shift shadows |
| Flicker in flat areas | palette pull too strong | lower LUT strength |
| Sources don't match | unify pass skipped or uneven | same LUT, cadence and grain on every shot |

---

## What to report at the end

- Paths to the proxy render and the contact sheet.
- The shot list with each shot's source type and status.
- Anything that departs from the look spec, and why.
- Taste decisions left for the human, listed with timestamps.
