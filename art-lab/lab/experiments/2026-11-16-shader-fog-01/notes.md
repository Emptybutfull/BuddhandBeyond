# shader-fog-01: notes

**Made with:** `tools/shader_render.cjs` (GLSL through headless Chromium, WebGL2, software renderer; no GPU),
ffmpeg 6.1.1. 240 frames at 1920x1080 took 109 s to render on 4 CPU cores.

```
node tools/shader_render.cjs lab/experiments/2026-11-16-shader-fog-01/fog.frag --out frames --frames 0-239
ffmpeg -framerate 24 -i frames/f_%05d.png -c:v libx264 -crf 18 -preset slow -tune grain -pix_fmt yuv420p final.mp4
```
`still.png` is frame 168 (7.0 s). No seed: the shader is fully determined by the frame number.

**Revisions on my own (3 allowed, 2 used):**
1. First still was sepia all over (amber glow reached 36% of the frame) with milky blacks. Tightened the glow,
   made the fog colder and gave it clear dark gaps. Accent fell to about 5% of the frame.
2. Fog read as clouds. Stretched it sideways so it reads as mist, gave the near layer more speed than the far
   one (parallax), and made the wisps in front of the light cool instead of brown.

**Eye test (320 px, grey):** brightest point is on the light (x 0.63, y 0.54). 31% of the frame is near black.
One motion (fog drifts, light holds). One accent.

**What a critical viewer notices first:** it looks like the moon behind cloud. That is a familiar image, so it
is calm and legible but not distinctive.

**Weak:**
- No sense of place or scale: nothing says how big or how far the light is.
- The fog is recognisably layered noise; the wisps do not curl or thin out the way real mist does.
- The light is partly covered for much of the clip, so the focal point dims (peak grey value about 0.5).
- Not a seamless loop (that is E3 test 3).

**Next I would try:** a ground line or still water under the light so it becomes a lamp in a place; one slow
breath in the light (this is the plate P3 would drive from the voice); a loopable version.
