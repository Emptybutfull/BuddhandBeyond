# Assets without Envato

Steven no longer has Envato. Order of preference: **make it** (code, AI, Blender, Steven's
camera) → **public domain / CC0** → **free-licence libraries** → fair-use quotes
(memes-fair-use.md). Licences change: open the licence page before the first use from a site, and
log every outside asset in the project's `rights.csv` (asset, URL, licence, date).

## Footage
| Need | Source | Notes |
|---|---|---|
| Anything specific or stylised | **Google Flow / Veo** from a Midjourney or ChatGPT still | first choice; keep faces out, cut to the best 2–4 s |
| Smoke, fire, ink, dust, light-leak overlays | Flow/Veo on black, or code (`Particles`, `@remotion/light-leaks`) | screen blend |
| Real-world b-roll (nature, cities, hands, water) | **vidIQ `vidiq_find_broll`** (1 credit, returns mp4 + credit line), **Pexels**, **Pixabay**, **Mixkit**, **Coverr** | free for monetised YouTube; credit when asked; no agency logos or recognisable private people |
| Old educational / archive film (the Scipio look) | **Prelinger Archives** on archive.org, **NASA**, Library of Congress | check each item's rights field |
| Steven's own | phone footage of the shrine, hands, walking, sky | always the most "expensive" b-roll |

## Images and art
| Need | Source |
|---|---|
| Traditional Buddhist art, old masters | **Met Open Access** (CC0), **Cleveland Museum of Art** (CC0), **Smithsonian Open Access / National Museum of Asian Art**, **Art Institute of Chicago**, **Rijksmuseum**, **Wikimedia Commons** (check the tag), rawpixel's public-domain sets |
| New illustration | Midjourney, Nano Banana, ChatGPT (ai-assets.md) |
| Paper, grain, dust, halftone textures | made in code (`Grain`, `Paper`, `Halftone`), texturelabs.org, Poly Haven (CC0) |
| Icons and symbols | drawn as SVG in code; never downloaded icon packs |

## Music
| Source | Licence in short |
|---|---|
| **YouTube Audio Library** | free for monetised videos; some tracks need a credit line |
| **AI music**: Suno / Udio (paid plans for commercial use), Google's music tools, **vidIQ `vidiq_generate_music`** (25 credits per track, royalty-free WAV up to 3 min) | describe genre + mood + instruments + tempo + "instrumental"; generate 2–3 beds per video; label AI music if YouTube asks |
| **Pixabay Music**, **Mixkit**, **Uppbeat** (free tier needs a credit and has a monthly limit) | free with conditions; download the licence certificate |
| **Incompetech** (Kevin MacLeod), **Free Music Archive** | CC BY: credit exactly as requested |
| Steven's own bowl, bell, chanting, room tone | record on the Plaud; the channel's signature sounds |

Never: commercial songs, film scores, "no copyright" uploads from random channels.

## Sound effects
- **Synthesise in code** first: clicks, ticks, soft whooshes, sub booms and risers are a few lines
  of WebAudio/ffmpeg (sine sweeps, filtered noise) and land exactly on the frame. `@remotion/sfx`
  ships a small set too.
- **Mixkit SFX**, **Pixabay SFX**, **YouTube Audio Library** (effects tab), **Freesound** (filter
  to CC0; CC BY needs credit), **Zapsplat** (free with credit).
- AI sound effects (ElevenLabs and similar) for anything odd: "wind through prayer flags".
- Record real ones: bowl, bell, page turn, brush on paper, pouring tea.

## Fonts
Google Fonts only (open licences, all in `@remotion/google-fonts`): see design-system.md § Type.

## 3D
Poly Haven (CC0 HDRIs, textures, models); image-to-3D generators (blender.md); procedural scripts.

## What Envato used to cover → now
| Envato item | Replacement |
|---|---|
| Stock video clips | Flow/Veo, `vidiq_find_broll`, Pexels/Pixabay/Mixkit, Steven's phone |
| Music tracks | YouTube Audio Library, AI music, `vidiq_generate_music` |
| Sound effects | synthesised in code, Mixkit/Pixabay/Freesound CC0 |
| Motion templates, transitions, overlays | the Remotion kit (`src/hybrid`, `src/design`), `@remotion/transitions`, `@remotion/light-leaks` |
| Textures, LUTs | generated in code; Claude writes `.cube` LUTs |
| Fonts | Google Fonts |

In `gotchas.md` and `pipeline.md` on the PC, replace every Envato step with the rows above.
