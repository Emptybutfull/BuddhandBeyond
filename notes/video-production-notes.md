# Video production notes

Working notes for making Buddha and transcendence videos with Higgsfield, with code doing
everything code can do so credits go only where a video model is needed.

Last updated: 25 November 2026. Prices were read from the Higgsfield account that day, during a
sale window, and may change.

## Standing rules

1. **Quote first.** State the credit cost before any video render and wait for a yes.
2. **One take.** Render a second take only when asked, or when the first has a visible fault.
3. **Pay the video model only for motion code cannot do.** See "Where code replaces paid video".
4. **Fix the still before animating it.** A still costs 2 to 3 credits; five seconds of video
   costs 7.5 to 19.
5. **Check before showing.** Frame strips plus the frame-to-frame motion measure. Say plainly
   what was not checked: playback and audio cannot be watched or heard from the session.
6. **Work from the user's references.** Do not guess the look. Ask for a reference image or a
   video they would rate 8 or higher.

## What the user likes and dislikes

| Signal | Detail |
|---|---|
| Liked the idea | One fixed subject with backgrounds flashing behind it every 0.3 s or so |
| Reference they sent | Bold flat poster illustration: cobalt blue skin, saffron yellow, black, burnt orange, gold drips, gouache finish |
| Earlier reference | Dense psychedelic sticker-bomb collage where everything flickers |
| Wants | Crisp, elegant movement; immaculate design; "trippy" is welcome |
| Disliked | Anything that looks like code; warped or smeared motion; thin fast objects (arrows) |
| Setup | Owns Midjourney and plans to make stills there. Watches on a phone, so vertical 9:16 |

## What has been made so far

| Piece | How | Credits | Rating |
|---|---|---|---|
| Four painterly Buddha clips | Soul Cinema stills, Kling 3.0 pro, 5 s each with sound | about 40 | not rated |
| Two glitch-collage clips | GPT Image stills, Kling 3.0 pro | about 17 | "lackluster" |
| Eight clips in eight art styles | GPT Image stills, Kling 3.0 pro silent, 5 s each | about 76 | "okay" |
| Two flat unfolding designs | Start and end frames, Kling 3.0 pro, 8 s each | about 32 | "okay, not the best" |
| Anime Buddha with flashing backgrounds | One cut-out plus 11 backgrounds, assembled in code | about 13 | not rated |
| Anime: Mara's arrows | Start and end frames, Kling 4.0, 10 s | 37.5 plus stills | 2/10 |
| Realistic: monk lift-off | Start and end frames, Kling 4.0, 10 s | 37.5 plus stills | 4/10 |
| Coded mandala with wordmark | Canvas animation rendered in a headless browser, 60 fps | about 1 (music) | 4/10, "looked all code" |
| Pearl to Buddha, flat poster style | Master frame, crop, edits, Kling 4.0, assembled in code | 102.16 | not rated yet |

Credits went from 1,010 to 645.83 over the session.

## Prices that matter

| Item | Credits |
|---|---|
| Kling 4.0, 1080p | 3.75 per second (720p: 2.5). Always includes audio. Takes start, middle and end frames. Up to 30 s |
| Kling 4.0 Flash, 720p | 1.5 per second. Start frame only |
| Kling 3.0 standard | 1.25 per second silent, 1.75 with sound |
| Kling 3.0 pro | 1.5 per second silent, 2.0 with sound. Start and end frames. 3 to 15 s |
| Seedance 2.5 | 7 per second at 720p, 16 at 1080p, 3 for a 480p draft |
| GPT Image 2.6 | 2.0 at 2K high quality, 3.25 at 4K high quality, about 1 at 1K medium |
| Soul Cinema image | about 0.12 |
| ElevenLabs Music v2 | about 1.1 for 16 to 18 seconds |
| Higgsfield sandbox (ffmpeg, Python, Node, Chromium) | nothing charged in the transaction log |

Plus plan: 1,000 credits a month, up to 6 videos and 8 images at once.

## Where code replaces paid video

Code rendering costs no Higgsfield credits and gives exact, sharp results at 60 fps.

| Job | Use | Why |
|---|---|---|
| Camera moves over a still: zoom, pan, push-in | Code | Exact and sharp. The pearl video's zoom-out could have been done this way |
| Parallax between cut-out layers | Code | Layers stay pixel-perfect |
| Hard cuts, flash cuts, crossfades, wipes, speed ramps, holds, loops | Code | This is editing, not generation |
| Swapping backgrounds behind a fixed subject | Code | Cut-out plus composite, as in the flash-cut video |
| Text, titles, wordmarks, quotes, captions | Code | Video models garble lettering |
| Flat shape animation | Code, with illustrated layers | Pure code shapes were rated 4/10 for looking like code. Animate drawn artwork (Midjourney or GPT Image pieces, cut out), not primitives |
| Music mix, sound effects on exact frames, loudness | Code | Free and frame-accurate |
| Making a clip longer | Code | Loop, hold or slow it instead of rendering more seconds |
| Organic morphs (pearl into a face) | Video model | Code morphs look mechanical |
| Ink, smoke, water, fire, cloth | Video model | Fluid motion is what the models do well |
| Characters moving, realistic physics, a camera travelling through a 3D scene | Video model | Not practical in code |

### Tools for the code side

- **Remotion** (React components rendered to MP4). Tested on 25 November 2026: version 4.0.547
  installs and renders a 1080 by 1920 clip both in this cloud session and inside the Higgsfield
  sandbox. Free for individuals and teams of up to three people; larger companies need a paid
  licence ([licence FAQ](https://www.remotion.dev/docs/license/faq)).
- **Claude Motion.** Anthropic's beta feature, launched October 2026, that writes code-driven
  animations and exports MP4. It uses no video model, so it cannot make footage, only animate
  text, shapes, charts and images. Reported as available on Team and Enterprise plans; check
  whether the user's plan has it. It is not a tool inside this Claude Code session. The Descript
  connector can import a Claude Motion MP4.
  ([explainer](https://ai.plainenglish.io/claude-motion-explained-what-anthropics-new-animation-tool-can-and-can-t-do-c8060db033c2),
  [news](https://digitaltrends.com/computing/claude-can-now-build-live-dashboards-and-animated-explainers-from-your-data/))
- **Already used here:** Python with Pillow piped to ffmpeg (flash-cut video), and an HTML canvas
  rendered through headless Chromium (mandala).

### Where the code runs

This cloud session cannot download from Higgsfield's file hosts or upload to them; the network
policy blocks `d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net` and
`upload.higgsfield.ai`. So anything that uses Higgsfield-generated images or clips is assembled
inside the Higgsfield sandbox, which can reach them. Allowing those three hosts in the
environment's network settings would let the work run here instead.

## Saving credits without losing quality

1. **Generate only the seconds that need a model.** Holds, zooms and transitions are added in
   code afterwards.
2. **Keep the subject out of the generated clip.** Generate the moving background on its own,
   then lay the sharp cut-out subject over it in code. The subject cannot wobble or morph, and
   one background clip can be reused under other subjects.
3. **Loop slow ambient motion.** Ink, mist and water: render five seconds once, then loop or
   ping-pong it in code to any length.
4. **Pick the cheapest model that can do the shot.** Kling 3.0 pro silent (1.5 per second)
   handles start-to-end-frame shots. Kling 4.0 (3.75 per second) is only needed for a middle
   keyframe or a single take longer than 15 seconds. Not yet tested: whether 3.0 matches 4.0 in
   the flat poster style.
5. **Turn sound off on Kling 3.0** when the audio will be replaced anyway. It saves a quarter of
   the price. Kling 4.0 cannot be muted.
6. **Iterate on stills, not video.** Get the image right first; it is five to ten times cheaper
   per attempt.
7. **Reuse what exists.** The assets below are already paid for.
8. **Do not use low resolution as the saving.** Final video stays at 1080p. A 720p draft is not a
   preview of the 1080p render, because each render is a new roll; it only tells you whether an
   idea works.

### Worked example: the pearl video, as made and lean

| Part | As made | Lean plan |
|---|---|---|
| Three key images | 7.25 | 7.25, plus about 2 for an ink background without the figure |
| Pearl to Buddha morph, 5 s | inside a 37.5 Kling 4.0 take | 7.5 on Kling 3.0 pro silent, or 18.75 on Kling 4.0 |
| Zoom-out, 5 s | inside the same take | 0, done in code over the 4K master |
| Ink flow, 5 s | 18.75 on Kling 4.0 | 7.5 on Kling 3.0 pro silent, looped in code |
| Two alternate takes | 37.5 | 0 |
| Music | 1.16 | 1.16 |
| **Total** | **102.16** | **about 25 to 37** |

The lean plan is untested. It would also change one thing: in the version made, the ink blooms in
while the camera pulls back, and that came from the video model. In code it would be a wipe or
fade from flat yellow to the moving ink clip. Sharper, but a different feel.

## Technique notes

- **Start and end frames** work for a morph between similar shapes (pearl to head). They fail
  with many thin, fast objects (the arrows) and when too much changes in one shot.
- **Derive every key frame from one master image.** Crop it for a zoom, edit it for variants.
  That is what kept the pearl video's Buddha consistent.
- **Kling 4.0 prompts:** describe only what changes, as beats joined by "then", with one camera
  move and the sound named.
- **Image prompts:** naming a living artist or studio style can trip the safety filter. Describe
  the look instead.
- **Limits:** 8 images or 6 videos at once; extra requests are refused, not queued.
- **Joins between clips:** a 0.4 second crossfade hid the seam; confirm with the motion measure.
- **Uploads** sometimes fail with a 520 error; retrying once worked.

## Reusable assets (Higgsfield IDs)

| Asset | ID |
|---|---|
| Anime Buddha cut-out, transparent background | job `94411933-36be-40a0-b269-4880c0672280` |
| Flat-poster Buddha, full figure, 4K master | job `7d465696-6270-4f3b-aed5-34e3a18b1699` |
| Flat-poster Buddha close-up (crop of the master) | media `9c4e52ef-5395-4130-8c9f-a3eb31a699fb` |
| Pearl opening frame | job `2fc95c7d-38ff-4a78-9475-7e804424cb33` |
| Flat-poster Buddha with ink-in-oil background | job `59a8b073-32c1-4e23-99f0-6733edf17110` |
| Ink-flow clip, 5 s | job `4c220b17-e621-48f2-8001-36cf76d444e3` |
| Pearl to Buddha, final video | media `bb27d626-6f4d-402c-9346-6ae9fdaba456` |
| Anime Buddha flash-cut, final video | media `8919097f-15a8-4714-9fd9-3abefc6be0ea` |
| Mandala motion design, final video | media `82d77df8-45e7-4b90-9fb4-eb0069e46167` |
