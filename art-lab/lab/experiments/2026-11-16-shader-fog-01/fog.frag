// shader-fog-01: a small warm light in drifting fog. One motion: the fog drifts; the light holds.
// Colours are chosen in display space, mixed in linear light, then encoded.

float hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), u.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) { s += a * vnoise(p); p = m * p; a *= 0.5; }
  return s;
}
// one fog layer: warped noise sliding sideways
float fogLayer(vec2 p, float scale, float speed, float seed) {
  // stretched sideways so it reads as mist, not clouds; the warp also changes slowly, so shapes billow
  vec2 q = p * vec2(0.62, 1.35) * scale + vec2(-uTime * speed, uTime * speed * 0.12) + seed;
  vec2 w = vec2(fbm(q + vec2(1.7, 9.2) + 0.021 * uTime), fbm(q + vec2(8.3, 2.8) - 0.017 * uTime));
  return fbm(q + 1.6 * w);
}
vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }

vec3 render(vec2 fragCoord) {
  vec2 p = (fragCoord - 0.5 * uRes) / uRes.y;          // y in -0.5..0.5
  vec2 L = vec2(0.235, -0.045);                          // the light: right of centre, a little low
  float d = length(p - L);

  float far = fogLayer(p, 1.25, 0.010, 1.0);    // slowest, behind the light
  float mid = fogLayer(p, 2.1, 0.030, 7.0);
  float near = fogLayer(p, 2.9, 0.070, 13.0);   // fastest, in front: parallax

  vec3 night = lin(vec3(0.016, 0.022, 0.036));
  vec3 fogCol = lin(vec3(0.26, 0.34, 0.45));
  vec3 amber = lin(vec3(1.0, 0.69, 0.38));
  vec3 hot = lin(vec3(1.0, 0.90, 0.74));

  // cold fog: thick low in the frame like ground mist, thin above, with clear dark gaps
  float low = smoothstep(0.38, -0.42, p.y);
  float fogAmt = 0.55 * smoothstep(0.42, 0.82, far) + 0.40 * smoothstep(0.46, 0.86, mid);
  vec3 col = night + fogCol * fogAmt * (0.10 + 0.55 * low);

  // the light: a tight halo that spreads further where the fog behind it is thicker
  float halo = 0.0030 / (d * d + 0.0030);
  col += amber * halo * (0.30 + 0.9 * far);
  col += amber * 0.016 * exp(-d * 4.5) * (0.5 + mid);
  col += hot * exp(-d * d * 5200.0) * 3.0;

  // fog in front of the light: darker wisps that pass across it
  float occ = smoothstep(0.50, 0.78, near);
  col = mix(col, night * 1.3 + fogCol * 0.045 * (0.3 + low), 0.72 * occ);   // cool, not muddy

  col = 1.0 - exp(-col * 1.35);                          // soft shoulder so the core does not clip hard
  col = pow(col, vec3(1.0 / 2.2));
  // light grain, also the dither that prevents banding in the dark gradients
  float n1 = hash21(fragCoord + 17.0 * uFrame), n2 = hash21(fragCoord * 1.3 + 31.0 * uFrame + 5.0);
  col += (n1 + n2 - 1.0) * (2.4 / 255.0);
  return col;
}
