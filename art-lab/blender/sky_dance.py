"""Sky Dance: the Blender (type A) backgrounds, in the approved cel look. See story/shotlist.md.

    python blender/sky_dance.py --shot S01 --out sky.png [--size 1920x1080] [--samples 16]
    python blender/sky_dance.py --shot S04 --out peaks.png --no-clouds --objects-only     # the peaks alone, transparent sky
    python blender/sky_dance.py --shot cloud --seed 3 --out cloud_3.png --size 2400x1200  # one cloud as a sprite

Shots: S01 above the clouds, S04 the great peak from below, S05 open sea, cloud = a single cloud on a
transparent ground. The figure is not in these frames; he is drawn in code and laid over them.
For motion, render the background with --no-clouds and move cloud sprites over it.
"""
import argparse
import math
import os
import random
import sys

import bpy
import bmesh
from mathutils import Vector

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib'))
import cel_look as cel  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
ap = argparse.ArgumentParser()
ap.add_argument('--shot', required=True, choices=['S01', 'S04', 'S05', 'cloud'])
ap.add_argument('--seed', type=int, default=1, help='which cloud, for --shot cloud')
ap.add_argument('--px', type=float, default=2.4, help='line width for --shot cloud')
ap.add_argument('--no-clouds', action='store_true', help='leave the clouds out (they are added as moving sprites)')
ap.add_argument('--out', required=True)
ap.add_argument('--palette', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'look', 'palettes', 'azure_sky.json'))
ap.add_argument('--size', default='1920x1080')
ap.add_argument('--samples', type=int, default=16)
ap.add_argument('--objects-only', action='store_true', help='transparent sky: a layer to put in front of things that pass behind clouds or peaks')
args = ap.parse_args(argv)
W, H = (int(v) for v in args.size.split('x'))

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
cel.setup_scene(scene, W, H, samples=args.samples)
pal = cel.load_palette(args.palette)
col = scene.collection
subjects = []


def mesh_obj(name, bm, mats, smooth=False):
    me = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = smooth
    for m in (mats if isinstance(mats, (list, tuple)) else [mats]):
        me.materials.append(m)
    o = bpy.data.objects.new(name, me)
    col.objects.link(o)
    return o


M = {k: cel.toon_material(k, *pal[k]) for k in ('cloud', 'mountain', 'snow', 'ocean')}
far_a, far_b = cel.flat_material('far_a', pal['far'][0]), cel.flat_material('far_b', pal['far'][1])
wave_a, wave_b = cel.flat_material('wave_a', pal['wave'][0]), cel.flat_material('wave_b', pal['wave'][1])


def camera(loc, target, lens):
    data = bpy.data.cameras.new('cam')
    data.lens = lens
    data.clip_end = 2000
    cam = bpy.data.objects.new('cam', data)
    col.objects.link(cam)
    cam.location = loc
    cam.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    bpy.context.view_layer.update()
    return cam


def cloud(name, loc, size, seed, puffs=9, stretch=2.3, px=2.4, force=False):
    """A cumulus: a row of overlapping balls, bigger in the middle, with a flat base."""
    if args.no_clouds and not force:
        return None
    r = random.Random(seed)
    bm = bmesh.new()
    for i in range(puffs):
        u = (i / (puffs - 1)) * 2 - 1
        rad = (0.5 + 0.8 * (1 - u * u)) * r.uniform(0.78, 1.15)
        c = Vector((u * stretch + r.uniform(-0.2, 0.2), r.uniform(-0.45, 0.45), rad * 0.5 + r.uniform(0, 0.5) * (1 - abs(u))))
        g = bmesh.ops.create_icosphere(bm, subdivisions=3, radius=rad)
        bmesh.ops.translate(bm, verts=g['verts'], vec=c)
    for v in bm.verts:
        v.co.z = max(v.co.z, 0.0)
    o = mesh_obj(name, bm, M['cloud'], smooth=True)
    o.location, o.scale = loc, (size, size, size * 0.9)
    subjects.append((o, px))
    return o


def bank(name, y, z0, z1, mat, seed, width=900, bumps=26):
    """Far cloud bank: one flat scalloped silhouette."""
    r = random.Random(seed)
    bm = bmesh.new()
    pts = []
    for i in range(bumps):
        cx = -width / 2 + width * (i + 0.5) / bumps
        rad = width / bumps * r.uniform(0.55, 0.95)
        top = z1 + r.uniform(-0.25, 0.25) * (z1 - z0)
        for k in range(7):
            a = math.pi * (1 - k / 6)
            pts.append((cx + math.cos(a) * rad, top + math.sin(a) * rad * 0.55))
    top_v = [bm.verts.new((x, y, z)) for x, z in pts]
    bot_v = [bm.verts.new((x, y, z0)) for x, _ in pts]
    for i in range(len(pts) - 1):
        bm.faces.new((bot_v[i], bot_v[i + 1], top_v[i + 1], top_v[i]))
    return mesh_obj(name, bm, mat)


def peak(name, loc, radius, height, seed, snow_from=0.6, segs=20, rings=9, ridges=6, px=2.4):
    """A faceted mountain: rings of points around an axis, pushed out along a few buttress ridges.
    Flat shading turns every facet into either the base or the shadow tone."""
    r = random.Random(seed)
    bm = bmesh.new()
    phase = r.uniform(0, 6.28)
    grid = []
    for i in range(rings):
        t = i / rings
        ring = []
        for j in range(segs):
            th = 2 * math.pi * j / segs
            ridge = abs(math.sin(ridges * 0.5 * th + phase)) ** 0.7
            rr = radius * (1 - t) ** 0.82 * (0.66 + 0.5 * ridge) * r.uniform(0.9, 1.1)
            z = height * t + r.uniform(-0.4, 0.4) * (height / rings) * (0.3 + ridge)
            ring.append(bm.verts.new((math.cos(th) * rr, math.sin(th) * rr, z)))
        grid.append(ring)
    apex = bm.verts.new((r.uniform(-0.4, 0.4), r.uniform(-0.4, 0.4), height))
    for i in range(rings - 1):
        for j in range(segs):
            a, b2 = grid[i][j], grid[i][(j + 1) % segs]
            c, d = grid[i + 1][(j + 1) % segs], grid[i + 1][j]
            tris = ((a, b2, c), (a, c, d)) if (i + j) % 2 else ((a, b2, d), (b2, c, d))
            for tri in tris:
                bm.faces.new(tri)
    for j in range(segs):
        bm.faces.new((grid[-1][j], grid[-1][(j + 1) % segs], apex))
    for f in bm.faces:
        cz = f.calc_center_median().z / height
        f.material_index = 1 if cz > snow_from + r.uniform(-0.07, 0.07) else 0
    o = mesh_obj(name, bm, [M['mountain'], M['snow']])
    o.location = loc
    subjects.append((o, px))
    return o


if args.shot == 'S01':
    cam = camera((0, -34, 1.5), (0, 0, 3.0), 32)
    cloud('c_near_l', (-14.5, -9, -8.2), 4.8, 1, puffs=10)
    cloud('c_near_r', (16, -5, -9.6), 5.4, 2, puffs=10)
    cloud('c_mid_r', (9, 16, -4.5), 3.4, 3)
    cloud('c_mid_l', (-12, 26, -2.2), 3.0, 4)
    cloud('c_far_a', (3, 58, -0.5), 3.4, 5, px=2.0)
    cloud('c_far_b', (-34, 74, 2.0), 4.2, 6, px=2.0)
    cloud('c_far_c', (38, 86, 1.0), 4.8, 7, px=2.0)
    bank('bank_far', 420, -160, -52, far_b, 11, width=1900, bumps=30)
    bank('bank_near', 300, -150, -64, far_a, 12, width=1500, bumps=22)
    cel.set_world(scene, pal['sky_top'], pal['sky_bottom'], horizon=-0.05, top=0.36)
    limits = (40.0, 75.0, 150.0)

elif args.shot == 'S04':
    cam = camera((-5, -44, -5.0), (5, 4, 11.0), 22)
    peak('peak', (9, 8, -12), 27, 47, 5, snow_from=0.52)
    peak('shoulder_l', (-34, 40, -12), 20, 26, 8, snow_from=0.66, px=2.0)
    peak('shoulder_r', (46, 52, -12), 24, 25, 9, snow_from=0.68, px=2.0)
    cloud('c_base_l', (-25, -14, -11.5), 5.0, 21, puffs=10)
    cloud('c_base_r', (27, -18, -12.5), 5.4, 22, puffs=10)
    cloud('c_base_m', (2, -20, -15.0), 5.0, 23, puffs=11)
    cloud('c_high', (-22, 12, 10.0), 2.4, 24, px=2.0)
    bank('bank_far', 380, -120, -40, far_b, 13, width=1700, bumps=26)
    cel.set_world(scene, pal['sky_top'], pal['sky_bottom'], horizon=-0.1, top=0.62)
    limits = (45.0, 70.0, 150.0)

elif args.shot == 'S05':
    cam = camera((0, -30, 9.5), (0, 110, 7.0), 28)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=4000)
    mesh_obj('ocean', bm, M['ocean'])
    # long swell lines: wide dark bands that shrink toward the horizon and give the sea its depth
    r = random.Random(7)
    bm = bmesh.new()
    y = -18.0
    while y < 1400:
        depth = (1.0 + (y + 18) / 26) * r.uniform(0.5, 1.0)
        for _ in range(r.randint(1, 3)):
            cx = r.uniform(-1, 1) * (30 + (y + 18) * 0.9)
            ln = r.uniform(10, 34) * (1 + (y + 18) / 40)
            g = bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
            bmesh.ops.scale(bm, verts=g['verts'], vec=(ln, depth, 1))
            bmesh.ops.translate(bm, verts=g['verts'], vec=(cx, y, 0.01))
        y += depth * r.uniform(2.6, 4.2)
    mesh_obj('waves_swell', bm, wave_b)
    for mat, count, seed in ((wave_a, 230, 1), (wave_b, 120, 2)):
        r = random.Random(seed)
        bm = bmesh.new()
        for _ in range(count):
            y = -22 + (r.random() ** 2.2) * 700
            grow = 1 + (y + 22) / 55
            x = r.uniform(-1, 1) * (30 + (y + 22) * 0.8)
            ln, wd = r.uniform(1.0, 7.5) * grow, r.uniform(0.08, 0.26) * grow
            g = bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
            bmesh.ops.scale(bm, verts=g['verts'], vec=(ln, wd, 1))
            bmesh.ops.translate(bm, verts=g['verts'], vec=(x, y, 0.03))
        mesh_obj('waves_' + mat.name, bm, mat)
    peak('island', (420, 1500, -4), 150, 200, 5, snow_from=0.5, px=1.8)
    cloud('c_far_a', (-330, 1150, 0), 62, 31, px=1.8, puffs=11, force=True)
    cloud('c_far_b', (120, 1250, 0), 80, 32, px=1.8, puffs=12, force=True)
    cloud('c_far_c', (760, 1300, 0), 58, 33, px=1.8, force=True)
    bank('bank_far', 1900, -20, 30, far_a, 14, width=7600, bumps=46)
    cel.set_world(scene, pal['sky_top'], pal['sky_bottom'], horizon=0.0, top=0.4)
    limits = (100.0, 600.0, 4000.0)

else:  # one cloud alone, as a sprite to move in the edit
    cam = camera((0, -26, 1.0), (0, 0, 1.25), 105)
    cloud('sprite', (0, 0, 0), 1.0, args.seed, puffs=9 + args.seed % 3, px=args.px, force=True)
    cel.set_world(scene, pal['sky_top'], pal['sky_bottom'])
    args.objects_only = True
    limits = (100.0, 200.0, 400.0)

cel.add_sun(scene, pal['sun_elevation_deg'], pal['sun_azimuth_deg'])
bpy.context.view_layer.update()
cel.outline_bands(scene, cam, subjects, pal['line'], limits=limits)

if args.objects_only:
    scene.render.film_transparent = True
    scene.render.image_settings.color_mode = 'RGBA'
    for name in ('bank_far', 'bank_near', 'ocean', 'waves_wave_a', 'waves_wave_b', 'waves_swell'):
        if name in bpy.data.objects:
            bpy.data.objects[name].hide_render = True
scene.render.filepath = os.path.abspath(args.out)
bpy.ops.render.render(write_still=True)
print('saved', scene.render.filepath)
