#!/usr/bin/env python3
"""Score and sound effects for the Awakening film, synthesised from nothing (numpy only).

Why synthesise: every hit is placed by the same cue sheet as the picture
(template-additions/src/design/awakening/Awakening.tsx, CUE), so the bowl lands on the cycle
change and the boom on the frame the hand touches the earth. No licences, no Content ID.

    python awakening_score.py --out out_dir
      -> awakening_full.wav   music + effects, about -14 LUFS, peaks under -1 dB
         awakening_music.wav  pads, drones, melody only
         awakening_sfx.wav    bowls, hits, whooshes, ticks only (to lay under other music)

Use other music (an AI track, a licensed track) and keep the synced effects:
    ffmpeg -i track.mp3 -ar 48000 -ac 2 -c:a pcm_s16le bed.wav
    python awakening_score.py --out out_dir --bed bed.wav --bed-at 20 --transpose 2
  --bed-at   second of the film where the track starts (the synth music plays before it)
  --transpose  semitones, so the bowls and bells match the track's key (the script is in D)
  The track is muted for the silence at 76-80 s and faded back in.

60 BPM, key of D. 48 kHz stereo, 120 s. Change CUE here and in Awakening.tsx together.
"""
import argparse
import os
import wave

import numpy as np

SR = 48000
DUR = 120.0
CUE = dict(mara=14, close=18, touch=20, first=24, second=44, eye=48, third=64, stop=76, dawn=80, face=88, open=92, awake=94, light=100, noform=112, seed=118, end=120)
TAU = 2 * np.pi
TRANSPOSE = 0  # semitones, set by --transpose

NOTE = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11}


def hz(name):
    """'F#4' -> frequency."""
    return 440.0 * 2 ** ((NOTE[name[:-1]] + 12 * (int(name[-1]) + 1) - 69 + TRANSPOSE) / 12)


def tt(dur):
    return np.arange(int(dur * SR)) / SR


def pan(sig, p):
    a = (p + 1) * np.pi / 4
    return np.stack([sig * np.cos(a), sig * np.sin(a)], axis=1)


def norm(x):
    return x / (np.max(np.abs(x)) + 1e-12)


def fade(x, a=0.005, r=0.02):
    n = len(x)
    na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    env = np.ones(n)
    if na:
        env[:na] = 0.5 - 0.5 * np.cos(np.pi * np.arange(na) / na)
    if nr:
        env[n - nr:] *= 0.5 + 0.5 * np.cos(np.pi * np.arange(nr) / nr)
    return x * (env if x.ndim == 1 else env[:, None])


def band(x, lo, hi):
    """Zero-phase band-pass by masking the spectrum (soft edges)."""
    n = len(x)
    X = np.fft.rfft(x, axis=0)
    f = np.fft.rfftfreq(n, 1 / SR)
    with np.errstate(divide='ignore'):
        lf = np.log2(np.maximum(f, 1e-6))
    m = 1 / (1 + np.exp(-(lf - np.log2(lo)) * 6)) * 1 / (1 + np.exp((lf - np.log2(hi)) * 6))
    return np.fft.irfft(X * (m if x.ndim == 1 else m[:, None]), n, axis=0)


def noise(dur, lo, hi, seed, stereo=False):
    rng = np.random.default_rng(seed)
    n = int(dur * SR)
    x = rng.standard_normal((n, 2) if stereo else n)
    return norm(band(x, lo, hi))


def convolve(a, b):
    n = len(a) + len(b) - 1
    size = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(a, size) * np.fft.rfft(b, size), size)[:n]


# ---------- instruments ----------
def pad(notes, dur, a=2.5, r=3.0, bright=0.5, seed=0, voices=3):
    """Slow additive pad: detuned voices, a few harmonics each, wide."""
    t = tt(dur)
    rng = np.random.default_rng(seed)
    out = np.zeros((len(t), 2))
    for name in notes:
        f = hz(name) if isinstance(name, str) else name
        for _ in range(voices):
            det = 2 ** (rng.uniform(-7, 7) / 1200)
            sig = np.zeros(len(t))
            for h in range(1, 11):
                if f * h > 7000:
                    break
                sig += np.sin(TAU * f * det * h * t + rng.uniform(0, TAU)) / h ** (1.75 - 0.7 * bright)
            lfo = 0.72 + 0.28 * np.sin(TAU * rng.uniform(0.04, 0.17) * t + rng.uniform(0, TAU))
            out += pan(sig * lfo, rng.uniform(-0.85, 0.85))
    return fade(norm(out), a, r)


def bowl(f0, dur=10.0, seed=0):
    """Singing bowl: a few inharmonic partials, each a pair that beats slowly."""
    t = tt(dur)
    rng = np.random.default_rng(seed)
    out = np.zeros((len(t), 2))
    for ratio, amp, tau in [(1.0, 1.0, dur * 0.3), (2.71, 0.42, dur * 0.19), (5.18, 0.2, dur * 0.1), (8.2, 0.07, dur * 0.05)]:
        f = f0 * ratio
        beat = rng.uniform(0.5, 2.2)
        for ch in range(2):
            ph = rng.uniform(0, TAU, 2)
            out[:, ch] += amp * np.exp(-t / tau) * (np.sin(TAU * (f - beat / 2) * t + ph[0]) + np.sin(TAU * (f + beat / 2) * t + ph[1])) * 0.5
    strike = noise(0.06, 1500, 6000, seed + 9) * np.exp(-tt(0.06) / 0.012) * 0.2
    out[: len(strike)] += strike[:, None]
    return fade(norm(out), 0.002, 0.3)


def gong(f0, dur=9.0, seed=0):
    t = tt(dur)
    rng = np.random.default_rng(seed)
    out = np.zeros((len(t), 2))
    for i, ratio in enumerate([1, 1.48, 2.02, 2.74, 3.36, 4.12, 5.43, 6.8, 8.3]):
        tau = dur * 0.28 / (1 + 0.35 * i)
        bloom = 1 - np.exp(-t / (0.02 + 0.03 * i))  # high partials speak a little late
        for ch in range(2):
            out[:, ch] += (1 / (1 + i) ** 0.9) * bloom * np.exp(-t / tau) * np.sin(TAU * f0 * ratio * (1 + rng.uniform(-0.004, 0.004)) * t + rng.uniform(0, TAU))
    return fade(norm(out), 0.001, 0.4)


def boom(dur=3.2, f_end=40.0, f_start=130.0, tau=0.95, seed=3):
    """Sub drop with enough harmonics to read on a phone speaker."""
    t = tt(dur)
    f = f_end + (f_start - f_end) * np.exp(-t / 0.07)
    body = np.sin(TAU * np.cumsum(f) / SR) * np.exp(-t / tau)
    body = np.tanh(body * 2.2) / np.tanh(2.2)
    thump = noise(dur, 60, 500, seed) * np.exp(-t / 0.12) * 0.7
    crack = noise(dur, 1800, 9000, seed + 1) * np.exp(-t / 0.018) * 0.5
    return fade(norm(body + thump + crack), 0.0005, 0.3)


def kick(f_end=48.0, dur=0.5, soft=False):
    t = tt(dur)
    f = f_end + (70 if soft else 110) * np.exp(-t / 0.035)
    x = np.sin(TAU * np.cumsum(f) / SR) * np.exp(-t / (0.16 if soft else 0.12))
    return fade(norm(np.tanh(x * 1.8)), 0.001, 0.05)


def tick(f=2600.0, dur=0.05):
    t = tt(dur)
    return norm(np.sin(TAU * f * t) * np.exp(-t / 0.006) + 0.3 * np.sin(TAU * f * 2.3 * t) * np.exp(-t / 0.003))


def wood(f=880.0, dur=0.12):
    t = tt(dur)
    return norm(np.sin(TAU * f * t) * np.exp(-t / 0.022) + 0.5 * np.sin(TAU * f * 2.41 * t) * np.exp(-t / 0.012))


def ping(f, dur=2.4):
    """Glassy bell."""
    t = tt(dur)
    x = np.sin(TAU * f * t) * np.exp(-t / (dur * 0.22)) + 0.3 * np.sin(TAU * f * 2.76 * t) * np.exp(-t / (dur * 0.09)) + 0.1 * np.sin(TAU * f * 5.4 * t) * np.exp(-t / (dur * 0.04))
    return fade(norm(x), 0.002, 0.2)


def pluck(f, dur=3.0):
    """Soft felt-piano-like note."""
    t = tt(dur)
    x = np.zeros(len(t))
    for h in range(1, 9):
        if f * h > 7000:
            break
        x += np.sin(TAU * f * h * (1 + 0.0004 * h * h) * t) / h ** 2.1 * np.exp(-t / (1.1 / h ** 0.6))
    return fade(norm(x), 0.006, 0.3)


def whoosh(dur=1.3, lo=250.0, hi=7000.0, up=True, seed=0, width=0.2):
    """Noise sweep: a bank of noise bands that peak one after another."""
    n = int(dur * SR)
    u = np.arange(n) / n
    out = np.zeros((n, 2))
    cents = np.geomspace(lo, hi, 9)
    for k, fc in enumerate(cents):
        pos = k / (len(cents) - 1)
        centre = 0.15 + 0.7 * (pos if up else 1 - pos)
        env = np.exp(-((u - centre) / width) ** 2)
        out += noise(dur, fc / 1.25, fc * 1.25, seed * 31 + k, stereo=True) * env[:, None]
    return norm(out * (np.sin(np.pi * u) ** 0.7)[:, None])


def swell(dur=0.45, lo=1500.0, hi=9000.0, seed=0):
    """Reverse-cymbal style rise that ends hard."""
    t = tt(dur)
    return norm(noise(dur, lo, hi, seed) * np.exp((t - dur) / (dur * 0.28)))


def growl(dur, f0=36.71, harmonics=24, trem=7.0, seed=0):
    """Mara: two low saws a semitone apart, shaking."""
    t = tt(dur)
    x = np.zeros(len(t))
    for f in (f0, f0 * 2 ** (1 / 12), f0 * 2 ** (6 / 12) * 2):
        wob = 1 + 0.004 * np.sin(TAU * 0.31 * t + f)
        ph = TAU * np.cumsum(f * wob) / SR
        for h in range(1, harmonics + 1):
            x += np.sin(ph * h) / h
    x *= 0.6 + 0.4 * np.sin(TAU * trem * t)
    return norm(np.tanh(norm(x) * 2.5))


# ---------- mixing ----------
class Stem:
    """Three time sections with their own reverb, so sound can stop dead at 20 s and 76 s."""

    def __init__(self):
        n = int((DUR + 8) * SR)
        self.dry = [np.zeros((n, 2)) for _ in range(3)]
        self.wet = [np.zeros((n, 2)) for _ in range(3)]

    def add(self, sig, at, gain=1.0, p=0.0, send=0.3):
        if sig.ndim == 1:
            sig = pan(sig, p)
        s = 0 if at < CUE['touch'] else 1 if at < CUE['stop'] else 2
        i = int(round(at * SR))
        j = min(len(self.dry[s]), i + len(sig))
        self.dry[s][i:j] += sig[: j - i] * gain
        self.wet[s][i:j] += sig[: j - i] * gain * send


def reverb_ir(t60=4.2, seed=5):
    n = int(5.0 * SR)
    t = tt(5.0)
    ir = np.zeros((n, 2))
    for lo, hi, k in [(60, 700, 1.0), (700, 3500, 0.75), (3500, 12000, 0.4)]:
        ir += noise(5.0, lo, hi, seed + int(lo), stereo=True) * np.exp(-t / (t60 * k / 6.9))[:, None] * (1.0 if lo < 3000 else 0.6)
    pre = int(0.028 * SR)
    ir = np.concatenate([np.zeros((pre, 2)), ir])[:n]
    return ir / np.sqrt(np.sum(ir ** 2, axis=0))


def render(stem, ir, wet_gain=0.9):
    n = int(DUR * SR)
    out = np.zeros((n, 2))
    t = np.arange(n) / SR
    gates = [
        np.clip((19.93 - t) / 0.13, 0, 1) ** 2,  # the vacuum before the touch
        np.where(t < CUE['stop'] - 0.003, 1.0, 0.0),  # it stops
        np.ones(n),
    ]
    for s in range(3):
        mix = stem.dry[s].copy()
        if np.any(stem.wet[s]):
            for ch in range(2):
                mix[:, ch] += wet_gain * convolve(stem.wet[s][:, ch], ir[:, ch])[: len(mix)]
        out += mix[:n] * gates[s][:, None]
    return out


def master_eq(x, tilt_db_per_oct=2.6, lo=180.0, hi=3000.0, hp=32.0):
    """Tilt the whole mix brighter between `lo` and `hi`, and remove rumble below `hp`.
    Measured against a reference track: without it the mix is ~10 dB dull at 1–4 kHz (mud on a phone)."""
    n = len(x)
    X = np.fft.rfft(x, axis=0)
    f = np.maximum(np.fft.rfftfreq(n, 1 / SR), 1e-6)
    db = tilt_db_per_oct * np.clip(np.log2(f / lo), 0, np.log2(hi / lo))
    db -= 6 * np.clip(np.log2(f / 6000.0), 0, 2)  # ease off the very top
    g = 10 ** (db / 20) / np.sqrt(1 + (hp / f) ** 4)
    return np.fft.irfft(X * g[:, None], n, axis=0)


def limiter(x, ceiling=0.86, look_ms=6, release=0.35):
    """Look-ahead peak limiter working on 1 ms blocks."""
    blk = SR // 1000
    nb = len(x) // blk
    peak = np.max(np.abs(x[: nb * blk]).reshape(nb, blk, 2), axis=(1, 2))
    need = np.minimum(1.0, ceiling / np.maximum(peak, 1e-9))
    ahead = need.copy()
    for k in range(1, look_ms + 1):
        ahead[:-k] = np.minimum(ahead[:-k], need[k:])
    g = np.empty(nb)
    cur, c = 1.0, np.exp(-1 / (release * 1000))
    for i in range(nb):
        cur = ahead[i] if ahead[i] < cur else 1 - (1 - cur) * c
        cur = min(cur, ahead[i])
        g[i] = cur
    g = np.convolve(g, np.ones(3) / 3, mode='same')
    gain = np.interp(np.arange(len(x)), (np.arange(nb) + 0.5) * blk, g)
    return x * gain[:, None]


def lufs_ish(x):
    """Rough gated loudness (K-weighting approximated by a 100 Hz–8 kHz tilt). Good to ±1 dB."""
    y = band(x, 90, 12000)
    blk = int(0.4 * SR)
    hop = blk // 4
    ms = np.array([np.mean(y[i:i + blk] ** 2) * 2 for i in range(0, len(y) - blk, hop)])
    l = -0.691 + 10 * np.log10(ms + 1e-12)
    keep = l > -70
    rel = -0.691 + 10 * np.log10(np.mean(ms[keep])) - 10
    keep = keep & (l > rel)
    return -0.691 + 10 * np.log10(np.mean(ms[keep]))


def write_wav(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def read_wav(path):
    with wave.open(path, 'rb') as w:
        assert w.getframerate() == SR and w.getnchannels() == 2 and w.getsampwidth() == 2, 'bed must be 48 kHz, stereo, 16-bit (see the ffmpeg line at the top)'
        return np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2) / 32768.0


def js_prng(seed):
    """mulberry32, identical to noise.ts prng(), so arrow times match the picture."""
    M = 0xFFFFFFFF
    a = seed & M

    def r():
        nonlocal a
        a = (a + 0x6D2B79F5) & M
        t = ((a ^ (a >> 15)) * (1 | a)) & M
        t = ((t + (((t ^ (t >> 7)) * (61 | t)) & M)) & M) ^ t
        return ((t ^ (t >> 14)) & M) / 4294967296

    return r


# ---------- the cue sheet as sound ----------
def build():
    music, sfx = Stem(), Stem()
    rng = np.random.default_rng(42)

    # seed pulses: once a second at the start, and again at the very end so the loop closes
    for b in [0, 1, 2, 3, 4, 5, CUE['seed'], CUE['seed'] + 1]:
        sfx.add(kick(soft=True), b, 0.5, send=0.25)
        sfx.add(ping(hz('D5'), 1.6), b, 0.1, p=0.0, send=0.6)
    music.add(pad(['D2', 'A2', 'D3'], 16, a=5, r=4, bright=0.2, seed=1), 0.5, 0.2, send=0.4)

    # cycle 1: the man sits
    sfx.add(bowl(hz('D3'), 11, seed=1), 8, 0.28, send=0.5)
    music.add(pad(['D3', 'A3', 'E4', 'F4'], 8.5, a=3, r=2.5, bright=0.35, seed=2), 7.5, 0.2, send=0.5)
    for at, n in [(9, 'A4'), (10, 'D5'), (11, 'F5'), (12.5, 'E5')]:
        music.add(pluck(hz(n)), at, 0.14, p=rng.uniform(-0.4, 0.4), send=0.6)

    # Mara
    g = growl(4.0, seed=1) * np.linspace(0.25, 1.0, int(4.0 * SR)) ** 1.5
    music.add(fade(g, 0.4, 0.12), 14, 0.5, send=0.25)
    music.add(fade(pad([hz('Eb5'), hz('E5'), hz('A5'), hz('Bb5')], 4.0, a=2.5, r=0.1, bright=0.9, seed=3), 0.1, 0.1), 14, 0.15, send=0.4)
    sfx.add(fade(noise(4.0, 80, 900, 11, stereo=True) * (np.linspace(0.1, 1, int(4.0 * SR)) ** 2)[:, None], 0.2, 0.1), 14, 0.2, send=0.2)
    for i, at in enumerate([15, 16, 17]):
        sfx.add(swell(0.5, seed=20 + i), at - 0.5, 0.2, p=(-0.5, 0.5, 0)[i], send=0.3)
        sfx.add(boom(1.6, f_end=46, f_start=150, tau=0.4, seed=30 + i), at, 0.8, send=0.25)
    r = js_prng(31)
    for i in range(13):
        ang = -np.pi * 0.5 + (1 if i % 2 else -1) * (0.25 + r() * 2.3)
        at = 14.7 + i * 0.3 + r() * 0.12
        r(); r()
        if at + 0.3 > 19.7:
            continue
        side = float(np.clip(np.cos(ang) * 1.2, -0.9, 0.9))
        sfx.add(whoosh(0.32, 900, 9000, up=False, seed=40 + i, width=0.3), at, 0.11, send=0.15)
        sfx.add(wood(520 + 60 * (i % 4)), at + 0.3, 0.22, p=side, send=0.3)
    # the close-up: the noise goes far away, a heartbeat, then nothing
    music.add(fade(growl(1.9, harmonics=5, trem=3.0, seed=2), 0.1, 0.25), 18, 0.2, send=0.3)
    for at in (18.3, 19.1, 19.55):
        sfx.add(kick(soft=True), at, 0.5, send=0.1)
        sfx.add(kick(soft=True), at + 0.2, 0.34, send=0.1)
    music.add(fade(np.sin(TAU * hz('D5') * tt(1.7)) * np.linspace(0, 1, int(1.7 * SR)) ** 2, 0.01, 0.05), 18.2, 0.07, send=0.5)

    # the touch
    T = CUE['touch']
    sfx.add(boom(4.0, f_end=38, f_start=140, tau=1.2), T, 1.0, send=0.3)
    sfx.add(gong(hz('D2'), 10, seed=2), T, 0.5, send=0.5)
    sfx.add(bowl(hz('D3'), 10, seed=3), T + 0.02, 0.3, send=0.5)
    sfx.add(whoosh(1.7, 150, 5000, up=False, seed=7, width=0.28), T + 0.08, 0.3, send=0.3)
    for i in range(12):  # petals
        n = ['D5', 'E5', 'A5', 'B5', 'D6', 'E6', 'A5', 'F#5'][int(rng.integers(0, 8))]
        sfx.add(ping(hz(n), 2.0), T + 0.7 + i * 0.26 + rng.uniform(0, 0.1), 0.07, p=rng.uniform(-0.8, 0.8), send=0.7)
    music.add(pad(['D3', 'A3', 'E4'], 5.0, a=2.0, r=2.0, bright=0.3, seed=4), T + 1.0, 0.16, send=0.5)

    # the ring that carries each cycle through him
    for at, note, gain in [(CUE['first'], 'D3', 0.34), (CUE['second'], 'F3', 0.32), (CUE['third'], 'A2', 0.34), (CUE['dawn'], 'A3', 0.22), (CUE['light'], 'D4', 0.3), (CUE['noform'], 'D4', 0.22)]:
        sfx.add(bowl(hz(note), 11, seed=int(at)), at, gain, send=0.5)
        sfx.add(whoosh(1.4, 200, 6500, up=True, seed=int(at), width=0.24), at - 0.1, 0.13, send=0.3)

    # cycle 2: first watch. D minor, a slow motif with echoes, a tick for each life flowing back
    music.add(pad(['D2', 'D3', 'A3', 'C4', 'E4', 'F4'], 9.5, a=2.5, r=2.5, bright=0.4, seed=5), 24, 0.24, send=0.5)
    music.add(pad(['Bb1', 'Bb2', 'F3', 'A3', 'D4'], 9.5, a=2.5, r=2.5, bright=0.4, seed=6), 31.5, 0.25, send=0.5)
    music.add(pad(['G2', 'D3', 'Bb3', 'F4', 'A4'], 6.0, a=2.0, r=2.5, bright=0.5, seed=7), 39.5, 0.24, send=0.5)
    motif = [(26, 'A4'), (27, 'D5'), (28, 'E5'), (30, 'F5'), (31, 'E5'), (32, 'D5'), (34, 'A4'), (35, 'Bb4'), (36, 'D5'), (38, 'F5'), (39, 'A5'), (40, 'Bb5'), (41, 'A5'), (42, 'F5'), (43, 'D5')]
    for k, (at, n) in enumerate(motif):
        for e, eg in enumerate([1.0, 0.42, 0.18]):
            music.add(pluck(hz(n)), at + e * 0.75, 0.15 * eg, p=(-0.5, 0.5)[(k + e) % 2] * (0.3 + 0.3 * e), send=0.6)
    for k in range(1, 16):
        tau = (-0.35 + np.sqrt(0.1225 + 0.08 * k)) / 0.04
        if tau < 19.6:
            sfx.add(tick(1800 + 90 * k), 24 + tau, 0.07, p=(-0.6, 0.6)[k % 2], send=0.5)

    # cycle 3: second watch. opens to major; one line rises, one falls
    music.add(pad(['F2', 'C3', 'A3', 'E4', 'G4'], 5.5, a=2.0, r=2.0, bright=0.4, seed=8), 43.5, 0.22, send=0.5)
    music.add(pad(['C2', 'C3', 'G3', 'D4', 'E4', 'G4'], 9.5, a=1.2, r=2.5, bright=0.55, seed=9), 47.8, 0.26, send=0.5)
    music.add(pad(['F2', 'C3', 'A3', 'E4', 'B4'], 9.5, a=2.5, r=3.0, bright=0.5, seed=10), 55.5, 0.25, send=0.5)
    sfx.add(boom(2.4, f_end=44, f_start=90, tau=0.7, seed=5), CUE['eye'], 0.5, send=0.3)
    sfx.add(swell(1.2, 800, 7000, seed=6), CUE['eye'] - 1.2, 0.1, send=0.4)
    sfx.add(gong(hz('C3'), 7, seed=4), CUE['eye'], 0.2, send=0.6)
    rise = ['G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6']
    rise2 = ['F4', 'G4', 'A4', 'B4', 'C5', 'E5', 'G5', 'A5']
    for start, notes, left in [(49.5, rise, True), (53, rise[::-1], False), (57.5, rise2, True), (60.5, rise2[::-1], False)]:
        for i, n in enumerate(notes):
            music.add(ping(hz(n), 2.2), start + i * 0.375, 0.085, p=-0.6 if left else 0.6, send=0.7)
    sfx.add(whoosh(0.5, 300, 3000, up=False, seed=57, width=0.3), 56.8, 0.08, send=0.3)  # the eye blinks

    # cycle 4: third watch. a pedal note, a pulse that doubles and doubles, each link firing faster
    music.add(pad(['A1', 'A2', 'G3', 'Bb3', 'D4'], 7.0, a=2.0, r=1.5, bright=0.55, seed=11), 64, 0.2, send=0.4)
    cresc = pad(['A1', 'A2', 'E3', 'G3', 'Bb3', 'C#4', 'E4'], 6.6, a=1.5, r=0.01, bright=0.8, seed=12)
    music.add(cresc * (np.linspace(0.45, 1.0, len(cresc)) ** 2)[:, None], 69.5, 0.44, send=0.4)
    beats = [64 + i for i in range(6)] + [70 + i * 0.5 for i in range(8)] + [74 + i * 0.25 for i in range(8)]
    for at in beats:
        music.add(kick(f_end=55), at, 0.26 + 0.5 * ((at - 64) / 12) ** 1.5, send=0.12)
    for k in range(1, 44):
        tau = (-1 + np.sqrt(1 + 0.88 * k)) / 0.44
        if tau < 11.95:
            a = TAU * (k % 12) / 12
            sfx.add(wood(700 + 40 * (k % 12)), 64 + tau, 0.09 + 0.1 * tau / 12, p=0.8 * np.sin(a), send=0.25)
    t6 = tt(6.0)
    glide = hz('A3') * 2 ** (2 * (t6 / 6.0) ** 1.6)
    riser = sum(np.sin(TAU * np.cumsum(glide * d) / SR) for d in (0.994, 1.0, 1.007)) * (0.7 + 0.3 * np.sin(TAU * np.cumsum(4 + 12 * (t6 / 6.0) ** 2) / SR))
    music.add(fade(norm(riser) * (t6 / 6.0) ** 2, 0.5, 0.002), 70, 0.3, send=0.4)
    nz = noise(6.0, 400, 9000, 13, stereo=True) * ((t6 / 6.0) ** 2.5)[:, None]
    sfx.add(fade(nz, 0.5, 0.002), 70, 0.26, send=0.2)

    # it stops: one dry snap, then almost nothing; twelve small lights going out
    S = CUE['stop']
    sfx.add(wood(1500, 0.08), S, 0.3, send=0.0)
    for k in range(12):
        n = ['A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3'][k]
        sfx.add(ping(hz(n), 1.2), S + 0.9 + k * 0.22, 0.06, p=0.5 * np.cos(TAU * k / 12), send=0.5)
    music.add(fade(np.sin(TAU * hz('A4') * tt(3.6)) * 0.5 + np.sin(TAU * hz('E5') * tt(3.6)) * 0.25, 1.5, 1.5), S + 0.6, 0.035, send=0.8)

    # cycle 5: before dawn, the morning star, then the eyes open
    music.add(pad(['D2', 'A2', 'D3'], 13, a=4, r=3, bright=0.2, seed=13), 80, 0.17, send=0.4)
    music.add(pad(['A3', 'D4', 'E4'], 9, a=3, r=3, bright=0.35, seed=14), 80.5, 0.14, send=0.6)
    for at, n in [(81, 'A6'), (83, 'E6'), (85, 'A6'), (87, 'D7')]:
        sfx.add(ping(hz(n), 3.0), at, 0.09, p=0.45, send=0.8)
    sus = pad(['A2', 'E3', 'A3', 'D4', 'E4', 'A4'], 4.6, a=2.5, r=0.6, bright=0.6, seed=15)
    music.add(sus * (np.linspace(0.4, 1, len(sus)) ** 1.3)[:, None], 87.6, 0.26, send=0.5)
    sfx.add(swell(1.6, 600, 8000, seed=16), CUE['open'] - 1.6, 0.11, send=0.5)

    O = CUE['open']
    sfx.add(bowl(hz('D3'), 13, seed=7), O, 0.5, send=0.5)
    sfx.add(bowl(hz('D4'), 10, seed=8), O, 0.3, send=0.6)
    music.add(pad(['D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4', 'E5'], 5.0, a=0.6, r=2.0, bright=0.7, seed=16), O, 0.34, send=0.5)
    A = CUE['awake']
    sfx.add(boom(3.5, f_end=37, f_start=110, tau=1.1, seed=8), A, 0.8, send=0.3)
    sfx.add(gong(hz('D2'), 10, seed=9), A, 0.42, send=0.5)
    sfx.add(fade(noise(3.0, 3000, 12000, 17, stereo=True) * np.exp(-tt(3.0) / 0.8)[:, None], 0.002, 0.3), A, 0.14, send=0.5)
    music.add(pad(['D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4', 'E5'], 3.2, a=0.3, r=1.5, bright=0.8, seed=17), A, 0.34, send=0.5)
    music.add(pad(['D2', 'G2', 'D3', 'G3', 'B3', 'D4', 'G4', 'B4'], 3.0, a=1.0, r=1.5, bright=0.7, seed=18), 96, 0.32, send=0.5)
    music.add(pad(['D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4', 'A4'], 3.6, a=1.0, r=2.0, bright=0.7, seed=19), 97.9, 0.32, send=0.5)
    for at, n in [(94, 'A5'), (95, 'F#5'), (95.5, 'E5'), (96, 'D5'), (97, 'B4'), (98, 'A4'), (98.5, 'D5'), (99, 'F#5'), (99.5, 'A5')]:
        music.add(ping(hz(n), 3.0), at, 0.15, p=rng.uniform(-0.3, 0.3), send=0.7)
        music.add(pluck(hz(n) / 2), at, 0.1, send=0.6)

    # cycle 6: body of light. Lydian shimmer; one bell for each emanation
    music.add(pad(['D2', 'A2', 'F#3', 'A3', 'C#4', 'E4', 'G#4'], 7.0, a=1.5, r=2.5, bright=0.7, seed=20), 100, 0.3, send=0.5)
    music.add(pad(['D2', 'A2', 'E3', 'G#3', 'B3', 'E4', 'F#4'], 7.2, a=2.0, r=3.0, bright=0.7, seed=21), 105.6, 0.3, send=0.5)
    for i, (at, n) in enumerate([(102, 'D5'), (103, 'E5'), (104, 'F#5'), (105, 'A5')]):
        sfx.add(bowl(hz(n), 6, seed=20 + i), at, 0.26, p=(0.0, -0.6, 0.0, 0.6)[i], send=0.6)
        sfx.add(swell(0.3, 2000, 9000, seed=60 + i), at - 0.3, 0.06, send=0.4)
    for at in np.arange(100.5, 111.6, 0.25):
        if rng.uniform() < 0.72:
            n = ['D6', 'E6', 'F#6', 'A6', 'B6', 'C#7', 'G#6'][int(rng.integers(0, 7))]
            music.add(ping(hz(n), 1.8), at + rng.uniform(-0.02, 0.02), 0.045, p=rng.uniform(-0.9, 0.9), send=0.8)

    # cycle 7: no form. an open fifth, a brush stroke, one last drop
    music.add(pad(['D3', 'A3'], 6.5, a=2.0, r=3.5, bright=0.1, seed=22, voices=2), 111.5, 0.18, send=0.6)
    music.add(fade(np.sin(TAU * hz('D4') * tt(5.0)), 2.0, 2.5), 113.5, 0.05, send=0.8)
    br = noise(1.7, 1200, 6000, 23, stereo=True) * (np.sin(np.pi * np.linspace(0, 1, int(1.7 * SR))) ** 0.6 * (0.7 + 0.3 * np.sin(TAU * 5.3 * tt(1.7))))[:, None]
    sfx.add(br, 114.4, 0.09, send=0.3)
    sfx.add(whoosh(1.3, 300, 3000, up=False, seed=24, width=0.3), 116.3, 0.07, send=0.4)
    sfx.add(ping(hz('D6'), 2.0), 117.6, 0.1, send=0.8)
    music.add(pad(['D2', 'A2', 'D3'], 4.4, a=1.5, r=0.8, bright=0.2, seed=1), 115.6, 0.16, send=0.4)
    return music, sfx


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='.')
    ap.add_argument('--lufs', type=float, default=-14.0)
    ap.add_argument('--transpose', type=int, default=0)
    ap.add_argument('--bed', help='other music to use instead of the synth music (48 kHz stereo wav)')
    ap.add_argument('--bed-at', type=float, default=0.0)
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)
    global TRANSPOSE
    TRANSPOSE = args.transpose

    music, sfx = build()
    ir = reverb_ir()
    m, s = render(music, ir), render(sfx, ir)
    edge = np.ones(len(m))
    nf = int(0.3 * SR)
    edge[-nf:] = np.linspace(1, 0, nf) ** 2  # the tail closes; the loop restarts on the first pulse
    m, s = master_eq(m * edge[:, None]), master_eq(s * edge[:, None])

    if args.bed:
        bed = read_wav(args.bed)
        t = np.arange(len(m)) / SR
        b = np.zeros_like(m)
        i = int(args.bed_at * SR)
        k = min(len(bed), len(b) - i)
        b[i:i + k] = bed[:k]
        hush = np.where((t >= CUE['stop'] - 0.003) & (t < CUE['dawn']), 0.0, 1.0) * np.clip((t - CUE['dawn']) / 1.5, 0, 1) ** np.where(t >= CUE['dawn'], 1.0, 0.0)
        b *= (hush * edge)[:, None]
        b *= 10 ** ((lufs_ish(m) + 1.0 - lufs_ish(b)) / 20)  # sit where the synth music sat
        m = m * (t < args.bed_at)[:, None] + b

    full = m + s
    # bring the mix up into the limiter until the loudness lands on target
    gain = 0.5 / (np.sqrt(np.mean(full ** 2)) * 10)
    for _ in range(8):
        out = limiter(full * gain)
        l = lufs_ish(out)
        if abs(l - args.lufs) < 0.3:
            break
        gain *= 10 ** ((args.lufs - l) / 20)
    print(f'full: {l:.1f} LUFS (approx), peak {20 * np.log10(np.max(np.abs(out))):.1f} dBFS, gain x{gain:.2f}')
    write_wav(os.path.join(args.out, 'awakening_full.wav'), out)
    write_wav(os.path.join(args.out, 'awakening_music.wav'), limiter(m * gain))
    write_wav(os.path.join(args.out, 'awakening_sfx.wav'), limiter(s * gain))


if __name__ == '__main__':
    main()
