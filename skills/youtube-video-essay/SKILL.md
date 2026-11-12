---
name: youtube-video-essay
description: Turn Steven's recordings into a finished, designed YouTube video essay for the Empty But Full channel with Remotion and Blender on this PC — Steven's voice (and Steven on camera) over the house look of grainy gradients, giant type, halftone print cut-outs, real Buddhist art, memes and film moments used under fair use, with AI visuals from Midjourney, Nano Banana, ChatGPT and Flow/Veo — then cut Shorts and publish. Use whenever the user wants to make, design, edit, render, upload or promote a video, video essay, explainer, on-camera video, dharma talk, Short or thumbnail, asks about the channel's look, colours, type, motion graphics, Blender shots, memes or movie clips, free music or footage, or wants AI visuals made or checked for slop — even just "make a video from my Plaud", "I recorded myself", "make it look expensive" or "post the next one".
---

# YouTube video essay (Empty But Full)

A proven pipeline: the first video ("The Most Dangerous Idea You Believe About Yourself", Oct 2026) was built
with it. Reuse the template and scripts instead of rewriting them — that is where the token savings are.

Two formats, one pipeline:
- **Hybrid** (whenever Steven recorded himself on camera): essay + explainer. Steven on camera ~20–30%
  of the time at the moments that need a face; designed visuals for everything else.
- **Faceless** (Plaud audio only): the same beats, with the on-camera slots filled by art and cards.

**The look** (Steven's choice, Nov 2026 — design-system.md): grainy gradients as the main ground, a new
palette every chapter, huge heavy type with tiny labels; accents of halftone print, real sacred art and
glow. Earlier looks stay available for a chapter or a whole video: **museum** (video 1, style.md) and
**paper collage** (style-collage.md).

Read as needed (don't preload all):
- `references/design-system.md` — THE look: reference board, 12 rules, chapter palettes, type, ten
  layouts, Steven on camera, sacred-art rules, concept → visual table. Read before any look test.
- `references/motion-editing.md` — how things move and join: easing and timing numbers, type recipes,
  transitions, cuts, pacing, sound design, the talking-head toolkit, documentary devices.
- `references/directing.md` — the harness: questions for Steven, director's brief, measuring references,
  beat grid, stills-first, critique loop with scores, tools (Remotion add-ons, Fable 5.2), where to find
  ideas, prompt shapes for the look.
- `references/memes-fair-use.md` — memes, film clips, famous art and faces: traffic lights, staging
  rules, rights log, dharma readings of the zeitgeist, what to do on a Content ID claim.
- `references/blender.md` — when and how to use Blender (headless scripts, the Claude connector),
  render rules, scene recipes, getting 3D models. Script: `scripts/blender/indras_net.py`.
- `references/free-assets.md` — footage, music, sound effects, art and fonts **without Envato**.
- `references/format-blueprint.md` — the beat sheet, chapter recipe, on-camera budget, title shapes.
- `references/camera-pipeline.md` — hybrid only: sync, cut camera with the voice EDL, plan on-camera
  moments, cut-outs, shot-list wiring, extra QA.
- `references/motion-kit.md` — the Remotion components in `src/hybrid` and `src/design`, and install.
  Includes the **cel-shaded kit** (`src/design/awakening`: a morphing drawn figure, flat-colour scene
  pieces, the 2-minute `Awakening` Reel) and the synced score script `scripts/audio/awakening_score.py`.
- `references/recording.md` — one page for Steven on how to film himself; send it when he plans to record.
- `references/reference-channels.md` — what was learned from the reference channels. Don't re-watch them.
- `references/style-collage.md` — the Pursuit of Wonder collage style and its all-AI rebuild.
- `references/ai-assets.md` — which AI tool for what, prompt shapes, the slop rubric + reviewer brief.
- `references/pipeline.md` — exact commands per step and which lists to edit per video.
- `references/gotchas.md` — read BEFORE using Chrome, Midjourney, YouTube Studio, or when anything breaks.
- `references/style.md` — video 1's look, audio levels, MJ prompt suffixes, packaging rules.
- `references/promotion.md` — upload checklist, Shorts, safe places to share, what Claude may/may not post.
- Reference project with every finished file from video 1: `D:\open\spiritual-short` (template = its code).
- In the template: `src/hybrid/` and `src/design/` (from `template-additions/`; install in motion-kit.md — once).

## How to work with Steven
Steven gives broad permission ("just go"), has a designer's eye, and likes to be **asked about design
direction**: before a look test ask 2–4 questions with named options that point at things he has seen
(directing.md §1). He wants checkpoints to look at, not long explanations. Share a picture at each
checkpoint (SendUserFile, ≤ 30 MB so it opens on a phone) with one line on what to look at, then keep
working unless the choice is genuinely Steven's. Plain language, no jargon.

## Flow
1. **Pick the recording** (Plaud `list_files` / `get_transcript`, plus a camera file if he filmed). Camera file →
   hybrid; audio only → faceless. If speech is short, propose a format (trailer, Short) instead of padding.
   Confirm it's Steven's own voice (not a teacher's talk — rights).
2. **Start the project**: `powershell -File <skill>/scripts/new_project.ps1 -Name <slug>` (copies template —
   incl. `src/hybrid` and `src/design` once installed —, textures, runs npm install).
3. **Audio + edit**: download, transcribe (background), then plan the edit from `lecture_segments.txt` against the
   beat sheet in format-blueprint.md: cold-open hook (strongest 20–30 s, one of the three hook shapes), the
   question, 5–8 chapters (one-word names), a thought experiment, the parable, the closing. Edit
   `build_lecture.py` (EDL, COLD_OPEN_ENTRIES, CHAPTERS), run it, transcribe `voice.wav` to listen back.
   Hybrid: also dump `edl.json`, sync if Plaud was the mic, and `cut_camera.py` → `public/camera_cut.mp4`
   (camera-pipeline.md §1–2; drift must be ±0.07 s). Share the cut plan in 3–4 bullets while working.
4. **Direct it** (directing.md): write `brief.md` — film in one line, chapter → palette row → layouts → hero
   visual, every word on screen, memes/films/art with the line that comments on each (start `rights.csv`),
   Blender shots, sound. Pick the music (free-assets.md) and make the beat grid. Ask Steven the open
   design questions now.
5. **Make the assets**: Midjourney / Nano Banana / ChatGPT / Flow per ai-assets.md (collage chapters:
   style-collage.md steps 2–7; `longform_prompts.json` for museum chapters); real sacred art from open-access
   museums; Blender shots as headless scripts, one still first (blender.md); b-roll from Flow,
   `vidiq_find_broll` or the free libraries. Hybrid needs ~25% fewer images.
6. **Review assets** with two subagents in parallel (half the keys each, `model: "sonnet"`): use/best/crop/note
   per key, plus the slop check on every AI image and clip (`slop_sheet.py` + the brief in ai-assets.md);
   deity images are compared with a real reference. Fix with Nano Banana or drop.
7. **Shot list + stills**: hybrid → `plan_presenter.py` (review its table, not the transcript), mattes for any
   cutout; then the shot list (`longform_shots.py` / shots.json) with palette, layout and motion per shot from
   design-system.md and motion-editing.md; build the music bed and place sound on the grid.
   **Checkpoint**: storyboard sheet (all shots with times) + **6–10 stills as posters**, one per layout in use,
   with Steven's real footage in the on-camera ones.
8. **Preview**: bundle, render 90 s of the opening (≈3 min). Run the critique loop (directing.md §6) and fix
   anything under 7. **Checkpoint**: send it; optionally upload unlisted (< 10 MB copy) and run
   `vidiq_video_watch` for a second opinion — take it with a grain of salt.
9. **Full render** (background, ≈2 min per video minute) → QA subagent (frames every 4 s, every cut, labels,
   audio LUFS/clicks/music balance, plus camera-pipeline.md §6 for hybrid; report as its reply) → fix →
   re-render once → −14 LUFS remux → captions (`make_captions.py`) → thumbnails (3–5 options in the house
   look, vidIQ score the top 2; no memes, film stills or celebrity faces in thumbnails) → titles (score 6–8
   with vidIQ; Steven likes word-play on a key word from the talk). **Checkpoint**: final preview +
   thumbnail + title pair.
10. **Publish & promote**: follow `references/promotion.md`. Upload unlisted first and wait for Studio's
    checks (Content ID); handle any claim per memes-fair-use.md. Steven drags the big file into Studio;
    Claude fills everything else (credits for films, art and music in the description) and only goes public
    on Steven's go-ahead. Shorts via `shorts_plan.py` — on-camera `full` stretches and the thought
    experiment first; never a bare film clip.

## Token budget rules (Steven pays per token — be lean)
- Prefer `get_page_text` / `find` / small JS over screenshots; screenshots at `scale ≤ 0.5`, only when layout matters.
- Never read big JSON/transcript files whole; grep or print the slice you need. For on-camera choices read
  plan_presenter.py's printed table, not the transcript.
- Batch browser steps (`browser_batch`); do Midjourney and library downloads by JS loops, ≤ 40 s per call.
- Background anything > 2 min (transcribe, render, npm, cut_camera, matting, Blender) and don't poll — wait
  for the notification.
- Subagents only where they replace a lot of reading (image review, full-video QA, critique scoring, rules
  research); give them tight briefs and `model: "sonnet"`; ask for compact replies.
- Don't re-render the full video to test one thing — render stills or a short frame range from a bundle.
- Reuse what exists: components in `src/hybrid` and `src/design`, scripts in the template, decisions in
  design-system.md, research in the reference files (don't re-watch the reference videos or re-research
  fair use).
- When something new is learned (a fix, a preference, a reference image Steven likes), add one line to
  gotchas.md or design-system.md so the next run doesn't pay for it again.
