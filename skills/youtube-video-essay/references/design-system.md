# Design system — how Empty But Full looks

Direction chosen by Steven (Nov 2026) from his own reference board + research (sources at the
bottom). Read before any look test. Working examples of everything here:
`template-additions/src/design/` (render `DesignShowcase`).

## House look in one line
**Grainy gradients**: flowing heat-map colour on near-black with heavy film grain, huge heavy type
with tiny labels — and a **new ground colour every chapter**. Three accent looks appear inside it:
**print** (halftone cut-outs on flat colour or paper), **sacred art** (real thangka colour), and
**glow** (white-light figures for awakening moments).

### Steven's reference board (what each one teaches)
| Reference | Take from it |
|---|---|
| "Thermal Gradients" (heat-map ribbon on black, wide type, film-strip edge) | THE main look: a scalar field mapped through a colour ramp, grain on top, wide display sans, small coloured sub-lines |
| "NO IDEA" pigeon (cobalt halftone photo + giant vermilion sans on grey paper) | punch-line frames: one-colour halftone cut-out, word so big it crops off the frame, microtext header |
| Blue speed-lines figure (one ink, white streaks, tiny figure) | one-colour scenes; motion drawn as streaks; tiny human, huge field |
| Red "IF YOU'RE WAITING FOR A SIGN / THIS IS IT" | statement cards: flat red, black geometric heavy sans, two text blocks at opposite corners, `001` index |
| Japanese flower poster (cyan field, botanical cut-out, bone header band, kana + boxed kanji label) | flat-colour chapters: detailed old illustration on a flat field, header band, vertical label box |
| "Ethereal style" board (glowing figures, blur, prism flares, script + microtext) | awakening / dream moments only: bloom, light figure, lens flare, elegant italic |
| "Digital nostalgia" board (pixel type, old OS windows, dither) | rare: "the modern distracted mind" passages; dither as texture |
| Blue Vajradhara thangka (lapis body, cinnabar halo, gold, turquoise) | the sacred palette; proof that thangka colour and poster colour are the same family |

## The 12 rules
1. **Design first, motion second.** Every frame must work as a still poster before it moves.
2. **One focal point.** If everything moves, nothing wins.
3. **Three colours per scene** on top of the ground: ground, one main, one accent (≤ 10% of frame).
4. **Deep, tinted darks; no flat grey.** Gradient scenes sit on `#0b0a0c`–`#101014`, never `#000`
   and never mid-grey; paper is warm (`#e9e2d2`), never `#fff`.
5. **Confident, unexpected colour.** Commit to saturation; pick the hue the subject doesn't suggest.
6. **Type is huge or tiny, never medium.** One word can crop off the frame; labels are 20–26 px.
7. **Space is a material.** Leave a third of the frame to the ground. Emptiness is the subject.
8. **Depth in three layers**: soft field, sharp subject, foreground grain/dust.
9. **Heavy grain on everything** (12–20% on gradients, 6–9% on flat/print scenes). Grain is the glue
   that makes code graphics, AI art, Blender renders and camera footage one film.
10. **Handmade beats machine-perfect.** Halftone dots, misregistered ink, brush edges, paper fibre.
    Glossy 3D blobs and smooth default gradients read as AI slop — our gradients are grainy and banded.
11. **Pacing is meaning.** Fast cuts for the agitated mind, a held still frame for the quiet one.
12. **Stillness is allowed.** A 4-second hold on a perfect frame is a premium move.

## Chapter palettes
Every chapter picks one row. Gradient rows are colour **ramps** (dark → light) that a field is mapped
through; flat rows are print grounds. Never two neighbouring chapters from the same row.

| Name | Kind | Ramp / colours | Type | Use for |
|---|---|---|---|---|
| **Thermal** | gradient | `#0b0a0c` → `#16307a` → `#12a5c9` → `#3fbf6a` → `#f08a1c` → `#e3261c` | `#f25c1e`, sub `#c7a23a`, labels `#34c3d9` | openers, energy, craving, the mind heating up |
| **Lapis Fire** | gradient | `#0b0a10` → `#14235e` → `#2747c7` → `#c0261d` → `#e9a23b` | bone `#efe6d2` | emptiness, cosmos, deity sections (the Vajradhara colours) |
| **Jade Aura** | gradient | `#08100e` → `#0f4a45` → `#22a58c` → `#a8e3c3` → `#f2e6b1` | `#f2e6b1` | compassion, breath, practice |
| **Plum Ember** | gradient | `#0e0810` → `#3b1247` → `#a01f6b` → `#ee5a2f` → `#f6c98a` | `#f6c98a` | attachment, emotion, suffering |
| **Dawn** | gradient | `#0a0c1c` → `#2a2a7c` → `#8a4fb0` → `#ef7f6a` → `#f8d77a` | `#fbf3e1` | the path, awakening, endings |
| **Ash** | gradient | `#0c0c0c` → `#2a2a2c` → `#6d6a66` → `#d9d2c5` | `#ff5a36` ember accent | impermanence, death, silence |
| **Cobalt Print** | flat | ground `#2440b3`, ink `#e9e2d2`, accent `#e2512a` | — | statements, one-ink scenes |
| **Signal Red** | flat | ground `#c8161a`, ink `#0d0d0d` | — | the single hardest line of the video |
| **Cyan Poster** | flat | ground `#0aa3d6`, header band `#e9e2d2`, ink `#0d0d0d`, art in vermilion/green | — | stories, plants, people, Japanese-poster layouts |
| **Bone Paper** | flat | ground `#e9e2d2`, inks `#2440b3` + `#e2512a` | — | diagrams, quotes, "NO SELF"-type punch frames |

All five traditional colours together (blue, white, red, green, yellow) only once per video — the
mandala, the wheel, the end of the path.

## Type (all free, all in `@remotion/google-fonts`)
| Role | Font | Reference it matches |
|---|---|---|
| Wide display | **Unbounded** 700–900 (or **Syne** 800) | THERMAL: chapter titles, video title |
| Heavy statement | **Jost** 800–900 (Futura family) | "THIS IS IT", "NO IDEA": punch lines, statement cards |
| Microtext / labels | **JetBrains Mono** or **DM Mono** 400–500, caps, +0.08 em | `001`, `ERROR /404`, `AW 24/25`, coordinates, sources |
| Quotes / sutras | **Instrument Serif** italic or **Cormorant Garamond** italic | ethereal posters, scripture, anything said softly |
| Kanji / kana | **Shippori Mincho** 700–800, **Noto Serif JP** 900 | Japanese poster: 空 無常 縁起 中道 蓮 |
| Tibetan | **Noto Serif Tibetan**, **Jomolhari** | mantra syllables, key terms — Steven checks every word |
| Devanagari | **Noto Serif Devanagari** | शून्यता, धर्म |

Rules: tight leading on heavy sans (0.86–0.92), tracking −0.02 em on giant words, +0.08–0.2 em on
labels. Microtext sits in corners like print marks (index top-right, source bottom-left). Real
scripts only, spelled by Steven or a cited source — never generated pseudo-script.

## Layouts (1920×1080, 12 columns, 96 px margins)
1. **Gradient + wide title** — field owns the frame; title bottom-right or bottom-left in 2–3 lines; coloured sub-lines under it (THERMAL).
2. **Statement card** — flat ground; heavy sans block top-left, answer line bottom-right, index in a corner (THIS IS IT).
3. **Punch cut-out** — halftone figure (Steven, a monk, an object) one ink colour; a two-line word so large it crops; figure overlaps the word (NO IDEA).
4. **Poster with band** — flat field, detailed art cut-out centred, bone header band with heavy kana/kanji, small boxed vertical label (flower poster).
5. **Tiny figure, huge field** — a 5%-of-frame person in a streaked or gradient field (speed lines).
6. **Glow figure** — white-light silhouette with bloom on a dark field, italic serif + microtext (ethereal).
7. **Diptych** — two palettes side by side, one line or object joining them.
8. **Bento** — rounded tiles on a gradient; one tile is Steven.
9. **Frame within frame** — Steven natural in a rounded window on a gradient ground, header/footer microtext, the idea appearing beside him.
10. **Data plate** — thin-line diagram with mono labels on Bone Paper, numbered `01–12`.

## Steven on camera (the mix)
- **Longer talking**: natural colour, graded warm, in a rounded window (layout 9) or full frame with
  a slow zoom. The gradient of the current chapter is the ground behind the window.
- **Punch lines**: freeze or matte him → one-colour **halftone cut-out** over a flat ground with
  the giant word (layout 3). 2–4 s, then back.
- **Rare**: glow silhouette (layout 6) for no-self / luminous-mind moments. Once per video.

## Sacred art
- **Real art first**: traditional thangkas, statues, murals (museum open-access scans, Steven's own
  photos). Show them whole before any crop. Never mirror a deity; never cover a face with text.
- **Reprint allowed**: real art may be converted to the print look (halftone, two inks) for a
  matching frame, after it has been shown clean once.
- **ChatGPT recreation allowed** when no usable original exists: write an **iconography spec** first
  and paste it whole into the prompt — name and tradition; body colour; faces, arms, eyes; each
  hand's mudra and implement (left/right); posture and seat (lotus, moon/sun disc, animal); crown,
  ornaments, silks, robes with colours; halo and aureole colours; consort/retinue if any; style
  (Karma Gadri / Menri thangka, mineral pigment, gold line). Then compare the result with a real
  reference image, detail by detail, before use (ai-assets.md § slop check).
- AI never invents a deity or a mantra. Mantra and seed syllables come from Steven.

## Finish
Grain as above, moving every frame · vignette 20–35% · halation only on the brightest 5% · chromatic
aberration ≤ 2 px at edges on gradient scenes · halftone screens at 45° with 6–10 px cells, slight
misregistration (1–2 px) between inks · paper fibre under flat scenes.

## Buddhist concepts → visuals
| Concept | Visual | Technique |
|---|---|---|
| Emptiness 空 | 色 made of dust dissolves into a star field and re-forms as 空 | particles sampled from type, Lapis Fire field |
| Indra's Net | lattice of glass jewels, each holding the others | Blender ray-traced glass → gradient-mapped to the chapter ramp |
| Impermanence 無常 | five-colour sand mandala swept away by wind | 30k grains on canvas |
| Dependent origination 縁起 | twelve links as an instrument dial, each lighting the next | data plate, two inks on Bone Paper |
| Middle Way 中道 | hot half, cold half, one string vibrating between | diptych of two ramps |
| No-self 無我 | halftone figure + "NO SELF", `ERROR /404 — NO SELF WAS FOUND` | punch cut-out |
| Luminous mind | figure of white light, prism flare | glow figure |
| Suffering → awakening | lotus on a flat cyan field | poster with band |
| Craving | thermal field heating from blue to red as the line is spoken | ramp animated over time |
| Karma | ripples / dominoes / seed to tree | Blender physics, growth curves |
| Bardo / rebirth | tunnel of rings toward a white point | polar field through a ramp |
| Breath | one aura breathing 4 s in, 6 s out, mono counter | Jade Aura field |

## Reads as cheap — reject at the look test
Smooth un-grained gradients · purple-to-blue "AI" gradient with centred text · Inter/Roboto/Arial ·
medium-sized text · drop shadows on type · five fonts · everything fading in the same way · stock
whooshes on every cut · glossy AI illustration with galaxies · halftone used as a random filter
instead of as the ink.

## Sources
Steven's reference board (8 images, Nov 2026). YouTube transcripts: tppo "How I Edit My Videos
(Graphic Design Style)"; Ben Marriott "The Best Motion Design & Animation of 2026 (So Far)";
jayd3nfx "Why Simple Edits Look So Much Better"; Mr omi "How to Make Viral Animated Shorts Using
Claude"; Lukas Margerie "How to Make Insane Motion Graphics With Opus 5.5". Watched: Infinity SI
"The architecture of a psychedelic collapse" (1.3M); @spiritual_revelations "11 Laws" (1.4M);
@deepankar_paria "Mind Stopped Is GOD" (2M). Pinterest Palette 2026 (cool blue, jade, plum noir,
wasabi, persimmon); Anthropic's guidance on avoiding generic AI aesthetics.
