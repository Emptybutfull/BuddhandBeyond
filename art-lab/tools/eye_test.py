#!/usr/bin/env python3
"""The eye test from ART_LAB.md Part 2: shrink a still to 320 px wide, convert to greyscale, and report
what a small screen would see. Numbers only catch facts; open the output image and look at it too.

    python tools/eye_test.py still.png [--accent ffb060] [--out eye.png]

Prints: where the brightest point is, how much of the frame is bright, the contrast, and (with --accent)
how much of the frame carries the accent colour. Writes a side-by-side image: colour thumb | grey thumb.
"""
import argparse
import colorsys
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('image')
ap.add_argument('--accent', help='accent colour as hex, e.g. ffb060')
ap.add_argument('--out')
a = ap.parse_args()

im = Image.open(a.image).convert('RGB')
w = 320
h = round(im.height * w / im.width)
small = im.resize((w, h), Image.LANCZOS)
grey = small.convert('L')
g = np.asarray(grey).astype(float) / 255
blur = np.asarray(grey.filter(ImageFilter.GaussianBlur(4))).astype(float) / 255
by, bx = np.unravel_index(np.argmax(blur), blur.shape)
print(f'brightest point: x {bx / w:.2f}, y {by / h:.2f} of the frame (0,0 = top left), value {blur.max():.2f}')
print(f'luminance: mean {g.mean():.3f}, 5th pct {np.percentile(g, 5):.3f}, 95th pct {np.percentile(g, 95):.3f}, max {g.max():.2f}')
print(f'bright area (>0.5): {100 * (g > 0.5).mean():.1f}% of frame; dark area (<0.1): {100 * (g < 0.1).mean():.1f}%')
if a.accent:
    r0, g0, b0 = (int(a.accent[i:i + 2], 16) / 255 for i in (0, 2, 4))
    h0 = colorsys.rgb_to_hsv(r0, g0, b0)[0]
    rgb = np.asarray(small).astype(float) / 255
    mx, mn = rgb.max(2), rgb.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    hue = np.zeros_like(mx)
    d = np.maximum(mx - mn, 1e-6)
    rr, gg, bb = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    hue = np.where(mx == rr, ((gg - bb) / d) % 6, np.where(mx == gg, (bb - rr) / d + 2, (rr - gg) / d + 4)) / 6
    dh = np.minimum(abs(hue - h0), 1 - abs(hue - h0))
    acc = (dh < 0.06) & (sat > 0.35) & (mx > 0.25)
    print(f'accent #{a.accent}: {100 * acc.mean():.2f}% of frame (clearly coloured, clearly lit pixels)')
if a.out:
    sheet = Image.new('RGB', (w * 2 + 12, h + 8), (30, 30, 30))
    sheet.paste(small, (4, 4))
    sheet.paste(grey.convert('RGB'), (w + 8, 4))
    sheet.save(a.out)
