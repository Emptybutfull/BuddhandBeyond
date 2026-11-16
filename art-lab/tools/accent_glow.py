#!/usr/bin/env python3
"""Glow on the accent colour only (CEL_LOOK.md: glow is the one soft element, and only on the accent).

    python tools/accent_glow.py in.png out.png --accent ffb347 [--strength 0.8] [--radius 28] [--tolerance 40]

The accent colour is unique in a frame by rule, so it can be keyed by colour: pixels close to it make
the mask, the mask is blurred at two sizes, and the blur is added back in the accent colour. The same
step works on Blender renders, layered stills and AI clips, so every source gets an identical glow.
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('dst')
ap.add_argument('--accent', required=True)
ap.add_argument('--strength', type=float, default=0.8)
ap.add_argument('--radius', type=float, default=28, help='px at 1080p; scaled with the frame')
ap.add_argument('--tolerance', type=float, default=40)
a = ap.parse_args()
im = Image.open(a.src).convert('RGB')
px = np.asarray(im).astype(float)
acc = np.array([int(a.accent[i:i + 2], 16) for i in (0, 2, 4)], float)
mask = (np.abs(px - acc).max(2) < a.tolerance).astype(float)
k = im.height / 1080
m = Image.fromarray((mask * 255).astype('uint8'))
near = np.asarray(m.filter(ImageFilter.GaussianBlur(a.radius * 0.35 * k))).astype(float) / 255
wide = np.asarray(m.filter(ImageFilter.GaussianBlur(a.radius * 1.6 * k))).astype(float) / 255
glow = np.clip(0.55 * near + 1.1 * wide, 0, 1) * a.strength
out = 255 - (255 - px) * (1 - glow[..., None] * (acc / 255))  # screen blend in the accent colour
Image.fromarray(out.clip(0, 255).astype('uint8')).save(a.dst)
print(f'accent pixels: {100 * mask.mean():.2f}% of frame -> {a.dst}')
