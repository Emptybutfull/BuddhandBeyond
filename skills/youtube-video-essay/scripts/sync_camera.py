"""Find the time offset between the camera recording and the Plaud (or other) audio recording.

Only needed when the voice comes from a separate recorder. Prints OFFSET such that
camera_time = plaud_time + OFFSET, which cut_camera.py takes as --offset.

Usage:  python sync_camera.py camera.mp4 plaud.wav [--seconds 240] [--max-offset 300]
Tip: clap once on camera right after pressing record on both devices; it makes the match certain.
"""
import argparse
import subprocess
import sys

import numpy as np

RATE = 8000
ENV_RATE = 200  # envelope samples per second -> 5 ms resolution


def envelope(path, seconds):
    cmd = ["ffmpeg", "-v", "error", "-i", path, "-t", str(seconds), "-vn", "-ac", "1", "-ar", str(RATE), "-f", "f32le", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32)
    if x.size == 0:
        sys.exit(f"no audio decoded from {path}")
    hop = RATE // ENV_RATE
    x = x[: x.size // hop * hop].reshape(-1, hop)
    env = np.log1p(np.abs(x).mean(axis=1) * 100)  # loudness contour: robust to different mics
    env = np.diff(env, prepend=env[0]).clip(min=0)  # onsets only
    return (env - env.mean()) / (env.std() + 1e-9)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("camera")
    ap.add_argument("audio")
    ap.add_argument("--seconds", type=float, default=240, help="how much of each file to compare")
    ap.add_argument("--max-offset", type=float, default=300)
    a = ap.parse_args()

    cam = envelope(a.camera, a.seconds + a.max_offset)
    aud = envelope(a.audio, a.seconds + a.max_offset)
    n = 1 << int(np.ceil(np.log2(cam.size + aud.size)))
    corr = np.fft.irfft(np.fft.rfft(cam, n) * np.conj(np.fft.rfft(aud, n)), n)
    lags = np.concatenate([np.arange(0, n // 2), np.arange(-n // 2, 0)])
    keep = np.abs(lags) <= a.max_offset * ENV_RATE
    corr, lags = corr[keep], lags[keep]
    best = int(np.argmax(corr))
    offset = lags[best] / ENV_RATE
    conf = (corr[best] - np.median(corr)) / (corr.std() + 1e-9)
    print(f"OFFSET {offset:+.3f}  (camera_time = audio_time {offset:+.3f}s)  confidence {conf:.1f}")
    if conf < 6:
        print("low confidence: check by ear, or record a clap at the start next time")


if __name__ == "__main__":
    main()
