# Art Lab: experiments, pipelines and a learning loop (brief for Claude Code)

This file sets up three things in this project for The Static Self, a channel of calm, cinematic philosophical video essays:

1. **A learning system**, so taste and craft accumulate across sessions as written files.
2. **Six visual experiments** that go beyond the usual edit pipeline.
3. **Four production pipelines** that combine them into finished shots.

You start every session with no memory of the last one. Anything worth keeping has to be written into `lab/`. Read it before you work; write to it after every verdict. That is the whole mechanism by which the work gets better over time.

How this relates to other files, if they exist: `STYLE.md` is the house style (pacing, sound, typography). `CEL_LOOK.md` is one specific animated look. This file is how we explore new looks, build shots, and remember what we learned.

---

## Ground rules

- **Original work only.** References teach principles (palette, composition, timing). Do not recreate characters, creatures, designs or frames from existing shows, films, games or artworks, and do not feed reference frames into generation as image or style inputs. Style inputs come from our own approved outputs.
- **Small first.** Every piece goes still, then 3-second proxy, then final. Beauty problems are visible in a still; do not spend render time before the still works.
- **Check before you build.** This file names techniques, not exact APIs. Check installed versions and read current docs before using any tool. These tools change quickly.
- **Ask before** installing anything over about 500 MB, downloading models, using paid APIs, or installing third-party skills or custom nodes.
- **The human's files are theirs.** Work in new projects and copies. Do not modify existing Resolve projects, timelines or .blend files without asking, and never delete media.
- **Fix the source, never the render.**
- **Never upload, publish or schedule anything.**

---

## Tools and what they cost

| Tool | Cost | Used for | Who sets it up |
|---|---|---|---|
| Blender (5.2 LTS or newer preferred) | free | 3D, cameras, simulation, depth layers | human installs |
| DaVinci Resolve Studio (21.1 or newer) | paid, one-time licence | assembly, grade, Fusion, render | human installs |
| ComfyUI | free; models are large downloads | AI image and video on the human's own GPU | you install, after asking |
| Remotion | free for individuals | type and vector motion | may already be in the project |
| Python, ffmpeg, Node | free | everything in between | check, then ask |
| Midjourney, Flow, ChatGPT images | the human's subscriptions | key art and acting clips | human runs them from your prompts |

Not used: Adobe, TouchDesigner.

---

## Part 1: Set up the lab (first session)

Create:

```
lab/
  TASTE_LOG.md              the human's verdicts, in their words
  experiments/<date>-<slug>/  brief.md, source files, still.png, proxy.mp4, final.mp4, notes.md
  references/<slug>/        frames the human supplies, plus study.md
  notes/                    craft and tool notes, one file per topic
  contact/                  contact sheets for ranking
comfy/
  workflows/                working ComfyUI workflows in API format
  MODELS.md                 every model downloaded: name, size, purpose, licence
```

Create `lab/TASTE_LOG.md` with this content:

````markdown
# Taste log

Read this before any visual work. Append after every verdict.

## Standing rules
(Confirmed by the human. Apply these by default.)

## Signature motif
(The recurring visual element that makes a frame recognizably this channel's. Empty until the human picks one.)

## Open questions
(Things two verdicts disagree on, or that need a direct answer.)

## Entries
(Newest first.)
````

Entry format:

````markdown
### 2026-11-16 · shader-fog-01 · KEEP | REVISE | REJECT
What it was: one line.
Human said: "their exact words"
My read (unconfirmed): what I think drove the verdict.
Rule candidate: a general rule this might support.
````

How to keep it:

- Quote the human exactly. Put your interpretation on its own line marked unconfirmed. Your guess about why they liked something is a hypothesis; stored as fact, a wrong guess compounds.
- Log rejections as carefully as keeps. They carry as much information.
- Move a rule candidate into Standing rules only when the human confirms it. When three separate verdicts point the same way, ask in one line: "Promote 'X' to a standing rule?"
- When the file passes about 300 lines, roll the oldest entries into a short dated summary at the bottom.
- Log taste about the work only. Nothing else about the person.

---

## Part 2: The loop every piece follows

1. **Read** the Standing rules in `TASTE_LOG.md`, any relevant `lab/notes/` and `study.md` files, and `STYLE.md`.
2. **Write `brief.md`:** one sentence of intent, the palette, what "good" looks like for this piece, and which rule or question it tests.
3. **Still.** Render one frame. Open it and look at it. Then run the eye test below. Revise up to three times on your own.
4. **Proxy.** Three seconds at half resolution. Pull the first, middle and last frames and look at them. Revise.
5. **Final.** 1920x1080, 24 fps unless the project says otherwise. Experiments run 10 seconds or less. Save a contact sheet beside it.
6. **Critique in `notes.md`.** Describe what a critical viewer would notice first, what is weak, and what you would try next. Be specific. Do not grade your own work as beautiful; the human decides that.
7. **Show** the clip with two or three lines of context and one question: keep, revise or reject, and why?
8. **Log** the verdict.

**The eye test.** Shrink the still to 320 px wide and convert it to greyscale. A frame that catches the eye still reads at that size:

- One idea in the frame. If you need "and" to describe it, simplify.
- Strong light-dark contrast, with the brightest point on the subject.
- One accent color, used on the thing the shot is about and nowhere else.
- One motion. Everything else holds still or drifts.

When working hands-free, run up to three pieces, then stop and present them together on one contact sheet for ranking. A ranking of three tells you more about taste than three separate verdicts.

---

## Part 3: Study routine (reference to rules)

When the human puts frames or clips in `lab/references/<slug>/`:

1. **Extract.** For video: a frame at each cut plus one per second, and the shot lengths.
2. **Measure.**
   - Palette: dominant colors as hex with rough proportions; how much of the frame the accent color covers.
   - Value structure: how light and dark are distributed; where the brightest point sits.
   - Line and edge: hard or soft, thick or thin, how much interior detail.
   - Composition: subject placement, negative space, horizon height, depth layers.
   - Motion: cut rhythm, camera speed, whether animation holds frames (look for duplicate frames).
   - Finish: grain, glow, texture.
3. **Look.** Open the frames yourself and write down what makes them work. Measurements catch facts; looking catches design.
4. **Write `study.md`:**
   - 5 to 10 transferable rules, each phrased so it could apply to an original piece. Example: "The accent color covers under 5% of the frame and marks the story object."
   - A palette file for the general color relationships.
   - One "stays with the source" line naming what is specific to that work (its characters, designs, signature motifs) and is not to be reused.
5. **Test.** Make one original 3 to 5 second piece that applies three of the rules to a subject from the human's current script. Judge it against the rules, not by how closely it resembles the reference.
6. **Ask for a verdict and log it.**

---

## Part 4: Connecting the studios

Do this in the setup session. For each tool, write what you learned in `lab/notes/<tool>.md`: version, what works, what does not, exact commands that succeeded.

### Blender

- Check the version. 5.2 LTS or newer is preferred; the live connection needs 4.2 or later.
- **Headless** (`blender --background --python script.py`) for renders and batch work. This needs no setup beyond the install.
- **Live**, through Blender's official MCP server, for look-adjust-look work on the scene the human has open. The human installs the Blender MCP Server add-on once and starts the connection inside Blender each session (Preferences > Add-ons > BlenderMCP). For the Claude Code side, follow Blender's MCP server docs (blender.org/lab/mcp-server) and the Claude Code MCP guide (code.claude.com/docs/en/mcp). Tell the human exactly which clicks are theirs.
- Changes made live reach the .blend file only when it is saved in Blender.

### ComfyUI

ComfyUI is free, open-source software that runs AI image and video models locally on the human's GPU. Workflows are node graphs, and a local HTTP API lets you run them without the interface. Here it does the controlled jobs that Midjourney and Flow cannot:

1. **Depth maps** from stills, for 2.5D camera moves.
2. **Layer separation:** cut the subject from the background and inpaint the hole behind it, giving clean plates.
3. **Structure-guided painting:** depth and outlines from Blender in, a painted frame out that matches the camera exactly.
4. **Style lock:** our own approved frames as the style reference, so every shot matches.
5. **Upscaling** stills and clips.
6. **Frame interpolation and video restyle.** Later, and with care: these are where flicker shows up.

Setup:

1. Run `nvidia-smi`. Report the GPU, VRAM and free disk space.
2. Ask, then install by the official method in docs.comfy.org/installation (the desktop app, or `comfy-cli`).
3. Start from ComfyUI's built-in workflow templates. Prefer them to community downloads. Custom nodes run code on this machine, so install only what a job needs and ask first.
4. Before each model download, tell the human its name, size, purpose, and whether its licence allows commercial use. Some model licences restrict it, and this channel may earn money. Record every model in `comfy/MODELS.md`.
5. Do not assume model names from memory. Read the current docs and templates to see what is supported now, and check each model's VRAM needs against this machine.
6. Save each working workflow in API format to `comfy/workflows/<job>.json`.
7. Write `tools/comfy_run.py`: load a workflow, set its inputs (image paths, prompt, seed), POST it to `/prompt` on the local server (default `http://127.0.0.1:8188`), poll `/history/<prompt_id>`, and copy the outputs into the current experiment folder.
8. Record workflow name, model and seed in `notes.md` for every output, so any frame can be regenerated.

First tests: job 1 on one still (open the depth map and check it makes sense), then job 3 on one simple Blender still.

If the GPU turns out to be short for a job, say so and use the fallback noted in the pipeline.

### DaVinci Resolve Studio

Since Resolve 21.1, scripting and the built-in MCP server exist only in the Studio edition.

- Check the edition and version first.
- **If it is the free edition:** do not try to script it. Deliver a timeline file Resolve can import (FCPXML or OTIO), the per-shot files and any LUTs, and list the steps the human does by hand.
- **If it is Studio:** read Blackmagic's documentation for the built-in MCP server in the installed version and connect following the Claude Code MCP guide. External scripting has to be enabled in Resolve's preferences (System > General > External scripting using: Local). That click is the human's.
- This control is new. Prove each capability on a throwaway project before relying on it: create a project, import one clip, place it on a timeline, apply a LUT, render two seconds. Write what works in `lab/notes/resolve.md`.
- Always work in a new project or a new timeline.

---

## Part 5: Experiment menu

Each experiment follows the loop in Part 2 and ends at 10 seconds or less.

### E1. Live Blender light study

Three simple forms on a ground plane. Relight the scene five times by looking at each render and deciding what to change. Deliver the five stills as one contact sheet with a line on what changed each time. If the live connection is unavailable, do the same headless.

### E2. AI paint over 3D

Build a simple scene in Blender. Render control passes: normalized depth, outlines, per-object masks. Run ComfyUI job 3 with job 4: depth and outlines in, painted frame out.

- **Done when:** the painted still matches the Blender camera exactly and the surface no longer reads as 3D.
- **Watch for:** faces and hands, and style drift between frames.

### E3. Shaders

Images built entirely from math in GLSL fragment shaders: fog, light fields, raymarched landscapes, liquid forms. Resolution-independent and perfectly loopable.

- **Render offline** to frames and encode with ffmpeg. A standalone OpenGL context from Python (for example moderngl) works; so does WebGL in a headless browser. Use whichever runs on this machine and prove it with a one-second render.
- **Drive time from the frame number** (`frame / fps`), never the wall clock, so renders are repeatable.
- **For seamless loops,** make every time-dependent term periodic over the loop length.
- **First tests:**
  1. A slow fog or light field in a dark palette with one accent color, 10 seconds.
  2. A raymarched landscape with distance fog and a slow dolly, 8 seconds.
  3. A seamless 10-second loop of either.
- **Watch for:** banding in dark gradients (add dither or fine grain, render at higher bit depth), aliasing (supersample), and motion that is too fast for this channel.

### E4. Simulation

Smoke, fluid, cloth, particles and growth systems in Blender.

- Bake at low resolution first. Check cache size and ask before a bake that will use many gigabytes.
- **First test:** a single plume of smoke or ink rising and curling, lit from one side, in two colors, 5 seconds. Or a cloth settling over a simple form.
- **Watch for:** bake time, and simulations that look busy. One clear motion is better than many.

### E5. Vector motion design

Shape animation, line drawing, morphs and kinetic type, built in Remotion or SVG.

- If the project uses Remotion and its official skills are not installed, propose them (see Part 8).
- **Principles:** no linear easing; offset related elements slightly so they overlap in time; two or three moves per shot at most; let things hold.
- **First test:** a 6-second title card for the current essay. Type plus one geometric motif. Follow `STYLE.md` for typography.

### E6. Audio-driven visuals

Motion that breathes with the voiceover or music.

- Extract a loudness envelope and onsets from the audio (ffmpeg or librosa). Smooth heavily, with a fast attack and a slow release, so the motion breathes and does not jitter.
- Export one value per frame as JSON. Use it to drive a single parameter in E3, E5 or Blender: glow strength, scale, particle emission.
- Keep the range subtle, around 5 to 15% of the parameter. The viewer should feel it, not notice it.
- **First test:** an accent glow that swells with the voice over a 10-second voiceover excerpt.

---

## Part 6: Pipelines

Each pipeline produces finished shots for an essay. Run one per session, follow the loop in Part 2, and stop for a verdict. All four end in the same finish stage.

### P1. Living paintings

A still image becomes a moving shot with a controlled camera. The cheapest route to an expensive look.

1. Write the key-art prompt for the human: 16:9, clear depth layers (foreground, subject, background), the scene palette. They generate it and save to `keyart/`.
2. ComfyUI: depth map (job 1), separate the subject and inpaint a clean background plate (job 2), upscale if needed (job 5).
3. Blender: place the layers at depths taken from the depth map, or displace a subdivided plane by the depth map for gentle moves. Animate a slow push or lateral drift.
4. Add life: a few drifting particles in the accent color, a thin shader fog layer between planes (E3), optionally a voice-driven glow (E6).
5. Render 8 to 10 seconds.

- **First test:** one still, an 8-second push-in.
- **Done when:** nothing tears or stretches, and it feels like a camera moving through space and not a zoom on a picture.
- **Watch for:** too much parallax (check the frame edges and thin details like hair every tenth frame), depth errors, particles that get busy.
- **Without ComfyUI:** ask the human for the subject on a plain background and the empty background as two separate images.

### P2. Painted worlds

You build the scene and the camera; AI paints the surface. Shots that cannot be filmed, with exact control.

1. Brief the shot: what happens, the camera move, the palette.
2. Blender: block the scene with simple geometry and animate the camera. Render a plain grey preview. **Stop** and get the camera and composition approved before any painting.
3. Render control passes for the key frames: depth, outlines, masks.
4. ComfyUI: paint the key frames (jobs 3 and 4). **Stop** and show the stills.
5. Motion, in order of preference:
   - **Camera projection.** Project the painted frame back onto the blockout geometry from the camera, then render the real camera move in Blender. Stable and flicker-free. Holds for moderate moves, until the camera reveals surfaces the painting never covered.
   - **In-between by video model.** The human generates the motion in Flow from the painted first and last frames, using your motion prompt. Better for organic motion (water, cloth, clouds).
   - **ComfyUI video with control**, if a current method holds up without flicker on a 3-second test.

- **Done when:** the composition matches the blockout, the surface does not read as 3D, and nothing flickers.
- **Watch for:** stretching where projection runs out, style drift between key frames.

### P3. Breathing visuals

The image moves with the narrator's voice. A candidate for the channel's signature.

1. From the voiceover: loudness envelope, onsets, and word timings if a transcript exists.
2. Pick one visual instrument: a shader light field, a particle field, or type.
3. Map sound to image:
   - loudness to glow or intensity, within 5 to 15%
   - onsets to small pulses
   - pauses to stillness, so silence visibly calms the image
   - sentence boundaries to slow color shifts
4. Render as a background plate, or with alpha as an overlay.

- **First test:** 20 seconds of voiceover over a shader light field.
- **Done when:** it looks alive with the sound off, and connected with the sound on, and nobody would call it an audio visualizer.
- **Watch for:** jitter, literal bars-and-waves visuals, and using it in every shot.

### P4. Real plus unreal

The human's own camera footage with generated elements composited in. It reads as authentic because most of the frame is real.

1. Write a shot request list for the human: what to film, framing, duration, tripod or handheld. Good subjects: hands, water, smoke, a candle, fabric, light through glass. Ask for locked-off shots where possible, a few extra seconds on each end, and the lens focal length.
2. Ingest and make a contact sheet. Pick takes.
3. Locked-off shots composite directly. For moving shots, track the camera in Blender or Fusion and check the solve error. If the solve is poor, ask for a locked-off reshoot.
4. Add elements: particles that pass behind and in front of the subject (use masks), a glow in the accent color, or simple geometry.
5. Match the plate: black level, grain, softness, light direction, color. Integration is most of what makes it believable.

- **First test:** a locked-off shot of hands or a candle, with accent particles passing behind and in front.
- **Done when:** the added elements feel lit by the scene.
- **Watch for:** elements sharper or cleaner than the footage, tracking drift, too many elements.

### Finish stage (all pipelines)

1. Unify: the same light grain on every shot, and one palette LUT per scene where sources differ.
2. Assemble in a new Resolve project or timeline, cut to the voiceover.
3. Grade: one look per scene.
4. Render a proxy for review.
5. If the project has a `/review-cut` skill, run it.

If Resolve control is unavailable or a capability is not proven yet, hand over the timeline file, shots and LUTs with the manual steps listed.

---

## Part 7: Craft notes

Before the first piece in a technique, spend about ten minutes reading a strong source and write `lab/notes/<topic>.md`: 5 to 10 takeaways in your own words, each tied to something we could try. Summarize; do not copy text. Re-read the note at the start of related work, and add to it when a piece teaches you something.

| Topic | Where to read |
|---|---|
| Animation timing and spacing | the twelve principles of animation; focus on timing, slow in and slow out, arcs, staging, secondary action |
| Shaders | The Book of Shaders (thebookofshaders.com); Inigo Quilez's articles (iquilezles.org) on distance functions, noise and palettes |
| Generative systems | The Nature of Code (natureofcode.com) |
| 3D lighting and production | Blender Studio's open films and production files (studio.blender.org) |
| Compositing and integration | articles on matching grain, black levels and light when combining footage with CG |
| Motion design | articles on easing, choreography and hierarchy; the Remotion docs for implementation |
| Tools | release notes and docs for the installed versions of Blender, Resolve, Remotion and ComfyUI |

---

## Part 8: Skills

1. List what is already in `.claude/skills/` and any installed plugins.
2. Remotion's official Agent Skills install with `npx skills add remotion-dev/skills`, or `npx remotion skills add` from inside a Remotion project. Propose this if the project uses Remotion and they are missing.
3. Before installing any third-party skill, fetch its `SKILL.md`, tell the human in a few lines what it instructs and what commands it would run, and wait for a yes. A skill is a set of instructions you will follow with the human's permissions, so it deserves the same care as running someone else's script.
4. When one experiment or pipeline earns three keeps, draft its working recipe as a project skill (for example `/living-painting`) and ask before saving it.

---

## Sessions

**A. First session (no installs)**
1. Part 1: set up the lab.
2. E3, first test 1 (fog or light field).
3. E5, first test (title card).
4. E6, first test (voice-driven glow). If no voiceover is in the project, ask for a 10-second excerpt.
5. Stop. Present the three on one contact sheet for ranking.

**B. Setup session**
1. Report: Blender version, Resolve edition and version, GPU and VRAM, free disk space.
2. Part 4: connect Blender, install ComfyUI and run its two first tests, run the Resolve throwaway-project test.
3. Stop. Report what works, what needs the human, and what was downloaded.

**C onward: one pipeline per session**
- C. P1 Living paintings. Needs one key-art still from the human.
- D. P3 Breathing visuals. Needs a voiceover excerpt.
- E. P4 Real plus unreal. Needs footage from the human.
- F. P2 Painted worlds.

The remaining experiments (E1, E2, E4) fit in wherever a pipeline needs them.

---

## What to report each time

- Paths to the clips and the contact sheet.
- Two or three lines per piece: what it is, what is weak, what you would try next.
- Anything you need from the human: an approval, an asset, a click, a purchase.
- The question: keep, revise or reject, and why?
