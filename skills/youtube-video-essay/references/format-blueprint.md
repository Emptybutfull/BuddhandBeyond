# Format blueprint — the Empty But Full hybrid essay

A mix of video essay (Scipio, Broken Ruune, Hidden AmuraKa — see reference-channels.md) and
explainer: Steven's own talk, Steven on camera at the moments that need a face, museum art and
real footage for everything else. Two formats share one pipeline:

- **Hybrid** (default whenever there is camera footage): this file.
- **Faceless** (Plaud audio only): same beats, but every on-camera slot becomes art, a
  QuestionCard or a ChapterCard. Nothing else changes.

Target 12–22 min. Steven's talks are unscripted, so these beats are found in the recording and
arranged in the edit (build_lecture.py EDL), not written. recording.md gives Steven a short list of
beats to say on camera so the edit has them.

## Beat sheet
| # | Beat | When / length | On screen | Sound |
|---|---|---|---|---|
| 1 | **Cold open** | 0:00, 15–30 s | First line to camera, `full`. Then 3–5 art shots under the rest of the hook | Voice alone for 1–2 s, drone fades in |
| 2 | **The question** | ~0:20–0:45, 5–8 s | `QuestionCard`, words timed to the voice, key word in gold | Music dips |
| 3 | **Promise** | 15–30 s | `side` or `full`: what this talk will open up (one sentence) | |
| 4 | **Title sting** | ~0:45–1:15, 4–5 s | `EnsoSting` | One singing-bowl strike |
| 5 | **Chapters ×5–8** | 1.5–3 min each | see Chapter recipe | New music bed per 1–2 chapters |
| 6 | **Thought experiment** | once, 40–60% in, 30–60 s | `full` to camera, pauses held on `PatternBg` cutaways | Music nearly out |
| 7 | **Reopen** | every 2–3 min, one line | `corner` or `full`, or a mini `QuestionCard` | |
| 8 | **Parable** | final chapter, 1–2 min | Voice over ink/thangka art; `LowerThird` for the teacher; `QuoteCard` for the line that lands | Sparse instrument |
| 9 | **Bookend** | last 30 s | The opening image or diagram returns | Opening motif returns |
| 10 | **Closing + CTA** | last 20–40 s | `full`, punched in. Sincere, plain (Broken Ruune) | |
| 11 | **End card** | 12–20 s | `EndCard` (YouTube end-screen slots on the right) | Music tail |

### Chapter recipe (repeat 5–8 times)
1. `ChapterCard`: ONE word (CRAVING, THE CUP, NO ONE HOME), 2–3 s. Low boom on frame 0, then ~1 s of silence.
2. **Anchor**: Steven says the chapter's first idea to camera, 8–16 s, `full` (1–2 chapters `triptych`).
3. **Exposition**: voice over art/footage, shots 3–6 s, slow push-ins; one diagram per chapter
   (`WheelDiagram`, `CompareTable`) shown in `side` mode so Steven explains it next to the picture.
4. **Inversion** to close: the line that flips the chapter's opening claim
   ("We think craving is wanting more. It's wanting to be someone."). `full` or `corner`, 4–8 s.

## On camera: budget and rules
Total **20–30%** of runtime (Scipio ~16%; Steven wants more presence). Single stretch 4–20 s,
at least ~12 s of pictures between stretches (chapter anchors excepted).

| Mode | Share | Use for | Never for |
|---|---|---|---|
| `full` | 10–15% | hook, chapter anchors, opinions, personal stories, thought experiment, CTA | reading a quote, history, describing a picture |
| `side` | 8–12% | explaining a concept next to its diagram/art (explainer mode) | stories |
| `corner` | ≤5% | asides, jokes, "look at this" while the art stays up | anything long (>10 s) |
| `cutout` | 1–2 shots | the single biggest line of the video, with the mandala halo | routine lines (it loses its punch) |
| `triptych` | 1–2 shots | chapter anchors that need a jolt | more than twice a video |

The rule underneath (Scipio's): **face for meaning, pictures for content.** If the line is about
something that can be shown (a person, a text, a place, a story, a list) show it. If the line is
Steven's own conclusion, feeling, or a direct ask of the viewer, show Steven.
`scripts/plan_presenter.py` applies these rules to the transcript; Claude adjusts its output.

Hide jump cuts inside a camera stretch by alternating `punchIn` (wide ↔ 1.18× tight) at each cut,
or by covering the cut with a 1–2 s art insert.

## Pacing
- Art shots 3–6 s; a "visual event" (new image, diagram step, text, mode change) every 10–15 s.
- Diagrams 6–12 s, stepped to the words (segment lights as it is named).
- Cut on phrase ends (Broken Ruune), never mid-word; 95% hard cuts. Ink-bleed or film-burn only on
  chapter cards and the sting.
- Reopen a question every 2–3 min (AmuraKa micro-hooks).
- Shorts: `full` stretches and the thought experiment are ready-made vertical Shorts (crop 9:16 on
  the face) — give them priority in shorts_plan.py.

## Look
- One texture layer over everything, camera included (Broken Ruune's glue): the template's film
  grain + paper. Camera is graded warm and slightly desaturated (`cameraGrade` in theme.ts) so it
  sits inside museum art.
- Brand colours (theme.ts): lacquer red, indigo night, gold leaf, bone, ink. Gold is the only accent.
- Type: one serif for words that matter (chapter word, question, quote), one quiet sans for labels.
- Patterns are wallpaper: 20–35% opacity, slow (1–4°/s). They move so a still frame never looks frozen.

## Sound
No whooshes, risers or pops (Broken Ruune). Only three marks: **bowl** (sting + one key reveal),
**low boom** (chapter cards), **silence** (~1 s before the biggest line). Music changes per chapter,
ducks under speech, drops out for the thought experiment.

## Words worth finding in the recording (and saying on camera)
- Hook, pick one: personal confession → pivot question (Broken Ruune) · big-scale fact cascade →
  "and this is where we are" (Scipio) · a teacher's line on screen → "so here's the question" (AmuraKa).
- Triads: three short sentences in a row ("The self was a story. The story needed a hero. The hero needed an enemy.").
- Inversions at chapter ends; one thought experiment; one parable; the bookend line.

## Titles (Steven likes word-play on a key word — keep that; these are shapes to try)
- Reframe a feared idea: "Do Not Fear Emptiness" (Scipio).
- Contrarian, one word in caps: "Meditation Teachers Ask the WRONG Question" (Broken Ruune).
- Name + question: "Ryōkan: Fool or Free Man?" (AmuraKa).
