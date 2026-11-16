# The cloud machine (2026-11-16)

4 CPU cores, 15 GB RAM, no GPU. It can be wiped; this is how to rebuild what the lab uses.

```
apt-get update && apt-get install -y --no-install-recommends libegl1 libegl-mesa0 libgles2   # EEVEE without a GPU
python3.13 -m venv blender52 && blender52/bin/pip install bpy==5.2.4 pillow                    # Blender 5.2 LTS
```
Already present: Python 3.13, numpy, Pillow, ffmpeg 6.1.1, Node 22, Playwright with Chromium, Remotion 4.0.539
(in the session's test project, with the design kit fonts stored locally).

**Blocked by this environment's network rules:** docs.comfy.org, huggingface.co, github.com (plain downloads),
download.blender.org, civitai.com. PyPI and apt work.

**Cannot do here:** ComfyUI (needs the PC's GPU), DaVinci Resolve, the live Blender connection, anything on the
PC. The PC was not reachable from this session on 2026-11-16.
