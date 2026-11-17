# sky-dance-02: notes

**Made with:** Blender 5.2.4 LTS for backgrounds and cloud sprites (`blender/sky_dance.py`), the design kit's
`Buddha` (seated) and new `DancingBuddha` (same head, torso, robe and hands; new lower body), Remotion
4.0.539 (`SkyDance.tsx`: compositions `SkyDanceS01`, `SkyDanceS04`, `SkyDanceS05`).

```
python blender/sky_dance.py --shot S01 --no-clouds --out public/skydance/S01_bg.png
python blender/sky_dance.py --shot S04 --no-clouds --out public/skydance/S04_bg.png
python blender/sky_dance.py --shot S04 --no-clouds --objects-only --out public/skydance/S04_peaks.png
python blender/sky_dance.py --shot S05 --out public/skydance/S05.png
for k in 1 2 3 5 7:  python blender/sky_dance.py --shot cloud --seed $k --px 2.6 --size 2400x1200 --out public/skydance/cloud_big_$k.png
                     python blender/sky_dance.py --shot cloud --seed $k --px 2.2 --size 1200x600  --out public/skydance/cloud_small_$k.png
```
Clouds are single Blender renders moved as flat sprites; the figure and clouds step on twos, the ring of light
draws smoothly.

**What changed from 01:**
- Figure: the cut-out is gone. The dancer now shares the seated figure's head, torso, robe trim and hands, with
  a flowing lower robe, a loose end over the shoulder and a cream hem. Five poses; `rise` and `turn` are the two
  halves of one step (other arm up, other leg bent, cloth swings across).
- Halo: a plain white disc behind his head in every frame.
- The line of light in S01 is the path of his raised hand over the last 4.5 s. It stays where it was drawn,
  sinks a little and fades. His hands sway slightly in held poses so the line never stops.
- S05: lower camera, sea with long swell bands for depth, tall cloud and an island peak on the horizon, and he
  is off-centre with the line running to a vanishing point.

**Critique rubric (directing.md), scored 1 to 10 from frames pulled every second:**

| Dimension | S01 | S04 | S05 | Note |
|---|---|---|---|---|
| Focal point | 8 | 9 | 8 | one figure, one warm colour |
| Colour | 9 | 9 | 9 | on palette; accent 1.6 to 3% of frame |
| Space | 8 | 8 | 8 | he has room; nothing crowds the edges |
| Depth | 8 | 9 | 8 | far, mid and near cloud layers; S05 was 5 before the swell bands |
| Finish | 8 | 8 | 7 | light grain; S05's far cloud lines are thin and pale |
| Motion | 7 | 8 | not moving | judged from frame sequences, not from watching playback |
| Pacing | 7 | 8 | n/a | S01: 1.2 s of empty sky, then a pose change about every 1.5 s |
| Consistency | 9 | 9 | 9 | was 6: figure and backgrounds now read as one film |
| Idea | 8 | 9 | 7 | S01 says "dancing" now; S05 says "wide sea" more than "vast as the ocean" |

(Type is not scored: there is none.) Nothing is under 7 now. The 7s are what I would work on next.

**Eye test:** the brightest point in the small grey version is still cloud in all three frames. The halo gives
him the strongest local contrast, but large bright clouds still win the "brightest point" measure. Not solved.

**What a critical viewer notices first:** in S04, the stillness: everything streams past and he does not move.
In S01, the line of light curling behind his hand.

**Weak:**
- I cannot watch the clips play. Motion and pacing scores come from reading frames in order; the human's eye
  on the actual clips is the real test, especially for whether S01 feels like dancing or like pose changes.
- S01: he changes between held poses; there is no in-between drawing, follow-through in the cloth, or
  anticipation. On twos this is the style, but it may read as stiff.
- Clouds are flat sprites sliding sideways. Near clouds in S04 move fast; if they feel like cards, they need
  a little scale change or true 3D motion (possible on the PC with a GPU).
- S04: the line starts beside his shoulder with a small hook; where it leaves his body is still undesigned.
- S05 is not animated, and its line of light has a sharp corner where it meets the water.
- Still no sound.

**Next I would try:** S03 (the bird) and S05 in motion, then cut S01, S04, S05 together with a first sound pass
(wind, one bell, a low drone under the mountain) to judge rhythm.
