# shader-fog-01 (E3, first test 1)

**Intent:** one small warm light holding still while cold fog drifts slowly past it.

**Palette:** night blue-black `#06080c`, fog `#1a222d` to `#34404f`, accent amber `#ffb060` (the light only).

**Good looks like:** the eye goes to the light first, even at 320 px in grey; the fog reads as depth
(some in front of the light, some behind), not as a flat texture; the drift is calm enough for a
voiceover to sit over it; no banding in the dark areas.

**Tests:** the eye-test rules from ART_LAB.md (one idea, brightest point on the subject, one accent,
one motion). No standing rules exist yet. Open question it touches: heavy grain or light grain.

10 s, 1920x1080, 24 fps, rendered offline with `tools/shader_render.cjs`.
