"""Cut the camera recording with the SAME edit list as voice.wav, so frame N of camera_cut.mp4
lines up with second N/fps of voice.wav. PresenterShot then only needs startFrom = Sequence start.

Usage:
  python cut_camera.py camera.mp4 --edl edl.json --out public/camera_cut.mp4 --voice public/voice.wav
  python cut_camera.py camera.mp4 --edl edl.json --offset 1.234 --overlap-ms 30

edl.json: [[src_start, src_end], ...] in seconds of the source recording, in OUTPUT order
          (cold-open entries first) — dump the exact list build_lecture.py uses for voice.wav.
--offset: camera_time = source_time + offset (from sync_camera.py; 0 if the camera's own audio is the source).
--overlap-ms: if build_lecture.py crossfades joins by N ms, pass N so the video loses the same time.

Each piece is cut to an exact frame count taken from the running total, so rounding never
accumulates into drift, and memory stays flat however far apart the pieces are in the source.
The camera's own audio is kept as a reference track (to check sync by ear); PresenterShot mutes it.
"""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def probe_duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout
    return float(out.strip())


def has_audio(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True,
    ).stdout
    return bool(out.strip())


def run(cmd):
    subprocess.run(cmd, check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("camera")
    ap.add_argument("--edl", required=True)
    ap.add_argument("--out", default="camera_cut.mp4")
    ap.add_argument("--offset", type=float, default=0.0)
    ap.add_argument("--overlap-ms", type=float, default=0.0)
    ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--height", type=int, default=1080)
    ap.add_argument("--voice", help="voice.wav to compare durations with")
    a = ap.parse_args()

    edl = json.loads(Path(a.edl).read_text())
    ov = a.overlap_ms / 1000
    cam_len = probe_duration(a.camera)
    audio = has_audio(a.camera)
    pieces, cum = [], 0.0
    for i, (s, e) in enumerate(edl):
        s, e = float(s) + a.offset + (ov if i else 0.0), float(e) + a.offset
        if s < 0 or e > cam_len + 0.05:
            sys.exit(f"piece {i} ({s:.2f}-{e:.2f}s) is outside the camera file (0-{cam_len:.2f}s): check --offset")
        f0, f1 = round(cum * a.fps), round((cum + e - s) * a.fps)
        cum += e - s
        pieces.append((s, f1 - f0))

    tmp = Path(tempfile.mkdtemp(prefix="camcut_"))
    try:
        vlist, alist = [], []
        for i, (s, n) in enumerate(pieces):
            if n <= 0:
                continue
            v = tmp / f"v{i:04d}.mp4"
            run(["ffmpeg", "-v", "error", "-y", "-ss", f"{s:.4f}", "-i", a.camera, "-frames:v", str(n),
                 "-vf", f"fps={a.fps},scale=-2:{a.height}", "-an", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                 "-pix_fmt", "yuv420p", "-video_track_timescale", "90000", str(v)])
            vlist.append(f"file '{v.as_posix()}'")
            if audio:
                w = tmp / f"a{i:04d}.wav"
                run(["ffmpeg", "-v", "error", "-y", "-ss", f"{s:.4f}", "-i", a.camera, "-t", f"{n / a.fps:.6f}",
                     "-vn", "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", str(w)])
                alist.append(f"file '{w.as_posix()}'")
            print(f"\rpiece {i + 1}/{len(pieces)}", end="", flush=True)
        print()
        (tmp / "v.txt").write_text("\n".join(vlist))
        run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(tmp / "v.txt"), "-c", "copy", str(tmp / "video.mp4")])
        if audio:
            (tmp / "a.txt").write_text("\n".join(alist))
            run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(tmp / "a.txt"), "-c", "copy", str(tmp / "audio.wav")])
            run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp / "video.mp4"), "-i", str(tmp / "audio.wav"),
                 "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", a.out])
        else:
            run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp / "video.mp4"), "-c", "copy", "-movflags", "+faststart", a.out])
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    got = probe_duration(a.out)
    msg = f"{a.out}: {got:.3f}s (edit list {cum:.3f}s"
    if a.voice:
        v = probe_duration(a.voice)
        msg += f", voice.wav {v:.3f}s, drift {got - v:+.3f}s"
        if abs(got - v) > 2 / a.fps:
            msg += "  <-- MISMATCH: check --overlap-ms / EDL"
    print(msg + ")")


if __name__ == "__main__":
    main()
