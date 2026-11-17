# Art Lab

One lab, shared by every Claude session that works on these videos (the cloud session and the PC).
The briefs are `ART_LAB.md` and `CEL_LOOK.md`. Taste and craft live in `lab/`.

## How sessions share it
- **Before any visual work:** `git pull`, then read `lab/TASTE_LOG.md` (standing rules first) and the notes
  for the tools you will use.
- **After every verdict:** add the entry to `lab/TASTE_LOG.md` (newest first, the human's exact words), commit
  and push. If the push is refused because the other session pushed first: `git pull --rebase`, keep both
  sessions' entries in date order, push again.
- **Notes are one file per topic** (`lab/notes/blender.md`, `comfyui.md`, ...). Facts differ by machine, so
  put them under a heading that names the machine: `## PC (RX 6800 XT, D:)` or `## Cloud machine (no GPU)`.
- **Experiments** go in `lab/experiments/<date>-<slug>/` with `brief.md`, sources, stills and `notes.md`.

## What does not go in git
- Renders (`*.mp4`, frame folders): each `notes.md` has the commands to rebuild them.
- Models, ComfyUI itself, caches. `comfy/MODELS.md` lists what is installed and where.
- Anything private. This repository is public: no credentials, personal details or unrelated file listings.

## Where things are
| Path | What |
|---|---|
| `lab/TASTE_LOG.md` | the human's verdicts, standing rules, open questions |
| `lab/notes/` | tool and craft notes, plus `approvals.md` (how much to ask before acting) |
| `lab/experiments/`, `lab/contact/` | every piece made so far, and the sheets shown for ranking |
| `look/` | palettes and the approved cel look frames |
| `blender/`, `tools/`, `comfy/` | scene scripts, helper tools, ComfyUI workflows and model register |
| `story/` | shot lists, character notes and prompts for the piece in progress |
| `../skills/youtube-video-essay/` | the YouTube skill, including the design kit the figure comes from |
