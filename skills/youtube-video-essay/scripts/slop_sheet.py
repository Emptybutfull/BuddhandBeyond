"""Pack generated images and video clips into labelled contact sheets for the AI-slop review.

A reviewer subagent reads the sheets (a dozen images per look, cheap on tokens) instead of every
file, and writes review/slop.json with keep / fix / reject per key (rubric: references/ai-assets.md).

Usage:
  python slop_sheet.py assets/mj assets/flow --out review/sheets
  python slop_sheet.py assets/flow --frames 6 --only-video

Images (png/jpg/webp): 4x3 grids, each tile captioned with the file's key (name without extension).
Videos (mp4/mov/webm): one strip of N evenly spaced frames per clip (captioned key @ seconds),
4 clips per sheet, so morphing hands/faces and flicker show up side by side.
Writes <out>/index.json: {sheet: [keys]}.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

IMG = {".png", ".jpg", ".jpeg", ".webp"}
VID = {".mp4", ".mov", ".webm", ".mkv"}


def font(size):
    for f in ("arial.ttf", "DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(f, size)
        except OSError:
            continue
    return ImageFont.load_default()


def tile(im, w, h, label, f):
    im = im.convert("RGB")
    im.thumbnail((w, h - 28))
    t = Image.new("RGB", (w, h), (20, 20, 20))
    t.paste(im, ((w - im.width) // 2, 0))
    d = ImageDraw.Draw(t)
    d.rectangle([0, h - 28, w, h], fill=(0, 0, 0))
    d.text((6, h - 25), label[:48], fill=(255, 230, 150), font=f)
    return t


def grid(tiles, cols, w, h):
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * w + (cols + 1) * 6, rows * h + (rows + 1) * 6), (45, 45, 45))
    for i, t in enumerate(tiles):
        sheet.paste(t, (6 + (i % cols) * (w + 6), 6 + (i // cols) * (h + 6)))
    return sheet


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
                         capture_output=True, text=True).stdout.strip()
    return float(out) if out else 0.0


def clip_strip(path, n, w, h, f):
    dur = duration(path)
    frames = []
    with tempfile.TemporaryDirectory() as tmp:
        for k in range(n):
            t = dur * (k + 0.5) / n
            png = Path(tmp) / f"{k}.png"
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(path), "-frames:v", "1", str(png)], check=False)
            if png.exists():
                frames.append(tile(Image.open(png), w, h, f"{path.stem} @{t:.1f}s", f))
    return grid(frames, n, w, h) if frames else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("--out", default="review/sheets")
    ap.add_argument("--per", type=int, default=12, help="images per sheet")
    ap.add_argument("--frames", type=int, default=6, help="frames per video clip")
    ap.add_argument("--size", type=int, default=480, help="tile width in px")
    ap.add_argument("--only-video", action="store_true")
    ap.add_argument("--only-images", action="store_true")
    a = ap.parse_args()

    files = sorted(p for d in a.inputs for p in (Path(d).rglob("*") if Path(d).is_dir() else [Path(d)]) if p.is_file())
    imgs = [p for p in files if p.suffix.lower() in IMG and not a.only_video]
    vids = [p for p in files if p.suffix.lower() in VID and not a.only_images]
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    w, h = a.size, int(a.size * 9 / 16) + 28
    f = font(18)
    index = {}

    for s in range(0, len(imgs), a.per):
        batch = imgs[s : s + a.per]
        name = f"img_{s // a.per + 1:03d}.jpg"
        grid([tile(Image.open(p), w, h, p.stem, f) for p in batch], 4, w, h).save(out / name, quality=82)
        index[name] = [p.stem for p in batch]

    sw = max(160, a.size // 2)
    sh = int(sw * 9 / 16) + 28
    for s in range(0, len(vids), 4):
        batch = vids[s : s + 4]
        strips = [st for st in (clip_strip(p, a.frames, sw, sh, font(14)) for p in batch) if st]
        if not strips:
            continue
        sheet = Image.new("RGB", (max(x.width for x in strips), sum(x.height for x in strips)), (45, 45, 45))
        y = 0
        for st in strips:
            sheet.paste(st, (0, y))
            y += st.height
        name = f"vid_{s // 4 + 1:03d}.jpg"
        sheet.save(out / name, quality=82)
        index[name] = [p.stem for p in batch]

    (out / "index.json").write_text(json.dumps(index, indent=1))
    print(f"{len(imgs)} images, {len(vids)} clips -> {len(index)} sheets in {out}")


if __name__ == "__main__":
    main()
