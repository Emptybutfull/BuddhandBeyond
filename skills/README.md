# Skills

## youtube-video-essay (upgrade: hybrid on-camera format)

This folder holds the **new and changed files only**. Your existing skill on the PC keeps its
`references/pipeline.md`, `gotchas.md`, `style.md`, `promotion.md` and its scripts
(`new_project.ps1`, `build_lecture.py`, …) — none of them are replaced.

Install on the PC:
1. Copy everything inside `youtube-video-essay/` **over** your current skill folder (the one with
   the old SKILL.md). Merge, don't delete: it replaces SKILL.md and adds new files.
2. Copy `youtube-video-essay/template-additions/src/hybrid/` into the template:
   `D:\open\spiritual-short\src\hybrid\`.
3. In `D:\open\spiritual-short`: `npm i @remotion/google-fonts@<your remotion version>`.
4. Ask Claude to "render the HybridDemo" once to see the look on your machine
   (steps in `references/motion-kit.md`).

What's new:
- `references/format-blueprint.md` — the combined template (beat sheet, on-camera rules, pacing, sound).
- `references/reference-channels.md` — notes from Scipio, Broken Ruune, Hidden AmuraKa.
- `references/recording.md` — one page on filming yourself.
- `references/camera-pipeline.md`, `references/motion-kit.md` — how Claude builds it.
- `scripts/sync_camera.py`, `cut_camera.py`, `plan_presenter.py`, `matte_presenter.py`.
- `template-additions/src/hybrid/` — Remotion components (presenter layouts, patterns, cards, diagrams).
