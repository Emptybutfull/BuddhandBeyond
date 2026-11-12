// Small, fast, deterministic noise helpers (no dependencies). Everything is a pure function of its
// inputs, so any frame can be rendered on its own.

export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

// Seeded PRNG (mulberry32) for building particle sets once.
export const prng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const perm = new Uint8Array(512);
{
  const r = prng(1234);
  const p = Array.from({length: 256}, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
}
const g3 = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1];

// 3D simplex noise, range about [-1, 1].
export const simplex3 = (x: number, y: number, z: number): number => {
  const F = 1 / 3;
  const G = 1 / 6;
  const s = (x + y + z) * F;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const k = Math.floor(z + s);
  const t = (i + j + k) * G;
  const x0 = x - (i - t);
  const y0 = y - (j - t);
  const z0 = z - (k - t);
  let i1, j1, k1, i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
    else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
    else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
  } else if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
  else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
  else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];
  const x1 = x0 - i1 + G, y1 = y0 - j1 + G, z1 = z0 - k1 + G;
  const x2 = x0 - i2 + 2 * G, y2 = y0 - j2 + 2 * G, z2 = z0 - k2 + 2 * G;
  const x3 = x0 - 1 + 0.5, y3 = y0 - 1 + 0.5, z3 = z0 - 1 + 0.5;
  const ii = i & 255, jj = j & 255, kk = k & 255;
  const corner = (xx: number, yy: number, zz: number, gi: number) => {
    let tt = 0.6 - xx * xx - yy * yy - zz * zz;
    if (tt < 0) return 0;
    tt *= tt;
    const g = (gi % 12) * 3;
    return tt * tt * (g3[g] * xx + g3[g + 1] * yy + g3[g + 2] * zz);
  };
  return (
    32 *
    (corner(x0, y0, z0, perm[ii + perm[jj + perm[kk]]]) +
      corner(x1, y1, z1, perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]]) +
      corner(x2, y2, z2, perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]]) +
      corner(x3, y3, z3, perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]]))
  );
};

export const fbm3 = (x: number, y: number, z: number, octaves = 3): number => {
  let a = 0.5, f = 1, sum = 0;
  for (let o = 0; o < octaves; o++) {
    sum += a * simplex3(x * f, y * f, z * f);
    a *= 0.5;
    f *= 2;
  }
  return sum;
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
export const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
export const easeInOut = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
