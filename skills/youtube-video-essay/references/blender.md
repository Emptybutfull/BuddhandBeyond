# Blender in the pipeline

Blender is for the shots that need real light: glass, gold, depth of field, physics, a camera
moving through space. Everything flat (type, gradients, halftone, diagrams, collage) stays in
Remotion — it is faster and exact. Aim for 1–3 Blender shots per video, 3–6 s each.

## Three ways to drive it (pick the first that fits)
1. **Headless script (default)** — Claude writes a Python scene script and runs
   `blender -b -P <script>.py -- <args>` from the terminal. Reproducible, lives in the project,
   no clicking. Tested this way (Blender 5.0, Cycles). Scripts in `<skill>/scripts/blender/`.
2. **Blender connector in Claude Desktop** — for look-dev while Steven watches the viewport.
   Official add-on from Blender Lab (needs **Blender 5.1+**): in Blender install the MCP add-on,
   enable it (Preferences → Add-ons), turn on "Allow Online Access", start the server; in Claude
   Desktop: Settings → Connectors → Blender. A community server (`ahujasid/blender-mcp`) also
   exists with a different add-on — do not mix the two setups. Both run model-written Python inside
   Blender with no sandbox: keep them updated, open only our own .blend files, close the server
   when done.
3. **By hand** — Steven adjusts a saved .blend; Claude re-renders headless.

## Rendering rules
- Engine: **EEVEE** on the PC's GPU for most shots (seconds per frame); **Cycles** when glass,
  caustic-like reflections or soft GI are the point. Cycles on GPU: set
  `cycles.device = 'GPU'` after enabling the device in preferences; denoise on, 64–128 samples.
- 1920×1080, 30 fps to match Remotion (or 24 and let Remotion hold frames). PNG sequence, 16-bit
  for gradients. `film_transparent = True` when the object will sit on a Remotion background.
- Look: AgX view transform; depth of field on; one key + one rim light with **disc** shapes
  (square lights make square reflections); dark gradient world so highlights read.
- Always render **one still first**, look at it, then the sequence in the background.
- Tested timing (4 CPU cores, no GPU, 960×540, 48 samples, glass): ~20 s/frame. A GPU is 10–50×
  faster — check `nvidia-smi` before choosing settings.

## Into Remotion
- PNG sequence → `public/blender/<shot>/0001.png…`; show with
  `<Img src={staticFile(\`blender/indra/${String(f).padStart(4,'0')}.png\`)} />` where
  `f = Math.min(frames, Math.floor(frame * blenderFps / fps) + 1)`.
- Make it ours: put it through the chapter's colour ramp (`GradientMap`), add grain, type on top.
  A lapis render can be re-coloured to any chapter without re-rendering.
- Alpha sequences sit above gradients like any cut-out; add a contact shadow in Remotion.

## Scene recipes
| Shot | Build | Notes |
|---|---|---|
| **Indra's Net** (done: `indras_net.py`) | lattice of glass spheres with tiny emissive cores, gold threads, hero jewel in focus, slow dolly | palettes lapis/plum/jade/ember; `--still N` to test |
| Gold dharma wheel / vajra / bell | procedural or AI-made mesh, gold Principled (metallic 1, roughness 0.25), turntable, transparent film | reusable alpha asset for any chapter |
| Thangka in 2.5D | plane with the painting + depth map as displacement, camera push with DOF | depth from Depth Anything; small moves only |
| Lotus opening | petals as curves with shape keys, subsurface scattering, light from inside | 4–6 s, slow |
| Sand mandala blown away | particle system from an image texture + wind + turbulence force | bake physics before rendering |
| Karma dominoes / ripples | rigid bodies or ocean modifier / dynamic paint | bake first |
| Butter lamp field | hundreds of emissive flames with flicker noise, DOF bokeh | EEVEE is enough |
| Prayer flags | cloth simulation with wind, five colours | bake first |
| Moon in water | plane with wave displacement reflecting an emissive disc | the reflection moves, the moon does not |
| Text in space | extruded heavy-sans word, camera flying through a letter | match fonts with Remotion |

## Getting 3D models
- Build simple ones procedurally in the script (wheel, stupa, beads, lotus) — cleanest.
- Image-to-3D generators (Tripo, Meshy, Hunyuan3D, Rodin; most have a free tier — check the
  licence for commercial use): turn a Midjourney/ChatGPT image of an object into a mesh, import
  the .glb, replace materials with ours. Good for statues, bells, bowls; check faces and hands.
- Poly Haven (CC0) for HDRIs and textures.
- Sacred figures as 3D: only from scans of real statues or with the same care as design-system.md
  § Sacred art.

## Parallax without Blender
For a quick 2.5D move on a painting, DepthFlow (free, open source; AGPL or a paid commercial
licence) or a depth-map displacement in Remotion does 80% of the job.

## Gotchas
- Blender 5 keeps animation curves in action layers/slots (`action.layers[].strips[].channelbags[].fcurves`); old `action.fcurves` scripts break.
- Relative output paths fail in background mode: always `os.path.abspath`.
- `pip install bpy` (Python 3.11) gives Blender as a module for scripts when Blender itself is not on PATH.
- EEVEE needs a GPU/display; on a machine without one use Cycles CPU.
- Glass needs light sources *inside* the scene to reflect; a sphere in an empty world is invisible.
