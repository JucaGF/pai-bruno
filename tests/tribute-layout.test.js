const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

assert.match(html, /class="poster-art"/);
assert.match(html, /class="paper-photo paper-photo--group"/);
assert.match(html, /assets\/yellowar-grupo\.jpg/);
assert.match(css, /\.paper-photo--poster\s*\{[\s\S]*?aspect-ratio:\s*4\s*\/\s*3/);
assert.match(css, /\.poster-art\s*\{[\s\S]*?transform:\s*rotate\(90deg\)/);
assert.match(css, /\.paper-photo--hero figcaption\s*\{[\s\S]*?left:\s*48%/);

console.log('tribute layout regression checks passed');
