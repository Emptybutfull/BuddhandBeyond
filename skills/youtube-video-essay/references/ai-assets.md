# AI assets: which tool for what, and the slop check

Steven has Midjourney, Gemini (Nano Banana image editing, Google Flow / Veo video) and ChatGPT
images. All run in his browser on the PC (Chrome tools); generated files land in Downloads →
move into the project's `raw/` (images) and `flow/` (clips) with the asset key as filename.

## Routing
| Need | Tool | Why / how |
|---|---|---|
| Hero art, scenes, figures, backdrops in the house style | **Midjourney** | best painterly/print look. `--ar 16:9` scenes, `--ar 2:3` figures, `--style raw`, the saved `--sref` code; `--oref <img> --ow 100–300` for the recurring character |
| Same character in a new pose/place; fix hands, faces, garbled text; extend to 16:9; remove a figure to get a clean backdrop plate; split a scene into layers for parallax | **Nano Banana** (Gemini) | strongest at keeping a subject consistent across edits. Ask for a flat plain background when the result will be cut out |
| Props as transparent PNG; anything with readable words (book covers, letters, a sutra page, signs) | **ChatGPT images** | follows layout instructions, renders text, can return a transparent background directly |
| "Footage": hands, objects, nature, rooms, slow camera moves | **Flow / Veo** | image-to-video from a Midjourney still keeps the look; frames-to-video (first + last frame) for a controlled change (hood lifting, lamp lighting). Mute its audio |
| Loops for screen blend: smoke, fire, embers, ink in water, snow, butter-lamp flame | **Flow / Veo** | prompt "on a pure black background, static camera, seamless"; trim to a clean 4–6 s loop |
| Subtle motion on a single painting | Midjourney video or Veo | low motion only; otherwise do it in Remotion (camera + layers) — zero slop |
| Cut-outs | **rembg** `-m birefnet-general` | local, free, clean on print-style edges |

Default to Remotion motion (camera, layer slides, particles) over AI video whenever a shot can be
built from layers: it is free, exact, and never melts.

## Prompt shapes (adapt; keep the style suffix from style.md)
- Cut-out figure: `[who/what, doing what], [style: woodblock print / ink engraving], isolated on a plain white background, full figure, no ground shadow, no text --ar 2:3 --style raw --sref <code>`
- Backdrop plate: `[place], [style], wide, empty foreground, room for a figure in the centre --ar 16:9 --style raw --sref <code>`
- Nano Banana edit: `Keep the same person, clothes and print style. Change only: [pose/place]. Plain white background.`
- Nano Banana plate: `Remove the person completely and fill the space so the scene looks untouched.`
- Veo footage: `[subject], 35mm documentary look, natural light, slow push-in, shallow depth of field, no people's faces in frame, 6 seconds`
- Veo loop: `[smoke/fire/ink] on a pure black background, static camera, slow, seamless loop`

## Slop check (every image and clip, before it goes in a shot)
1. `python slop_sheet.py raw flow --out review/sheets` (12 images per sheet, clips as frame strips).
2. Two subagents (`model: "sonnet"`), half the sheets each, with the brief below; each writes
   `review/slop_a.json` / `slop_b.json`; merge into `review/slop.json`.
3. `fix` → Nano Banana with the given instruction, then re-check; `reject` → regenerate or drop.

**Reviewer brief (paste):** "You are checking AI-generated images and video frame strips for a calm
Buddhist philosophy channel styled like woodblock prints and ink engravings. Read each sheet in
review/sheets (index.json maps sheets to keys). For every key return
{verdict: keep|fix|reject, issues: [...], fix: '<one Nano Banana instruction>' or null}. Reject
outright anything glossy, plastic, HDR or 3D-rendered when the style is print/ink. Be strict — when
unsure, 'fix'. Write JSON only to <file>; reply with counts per verdict and the 5 worst keys."

**Reject / fix when you see**
- *Anatomy*: extra, fused or missing fingers; hands melting into objects; mismatched eyes; teeth
  rows; limbs at impossible angles; feet merging with the floor.
- *Text*: any gibberish letters or pseudo-script (Latin, Tibetan, Chinese, Sanskrit) — fix by
  removing it, never keep fake script.
- *The "AI look"*: plastic skin, airbrushed smoothness, HDR glow, god rays everywhere, teal-orange
  grade, everything dead-centre and symmetrical, sparkles/particles for no reason, "cosmic galaxy
  behind a meditating silhouette" cliché, fantasy armour, over-detailed ornament that dissolves into
  noise, melted background details, leftover watermark/signature.
- *Buddhist iconography*: wrong mudra for the named figure; a Buddha with crown/jewels where a
  monastic form is meant; missing ushnisha or elongated earlobes on a Buddha; wrong number of arms
  or heads for the named deity (some legitimately have many — check before rejecting); dharma
  wheel not 8 spokes; Hindu deities presented as Buddhist; sexualised or comic depictions of
  sacred figures; feet pointed at a Buddha image; mixed-up robes (Theravada saffron vs Tibetan
  maroon vs Zen black) for the tradition being discussed.
- *Video (frame strips)*: faces or hands changing between frames; objects appearing/vanishing;
  smoke falling down, water flowing up; flicker; text warping; camera moving too fast; anything
  that looks like a game cut-scene.
- *Consistency*: the recurring character's face/clothes drifted; a different art style from the
  rest of the shot list; colour far off the chosen wall palette (fixable by the shared grade only
  if the drawing itself is on-style).

## Disclosure
Stylised art needs no YouTube "altered or synthetic content" label; realistic Veo footage of real,
identifiable people or events would. Keep footage anonymous (hands, objects, nature) and add one
line to the description: "Visuals are AI-assisted and composited by hand."
