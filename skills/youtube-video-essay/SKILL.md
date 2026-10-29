---
name: youtube-video-essay
description: Turn Steven's recordings into a finished YouTube video essay for the Empty But Full channel with Remotion on this PC, in any of three looks — faceless museum art (Plaud voice over Midjourney thangka/ink art and Envato footage), hybrid (Steven on camera full screen, in a side shrine window, corner circle or mandala-halo cut-out, with patterns, chapter cards and diagrams), or all-AI paper collage in the Pursuit of Wonder grammar (Midjourney, Nano Banana, ChatGPT, Flow/Veo cut-outs, slop-checked, animated in Remotion); then cut Shorts and publish. Use whenever the user wants to make, edit, render, upload or promote a video, video essay, explainer, on-camera or collage video, dharma talk, Short or thumbnail, or wants AI visuals made or checked for slop — even just "make a video from my Plaud", "I recorded myself" or "post the next one".
---

# YouTube video essay (Empty But Full)

A proven pipeline: the first video ("The Most Dangerous Idea You Believe About Yourself", Oct 2026) was built
with it. Reuse the template and scripts instead of rewriting them — that is where the token savings are.

Two formats, one pipeline:
- **Hybrid** (whenever Steven recorded himself on camera): essay + explainer. Steven on camera ~20–30%
  of the time at the moments that need a face; art, footage and diagrams for everything else.
  Built from three reference channels (Scipio, Broken Ruune, Hidden AmuraKa).
- **Faceless** (Plaud audio only): the same beats, with the on-camera slots filled by art and cards.

Visual styles (pick at the look test; any style works with either format):
- **Museum** (video 1): thangka/ink/engraving art + Envato footage, slow push-ins — style.md.
- **Collage** (all-AI, Pursuit-of-Wonder grammar): one paper wall colour, 4–6 cut-out layers per shot
  acting out each sentence, ~7–8 shots/min, quote pages, AI footage and loops — style-collage.md.

Read as needed (don't preload all):
- `references/format-blueprint.md` — THE template: beat sheet, chapter recipe, on-camera budget and
  rules, pacing, sound marks, title shapes. Read before planning the edit.
- `references/camera-pipeline.md` — hybrid only: sync, cut camera with the voice EDL, plan on-camera
  moments, cut-outs, shot-list wiring, extra QA.
- `references/motion-kit.md` — the Remotion components (PresenterShot, PatternBg, ChapterCard,
  QuestionCard, WheelDiagram, CompareTable, QuoteCard, LowerThird, EnsoSting, EndCard) and install.
- `references/recording.md` — one page for Steven on how to film himself; send it when he plans to record.
- `references/reference-channels.md` — what was learned from the three channels. Don't re-watch them.
- `references/style-collage.md` — the Pursuit of Wonder collage style decoded (shot log, layer stack,
  metaphors) and the 12-step all-AI rebuild with Steven's voice.
- `references/ai-assets.md` — which AI tool for what (Midjourney, Nano Banana, ChatGPT, Flow/Veo,
  rembg), prompt shapes, and the slop rubric + reviewer brief. Read before generating anything.
- `references/pipeline.md` — exact commands per step and which lists to edit per video.
- `references/gotchas.md` — read BEFORE using Chrome, Midjourney, Envato, YouTube Studio, or when anything breaks.
- `references/style.md` — look, pacing, text, audio levels, MJ prompt suffixes, packaging rules.
- `references/promotion.md` — upload checklist, Shorts, safe places to share, what Claude may/may not post.
- Reference project with every finished file from video 1: `D:\open\spiritual-short` (template = its code).
- New in the template: `src/hybrid/` (from `template-additions/`; install steps in motion-kit.md — once).

## How to work with Steven
Steven gives broad permission ("just go"), likes to steer taste, and wants checkpoints to look at, not long
explanations. Share a picture at each checkpoint (SendUserFile, ≤ 30 MB so it opens on a phone) with one line on
what to look at, then keep working unless the choice is genuinely Steven's. Plain language, no jargon.

## Flow
1. **Pick the recording** (Plaud `list_files` / `get_transcript`, plus a camera file if he filmed). Camera file →
   hybrid; audio only → faceless. If speech is short, propose a format (trailer, Short) instead of padding.
   Confirm it's Steven's own voice (not a teacher's talk — rights).
2. **Start the project**: `powershell -File <skill>/scripts/new_project.ps1 -Name <slug>` (copies template —
   incl. `src/hybrid` once installed —, textures, runs npm install).
3. **Audio + edit**: download, transcribe (background), then plan the edit from `lecture_segments.txt` against the
   beat sheet in format-blueprint.md: cold-open hook (strongest 20–30 s, one of the three hook shapes), the
   question, 5–8 chapters (one-word names), a thought experiment, the parable, the closing. Edit
   `build_lecture.py` (EDL, COLD_OPEN_ENTRIES, CHAPTERS), run it, transcribe `voice.wav` to listen back.
   Hybrid: also dump `edl.json`, sync if Plaud was the mic, and `cut_camera.py` → `public/camera_cut.mp4`
   (camera-pipeline.md §1–2; drift must be ±0.07 s). Share the cut plan in 3–4 bullets while working.
4. **Visual plan** (collage style: style-collage.md steps 2–7 replace this step — `split_shots.py`, fill
   shots.json, assets.json, generate across the four tools, rembg): write `longform_prompts.json` (~45 prompts across styles T/S/W/U/P/E matched to the talk's
   moments; hybrid needs ~25% fewer — the on-camera stretches cover the rest), submit to Midjourney by JS,
   download all variants. Pick one diagram per chapter (WheelDiagram / CompareTable / QuoteCard). Start Envato
   footage pulls (8–10 real clips) and music (2–3 long dark ambient tracks) while MJ renders.
5. **Review images** with two subagents in parallel (half the keys each, `model: "sonnet"`), writing
   `review/longform/review_a.json` / `review_b.json` (use/best/crop/ai/note per key). Every AI image and
   clip also gets the slop check (`slop_sheet.py` + the brief in ai-assets.md); fix with Nano Banana or drop.
6. **Shot list + plan**: hybrid → `plan_presenter.py` (review its table, not the transcript), mattes for any
   cutout, then edit `longform_shots.py` (shots, labels, graphics, presenter stretches, per-chapter looks,
   title), run `plan_longform.py`, build the music bed (sound marks per format-blueprint.md).
   **Checkpoint**: storyboard sheet (all shots with times, on-camera stretches marked) + a look test (same 5
   frames in museum/ink/collage, plus one still of each presenter mode used, from Steven's real footage).
7. **Preview**: bundle, render 90 s of the opening (≈3 min). **Checkpoint**: send it; optionally upload unlisted
   (< 10 MB copy) and run `vidiq_video_watch` for a second opinion — take it with a grain of salt.
8. **Full render** (background, ≈2 min per video minute) → QA subagent (frames every 4 s, every cut, labels,
   audio LUFS/clicks/music balance, plus camera-pipeline.md §6 for hybrid; report as its reply) → fix →
   re-render once → −14 LUFS remux → captions (`make_captions.py`) → thumbnails (3–5 options, vidIQ score the
   top 2; hybrid: test one with Steven's face) → titles (score 6–8 with vidIQ; Steven likes word-play on a key
   word from the talk; title shapes in format-blueprint.md). **Checkpoint**: final preview + thumbnail + title pair.
9. **Publish & promote**: follow `references/promotion.md`. Steven drags the big file into Studio; Claude
   fills everything else, waits for clean checks, and only goes public on Steven's go-ahead. Shorts via
   `shorts_plan.py` — on-camera `full` stretches and the thought experiment first.

## Token budget rules (Steven pays per token — be lean)
- Prefer `get_page_text` / `find` / small JS over screenshots; screenshots at `scale ≤ 0.5`, only when layout matters.
- Never read big JSON/transcript files whole; grep or print the slice you need. For on-camera choices read
  plan_presenter.py's printed table, not the transcript.
- Batch browser steps (`browser_batch`); do Midjourney/Envato by JS loops, ≤ 40 s per call.
- Background anything > 2 min (transcribe, render, npm, cut_camera, matting) and don't poll — wait for the notification.
- Subagents only where they replace a lot of reading (image review, full-video QA, rules research); give them
  tight briefs and `model: "sonnet"`; ask for compact replies.
- Don't re-render the full video to test one thing — render stills or a short frame range from a bundle.
- Reuse what exists: textures in the project, scripts in the template, prior decisions in style.md, channel
  research in reference-channels.md (don't re-watch the reference videos).
- When something new is learned (a fix, a preference), add one line to gotchas.md or style.md so the next run
  doesn't pay for it again.
