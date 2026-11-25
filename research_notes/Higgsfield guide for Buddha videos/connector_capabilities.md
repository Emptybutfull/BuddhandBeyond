# Higgsfield MCP connector: real capabilities as exposed to an AI agent (hands-on, read-only exploration, 2026-11-25)

Method note: every "source" below is a live read-only call to the connector (`mcp__Higgsfield__*`), written as a pseudo-URL `mcp://Higgsfield/<tool>?<args>`. Nothing was generated, submitted, bought or changed. All credit figures are quotes returned by the estimate tools on this account (plan: Plus) on 2026-11-25; Higgsfield runs frequent sales, so prices can move. "cr" = credits.

## What models exist (image, video, audio, 3D), with parameters, aspect ratios, durations and media roles?

### Takeaway
The connector exposes 64 video-type entries, 55 image-type entries, 12 audio models and 16 3D models. For cinematic Buddha footage the relevant video models are Seedance 2.5 / Cinema Studio 4.0 (up to 30 s, up to 4K, references, draft mode, edit and extension), Kling 3.0/4.0 (cheap, start+end frames), Veo 3.1, Wan 3.0, MiniMax H3 and MAGI-2; for stills, Nano Banana Pro / 2.1, GPT Image 2.6, Seedream 5.0 Pro, Soul Cinema and Cinema Studio Image.

### Cited Findings

**Catalogue size**
- `models_explore list type=video` returned 64 items, `has_more:false`; `type=image` returned 55 items, `has_more:false` — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100); [models image](mcp://Higgsfield/models_explore?action=list&type=image&limit=100)
- Audio list returned 12 models, 3D list 16 models, both `has_more:false` — [models audio](mcp://Higgsfield/models_explore?action=list&type=audio&limit=100); [models 3d](mcp://Higgsfield/models_explore?action=list&type=3d&limit=100)
- Every list reported `unlim: {available:false}` for this account, i.e. no free "unlimited generations" allowance is currently spendable — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)

**Video generation models (id | name | durations | resolutions | aspect ratios | media roles | notable params)** — all from [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)
- `seedance_2_5` | Seedance 2.5 (Bytedance) | 4–30 s (default 5) | 480p/720p/1080p/4k (default 720p) | auto, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | start_image, end_image, image_references (max 30 incl. start/end), video_references (max 10), audio_references (max 10) | `mode` t2v / omni_reference / video_edit / video_extension; `generate_audio` (default true); `bitrate_mode` standard/high; `extension_mode` backward/forward; `draft` ("Generate a 480p draft that can be finalized within seven days"); `draft_job_id` (finalise a draft at chosen resolution, billed for the draft's full duration). start/end images work only in mode `omni_reference`. `supports_unlim:true`.
- `seedance_2_0` | Seedance 2.0 | 4–15 s | 480p/720p/1080p/4k | auto,16:9,9:16,4:3,3:4,1:1,21:9 | start_image, end_image, image_references (max 9 incl. start/end), video_references (2–15 s each, max 3), audio_references (max 3, need an image or video ref) | `mode` only `std` for this account ("requires a Plus plan or higher"); `genre` auto/action/horror/comedy/noir/drama/epic; `generate_audio`; `bitrate_mode`. `supports_unlim:true`.
- `cinematic_studio_video_4_0` | Cinema Studio 4.0 (Higgsfield) | 4–30 s | 480p/720p/1080p | auto,21:9,16:9,4:3,1:1,3:4,9:16 | same roles as Seedance 2.5 | same four modes plus creative-control ids: `era_id`, `camera_model_id`, `camera_lens_id`, `camera_aperture_id`, `pacing_id`, `genre_id`, `light` (preset/custom/user) + `light_id` / `light_custom` rig, `color_palette`. Described as "Cinema-grade video generation with automatic prompt direction and camera, lighting, pacing, genre, era, and color controls".
- `cinematic_studio_video_3_5` | Cinematic Studio Video 3.5 | min 4 s, default 15 | 480p/720p/1080p | 7 ratios | start/end/image/video/audio refs (max 15 media total) | `camera_style` classic_static / silent_machine / one_take / epic_scale / intimate_observer / impossible_camera / documentary_snap / raw_chaos / dreamy_flow; `light_scheme` soft_cross / contre_jour / overhead_fall / window / practicals / silhouette; `color_grading` naturalistic_clean / bleached_warm / hyper_neon / teal_orange_epic / sodium_decay / cold_steel / bleach_bypass / classic_bw; `multi_shots` + `multi_prompt` (max 6 shots); `style_prompt` (≤2000 chars); `prompt_language` en/zh (default zh); `generate_audio` default false.
- `cinematic_studio_3_0` | Cinema Studio Video 3.0 ("Most advanced cinema-grade model") | 4–15 s | 480p/720p/1080p/4k | 7 ratios | image, start_image, end_image | `genre`, `generate_audio` (default false).
- `cinematic_studio_video_v2` | Cinema Studio Video | 3–12 s | — | 1:1,4:3,3:4,16:9,9:16 | image, start_image, end_image | `mode` std/pro, `sound` on/off, `speedramp` auto/custom/linear/slowmo/speedup/impact, `multi_shots`, `genre`, `cfg_scale`.
- `cinematic_studio_video` | Cinema Studio Video | 5 or 10 s | — | 1:1,4:3,3:4,16:9,9:16 | image/start/end | `slow_motion`, `sound`.
- `kling4_0` | Kling 4.0 | 3–30 s (default 10) | 720p/1080p/4k (default 1080p) | 21:9,16:9,9:16,1:1,auto | start_image, end_image, image_references (max 10; "ordered middle frames in image-to-video"), video_references (max 5) | `mode` text-to-video / image-to-video / reference-to-video / video-edit; `dynamic_range` sdr/hdr; `kling_element_ids` (up to 7).
- `kling_4_0_flash` | Kling 4.0 Flash | 3–20 s | 720p only | same ratios | start_image, image_references (10), video_references (5) | same four modes.
- `kling3_0` | Kling v3.0 ("Multi-shot, audio sync, motion transfer") | 3–15 s | via `mode` std/pro/4k | 16:9,9:16,1:1 | start_image, end_image | `sound` on/off ("Use 'off' for silent video and lower credits").
- `kling3_0_turbo` | Kling 3.0 Turbo | 3–15 s | 720p/1080p | 16:9,9:16,1:1 | start_image only.
- `kling_o3_flf` | Kling 3.0 Omni (Frames) | 3–15 s | std/pro/4k | 16:9,9:16,1:1 | start_image, end_image | `multi_shots` + `multi_prompt`, `sound`.
- `kling_o3_image_reference` | Kling 3.0 Omni | 3–15 s | std/pro/4k | 16:9,9:16,1:1 | image_references (max 7) | `multi_shots`, `sound`.
- `kling2_6` | Kling 2.6 | 5 or 10 s | — | 16:9,9:16,1:1 | start_image | `sound` bool.
- `veo3_1` | Google Veo 3.1 ("Ultra-realistic, top-tier cinematic quality") | 4/6/8 s | `quality` basic/high/ultra | 16:9, 9:16 | start_image | `variant` veo-3-1-preview (best) / veo-3-1-fast (default).
- `veo3_1_lite` | Veo 3.1 Lite | 4/6/8 s | — | 16:9,9:16,auto | start_image, end_image | `generate_audio` default false.
- `wan3_0` / `wan3_0_prime` | Wan 3.0 / Prime | 2–30 s, or -1 for "smart duration" | 480p/720p/1080p | auto,16:9,9:16,1:1,4:3,3:4 | start_image, end_image, image_references (10), video_references (5), audio_references (5) | `generate_audio`, `enable_thinking`.
- `wan2_7` | Wan 2.7 | 2–15 s | 720p/1080p | 5 ratios | start_image, end_image, audio_references. `wan2_6` | 5/10/15 s | 720p/1080p | image (1), video (3), audio (1) refs.
- `minimax_h3` | MiniMax H3 | 4–15 s | 2K only | auto,21:9,16:9,4:3,1:1,3:4,9:16 | start/end, image refs (9), video refs (3), audio refs (3) | `batch_size` 1–4. `minimax_h3_max` | 5–15 s | 480p/768p | refs up to 12 each. `minimax_hailuo` | 6 or 10 s | 512/768/1080 | start/end.
- `magi_2` | MAGI-2 (Sand AI) | 4–30 s | 1080p only | 6 ratios | start/end, image refs (10), video refs (5), audio refs (5) | native audio, `seed`.
- `gemini_omni_flash_1_2` | Gemini Omni Flash 1.2 | 3–15 s | 360p/720p/1080p/4k | 16:9, 9:16 | start/end, image refs (7), video refs (3) | `mode` text-to-video / image-to-video / reference-to-video / edit / extend; native audio. `gemini_omni_flash_1_1` similar, 3–10 s, no extend.
- `flux_3_video` | FLUX 3 Video | 5–20 s | 720p/1080p/2k/4k | 8 ratios incl. 2:1 | start/end, image refs (10 ordered intermediate frames), video ref (continuation) | `generate_audio`.
- `grok_video_v15` (2–15 s, 480p–1080p, start image + 7 image refs + audio ref), `grok_video_v15_lite` (1–15 s), `grok_video` (1–15 s), `happy_horse_video` (3–15 s, 720p/1080p, start image).
- `intone` | Higgsfield Intone | talking-head video: one or two characters speak 1–6 voice recordings (2–30 s total), 4–30 s output | 480p/720p/1080p | roles character_images (max 2), location_image, audio_references.

**Video editing / utility models listed under type=video** — all from [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)
- Editing Room models: `videoshop_edit` (prompt edit of a 0.5–30 s clip, optional selection box), `videoshop_relight` (placed lights, words or a reference image; `nudge` brighter/darker/warmer/cooler/stronger/subtler), `videoshop_camera_move` (`mode` move/angles, `move_id`, `angle`, `render` reference/edit), `videoshop_genjutsu` (swap an object using 1–30 images). All 480p/720p/1080p.
- Genjutsu: `hf_mult_motion_control` (motion transfer from one video to subjects in 1–49 images), `hf_mult_replace_object` (replace objects in a 4–30 s video using 1–30 images), plus "Lite" variants `hf_mult_motion_control_flash` (Wan 3.0, ≤15 s) and `hf_mult_replace_object_flash` (Kling 4.0).
- `kling3_0_motion_control` (one image + one motion video, std/pro), `kling_video_edit` (Kling 3.0 Omni Edit: source video + up to 4 reference images), `flux_3_video_edit` ("Uses the first 15 seconds at most; costs 1 credit per second of the processed clip").
- Upscale/enhance: `topaz_video` (1080p/2160p, enhancement + frame-interpolation options), `bytedance_video_upscale` (1080p/2k/4k, fps 24–60, presets common/aigc/short_series/ugc/old_film, standard/pro), `video_upscale`, `video_deflicker`, `fps_boost` (bytedance or topaz, 16–120 fps), `topaz_hyperion_2_5` (SDR→HDR; h265/prores/exr).
- Other: `reframe` (change aspect ratio), `draw_to_video` (sketch + driving video), `video_background_remover`, `sam_3_video` (Remove Background), `depth_anything_video` (depth maps), `sync_so` (Sync Lipsync 3: video + audio), `dubbing` (18 target languages incl. eng, hin, jpn, kor, cmn), `voice_change`.
- Product/vertical-specific (not general models): `marketing_studio_video`, `marketing_studio_v2_video` (types 2d_motion, hypermotion, mixed_media, saas_motion, ugc, video_mode, ugc_v2, product_link, ad_reference, app_video), `marketing_studio_v2_reference2video`, `ad_multiplier`, `ad_multiplier_v2`, `realtor_studio_video`, `higgsfield_preset` (legacy).

**Image models** — all from [models image](mcp://Higgsfield/models_explore?action=list&type=image&limit=100)
- `nano_banana_pro` (Google; "Ultimate quality, text and diagrams"; 1k/2k/4k, default 2k; up to 14 reference images; ratios 1:1,3:2,2:3,4:3,3:4,4:5,5:4,9:16,16:9,21:9; supports_unlim).
- `nano_banana_2_1` (1k/2k/4k; up to 14 image refs + mask + 1 video reference; extra ratios 4:1,1:4,8:1,1:8; `thinking_level`, `enable_web_search`, `seed`), `nano_banana_2` (1k/2k/4k, inpaint mask), `nano_banana_2_lite` (1k), `nano_banana` (budget, 8 refs), `nano_banana_2_shots` (expand one image into multiple shots).
- `gpt_image_2_6` (OpenAI; the connector's stated default image model; 1k/2k/4k; quality auto/low/medium/high/xhigh/max; 16 refs; `background` transparent; `output_format` png/jpeg/webp/gif/svg; `batch_size` 1–4), `gpt_image_2_6_flare`, `gpt_image_2_5`, `gpt_image_2`, `openai_hazel` ("Powerful editing, best text rendering").
- `seedream_v5_pro` (1k/1.5k/2k; 10 refs; `remove_bg`, `is_inpaint`), `seedream_5_0_flash`, `seedream_v5_lite`, `seedream_v4_5` ("basic renders up to 4K; high up to ~6K"; 14 refs).
- Higgsfield's own: `soul_2`/`soul_v2` ("Realistic UGC, fashion editorial and character generation"; 1.5k/2k; `style_id`, `soul_id`), `soul_cinematic` ("Cinema-grade stills and concept art"; up to 21:9), `soul_cinema_studio`, `soul_location` ("Environment and location generation"; ratios up to 21:9 and 9:21; no params), `soul_cast` ("Consistent cinematic character identity"; 16:9; `budget` 10–500), `cinematic_studio_2_5` ("Cinematic stills, up to 4K"), `cinematic_studio_image` (requires `camera_model_id`, `camera_lens_id`, `camera_focal_length_id`; optional aperture; 4 refs), `image_auto` (auto-selects a model).
- Others: `flux_3_image` (768sq–4k, 10 refs, 15 ratios), `flux_2` (pro/flex/max), `flux_kontext`, `flux_2_pro_outpaint`, `kling_image_4_0` (2k/4k/8k), `kling_omni_image`, `ideogram_4_6` (2k/4k, masked edit, transparent background), `ideogram_4_5`, `ideogram_4_6_precise_edit`, `ideogram_vector` (SVG), `recraft_v4_1`, `recraft_v4_styles`, `grok_image`, `grok_image_2_0`, `minimax_h3_image` (1k–4k, 16 refs), `z_image`.
- Utilities: `bytedance_image_upscale` (2k/4k), `topaz_image`, `topaz_image_generative`, `outpaint`, `image_background_remover`, `image_decompose` (split into layers), `image_command` (e.g. /polish), `3d_jutsu_angles`.

**3D models** — from [models 3d](mcp://Higgsfield/models_explore?action=list&type=3d&limit=100)
- Image-to-3D GLB: `sam_3_3d` (Meta), `image_to_3d`/`meshy_image_to_3d`, `multi_image_to_3d` (1–4 views), `meshy_v7_image_to_3d`, `tripo_h3_1_image_to_3d`, `tripo_h3_1_multiview_to_3d`, `tripo_p2_image_to_3d`, `hunyuan3d_v3_image_to_3d`; text-to-3D: `tripo_3d`, `meshy_v6_text_to_3d`, `hunyuan3d_v3_1_text_to_3d`; rigging `3d_rigging`/`meshy_rigging` (678-action animation library); `sam_3_3d_body` (human body pose).

### Inferences
- For a Buddha-video workflow, the image-to-video path that supports both first AND last frame (useful for controlled slow moves) is available on Seedance 2.0/2.5 (2.5 only in `omni_reference` mode), Kling 3.0, Kling 4.0, Kling 3.0 Omni Frames, Veo 3.1 Lite, Wan 2.7/3.0, MiniMax, MAGI-2, FLUX 3 Video and Cinema Studio 3.0.
- Only Seedance 2.5, Cinema Studio 4.0, Kling 4.0, Wan 3.0, MAGI-2 (and Ad Multiplier) reach 30 s in a single generation; most others cap at 8–15 s.
- 9:16 and 16:9 are supported by every general video model; 21:9 cinematic widescreen is available on Seedance, Cinema Studio 3.x/4.0, Kling 4.0, MiniMax H3, MAGI-2 and FLUX 3.

### Gaps
- The workflows reference an image model `seedream_5_5` that does not appear in the `type=image` list returned to this session; whether it is callable was not tested (calling generation tools was out of scope).
- Cinema Studio 4.0's creative-control ids (era, camera body, lens, aperture, pacing, genre, palette) are referenced only as ids; no read-only catalogue tool listing their names was found in this pass.
- Parameter descriptions were truncated to ~130 characters in my extraction for some long fields; exact wording of a few options may be incomplete.

## What does each main model cost in credits at common settings?

### Takeaway
Cheap, good-enough motion costs about 1.25–3.75 cr/s (Kling 3.0/4.0), while Higgsfield's flagship Seedance 2.5 / Cinema Studio 4.0 costs 7 cr/s at 720p and 16 cr/s at 1080p; a Seedance 2.5 draft (480p) is 3 cr/s. Stills cost roughly 1–4 cr each (4K Nano Banana Pro = 4 cr). The account currently holds 969.52 credits on the Plus plan.

### Cited Findings

**Account** 
- Balance 969.52 credits; `subscription_plan_type: plus` — [balance](mcp://Higgsfield/balance)
- Top-up packs quoted: 500 cr $25.50, 1,000 cr $48.88, 2,000 cr $93.50, 4,000 cr $187 (≈20–21 credits per dollar, i.e. roughly $0.047–0.051 per credit); "One-time top-up credits expire after 90 days"; auto-refill rate 18 credits per dollar — [show_plans_and_credits](mcp://Higgsfield/show_plans_and_credits?intent=general)
- Plus plan card: 1,000 credits/month; "Parallel generations: up to 6 Videos, 8 Images"; Ultra: 3,000 credits/month, up to 8 videos in parallel — [show_plans_and_credits](mcp://Higgsfield/show_plans_and_credits?intent=general)

**Video cost table (credits per generation)** — each row is an `estimate_video_cost` quote — [estimate_video_cost](mcp://Higgsfield/estimate_video_cost)

| Model | Setting | Credits | ≈ cr/s |
|---|---|---|---|
| seedance_2_5 | 5 s 720p | 35 | 7 |
| seedance_2_5 | 10 s 480p | 30 | 3 |
| seedance_2_5 | 10 s 720p (audio on) | 70 | 7 |
| seedance_2_5 | 10 s 720p, generate_audio=false | 70 | 7 |
| seedance_2_5 | 10 s 720p, draft=true | 30 | 3 |
| seedance_2_5 | 10 s 1080p | 160 | 16 |
| seedance_2_5 | 10 s 1080p, bitrate high | 160 | 16 |
| seedance_2_5 | 10 s 4k | 280 | 28 |
| seedance_2_5 | 30 s 1080p | 480 | 16 |
| seedance_2_0 | 5 s 720p | 22.5 | 4.5 |
| seedance_2_0 | 10 s 720p (audio on or off) | 45 | 4.5 |
| seedance_2_0 | 10 s 1080p | 120 | 12 |
| cinematic_studio_video_4_0 | 5 s 720p | 35 | 7 |
| cinematic_studio_video_4_0 | 10 s 1080p | 160 | 16 |
| cinematic_studio_3_0 | 10 s 1080p (audio default off) | 130 | 13 |
| cinematic_studio_video_3_5 | 10 s 1080p | 130 | 13 |
| cinematic_studio_video_v2 | 10 s std, sound off | 10 | 1 |
| kling3_0 | 5 s std, sound off / on | 6.25 / 8.75 | 1.25 / 1.75 |
| kling3_0 | 10 s std, sound off / on | 12.5 / 17.5 | 1.25 / 1.75 |
| kling3_0 | 5 s pro, sound off | 7.5 | 1.5 |
| kling3_0 | 10 s pro, sound off / on | 15 / 20 | 1.5 / 2 |
| kling3_0 | 10 s 4k, sound off | 60 | 6 |
| kling4_0 | 5 s 1080p | 18.75 | 3.75 |
| kling4_0 | 10 s 720p / 1080p / 4k | 25 / 37.5 / 90 | 2.5 / 3.75 / 9 |
| kling_4_0_flash | 5 s / 10 s (720p) | 7.5 / 15 | 1.5 |
| kling3_0_turbo | 5 s 720p / 10 s 1080p | 7.5 / 20 | 1.5 / 2 |
| kling2_6 | 5 s silent / 10 s with sound | 5 / 20 | 1 / 2 |
| kling_o3_flf (first+last frame) | 10 s pro, sound off | 12.5 | 1.25 |
| kling_o3_image_reference | 10 s pro, sound off | 15 | 1.5 |
| veo3_1 fast, basic | 4 s / 8 s | 16 / 32 | 4 |
| veo3_1 preview, high | 8 s | 80 | 10 |
| veo3_1 preview, ultra | 8 s | 120 | 15 |
| veo3_1_lite | 8 s (audio on or off) | 12 | 1.5 |
| wan3_0 | 5 s 720p / 10 s 1080p | 7.5 / 30 | 1.5 / 3 |
| wan3_0_prime | 10 s 1080p | 55 | 5.5 |
| wan2_7 | 10 s 1080p | 25 | 2.5 |
| wan2_6 | 10 s 1080p | 20 | 2 |
| minimax_hailuo | 6 s / 10 s at 768 | 6 / 11 | ~1 |
| minimax_h3 | 10 s 2K | 20 | 2 |
| minimax_h3_max | 10 s 768p | 25 | 2.5 |
| magi_2 | 10 s 1080p | 25 | 2.5 |
| gemini_omni_flash_1_2 | 8 s 1080p text-to-video | 26 | 3.25 |
| flux_3_video | 10 s 1080p | 80 | 8 |
| grok_video_v15 | 10 s 720p | 45 | 4.5 |
| grok_video_v15_lite | 10 s 720p | 10 | 1 |
| grok_video | 10 s | 15 | 1.5 |
| happy_horse_video | 10 s 1080p | 45 | 4.5 |

- Turning audio off did not lower the quote on Seedance 2.5, Seedance 2.0 or Veo 3.1 Lite; it did lower it on Kling 3.0 (std 1.75 → 1.25 cr/s) — [estimate_video_cost](mcp://Higgsfield/estimate_video_cost)
- Seedance 2.5 draft mode quoted at exactly the 480p price (30 cr per 10 s); the model description says the draft "can be finalized within seven days" and that the final "is billed for" the draft's full duration at the selected resolution — [estimate_video_cost](mcp://Higgsfield/estimate_video_cost?model=seedance_2_5&draft=true); [models_explore get seedance_2_5](mcp://Higgsfield/models_explore?action=get&model_id=seedance_2_5)
- Kling 4.0 `video-edit` (used by the Enhance Video workflow) is documented by the workflow as "1080p 60 credits per 15 s (4/s); 720p 41.25 per 15 s (2.75/s)" (preflight dated 2026-11-15) — [workflow higgsfield-enhance-video](mcp://Higgsfield/get_workflow_instructions?workflow=higgsfield-enhance-video)

**Image cost table (credits per image)** — [estimate_image_cost](mcp://Higgsfield/estimate_image_cost)

| Model | Setting | Credits |
|---|---|---|
| nano_banana_pro | 1k / 2k / 4k | 2 / 2 / 4 |
| nano_banana_2 | 1k / 4k | 1.5 / 3 |
| nano_banana_2_1 | 2k / 4k | 2 / 3 |
| nano_banana | default | 1 |
| gpt_image_2_6 | 1k low | 0.75 |
| gpt_image_2_6 | 2k medium / 2k high | 1.75 / 2 |
| gpt_image_2_6 | 4k high / 4k max | 3.25 / 12 |
| gpt_image_2 | 2k high | 7 |
| seedream_v5_pro | 2k | 2.5 |
| seedream_5_0_flash | 2k | 0.5 |
| seedream_v4_5 | basic / high | 1 / 1 |
| soul_2, soul_cinematic, soul_location | 2k / default | 1 (quote shows `credits:1`, `credits_exact:0.12`) |
| cinematic_studio_2_5 | 2k / 4k | 2 / 4 |
| flux_3_image | 2k | 3 |
| flux_2 pro | 2k | 1.5 |
| flux_kontext | default | 1.5 |
| z_image | default | 0.15 |
| kling_image_4_0 | 4k | 3 |
| ideogram_4_6 | 2k medium | 2 |
| grok_image_2_0 | 2k | 2.5 |
| minimax_h3_image | 4k | 4 |
| recraft_v4_1 | 2k | 8 |
| bytedance_image_upscale | to 4k | 2 |

**Upscale / utility costs**
- `bytedance_video_upscale` quoted 8 cr for `resolution:4k, duration:10`; `video_upscale` quoted 2 cr for `duration:10` — [estimate_video_cost](mcp://Higgsfield/estimate_video_cost?model=bytedance_video_upscale)
- `topaz_video` and `topaz_image` cannot be quoted: "job_type 'topaz_video' does not support alpha v2 cost estimation" — [estimate_video_cost topaz](mcp://Higgsfield/estimate_video_cost?model=topaz_video)
- The `upscale_video` tool description says it "does not support cost preflight" and that for ByteDance "fps above 30 doubles the cost" — [upscale_video schema](mcp://Higgsfield/upscale_video)
- `upscale_image` (ByteDance only, 2k/4k) supports `get_cost=true` and is described as a "flat cost"; `reframe` and `outpaint_image` also accept `get_cost=true` — [upscale_image schema](mcp://Higgsfield/upscale_image); [reframe schema](mcp://Higgsfield/reframe)

### Inferences
- At 969.52 credits the account can afford, for example: ~138 s of Seedance 2.5 at 720p, or ~60 s at 1080p, or ~320 s as 480p drafts; versus ~775 s of Kling 3.0 std silent, ~258 s of Kling 4.0 1080p, or ~240 Nano Banana Pro 4K stills. (Arithmetic from the quotes above.)
- A cost-efficient pattern suggested by the price structure: generate stills (1–4 cr), animate with Kling 3.0/4.0 or Wan 3.0 (1.25–3.75 cr/s) for most shots, and reserve Seedance 2.5 / Cinema Studio 4.0 1080p (16 cr/s) for hero shots — or iterate in Seedance 2.5 draft mode (3 cr/s) and only finalise approved drafts.
- Since audio-off does not reduce Seedance/Veo Lite quotes, there is no saving from disabling native audio on those models; on Kling 3.0 silent is ~29% cheaper.
- At ~$0.05 per credit (top-up rate), 10 s of Seedance 2.5 1080p ≈ $8 and 10 s of Kling 3.0 std silent ≈ $0.63; a 4K Nano Banana Pro still ≈ $0.20.

### Gaps
- Whether finalising a Seedance 2.5 draft costs the full target-resolution price on top of the draft price (i.e. draft + final) or a difference was not quoted; the description only says the final is billed for the draft's full duration.
- The ByteDance video upscale quote (8 cr) was obtained without a real source video; whether it scales with real duration/fps is unverified. Topaz pricing is unknown from the connector.
- The Soul-family quotes show `credits: 1` but `credits_exact: 0.12`; which is actually charged is unclear.
- Quotes do not validate that a request is generatable (the tool says "A quote does not validate that the request is ready to generate"); image-to-video / reference modes were not separately quoted and may differ.
- Prices were captured during an active sale window (`sale_11_11`, phase `black_friday_phase_2`, 2026-11-25 to 2026-11-26 in the pricing payload); whether generation credit costs (as opposed to plan/top-up prices) change after it is unknown.

## What multi-step workflows does Higgsfield recommend (get_workflow_instructions / get_preset_instructions)?

### Takeaway
The connector ships 30 bundled workflows (SKILL.md-style recipes that orchestrate the generate tools plus a cloud sandbox) and ~80 slash-command recipes. The ones relevant to narrated spiritual content are `faceless-video` (full narrated video pipeline incl. a "Fairy Tale & Myth" storybook type), `character-sheet` (consistent character references), `narration`, `video-montage`, `video-sound-design`, `thumbnail-generation`, `higgsfield-enhance-video`, plus the `/editing-room`, `/genjutsu` and `/3d-jutsu` commands.

### Cited Findings

**Workflow catalogue (30 entries)** — all from [get_workflow_instructions (no arg)](mcp://Higgsfield/get_workflow_instructions)
- Listed workflows: ad-multiplier, ads-studio, angles-hf, autobadge, brand-asset-creation, character-sheet, color-grade, creator-dub, drama-ads, faceless-video, grade-hf, higgsfield-enhance-video, katana, layer-reveal-hf, lighting-hf, manga-engine, monsters, music-cards, narration, photo-to-3d-model, product-photoshoot, property-studio, reel-effects, short-drama, shorts-studio, thumbnail-generation, ugc-video, video-editing, video-montage, video-sound-design, website-builder-flow.
- `faceless-video` (v2.4): "Produce a finished multi-scene narrator-led channel video ... Locks a consistent non-photoreal style, reusable assets, one narrator voice, and burned subtitles. Five types: Explainer, History, Kids, Picture Story, and Fairy Tale & Myth." Explicitly "NOT for: planning or ideas, single clips, silent animation, image-to-video, footage edits, ads ... any video with a visible on-camera presenter".
- `narration` (v1.1): production-ready numbered takes fitted to fixed video windows, or "one continuous long-form story read in a locked voice", or a photo turned into an on-screen narrator; "never time-stretch".
- `video-montage`: "Assemble existing clips into a finished video, add or change a soundtrack, or burn/restyle speech captions."
- `video-sound-design` (v1.0): maps every visual event, picks "a matching sound effect from the Epidemic Sound library for each (generated sound as fallback)", masters to platform loudness ("YouTube/Instagram -14 LUFS, TikTok -12").
- `video-editing`: edit supplied footage or author motion graphics "with Higgsedit" (cuts, trims, soundtrack changes, animated text, shaders, overlays, title cards).
- `thumbnail-generation` (v1.3): "Cinematic top-tier YouTube / Instagram thumbnails and video covers" — 16 thumbnail frameworks, 4K routing ("nano_banana_pro render / gpt_image_2_6 3D logo / seedream tweaks").
- `grade-hf`: "Regrade the user's video with one of 34 colour grades, each a Seedance 2.5 video edit with a colour-only prompt." `lighting-hf`: "Relight the user's video with one of 62 lighting looks through Seedance 2.5 video edit." Both load only from their slash commands.
- `creator-dub` (v1.4): dub a creator's own video into other languages with lip sync, captions and translated titles; default 9 languages.
- `music-cards`: 20–120 s vertical cartoon with an original song about one named person (not relevant, but shows song generation exists).

**faceless-video details** — all from [workflow faceless-video](mcp://Higgsfield/get_workflow_instructions?workflow=faceless-video)
- Pipeline is Phases 0→9: Intake → Style anchor → Asset roster (characters, locations, props) → Script + block plan → Generate blocks → Voiceover (via `narration`) → Assemble clean master → Caption (via `video-montage`) → no automatic upscale → optional thumbnail → deliver.
- Models are locked: assets/style key → `seedream_5_5` at 1k; clips → `minimax_h3` at 2K; fixed-window narration → `text2speech_v2` with `variant:"elevenlabs"`; music bed → `sonilo_music`, "instrumental only".
- "Every clip is ONE 10s shot-group of FIVE hard-cut shots (~2s each) ... no shot longer than 2.5s: a frame that hangs 3–5s reads as a slideshow."
- Two output formats: "motion-clip montage (10s blocks of hard-cut shots) or narrated STILLS (one held image per spoken beat)".
- "Fairy Tale & Myth" type: "Cinematic Storybook ... lush hand-painted 2D-animation fairytale look, ANIMATED ON TWOS"; pacing "slower, atmospheric; 2–3 min default (12–18 blocks)"; VO tone "enchanting storyteller — hushed, warm, mysterious, unhurried, mythic (no jokes); MANDATORY mysterious-calm music bed".
- History type offers a long-form direction: "Documentary 10+ min, Watercolor Chronicle".
- Aspect choices are "16:9 (default) / 9:16 and NOTHING ELSE"; duration options in the intake are short (1 / 2 min).
- Upscale is optional: after delivery it may offer "a 4K Topaz upscale" via `upscale_video` provider topaz, resolution 2160p.
- It "Locks a consistent non-photoreal style" — photoreal looks are outside this workflow.

**character-sheet (v2.0)** — all from [workflow character-sheet](mcp://Higgsfield/get_workflow_instructions?workflow=character-sheet)
- Makes reusable character references "the way Drama Studio makes its cast": a casting read, then a face, an outfit flat-lay and a three-panel front/back/portrait sheet (live-action styles) or a single drawn sheet, and derived "looks".
- 15 styles: Realism, Romcom, K-Drama, Coming of Age, 90s, Dark Academia, Anime, 2.5D, Furry, Classic 3D, Painterly 3D, CGI, Noir 3D, Classic 2D, Painterly 2D; "other styles take the closest".
- "Original characters only. Never replicate a recognizable real person or a copyrighted character."
- "Consistency is the product. Every approved detail (face, hair, build, costume, accessories) carries forward unchanged across pictures and turns".
- Model routing: Realism faces → `soul_2` 3:4; Realism sheets → `gpt_image_2_6` 16:9 2K; every other picture → `seedream_5_5` 2K.
- Stops for the user three times (after the cast, after each face, after a character's sheet) unless told to run without stops; a failed picture is retried once.
- Also covers humanoids/creatures, children/other ages, an uploaded photo as the face, and prompt-only sheets/turnarounds/expression sheets.

**higgsfield-enhance-video (v1.0)** — all from [workflow higgsfield-enhance-video](mcp://Higgsfield/get_workflow_instructions?workflow=higgsfield-enhance-video)
- 1:1 upscale to 1080p/720p using `kling4_0` `mode:"video-edit"` steered by a timed shot-list prompt; splits clips over 15 s; restores original audio; runs fidelity checks (SSIM, cut timing, side-by-side).
- Known limits it records: input must be ≥720 px short side; output always 24 fps; "Colour is not held"; "Sound is not reliable"; expected SSIM 0.76–0.89.
- Specifically tested "on nine 480p Seedance 2.5 drafts" — i.e. a documented draft→1080p route.

**/editing-room** — [preset /editing-room](mcp://Higgsfield/get_preset_instructions?preset=/editing-room): see Editing Room section.

**/genjutsu** — all from [preset /genjutsu](mcp://Higgsfield/get_preset_instructions?preset=/genjutsu)
- Entry paths: browse presets, apply a named Genjutsu Style to the user's video, animate an existing AI Influencer character, recreate a selected video, transfer motion (`hf_mult_motion_control`), or replace a subject (`hf_mult_replace_object`).
- Genjutsu Styles "redraw every frame of the user's own video in a look; motion, camera and framing stay as filmed"; input video 4–30 s; up to 5 optional reference images; price comes from `get_presets` with `initial_inputs` (`execution.cost_credits`).
- "Free Genjutsu attempts (`use_free_gens`) are not available on this connector."

**/3d-jutsu** — all from [preset /3d-jutsu](mcp://Higgsfield/get_preset_instructions?preset=/3d-jutsu)
- "3D Jutsu is a hosted, revision-controlled 3D scene" built by running Blender Python (`bpy` 5.2) through `scene_builder_3d_*` tools; "building, editing and rendering spend no credits; only an AI image or video made from a render does."
- Three routes: hosted scene (free to build), Blender Studio (rented GPU "billed in credits by the second"), or the user's own local Blender.
- Deliverables: GLB, .blend, and AI image (`scene_builder_3d_generate_angles`) or "Seedance 2.5 video with the render as its start frame" (`scene_builder_3d_generate_video`).
- Limits: curated catalogue assets only ("cannot import a user's own file"); ~5 minute deadline per operation; Area lights dropped in GLB export.
- Use case stated: "new views of the same supplied location" via `/3d-jutsu/references/location-new-angles`.

**Slash-recipe catalogue** — [get_preset_instructions (no arg)](mcp://Higgsfield/get_preset_instructions)
- ~80 recipes, mostly product-ad images/videos (hero-shot, flatlay, luxury, product-spin, etc.) and Halloween portrait transformations. Camera/light recipes written for products: crane-reveal ("A vertical camera move revealing the product"), push-in ("A smooth camera push-in"), pull-back ("A camera pullback revealing the scene"), light-sweep, macro-glide, sunrise-pass ("A transition from darkness to warm light"), topdown-dive, half-turn, floating-roll, reel-cover ("A static cover image for a Reel").

**Agent-level rules from the server** — [Higgsfield server instructions](mcp://Higgsfield/server-instructions)
- "For multi-step videos without a preset, call get_workflow_instructions first (with no argument)"; "For other edits or effects on existing video, load /editing-room via get_preset_instructions"; "Browsing never authorizes execute_preset"; default image model is `gpt_image_2_6`.
- `use_unlim` (free-trial unlimited generations) is opt-in and only passed when the user explicitly asks — [workflow character-sheet](mcp://Higgsfield/get_workflow_instructions?workflow=character-sheet)

### Inferences
- The closest ready-made pipeline for "narrated Buddha story" videos is `faceless-video` in the "Fairy Tale & Myth" (Cinematic Storybook) or History long-form (Watercolor Chronicle) types — but its hard rule of five ~2 s hard cuts per 10 s block and "no shot longer than 2.5s" conflicts with calm, contemplative pacing. The narrated-STILLS mode (one held image per spoken beat) or a custom shot-by-shot build with ordinary `generate_image` → `generate_video` is likely a better fit for meditative content.
- `faceless-video` is restricted to non-photoreal looks and uses fixed models (seedream_5_5, minimax_h3), so a photoreal cinematic Buddha film would have to be assembled manually (stills → i2v → `narration` → `video-montage` → `video-sound-design`).
- `character-sheet` forbids replicating recognisable real persons/copyrighted characters; a Buddha figure would be designed as an original character. The Realism or Painterly 2D/2.5D routes look most applicable.
- A documented cost-saving route exists end to end: Seedance 2.5 480p draft (3 cr/s) → Kling 4.0 video-edit enhance to 1080p (~4 cr/s) ≈ 7 cr/s total versus 16 cr/s for native Seedance 2.5 1080p, with the caveats on colour and 24 fps.

### Gaps
- I read the faceless-video SKILL.md only in part (front matter, golden rules 1–3, types table, intake summary, Phase 8, and grep hits); its reference files (style guides, `preset-catalog.md`, `vo_and_captions.md`) were not loaded, so the exact list of selectable looks is not captured.
- `narration`, `video-montage`, `video-sound-design`, `thumbnail-generation`, `grade-hf` and `lighting-hf` were read only as catalogue descriptions, not as full instructions; the 34 grade names and 62 lighting-look names are unknown.
- Credit cost of a complete faceless-video run is not stated in the instructions; estimate from parts: `minimax_h3` 10 s 2K = 20 cr per block (so 12–18 blocks ≈ 240–360 cr) plus images, TTS and music.

## What presets exist (viral, motion, Genjutsu, Soul styles) and which suit calm, spiritual, cinematic Buddhist content?

### Takeaway
The preset galleries are overwhelmingly built for viral hooks, fashion, products and person-centric effects; very few are inherently calm. The genuinely useful pieces for contemplative content are a handful of painterly/atmospheric looks, the "Slow ambient" marketing motion preset, the Editing Room's slow camera moves and warm relight presets, and Cinema Studio 3.5's named camera/light/grade options.

### Cited Findings

**Viral Hub (`source=viral`): 87 presets total, all `kind: chain`** — [get_presets viral p1](mcp://Higgsfield/get_presets?source=viral&limit=50); [get_presets viral p2](mcp://Higgsfield/get_presets?source=viral&limit=50&cursor=50)
- Categories returned: All, Motion, Product shot, Effects.
- Camera/scale moves: "Earth zoom" ("The camera plunges from orbit — through clouds, past the city grid — and lands at street level in one unbroken move"), "Orbit 360" ("The camera circles around you in a smooth 360° motion, turning any photo into a cinematic video"), "Eyes in" (camera dives into the eye into a new scene), "High flip", "Wild ride", "Bullet time", "World morphing", "Architecture wave", "Selfception".
- Atmospheric/poetic: "Blue depth" ("A wall of dark water fills the frame as fish drift past in slow motion ... Moody and hypnotic"), "Fairytale castle" ("Dreamlike and cinematic—built for fantasy intros, magical reveals, or storybook worlds"), "Moonwalk" ("Journey across the Moon, Sun, and Earth as a crowned cosmic wanderer"), "Orbital presence" (cosmic giant sitting on Earth beneath the stars), "Monet muse" ("Dreamy and painterly—perfect for poetic portraits or artful edits"), "Mighty fighter", "Knight's diary".
- Mixed-media look presets (one-line descriptions): Particles ("Luminous particles in motion"), Canvas ("Hand-drawn canvas-style artwork"), Palette ("Hand-painted color composition"), Hand paint, Sketch, Vintage ("Hand-inked illustrated style"), Paper ("Handcrafted paper texture"), Origami, Marble ("Sculpted marble visual style"), Modern, Two color, Noir, Ocean, Bubbles, Random Glow, Overexposed, Fragments, Comic, Flash comic, Magazine, Windows, Tracking, Ink Riot, Cold vision, plus loud ones (LSD, Acid, Toxic, Lava, Ultraviolet, Cannabis, Broken mirror, Multiverse).
- Classical-painting split-screens that insert the user: Fallen angel (Cabanel), Cyclope (Redon), Pearl earring (Vermeer), Argus (Rivière).
- Comedy/hook presets (not suitable): Vanish, Melting, Clones, Infinite clones, Pigeons, Puffin ride, Skatedog, Dolphin ride, Penguin ride, Smash and grab, Monster dab, Street colossus, Burning man, Superstar, 2000's paparazzi, Action figure, Race track, Casual monster slayer, etc.

**Marketing Studio motion (`source=marketing_studio, category=motion`): 231 presets total; first 50 inspected** — [get_presets motion](mcp://Higgsfield/get_presets?source=marketing_studio&category=motion&limit=50)
- Each has a `type`: hypermotion, mixed_media, 2d_motion or saas_motion; no descriptions are returned, only names and preview URLs.
- Names among the first 50 with calm/organic/Asian-art connotations: "Slow ambient" (hypermotion), "Japanese Glistening Water" (mixed_media), "Ukiyo-e Paper Waves" (hypermotion), "Continuous Line Botanical" (2d_motion), "Storybook Page Turns" (2d_motion), "Green Tea Macro" (hypermotion), "Liquid Gold" (hypermotion), "Amber Resin Monotone" (mixed_media), "Pastel Float" (mixed_media), "Constellation Bottle Outline" (2d_motion).
- These run through `marketing_studio_v2_video`, whose motion types take "exactly one" product reference image and 5–15 s duration — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)
- A cross-gallery text search works: `query="slow ambient"` returned exactly one hit (the Marketing Studio "Slow ambient" preset) — [get_presets query](mcp://Higgsfield/get_presets?query=slow%20ambient)

**Genjutsu motion presets (`source=genjutsu, category=genjutsu`): 36 curated presets** — [get_presets genjutsu](mcp://Higgsfield/get_presets?source=genjutsu&category=genjutsu&limit=50)
- Each is either a "Motion transfer reference" or "Object replacement reference" built on a driving video; names are fashion/dance/street oriented: Countryside Duo, Dance Duo, Selfie Walk, Pink Street Runway, Patchwork Runway, Parkour Flow, Fight Recast, Fantasy Rider, Infinite Zoom, World Shift, Outfit Swap, Cats in Motion, etc.
- Tabs: Higgsfield (curated), Trending, New (community), Styles.

**Genjutsu Styles (`category=genjutsu-styles`): 20 returned on page 1, more pages exist (`next_cursor: 2`)** — [get_presets genjutsu-styles](mcp://Higgsfield/get_presets?source=genjutsu&category=genjutsu-styles&limit=50)
- Names: Mission, Classic Cel, Knitted, Bold Toon, Vinyl Toy, Felt Puppet, Street Doll, Soft 3D, Graphic Cel, Gouache, Sculpted, Low-Poly, CG Anime, Painted 3D, Flat Cel, Oil Paint, Neon Graphic, Rough Gouache, Comic 3D, Retro Game.
- Each "redraws the user's own video in this look; motion, camera and framing stay as filmed."

**Soul 2.0 image styles (`source=soul`): 33 styles** — [get_presets soul](mcp://Higgsfield/get_presets?source=soul&limit=50)
- Names include: General, Warm ambient, Theatrical light, Nature light, Asian nostalgia, Double exposure, Underwater, Retro BW, BW film, Neutral pastel film, Warm vivid film, Warm contrast film, Muted cool film, Street photography, Digital camera, Disposable camera, plus trend looks (Y2K studio, Swag era, Candy pop, Frutiger aero, 80s horror, Siren, Drain, Extraterrestrial).
- Used by passing the id as `style_id` to `generate_image` with `model='soul_2'`; "A style can be combined with soul_id, but not with medias/image references" — [get_presets schema](mcp://Higgsfield/get_presets)

**Other galleries exposed by `get_presets`** — [get_presets schema](mcp://Higgsfield/get_presets)
- `katana` (reference-based video remixes; categories personalized_edits, style_transfer, motion_transfer), `what_if` (/content-factory), `shorts_studio` (/shorts), `short_drama`, `faceless_channel` (Faceless Video style picker), `music_cards`, `recraft` (the user's own saved Recraft styles).
- Browsing/opening a preset never authorises generation: "Do not call execute_preset unless the user explicitly asks to generate".

### Inferences
- Best fits for calm, spiritual, cinematic Buddhist content (my judgement from names/descriptions only — previews were not watched):
  - Looks: Genjutsu Styles "Gouache", "Rough Gouache", "Oil Paint", "Painted 3D", "Sculpted"; Viral mixed-media "Canvas", "Palette", "Hand paint", "Paper", "Origami", "Marble", "Particles", "Vintage"; Soul styles "Warm ambient", "Nature light", "Theatrical light", "Asian nostalgia", "Neutral pastel film", "Warm vivid film", "Double exposure".
  - Motion: Marketing "Slow ambient", "Japanese Glistening Water", "Ukiyo-e Paper Waves", "Continuous Line Botanical", "Storybook Page Turns"; Viral "Earth zoom" (cosmic-to-ground opener), "Orbit 360" (slow circle around a statue/figure), "Blue depth", "Fairytale castle"; recipes `sunrise-pass`, `push-in`, `pull-back`, `crane-reveal`, `light-sweep` (written for products, could suit a statue or ritual object).
  - Cinema Studio 3.5 named controls: camera_style `dreamy_flow`, `classic_static`, `silent_machine`, `intimate_observer`; light_scheme `contre_jour`, `window`, `practicals`, `silhouette`; color_grading `naturalistic_clean`, `bleached_warm`.
- Most Viral and Genjutsu motion presets require a person photo/driving video and are designed as scroll-stopping gags; they are a poor tonal match and several (LSD, Cannabis, Acid, Toxic, monsters, Halloween recipes) would be inappropriate for devotional content.
- Marketing Studio motion presets expect a product image; a Buddha statue, mala, singing bowl or book cover could plausibly be supplied as the "product", but this is untested.
- For spiritual content, free-prompted generation with a strong model plus Editing Room camera moves/relights (next section) likely gives more control than the preset galleries.

### Gaps
- Only 50 of 231 Marketing Studio motion presets and page 1 of Genjutsu Styles were listed; "Trending"/"New" community Genjutsu tabs, the product-shot category, Katana, What If, Shorts Studio and Faceless Channel galleries were not browsed.
- Preset prices are not returned by browsing; a price needs `get_presets` with `preset_id` + `initial_inputs` (confirmed media), which requires uploads and was not done.
- No preview videos were viewed, so suitability judgements rest on names and one-line descriptions; marketing motion presets have no descriptions at all.

## What audio capabilities exist (voices, music, sound effects) and what do they cost?

### Takeaway
Audio is cheap relative to video: a ~275-character narration line costs about 0.9–1.9 cr, a 60 s instrumental music bed 3.8–8.7 cr, and a generated 5 s sound effect 1.25 cr. There are 100+ built-in preset voices, voice cloning from a recording, multi-voice dialogue (Eleven v4), dubbing/lip-sync, voice change, stem separation and a searchable Epidemic Sound SFX library.

### Cited Findings

**Audio models (12)** — all from [models audio](mcp://Higgsfield/models_explore?action=list&type=audio&limit=100)
- Speech: `text2speech_v2` (Higgsfield; engines via `variant`: elevenlabs, minimax, seed_speech, vibe_voice, cozy_voice; preset or cloned "element" voice; supports_unlim), `elevenlabs_v4` ("up to 10 preset or reference-element voices. Dialogue text is limited to 10,000 characters in total"; `stability`, `similarity_boost`, `batch_size` 1–4), `elevenlabs_v4_turbo` (one voice), `seed_audio` (ByteDance Seed Audio 1.0; `speech_rate` -50..100, `pitch_rate` -12..12, `loudness_rate`; formats wav/mp3/pcm/ogg_opus; up to 3 audio references or 1 image reference; supports_unlim), `qwen_audio_tts` (natural-language `instruction` "for emotion, dialect, speed, or style", ≤128 chars; 13 language hints incl. en, zh, ja, ko, th, vi), `inworld_text_to_speech` (~110 named voices across en, zh, nl, fr, de, it, ja, ko, pl, pt, es, ru, hi, he, ar; "Game pipeline only").
- Music: `elevenlabs_music_v2_5` and `elevenlabs_music_v2` ("Music generation from a prompt or custom lyrics"; duration 3–600 s; `force_instrumental`; `lyrics` (custom lyrics up to 120 s); `batch_size` 1–4), `sonilo_music` ("Text-to-music generation with controllable duration. Game pipeline only").
- SFX: `mirelo_text_to_audio` ("Text-to-audio sound effect generation with controllable duration. Game pipeline only").
- Dubbing: `audio_dubbing` (ElevenLabs; dub one audio into a target BCP-47 language, optional timed transcript/translations, `keyterms`).
- The `estimate_audio_cost` schema mentions "Suno requires an integer from 15 to 360" for duration, but no Suno model appears in the list — [estimate_audio_cost schema](mcp://Higgsfield/estimate_audio_cost)

**Audio costs** — [estimate_audio_cost](mcp://Higgsfield/estimate_audio_cost)

| Model | Request | Credits |
|---|---|---|
| elevenlabs_music_v2_5 | 60 s instrumental | 8.72 |
| elevenlabs_music_v2_5 | 180 s instrumental | 26.16 |
| elevenlabs_music_v2 | 60 s instrumental | 3.84 |
| sonilo_music | 30 s | 1.88 |
| mirelo_text_to_audio | 5 s sound effect | 1.25 |
| text2speech_v2 (variant elevenlabs, preset voice "Arthur") | ~275-character narration | 0.9 |
| elevenlabs_v4 (one dialogue turn, same text) | ~275 characters | 1.38 |
| seed_audio | ~275 characters, no voice specified | 1.9 |

**Voices** — [list_voices size=100](mcp://Higgsfield/list_voices?size=100)
- First page returned 100 preset voices with `has_more: true` (more exist); each has `voice_id`, `voice_type:"preset"`, `name`, `gender`, `preview_url` (mp3/wav sample) and thumbnail. No custom ("element") voices appeared on the first page.
- Example male voice names: Grady, Holden, Arthur, Archie, Fraser, Cillian, Desmond, Alden, Callan, Gideon, Sterling, Harrison, Alistair, Caspian, Julian, Orion, Marcus, Bram. Example female: Ainsley, Faye, Celine, Elodie, Helena, Isla, Maeve, Opal, Soraya, Willow, Naomi, Imogen, Luna, Vesper, Nora, Sienna.
- The voice records carry no description of accent, age or tone — only name and gender.

**Voice cloning and voice tools**
- `create_voice` opens a widget where the user records or uploads audio and names the voice; "The widget records/uploads, confirms the audio, and creates the voice itself end-to-end" — [create_voice schema](mcp://Higgsfield/create_voice)
- `voice_change` replaces the spoken voice in a video "while keeping the original timing and visuals" — [voice_change schema](mcp://Higgsfield/voice_change)
- `separate_stems` extracts FLAC stems from up to 60 minutes of audio/video (two: vocals / no_vocals; four: vocals, drums, bass, other) in the sandbox — [separate_stems schema](mcp://Higgsfield/separate_stems)

**Sound-effects library**
- `search_sound_effects` searches "the Epidemic Sound catalog by a natural-language sound description"; returns titles, durations and ids; `preview_sound_effect` to listen, `download_sound_effect` "only for sounds selected for use in content" — [search_sound_effects schema](mcp://Higgsfield/search_sound_effects)
- Live test, query "Tibetan singing bowl": 8 results on the first page with more available, e.g. "Bells, Misc, Tibetan Bowl, Hit, Long Tail 02" (35 s), "Bells, Misc, Tibetian Singing Bowl" (39 s), "Bells, Misc, Tibetan Bowl, Multiple Hits Long Tail" (117 s), "Bells, Misc, Small Tibetan Bowl Ring 01" (16 s) — [search_sound_effects "Tibetan singing bowl"](mcp://Higgsfield/search_sound_effects?query=Tibetan%20singing%20bowl&limit=8)

**Native audio in video models**
- Many video models generate synchronized audio themselves (`generate_audio`/`sound` params on Seedance, Kling, Veo, Wan 3.0, MAGI-2, FLUX 3, Gemini Omni) — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)

### Inferences
- A full narration track is inexpensive: at ~0.9 cr per ~275 characters (text2speech_v2/elevenlabs), a 1,500-word (~9,000-character) script would cost roughly 30 cr; with Eleven v4 roughly 45 cr. (Linear extrapolation from one quote — unverified.)
- ElevenLabs Music v2.5 scales linearly (8.72 cr/min); a 3-minute meditation bed ≈ 26 cr, a 10-minute one (the 600 s max) ≈ 87 cr. v2 is less than half the price.
- For a contemplative narrator the practical route is to audition preset voices via their `preview_url` samples (names like Arthur, Gideon, Sterling, Alistair, Helena, Maeve suggest mature tones, but that is a guess from names only), or clone the channel owner's own voice with `create_voice`.
- Real singing-bowl/bell/temple ambience is available from the Epidemic Sound search, which is likely more authentic than generating such sounds with `mirelo_text_to_audio`.

### Gaps
- Whether searching, previewing or downloading Epidemic Sound effects costs credits, and the licence terms for using them on YouTube, are not stated in the tool descriptions.
- TTS pricing basis (per character vs per second) is not exposed; only single-point quotes were taken.
- `sonilo_music`, `mirelo_text_to_audio` and `inworld_text_to_speech` are labelled "Game pipeline only"; the faceless-video workflow says it is "the one narrated-video exception" for `sonilo_music`, so general use may be refused.
- Cost of `create_voice` (cloning), `voice_change`, `dubbing`, `sync_so` lip-sync and `separate_stems` was not quoted.
- Voice language coverage for the Higgsfield preset voices is not listed; non-English narration (e.g. Hindi, Thai, Sinhala, Pali terms) quality is unknown.

## What does the Editing Room offer (presets, prices)?

### Takeaway
The Editing Room is a timeline editor for existing video (uploaded or generated) that the agent can drive: auto scene-cutting, trims/cuts, and four generative edit types — camera move / new angle, relight, prompt edit (brush/region), and object/person/location swap — priced per second (720p: 7–7.5 cr/s; 1080p: 16–20 cr/s). Exporting the timeline to MP4 is free.

### Cited Findings

**Prices (credits per second of the edited clip)** — [editing_room_get_prices](mcp://Higgsfield/editing_room_get_prices)

| Edit type | 480p | 720p | 1080p | 4k |
|---|---|---|---|---|
| videoshop_camera_move | 3 | 7 | 16 | 34 (28 "without_video") |
| videoshop_relight | 3 | 7 | 16 | 34 (28 "without_video"); plus `image_credits: 3.5` |
| videoshop_edit | 3.5 | 7.5 | 20 | 34 |
| videoshop_genjutsu (object swap) | 3 | 7 | 20 | — |

**Camera move presets (18)** — [editing_room_list_presets camera_moves](mcp://Higgsfield/editing_room_list_presets?catalog=camera_moves)
- Push and pull: "Dolly in" (camera travels forward toward the person), "Dolly out" (travels back, revealing more of the space), "Slow push in" ("A slow, barely noticeable push toward the face").
- Zoom: "Crash zoom in", "Zoom in" (optical, camera does not travel), "Dolly zoom" (vertigo).
- Crane: "Crane up" (rises and tilts down), "Crane down".
- Orbit: "Orbit left", "Orbit right", "360 orbit" ("A full steady circle around the person, back to the front"), "Close orbit".
- Others: "Over-the-head pass", "Dutch angle push", "Barrel roll", "Handheld" ("Operator drift and micro-shake"), "FPV drone", "Robo arm".
- Some presets have fixed guide lengths (e.g. 360 orbit ~14.9 s, Dolly zoom 10 s, Over-the-head pass 7 s); prompt-method moves have none.

**Angle presets (16 fixed cameras)** — [editing_room_list_presets angles](mcp://Higgsfield/editing_room_list_presets?catalog=angles)
- Front, ¾ left/right, Profile left/right, Back, Over the shoulder left/right, Low (-25°), High (45°), Top-down (90°), High ¾ left/right, Low ¾ left/right, Rear ¾ right — each defined by azimuth/elevation.
- Angles can also be given in free text ("the camera in your own words, where it stands and how it moves") — [preset /editing-room](mcp://Higgsfield/get_preset_instructions?preset=/editing-room)

**Relight presets (16)** — [editing_room_list_presets relight](mcp://Higgsfield/editing_room_list_presets?catalog=relight)
- Basic: "Golden hour" (#FFB25C, low side, soft), "Studio key", "Moonlight" (#8FB4FF), "Neon split", "Rim light", "Campfire" (#FF7A2E from below).
- Bold: "Hard neutral split", "Golden hard Rembrandt", "White overhead spot", "White grazing side contours", "Amber key cobalt edge", "Red cyan hard cross", "Cobalt night amber edge", "Amber underlight blue rim", "Magenta cyan twin edges", "Luminous white beauty".
- Each preset is 1–3 placed lights with colour, azimuth, elevation, brightness and diffusion; relight also accepts a text prompt, a reference image ("to take the light from"), light keyframes over time, and quick nudges (brighter/darker/warmer/cooler/stronger/subtler) — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)

**How the agent drives it** — all from [preset /editing-room](mcp://Higgsfield/get_preset_instructions?preset=/editing-room) and [open_editing_room schema](mcp://Higgsfield/open_editing_room)
- `open_editing_room` creates a project from a confirmed uploaded video (`video_input_id`) or reopens a `project_id`; "A new project is cut into scenes automatically" (`autocut`, default true).
- One staged action per open call: `camera_move`, `angle` (azimuth 0–359, elevation -30..90, shot auto/ws/ms/cu, or free text), `relight`, `swap_person`, `change_location` (up to 10 reference images each), `brush` (prompt + optional strokes), `cut`, `remove_cut`, `trim`, `set_edit_visibility`, `remove_edit`, `select_edit`. Time positions go up to 600,000 ms (10 minutes).
- Generation is triggered via `prepare_editing_room` (`operation:"send"`, `action:{kind:"generate", edit_id}`) or the user's Generate button — "This spends existing credits."
- Clips for the generative edit models must be 0.5–30 s — [models video](mcp://Higgsfield/models_explore?action=list&type=video&limit=100)
- `export_editing_room` exports "an Editing Room project's saved timeline to an MP4 at no credit cost" (views: final, or split to compare with the original) — [export_editing_room schema](mcp://Higgsfield/export_editing_room)
- Fallback if the tool fails: link to https://higgsfield.ai/editing-room.
- Related bundled workflow `angles-hf` re-shoots a video as a multi-camera edit inside an Editing Room project (loads only from /angles) — [get_workflow_instructions (no arg)](mcp://Higgsfield/get_workflow_instructions)

### Inferences
- For calm Buddhist footage the most relevant controls are "Slow push in", "Dolly in/out", "Crane up/down", gentle "Orbit left/right", and the relights "Golden hour", "Moonlight", "Campfire", "Golden hard Rembrandt" and "Luminous white beauty"; e.g. re-lighting a 10 s temple shot to golden hour at 720p ≈ 70 cr, at 1080p ≈ 160 cr.
- Editing Room edits cost about the same per second as generating fresh Seedance 2.5 footage (7 cr/s at 720p, 16 cr/s at 1080p), so it pays off mainly when an existing shot is good and only the camera or light needs changing.
- Camera-move presets are phrased around "the person"; behaviour on statues, landscapes or objects is untested.

### Gaps
- No Editing Room project was opened (it would create a project), so the widget behaviour, timeline tools (`editing_room_get_timeline`, `save_timeline`, `render_timeline`) and whether text/titles/audio tracks are supported were not verified.
- The meaning of "with_video" vs "without_video" pricing rows and of `image_credits: 3.5` on relight is not explained in the price table.
- No 4k option appears in the `open_editing_room` resolution enum (480p/720p/1080p) although the price table lists 4k rows.

## What other capabilities matter (projects/folders, upscaling, reframing, analysis, publishing)?

### Takeaway
Beyond generation, the connector can organise outputs into projects/folders, upscale images and video, reframe between 16:9 and 9:16, remove backgrounds, analyse existing videos (including YouTube links), predict virality, run code in a cloud sandbox for assembly, and even publish to TikTok — all from chat.

### Cited Findings
- Projects: `create_project` makes "a private Higgsfield media project for this conversation" and returns a `default_folder_id` to pass as `folder_id` on later generations; it should be created "only on an explicit user request or when get_preferences returns auto_create_project=true" — [create_project schema](mcp://Higgsfield/create_project)
- This account's saved preference is `auto_create_project: false` (generations are not auto-filed into a project) — [get_preferences](mcp://Higgsfield/get_preferences)
- Folder/project tools present in the tool list: list_projects, get_project, update_project, archive/unarchive/delete_project, share_project, publish_project, list_folders, create_folder, rename/move/delete_folder, search_folders, list/attach/copy/move/remove_project_asset, list_workspaces/select_workspace — [tool list](mcp://Higgsfield/tools)
- Video upscale: `upscale_video` with provider `bytedance` (target 1080p/2K/4K; presets common/aigc/short_series/ugc/old_film; fps 24/30/60; requires source width/height) or `topaz` (1080p/2160p, aspect-ratio based) — [upscale_video schema](mcp://Higgsfield/upscale_video)
- Image upscale: `upscale_image` to 2k/4k, ByteDance only, needs source width/height — [upscale_image schema](mcp://Higgsfield/upscale_image)
- `reframe`: "Expand or reframe an existing video to a new aspect ratio while preserving the source content" (16:9, 9:16, 4:3, 3:4, 1:1, 21:9; up to 60 s; resolution 480p/720p/1080p) — [reframe schema](mcp://Higgsfield/reframe)
- `outpaint_image` (extend an image to a new canvas ratio) and `remove_background` (image or video) — [outpaint_image schema](mcp://Higgsfield/outpaint_image); [remove_background schema](mcp://Higgsfield/remove_background)
- `motion_control`: animate a character still with the motion and camera movement of a reference video (Kling 3.0 Motion Control; 720p/1080p) — [motion_control schema](mcp://Higgsfield/motion_control)
- `video_analysis_create`: scene-by-scene analysis of an uploaded video or a YouTube URL, optional question prompt, `deep` or `glance` mode; "Each analysis costs credits"; takes "3-5 minutes on average"; accuracy drops for longer videos — [video_analysis_create schema](mcp://Higgsfield/video_analysis_create)
- `virality_predictor`: predicts "virality potential, engagement, attention, audience response, retention risk, hook strength" with a dashboard — [virality_predictor schema](mcp://Higgsfield/virality_predictor)
- `transactions` lists credit spend/refund history; `apps_search` lists Higgsfield Marketplace apps callable via MCP — [transactions schema](mcp://Higgsfield/transactions); [apps_search schema](mcp://Higgsfield/apps_search)
- Other tool families visible but not explored: `sandbox_exec` (cloud sandbox used by workflows for ffmpeg assembly), `media_upload` / `media_import_url` / `media_upload_widget`, `elements_*` and `show_characters` / `show_reference_elements` (reusable reference elements), `ai_influencer_*`, `ads_studio_*`, `scene_builder_3d_*`, `gpu_*` (rented GPUs, LoRAs), `tiktok_*` (connect, trending music, publish), `meta_ads_*`, website builder tools, `generate_*_batch` and `jobs_wait` — [tool list](mcp://Higgsfield/tools)
- Batch generation exists (`generate_image_batch`, `generate_video_batch`, `generate_audio_batch`) and `count` 1–4 variants per request — [estimate_video_cost schema](mcp://Higgsfield/estimate_video_cost)

### Inferences
- A complete chat-driven production loop is possible without leaving the conversation: stills → image-to-video → narration → music → SFX → sandbox assembly/captions → upscale → reframe to 9:16 for Shorts → thumbnail; the only human steps are approvals and any file uploads that need the upload widget.
- `video_analysis_create` on a YouTube URL could be used to reverse-engineer shot structure of successful Buddhist/meditation videos before spending generation credits.
- Because `auto_create_project` is false, asking the agent to create one named project per video would keep assets organised.

### Gaps
- `list_projects` / `list_folders` were not called because they require a `workspace_id` from `list_workspaces`, which was not loaded in this pass; existing projects on the account are therefore unknown.
- No YouTube publishing tool exists in the Higgsfield connector (only TikTok and Meta Ads); upload to YouTube would have to go through another connector.
- Costs for reframe, outpaint, background removal, video analysis, virality prediction and motion_control were not quoted (several need real media ids or submit jobs).
- Content-policy behaviour for religious figures (e.g. depictions of the Buddha) could not be tested read-only; workflows mention jobs can end `nsfw`/`failed` and that such jobs are refunded.
