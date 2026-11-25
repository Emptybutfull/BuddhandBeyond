# Higgsfield AI platform: products, plans, credits and usage terms (as of 25 Nov 2026)

Method note for the report writer. Two kinds of evidence are used and they are labelled throughout:

- **[LIVE]** = read directly from the user's own Higgsfield account through the Higgsfield connector on 2026-11-25 (balance, plan config, model catalog, cost quotes). These are the most reliable numbers in this file. No generation was run and no credits were spent. Cited to the nearest public page, since connector output has no URL.
- **[SNIPPET]** = taken from web-search result summaries only. higgsfield.ai (and other hosts) could not be opened from this session (network allowlist), so no official page was read in full. Wording attributed to Higgsfield's help center, terms, blog and changelog is therefore second-hand and should be re-checked on the live page before anything consequential relies on it.

## What are Higgsfield's main product areas and what is each one for?

### Takeaway
Higgsfield is a browser-based (plus mobile) creative suite that bundles its own models (Soul image family, Cinema Studio, Genjutsu, Marketing Studio, Intone) with roughly 150 third-party image, video, audio and 3D models (Kling, Seedance, Veo, Wan, Nano Banana, GPT Image, Flux, ElevenLabs, Topaz and others) under one credit balance. For a narrated, image-led YouTube channel the relevant areas are Soul / Soul Cinema stills, Cinema Studio video, the general image-to-video models, voice/music tools, upscaling and the Editing Room.

### Cited Findings

**Image generation**
- [LIVE] Higgsfield's own image models in the catalog: "Higgsfield Soul 2.0" (realistic UGC, fashion editorial and character generation; 1.5k/2k; supports a Soul ID for a personalised recurring face and curated style presets), "Soul Cinema" (cinema-grade stills and concept art; 1.5k/2k), "Cinema Studio Image 2.5" (cinematic stills up to 4K), "Soul Cast" (consistent cinematic character identity), "Soul Location" (environment/location generation), plus an "Auto" router that picks a model from prompt intent — [Higgsfield model catalog via connector; public equivalent](https://higgsfield.ai/)
- [LIVE] Third-party image models available: Nano Banana, Nano Banana Pro, Nano Banana 2, 2.1 and 2 Lite (Google); GPT Image 2, 2.5, 2.6 and 2.6 Flare, "OpenAI Hazel" (OpenAI); Seedream 4.5, 5.0 Lite, 5.0 Flash, 5.0 Pro (Bytedance); FLUX.2, FLUX 3 Image, Flux Kontext, FLUX.2 Pro Outpaint (Black Forest Labs); Kling O1 Image, Kling Image 4.0 (up to 8K); Grok Image and Grok Image 2.0 (xAI); Ideogram 4.5, 4.6, 4.6 Precise Edit, Ideogram Vector; Recraft V4.1 and V4 Styles; Z Image; MiniMax H3 Image — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [SNIPPET] Soul ID is described by reviewers as a trained identity: one review says 3-5 reference photos and 5-10 minutes to train; another third-party source says 20 to 80 reference photos. These conflict — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it); [HeyGen pricing blog](https://www.heygen.com/blog/higgsfield-pricing)

**Cinema Studio (video)**
- [LIVE] Several Cinema Studio video generations coexist in the catalog: "Cinema Studio Video" (v1 and v2, the latter with pro/std modes, sound on/off and multi-shot auto/custom), "Cinema Studio Video 3.0" (480p-4K, described as "most advanced cinema-grade model"), "Cinematic Studio Video 3.5" (multi-shot), and "Cinema Studio 4.0" ("cinema-grade video generation with automatic prompt direction and camera, lighting, pacing, genre, era, and color controls"; modes t2v / omni_reference / video_edit / video_extension; 480p-1080p; optional native audio; selectable camera model) — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [SNIPPET] Cinema Studio 2.0 launched late February 2026 centred on a "Director Panel" — [TechNode / PR Newswire Asia](https://technode.global/prnasia/higgsfield-advances-its-creator-first-platform-with-cinema-studio-2-0/)
- [SNIPPET] Cinema Studio 4.0 is described as a director-style workspace with a "Director's Panel" and is the default version when Cinema Studio is opened — [Webull / press release](https://www.webull.com/news/15825991486301184)
- [SNIPPET] Reviewers describe Cinema Studio's distinguishing trait as setting lighting, lens and camera motion as inputs before generation rather than after — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it)

**General video models (text-to-video, image-to-video, edit, extend)**
- [LIVE] Kling 2.6, Kling v3.0 (std/pro/4k modes; "multi-shot, audio sync, motion transfer"), Kling 3.0 Turbo, Kling 3.0 Omni (up to seven reference images; first/last-frame variant; video edit variant), Kling 3.0 Motion Control, Kling 4.0 (text, ordered keyframes, references or video edit; 720p-4K), Kling 4.0 Flash (720p, 3-20 s) — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] Seedance 2.0 and Seedance 2.5 (Bytedance; reference-driven with image/video/audio references, video edit, forward/backward extension, 480p-4K, native audio); Google Veo 3.1 and Veo 3.1 Lite (4/6/8 s); Gemini Omni Flash 1.1 and 1.2 (native audio, edit, extend); Wan 2.6, 2.7, 3.0 and 3.0 Prime (up to 30 s on 3.0); MiniMax Hailuo, H3 and H3 Max; Grok Video, Grok Video 1.5 and 1.5 Lite; FLUX 3 Video and FLUX 3 Video Edit; MAGI-2 (Sand AI, 4-30 s, 1080p, native audio); Happy Horse Video — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] Utility video tools: Draw To Video, Reframe (aspect-ratio change), Video Background Remover, Depth Anything Video (depth maps), FPS Boost, Video Deflicker — [Higgsfield model catalog via connector](https://higgsfield.ai/)

**Camera-motion and viral effect presets**
- [LIVE] The catalog keeps a legacy "Higgsfield Preset" image-to-video model, and the connector exposes preset catalogs by source: "viral" (effects), "genjutsu" / "genjutsu-trending", "soul" (style presets), and "marketing_studio" with categories such as "product-shot" and "motion" — [Higgsfield connector instructions; public equivalent](https://higgsfield.ai/)

**Genjutsu (motion transfer and object swap)**
- [SNIPPET] Genjutsu transforms an existing video rather than generating from scratch, in two modes: Motion Transfer (keeps motion, camera and timing, rebuilds cast/location/look from references) and Object Swap (replaces selected elements, keeps the rest) — [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-genjutsu); [Product Hunt](https://www.producthunt.com/posts/1005829)
- [SNIPPET] Motion Transfer takes 1 to 8 reference images; the source clip keeps its motion, camera and audio; source video should be 4-30 seconds — [ComfyUI docs](https://docs.comfy.org/tutorials/partner-nodes/higgsfield/genjutsu-motion-transfer); [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-genjutsu)
- [LIVE] Catalog entries: "Genjutsu" motion control and object replace (480p-1080p), and "Genjutsu Lite" (motion transfer on Wan 3.0 up to 15 s; object replace on Kling 4.0 up to 4K). The plan config shows a "genjutsu_lite_release" promotion window of 22 Oct - 1 Nov 2026, which dates the Lite launch to late October 2026 — [Higgsfield model catalog and plan config via connector](https://higgsfield.ai/genjutsu)

**Marketing Studio / Ads Studio**
- [LIVE] "Marketing Studio" video and image models (one-click product ads, TikTok/Reels ready), "Marketing Studio Product Shot", "Marketing Studio Video" V2 (motion and UGC product videos, Product Link, Ad Reference and App video tools, 4-30 s), "Marketing Studio Reference Video", "DTC Ads" image model (brand-kit-aware, avatars, products), "Ad Multiplier" (powered by Seedance 2.5) and "Ad Multiplier Recreate" (re-makes a 4-30 s source ad for another audience, language, product or cast) — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] The connector also exposes an "Ads Studio" tool set (brands, products, avatars, story presets, runs), Meta Ads read/write tools, TikTok account connection, trending-music lookup and publishing, a "virality predictor" and video analysis — [Higgsfield connector tool list](https://higgsfield.ai/)
- [SNIPPET] Marketing Studio is described in press material as a template-led workflow for ads, UGC, product shots, marketplace assets, posters and motion — [Webull / press release](https://www.webull.com/news/15825991486301184)

**AI Influencer**
- [SNIPPET] AI Influencer Studio launched in January 2026 as a no-prompt character builder; a later update rebuilt it around short-form video with a character built from 19 menu settings; an October 2026 revamp added parametric control and inserting your own characters into existing videos — [Quasa](https://quasa.io/media/higgsfield-s-ai-influencer-studio-crafting-digital-personas-from-humans-to-anthropomorphic-iguanas-in-seconds); [Higgsfield blog](https://higgsfield.ai/blog/new-ai-influencer); [Semafor, 7 Oct 2026](https://www.semafor.com/article/10/07/2026/creative-tech-startup-higgsfield-launches-ai-influencer-tool); [foro3d, Oct 2026](https://foro3d.com/en/2026/octubre/higgsfield-actualiza-su-estudio-de-influencers-sinteticos-con-control.html)
- [LIVE] The connector's AI Influencer flow produces a character sheet from explicit traits or presets, quotes the price before generating, and then offers Genjutsu animation of the finished character — [Higgsfield connector instructions](https://higgsfield.ai/ai-influencer)

**Editing Room**
- [LIVE] The feature exists under the name "Editing Room" in the account's catalog and tools: "Editing Room Edit" (change what a prompt asks for in one clip of 0.5-30 s), "Editing Room Relight" (relight by placed lights, words or an image), "Editing Room Camera Move" (re-film a clip with a camera move or a new angle), "Editing Room Genjutsu" (swap an object). Tools also cover projects, a timeline, trims, cuts, presets, a price list and timeline render/export — [Higgsfield model catalog and tool list via connector](https://higgsfield.ai/)
- [SNIPPET] Public web search did not surface a page named "Editing Room"; the closest public matches are a "Video Edit" surface and a "Higgsfield Editing" app for cutting and syncing video — [Higgsfield apps: relight](https://higgsfield.ai/apps/relight)

**Lip-sync, voice and audio**
- [LIVE] "Higgsfield Intone": talking-head video where one or two characters speak one to six voice recordings (2-30 s total), optionally staged in up to five shots; 480p-1080p — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] "Sync Lipsync 3" (lip-sync onto existing video, with sync modes bounce/loop/cut_off/silence/remap), video "dubbing" and "voice_change", "Audio Dubbing" (ElevenLabs, dub audio into a target language) — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] Speech: "Text to Speech V2" (selectable engine: ElevenLabs, MiniMax, Seed Speech, Vibe Voice, Cozy Voice; preset or cloned voices), "Eleven v4" (up to 10 voices, 10,000 characters of dialogue) and "Eleven v4 Turbo", "Seed Audio 1.0", "Qwen Audio 3.0 TTS Flash". Voice cloning is exposed through create-voice tools. Music: "ElevenLabs Music v2" and "v2.5" (prompt or custom lyrics). Also sound-effect search/preview/download and stem separation — [Higgsfield model catalog and tool list via connector](https://higgsfield.ai/)
- [SNIPPET] "Speak 2.0" lip-sync is reported at 14 credits for a 5-second 720p clip (third-party, April 2026 data; not re-verified) — [HeyGen pricing blog](https://www.heygen.com/blog/higgsfield-pricing)

**Upscaling and finishing**
- [LIVE] Image: Topaz, Topaz generative, Bytedance Image Upscale (2k/4k). Video: Topaz (1080p/2160p), Bytedance Video Upscale (1080p/2k/4k; standard/pro), generic Video Upscale, "Topaz Hyperion 2.5" (SDR to HDR). Also image background removal, outpaint, "Image Decompose" (layers) and a "/polish" image command — [Higgsfield model catalog via connector](https://higgsfield.ai/)

**3D scene builder ("3D Jutsu")**
- [SNIPPET] 3D Jutsu is Higgsfield's browser-based 3D workspace: it turns a prompt or reference into an editable 3D scene (objects, layout, lighting, cameras, animation) and then into video. A Blender plugin has a "Scene builder" tab that creates editable geometry in the open .blend file — [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-3d-jutsu); [Higgsfield Blender plugin](https://higgsfield.ai/plugins/blender)
- [LIVE] "3D Jutsu Angles" (new camera views of the same location, powered by Seedream 5.0 Pro), plus image/text-to-3D mesh models (Meshy 6/7, Tripo H3.1/P2, Hunyuan3D v3/v3.1, Meta SAM 3 3D objects and body), rigging, and scene-builder tools for projects, asset search, angle generation and video from a scene — [Higgsfield model catalog and tool list via connector](https://higgsfield.ai/)

**Website builder, apps, other studios**
- [LIVE] The connector exposes website tools (create, deploy, publish, rename, database, secrets, repo access) and a "website-builder-flow" workflow described as covering "websites/apps/games", plus playable-game publishing — [Higgsfield connector tool list](https://higgsfield.ai/)
- [LIVE] An apps catalog is searchable and invocable from the connector (apps_search / apps_describe / apps_invoke); public app pages exist at higgsfield.ai/apps/... (e.g. Relight, Similarity Score) — [Higgsfield apps: relight](https://higgsfield.ai/apps/relight); [Higgsfield apps: similarity score](https://higgsfield.ai/apps/similarity-score)
- [LIVE] "Property Studio" (real-estate walkthrough clips, stills and narration) exists as its own flow; a "drama ads" / Short Drama flow and "Katana" preset runs also appear in the tool set — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] "Supercomputer": plan cards list storage (2 GB on Plus, 5 GB on Ultra), "Efficient" and "Smart" supercomputer access and scheduled jobs (2 on Plus, 10 on Ultra); the connector has GPU rental, LoRA import and private-model tools — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [SNIPPET] Changelog entries seen in search: a Shorts tool (vertical 9:16 reels hosted by an AI avatar), Short Drama Studio, Higgsfield Intone, Gemini Omni Flash 1.2, and an Academy beginner course "AI Creation: First Steps" (5 free generations, 3 Oct 2026) — [Higgsfield changelog](https://higgsfield.ai/creator-hub/changelog)

**Mobile**
- [SNIPPET] Higgsfield, Inc. publishes "Diffuse - AI Video Generator" on iOS (iOS 16+, in-app purchases) and Android; coverage of it dates from 2024 — [App Store](https://apps.apple.com/il/app/diffuse-ai-video-generator/id6474068152); [TechCrunch, Apr 2024](https://techcrunch.com/2024/04/03/former-snap-ai-chief-launches-higgsfield-to-take-on-openais-sora-video-generator)
- [SNIPPET] A separate "HGF AI Video, Image Generation" listing exists on the App Store, and a Higgsfield marketing page refers to a "Higgsfield native iOS app"; no feature list was found — [App Store](https://apps.apple.com/ar/app/id6751584572); [Higgsfield marketing page](https://geo.higgsfield.ai/blog/top-ai-video-generator-2026-mobile-experience-pro-creators)

**Company context**
- [SNIPPET] San Francisco-based, founded 2023; a reviewer reports a $1.3 billion valuation from a January 2026 round; Higgsfield's news page lists crossing a $1B annualised revenue run rate (23 Oct 2026) and a Series B extension (11 Nov 2026) — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it); [Higgsfield news](https://higgsfield.ai/blog/news)
- [SNIPPET] G2 shows 4.5 from 103 reviews (page modified 20 Nov 2026) — [G2](https://g2.com/products/higgsfield/reviews?page=3)

### Inferences
- "Ads Studio" and "Marketing Studio" look like two generations or two surfaces of the same product area (both names are live in the tool set); treat them as one area in the guide.
- For a Buddha/dharma narration channel the practical pipeline inside Higgsfield is: stills (Soul Cinema / Cinema Studio Image / Nano Banana Pro / Seedream) -> image-to-video (Kling 3.0, Kling 4.0, Seedance, Cinema Studio 4.0) -> voice (Text to Speech V2 / Eleven v4) and music (ElevenLabs Music) -> upscale (Topaz) -> assemble in the Editing Room or an external editor.
- The mobile story is unclear: Diffuse is the older consumer app; whether the current web feature set (Cinema Studio, Editing Room etc.) is in a mobile app could not be established.

### Gaps
- No official product page was read in full (higgsfield.ai blocked in this session). Feature descriptions marked [SNIPPET] are from search summaries.
- The catalog listing returned 147 models over two pages; only names, descriptions and key parameters were extracted, not every parameter of every model.
- Preset catalogs (viral effects, camera motions, Soul styles) were not enumerated, so the number and names of presets are unknown here.
- No Reddit r/HiggsfieldAI threads surfaced in search; no independent user reports are included.
- Sora 2 is named by one reviewer as available on Higgsfield, but no Sora model appears in the live catalog on 25 Nov 2026 — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it)

## What plans exist, monthly prices, credits per plan, and limits such as concurrent generations?

### Takeaway
The user's account is confirmed on Plus with 969.52 credits. Live config shows Plus at 1,000 credits/month with 6 parallel videos and 8 parallel images, and Ultra at 3,000 credits/month with 8 and 8; list prices are $49 and $129 per month, with heavy annual and Black Friday discounts on screen today. Third-party sites disagree widely on tier names and prices, so only the live figures and Higgsfield's own blog should be trusted.

### Cited Findings

**The user's account [LIVE, 2026-11-25]**
- Balance 969.52 credits; subscription plan type "plus"; individual workspace; auto-refill disabled — [Higgsfield account via connector](https://higgsfield.ai/pricing)

**Plus [LIVE]**
- 1,000 credits/month ("credits/mo."). Marketing equivalence on the card: "= 600 Nano Banana Pro generations", "~200 Kling 3.0 videos", tooltip "~4800 images or ~200 videos or ~60 character generations" — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Parallel generations: up to 6 videos and 8 images at once — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Includes: all Seedance models (Seedance 2.0 and 2.0 Fast "full access"), "all models & features" including premium models, early access to new features, discounted credit top-ups — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Supercomputer: 2 GB storage, Efficient and Smart supercomputer access, up to 2 scheduled jobs — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Price: list $49/month; annual billing shown at $25/month (displayed as 50% off, saving $288/year). The config returns a $0 monthly price and no monthly checkout link for Plus, i.e. only the annual Plus offer is being sold through this channel today — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Conflict inside the same config: the headline says 1,000 credits/month but a "billingPeriods" block says 1,200 credits per month for Plus. Krea's article also lists Plus at 1,200. Higgsfield's blog says 1,000 for $49. The user's balance (969.52) is consistent with a 1,000 allowance — [Higgsfield plan config via connector](https://higgsfield.ai/pricing); [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-pricing-explained); [Krea blog](https://www.krea.ai/blog/higgsfield-pricing-explained-2026-unlimited-credits-and-real-monthly-costs)

**Ultra [LIVE]**
- 3,000 credits/month; card equivalence "= 1,500 Nano Banana Pro generations", "~500 Kling 3.0 videos" — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Parallel generations: up to 8 videos and 8 images — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Price: list $129/month; shown today at $75/month monthly (42% off) and $45/month on annual billing (65% off, saving $1,008/year). 18-month and 2-year terms also exist — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- Supercomputer: 5 GB storage, up to 10 scheduled jobs; credit top-ups badged "70% cheaper" — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)

**Other tiers**
- [SNIPPET] Higgsfield's own blog (October 2026) lists three individual paid tiers: Starter $15/month with 200 credits, Plus $49/month with 1,000 credits, Ultra $129/month with 3,000 credits — [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-pricing-explained)
- [SNIPPET] Free plan: no monthly credit allowance, one generation at a time, no Unlimited models, no batch runs; Soul ID, Start & End Frame control and priority access to new models need a paid plan; output carries a visible watermark — [Higgsfield help center: free plan](https://higgsfield.ai/creator-hub/help-center/plans/what-does-the-free-plan-include); [Higgsfield help center: watermark](https://higgsfield.ai/creator-hub/help-center/credits-and-usage/watermark-and-how-to-remove)
- [LIVE] Team workspaces exist (team owner / team member roles, seats, team top-up and team auto-refill) — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [SNIPPET] Legal indemnification against third-party IP claims is on an Enterprise plan only — [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] Third-party sites give incompatible structures: $5/month for 70 credits (ImagineArt); Basic $9 / 120 credits, Pro $23, Max $59, team ~$65 per seat (affiliate guide); $19 / $47 / $99 (Creatify); "$9-$119/mo" (a reviewer). One notes prices vary by country. Treat all as outdated or regional — [ImagineArt](https://www.imagine.art/insights/higgsfield-ai-pricing); [InsideVerdict](https://intercom.help/insideverdict/en/articles/16922799-higgsfield-ai-pricing-2026-every-plan-credit-cost-30-off); [Creatify](https://creatify.ai/de/blog/higgsfield-pricing-(2026)-plans-and-what-you-ll-actually-pay)

**Credits: rules [mixed]**
- [SNIPPET] Subscription credits reset each billing cycle and do not roll over — [Higgsfield help center: how credits work](https://higgsfield.ai/creator-hub/help-center/credits-and-usage/how-credits-work)
- [LIVE] One-time top-up packs today: 500 credits $25.50, 1,000 credits $48.88, 2,000 credits $93.50, 4,000 credits $187 (40-45% off list); top-up credits expire after 90 days — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [LIVE] Auto-refill: triggers at a 100-credit threshold; options $10 = 181 credits, $20 = 363, $30 = 545, $50 = 909, $100 = 1,818 (about 18 credits per dollar); those credits also expire in 90 days — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [SNIPPET] After cancelling, purchased credits stay usable on the free plan until they expire, with a narrower model selection — [Higgsfield help center: top-up expiry](https://higgsfield.ai/creator-hub/help-center/credits/top-up-credits-expire)
- [SNIPPET] Higgsfield shows the exact credit cost of a generation before it runs, based on model, duration and resolution — [Higgsfield blog](https://higgsfield.ai/blog/higgsfield-pricing-explained)

**"Unlimited" offers**
- [SNIPPET] Unlimited models do not deduct credits for a set period, work only on higgsfield.ai (web), and run in the standard queue so speed varies at peak; switching to Credit Mode deducts credits and uses the priority queue — [Higgsfield help center: unlimited models](https://higgsfield.ai/creator-hub/help-center/credits-and-usage/what-are-unlimited-models-and-which-plans-include-them)
- [LIVE] Offer on screen 25 Nov 2026 ("Buy until: Nov 26", sale phase "black_friday_phase_2", up to 70% off). "365-day unlimited & free gens": Soul V2 and Soul Cinema free generations (3,000 on Plus monthly, 5,000 on Plus annual / Ultra monthly, 10,000 on Ultra annual); 365-day unlimited Seedream 5.0 Lite (2K/3K), Flux.2 Pro (1K), Seedream 4.5 (2K/4K), Nano Banana, Kling O1 Image and GPT Image. "7-day unlimited": Nano Banana 2 (1K/2K) on both plans; Kling 3.0 (720p / 5 s) on annual plans; Nano Banana Pro (1K/2K) on Ultra only ("no unlimited" on Plus). All are "available on web" — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [LIVE] These are purchase-time bundles, not standing plan rights. For this account the catalog reports unlimited status "available: false", so the user currently has no unlimited allowance to draw on — [Higgsfield model catalog via connector](https://higgsfield.ai/pricing)
- [SNIPPET] A reviewer's summary: unlimited access applies only to Soul V2, Cinema and select image models; premium video models stay credit-gated on every plan — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it)

### Inferences
- "Plus" is the middle tier (Starter < Plus < Ultra). The task brief's "Basic / Pro / Ultimate / Creator" names match older or third-party pricing pages, not the current line-up.
- At list price Plus works out to about 4.9 cents per credit; today's top-ups are about 4.7-5.1 cents per credit and auto-refill about 5.5 cents, so buying extra credits costs roughly the same per credit as the subscription.
- Because unlimited bundles are web-only and standard-queue, anything generated through an assistant/connector or API is paid in credits.
- Whether the user's Plus is monthly or annual, and whether their purchase included any unlimited/free-gen bundle that has since lapsed, is not visible; the account shows none active now.

### Gaps
- The public pricing page could not be opened, so the Starter tier and free-plan details are not confirmed against the live page, and regional price differences are unverified.
- Exact monthly (non-annual) Plus price today is unclear: list is $49 but the config shows no monthly Plus checkout.
- Whether the free plan has any daily free generations in November 2026 is unknown (help-center snippet says no monthly credit allowance).
- Queue priority differences between Plus and Ultra, and any per-day caps on "unlimited", were not found.

## Roughly how many credits do image generations, 5s/10s video generations (by model/quality), upscales and audio cost?

### Takeaway
Live quotes from the user's account on 25 Nov 2026: most images cost 1-4 credits (Soul and Soul Cinema about 0.12), cheap 5-second 720p video is about 7.5-9 credits (Kling 3.0, Kling 4.0 Flash, Wan), mid-range 1080p is about 19-38 credits (Kling 4.0), and premium Seedance 2.5 / Cinema Studio runs 35-160 credits per clip. With ~970 credits that is roughly 110 Kling 3.0 clips or only 6-12 top-tier 1080p clips.

### Cited Findings

All figures below are [LIVE] cost quotes for a single generation with default settings unless stated; no jobs were submitted — [Higgsfield cost estimator via connector, 2026-11-25](https://higgsfield.ai/pricing)

**Images (credits per image)**

| Model | Setting | Credits |
|---|---|---|
| Higgsfield Soul 2.0 | 2k | 0.12 exact (shown rounded as 1) |
| Soul Cinema | 2k | 0.12 exact (shown rounded as 1) |
| Nano Banana | default | 1 |
| Seedream 5.0 Lite | default | 1 |
| Nano Banana 2 | 2k | 2 |
| Nano Banana Pro | 2k | 2 |
| Nano Banana Pro | 4k | 4 |
| GPT Image 2.6 | 2k, high | 2 |
| Cinema Studio Image 2.5 | 2k | 2 |
| FLUX 3 Image | 2k | 3 |

**Video (credits per clip)**

| Model | Setting | 5 s | 10 s |
|---|---|---|---|
| MiniMax Hailuo | 768, 6 s | 6 (6 s) | not quoted |
| Kling 3.0 Turbo | 720p | 7.5 | not quoted |
| Kling 4.0 Flash | 720p, image-to-video | 7.5 | not quoted |
| Wan 2.6 | 720p | 7.5 | not quoted |
| Wan 2.7 | 720p | 7.5 | not quoted |
| Wan 3.0 | 720p | 7.5 | not quoted |
| Kling 3.0 | std | 8.75 | 17.5 |
| Kling 3.0 | pro | 10 | 20 |
| Kling 4.0 | 720p, image-to-video | 12.5 | not quoted |
| Kling 4.0 | 1080p, image-to-video | 18.75 | 37.5 |
| Seedance 2.5 | 480p, text-to-video | 15 | not quoted |
| Seedance 2.0 | 720p | 22.5 | not quoted |
| Seedance 2.5 | 720p, text-to-video | 35 | not quoted |
| Cinema Studio 4.0 | 720p, text-to-video | 35 | 70 |
| Seedance 2.0 | 1080p | 60 | 120 |
| Cinema Studio Video 3.0 | 1080p, audio off | 65 | not quoted |
| Seedance 2.5 | 1080p, text-to-video | 80 | 160 |
| Cinema Studio 4.0 | 1080p, text-to-video | 80 | not quoted |
| Google Veo 3.1 Lite | 8 s | 12 (8 s) | n/a (max 8 s) |
| Google Veo 3.1 | "high", 8 s | 32 (8 s) | n/a (max 8 s) |

- Kling 3.0 and Kling 4.0 scale linearly with duration (10 s is exactly double 5 s); Seedance 2.0, Seedance 2.5 and Cinema Studio 4.0 also doubled from 5 s to 10 s — [Higgsfield cost estimator via connector](https://higgsfield.ai/pricing)
- FLUX 3 Video Edit is billed at 1 credit per second of processed clip (first 15 s at most) — [Higgsfield model catalog via connector](https://higgsfield.ai/flux-3)
- Higgsfield's own plan card equates 1,000 credits to "~200 Kling 3.0 videos" (5 credits each) and "600 Nano Banana Pro generations" (about 1.67 each), which is cheaper than the live quotes above (8.75 and 2). The card figures look like best-case or lower-setting numbers — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)

**Audio**

| Item | Setting | Credits |
|---|---|---|
| Seed Audio 1.0 speech | about 50 words of narration | 1.7 |
| ElevenLabs Music v2.5 | 60 s instrumental | 8.72 |

**Older / third-party figures (not re-verified)**
- [SNIPPET] Veo 3 with audio 58 credits per 8-second clip and Veo 3 Fast 22 credits, "as of May 2026" — [search summary of third-party pricing guides](https://www.imagine.art/blogs/higgsfield-ai-pricing)
- [SNIPPET] Speak 2.0 lip-sync: 14 credits for 5 s at 720p (April 2026 data) — [HeyGen pricing blog](https://www.heygen.com/blog/higgsfield-pricing)

### Inferences
- Budget illustration for ~970 credits (using live quotes): about 110 Kling 3.0 std 5 s clips, or about 51 Kling 4.0 1080p 5 s clips, or about 27 Cinema Studio 4.0 720p 5 s clips, or about 12 Seedance 2.5 / Cinema Studio 4.0 1080p 5 s clips, or 6 Seedance 2.5 1080p 10 s clips. Stills are effectively negligible by comparison (hundreds to thousands).
- For a long-form narrated video the cost driver is seconds of generated motion at premium quality; a stills-first approach with selective 5 s animation on Kling 3.0 / Kling 4.0 stretches the balance furthest. Narration through Seed Audio is cheap (about 1.7 credits per 50 words, so on the order of 35-50 credits per 1,000-1,500 words if pricing is linear — linearity not verified).
- Failed or unsatisfactory generations still consume credits in normal use, so real budgets should assume several attempts per kept clip.

### Gaps
- Upscale costs could not be quoted: the estimator rejects Topaz image and video ("does not support cost estimation"), and no public figure was found. The in-app price shown before running is the only reliable source.
- Genjutsu and Genjutsu Lite costs could not be quoted without uploading a real source video and reference image.
- Text to Speech V2 and Eleven v4 quotes failed for missing voice/variant/dialogue parameters; only Seed Audio was priced. Lip-sync (Sync Lipsync 3), Intone, voice cloning and Soul ID training costs were not obtained.
- Whether audio-on versus audio-off changes video price was not tested (defaults were used; Cinema Studio 3.0 was quoted with audio off). 4K video and Kling 3.0 "4k" mode were not quoted.
- Editing Room has its own price list (not retrieved).

## What are the commercial usage rights and content rules (e.g. for YouTube monetisation)?

### Takeaway
According to Higgsfield's help center (seen via search summaries only), Higgsfield claims no ownership of inputs or outputs and does not restrict commercial use, explicitly naming YouTube monetisation, with no separate commercial licence needed; paid-plan output is watermark-free. The user remains responsible for third-party IP and likeness, moderation is largely applied by each underlying model, and the terms were revised in 2026 with some reported controversy over training rights.

### Cited Findings
- [SNIPPET] Help center, citing Section 4.4 of the Terms of Use: Higgsfield does not claim ownership of inputs (prompts, reference images, audio) or outputs (generated images, videos, audio) and does not restrict use of outputs for commercial purposes — [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] The same FAQ lists commercial use as including advertising and paid campaigns, social content for brands, client work, products incorporating AI visuals, YouTube monetisation and brand marketing materials; no separate commercial licence is needed, rights follow from the Terms for all users — [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] Higgsfield takes a non-exclusive, worldwide, royalty-free licence to host and process content, described as limited to operating, providing and maintaining the service — [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] A third-party blog says the terms also grant a licence to use content to operate, improve and train AI models; the help center says deleting content stops training use going forward. These are in tension with the "limited to operating" description — [MindStudio blog](https://mindstudio.ai/blog/higgsfield-terms-of-service-backlash); [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] The user is responsible for ensuring content does not infringe third-party IP or likeness rights; legal indemnification is Enterprise-only — [Higgsfield help center: ownership](https://higgsfield.ai/creator-hub/help-center/account-and-privacy/who-owns-my-generations-and-can-i-use-them-commercially)
- [SNIPPET] Watermark depends on account type, not model or credits: free output is watermarked, paid plans produce watermark-free new generations; files made on the free plan keep their watermark after upgrading and must be regenerated. The help center cautions that publishing watermarked content commercially may not be appropriate — [Higgsfield help center: watermark](https://higgsfield.ai/creator-hub/help-center/credits-and-usage/watermark-and-how-to-remove)
- [SNIPPET] Terms version dates are inconsistent across results: the Terms page shows "Last updated: October 23, 2026", while a Higgsfield blog post announces an update effective August 27, 2026 — [Higgsfield Terms of Use](https://higgsfield.ai/terms); [Higgsfield blog: terms update](https://higgsfield.ai/blog/terms-of-use-privacy-policy-update)
- [SNIPPET] Moderation is applied largely at the model level, each integrated model filtering prompts, reference images and outputs; Higgsfield says it lacks access to providers' internal rules, so the reason for a flag is not always visible — [Higgsfield help center: flagged content](https://higgsfield.ai/creator-hub/help-center/troubleshooting/content-flagged-as-nsfw)
- [SNIPPET] Support can help rephrase prompts to reduce false positives, but bypassing or circumventing moderation is prohibited by the Terms — [Higgsfield help center: flagged content](https://higgsfield.ai/creator-hub/help-center/troubleshooting/content-flagged-as-nsfw)
- [SNIPPET] Community-published content gets additional automated moderation and user reporting; validly reported copyright content is removed within 48 hours — [Higgsfield Trust & Transparency](https://higgsfield.ai/trust)
- [SNIPPET] A market-research note reports racist and other policy-violating videos made on the platform have surfaced, flagged as a brand and regulatory risk — [Sacra](https://sacra.com/chat/h/78077664-0525-4adb-8d9a-234f6f551e38/)

### Inferences
- On the Plus plan, new generations should be watermark-free and usable in monetised YouTube videos as far as Higgsfield's terms go. That is separate from YouTube's own rules (disclosure of realistic altered/synthetic content, and its policies on repetitive or mass-produced content), which this research did not cover.
- Because moderation follows the underlying model, a prompt refused on one model (e.g. an OpenAI or Google model) may pass on another; depictions of religious figures are not known to be specifically restricted, but nothing found addresses them either way.
- Ownership "not claimed by Higgsfield" is not the same as guaranteed copyright protection for AI output, which depends on the creator's jurisdiction.

### Gaps
- The Terms of Use text itself was not read; every statement about Section 4.4, the licence scope and training use is second-hand. The current effective date (27 Aug vs 23 Oct 2026) is unresolved.
- No list of prohibited content categories was retrieved, and nothing specific to religious figures, deities or real historical persons was found.
- Third-party model terms (Google, OpenAI, Kling, Bytedance, ElevenLabs) that may layer on top of Higgsfield's were not examined.
- Whether privately generated content is used for training by default, and how to opt out, is not confirmed.

## What notable features were added in 2026?

### Takeaway
2026 saw Higgsfield expand from a model aggregator with camera presets into a suite: AI Influencer Studio (January), Cinema Studio 2.0 (February) through 4.0 (August-October), Genjutsu and Genjutsu Lite (October), 3D Jutsu, Intone, Marketing Studio V2 / Ad Multiplier, plus rapid adoption of new third-party models (Seedance 2.5, Kling 4.0, FLUX 3, Gemini Omni Flash). Exact dates are partly inferred from promotion windows.

### Cited Findings
- [SNIPPET] January 2026: AI Influencer Studio launched; a funding round valuing the company at a reported $1.3 billion — [Quasa](https://quasa.io/media/higgsfield-s-ai-influencer-studio-crafting-digital-personas-from-humans-to-anthropomorphic-iguanas-in-seconds); [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it)
- [SNIPPET] Late February 2026: Cinema Studio 2.0 with a Director Panel — [TechNode / PR Newswire Asia](https://technode.global/prnasia/higgsfield-advances-its-creator-first-platform-with-cinema-studio-2-0/)
- [SNIPPET] Cinema Studio 3.5 is discussed by reviewers by about September 2026 — [Creatify review](https://creatify.ai/blog/higgsfield-ai-review-%282026%29-is-it-worth-it)
- [SNIPPET] Cinema Studio 4.0: a third-party review cites a changelog entry dated 12 August 2026 listing 30-second generations; a press release syndicated in late October 2026 describes the Director's Panel; another review claims native 4K and one-minute generations — [Higgsfield changelog](https://higgsfield.ai/creator-hub/changelog); [Webull / press release](https://www.webull.com/news/15825991486301184)
- [LIVE] The live Cinema Studio 4.0 model accepts 480p-1080p only (no 4K option in the catalog on 25 Nov 2026), which conflicts with the "native 4K" review claim — [Higgsfield model catalog via connector](https://higgsfield.ai/)
- [LIVE] Promotion windows in the plan config date several launches: Seedance 4K free generations 3-7 Aug 2026; Seedance 2.5 presale 5-7 Aug, unlimited window 7-14 Aug, sale 10-12 Aug, 1080p promos 14-19 Aug; "kling_4_release" 21-29 Oct 2026; "genjutsu_lite_release" 22 Oct - 1 Nov 2026; Black Friday phase 2 sale 25-26 Nov 2026 — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [SNIPPET] Seedance 2.0 and 2.0 Fast "full access" carries a "Sep 10" tooltip on the Ultra card — [Higgsfield plan config via connector](https://higgsfield.ai/pricing)
- [SNIPPET] 7 October 2026: Semafor reports an AI influencer tool launch/revamp; an October report describes parametric control and inserting your own characters into existing videos — [Semafor](https://www.semafor.com/article/10/07/2026/creative-tech-startup-higgsfield-launches-ai-influencer-tool); [foro3d](https://foro3d.com/en/2026/octubre/higgsfield-actualiza-su-estudio-de-influencers-sinteticos-con-control.html)
- [SNIPPET] Genjutsu (motion transfer and object swap) and 3D Jutsu (3D workspace, Blender plugin) have Higgsfield blog and product pages; changelog entries also name Shorts, Short Drama Studio, Higgsfield Intone and Gemini Omni Flash 1.2 — [Higgsfield blog: Genjutsu](https://higgsfield.ai/blog/higgsfield-genjutsu); [Higgsfield blog: 3D Jutsu](https://higgsfield.ai/blog/higgsfield-3d-jutsu); [Higgsfield changelog](https://higgsfield.ai/creator-hub/changelog)
- [SNIPPET] 3 October 2026: Academy beginner course with 5 free generations for every user — [Higgsfield changelog](https://higgsfield.ai/creator-hub/changelog)
- [SNIPPET] Terms of Use and Privacy Policy update effective 27 August 2026 — [Higgsfield blog: terms update](https://higgsfield.ai/blog/terms-of-use-privacy-policy-update)
- [SNIPPET] 23 October 2026: $1B annualised revenue run rate; 11 November 2026: Series B extension — [Higgsfield news](https://higgsfield.ai/blog/news)
- [LIVE] Models present now that post-date early 2026 line-ups: Kling 4.0 and 4.0 Flash, Seedance 2.5, FLUX 3 image/video, Wan 3.0 and 3.0 Prime, GPT Image 2.5 / 2.6, Nano Banana 2.1, Seedream 5.0 Pro / Flash, Gemini Omni Flash 1.1 / 1.2, MAGI-2, MiniMax H3, Grok Video 1.5, Ideogram 4.6, Kling Image 4.0 — [Higgsfield model catalog via connector](https://higgsfield.ai/)

### Inferences
- Kling 4.0 and Genjutsu Lite arrived in the last five weeks (late October 2026), so tutorials older than that will not mention them and may quote different credit prices.
- Higgsfield runs near-continuous time-boxed promotions (free generations, unlimited windows, sales) around each model launch; any "unlimited" claim in a tutorial is likely expired.
- Launch dates for Editing Room, Marketing Studio V2, Ad Multiplier, Property Studio, website builder and Supercomputer could not be established; they are present in November 2026 but undated.

### Gaps
- The official changelog was not readable; the timeline is assembled from snippets and promo-window metadata and is incomplete.
- Launch dates for Genjutsu (full), 3D Jutsu and Intone are not pinned down.
- Conflicting accounts of Cinema Studio 4.0's maximum duration (30 s per changelog snippet vs one minute per a review) and resolution (1080p in live catalog vs "native 4K") are unresolved.
