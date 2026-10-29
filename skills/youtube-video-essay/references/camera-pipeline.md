# Camera pipeline (hybrid format) — Claude's steps

All scripts live in `<skill>/scripts`, run from the project folder. Times are seconds, frames at the
composition fps (30). Everything here was tested on synthetic clips (sync, frame-exact cuts, lip-sync
in Remotion, transparent WebM); matte_presenter.py has not yet run on real footage — check its
first output by eye.

## 1. Which audio is the voice?
- Camera's own audio is fine → use it as the source recording for build_lecture.py; offset 0.
- Plaud recorded alongside (better mic) → Plaud stays the source. Find the offset:
  `python sync_camera.py camera.mp4 plaud.wav` → `OFFSET +x.xxx` (confidence > 6 is solid; the clap helps).

## 2. Edit once, cut both
build_lecture.py builds voice.wav from the EDL as before. Add two lines at its end to dump the exact
list it used (cold-open entries first), in source seconds: `json.dump(edl_in_order, open("edl.json","w"))`.
If it crossfades joins, note the crossfade length in ms. Then:
`python cut_camera.py camera.mp4 --edl edl.json --offset <OFFSET> --overlap-ms <xfade> --out public/camera_cut.mp4 --voice public/voice.wav`
It must print `drift` within ±0.07 s; MISMATCH means the EDL or overlap is wrong — fix before going on.
Background it for long recordings (re-encodes every piece).

## 3. Plan the on-camera moments
Transcribe voice.wav (already done for listening back) to timed segments, dump CHAPTERS to
chapters.json, then:
`python plan_presenter.py voice_segments.json --chapters chapters.json --target 0.25 --cutout 1`
It prints a short table (start-end, mode, why, first words). Review THAT, not the transcript:
swap modes, move the cutout to the real "biggest line", drop anything that is exposition.
Share the table's top lines with Steven in 3–4 bullets at the storyboard checkpoint.

## 4. Cut-outs (only if the plan has `cutout` shots)
`python matte_presenter.py public/camera_cut.mp4 --plan presenter_plan.json --out-dir public/cutouts`
Writes `public/cutouts/cutout_<frame>.webm` (VP9 + alpha) and puts `src`/`startFrom` into the plan.
Needs `pip install torch torchvision av pims tqdm` once; GPU strongly preferred (CPU ≈ 1–3 fps).
Look at one frame of each clip over a red background before using it (hair/hand edges).

## 5. Into the shot list
In longform_shots.py, each plan stretch replaces the art for its time range with a presenter shot:
`<Sequence from={f0} durationInFrames={f1-f0}><PresenterShot mode=… src={staticFile('camera_cut.mp4')} startFrom={f0} …/></Sequence>`
- `startFrom` = the Sequence's own start frame (camera_cut is on the voice timeline) — except
  cutouts, which use the plan's `src` and `startFrom`.
- `side` mode: pass the chapter's diagram or best art as children; `corner`: the current art shot.
- Set `focus` once per recording ([x, y] of the face in the camera frame, e.g. [0.5, 0.36]); check
  one still of each mode.
- Keep the template's texture layer ABOVE presenter shots so camera and art share one grain.

## 6. QA additions
In the QA pass also check: lips vs voice at 3 points (start, middle, end — drift creeps from the EDL,
not from Remotion), no camera audio leaking (PresenterShot mutes it), face not cut by the arch or
circle, cut-out edges clean, on-camera share near the target.
