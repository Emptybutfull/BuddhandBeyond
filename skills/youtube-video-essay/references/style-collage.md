# Collage style — learned from Pursuit of Wonder, rebuilt with AI over Steven's voice

Reference: "The Harder You Try, The Worse It Gets – The Philosophy of Fyodor Dostoevsky"
(F9kfiUhmRO8, 18:01, 4.7M views; channel 3.5M subs, ~1 video every 2 weeks, 10–25 min).
Watched three times with vidIQ (overview, exact shot log of 2:24–4:30 and 7:00–8:30) plus a 2026
video. Don't re-watch — everything needed is here.

## 1. What the video actually is
- **A surreal paper collage**, not cartoon animation: one textured wall colour behind everything
  (burgundy plaster, `#4A121A`→`#2B0B10`), 19th-century engravings, portraits and archival photos as
  **cut-outs**, plus desaturated, tinted live-action footage. Film grain, dust and gate weave on top
  of every frame.
- **Mix of shots**: ~60% layered cut-out composites (4–6 layers each), ~30% live-action footage
  (hands writing with a quill, rain on a palm, piano keys, a man shading his eyes from the sun) often
  as double exposures, ~10% a single still with a camera move.
- **Pace**: ~6.7 shots/min in the story parts (avg ~9 s, range 3.5–15 s), ~12/min in footage
  stretches, and one 50-second shot when a long quote is read in full. Calm voice, ~130 wpm,
  1–2 s pauses before turns.
- **Moves**: everything drifts — slow push-ins, cut-outs sliding in from an edge, props dropping
  from the top with a bounce, a spiral backdrop rotating, snow/embers/smoke looping, a hood lifting
  off a face, a face sliding sideways to show a void, gears turning inside an opened skull.
- **Transitions**: 0.5–1.0 s dissolves between most shots, hard cuts on sentence pauses, the
  occasional torn-paper reveal.

### Typical layer stack (bottom → top)
1. Wall: textured paper/plaster, heavy edge vignette (same colour all video).
2. Backdrop plate: an engraving, an archival photo, a map, or a rotating line vortex.
3. Main cut-out: the person (portrait bust, figure at a desk), with a soft drop shadow.
4. Prop cut-outs that act out the sentence (handcuffs slam in, a gavel drops, a crucifix lowers).
5. Atmosphere loop: snow, embers, smoke, candle flicker (screen blend).
6. Grain + dust + vignette.

### Ten "line → picture" pairs (the core skill to copy)
| Line | Picture |
|---|---|
| failing, falling into financial distress | top-down roulette wheel spinning, slow push |
| associated with a radical group | his bust in front of an engraving of the meeting |
| arrested | two soldier cut-outs slide in from the sides, handcuffed fists slam into centre |
| sentenced to death, 1849 | "1849" + gavels dropping from the top |
| facing the barrel of a gun … pardoned | 15 s on the execution engraving; a hand with the pardon letter enters at the word "message" |
| it was a mock execution | a hood lifts off his face to reveal it |
| sent to Siberia | labour-camp photo pans, snow falls, he stays fixed in front |
| his focus turned inward | his head opens, a brain drops in, a spiral rotates behind |
| humanity wants agency, not happiness | gears turning inside his skull; a hand with a screwdriver adjusts them |
| we'd rather destroy perfect conditions | a grand piano bursts into flames, keys fly up |

Rule underneath: **every abstract idea gets one concrete, slightly absurd object**, and the object
moves on the key word. Tiny figures next to giant objects (mirror, hand, clock) for scale ideas.

### Structure
0:00 sponsor bumper (skip) → 0:12 hook: who/what and why it still matters (40 s, over the portrait
with the face peeling open) → biography act (3 min: birth, wound, crisis, transformation) →
idea act 1 (one book) → idea act 2 (second book) → climactic reflection (the five-minutes-before-death
passage, read in full) → 15-second takeaway → sponsor/outro. No chapter cards; acts turn on
music and a long quote.

### Quotes
Announced over a dramatic cut-out ("In *Notes from Underground*, Dostoevsky wrote:"), then a
full-screen parchment page in a classic serif, scrolling steadily so the reader's eye follows the
voice; scroll eases to a stop on the last line; long dissolve back to the wall.

### Sound
Felt piano + low strings + pads; music swells for danger, strips to solo piano for quotes.
Diegetic touches only: pen scratch, wood creak, wind, fire crackle, clock tick, a muffled shot.

### 2026 update (same channel)
"The Quantum Theory of Consciousness" (Jul 2026): the creator now appears on camera ~47 times
for 2–10 s each, from a warm home studio, animation overlaid on him; art moved to white line
figures on black. Validates the hybrid format (format-blueprint.md) — collage and on-camera mix.

## 2. Make it Empty But Full, not a copy
The creator draws and animates everything by hand and has said publicly how upsetting it is when
viewers call his work AI. Take the grammar (layers, metaphors, pace, quote pages), not the identity:
- **Wall colour**: not burgundy (that *is* his look, and our lacquer red is almost the same).
  Default **indigo-night rice paper `#16233f`** with gold and vermilion accents; alternatives:
  saffron-ochre `#a8742c` or ink-black with gold. One colour per video, chosen at the look test.
- **Cut-out art**: woodblock prints (Japanese/Tibetan block-print feel) and ink engravings instead
  of Victorian copperplate; Buddhist teachers (Ryōkan, Milarepa, Nāgārjuna, Shāntideva, Bodhidharma,
  Dōgen), monks, pilgrims, temples, everyday modern people rendered in the same print style.
- **Signature motifs of our own**: the ensō (opens/closes videos, appears as the "hole" in heads
  instead of a void), mala beads, a single butter lamp instead of his candle, a lotus growing out
  of mud for "suffering → awakening".
- Description note: "Visuals are AI-assisted (Midjourney, Gemini, ChatGPT) and composited by hand."

## 3. Rebuild it on the PC — top to bottom
Tools: Plaud (voice) · Midjourney (hero art) · Nano Banana in Gemini (edits, consistency, plates) ·
ChatGPT images (transparent PNG props, anything with readable text) · Google Flow / Veo (footage and
loops) · rembg (cut-outs) · Remotion + `src/hybrid` Collage engine · ffmpeg · vidIQ.
Which tool for what, prompt shapes, and the slop rubric: **ai-assets.md**.

1. **Audio** — Plaud → transcribe → edit with build_lecture.py exactly as now (cold open, cut
   rambles, keep 0.7–1.5 s pauses before turns; don't speed the voice up). Music stays separate.
   Transcribe voice.wav **with word timings** (`--word_timestamps True`).
2. **Shot boxes** — `python split_shots.py voice_words.json --out shots.json` → ~7–8 shots/min,
   cut at sentence ends. Mark long quotes as one shot each (merge their boxes).
3. **Visuals per shot** (Claude, chunk by chunk, never the whole transcript at once): fill each shot's
   `visual` (one sentence: the concrete metaphor), `layers` (backdrop / main cut-out / props /
   atmosphere, each with an asset key), `move` (push, pull, pan L/R), `keyword` (the word that
   triggers the prop) and `transition`. Aim: 60% composites, 25–30% footage, 10% stills, 1–3 quote pages.
4. **Asset list** — collect unique keys from shots.json → `assets.json` with tool + prompt per key.
   Reuse hard: the main figures appear in many shots with different props. For a 15-min talk expect
   ~100–120 shots → ~120–160 cut-outs, 1 wall texture, 8–15 backdrop plates, 20–30 footage clips,
   4–6 atmosphere loops, 1–3 quote pages.
5. **Style lock (first video only, then reuse)** — in Midjourney make 12 test images, pick the
   look, save its `--sref` code in style.md. Make the recurring "everyman" (a modern person in the
   same print style) and keep them consistent with `--oref` + Nano Banana variations (front, ¾,
   profile, seated, walking, from behind). Look-test checkpoint for Steven: 5 composites in two
   wall colours.
6. **Generate** — Midjourney in bulk by JS (existing gotchas apply); cut-out prompts end with
   "isolated on a plain white background, full figure, no ground shadow". Nano Banana for: same
   character in a new pose, removing a figure to make a clean backdrop plate, extending art to 16:9,
   fixing hands/text. ChatGPT for transparent-background props and book covers/letters with real
   words. Flow/Veo for footage (photoreal, then desaturated + tinted) and loops shot on pure black
   (smoke, fire, ink in water, butter-lamp flame, snow) for screen blend.
7. **Cut out** — `rembg p -m birefnet-general raw/ cut/` (once: `pip install "rembg[cpu,cli]"`, or `[gpu,cli]` with an NVIDIA card), then
   check edges on one contact sheet.
8. **Slop review** — `python slop_sheet.py raw flow --out review/sheets` → two sonnet subagents
   with the rubric in ai-assets.md → `review/slop.json` → fix with Nano Banana / regenerate / drop.
   Nothing un-reviewed goes into a render.
9. **Unify** — one grade for all sources (the same `filter` on every Cutout, e.g. sepia + slight
   contrast, footage desaturated and tinted toward the wall colour, grain over everything). This is
   what makes four different AI models look like one hand.
10. **Assemble** — one `<Sequence>` per shot: `Camera` → `Paper` → backdrop `Cutout` → main
    `Cutout` → prop `Cutout`s with `at` = the keyword's frame → `Particles` / `LoopOverlay` → `Grain`.
    Dissolve 0.5–1.0 s between most shots (overlap Sequences and fade, or @remotion/transitions),
    hard cut on big pauses. Quotes: `QuoteScroll` for the shot's full length. Reveals: two cut-outs,
    the top one `exit="left"` at the keyword (face slides away → ensō/void underneath).
11. **Sound** — felt piano / low strings / pads bed (Envato, or AI music), swell on danger, solo
    piano under quotes; 20–40 small SFX (brush on paper, wind, fire, bell, clock) at prop moments.
12. **Preview → QA → render → publish** — unchanged from SKILL.md steps 7–9; render 90 s first.

## 4. Where it can go wrong
- Hands, faces and text in Veo footage — keep footage to hands/objects/nature at a distance, cut
  to the best 2–4 s, desaturate; reject anything that morphs (slop rubric).
- Four models, four looks — the shared grade + grain + one wall colour fix most of it; reject the
  glossy 3D/HDR ones outright.
- Too many layers moving at once — one main move per shot (camera) + one event (the prop on the keyword).
- Iconography mistakes on Buddhist figures — the slop reviewer checks mudras, robes, hand counts.
