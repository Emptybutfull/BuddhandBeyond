// Render a GLSL fragment shader to PNG frames, offline, through a headless browser (WebGL2).
// Time comes from the frame number, never the clock, so every render repeats exactly.
//
//   node tools/shader_render.cjs <shader.frag> --out <dir> [--frames 0-239] [--fps 24] [--size 1920x1080] [--dur 10]
//   node tools/shader_render.cjs <shader.frag> --still <file.png> --frame 120
//
// The shader file defines:   vec3 render(vec2 fragCoord)   and may use the uniforms
//   uRes (px), uTime (s) = frame / fps, uFrame, uDur (s, the loop length for periodic terms).
// Output is display-ready 8-bit; dither inside the shader to avoid banding in dark gradients.
// Needs `playwright` (any install that can launch Chromium). No GPU needed: falls back to software.
const fs = require('fs');
const path = require('path');
const {chromium} = require('playwright');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const fragPath = args[0];
if (!fragPath) { console.error('usage: shader_render.cjs <shader.frag> --out <dir> | --still <png>'); process.exit(1); }
const [W, H] = opt('size', '1920x1080').split('x').map(Number);
const fps = Number(opt('fps', 24));
const dur = Number(opt('dur', 10));
const still = opt('still');
let [f0, f1] = (still ? [opt('frame', '0'), opt('frame', '0')] : opt('frames', `0-${Math.round(dur * fps) - 1}`).split('-')).map(Number);
if (Number.isNaN(f1)) f1 = f0;
const outDir = still ? path.dirname(path.resolve(still)) : path.resolve(opt('out', 'frames'));
fs.mkdirSync(outDir, {recursive: true});
const user = fs.readFileSync(fragPath, 'utf8');

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uFrame; uniform float uDur;
out vec4 outColor;
${user}
void main() { outColor = vec4(render(gl_FragCoord.xy), 1.0); }`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 640, height: 360}});
  page.on('console', (m) => console.log('[page]', m.text()));
  const err = await page.evaluate(({W, H, FRAG}) => {
    const c = document.createElement('canvas'); c.width = W; c.height = H; document.body.appendChild(c);
    const gl = c.getContext('webgl2', {preserveDrawingBuffer: true, antialias: false, alpha: false});
    if (!gl) return 'no WebGL2 in this browser';
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    try {
      const p = gl.createProgram();
      gl.attachShader(p, sh(gl.VERTEX_SHADER, '#version 300 es\nvoid main(){ vec2 v = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(v * 2.0 - 1.0, 0.0, 1.0); }'));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      gl.useProgram(p); gl.viewport(0, 0, W, H);
      window.__r = {gl, c, u: (n) => gl.getUniformLocation(p, n)};
    } catch (e) { return String(e.message || e); }
    return null;
  }, {W, H, FRAG});
  if (err) { console.error('shader error:\n' + err); await browser.close(); process.exit(2); }
  const t0 = Date.now();
  for (let f = f0; f <= f1; f++) {
    const b64 = await page.evaluate(({f, fps, dur, W, H}) => {
      const {gl, c, u} = window.__r;
      gl.uniform2f(u('uRes'), W, H); gl.uniform1f(u('uTime'), f / fps); gl.uniform1f(u('uFrame'), f); gl.uniform1f(u('uDur'), dur);
      gl.drawArrays(gl.TRIANGLES, 0, 3); gl.finish();
      return c.toDataURL('image/png').slice(22);
    }, {f, fps, dur, W, H});
    const file = still ? path.resolve(still) : path.join(outDir, `f_${String(f).padStart(5, '0')}.png`);
    fs.writeFileSync(file, Buffer.from(b64, 'base64'));
    if (f === f0 || (f - f0) % 24 === 23 || f === f1) console.log(`frame ${f} (${f - f0 + 1}/${f1 - f0 + 1}) ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  }
  await browser.close();
})();
