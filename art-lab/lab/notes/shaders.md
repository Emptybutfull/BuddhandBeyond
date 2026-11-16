# Shaders: tool and craft notes (2026-11-16)

**Tool:** `tools/shader_render.cjs` renders a fragment shader offline through headless Chromium (WebGL2 on the
software renderer). 1080p fog with 9 noise lookups of 6 octaves each: about 0.45 s per frame. Needs `playwright`.
Time is `frame / fps`; `uDur` is there for periodic terms.

**Takeaways** (from what I already know of The Book of Shaders and Inigo Quilez's articles; I could not open
either site from this machine, so re-read them on the PC before relying on these):
1. Dither before 8-bit output or dark gradients band. Two hashes minus one (triangular noise) at about
   2/255 is enough and doubles as fine grain.
2. Fog that only slides looks like a scrolling texture. Warp the lookup with a second noise and let the warp
   change slowly, so shapes billow.
3. Stretch noise sideways for mist; round noise reads as cloud.
4. Depth comes from layers at different speeds, with the nearest layer darkening what is behind it.
5. Mix light in linear values and convert at the end; choose colours in display values.
6. For a seamless loop every time term must repeat over the loop length (sample noise on a circle in time).
7. An inverse-square falloff with a small floor gives a believable glow; multiply by fog density so the light
   spreads where the air is thick.

**Untried:** raymarched landscape (E3 test 2), seamless loop (test 3), supersampling for hard edges.
