# cel-look-01: notes

**Made with:** Blender 5.2.4 LTS (the `bpy` Python module, EEVEE, headless, no GPU), `blender/lib/cel_look.py`,
`blender/look_test.py`, `tools/accent_glow.py`. About 20 s per 1080p still at 16 samples on 4 CPU cores.

```
python blender/look_test.py --palette look/palettes/amber_day.json --out still_day.png --outline lineart
python blender/look_test.py --palette look/palettes/charcoal_night.json --out night_raw.png --outline lineart
python tools/accent_glow.py night_raw.png still_night.png --accent ffb347 --strength 0.85 --radius 30
python blender/look_test.py --palette look/palettes/amber_day.json --out still_day_hull.png --outline hull
```
The scene is built by the script from fixed seeds, so the frames repeat exactly.

**Checks (`tools/look_check.py`, lower 45% of the frame):** day: 6 colours cover 95% of pixels, 90% flat,
1.7% soft gradient. Night: 3 colours, 91% flat, 2.2% soft. Sky gradient is the only gradient.

**Outlines, both tried:**
- **Line Art** (used for the stills): silhouettes plus interior edges, so crystals and rocks read as drawn
  forms. Its thickness is in world units, so near objects got heavier lines; fixed by giving each distance band
  its own Line Art object. Lines are about 2.5 px near and far. Parts thinner than two line widths (mast, arm)
  were swallowed, so those use a hull line.
- **Inverted hull** (`still_day_hull.png`): silhouettes only, no interior lines. Cheaper and stable in motion.
  My suggestion: Line Art for stills and held shots, hull for anything that moves fast. Not yet tested in motion.

**Departures from the look spec, and why:**
- Glow is added by `tools/accent_glow.py` (keyed on the accent colour), not in Blender's compositor. Reason: the
  same glow can then go on Blender shots, layered stills and AI clips alike (the unify pass needs that), and
  Blender 5.2's compositor uses a new node-group setup I have not driven from a script yet.
- Blender's default output dither had to be switched off; it put noise into every flat area.

**What a critical viewer notices first:** the beacon and its coloured band; then how heavy the near rock is on
the left of the day frame.

**Weak:**
- The near rock takes a fifth of the day frame in the darkest colour and pulls the eye from the beacon.
- Rocks are faceted like low-poly 3D. Flat colour hides most of it, but the shapes are not yet "designed".
- Cast-shadow edges on small parts (under the lamp) are slightly ragged.
- Night: the far ridge almost disappears, and the lamp lights nothing around it (no pool of light on the ground).
- No motion yet: on-twos animation, baked lines and particles are untested.
- The beacon is my own quick design; it is a stand-in, not a story object.

**Next I would try:** a 3-second proxy with a slow camera drift and the lamp pulsing on twos, to see whether
the lines hold; a warm ground shape under the lamp at night; hand-shaped rock silhouettes.
