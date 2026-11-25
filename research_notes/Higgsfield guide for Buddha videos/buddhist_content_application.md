# Applying AI image/video (Higgsfield + Midjourney) to Buddhist, meditation and spirituality content — notes as of 25 Nov 2026

> Method note for the report writer: in this session only web *search* worked; direct page fetches were blocked for every host tried (support.google.com, support.tiktok.com, knowingbuddha.org, fakebuddhaquotes.com, web.dev, tubefilter.com, columbianewsservice.com, dev.to). All "Cited Findings" below therefore rest on search-result extracts of the linked pages, not on a full read of them. Quoted wording is as returned by search. Anything marked "vendor" is a tool-seller's blog and should be treated as marketing. All example prompts are my own drafts (in "Inferences"), not copied from a source, and have not been test-rendered.

## 1. Content formats that work for Buddhist / meditation / spiritual-wisdom channels (lengths, hooks, structures)

### Takeaway
No reliable 2026 performance data specific to Buddhist channels was found; what exists is a reflective-essay structure and title pattern seen on one analysed Buddhism channel, plus general faceless-channel economics (Shorts pay cents per 1,000 views, long-form pays dollars). The format must be chosen with YouTube's July 2026 "inauthentic content" clarification in mind, because templated quote-shorts are exactly what it targets.

### Cited Findings
- An analysis of a Buddhism podcast channel describes a reflective-essay structure: open with a universal problem, introduce a Buddhist insight, apply it to everyday life, close. Its title pattern is "[Unavoidable life truth / mind mystery] — [urgent human question or liberation promise] + [Buddhist Wisdom / Buddhist Perspective / The Buddhist Path]". The page does not report views, retention or hook length. — [OutlierKit: buddhismpodcast](https://outlierkit.com/channel/buddhismpodcast)
- "Clarity & Zen" is a faceless Eastern-philosophy channel built on public-domain Taoist texts with script-plus-voiceover narration and stock visuals; its estimated revenue is modest. — [OutlierKit: clarityandzen](https://outlierkit.com/channel/clarityandzen)
- A tutorial on building a monetisable faceless channel in the "Buddhism & Zen Stories" niche (AI voiceover + AI images) exists, dated 2024 — older material. — [yt.chop.dev summary](https://yt.chop.dev/en/v/qgHJDnCbVVs)
- "Buddha's Diary" presents Buddhist teachings as soothing cinematic stories and guided reflections (a podcast, not a YouTube channel). — [Apple Podcasts](https://podcasts.apple.com/podcast/id1857384848)
- Faceless Shorts RPM in 2026 is cited at roughly $0.01–$0.50 per 1,000 views (another source: $0.04–$0.40); Shorts ad revenue is pooled rather than tied to a single video. Vendor blogs. — [ShortsFast](https://shortsfast.com/blog/faceless-youtube-earnings-2026/); [Kineclip](https://kineclip.com/blog/youtube-rpm-by-niche-faceless/)
- Long-form motivation / self-improvement faceless content is cited at $4–$10 RPM; religious/spiritual content is not broken out. Vendor blog. — [Autonolab](https://blog.autonolab.com/niches/2025-12-26-faceless-youtube-motivation/)
- A vendor guide claims Bible-story channels earn $8–$18 RPM/CPM "among the absolute highest on YouTube"; treat sceptically. — [Fluxnote](https://fluxnote.io/guides/how-much-bible-stories-channel-makes)
- Cautionary case: "Yang Mun", an AI-generated "monk" persona with millions of Instagram followers, delivers generic wellness tropes "not based on any Buddhist scripture" (three experts), ends videos with engagement prompts or book promotion, and was created by Shalev Hani, an Israel-based "Digital Creator & AI Storyteller". The site claimed "Yang Mun is a real person". The creator reportedly made more than $300,000 since launching in October (self-reported, via Good Men Project). — [Columbia News Service, 24 Mar 2026](https://columbianewsservice.com/2026/03/24/millions-found-comfort-in-a-buddhist-monk-but-he-was-never-real/); [EBU Spotlight](https://spotlight.ebu.ch/p/yang-mun-ai-influencer-scam); [Christian Century](https://www.christiancentury.org/news/they-look-religious-teachers-they-re-ai-and-millions-are-listening)

### Inferences
- Format menu that maps onto the site's existing pages (my proposal, ranked by policy safety and fit):
  1. **Sourced-quote short** (15–30 s, 9:16): one verified verse on screen with its citation ("Dhammapada 183"), one slow shot, one sentence of plain-language commentary. Feeds `quotes.html`. Highest risk of being judged "templated" if every video is identical — vary shot, voice-over commentary and structure.
  2. **Story short / episode** (45–90 s short; 4–10 min long-form): Jataka tales and sutta stories (Kisa Gotami and the mustard seed, Angulimala, the raft, the two arrows). Clear narrative arc = the thing YouTube's policy asks for. Feeds `stories.html`.
  3. **"One teaching, explained" narrated short** (40–60 s): problem → teaching → one practice step. Mirrors the essay structure above.
  4. **Guided meditation with loop background** (5, 10, 20 min): original script and voice over a seamless loop. Feeds `guided-meditations.html` / `visualization.html`.
  5. **Long ambient** (30–60 min): single looping scene plus ambience, no narration. Lowest effort, but the most "generic/repetitive" in policy terms — use sparingly and make each one distinct.
- Hook patterns consistent with the cited title formula: lead with the human problem, not the doctrine ("Why the second arrow hurts more than the first" rather than "The Sallatha Sutta").
- Shorts earn so little per view that their job is discovery; revenue (if wanted) comes from long-form and from sending viewers to the website.
- Do not copy the Yang Mun pattern (photoreal AI monk presented as a real teacher, vague un-sourced "wisdom", sales funnel). It is both the main reputational risk and the pattern Buddhist commentators object to.

### Gaps
- No verified retention, hook-length, posting-frequency or view data for Buddhist/meditation channels in 2025–2026 was found; the suggested lengths above are judgement, not benchmarks.
- No Buddhist-specific RPM figure was found.
- I could not open any channel directly to confirm formats first-hand.

## 2. Visual styles, shot types, example Midjourney prompts and matching image-to-video motion prompts

### Takeaway
No Higgsfield tutorial specific to Buddhist/meditation visuals was found; the usable material is general Higgsfield prompt guidance (image-to-video, prompt about action and camera only) plus one documented Buddha-statue clip. Iconographic accuracy is the main quality risk: AI commonly confuses Buddha and bodhisattva features and gets mudras wrong.

### Cited Findings
- A third-party Higgsfield prompt guide describes a five-layer "MCSLA" prompt formula and recommends writing the scene as continuous action without timestamps. Third-party, not official. — [claudskills.com higgsfield-prompt](https://claudskills.com/skills/higgsfield-prompt/SKILL.md)
- A case study of a viral Higgsfield clip of a large bronze Buddha statue lists its shot notes as aerial drone shot, push-in, golden hour, hazy, warm bronze tones, statue seated in meditation. — [alici.ai case study](https://alici.ai/formulas/media/meovisions/80ce4dae-2a86-558f-9695-8b41b6559868-meovisions-buddha-needs-a-break-china-landmarks-ai-video)
- Higgsfield's recommended video workflow is image-to-video: generate the still, use it as the start frame, and keep the video prompt "about the action and the camera move". For complex movement, describe the body position at the start and at the end separately. Vendor. — [Higgsfield: keep AI character consistent](https://higgsfield.ai/blog/keep-ai-character-consistent); [Higgsfield: avoid distortions](https://higgsfield.ai/blog/how-to-avoid-distortions-ai-videos)
- Higgsfield model facts (vendor-reported, changing quickly): Cinema Studio 4.0 up to 30 s with 30+ camera-movement presets and up to 50 references; Seedance 2.5 up to 30 s with stereo audio; Kling 3.0 added start-and-end-frame control; Kling 4.0 native 30 s and up to 10 keyframes; another page says standard clips max at 15 s before extension; one page says End Frame was removed in some newer versions. Costs cited: Veo 3.1 1080p = 80 credits per 8 s; Kling 3.0 720p 5 s = 10 credits. — [Higgsfield: best AI video generators 2026](https://higgsfield.ai/blog/best-ai-video-generators-2026); [Higgsfield: Kling 3.0 guide](https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation); [Higgsfield: 5 best models](https://higgsfield.ai/blog/5-Best-AI-Video-Models-2026-Tested-Compared)
- Midjourney: Omni Reference (`--oref`, weight `--ow` default 100, range to 1000) is a V7 feature costing 2x GPU time; Style Reference (`--sref`) takes image URLs or style codes, `--sv 6` default; the two can be combined. — [Midjourney docs: Omni Reference](https://docs.midjourney.com/hc/en-us/articles/36285124473997); [Midjourney docs: Style Reference](https://docs.midjourney.com/docs/style-reference)
- One guide says an `--oref` job submitted under V8 is rendered by V7, and that a V8.2 Edit Model replaces Omni/Character Reference on the V8 family — not confirmed against official docs. — [Blake Crosley Midjourney guide](https://blakecrosley.com/en/guides/midjourney)
- AI image generators often mix up Buddha and bodhisattva features and get mudras wrong; AI Buddhist images are best framed as interpretive visuals and checked against museum collections, temple publications and well-documented statues. (Source is a Buddhist-statue retailer's blog.) — [Butuzou](https://butuzou.com/blogs/blog/can-ai-generated-buddhist-deity-images-be-respectful)

### Inferences
Example prompt pairs (my drafts; append the current Midjourney version flag and a site-wide `--sref` code once chosen; `--ar 9:16` for social, `--ar 16:9` for site heroes and YouTube long-form). Motion prompts are written for image-to-video: camera + one subtle motion, nothing else.

| # | Style / use | Midjourney still prompt | Image-to-video motion prompt |
|---|---|---|---|
| 1 | Golden statue, cinematic realism (quote short, site hero) | `seated golden Buddha statue in dhyana mudra inside a dim temple hall, shafts of morning light through wooden lattice, drifting incense smoke, shallow depth of field, 85mm, warm gold and deep umber palette, reverent, eye-level composition, full figure in frame --ar 9:16 --style raw` | `Very slow push-in toward the statue. Incense smoke drifts upward, dust motes float through the light shafts. The statue stays completely still. Locked horizon, no camera shake.` |
| 2 | Bodhi tree at dawn (meditation loop) | `ancient bodhi tree on a low hill at dawn, heart-shaped leaves, soft mist in the valley, a simple stone seat beneath the tree, pale gold sky, wide shot, serene, natural light --ar 16:9 --style raw` | `Static camera. Leaves tremble gently in a light breeze, mist drifts slowly left to right, light stays constant. Calm, continuous, no cuts.` |
| 3 | Lotus (transition / b-roll) | `single pink lotus opening on still dark water, dew on petals, soft rim light, reflections, macro, minimal composition, negative space above for text --ar 9:16` | `Petals open very slightly, a single ripple spreads across the water, slow orbit of about 10 degrees to the right.` |
| 4 | Thangka-inspired (teachings, Buddhas pages) | `Tibetan thangka-inspired painting of Shakyamuni Buddha seated on a lotus throne, earth-touching mudra, mineral pigments, fine gold line work, symmetrical composition, cloud and mountain border, flat traditional perspective --ar 4:5` | `Slow vertical tilt up from the lotus throne to the face. Painted surface stays flat; only a faint shimmer on the gold lines. No figure movement.` |
| 5 | Ink wash / sumi-e (Zen stories, non-self themes) | `sumi-e ink wash painting, lone monk seen from behind walking a mountain path, pine trees, large empty paper sky, loose brushwork, monochrome with one faint red seal, minimal --ar 16:9` | `Ink mist rolls slowly across the mountains, the monk takes two slow steps forward, gentle parallax between foreground pines and distant peaks.` |
| 6 | Storybook illustration (Jataka tales) | `children's storybook illustration of the Banyan Deer Jataka, a golden deer standing before a king in a forest clearing, warm gouache texture, soft edges, ancient Indian setting, gentle expressions --ar 16:9` | `The deer lowers its head slightly, leaves fall slowly, the king leans forward a little. Slow push-in.` |
| 7 | Cosmic / sacred geometry (transcendence, visualization) | `vast dark space filled with a luminous mandala made of fine golden lines and lotus petals, soft nebula behind, perfectly symmetrical, centred, glowing particles, deep indigo and gold --ar 1:1` | `The mandala rotates clockwise very slowly and evenly, particles drift outward, brightness pulses gently on a slow breathing rhythm. Seamless, constant speed.` |
| 8 | Monk at practice, realism (narrated shorts) | `elderly Theravada monk in saffron robes seated in meditation on a wooden veranda, forest monastery, early morning, soft side light, calm face, eyes closed, 50mm, documentary photograph --ar 9:16 --style raw` | `Static camera. The monk breathes slowly, robe edge moves slightly in the breeze, a leaf falls in the background. Eyes stay closed.` |
| 9 | Alms round (story b-roll) | `line of monks in ochre robes walking barefoot on a misty village road at sunrise, alms bowls, long lens compression, golden backlight, respectful distance --ar 16:9 --style raw` | `Slow lateral tracking shot left to right at walking pace, monks walk steadily, mist glows in backlight.` |
| 10 | Candle and bowl (guided meditation background) | `brass singing bowl and a single candle on a dark wooden floor, soft bokeh, warm low light, lots of empty dark space, minimal --ar 16:9` | `Static camera. Candle flame flickers softly, nothing else moves.` |

- Shot-type vocabulary that suits contemplative pacing: slow push-in, slow tilt up from base to face, locked-off static with one moving element (smoke, leaves, water, flame), slow lateral track, slow rise over a landscape. Avoid fast orbits, crash zooms, whip pans and anything that animates a Buddha figure's face or body (see section 6).
- For statues and paintings, add "the statue/painting does not move" to the motion prompt; video models tend to animate faces and hands unless told not to.
- Check every Buddha still for: mudra correctness, five fingers, ushnisha and elongated ears, symmetrical halo, no extra limbs unless a multi-armed deity is intended and named, full figure not cropped at the neck.
- Styles 4–7 are plainly non-photoreal, which also keeps them on the lighter side of the platforms' AI-disclosure rules (section 5).

### Gaps
- No source gave tested prompts for this niche on Higgsfield; the table is untested.
- Which Midjourney version is current, and whether `--oref` works natively in it, is unresolved from the sources found.
- Higgsfield model names, clip lengths, credit costs and End Frame availability conflict between Higgsfield's own pages; check the live model list.

## 3. Building a consistent recurring look or character across a series

### Takeaway
Higgsfield's mechanism is Soul ID (a trained identity) plus Elements for reuse, always feeding stills into image-to-video; Midjourney's equivalents are Omni Reference for the character and a fixed Style Reference for the look. For this niche, a stylised narrator or a consistent art style is safer than a photoreal "AI monk".

### Cited Findings
- Soul ID is a trained identity layer inside Higgsfield's Soul image models (Soul, Soul 2.0, Soul Cinema). Identities do not transfer between image models: one trained in Soul 2.0 works only there. Vendor. — [Higgsfield: keep AI character consistent](https://higgsfield.ai/blog/keep-ai-character-consistent)
- Training photo counts conflict between Higgsfield pages: "5+ photos" versus "20 reference photos". — [Higgsfield: Soul ID](https://higgsfield.ai/blog/Soul-ID-AI-Character-Consistency); [Higgsfield: Soul ID turns photos into AI character](https://higgsfield.ai/blog/Higgsfield-SOUL-ID-Turns-Your-Photos-Into-AI-Character)
- Recommended flow: generate a portrait with the Soul ID character, use it as the start frame in a video model, prompt only action and camera; for longer sequences chain two or three clips from one start frame, then start a new chain from a fresh Soul ID portrait. To reuse a character across separate clips, save it as an Element (Soul ID characters appear in Elements automatically). Vendor. — [Higgsfield: keep AI character consistent](https://higgsfield.ai/blog/keep-ai-character-consistent)
- Midjourney Omni Reference can be combined with Style References and image prompts. — [Midjourney docs: Omni Reference](https://docs.midjourney.com/hc/en-us/articles/36285124473997)
- Venerable Juewei called the use of a monk's appearance by the AI persona Yang Mun "completely inappropriate"; Ryan Stagg (Buddhism & AI Initiative) said the figure exploits stereotypical Western projections of transcendence. — [Columbia News Service](https://columbianewsservice.com/2026/03/24/millions-found-comfort-in-a-buddhist-monk-but-he-was-never-real/); [Buddhism & AI Substack](https://buddhismai.substack.com/p/is-yang-mun-real)
- Instagram is piloting an optional profile-level "AI creator" label for accounts that lean heavily on AI (2026). — [Hypebeast](https://hypebeast.com/2026/5/instagram-tests-voluntary-ai-creator-label-on-profiles)

### Inferences
- A "series bible" approach: (1) pick one style per series (e.g. ink wash for Zen stories, storybook gouache for Jataka, realism for meditation loops); (2) make one master character sheet in Midjourney (front, three-quarter, profile, full body, same robes); (3) lock style with one `--sref` code and character with `--oref`; (4) in Higgsfield, train a Soul ID or save an Element from those sheets; (5) keep a fixed palette, caption font, opening sting and citation card across all episodes.
- Safer narrator options than a photoreal monk: voice-only narration over scenes; a clearly illustrated/ink-wash narrator; or the Buddha shown as a statue or traditional painting rather than as a talking, lip-synced character.
- If a recurring human-looking character is used, say plainly in the bio and descriptions that it is an AI illustration and not a real monastic or teacher, and never attribute invented sayings to it as Buddhist teaching.
- For the Buddha specifically, consistency is better achieved by choosing one traditional iconographic form (e.g. Gandharan, Sukhothai or thangka style) and holding it, than by training a "face".

### Gaps
- No source describes Soul ID or Elements being used for stylised (non-photoreal) or religious figures; whether Soul ID holds an illustrated character as well as a photo-based one is untested here.
- No guidance from a Buddhist organisation specifically on AI narrator characters was found beyond the Yang Mun criticism.

## 4. Seamless looping backgrounds, 10–60 minute videos from short clips, and embedding video in a static HTML site

### Takeaway
Loops are made by matching first and last frames and then hiding residual drift with a crossfade; long videos are that loop repeated with ffmpeg stream-copy under a separately made audio bed. On the website, use a muted, looping, inline `<video>` with WebM before MP4 and a poster image.

### Cited Findings
- Even with the same image supplied as first and last frame, AI clips drift, so the loop visibly jumps on each restart (case study used 8-second clips at 60 fps). — [Contra: making AI nature videos loop forever](https://contra.com/p/YgLoLZMR-making-ai-nature-videos-loop-forever)
- A crossfade that blends the last 10–15% of the clip over the first 10–15% hides most mismatches in position and lighting and is the most forgiving loop type for AI clips; choose between trim, crossfade and ping-pong deliberately and test the final encoded file. Target 4–6 seconds for clips intended to loop. — [Magic Hour: seamless AI video loops](https://magichour.ai/blog/how-to-make-seamless-ai-video-loops); [PicassoIA](https://blog.picassoia.com/how-to-loop-an-ai-video-seamlessly)
- Uploading the same image as both first and last frame yields a start and end that can be looped (Adobe Firefly tutorial; same principle as start/end-frame controls elsewhere). — [Adobe: create looping video](https://www.adobe.com/learn/firefly/web/create-looping-video-premiere-firefly)
- Kling 3.0 on Higgsfield supports setting both start and end frames; another Higgsfield page says End Frame was removed from some newer versions. — [Higgsfield: Kling 3.0 guide](https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation); [Higgsfield: best AI video generators 2026](https://higgsfield.ai/blog/best-ai-video-generators-2026)
- ffmpeg: `ffmpeg -stream_loop -1 -i input.mp4 -c copy output.mp4` repeats without re-encoding (`-1` = infinite; add `-t <seconds>` to cap length); `-stream_loop` must come before `-i`. — [OTTVerse](https://ottverse.com/how-to-loop-videos-using-ffmpeg-step-by-step-tutorial/); [FFmpeg trac ticket 6121](https://trac.ffmpeg.org/ticket/6121)
- A crossfaded seam needs re-encoding with the `xfade` filter, whose `offset` sets when the fade starts; a gist exists for making a cross-faded seamless loop from a non-looping clip (contents not verified). — [FFmpeg wiki: Xfade](https://fftrac-bg.ffmpeg.org/wiki/Xfade); [GitHub gist](https://gist.github.com/yadex205/4512716a15e17c76e0b58fd3e09a1f13)
- web.dev's video-performance page shows the GIF-replacement pattern `autoplay muted loop playsinline` with a WebM source listed before MP4. — [web.dev: Video performance](https://web.dev/learn/performance/video-performance)
- Browsers block unmuted autoplay by default; Safari on iOS needs both `muted` and `playsinline` to autoplay; `preload="none"` conserves bandwidth; scripts should handle the rejected `play()` promise rather than assume autoplay worked. — [MDN: Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay); [Cloudinary](https://cloudinary.com/guides/video-effects/video-autoplay-in-html); [Video.js](https://videojs.org/blog/2)

### Inferences
- Loop recipe (untested here): generate a 5–10 s clip from a still with only cyclic motion (smoke, water, leaves, flame, slow rotation) and a static camera; use the same still as start and end frame where the model allows; then bake a crossfade so the file itself loops cleanly:
  ```bash
  # 8 s clip, 1 s crossfade -> 7 s seamless loop
  ffmpeg -i clip.mp4 -filter_complex \
   "[0:v]split[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[body];[b]trim=end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=6[v]" \
   -map "[v]" -an -c:v libx264 -crf 18 -pix_fmt yuv420p loop.mp4
  # repeat to 30 min without re-encoding, then add the audio bed
  ffmpeg -stream_loop -1 -i loop.mp4 -t 1800 -c copy bg_30min.mp4
  ffmpeg -i bg_30min.mp4 -i meditation_audio.m4a -c:v copy -c:a aac -shortest final.mp4
  ```
  Verify the xfade offset against the real clip duration (offset = body length minus fade length).
- Ping-pong (forward then reversed) is the fallback for scenes with no directional motion; it fails on smoke, water flow and walking because they visibly reverse.
- A 7-second loop repeated for an hour is noticeable. For long-form, make 3–6 different loops of the same scene and dissolve between them every few minutes; this also helps against "repetitive content" judgements.
- Website embed pattern for `index.html`, `meditation.html`, `visualization.html`:
  ```html
  <video autoplay muted loop playsinline preload="metadata"
         poster="img/hero-poster.webp" width="1280" height="720" aria-hidden="true">
    <source src="video/hero.webm" type="video/webm">
    <source src="video/hero.mp4"  type="video/mp4">
  </video>
  ```
  Working targets (my judgement, not from a source): 6–12 s loop, 1280x720, no audio track, roughly 1–3 MB; poster = first frame as WebP/JPEG under ~100 KB; `object-fit: cover` in CSS; lazy-load videos below the fold with IntersectionObserver; honour `prefers-reduced-motion` by showing only the poster; add a visible pause control for any loop longer than 5 seconds for accessibility. Encoding: `ffmpeg -i loop.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 26 -movflags +faststart hero.mp4` and a VP9/AV1 WebM alongside.
- Host full guided meditations on YouTube and embed them; keep only short silent loops as files in the repository, since large binaries bloat a git-hosted static site.

### Gaps
- No source covered hour-long meditation output specifically; the long-form workflow is inference.
- web.dev and MDN could not be opened, so file-size budgets, poster guidance and lazy-loading code are not sourced; confirm against [web.dev video performance](https://web.dev/learn/performance/video-performance).
- Whether the user's current Higgsfield plan and model offer an end frame is unknown.

## 5. Platform specs and rules: aspect ratios/lengths, YouTube inauthentic-content policy, AI disclosure on YouTube, TikTok and Meta

### Takeaway
All three short-video platforms take 9:16 at 1080x1920; YouTube Shorts run up to 3 minutes. YouTube's July 2026 clarification makes templated, near-identical videos non-monetisable regardless of AI use, while AI as a production tool remains allowed; disclosure is required for realistic synthetic content, not for clearly unrealistic or animated content.

### Cited Findings
- Reels, Shorts and TikTok share 9:16 at 1080x1920; a cross-platform safe zone of 900x1400 px centred on the canvas is cited; TikTok's bottom ~25% and right edge are covered by caption and buttons. Third-party guides. — [BlitzCut: social video specs 2026](https://blitzcutai.com/blog/social-video-specs-2026); [AdaptlyPost: safe zones 2026](https://adaptlypost.com/blog/social-media-safe-zones-2026-complete-guide)
- YouTube: square or vertical videos up to three minutes uploaded after 15 October 2024 are categorised as Shorts. Official. — [YouTube Help: three-minute Shorts](https://support.google.com/youtube/answer/15424877?hl=en)
- TikTok: record in-app up to 10 minutes, upload up to 60 minutes; commonly cited 500 MB limit; MP4 or MOV. Third-party; one source notes TikTok publishes no official limit. — [Hootsuite](https://blog.hootsuite.com/social-media-video-length/); [Headliner](https://learn.headliner.app/hc/en-us/articles/34164986965271-Social-Media-Video-Length-Limits-2025)
- Instagram Reels maximum length is disputed across sources: 3 minutes in-app (raised from 90 s in January 2025), 15 minutes for device uploads, or 20 minutes. — [Hootsuite](https://blog.hootsuite.com/social-media-video-length/); contradicted by [Kapwing](https://www.kapwing.com/resources/social-media-video-aspect-ratios-and-sizes-the-2025-guide/)
- YouTube Partner Program, clarification effective 16 July 2026: "inauthentic content" that cannot be monetised is split into (a) generic or repetitive content — templated or near-identical videos, AI-made or not; channels dedicated to it are removed from YPP; (b) unsatisfying or off-putting content — emotionally manipulative formulas, or content lacking a clear narrative arc or logical progression; (c) AI personas presenting health, legal or financial information. AI is not banned; AI used for editing, scripting or production can qualify if videos add original value. YouTube says there are no material changes to what it allows. — [Tubefilter, 13 Jul 2026](https://www.tubefilter.com/2026/07/13/youtube-inauthentic-content-monetization-policy-update/); [TechCrunch, 20 Jul 2026](https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/); [TechRepublic](https://techrepublic.com/article/news-youtube-ai-video-monetization-rules)
- YouTube disclosure: creators must disclose meaningfully altered or synthetically generated content that seems realistic. Not required for clearly unrealistic content (examples: someone riding a unicorn, an AI-generated animation of a missile, green-screen floating in space), animation, special effects, minor aesthetic edits (colour, lighting, background blur, beauty filters) or generative AI used for production assistance. Required for realistic likenesses, altered footage of real events or places, and realistic generated scenes. YouTube may add a label itself, and Community Guidelines apply regardless. — [YouTube Help: disclosing altered or synthetic content](https://support.google.com/youtube/answer/14328491?hl=en); [YouTube blog](https://blog.youtube/news-and-events/disclosing-ai-generated-content)
- TikTok: encourages labelling content fully generated or significantly edited by AI and requires labels on AI-generated content with realistic images, audio or video; creators use a toggle before posting; TikTok auto-labels content made with its AI effects and content carrying C2PA Content Credentials, and an auto-label cannot be removed. — [TikTok Support: AI-generated content](https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content); [TikTok Newsroom, 24 Nov 2025](https://newsroom.tiktok.com/more-ways-to-spot-shape-and-understand-ai-generated-content?lang=en-GB)
- A marketing-agency blog says TikTok made disclosure mandatory for realistic AI ad content on 21 July 2026; not confirmed on TikTok's own pages. — [Common Thread Collective](https://commonthreadco.com/blogs/coachs-corner/tiktok-ai-ad-disclosure-rules-ecommerce-2026)
- Meta: the label is "AI info" (renamed from "Made with AI" in July 2024 — older material). Meta may require a label on Facebook, Instagram and Threads for photorealistic video or realistic-sounding audio that was digitally created or altered; this requirement does not apply to images; penalties may apply for missing required labels. Content detected as merely AI-edited has the label moved into the post menu; fully AI-generated content keeps a visible label. — [Meta Help: identify AI content](https://www.meta.com/en-gb/help/artificial-intelligence/1783222608822690/); [Meta Transparency: labeling AI content](https://transparency.meta.com/governance/tracking-impact/labeling-ai-content); [TechCrunch, Sept 2024](https://techcrunch.com/2024/09/12/meta-is-making-its-ai-info-label-less-visible-on-content-edited-or-modified-by-ai-tools)

### Inferences
- Working spec sheet: master every short at 1080x1920, 9:16, 30 fps, H.264 MP4; keep captions and citations inside the central 900x1400 area; keep cross-posted shorts at or under 60–90 s so one file is valid everywhere; long-form at 1920x1080 16:9.
- Disclosure by content type: photoreal monk, temple or "real-looking" scene, or a realistic AI voice presented as a person → label on all three platforms. Ink wash, thangka-style, storybook and mandala animation → not strictly required on YouTube, but labelling anyway is low-cost and fits a channel whose subject includes right speech. Higgsfield/Midjourney outputs may carry provenance metadata that triggers automatic labels in any case.
- Staying on the right side of YouTube's "generic or repetitive" test: each video needs its own script, a real explanation or story arc, a cited source, and varied visuals. A feed of identical quote-over-statue clips with a cloned voice is the textbook target. The "AI persona on sensitive topics" category is a reason not to let a synthetic monk make health claims about meditation (e.g. curing anxiety or illness).
- Monetisation thresholds and eligibility were not researched here; the policy above only matters once the channel applies to YPP, but removal risk applies to the format from day one.

### Gaps
- Official current Reels length limit not confirmed (sources conflict: 3, 15 or 20 minutes).
- YouTube's exact policy wording could not be read directly (support.google.com blocked); the three-category description comes from Tubefilter/TechCrunch coverage via search.
- No 2026 change to Meta's organic (non-ad) AI labelling rule was confirmed beyond the optional "AI creator" profile label test.

## 6. Cultural and religious sensitivity: respectful depiction of the Buddha, fake Buddha quotes, sourcing authentic quotes

### Takeaway
The strictest published guidance (Knowing Buddha Organization, Thailand) objects to Buddha images used as decoration, furniture or merchandise and to AI caricatures of the Buddha and monks; Thai authorities have acted against AI images of monks in staged scenes. Quotes should be taken only from canonical texts with a citation, because misattributed "Buddha quotes" are widespread and documented.

### Cited Findings
- Knowing Buddha Organization (KBO) dos and don'ts: show respect by gesture (wai) or attitude — "If you don't want to pay respect at all at least do not look down on Buddha"; "Do not place images or statues of Buddha as if they were furniture or decorative objects" (examples include tables, toilets, bars and restaurants); do not treat images as merchandise; "Don't buy, give as a gift, or share any product that improperly uses an image of the Buddha". — [Knowing Buddha: dos and don'ts](https://knowingbuddha.org/dos-and-donts)
- KBO has a specific statement, "Why We Shouldn't Use AI to Caricature the Buddha or Buddhist Monks Inappropriately", opposing AI edits that place the Buddha or monks in inappropriate situations. — [Knowing Buddha](https://knowingbuddha.org/post/why-we-shouldn-t-use-ai-to-caricature-the-buddha-or-buddhist-monks-inappropriately)
- KBO operates as a watchdog whose volunteers search the internet for misuse of the Buddha's image; its founder says many offenders act from ignorance, not malice. Some of its positions (e.g. on tattoos) go beyond common Buddhist practice, so it represents one organisation's view. — [The World, 9 Mar 2021](https://theworld.org/stories/2021/03/09/thai-organization-s-crusade-against-blaspheming-buddha)
- Thailand's National Office of Buddhism asked the Cyber Police to act over AI-generated images on Facebook showing monks in staged scenes such as playing in a rock band (2023 — older material). — [Mothership, Nov 2023](https://mothership.sg/2023/11/thai-buddhist-office-cyber-police-arrest-ai-images)
- General etiquette in Buddhist protocol guides: do not point feet at a Buddha image, do not place images on the floor, do not turn your back on the image. — [Buddhist Council: Buddhist protocols](https://buddhistcouncil.org/buddhist-protocols/)
- Sri Lanka deported British tourist Naomi Coleman in April 2014 over a Buddha tattoo on her arm, though she said she was a practising Buddhist; three French tourists received suspended six-month sentences in 2012 for kissing a Buddha statue (older material, shows how strongly depictions are policed in some countries). — [NPR, 22 Apr 2014](https://www.npr.org/sections/thetwo-way/2014/04/22/305899590/tattoo-of-buddha-gets-british-tourist-thrown-out-of-sri-lanka); [Al Jazeera](https://www.aljazeera.com/news/2014/4/24/sri-lanka-expels-tourist-with-buddha-tattoo)
- Respect in AI Buddhist imagery "depends on intention, context, and correct iconography, not on the tool"; some models are trained on temple treasures or living artists' work without clear permission. — [Butuzou](https://butuzou.com/blogs/blog/can-ai-generated-buddhist-deity-images-be-respectful)
- Fake Buddha Quotes is run by Bodhipaksa, a Triratna Buddhist teacher who has debunked misattributed quotes since 2003; a fake quote is one that cannot be established as belonging to a canonical text; the site pairs fakes with genuine scriptural passages and traces origins where possible (one popular "Buddha" quote comes from an 1820 book by Rev. Charles Caleb Colton). — [Tricycle: Fake Buddha Quotes](https://tricycle.org/magazine/fake-buddha-quotes/); [Lion's Roar: I Can't Believe It's Not Buddha](https://lionsroar.com/i-cant-believe-its-not-buddha/)
- Thanissaro Bhikkhu's "7 Things the Buddha Never Said" includes "Life is suffering", "All things are perfect exactly as they are", "All worldlings are mad", "Everything is impermanent" and "Suffering comes from resisting change" (partial list as retrieved). — [Lion's Roar](https://www.lionsroar.com/what-the-buddha-never-said/)
- The Maha-Parinibbana Sutta itself says attributed sayings should be checked against the teachings and rejected if they do not fit. — [Lion's Roar: Real Buddha quotes about fake Buddha quotes](https://www.lionsroar.com/real-buddha-quotes-about-fake-buddha-quotes)
- Licensing of sources: Bhikkhu Sujato's translations on SuttaCentral are dedicated to the public domain under CC0; some other material on SuttaCentral has third-party copyright. — [SuttaCentral copyright (mirror)](https://dhammatalks.net/suttacentral/sc2016/sc/copyright.html)
- Access to Insight texts are offered for free distribution; redistribution is allowed "provided that you do not charge any money for them", with notices kept and a link back requested. Mirrors label Thanissaro Bhikkhu's translations differently (CC BY-NC 4.0 versus CC BY-SA 3.0). — [Access to Insight FAQ](https://accesstoinsight.org/faq.html); [Access to Insight license](https://accesstoinsight.org/license.md)

### Inferences
- Practical depiction rules for this project (derived from the above): show the Buddha whole, upright, centred and elevated in frame; never a severed head as decor, never on the floor, near feet, shoes, alcohol, bathrooms, or as a product/prop; no comedic, sexualised, action-hero or "Buddha does X" meme treatment; do not animate the Buddha talking, dancing or reacting; do not put monks in staged gag scenes; do not print site logos or sales calls-to-action across the figure; avoid merchandise bearing the Buddha's image.
- On the website: do not place Buddha imagery in the footer or behind navigation; a hero placement at the top of the page fits the "placed high" convention.
- Because monetised use sits awkwardly with Access to Insight's no-charge terms and its unclear licence labels, use Bhikkhu Sujato's CC0 translations from SuttaCentral as the default quote source for monetised videos, with the sutta reference on screen.
- Quote workflow: every quote gets a canonical reference (e.g. "Dhp 5", "SN 36.6", "MN 22") and a translator credit before it goes into a script; search any unsourced quote on Fake Buddha Quotes first; label paraphrases as paraphrases; prefer "The Dhammapada says" to "Buddha said" for verse collections.
- Starter list of well-attested passages to verify on SuttaCentral before use (references from my background knowledge, not checked in this session): Dhammapada 1–2 (mind precedes all things), 5 (hatred is not ended by hatred), 183 (avoid evil, do good, purify the mind), 277–279 (impermanence, suffering, non-self); SN 36.6 Sallatha Sutta (the two arrows); MN 22 (the raft simile); AN 3.65 Kesamutti/Kalama Sutta (often misquoted as "believe nothing"); Snp 1.8 Metta Sutta.
- Widely circulated lines commonly listed as fake or doubtful (from background knowledge; confirm each on fakebuddhaquotes.com): "Three things cannot be long hidden: the sun, the moon, and the truth"; "Holding on to anger is like grasping a hot coal"; "In the end, only three things matter…"; "Peace comes from within. Do not seek it without"; "The mind is everything. What you think you become"; "You yourself, as much as anybody in the entire universe, deserve your love and affection". The site's existing `quotes.html` should be audited against this.
- Traditions differ (Theravada, Mahayana, Vajrayana have different iconography and canons); name the tradition a story or image comes from rather than blending them.

### Gaps
- KBO's full list (tattoos, Buddha heads, feet) could not be read directly; only the items above were retrieved.
- No Tricycle or Lion's Roar article specifically on AI-generated Buddha images was found.
- fakebuddhaquotes.com could not be opened, so the specific fake-quote list is unverified in this session.
- The official current licence for Thanissaro Bhikkhu's translations (dhammatalks.org / Access to Insight) is unresolved.

## 7. Narration and music: AI voiceover, ambient music and licensing

### Takeaway
Commercial rights for AI voice and music depend on being on a paid plan at the time of creation, and holding a licence does not prevent YouTube claims or satisfy YouTube's own monetisation rules. Terms changed during 2026 and third-party summaries conflict, so the current terms pages must be read before publishing.

### Cited Findings
- Suno: paid tiers (Pro/Premier) carry a commercial licence; free-tier output is not cleared for monetised use, and upgrading later does not retroactively license earlier tracks. One source says that under 2026 terms Suno retains authorship, and mentions a 3 September 2026 terms transition with extra download-related conditions. Third-party summaries. — [licenseorg.com](https://licenseorg.com/blog/ai-music-licensing-suno-elevenlabs); [terms.law forum](https://terms.law/forum/thread/suno-ai-music-commercial-license.html)
- ElevenLabs Music has tiered commercial licences; a Paid Marketing License covers paid ads, digital marketing and client work, with larger uses needing Enterprise. A Music Marketplace launched 19 March 2026; some sources say creators hold no copyright in tracks sold through it. — [ElevenLabs docs: music marketplace](https://elevenlabs.io/docs/overview/capabilities/music/marketplace.md); [AI Musicpreneur](https://www.aimusicpreneur.com/ai-tools-news/elevenlabs-music-marketplace-payouts-march-2026/)
- Platform permission does not settle YouTube monetisation: the source platform's rights and YouTube's channel monetisation policies both have to be satisfied, a video can still be claimed even with a paid licence, and Content ID requires exclusive rights to the reference material. — [InVideo: AI music copyright comparison](https://invideo.io/blog/ai-music-copyright-comparison/); [licenseorg.com: AI commercial use guide 2026](https://licenseorg.com/blog/ai-commercial-use-guide-2026)
- Native audio generation is an option on some Higgsfield video models (Seedance, Kling, LTX, PixVerse), and lip sync is available as an add-on. Vendor. — [Higgsfield: best AI video generators 2026](https://higgsfield.ai/blog/best-ai-video-generators-2026)
- YouTube requires disclosure for realistic synthetic audio that makes it seem a real person said something they did not (example: a medical professional's advice). — [YouTube Help](https://support.google.com/youtube/answer/14328491?hl=en)

### Inferences
- Voice: one consistent, calm narrator voice is part of the series identity. The owner's own voice is the strongest protection against "inauthentic/repetitive" judgements and avoids licence questions; if AI voice is used, pick a stock voice licensed for commercial use on a paid plan and never clone a real teacher's or monastic's voice.
- Guided meditations need slow pacing and real silences; script the pauses and add them in the edit rather than relying on the voice model.
- Music: keep to drones, singing bowls, soft pads and nature ambience. Keep a simple log per track (tool, plan tier, date generated) to answer any claim. Do not register AI tracks with Content ID or distributors that auto-claim, or the channel's own videos get claimed.
- Chanting: avoid generating fake Pali/Sanskrit/Tibetan chant with AI; it is usually gibberish and is the audio equivalent of a fake quote. Use properly licensed real recordings or none.
- Audio bed for long videos: generate or assemble a 3–5 minute ambient piece, crossfade it into itself, and lay it under the looped picture.

### Gaps
- Current official ElevenLabs voice (text-to-speech) and Suno terms were not read directly; details above come from third-party summaries that disagree on prices and attribution.
- No source was found on which voices or music styles perform best for meditation content.
- Higgsfield's own voice/audio licensing terms were not researched.
