"""Indra's Net — an endless lattice of glass jewels, each one holding the reflections of all the others.

Ray-traced in Cycles, so the reflections are real: the concept is the render.
Runs headless either way:
  blender -b -P indras_net.py -- --out renders/indra --frames 150 --fps 30 --res 1920x1080 --samples 96
  python indras_net.py --out renders/indra --frames 8 --res 960x540 --samples 32      (pip install bpy)
Then use the PNG sequence in Remotion (<Img src={staticFile(`indra/${String(frame+1).padStart(4,'0')}.png`)}>)
or encode: ffmpeg -framerate 30 -i renders/indra/%04d.png -c:v libx264 -crf 16 -pix_fmt yuv420p indra.mp4

Tune: --palette lapis|plum|jade|ember, --grid 6x4x8, --seed, --still N (render one frame only).
"""
import argparse
import math
import os
import random
import sys

import bpy
from mathutils import Vector

PALETTES = {  # world bottom, world top, jewel tints, thread/core colour
    "lapis": ((0.002, 0.003, 0.012), (0.012, 0.03, 0.14), [(0.55, 0.7, 1.0), (1.0, 0.86, 0.55), (0.95, 0.95, 1.0)], (1.0, 0.72, 0.28)),
    "plum": ((0.02, 0.004, 0.02), (0.16, 0.03, 0.14), [(1.0, 0.6, 0.75), (1.0, 0.8, 0.6), (0.9, 0.85, 1.0)], (1.0, 0.45, 0.25)),
    "jade": ((0.003, 0.02, 0.016), (0.02, 0.14, 0.11), [(0.6, 1.0, 0.85), (0.95, 1.0, 0.8), (0.85, 0.95, 1.0)], (0.85, 1.0, 0.7)),
    "ember": ((0.01, 0.01, 0.01), (0.07, 0.05, 0.05), [(1.0, 0.7, 0.55), (1.0, 0.9, 0.8), (0.8, 0.8, 0.85)], (1.0, 0.35, 0.15)),
}


def args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="renders/indra")
    ap.add_argument("--frames", type=int, default=150)
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--res", default="1920x1080")
    ap.add_argument("--samples", type=int, default=96)
    ap.add_argument("--palette", default="lapis", choices=PALETTES)
    ap.add_argument("--grid", default="6x4x9")
    ap.add_argument("--density", type=float, default=0.62, help="share of lattice points that hold a jewel")
    ap.add_argument("--seed", type=int, default=7)
    ap.add_argument("--fstop", type=float, default=0.5, help="lower = more bokeh (scene is small, so values are tiny)")
    ap.add_argument("--still", type=int, default=0, help="render only this frame number")
    ap.add_argument("--threads", type=int, default=0)
    return ap.parse_args(argv)


def principled(name, **inputs):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    for k, v in inputs.items():
        if k in b.inputs:
            b.inputs[k].default_value = v
    return m


def main():
    a = args()
    random.seed(a.seed)
    bottom, top, tints, gold = PALETTES[a.palette]
    gx, gy, gz = (int(v) for v in a.grid.split("x"))
    w, h = (int(v) for v in a.res.split("x"))

    bpy.ops.wm.read_factory_settings(use_empty=True)
    s = bpy.context.scene
    s.render.engine = "CYCLES"
    c = s.cycles
    c.samples = a.samples
    c.use_denoising = True
    c.max_bounces = 10
    c.transmission_bounces = 10
    c.glossy_bounces = 6
    c.sample_clamp_indirect = 6
    c.caustics_reflective = False
    c.caustics_refractive = False
    if a.threads:
        s.render.threads_mode = "FIXED"
        s.render.threads = a.threads
    s.render.resolution_x, s.render.resolution_y = w, h
    s.render.fps = a.fps
    s.frame_start, s.frame_end = 1, a.frames
    s.render.image_settings.file_format = "PNG"
    s.view_settings.look = "AgX - Medium High Contrast" if "AgX" in s.view_settings.view_transform else s.view_settings.look

    # World: vertical gradient, dark at the horizon so highlights read as light.
    world = bpy.data.worlds.new("sky")
    s.world = world
    world.use_nodes = True
    nt = world.node_tree
    bg = nt.nodes["Background"]
    coord = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = (*bottom, 1)
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = (*top, 1)
    add = nt.nodes.new("ShaderNodeMath")
    add.operation = "MULTIPLY_ADD"
    add.inputs[1].default_value = 0.5
    add.inputs[2].default_value = 0.5
    nt.links.new(coord.outputs["Generated"], sep.inputs[0])
    nt.links.new(sep.outputs["Z"], add.inputs[0])
    nt.links.new(add.outputs[0], ramp.inputs[0])
    nt.links.new(ramp.outputs[0], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 1.0

    # Materials
    glass = [
        principled(f"jewel{i}", **{"Base Color": (*t, 1), "Transmission Weight": 1.0, "Roughness": 0.015, "IOR": 1.52})
        for i, t in enumerate(tints)
    ]
    core = bpy.data.materials.new("core")
    core.use_nodes = True
    cn = core.node_tree
    cn.nodes.remove(cn.nodes["Principled BSDF"])
    em = cn.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (*gold, 1)
    em.inputs["Strength"].default_value = 14
    cn.links.new(em.outputs[0], cn.nodes["Material Output"].inputs["Surface"])
    thread = principled("thread", **{"Base Color": (*gold, 1), "Metallic": 1.0, "Roughness": 0.35,
                                      "Emission Color": (*gold, 1), "Emission Strength": 0.25})

    # One jewel mesh + one core mesh, shared by every instance; each jewel picks its own tint.
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=0.42)
    jewel_src = bpy.context.object
    bpy.ops.object.shade_smooth()
    jewel_src.data.materials.append(glass[0])
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.032)
    core_src = bpy.context.object
    core_src.data.materials.append(core)

    sp = 2.6
    pts = {}
    for i in range(gx):
        for j in range(gy):
            for k in range(gz):
                p = Vector(((i - (gx - 1) / 2) * sp, k * sp, (j - (gy - 1) / 2) * sp))
                p += Vector((random.uniform(-0.12, 0.12), random.uniform(-0.12, 0.12), random.uniform(-0.12, 0.12)))
                if abs(p.x) < 0.9 and abs(p.z) < 0.7:  # keep the camera's corridor clear
                    continue
                if random.random() > a.density:  # gaps: space is part of the picture
                    continue
                pts[(i, j, k)] = p
                o = bpy.data.objects.new("jewel", jewel_src.data)
                o.location = p
                sc = random.uniform(0.75, 1.15)
                o.scale = (sc, sc, sc)
                s.collection.objects.link(o)
                o.material_slots[0].link = "OBJECT"
                o.material_slots[0].material = random.choice(glass)
                o2 = bpy.data.objects.new("core", core_src.data)
                o2.location = p
                s.collection.objects.link(o2)
    jewel_src.hide_render = True
    core_src.hide_render = True

    # The hero: one jewel off-centre that the lens holds in focus for the whole move.
    hero = bpy.data.objects.new("hero", jewel_src.data)
    hero.location = (0.78, 5.6, -0.3)
    hero.scale = (1.25, 1.25, 1.25)
    s.collection.objects.link(hero)
    hero.material_slots[0].link = "OBJECT"
    hero.material_slots[0].material = glass[0]
    hero_core = bpy.data.objects.new("hero_core", core_src.data)
    hero_core.location = hero.location
    s.collection.objects.link(hero_core)

    # Threads between neighbours: one curve object with many 2-point splines.
    cu = bpy.data.curves.new("threads", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = 0.0028
    cu.bevel_resolution = 2
    for (i, j, k), p in pts.items():
        for d in ((1, 0, 0), (0, 1, 0), (0, 0, 1)):
            q = pts.get((i + d[0], j + d[1], k + d[2]))
            if q is None:
                continue
            sl = cu.splines.new("POLY")
            sl.points.add(1)
            sl.points[0].co = (*p, 1)
            sl.points[1].co = (*q, 1)
    th = bpy.data.objects.new("threads", cu)
    th.data.materials.append(thread)
    s.collection.objects.link(th)

    # Lights: one cool key from above-left, one warm rim from behind.
    for loc, col, energy, size in (((-7, 3, 8), (0.6, 0.75, 1.0), 1000, 4.5), ((6, gz * sp * 0.8, -4), (1.0, 0.72, 0.42), 1800, 6)):
        ld = bpy.data.lights.new("area", "AREA")
        ld.shape = "DISK"
        ld.energy, ld.color, ld.size = energy, col, size
        lo = bpy.data.objects.new("area", ld)
        lo.location = loc
        s.collection.objects.link(lo)
        lo.rotation_euler = (Vector((0, gz * sp / 2, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()

    # Camera: slow dolly down the corridor with a slight roll; focus stays on the hero jewel.
    cam_d = bpy.data.cameras.new("cam")
    cam_d.lens = 42
    cam_d.dof.use_dof = True
    cam_d.dof.aperture_fstop = a.fstop
    cam_d.dof.aperture_blades = 0
    cam = bpy.data.objects.new("cam", cam_d)
    s.collection.objects.link(cam)
    s.camera = cam
    cam_d.dof.focus_object = hero
    travel = sp * 1.6
    for f, y, roll in ((1, -1.5, -0.05), (a.frames, -1.5 + travel, 0.05)):
        cam.location = (0.0, y, 0.0)
        cam.rotation_euler = (math.radians(90), roll, 0)
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
    for o in (cam,):  # constant-speed drift (Blender 5 keeps F-curves in action layers/slots)
        act = o.animation_data.action
        curves = getattr(act, "fcurves", None)
        if curves is None:
            curves = [fc for layer in act.layers for strip in layer.strips for bag in strip.channelbags for fc in bag.fcurves]
        for fc in curves:
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"

    out = os.path.abspath(a.out)
    os.makedirs(out, exist_ok=True)
    if a.still:
        s.frame_set(a.still)
        s.render.filepath = os.path.join(out, f"{a.still:04d}.png")
        bpy.ops.render.render(write_still=True)
    else:
        s.render.filepath = os.path.join(out, "")
        bpy.ops.render.render(animation=True)
    print("done ->", out)


if __name__ == "__main__":
    main()
