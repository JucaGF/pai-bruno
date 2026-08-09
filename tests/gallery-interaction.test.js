const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

assert.match(html, /data-gallery-preview/);
assert.match(html, /data-gallery-track="forward"/);
assert.match(html, /data-gallery-track="reverse"/);
assert.match(html, /data-gallery-toggle/);
assert.match(html, /aria-expanded="false"/);
assert.match(html, /id="gallery-grid"/);
assert.match(css, /@keyframes gallery-marquee/);
assert.match(css, /gallery-preview[\s\S]*?100vw/);
assert.match(css, /animation:\s*gallery-marquee\s+150s\s+linear\s+infinite/);
assert.match(css, /animation-duration:\s*180s/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.match(js, /gallery--expanded/);
assert.match(js, /aria-hidden/);
assert.match(js, /inert/);
assert.doesNotMatch(html, /^\+\s+<button class="gallery-item gallery-item--archive"/m);

console.log('gallery interaction contract checks passed');
