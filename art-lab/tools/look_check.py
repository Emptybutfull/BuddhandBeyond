#!/usr/bin/env python3
"""Self-check for the cel look (CEL_LOOK.md Step 1). Numbers catch drift; eyes judge the design.

    python tools/look_check.py frame.png [--sky 0.42]

Reports how many colours cover 95% of the pixels (expect about a dozen or fewer, plus the line colour)
and how much of the frame is a soft gradient where it should be flat. --sky is the fraction of the
frame height, from the top, to leave out of the gradient check (a sky gradient is allowed).
"""
import argparse
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('image')
ap.add_argument('--sky', type=float, default=0.0)
a = ap.parse_args()
im = Image.open(a.image).convert('RGB')
im = im.resize((960, round(im.height * 960 / im.width)), Image.BOX)
px = np.asarray(im).astype(int)
H = px.shape[0]
body = px[int(H * a.sky):]

# colour clusters: snap to a 16-level grid per channel, then merge neighbours greedily
q = (body // 16).reshape(-1, 3)
keys, counts = np.unique(q, axis=0, return_counts=True)
order = np.argsort(-counts)
clusters = []
for i in order:
    k, c = keys[i], counts[i]
    for cl in clusters:
        if np.abs(cl['k'] - k).max() <= 1:
            cl['n'] += c
            break
    else:
        clusters.append({'k': k, 'n': c})
clusters.sort(key=lambda c: -c['n'])
total, run, need = q.shape[0], 0, 0
for cl in clusters:
    run += cl['n']
    need += 1
    if run >= 0.95 * total:
        break
print(f'colour clusters covering 95% of pixels: {need}  (expect roughly a dozen or fewer)')
for cl in clusters[:need]:
    r, g, b = (cl['k'] * 16 + 8).clip(0, 255)
    print(f'  #{r:02x}{g:02x}{b:02x}  {100 * cl["n"] / total:5.1f}%')

# soft gradients: pixels whose neighbours differ a little (not flat, not a hard edge)
g = body.astype(float).mean(2)
dx = np.abs(np.diff(g, axis=1))[:-1]
dy = np.abs(np.diff(g, axis=0))[:, :-1]
grad = np.maximum(dx, dy)
flat, soft, edge = (grad < 0.5).mean(), ((grad >= 0.5) & (grad < 6)).mean(), (grad >= 6).mean()
print(f'flat {100 * flat:.1f}%   soft gradient {100 * soft:.1f}%   hard edge {100 * edge:.1f}%   (below the top {a.sky:.0%})')
print('soft gradient above ~3% outside the sky usually means shading is not constant' if soft > 0.03 else 'flat regions are flat')
