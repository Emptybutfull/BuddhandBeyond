"""Clear-line cel look for Blender (written against 5.2.4 LTS, EEVEE). See CEL_LOOK.md.

    import cel_look as cel
    cel.setup_scene(scene)                      # EEVEE, Standard view transform, no AO / reflections
    pal = cel.load_palette('look/palettes/amber_day.json')
    mat = cel.toon_material('rock', *pal['rock'])       # base tone + exactly one hard shadow tone
    cel.set_world(scene, pal['sky_top'], pal['sky_bottom'])
    cel.add_sun(scene, elevation_deg=27, azimuth_deg=-62)
    cel.outline_hull(obj, pal['line'], px=2.5, camera=cam, scene=scene)     # stable silhouettes
    cel.outline_lineart(scene, pal['line'], px=2.5, camera=cam)             # adds interior lines

How the two-tone works: a white diffuse surface lit by one sun of strength pi returns N.L (0 in cast
shadow). Shader to RGB turns that into a number; a colour ramp with constant interpolation picks the
shadow colour below the threshold and the base colour above it. Lighting only chooses the side; the
palette supplies the colour, so pixels land exactly on the palette (view transform: Standard).
"""
import json
import math

import bpy


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgba(h, alpha=1.0):
    """'#e3ac5f' -> scene-linear RGBA, so the rendered pixel equals the hex under the Standard view transform."""
    h = h.lstrip('#')
    return tuple(srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (alpha,)


def load_palette(path):
    with open(path) as f:
        return json.load(f)


def setup_scene(scene, width=1920, height=1080, fps=24, samples=16):
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.resolution_x, scene.render.resolution_y, scene.render.resolution_percentage = width, height, 100
    scene.render.fps = fps
    scene.render.filter_size = 1.0  # crisper lines than the default 1.5 px
    scene.render.image_settings.file_format = 'PNG'
    scene.render.film_transparent = False
    scene.render.dither_intensity = 0.0  # Blender adds noise to 8-bit output by default; flat colour must stay flat
    vs = scene.view_settings
    vs.view_transform = 'Standard'  # Filmic / AgX reshape colours; the palette must arrive exactly
    vs.look = 'None'
    vs.exposure, vs.gamma = 0.0, 1.0
    ee = scene.eevee
    ee.taa_render_samples = samples
    ee.use_raytracing = False  # no reflections
    ee.use_fast_gi = False  # no ambient occlusion / bounce
    ee.use_shadows = True
    ee.shadow_ray_count, ee.shadow_step_count = 1, 16
    ee.shadow_resolution_scale = 1.0
    return scene


def toon_material(name, base_hex, shadow_hex, threshold=0.42):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    diff = nt.nodes.new('ShaderNodeBsdfDiffuse')
    diff.inputs['Color'].default_value = (1, 1, 1, 1)
    to_rgb = nt.nodes.new('ShaderNodeShaderToRGB')
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.interpolation = 'CONSTANT'
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = hex_rgba(shadow_hex)
    ramp.color_ramp.elements[1].position = threshold
    ramp.color_ramp.elements[1].color = hex_rgba(base_hex)
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    nt.links.new(diff.outputs['BSDF'], to_rgb.inputs['Shader'])
    nt.links.new(to_rgb.outputs['Color'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], out.inputs['Surface'])
    return m


def flat_material(name, hex_color, strength=1.0, backface_culling=False):
    """One flat colour that ignores light: far silhouettes, sky discs, outlines, the accent."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = hex_rgba(hex_color)
    em.inputs['Strength'].default_value = strength
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    m.use_backface_culling = backface_culling
    return m


def set_world(scene, sky_top_hex, sky_bottom_hex, horizon=0.0, top=0.55):
    """The camera sees a soft sky gradient (the one place a gradient is allowed); surfaces receive no
    light from the sky at all, so the sun alone decides base versus shadow."""
    w = bpy.data.worlds.new('cel_world')
    scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    nt.nodes.clear()
    coord = nt.nodes.new('ShaderNodeTexCoord')  # in a world shader, Generated is the view direction
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    rng = nt.nodes.new('ShaderNodeMapRange')
    rng.inputs['From Min'].default_value, rng.inputs['From Max'].default_value = horizon, top
    mix = nt.nodes.new('ShaderNodeMix')
    mix.data_type = 'RGBA'
    mix.inputs['A'].default_value, mix.inputs['B'].default_value = hex_rgba(sky_bottom_hex), hex_rgba(sky_top_hex)
    sky = nt.nodes.new('ShaderNodeBackground')
    dark = nt.nodes.new('ShaderNodeBackground')
    dark.inputs['Color'].default_value = (0, 0, 0, 1)
    lp = nt.nodes.new('ShaderNodeLightPath')
    pick = nt.nodes.new('ShaderNodeMixShader')
    out = nt.nodes.new('ShaderNodeOutputWorld')
    nt.links.new(coord.outputs['Generated'], sep.inputs['Vector'])
    nt.links.new(sep.outputs['Z'], rng.inputs['Value'])
    nt.links.new(rng.outputs['Result'], mix.inputs['Factor'])
    nt.links.new(mix.outputs['Result'], sky.inputs['Color'])
    nt.links.new(lp.outputs['Is Camera Ray'], pick.inputs['Fac'])
    nt.links.new(dark.outputs['Background'], pick.inputs[1])
    nt.links.new(sky.outputs['Background'], pick.inputs[2])
    nt.links.new(pick.outputs['Shader'], out.inputs['Surface'])
    return w


def add_sun(scene, elevation_deg=30.0, azimuth_deg=-60.0):
    """One key light with hard shadows. Azimuth 0 = light travelling toward +Y, negative = from the left."""
    light = bpy.data.lights.new('key_sun', 'SUN')
    light.energy = math.pi  # so a facing white surface returns exactly 1.0
    light.angle = 0.0
    light.use_shadow = True
    light.use_shadow_jitter = False
    light.shadow_filter_radius = 0.0
    light.shadow_maximum_resolution = 0.0002  # finer shadow map: clean terminator edges on small parts
    obj = bpy.data.objects.new('key_sun', light)
    scene.collection.objects.link(obj)
    el, az = math.radians(elevation_deg), math.radians(azimuth_deg)
    # a sun points along its local -Z; aim it down at the given elevation, turned by the azimuth
    obj.rotation_euler = (math.radians(90) - el, 0.0, az)
    return obj


def px_to_world(px, distance, camera, scene):
    cam = camera.data
    return px * distance * cam.sensor_width / (cam.lens * scene.render.resolution_x)


def outline_hull(obj, line_hex, px=2.5, camera=None, scene=None, thickness=None):
    """Inverted hull: a slightly larger, inside-out copy in the line colour. Silhouette lines only,
    but fast and rock steady in motion. Thickness is set so the line is `px` wide at the object's
    distance from the camera."""
    if thickness is None:
        dist = (obj.matrix_world.translation - camera.matrix_world.translation).length
        thickness = px_to_world(px, dist, camera, scene)
    line = bpy.data.materials.get('cel_line_' + line_hex) or flat_material('cel_line_' + line_hex, line_hex, backface_culling=True)
    line.use_backface_culling_shadow = True
    obj.data.materials.append(line)
    mod = obj.modifiers.new('cel_outline', 'SOLIDIFY')
    mod.thickness = thickness
    mod.offset = 1.0
    mod.use_flip_normals = True
    mod.use_rim = False
    mod.material_offset = len(obj.data.materials) - 1
    mod.use_quality_normals = True
    return mod


def outline_lineart(scene, line_hex, px=2.5, camera=None, distance=10.0, crease_deg=140.0, intersections=False, collection=None):
    """Grease Pencil Line Art: contours plus creases, so forms get interior lines.
    Line Art thickness is in world units, so a near object would get a heavier line than a far one.
    Give each distance band its own collection and call this once per band with that band's distance:
    the line then stays about `px` wide on screen everywhere.
    Bake it (Object > Line Art > Bake) before rendering animation, or the lines can shimmer."""
    bpy.ops.object.grease_pencil_add(type='LINEART_SCENE')
    gp = bpy.context.object
    gp.name = 'cel_lineart' + ('_' + collection.name if collection else '')
    mod = gp.modifiers[0]
    if collection is not None:
        mod.source_type = 'COLLECTION'
        mod.source_collection = collection
    mod.radius = px_to_world(px, distance, camera, scene)  # measured on 5.2.4: this value gives a line about px wide
    mod.use_contour = True
    mod.use_crease = True
    mod.crease_threshold = math.radians(crease_deg)
    if hasattr(mod, 'use_intersection'):
        mod.use_intersection = intersections
    gp.show_in_front = False
    gm = gp.data.materials[0].grease_pencil
    gm.color = hex_rgba(line_hex)
    return gp


def outline_bands(scene, camera, subjects, line_hex, thin=(), limits=(7.5, 13.0, 40.0)):
    """Outline a list of (object, px) pairs with Line Art at an even on-screen width: objects are grouped
    into distance bands, each band gets its own Line Art object. Names in `thin` get a hull line instead
    (parts thinner than two line widths vanish under Line Art)."""
    root = scene.collection
    bands = {}
    for obj, px in subjects:
        if obj.name in thin:
            outline_hull(obj, line_hex, px=min(px, 1.6), camera=camera, scene=scene)
            continue
        dist = (obj.matrix_world.translation - camera.matrix_world.translation).length
        key = sum(dist > lim for lim in limits)
        bands.setdefault(key, []).append((obj, dist, px))
    made = []
    for key, items in sorted(bands.items()):
        c = bpy.data.collections.new('band_%d' % key)
        root.children.link(c)
        for obj, _, _ in items:
            for uc in list(obj.users_collection):
                uc.objects.unlink(obj)
            c.objects.link(obj)
        mean = sum(d for _, d, _ in items) / len(items)
        made.append(outline_lineart(scene, line_hex, px=max(p for _, _, p in items), camera=camera, distance=mean * (0.8 if key == 0 else 1.0), collection=c))
    return made
