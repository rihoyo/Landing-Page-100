import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { landingRoutes } from '../src/pages/registry.ts';
import { render } from '../.prerender/prerender.js';

const template = readFileSync('dist/index.html', 'utf8');
const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'));
const base = process.env.VITE_BASE_PATH || '/';

for (const { id, paths } of landingRoutes) {
  const entry = id === 'aa0003' ? 'src/pages/health/page.tsx' : 'src/pages/home/page.tsx';
  const chunks = new Set();
  const styles = new Set();
  function collect(key) {
    const chunk = manifest[key];
    if (!chunk || chunks.has(chunk.file)) return;
    chunks.add(chunk.file);
    for (const css of chunk.css || []) styles.add(css);
    for (const imported of chunk.imports || []) collect(imported);
  }
  collect(entry);
  const hints = [...styles].map(file => `<link rel="stylesheet" href="${base}${file}">`)
    .concat([...chunks].map(file => `<link rel="modulepreload" href="${base}${file}">`)).join('\n');
  const html = template.replace('<div id="root"></div>', () => `<div id="root">${render(id)}</div>`)
    .replace('</head>', `${hints}\n</head>`);
  for (const path of paths) {
    const directory = path === '/' ? 'dist' : `dist${path}`;
    mkdirSync(directory, { recursive: true });
    writeFileSync(`${directory}/index.html`, html);
  }
}
// Build-only server code and manifests do not belong in the public site.
rmSync('.prerender', { recursive: true, force: true });
rmSync('dist/.vite', { recursive: true, force: true });
