"""CEL_LOOK.md Step 1: the look test. One simple original scene, rendered as a still in a given palette.

    python blender/look_test.py --palette look/palettes/amber_day.json --out still_day.png [--outline hull|lineart|none] [--size 1920x1080]

(Run with a Python that has the `bpy` module, or as `blender --background --python blender/look_test.py -- ...`.)
Scene: a low-angle look across a plain at a small three-legged beacon (the man-made object, which
carries the accent), faceted rocks, a crystal cluster, far ridges and a big pale disc in the sky.
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
ap.add_argument('--palette', required=True)
ap.add_argument('--out', required=True)
ap.add_argument('--outline', default='lineart', choices=['hull', 'lineart', 'none'])
ap.add_argument('--size', default='1920x1080')
ap.add_argument('--samples', type=int, default=16)
args = ap.parse_args(argv)
W, H = (int(v) for v in args.size.split('x'))

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
cel.setup_scene(scene, W, H, samples=args.samples)
pal = cel.load_palette(args.palette)
col = scene.collection


def link(obj):
    col.objects.link(obj)
    return obj


def mesh_obj(name, bm, mat, smooth=False):
    me = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = smooth
    me.materials.append(mat)
    return link(bpy.data.objects.new(name, me))


M = {k: cel.toon_material(k, *pal[k]) for k in ('ground', 'rock', 'crystal', 'metal')}
far_a, far_b = cel.flat_material('far_a', pal['far'][0]), cel.flat_material('far_b', pal['far'][1])
disc_m = cel.flat_material('disc', pal['disc'])
accent = cel.flat_material('accent', pal['accent'])

# camera first: outline widths are measured from it
cam_data = bpy.data.cameras.new('cam')
cam_data.lens = 30
cam_data.dof.use_dof = False
cam = link(bpy.data.objects.new('cam', cam_data))
cam.location = (-2.4, -10.5, 0.62)
target = Vector((0.55, 0.0, 2.25))
cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
scene.camera = cam
bpy.context.view_layer.update()
subjects = []  # (object, outline px)

# ground
bm = bmesh.new()
bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=400)
mesh_obj('ground', bm, M['ground'])


def rock(name, seed, loc, size, squash=(1.0, 0.85, 0.7)):
    r = random.Random(seed)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0)
    for v in bm.verts:
        v.co *= 1.0 + r.uniform(-0.22, 0.26)
        v.co.x *= squash[0]
        v.co.y *= squash[1]
        v.co.z = max(v.co.z * squash[2], -0.28)
    o = mesh_obj(name, bm, M['rock'])
    o.location, o.scale = loc, (size, size, size)
    o.rotation_euler[2] = r.uniform(0, 6.28)
    return o


subjects += [(rock('rock_near', 3, (-4.2, -5.6, 0.25), 1.55, (1.25, 0.9, 0.62)), 2.5),
             (rock('rock_mid', 8, (3.9, -1.4, 0.18), 0.95), 2.2),
             (rock('rock_small', 12, (-1.3, -2.6, 0.08), 0.42), 2.0),
             (rock('rock_back', 21, (-7.5, 7.0, 0.5), 2.6, (1.5, 1.0, 0.75)), 2.0)]


def crystal(name, loc, radius, height, tilt_deg, turn_deg):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=radius, radius2=radius * 0.82, depth=height)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, height / 2))
    tip = bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=radius * 0.82, radius2=0.0, depth=height * 0.32)
    bmesh.ops.translate(bm, verts=tip['verts'], vec=(0, 0, height + height * 0.16))
    o = mesh_obj(name, bm, M['crystal'])
    o.location = loc
    o.rotation_euler = (math.radians(tilt_deg), 0, math.radians(turn_deg))
    return o


for i, (dx, dy, rad, hgt, tilt, turn) in enumerate([(0, 0, 0.55, 4.6, 7, 20), (0.9, 0.3, 0.38, 3.0, 22, 110), (-0.8, 0.5, 0.42, 3.5, 17, 250), (0.3, -0.6, 0.26, 1.7, 30, 170), (-0.45, -0.5, 0.22, 1.2, 34, 300)]):
    subjects.append((crystal(f'crystal_{i}', (5.2 + dx, 4.6 + dy, -0.1), rad, hgt, tilt, turn), 2.0))


# the beacon: an original three-legged survey lantern. Its lamp band is the accent.
def cyl(name, p0, p1, r0, r1, mat, seg=20, smooth=True):
    p0, p1 = Vector(p0), Vector(p1)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r0, radius2=r1, depth=(p1 - p0).length)
    o = mesh_obj(name, bm, mat, smooth=smooth)
    o.location = (p0 + p1) / 2
    o.rotation_euler = (p1 - p0).to_track_quat('Z', 'Y').to_euler()
    if smooth:
        es = o.modifiers.new('edges', 'EDGE_SPLIT')
        es.split_angle = math.radians(40)
    return o


B = Vector((0.55, 0.0, 0.0))
parts = []
for k in range(3):
    a = math.radians(90 + 120 * k)
    foot = B + Vector((math.cos(a) * 1.05, math.sin(a) * 1.05, 0.0))
    parts.append(cyl(f'leg_{k}', foot, B + Vector((math.cos(a) * 0.16, math.sin(a) * 0.16, 1.5)), 0.055, 0.04, M['metal'], seg=10))
    parts.append(cyl(f'foot_{k}', foot, foot + Vector((0, 0, 0.07)), 0.15, 0.13, M['metal'], seg=12))
parts.append(cyl('hub', B + Vector((0, 0, 1.42)), B + Vector((0, 0, 1.72)), 0.30, 0.36, M['metal']))
parts.append(cyl('body_low', B + Vector((0, 0, 1.72)), B + Vector((0, 0, 2.02)), 0.46, 0.46, M['metal']))
lamp = cyl('lamp', B + Vector((0, 0, 2.02)), B + Vector((0, 0, 2.34)), 0.40, 0.40, accent)
parts.append(cyl('body_top', B + Vector((0, 0, 2.34)), B + Vector((0, 0, 2.62)), 0.46, 0.40, M['metal']))
parts.append(cyl('cap', B + Vector((0, 0, 2.62)), B + Vector((0, 0, 2.86)), 0.40, 0.10, M['metal']))
parts.append(cyl('mast', B + Vector((0, 0, 2.86)), B + Vector((0, 0, 4.55)), 0.028, 0.02, M['metal'], seg=8))
parts.append(cyl('arm', B + Vector((0, 0, 3.55)), B + Vector((0.62, -0.1, 3.86)), 0.02, 0.02, M['metal'], seg=8))
parts.append(cyl('dish', B + Vector((0.62, -0.1, 3.86)), B + Vector((0.70, -0.16, 3.93)), 0.05, 0.24, M['metal'], seg=18))
parts.append(cyl('tip', B + Vector((0, 0, 4.55)), B + Vector((0, 0, 4.66)), 0.06, 0.06, accent, seg=10))
subjects += [(p, 2.5) for p in parts] + [(lamp, 2.5)]


# far ridges: flat silhouettes, lighter with distance (depth by layering, not fog)
def ridge(name, y, base_z, profile, mat):
    bm = bmesh.new()
    top = [bm.verts.new((x, y, z)) for x, z in profile]
    bot = [bm.verts.new((x, y, base_z)) for x, _ in profile]
    for i in range(len(profile) - 1):
        bm.faces.new((bot[i], bot[i + 1], top[i + 1], top[i]))
    return mesh_obj(name, bm, mat)


ridge('ridge_far', 150, -2, [(-260, 9), (-190, 13), (-150, 26), (-118, 27), (-96, 14), (-40, 11), (-8, 19), (22, 20), (48, 11), (120, 9), (170, 22), (215, 23), (260, 10)], far_b)
ridge('ridge_near', 85, -2, [(-160, 5), (-120, 6), (-98, 15), (-70, 16), (-52, 7), (10, 5), (62, 6), (84, 13), (118, 14), (150, 6), (190, 5)], far_a)
bm = bmesh.new()
bmesh.ops.create_circle(bm, cap_ends=True, segments=72, radius=34)
disc = mesh_obj('sky_disc', bm, disc_m)
disc.location = (-62, 230, 44)
disc.rotation_euler = (math.radians(90), 0, 0)

cel.set_world(scene, pal['sky_top'], pal['sky_bottom'])
cel.add_sun(scene, pal['sun_elevation_deg'], pal['sun_azimuth_deg'])

bpy.context.view_layer.update()
THIN = ('mast', 'arm', 'tip')  # thinner than two line widths: Line Art would swallow them, so they get a hull line
if args.outline == 'hull':
    for obj, px in subjects:
        cel.outline_hull(obj, pal['line'], px=px, camera=cam, scene=scene)
elif args.outline == 'lineart':
    # one Line Art object per distance band, so the line is the same width on screen near and far
    bands = {}
    for obj, px in subjects:
        if obj.name in THIN:
            cel.outline_hull(obj, pal['line'], px=1.6, camera=cam, scene=scene)
            continue
        dist = (obj.matrix_world.translation - cam.matrix_world.translation).length
        key = 'near' if dist < 7.5 else 'mid' if dist < 13 else 'far'
        bands.setdefault(key, []).append((obj, dist, px))
    for key, items in bands.items():
        c = bpy.data.collections.new('band_' + key)
        col.children.link(c)
        for obj, _, _ in items:
            col.objects.unlink(obj)
            c.objects.link(obj)
        mean = sum(d for _, d, _ in items) / len(items)
        # a near object sits partly even closer to the camera than its centre, so lean its distance down
        cel.outline_lineart(scene, pal['line'], px=max(p for _, _, p in items), camera=cam, distance=mean * (0.8 if key == 'near' else 1.0), collection=c)

scene.render.filepath = os.path.abspath(args.out)
bpy.ops.render.render(write_still=True)
print('view transform used:', scene.view_settings.view_transform, '| saved', scene.render.filepath)
