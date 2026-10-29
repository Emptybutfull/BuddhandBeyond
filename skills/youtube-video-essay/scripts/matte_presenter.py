"""Remove the background from the camera footage for `cutout` shots only (RobustVideoMatting).

For every plan entry with mode "cutout", cuts that stretch (plus a short pre-roll so the matte
settles) from camera_cut.mp4, mattes it, and writes a VP9 WebM with alpha that Remotion plays with
<OffthreadVideo transparent>. Updates presenter_plan.json with each clip's src and startFrom.

One-time setup (in the project's Python):  pip install torch torchvision av pims tqdm
The model downloads from GitHub on first run (torch.hub cache). GPU is used when available.

Usage:
  python matte_presenter.py public/camera_cut.mp4 --plan presenter_plan.json --out-dir public/cutouts
"""
import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("camera_cut")
    ap.add_argument("--plan", required=True)
    ap.add_argument("--out-dir", default="public/cutouts")
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--preroll", type=float, default=0.5, help="seconds matted before the shot so the edges settle")
    ap.add_argument("--model", default="mobilenetv3", choices=["mobilenetv3", "resnet50"])
    ap.add_argument("--downsample", type=float, default=None, help="0.25 for 1080p, 0.125 for 4K (auto if unset)")
    ap.add_argument("--device", default=None)
    a = ap.parse_args()

    import torch  # imported late so --help works without torch

    device = a.device or ("cuda" if torch.cuda.is_available() else "cpu")
    model = torch.hub.load("PeterL1n/RobustVideoMatting", a.model).eval().to(device)
    convert_video = torch.hub.load("PeterL1n/RobustVideoMatting", "converter")

    plan_path = Path(a.plan)
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    out_dir = Path(a.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    public = out_dir.parent  # paths in the plan are relative to public/ for staticFile()

    for p in plan:
        if p["mode"] != "cutout":
            continue
        f0, f1 = p["frames"]
        pre = min(round(a.preroll * a.fps), f0)
        start_f = f0 - pre
        n = f1 - start_f
        name = f"cutout_{f0}.webm"
        tmp = Path(tempfile.mkdtemp(prefix="matte_"))
        try:
            clip = tmp / "clip.mp4"
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{start_f / a.fps:.4f}", "-i", a.camera_cut,
                            "-frames:v", str(n), "-an", "-c:v", "libx264", "-crf", "16", str(clip)], check=True)
            frames = tmp / "png"
            convert_video(model, input_source=str(clip), output_type="png_sequence", output_composition=str(frames),
                          downsample_ratio=a.downsample, seq_chunk=12, device=device, progress=True)
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(a.fps), "-i", str(frames / "%04d.png"),
                            "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "6M", "-auto-alt-ref", "0",
                            str(out_dir / name)], check=True)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
        p["src"] = (out_dir / name).relative_to(public).as_posix()
        p["startFrom"] = pre
        print(f'{p["start"]:.1f}s  <PresenterShot mode="cutout" src={{staticFile("{p["src"]}")}} startFrom={{{pre}}} />')

    plan_path.write_text(json.dumps(plan, indent=1, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    main()
