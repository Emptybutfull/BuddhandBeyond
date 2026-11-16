#!/usr/bin/env python3
"""Contact sheet: images in a grid with a caption under each.

    python tools/contact_sheet.py out.jpg --cols 3 --width 640 a.png:"caption a" b.png:"caption b" ...
"""
import argparse
from PIL import Image, ImageDraw, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument('out')
ap.add_argument('items', nargs='+')
ap.add_argument('--cols', type=int, default=3)
ap.add_argument('--width', type=int, default=640)
a = ap.parse_args()
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 20)
except OSError:
    font = ImageFont.load_default()
cells = []
for it in a.items:
    path, _, cap = it.partition(':')
    im = Image.open(path).convert('RGB')
    im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
    cells.append((im, cap))
ch = max(im.height for im, _ in cells) + 40
rows = (len(cells) + a.cols - 1) // a.cols
pad = 10
sheet = Image.new('RGB', (a.cols * (a.width + pad) + pad, rows * (ch + pad) + pad), (24, 24, 24))
d = ImageDraw.Draw(sheet)
for i, (im, cap) in enumerate(cells):
    x = pad + (i % a.cols) * (a.width + pad)
    y = pad + (i // a.cols) * (ch + pad)
    sheet.paste(im, (x, y))
    d.text((x + 2, y + im.height + 8), cap, fill=(230, 230, 230), font=font)
sheet.save(a.out, quality=90)
print(a.out, sheet.size)
