# Blender: what works on the cloud machine (2026-11-16)

- **Version:** 5.2.4 LTS as the `bpy` Python module (`pip install bpy==5.2.4`, Python 3.13 only, 403 MB).
  5.3.0 also exists on PyPI. No Blender app and no interface here: headless scripts only.
- **EEVEE runs without a GPU** once `libegl1` is installed (software OpenGL). It prints harmless
  `EGL_BAD_MATCH` lines. About 20 s per 1080p still at 16 samples; a first 480x270 frame took 30 s (shader compile).
  Fine for stills and short proxies; long final renders belong on the PC.
- **Cycles** also works (CPU), used earlier for the glass lattice.
- **Not available here:** the live Blender MCP connection (needs the app open on the PC).

API facts checked on 5.2.4 (do not trust memory for other versions):
- Engine id is `BLENDER_EEVEE`. `scene.view_settings.view_transform = 'Standard'` works.
- `scene.render.dither_intensity` defaults to 1.0 and adds noise to flat colour: set 0 for cel work.
- Toon: Diffuse (white) -> Shader to RGB -> Color Ramp (constant, 2 stops) -> output. Sun strength pi makes a
  facing surface return 1.0, so the ramp threshold is simply N.L.
- World: mix two Background shaders by Light Path "Is Camera Ray" so the camera sees the sky gradient but
  surfaces get no sky light.
- Line Art: `bpy.ops.object.grease_pencil_add(type='LINEART_SCENE')` gives a `GREASEPENCIL` object with a
  `LINEART` modifier. `radius` is world-space; `source_type='COLLECTION'` + `source_collection` limits it.
- Compositor: there is no `scene.node_tree`; it is `scene.compositing_node_group` (a node group with an
  interface output). Glare settings are input sockets. Not used yet.
- Shadow quality: `light.shadow_maximum_resolution = 0.0002`, `eevee.shadow_step_count = 16`.
- `ShaderNodeRaycast` exists (the 5.1+ route to toon shading); not tried.

Restore after a machine reset: see `cloud-machine.md`.

### 2026-11-16, later
- World gradient: use Texture Coordinate "Generated" (the view direction) in the world shader. Geometry
  "Incoming" gave no gradient at all. `cel_look.set_world` is fixed; the two approved look frames were rendered
  before the fix, so their skies are flatter than a re-render would be.
- `--objects-only` in `blender/sky_dance.py` renders with a transparent sky (`film_transparent`), giving a layer
  to place in front of anything that should pass behind clouds or peaks.
- Clouds: one mesh of overlapping smooth icospheres with a flat base. Toon shading gives scalloped shadow
  shapes and Line Art draws only the outer contour.

