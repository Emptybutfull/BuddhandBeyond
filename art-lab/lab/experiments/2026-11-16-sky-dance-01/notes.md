# sky-dance-01: notes

**Made with:** Blender 5.2.4 LTS for the backgrounds (`blender/sky_dance.py`, about 20 s per frame, no GPU),
a figure drawn in code (`SkyDancer.tsx`; S04 uses the seated figure from the design kit, recoloured), and
Remotion 4.0.539 to lay them together (`SkyDanceFrames.tsx`).

```
python blender/sky_dance.py --shot S01 --out public/skydance/S01.png
python blender/sky_dance.py --shot S01 --out public/skydance/S01_obj.png --objects-only    # transparent sky
(same for S04 and S05), then render the compositions SkyDanceS01, SkyDanceS04, SkyDanceS05 as stills
```
The `_obj` layer is the clouds and peaks alone, so the line of light can pass behind them.

**Revisions on my own (3 allowed, 2 used):**
1. The first peak was a plain pyramid mostly hidden by cloud; rebuilt with buttress ridges, bigger in frame.
   The sky had no depth: the gradient was reading the wrong direction, now deep blue overhead.
2. The first figure stood like a doll in all three frames. S01 and S05 now have dance poses and a robe that
   flies; in S04 he sits in the air instead, so his outline repeats the mountain's.

**Eye test:** the saffron (figure plus line) is the only warm thing in each frame and covers about 2 to 3% of
it. In all three frames the brightest point is cloud or snow, not him: colour, not brightness, is what pulls
the eye to him. That misses the eye-test rule "brightest point on the subject" and is worth a look in motion.

**What a critical viewer notices first:** S04. The seated figure and the peak answer each other and the ring
of light ties them together. It is the strongest of the three.

**Weak:**
- The dancing figure (S01, S05) is a simple cut-out: tube arms, mitten hands, an angular robe. It reads at
  this size but would not hold a close shot. The seated figure is more finished, so the two do not quite match.
- "Dancing" is one pose per frame so far; whether it feels like dance depends on motion, which is untested.
- S05 is very symmetrical and plain; the sea is flat blue with dashes. Calm, but the least interesting frame.
- The line of light has a soft glow that is wider than the brief's "glow on the accent only" might want.
- S04's line seems to attach at his shoulder; where the line starts on his body is not designed yet.
- A dancing Buddha is not a traditional image. That is the premise, but the human should confirm the figure
  feels right to him.

**Next I would try:** animate S04 first (clouds racing on twos, he and the peak dead still, the ring drawing
itself); then S03 with the bird. For closer shots, the optional key art in `story/prompts.md`.
